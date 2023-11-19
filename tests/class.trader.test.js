const DOC_ROOT = "../";

// Build global state
global.Game = require(DOC_ROOT+"tests/mocks/Game.js")
const constants = require('@screeps/common/lib/constants');
const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, ERR_NAME_EXISTS, ERR_NOT_FOUND,
    ERR_INVALID_TARGET
} = require("@screeps/common/lib/constants");
// Append each attribute from the module to the global scope
Object.assign(global, constants);

// load in test class
const traderClass = require(DOC_ROOT+'src/class.trader');

let trader = new traderClass();
let dataProvider = [
    ["tr.0.1 > Basic happy path", "W1N1", RESOURCE_UTRIUM, 1, "W1N1_U_1"],
    ["tr.0.2 > No room name", "", RESOURCE_ENERGY, 500, ERR_INVALID_ARGS],
    ["tr.0.3 > invalid room name", "a1b1", RESOURCE_ENERGY, 500, ERR_INVALID_ARGS],
    ["tr.0.4 > no resource", "W1N1", "", 500, ERR_INVALID_ARGS],
    ["tr.0.5 > bad resource", "W1N1", "A", 500, ERR_INVALID_ARGS],
    ["tr.0.6 > positive amount <0", "W1N1", RESOURCE_ENERGY, -1, ERR_INVALID_ARGS],
    ["tr.0.7 > positive amount =0", "W1N1", RESOURCE_ENERGY, 0, ERR_INVALID_ARGS],
    ["tr.0.8 > amount too big, >250k", "W1N1", RESOURCE_ENERGY, 250001, ERR_INVALID_ARGS],
    ["tr.0.9 > amount not too big =250k", "W1N1", RESOURCE_ENERGY, 250000, "W1N1_energy_1"],
    ["tr.0.10 > Same resource. Different room", "W2N1", RESOURCE_ENERGY, 250000, "W2N1_energy_1"],
    ["tr.0.11 > Same room. Different resource", "W1N1", RESOURCE_ZYNTHIUM, 250000, "W1N1_Z_1"],
];

describe.each(dataProvider)('tr.0 > creatOrder() - Basics', (description,roomName, resource_type, amount, expected) => {
    it(`${description} - Given (${roomName},${resource_type},${amount}) >> ${expected}`, () => {
        expect( trader.createOrder(roomName,resource_type,amount) ).toBe(expected);
    });
});



// no side effects on other orders
// fulfill marked order correctly & can make new order
describe('tr.1 > _fulfillOrder() - All', () => {
    Game.time=1;
    let trader = new traderClass();
    let W1N1_ID = trader.createOrder("W1N1", RESOURCE_ENERGY, 1);
    trader._fulfillOrder(W1N1_ID,"W2N1")
    Game.time++;
    let W2N1_ID = trader.createOrder("W2N1", RESOURCE_ENERGY, 1);
    trader._fulfillOrder(W2N1_ID,"W1N2")
    let W3N1_ID = trader.createOrder("W3N1", RESOURCE_ENERGY, 1);

    let simpleTest =[
        ["tr.1.1 > order id empty","","W1N1",ERR_NOT_FOUND],
        ["tr.1.2 > order id false",false,"W1N1",ERR_NOT_FOUND],
        ["tr.1.3 > order id undefined",undefined,"W1N1",ERR_NOT_FOUND],
        ["tr.1.4 > order id null",null,"W1N1",ERR_NOT_FOUND],
        ["tr.1.5 > order id !exist","W1N1_U_1","W1N1",ERR_NOT_FOUND],
        ["tr.1.6 > order already fulfilled x ticks ago",W1N1_ID,"W1N2",ERR_INVALID_TARGET],
        ["tr.1.7 > order already fulfilled this tick",W2N1_ID,"W1N2",ERR_INVALID_TARGET],
        ["tr.1.8 > order roomName is same as fulfill",W3N1_ID,"W3N1",ERR_INVALID_TARGET],
    ];

    for(let i=0; i<simpleTest.length;i++) {
        let tc = simpleTest[i];
        it(`${tc[0]}`, () => {
            expect(trader._fulfillOrder(tc[1], tc[2])).toBe(tc[3]);
        });
    }

    it(`tr.1.9 > fulfill order correctly`, () => {
        Game.time=3;
        expect(trader._fulfillOrder(W3N1_ID, "W1N3")).toBe(OK);
        expect(trader.getOrderByID(W3N1_ID)).toStrictEqual({id:W3N1_ID, roomName:'W3N1', resourceType:RESOURCE_ENERGY, amount:1,fulfilledBy:"W1N3",fulfilledAt:3});
        expect(trader.createOrder("W3N1", RESOURCE_ENERGY, 1)).toBe("W3N1_energy_3");
    });
})

describe('tr.2 > createOrder() - Advanced', () => {
    Game.time=1;
    it('tr.2.1 > Same room & resource', () => {
        let trader = new traderClass();
        trader.createOrder("W1N1", RESOURCE_UTRIUM, 1);
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe(ERR_NAME_EXISTS);
    });
    it('tr.2.2 > Same room & resource. Different tick', () => {
        let trader = new traderClass();
        trader.createOrder("W1N1", RESOURCE_UTRIUM, 1);
        Game.time++;
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe(ERR_NAME_EXISTS);
    });
    it('tr.2.3 > Valid orders. Different ticks', () => {
        let trader = new traderClass();
        Game.time = 1;
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( "W1N1_U_1");
        Game.time++;
        expect(trader.createOrder("W2N1", RESOURCE_UTRIUM, 1)).toBe( "W2N1_U_2");
    });
});

describe('tr.3 > getOrders()',()=>{

    it('tr.3.1 > no orders',()=>{
        Game.time=1;
        let trader = new traderClass();
        expect(trader.getOrders()).toStrictEqual([]);
    })
    it('tr.3.2 > x orders, no filters',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders()).toStrictEqual([
            {id:"W1N1_energy_1",roomName:"W1N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.3 > x orders, filters:[roomName] >> 0 results',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders([{key:'roomName',value:'W2N1'}])).toStrictEqual([]);
    })
    it('tr.3.3 > x orders, filters:[roomName] >> 1 result',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders([{key:'roomName',value:'W2N1'}])).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.3 > x orders, filters:[roomName] >> 2 result',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_UTRIUM,1);
        expect(trader.getOrders([{key:'roomName',value:'W2N1'}])).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null},
            {id:"W2N1_U_1",roomName:"W2N1",resourceType:"U",amount:1,fulfilledBy:null,fulfilledAt:null},
        ])
    })
    it('tr.3.3 > x orders, filters:[resourceType]',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_UTRIUM,1);
        expect(trader.getOrders([{key:'resourceType',value:'energy'}])).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.3 > x orders, filters:[roomName,resourceType]',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_UTRIUM,1);
        expect(trader.getOrders(
            [{key:'roomName',value:'W2N1'},{key:'resourceType',value:'energy'}]
        )).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.3 > x orders, filters:[badKey]',()=>{
        Game.time=1;
        let trader = new traderClass();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders([{key:'bob',value:'W2N1'}])).toStrictEqual([]);
    })
})

describe('tr.4 > getOrderByX()',()=>{
    // if orders.count > 500 || Game.time%500
    it('tr.4.1 > getOrderByID & getOpenOrderByDetail',()=>{
        let trader = new traderClass();
        Game.time = 1;
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrderByID("W1N1_energy_1")).toBeTruthy();
        expect(trader.getOpenOrderByDetail("W1N1",RESOURCE_ENERGY)).toBeTruthy();
    })
})
describe('tr.5 > clearOldOrders()',()=>{
    it('tr.5.1 > expireTime = 0',()=>{
        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader._fulfillOrder(id, "W1N3");
        Game.time = 2;
        trader.clearOldOrders(0);
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
    it('tr.5.2 > expireTime < 0',()=>{
        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader._fulfillOrder(id, "W1N3");
        Game.time = 2;

        trader.clearOldOrders(-1);
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
    it('tr.5.3 > no orders',()=>{

        let trader = new traderClass();
        trader.clearOldOrders(2);
        expect(trader.getOrders()).toStrictEqual([]);
    })
    it('tr.5.4 > no orders fulfilled',()=>{
        Game.time = 1;
        let trader = new traderClass();
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        Game.time = 5;
        trader.clearOldOrders(4)
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
    it('tr.5.5 > 1 pending order + 1 order fulfilled > expireTime',()=>{

        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        let id2 = trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader._fulfillOrder(id, "W1N3");
        Game.time = 5;
        trader.clearOldOrders(3);
        expect(trader.getOrderByID(id)).toBeFalsy();
        expect(trader.getOrderByID(id2)).toBeTruthy();
    })
    it('tr.5.6 > 1 pending order + 2 orders fulfilled > expireTime',()=>{

        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        let id2 = trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        let id3 = trader.createOrder("W3N1",RESOURCE_ENERGY,1);
        trader._fulfillOrder(id, "W1N3");
        trader._fulfillOrder(id2, "W1N4");
        Game.time = 5;
        trader.clearOldOrders(3);
        expect(trader.getOrderByID(id)).toBeFalsy();
        expect(trader.getOrderByID(id2)).toBeFalsy();
        expect(trader.getOrderByID(id3)).toBeTruthy();
    })
    it('tr.5.7 > 1 order fulfilled < expireTime + 1 order fulfilled > expireTime',()=>{

        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        let id2 = trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader._fulfillOrder(id, "W1N3");
        Game.time = 4;
        trader._fulfillOrder(id2, "W1N4");
        Game.time = 5;
        trader.clearOldOrders(2);
        expect(trader.getOrderByID(id)).toBeFalsy();
        expect(trader.getOrderByID(id2)).toBeTruthy();
    })
    it('tr.5.8 > expireTime = fulfilledAt',()=>{

        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        let id2 = trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        Game.time = 4;
        trader._fulfillOrder(id2, "W1N4");
        Game.time = 6;
        trader.clearOldOrders(2); // expect it to clear only order fulfilled MORE than 2 ticks.
        expect(trader.getOrderByID(id)).toBeTruthy();
        expect(trader.getOrderByID(id2)).toBeTruthy();
    })
    it('tr.5.9 > pending = fulfilledAt',()=>{

        let trader = new traderClass();
        Game.time = 1;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.orders[id].fulfilledAt="pending";
        Game.time = 6;
        trader.clearOldOrders(2);
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
})

describe('tr.6 > processOrders()',()=>{
    it.todo('tr.6.1 > no exporters. no orders')
    it.todo('tr.6.2 > no exporters. 1 order.')
    it.todo('tr.6.3 > 1 exporter. no orders.')
    it.todo('tr.6.4 > exporter room missing terminal. 1 order.')

    it.todo('tr.6.5 > 1 exporter, 1 order satisfiable by exporter. exporter.amount>order.amount')
    it.todo('tr.6.6 > 1 exporter, 1 order satisfiable by exporter. exporter.amount=order.amount')
    it.todo('tr.6.7 > 1 exporter, 1 order not satisfiable by exporter. exporter.amount<order.amount')
    it.todo('tr.6.8 > 1 exporter, 2 orders. 1 satisfiable by exporter')
    it.todo('tr.6.9 > 1 exporter, 2 orders. both satisfiable by exporter')

    it.todo('tr.6.10 > 1 tired exporter, 1 order satisfiable by exporter')
    it.todo('tr.6.11 > 1 exporter /wo energy, 1 order satisfiable by exporter')
    it.todo('tr.6.12 > 1 exporter not enough energy, 1 order satisfiable by exporter')
    it.todo('tr.6.13 > 2 exporters, 1st tired, 1 order satisfiable by exporter 2nd')
    it.todo('tr.6.14 > 2 exporters, 1st not enough energy, 1 order satisfiable by exporter 2nd')

    it.todo('tr.6.15 > 2 exporters, 1 order satisfiable by either exporter')
    it.todo('tr.6.16 > 2 exporters, 1 order satisfiable by 1st exporter')
    it.todo('tr.6.17 > 2 exporters, 1 order satisfiable by 2nd exporter')
    it.todo('tr.6.18 > 2 exporters, 2 orders, both satisfiable, different rooms, different resource.')
    it.todo('tr.6.19 > 2 exporters, 2 orders, both satisfiable, same room, different resource.')
    it.todo('tr.6.20 > 2 exporters, 2 orders, both satisfiable, different rooms, same resource.')
    it.todo('tr.6.21 > 2 exporters, 2 orders, 0 satisfiable.')
    it.todo('tr.6.22 > 2 exporters, 2 orders, 1 satisfiable.')
    it.todo('tr.6.23 > 2 exporters, 1 order satisfiable, target room = 1st exporter.')

    it.todo('tr.6.24 > 1 exporter, 1 order satisfiable, room.')
    it.todo('tr.6.25 > 1 exporter, 1 order satisfiable, to non owned room.')

    /////////// Confirm Pending ////////////////////////////////
    it.todo('tr.6.26 > no pending order')
    it.todo('tr.6.27 > pending order sent successfully')
    it.todo('tr.6.28 > pending order sent unsuccessfully')
})


/**
 *
 * trader.setExporters(['w3n2','w4n3','w2n2'])
 *
 *
 * trader.offerExport(utrium,'w3n2')
 * + allow resource > room lookup of providers
 * + allow rooms to opt themselves in/out
 *
 *
 */
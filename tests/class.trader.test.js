require('./mocks/Global')

const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, ERR_NAME_EXISTS, ERR_NOT_FOUND,
    ERR_INVALID_TARGET, ERR_NOT_ENOUGH_RESOURCES, ERR_TIRED, RESOURCE_OXYGEN
} = require("@screeps/common/lib/constants");


// load in test class
const traderClass = require('../src/class.trader');

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
    Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
    Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
    Game._addPlayerRoom('W3N1',6,"MadDokMike")._addTerminal();

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
        Game._resetData();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let trader = new traderClass();
        trader.createOrder("W1N1", RESOURCE_UTRIUM, 1);
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe(ERR_NAME_EXISTS);
    });
    it('tr.2.2 > Same room & resource. Different tick', () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let trader = new traderClass();
        trader.createOrder("W1N1", RESOURCE_UTRIUM, 1);
        Game.time++;
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe(ERR_NAME_EXISTS);
    });
    it('tr.2.3 > Valid orders. Different ticks', () => {
        let trader = new traderClass();
        Game._resetData();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( "W1N1_U_1");
        Game.time++;
        expect(trader.createOrder("W2N1", RESOURCE_UTRIUM, 1)).toBe( "W2N1_U_2");
    });

    it('tr.2.4 > order room is not owned - another player', () => {
        let trader = new traderClass();
        Game._resetData();
        Game._addPlayerRoom('W1N1',6,"Bob")._addTerminal();
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( ERR_INVALID_TARGET);
    });
    it('tr.2.5 > order room is not owned - hallway', () => {
        let trader = new traderClass();
        Game._resetData();
        Game._addHallwayRoom('W1N1');
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( ERR_INVALID_TARGET);
    });
    it('tr.2.6 > order room is not owned - sk room', () => {
        let trader = new traderClass();
        Game._resetData();
        Game._addSourceKeeperRoom('W1N1');
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( ERR_INVALID_TARGET);
    });
    it('tr.2.7 > order room is not owned - no visibility', () => {
        let trader = new traderClass();
        Game._resetData();
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( ERR_INVALID_TARGET);
    });

    it('tr.2.8 > order room is not owned - no player', () => {
        let trader = new traderClass();
        Game._resetData();
        Game._addPlayerRoom('W1N1',0);
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( ERR_INVALID_TARGET);
    });
    it('tr.2.9 > order room does not have a terminal to receive', () => {
        let trader = new traderClass();
        Game._resetData();
        Game._addPlayerRoom('W1N1',6,"MadDokMike");
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( ERR_INVALID_TARGET);
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
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders()).toStrictEqual([
            {id:"W1N1_energy_1",roomName:"W1N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.3 > x orders, filters:[roomName] >> 0 results',()=>{
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders([{key:'roomName',value:'W2N1'}])).toStrictEqual([]);
    })
    it('tr.3.4 > x orders, filters:[roomName] >> 1 result',()=>{
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders([{key:'roomName',value:'W2N1'}])).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.5 > x orders, filters:[roomName] >> 2 result',()=>{
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_UTRIUM,1);
        expect(trader.getOrders([{key:'roomName',value:'W2N1'}])).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null},
            {id:"W2N1_U_1",roomName:"W2N1",resourceType:"U",amount:1,fulfilledBy:null,fulfilledAt:null},
        ])
    })
    it('tr.3.6 > x orders, filters:[resourceType]',()=>{
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_UTRIUM,1);
        expect(trader.getOrders([{key:'resourceType',value:'energy'}])).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.7 > x orders, filters:[roomName,resourceType]',()=>{
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_ENERGY,1);
        trader.createOrder("W2N1",RESOURCE_UTRIUM,1);
        expect(trader.getOrders(
            [{key:'roomName',value:'W2N1'},{key:'resourceType',value:'energy'}]
        )).toStrictEqual([
            {id:"W2N1_energy_1",roomName:"W2N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null}
        ])
    })
    it('tr.3.8 > x orders, filters:[badKey]',()=>{
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrders([{key:'bob',value:'W2N1'}])).toStrictEqual([]);
    })
})

describe('tr.4 > getOrderByX()',()=>{
    // if orders.count > 500 || Game.time%500
    it('tr.4.1 > getOrderByID & getOpenOrderByDetail',()=>{
        let trader = new traderClass();
        Game.time = 1;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        expect(trader.getOrderByID("W1N1_energy_1")).toBeTruthy();
        expect(trader.getOpenOrderByDetail("W1N1",RESOURCE_ENERGY)).toBeTruthy();
    })
})
describe('tr.5 > clearOldOrders()',()=>{
    it('tr.5.1 > expireTime = 0',()=>{
        let trader = new traderClass();
        Game.time = 1;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader._fulfillOrder(id, "W1N3");
        Game.time = 2;
        trader.clearOldOrders(0);
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
    it('tr.5.2 > expireTime < 0',()=>{
        let trader = new traderClass();
        Game.time = 1;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
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
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        Game.time = 5;
        trader.clearOldOrders(4)
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
    it('tr.5.5 > 1 pending order + 1 order fulfilled > expireTime',()=>{

        let trader = new traderClass();
        Game.time = 1;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
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
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W3N1',6,"MadDokMike")._addTerminal();
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
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
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
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
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
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.orders[id].fulfilledAt="pending";
        Game.time = 6;
        trader.clearOldOrders(2);
        expect(trader.getOrderByID(id)).toBeTruthy();
    })
})

describe('tr.6 > processOrders()',()=>{
    it('tr.6.1 > no exporters. no orders',()=>{
        // EXPECT: processOrders() to run without error
        Game.time=1;
        let trader = new traderClass();
        trader.processOrders();
        expect("no error").toBe("no error");
    })
    it('tr.6.2 > no exporters. 1 order.',()=>{
        // EXPECT: order is not changed.
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        trader.createOrder("W1N1",RESOURCE_ENERGY,1);
        trader.processOrders();
        expect(trader.getOrderByID("W1N1_energy_1")).toStrictEqual({id:"W1N1_energy_1",roomName:"W1N1",resourceType:"energy",amount:1,fulfilledBy:null,fulfilledAt:null});
    })
    it('tr.6.3 > 1 exporter. no orders.',()=>{
        // EXPECT: processOrders() to run without error
        Game.time=1;
        let trader = new traderClass();
        trader.offerExport(RESOURCE_ENERGY,"W1N1");
        trader.processOrders();
        expect("no error").toBe("no error");
    })
    it('tr.6.4 > exporter room missing terminal. 1 order.',()=>{
        // EXPECT: processOrders() to run without error & order stays the same
        Game._resetData();
        Game._addPlayerRoom('W1N2',1,"MadDokMike");
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let trader = new traderClass();
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,1);
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:"Z",amount:1,
            fulfilledBy:null,fulfilledAt:null
        });
    })

    it('tr.6.5 > 1 exporter, 1 order satisfiable by exporter. exporter.amount>order.amount',()=>{
        // EXPECT: exporter to satisfy order. order.fulfilledAt=pending
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10000;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:"Z",amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
    })
    it('tr.6.6 > 1 exporter, 1 order satisfiable by exporter. exporter.amount=order.amount',()=>{
        // EXPECT: exporter to satisfy order. order.fulfilledAt=pending
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10000;
        resources[RESOURCE_ZYNTHIUM]=10;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:"Z",amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
    })
    it('tr.6.7 > 1 exporter, 1 order not satisfiable by exporter. exporter.amount<order.amount',()=>{
        // EXPECT: exporter NOT to satisfy order. order.fulfilledAt=null
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10000;
        resources[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:"Z",amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.8 > 1 exporter, 2 orders. 2nd order satisfiable by exporter',()=>{
        // EXPECT: exporter to satisfy 2nd order. order.fulfilledAt=Pending
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10000;
        resources[RESOURCE_ZYNTHIUM]=9;
        resources[RESOURCE_UTRIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:"Z",amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:"U",amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
    })
    it('tr.6.9 > 1 exporter, 2 orders. both satisfiable by exporter',()=>{
        // EXPECT: exporter to satisfy 1st order. order.fulfilledAt=Pending
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10000;
        resources[RESOURCE_ZYNTHIUM]=20;
        resources[RESOURCE_UTRIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:"Z",amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:"U",amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.10 > 1 exporter, 1 order for E, exporter has enough to send & transport',()=>{
        // EXPECT: exporter to satisfy the order. order.fulfilledAt=Pending
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10000;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,10);
        trader.offerExport(RESOURCE_ENERGY,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_energy_1",roomName:"W1N1",resourceType:RESOURCE_ENERGY,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
    })
    it('tr.6.11 > 1 exporter, 1 order for E, exporter doesnt have enough to send & transport',()=>{
        // EXPECT: exporter NOT to satisfy the order. order.fulfilledAt=null
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=1000;
        Game._addPlayerRoom('W1N200',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        Game.rooms['W1N200'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,990);
        trader.offerExport(RESOURCE_ENERGY,"W1N200");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_energy_1",roomName:"W1N1",resourceType:RESOURCE_ENERGY,amount:990,
            fulfilledBy:null,fulfilledAt:null
        });
    })

    it('tr.6.12 > 1 tired exporter, 1 order satisfiable by exporter',()=>{
        // EXPECT: exporter NOT to satisfy the order. order.fulfilledAt=null
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game.rooms['W1N2'].terminal.__send_response=ERR_TIRED;
        let id = trader.createOrder("W1N1",RESOURCE_ENERGY,10);
        trader.offerExport(RESOURCE_ENERGY,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_energy_1",roomName:"W1N1",resourceType:RESOURCE_ENERGY,amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.13 > 1 exporter /wo energy, 1 order satisfiable by exporter',()=>{
        // EXPECT: exporter NOT to satisfy the order. order.fulfilledAt=null
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ZYNTHIUM]=100;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game.rooms['W1N2'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;
        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.14 > 1 exporter not enough energy, 1 order satisfiable by exporter',()=>{
        // EXPECT: exporter NOT to satisfy the order. order.fulfilledAt=null
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};
        resources[RESOURCE_ENERGY]=10;
        resources[RESOURCE_ZYNTHIUM]=1000;
        Game._addPlayerRoom('W1N200',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game.rooms['W1N200'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;
        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,1000);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N200");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:1000,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.15 > 2 exporters, 1st tired, 1 order satisfiable by exporter 2nd',()=>{
        // EXPECT: exporterA NOT to satisfy the order, but exportB does
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        let resources={};

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=1000;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game.rooms['W1N2'].terminal.__send_response=ERR_TIRED;

        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"
        });
    })
    it('tr.6.16 > 2 exporters, 1st not enough energy, 1 order satisfiable by exporter 2nd',()=>{
        // EXPECT: exporterA NOT to satisfy the order, but exportB does
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=1;
        resources[RESOURCE_ZYNTHIUM]=1000;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game.rooms['W1N2'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;

        resources[RESOURCE_ENERGY]=100
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,100);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:100,
            fulfilledBy:"W1N3",fulfilledAt:"pending"
        });
    })

    it('tr.6.16 > 2 exporters, 1 order satisfiable by either exporter',()=>{
        // EXPECT: exporterA|exportB NOT to satisfy the order
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=1;
        resources[RESOURCE_ZYNTHIUM]=1000;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game.rooms['W1N2'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;

        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game.rooms['W1N3'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,1000);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:1000,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.17 > 2 exporters, 1 order satisfiable by 1st exporter',()=>{
        // EXPECT: exporterA to satisfy the order
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=1000;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        resources[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game.rooms['W1N3'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
    })
    it('tr.6.18 > 2 exporters, 1 order satisfiable by 2nd exporter',()=>{
        // EXPECT: exporterA to satisfy the order
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game.rooms['W1N2'].terminal.__send_response=ERR_NOT_ENOUGH_RESOURCES;

        resources[RESOURCE_ZYNTHIUM]=11;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"
        });
    })
    it('tr.6.19 > 2 exporters, 2 orders, both satisfiable, different rooms, different resource.',()=>{
        // EXPECT both orders to be satisfied
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources2={};
        resources2[RESOURCE_ENERGY]=100;
        resources2[RESOURCE_UTRIUM]=20;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources2);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W2N1",RESOURCE_UTRIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W2N1_U_1",roomName:"W2N1",resourceType:RESOURCE_UTRIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"
        });
    })
    it('tr.6.20 > 2 exporters, 2 orders, both satisfiable by exporters. same order room, different resource.',()=>{
        // EXPECT both orders to be satisfied
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources2={};
        resources2[RESOURCE_ENERGY]=100;
        resources2[RESOURCE_UTRIUM]=20;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources2);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:RESOURCE_UTRIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"
        });
    })
    it('tr.6.21 > 2 exporters, 2 orders, both satisfiable, different order rooms, same resource.',()=>{
        // EXPECT both orders to be satisfied
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources2={};
        resources2[RESOURCE_ENERGY]=100;
        resources2[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources2);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W2N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"
        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W2N1_Z_1",roomName:"W2N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"
        });
    })
    it('tr.6.22 > 2 exporters, 2 orders, 0 satisfiable.',()=>{
        // EXPECT neither orders to be satisfied
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources2={};
        resources2[RESOURCE_ENERGY]=100;
        resources2[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources2);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W2N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W2N1_Z_1",roomName:"W2N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.23 > 2 exporters, 2 orders, 1 satisfiable.',()=>{
        // EXPECT 1st order to be satisfied
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        Game._addPlayerRoom('W2N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources2={};
        resources2[RESOURCE_ENERGY]=100;
        resources2[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources2);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W2N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W2N1_Z_1",roomName:"W2N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null
        });
    })
    it('tr.6.24 > 2 exporters, 1 order satisfiable by both exports, order room = 1st exporter room.',()=>{
        // EXPECT the order to be satisfied by 2nd exporter
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources2={};
        resources2[RESOURCE_ENERGY]=100;
        resources2[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources2);

        let id = trader.createOrder("W1N2",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N2_Z_1",roomName:"W1N2",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
    })

    it.skip('tr.6.25 > 1 exporter, 1 order satisfiable, to non owned room. --skipped because its a future feature',()=>{
        // EXPECT the order NOT to be satisfied. Don't support sending to other players
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"Bob")._addTerminal(resources);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })

    it('tr.6.26 > exporter room visibility lost.',()=>{
        // EXPECT the order NOT to be satisfied.
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.27 > order room visibility lost.',()=>{
        // EXPECT the order NOT to be satisfied.
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");

        delete Game.rooms["W1N1"];
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.28 > room offers export, but  not resources to satisfy an order.',()=>{
        // EXPECT the order NOT to be satisfied.
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.28 > room offers export, but  not enough to satisfy an order.',()=>{
        // EXPECT the order NOT to be satisfied.
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=9;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.29 > 1 exporter, 1 order, order room terminal is full',()=>{
        // EXPECT the order NOT to be satisfied. Don't
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        let resources2={}
        resources2[RESOURCE_ENERGY]=300000;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal(resources2);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.30 > 1 exporter, 1 order, order room terminal is too full to fit order',()=>{
        // EXPECT the order NOT to be satisfied. Don't
        Game._resetData();
        Game.time=1;
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        let resources2={}
        resources2[RESOURCE_ENERGY]=299991;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal(resources2);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.31 > 1 exporter, 1 order, order room terminal just fits order',()=>{
        // EXPECT the order NOT to be satisfied. Don't
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        let resources2={}
        resources2[RESOURCE_ENERGY]=299990;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal(resources2);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"

        });
    })
    it('tr.6.32 > 1 exporters, 2 orders to same room, order room terminal just fits 2nd order but not 1st',()=>{
        // EXPECT only the 2nd order to be satisfied
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        resources[RESOURCE_UTRIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);

        let resources3={};
        resources3[RESOURCE_ENERGY]=299991;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal(resources3);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,9);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:RESOURCE_UTRIUM,amount:9,
            fulfilledBy:"W1N2",fulfilledAt:"pending"

        });
    })
    it('tr.6.33 > 2 exporters, 2 orders to same room, order room terminal just fits either order but not both',()=>{
        // EXPECT only the 1st order to be satisfied
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        resources[RESOURCE_UTRIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);

        let resources3={};
        resources3[RESOURCE_ENERGY]=299990;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal(resources3);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N3");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"

        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:RESOURCE_UTRIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.34 > 3 exporters, 3 orders to same room, order room terminal can fit any 2 orders but not all 3',()=>{
        // EXPECT only the 1st order to be satisfied
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        resources[RESOURCE_UTRIUM]=20;
        resources[RESOURCE_OXYGEN]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N4',6,"MadDokMike")._addTerminal(resources);

        let resources3={};
        resources3[RESOURCE_ENERGY]=299971;
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal(resources3);


        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,10);
        let id3 = trader.createOrder("W1N1",RESOURCE_OXYGEN,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_UTRIUM,"W1N3");
        trader.offerExport(RESOURCE_OXYGEN,"W1N4");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"pending"

        });

        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:RESOURCE_UTRIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
        expect(trader.getOrderByID(id3)).toStrictEqual({
            id:"W1N1_O_1",roomName:"W1N1",resourceType:RESOURCE_OXYGEN,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.35 > order room terminal destroyed after order creation',()=>{
        // EXPECT only the 1st order to be satisfied
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        Game.rooms['W1N1'].terminal = undefined;
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
        /////////// Confirm Pending ////////////////////////////////
    it('tr.6.36 > no pending order',()=>{
        // EXPECT no order to change
        Game._resetData();
        let trader = new traderClass();
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();
        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        let id2 = trader.createOrder("W1N1",RESOURCE_UTRIUM,10);

        trader.processOrders();
        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
        expect(trader.getOrderByID(id2)).toStrictEqual({
            id:"W1N1_U_1",roomName:"W1N1",resourceType:RESOURCE_UTRIUM,amount:10,
            fulfilledBy:null,fulfilledAt:null

        });
    })
    it('tr.6.37 > pending order sent successfully - last tick',()=>{
        // EXPECT order 1 to be reconciled and 2nd order to be sent
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        // send goods
        trader.processOrders();
        Game._tickOver();
        Game.market.outgoingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "W1N1_Z_1",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.market.incomingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "W1N1_Z_1",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.rooms['W1N2'].terminal.__send_response=ERR_TIRED;
        // check this doesn't get mixed up
        let id2 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        // reconcile order W1N1_Z_1
        trader.processOrders();
        let id3 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.processOrders();

        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:1
        });
        expect(id2).toBe(ERR_NAME_EXISTS);

        expect(trader.getOrderByID(id3)).toStrictEqual({
            id:"W1N1_Z_2",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
    })

    it('tr.6.38 > pending order sent successfully - X ticks ago',()=>{
        // EXPECT order 1 to be reconciled and 2nd order to be sent
        Game._resetData();
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        // send goods
        trader.processOrders();
        Game._tickOver();
        Game._tickOver();
        Game._tickOver();
        Game.market.outgoingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "W1N1_Z_1",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.market.incomingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "W1N1_Z_1",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.rooms['W1N2'].terminal.__send_response=ERR_TIRED;
        // check this doesn't get mixed up
        let id2 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        // reconcile order W1N1_Z_1
        trader.processOrders();
        let id3 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.processOrders();

        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_1",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:1
        });
        expect(id2).toBe(ERR_NAME_EXISTS);

        expect(trader.getOrderByID(id3)).toStrictEqual({
            id:"W1N1_Z_4",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
    })
    it('tr.6.39 > pending order sent unsuccessfully - last tick',()=>{
        // EXPECT 1st order changed to ERR, 2nd order sent
        Game._resetData();
        Game.time=5;
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        // send goods
        trader.processOrders();
        Game._tickOver();
        Game.market.incomingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "not-relevant order",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.market.outgoingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "not-relevant order",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.rooms['W1N2'].terminal.__send_response=ERR_TIRED;
        // lets check this doesn't get mixed up
        let id2 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);

        // reconcile order W1N1_Z_1
        trader.processOrders();
        let id3 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.processOrders();

        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_5",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"ERROR"
        });
        expect(id2).toBe(ERR_NAME_EXISTS);
        expect(trader.getOrderByID(id3)).toStrictEqual({
            id:"W1N1_Z_6",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
    })

    it('tr.6.40 > pending order sent unsuccessfully - X ticks ago',()=>{
        // EXPECT 1st order changed to ERR, 2nd order sent
        Game._resetData();
        Game.time=5;
        let trader = new traderClass();

        let resources={};
        resources[RESOURCE_ENERGY]=100;
        resources[RESOURCE_ZYNTHIUM]=20;
        Game._addPlayerRoom('W1N2',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N3',6,"MadDokMike")._addTerminal(resources);
        Game._addPlayerRoom('W1N1',6,"MadDokMike")._addTerminal();

        let id = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N2");
        trader.offerExport(RESOURCE_ZYNTHIUM,"W1N3");
        // send goods
        trader.processOrders();
        Game._tickOver();
        Game._tickOver();
        Game._tickOver();
        Game.market.incomingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "not-relevant order",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.market.outgoingTransactions.push({
            "time": 1,
            "sender": {
                "username": "MadDokMike"
            },
            "recipient": {
                "username": "MadDokMike"
            },
            "resourceType": RESOURCE_ZYNTHIUM,
            "amount": 10,
            "from": "W1N2",
            "to": "W1N1",
            "description": "not-relevant order",
            "transactionId": "657524dcd46465001287868f"
        })
        Game.rooms['W1N2'].terminal.__send_response=ERR_TIRED;
        // lets check this doesn't get mixed up
        let id2 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);

        // reconcile order W1N1_Z_1
        trader.processOrders();
        let id3 = trader.createOrder("W1N1",RESOURCE_ZYNTHIUM,10);
        trader.processOrders();

        expect(trader.getOrderByID(id)).toStrictEqual({
            id:"W1N1_Z_5",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N2",fulfilledAt:"ERROR"
        });
        expect(id2).toBe(ERR_NAME_EXISTS);
        expect(trader.getOrderByID(id3)).toStrictEqual({
            id:"W1N1_Z_8",roomName:"W1N1",resourceType:RESOURCE_ZYNTHIUM,amount:10,
            fulfilledBy:"W1N3",fulfilledAt:"pending"

        });
    })
})



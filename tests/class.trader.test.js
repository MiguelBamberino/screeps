const DOC_ROOT = "../";
global.Game = {time:1}
const traderClass = require(DOC_ROOT+'src/class.trader');
const constants = require('@screeps/common/lib/constants');
const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, ERR_NAME_EXISTS, ERR_NOT_FOUND,
    ERR_INVALID_TARGET
} = require("@screeps/common/lib/constants");

// Append each attribute from the module to the global scope
Object.assign(global, constants);


let trader = new traderClass();
let dataProvider = [
    [0, "Basic happy path", "W1N1", RESOURCE_UTRIUM, 1, "W1N1_U_1"],
    [1, "No room name", "", RESOURCE_ENERGY, 500, ERR_INVALID_ARGS],
    [2, "invalid room name", "a1b1", RESOURCE_ENERGY, 500, ERR_INVALID_ARGS],
    [3, "no resource", "W1N1", "", 500, ERR_INVALID_ARGS],
    [4, "bad resource", "W1N1", "A", 500, ERR_INVALID_ARGS],
    [5, "positive amount <0", "W1N1", RESOURCE_ENERGY, -1, ERR_INVALID_ARGS],
    [6, "positive amount =0", "W1N1", RESOURCE_ENERGY, 0, ERR_INVALID_ARGS],
    [7, "amount too big, >250k", "W1N1", RESOURCE_ENERGY, 250001, ERR_INVALID_ARGS],
    [8, "amount not too big =250k", "W1N1", RESOURCE_ENERGY, 250000, "W1N1_energy_1"],
    [9, "Same resource. Different room", "W2N1", RESOURCE_ENERGY, 250000, "W2N1_energy_1"],
    [10, "Same room. Different resource", "W1N1", RESOURCE_ZYNTHIUM, 250000, "W1N1_Z_1"],
];


describe.each(dataProvider)('creatOrder() - Basics', (ds,description,roomName, resource_type, amount, expected) => {
    it(`DS:${ds} ${description} - Given (${roomName},${resource_type},${amount}) >> ${expected}`, () => {
        expect( trader.createOrder(roomName,resource_type,amount) ).toBe(expected);
    });
});



// no side effects on other orders
// fulfill marked order correctly & can make new order
describe('_fulfillOrder() - All', () => {
    Game.time=1;
    let trader = new traderClass();
    let W1N1_ID = trader.createOrder("W1N1", RESOURCE_ENERGY, 1);
    trader._fulfillOrder(W1N1_ID,"W2N1")
    Game.time++;
    let W2N1_ID = trader.createOrder("W2N1", RESOURCE_ENERGY, 1);
    trader._fulfillOrder(W2N1_ID,"W1N2")
    let W3N1_ID = trader.createOrder("W3N1", RESOURCE_ENERGY, 1);

    let simpleTest =[
        ["order id empty","","W1N1",ERR_NOT_FOUND],
        ["order id false",false,"W1N1",ERR_NOT_FOUND],
        ["order id undefined",undefined,"W1N1",ERR_NOT_FOUND],
        ["order id null",null,"W1N1",ERR_NOT_FOUND],
        ["order id !exist","W1N1_U_1","W1N1",ERR_NOT_FOUND],
        ["order already fulfilled x ticks ago",W1N1_ID,"W1N2",ERR_INVALID_TARGET],
        ["order already fulfilled this tick",W2N1_ID,"W1N2",ERR_INVALID_TARGET],
        ["order roomName is same as fulfill",W3N1_ID,"W3N1",ERR_INVALID_TARGET],
    ];

    for(let i=0; i<simpleTest.length;i++) {
        let tc = simpleTest[i];
        it(`DS:${i} ${tc[0]}`, () => {
            expect(trader._fulfillOrder(tc[1], tc[2])).toBe(tc[3]);
        });
    }

    it(`DS:${simpleTest.length} fulfill marked order correctly`, () => {
        Game.time=3;
        expect(trader._fulfillOrder(W3N1_ID, "W1N3")).toBe(OK);
        expect(trader.getOrder(W3N1_ID)).toBe({id:W3N1_ID, roomName:'W3N1', resourceType:RESOURCE_ENERGY, amount:1,fulfilledBy:"W1N3",fulfilledAt:3});
        expect(trader.createOrder("W3N1", RESOURCE_ENERGY, 1)).toBe("W3N1_energy_3");
    });
})

describe('createOrder() - Advanced', () => {
    Game.time=1;
    it('DS:0 Same room & resource', () => {
        let trader = new traderClass();
        trader.createOrder("W1N1", RESOURCE_UTRIUM, 1);
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe(ERR_NAME_EXISTS);
    });
    it('DS:1 Same room & resource. Different tick', () => {
        let trader = new traderClass();
        trader.createOrder("W1N1", RESOURCE_UTRIUM, 1);
        Game.time++;
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe(ERR_NAME_EXISTS);
    });
    it('DS:2 Valid orders. Different ticks', () => {
        let trader = new traderClass();
        Game.time = 1;
        expect(trader.createOrder("W1N1", RESOURCE_UTRIUM, 1)).toBe( "W1N1_U_1");
        Game.time++;
        expect(trader.createOrder("W2N1", RESOURCE_UTRIUM, 1)).toBe( "W2N1_U_2");
    });
});

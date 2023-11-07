const DOC_ROOT = "../";
global.Game = {time:1}
const traderClass = require(DOC_ROOT+'src/class.trader');
const constants = require('@screeps/common/lib/constants');
const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, ERR_NAME_EXISTS} = require("@screeps/common/lib/constants");

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


describe('createOrder() - Advanced', () => {
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

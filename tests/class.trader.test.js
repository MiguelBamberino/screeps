const DOC_ROOT = "../";
global.Game = {time:1}
const traderClass = require(DOC_ROOT+'src/class.trader');
const constants = require('@screeps/common/lib/constants');
const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM} = require("@screeps/common/lib/constants");

// Append each attribute from the module to the global scope
Object.assign(global, constants);

let trader = new traderClass();

let dataProvider = [
    [0, "Basic happy path", "W1N1", RESOURCE_UTRIUM, 1, "W1N1_U_1"],
    [1, "Basic happy path", "W1N1", RESOURCE_ZYNTHIUM, 500, "W1N1_Z_1"],
    [2, "No room name", "", "Z", 500, ERR_INVALID_ARGS],
    [3, "invalid room name", "a1b1", "Z", 500, ERR_INVALID_ARGS],
    [4, "no resource", "W1N1", "", 500, ERR_INVALID_ARGS],
    [5, "bad resource", "W1N1", "A", 500, ERR_INVALID_ARGS],
    [6, "positive amount", "W1N1", "Z", -1, ERR_INVALID_ARGS],
    [7, "positive amount", "W1N1", "Z", 0, ERR_INVALID_ARGS],
    [8, "amount too big, >250k", "W1N1", "Z", 250000, ERR_INVALID_ARGS],
];

describe.each(dataProvider)('creatOrder()', (ds,description,roomName, resource_type, amount, expected) => {
    it(`DS:${ds} ${description} - Given (${roomName},${resource_type},${amount}) >> ${expected}`, () => {
        expect( trader.createOrder(roomName,resource_type,amount) ).toBe(expected);
    });
});

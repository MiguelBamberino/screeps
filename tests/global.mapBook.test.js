const DOC_ROOT = "../";

// Build global state
global.Memory = {}
global.Game = require(DOC_ROOT+"tests/mocks/Game.js")
const constants = require('@screeps/common/lib/constants');
const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, ERR_NAME_EXISTS, ERR_NOT_FOUND,
    ERR_INVALID_TARGET
} = require("@screeps/common/lib/constants");
// Append each attribute from the module to the global scope
Object.assign(global, constants);

// load in test class
require(DOC_ROOT+'src/global.mapBook');

/////////////////////////////////////////////////////////////////
// mb initiate()
/////////////////////////////////////////////////////////////////
describe('mb.0 > mb.havePermanentVision()', () => {

    it(`mb.0.1 > 1 room - owner=mike`, () => {
        Game.resetData();
        Game.addRoom('W1N1').controller._setOwner("MadDokMike");
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(true);
    });
    it(`mb.0.2 > 1 room, 1 room temp vision (!controller)`, () => {
        Game.resetData();
        Game.addHallwayRoom('W1N1');
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(false);
    });
    it(`mb.0.3 > 1 room, 1 room temp vision (controller.!owner)`, () => {
        Game.resetData();
        Game.addRoom('W1N1');
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(false);
    });
    it(`mb.0.4 > 1 room, 1 room temp vision (controller.owner!=MadDokMike)`, () => {
        Game.resetData();
        Game.addRoom('W1N1').controller._setOwner("bob");
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(false);
    });

})


/////////////////////////////////////////////////////////////////
// mb initiate()
/////////////////////////////////////////////////////////////////

describe('mb.1a > mb.initiate() - rooms with vision', () => {

    it(`mb.1a.1 > Game.rooms empty`, () => {
        Game.resetData();
        mb.initiate();
        expect(mb.allRooms()).toStrictEqual({});
    });
    it(`mb.1a.2 > 1 room - owner=mike`, () => {
        Game.resetData();
        Game.addRoom('W1N1').controller._setOwner("MadDokMike");
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
    });
    it(`mb.1a.3 > 2 room - owner=mike`, () => {
        Game.resetData();
        Game.addRoom('W1N1').controller._setOwner("MadDokMike");
        Game.addRoom('W2N1').controller._setOwner("MadDokMike");
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
        expect(mb.hasRoom('W2N1')).toBe(true);
    });
    it(`mb.1a.4 > 1 room + 1 room temp vision`, () => {
        Game.resetData();
        Game.addRoom('W1N1').controller._setOwner("MadDokMike");
        Game.addHallwayRoom('W1N10');
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
        expect(mb.hasRoom('W1N10')).toBe(false);
    });

})

describe('mb.1b > mb.initiate() - rooms in Memory', () => {

    it('mb.1b.1 > Memory rooms empty',()=>{
        Game.resetData()
        Memory={mapBook:{rooms:{}}};
        mb.initiate();
        expect(mb.allRooms()).toStrictEqual({});
    });
    it('mb.1b.2 > 1 Memory room',()=>{
        Game.resetData()
        Memory={mapBook:{rooms:{'W1N1':{}}}};
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
    });
    it('mb.1b.8 > 1 owned, 1 Memory',()=>{
        Game.resetData();
        Memory={mapBook:{rooms:{'W1N1':{}}}};
        Game.addRoom("W2N1").controller._setOwner("MadDokMike");
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true)
        expect(mb.hasRoom('W2N1')).toBe(true)
    });

})


describe('mb.2 > mb.allRooms() ', () => {
    it('mb.2.1 > No rooms',()=>{
        Game.resetData();
        mb.initiate();
        expect(mb.allRooms()).toStrictEqual({});
    });
    it.todo('mb.2.1 > 1 owned, 1 Memory');
})
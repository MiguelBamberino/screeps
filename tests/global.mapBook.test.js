require('./mocks/Global')
const {RESOURCE_UTRIUM, ERR_INVALID_ARGS, RESOURCE_ZYNTHIUM, RESOURCE_ENERGY, ERR_NAME_EXISTS, ERR_NOT_FOUND,
    ERR_INVALID_TARGET
} = require("@screeps/common/lib/constants");

// load in test class
require('../src/global.mapBook');

/////////////////////////////////////////////////////////////////
// mb vision()
/////////////////////////////////////////////////////////////////
describe('mb.0 > mb.havePermanentVision()', () => {

    it(`mb.0.1 > 1 room - owner=mike`, () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1',1,"MadDokMike");
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(true);
    });
    it(`mb.0.2 > 1 room, 1 room temp vision (!controller)`, () => {
        Game._resetData();
        Game._addHallwayRoom('W1N1');
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(false);
    });
    it(`mb.0.3 > 1 room, 1 room temp vision (controller.!owner)`, () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1');
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(false);
    });
    it(`mb.0.4 > 1 room, 1 room temp vision (controller.owner!=MadDokMike)`, () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1',"bob");
        mb.initiate();
        expect(mb.havePermanentVision('W1N1')).toBe(false);
    });

})


/////////////////////////////////////////////////////////////////
// mb initiate()
/////////////////////////////////////////////////////////////////

describe('mb.1a > mb.initiate() - rooms with vision', () => {

    it(`mb.1a.1 > Game.rooms empty`, () => {
        Game._resetData();
        mb.initiate();
        expect(mb.allRooms()).toStrictEqual({});
    });
    it(`mb.1a.2 > 1 room - owner=mike`, () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1',1,"MadDokMike");
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
    });
    it(`mb.1a.3 > 2 room - owner=mike`, () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1',1,"MadDokMike");
        Game._addPlayerRoom('W2N1',1,"MadDokMike");
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
        expect(mb.hasRoom('W2N1')).toBe(true);
    });
    it(`mb.1a.4 > 1 room + 1 room temp vision`, () => {
        Game._resetData();
        Game._addPlayerRoom('W1N1',1,"MadDokMike");
        Game._addHallwayRoom('W1N10');
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
        expect(mb.hasRoom('W1N10')).toBe(false);
    });

})

describe('mb.1b > mb.initiate() - rooms in Memory', () => {

    it('mb.1b.1 > Memory rooms empty',()=>{
        Game._resetData()
        Memory={mapBook:{rooms:{}}};
        mb.initiate();
        expect(mb.allRooms()).toStrictEqual({});
    });
    it('mb.1b.2 > 1 Memory room',()=>{
        Game._resetData()
        Memory={mapBook:{rooms:{'W1N1':{}}}};
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true);
    });
    it('mb.1b.8 > 1 owned, 1 Memory',()=>{
        Game._resetData();
        Memory={mapBook:{rooms:{'W1N1':{}}}};
        Game._addPlayerRoom("W2N1",1,"MadDokMike");
        mb.initiate();
        expect(mb.hasRoom('W1N1')).toBe(true)
        expect(mb.hasRoom('W2N1')).toBe(true)
    });

})


describe('mb.2 > mb.allRooms() ', () => {
    it('mb.2.1 > No rooms',()=>{
        Game._resetData();
        mb.initiate();
        expect(mb.allRooms()).toStrictEqual({});
    });
    it.todo('mb.2.1 > 1 owned, 1 Memory');
})

/////////////////////////////////////////////////////////////////
// mb room danger levels
/////////////////////////////////////////////////////////////////
/*
- sk rooms /wo paths
- sk rooms /w paths
- invaderCores
- player room /w tower; rcl 3+
- player room /wo tower; rcl 1,2
- player room /wo spawn/towers [destroyed/attacked]
- allied player
- un-owned room
- hallway - low
- ally remote
- my remote
- enemy remote

room
    structures
    con, term, store, nuke
    threatData
    lastVisionAt

- current danger level
- default danger level
- expiry ...when to drop back to default
- threats [creeps,towers]
- category: [Mine,Ally,Enemy,Empty,]
-

rank by : danger level

danger levels:
 High - high damage threats, need healer
 medium - enemies seen, civilians avoid
 low - no enemies seen, low risk for civilians
 none - ally/owned
 unknown - we don't know enough to decide

 mb.scanRoom(roomName)
    >> creates default threat data
    >> updates /w active threats
 mb.reportThreat(roomName,creep)
 mb.reportThreats(roomName,creeps)
 mb.getThreatReport()
*/
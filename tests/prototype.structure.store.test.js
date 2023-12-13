require('./mocks/Global')

let structureFactory = require('./mocks/Structure.js');

//require('../src/prototype.structure.store.js');
const {RESOURCE_ZYNTHIUM, RESOURCE_ENERGY} = require("@screeps/common/lib/constants");

describe('proto.struct.1 > storedAmount()',()=>{
    it("proto.struct.1.1 > store empty",()=>{

        let structure = structureFactory._createStorage("W1N1");
        expect(structure.storedAmount(RESOURCE_ZYNTHIUM)).toBe(0);
    })
    it("proto.struct.1.2 > storing something",()=>{
        let resources = {};
        resources[RESOURCE_ZYNTHIUM] = 50;
        resources[RESOURCE_ENERGY] = 60;
        let structure = structureFactory._createStorage("W1N1",resources);
        expect(structure.storedAmount(RESOURCE_ZYNTHIUM)).toBe(50);
        expect(structure.storedAmount(RESOURCE_ENERGY)).toBe(60);
    })
    it("proto.struct.1.3 > no resource passed",()=>{
        let resources = {};
        resources[RESOURCE_ZYNTHIUM] = 50;
        resources[RESOURCE_ENERGY] = 60;
        let structure = structureFactory._createStorage("W1N1",resources);
        expect(structure.storedAmount()).toBe(60);
    })
})
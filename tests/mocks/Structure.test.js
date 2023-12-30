let StructureFactory=require('./Structure');
const {STRUCTURE_CONTROLLER, RESOURCE_ENERGY, OK, RESOURCE_GHODIUM} = require("@screeps/common/lib/constants");

describe('mock.structure.1 > basic', () => {
    it("mock.structure.1.1 > default construction",()=>{
        let s = new Structure("123",STRUCTURE_CONTROLLER,{name:"W1N1"})
        expect(s.id).toBe("123")
        expect(s.structureType).toBe(STRUCTURE_CONTROLLER)
        expect(s.pos.x).toBe(1)
        expect(s.pos.y).toBe(1)
        expect(s.pos.roomName).toBe("W1N1")
        expect(s.room.name).toBe("W1N1")
        expect(s.hits).toBe(0)
        expect(s.hitsMax).toBe(0)
        expect(s.effects).toStrictEqual([])
        expect(s.destroy()).toBe(OK)
    })
    it('mock.structure.1.2 > _setOwner',()=>{
        let s = new Structure("123",STRUCTURE_CONTROLLER,{name:"W1N1"})
        expect(s.owner).toBeUndefined();

        let os = new OwnedStructure("123",STRUCTURE_CONTROLLER,{name:"W1N1"},"Bob")
        expect(os.owner).toStrictEqual({ username:"Bob"})
        expect(os.my).toBe(false)
        os._setOwner("MadDokMike")
        expect(os.owner).toStrictEqual({ username:"MadDokMike"})
        expect(os.my).toBe(true)


    })

    it('mock.structure.1.3 > _setHits()',()=>{
        let s = new Structure("123",STRUCTURE_CONTROLLER,{name:"W1N1"})
        s._setHits(5,10);
        expect(s.hits).toBe(5);
        expect(s.hitsMax).toBe(10);
        s._setHits(7);
        expect(s.hits).toBe(7);
        expect(s.hitsMax).toBe(10);

    })

    it('mock.structure.1.4 > _setStore()',()=>{

        let s = new Structure("123",STRUCTURE_CONTROLLER,{name:"W1N1"})
        s._setStore();
        expect(s.store).toBeDefined();
        expect(s.store[RESOURCE_ENERGY]).toBe(undefined);
        s.store._setTotalCapacity(2000)
        expect(s.store.getFreeCapacity(RESOURCE_ENERGY)).toBe(2000);

        s = new Structure("456",STRUCTURE_CONTROLLER,{name:"W1N1"})
        s._setStore({});
        expect(s.store).toBeDefined();
        s.store._setTotalCapacity(2000)
        expect(s.store[RESOURCE_ENERGY]).toBe(undefined);
        expect(s.store.getFreeCapacity(RESOURCE_ENERGY)).toBe(2000);

        s = new Structure("789",STRUCTURE_CONTROLLER,{name:"W1N1"})
        s._setStore({energy:45});
        s.store._setTotalCapacity(100)
        expect(s.store).toBeDefined();
        expect(s.store[RESOURCE_ENERGY]).toBe(45);
        expect(s.store.getFreeCapacity(RESOURCE_ENERGY)).toBe(55);

    })
})


describe('mock.structure.2 > Typed Structures basic construction', () => {
    it("mock.structure.2.1 > controller",()=>{
        let c = new StructureController("123",{name:"W1N1"});
        expect(c.hits).toBe(0);
        expect(c.hitsMax).toBe(0);
        expect(c.store).toBeUndefined();
        expect(c.my).toBe(false);
        expect(c.safeModeAvailable).toBe(0);
        expect(c.ticksToDowngrade).toBe(0);
        expect(c.upgradeBlocked).toBe(0);
        expect(c.level).toBe(0);
        expect(c.progress).toBe(0);
        expect(c.progressTotal).toBe(200);

        c = new StructureController("456",{name:"W1N1"},1,"MadDokMike");

        expect(c.level).toBe(1);
        expect(c.my).toBe(true);
        expect(c.owner).toBeDefined();
    })
    it("mock.structure.2.2 > container",()=>{
        let c = new StructureContainer("123",{name:"W1N1"});
        expect(c.hits).toBe(250000);
        expect(c.hitsMax).toBe(250000);
        expect(c.store).toBeDefined();
        expect(c.ticksToDecay).toBeDefined();
        expect(c.store.getCapacity()).toBe(2000);
    })
    it("mock.structure.2.2 > container",()=>{
        let s = new StructureExtension("123",{name:"W1N1"},"MadDokMike");
        expect(s.hits).toBe(1000);
        expect(s.hitsMax).toBe(1000);
        expect(s.store).toBeDefined();
        expect(s.store.getCapacity()).toBe(50);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(50);
        expect(s.store.getCapacity(RESOURCE_GHODIUM)).toBe(undefined);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",2);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(50);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",3);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(50);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",4);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(50);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",5);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(50);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",6);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(50);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",7);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(100);
        s = new StructureExtension("123",{name:"W1N1"},"MadDokMike",8);
        expect(s.store.getCapacity(RESOURCE_ENERGY)).toBe(200);

    })
})
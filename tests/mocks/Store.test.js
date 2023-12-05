require('./Store');
const {RESOURCE_ENERGY, RESOURCE_ZYNTHIUM, LOOK_MINERALS, RESOURCE_UTRIUM, RESOURCE_HYDROGEN, RESOURCE_LEMERGIUM_ACID} = require("@screeps/common/lib/constants");

describe('mock.store.1 > iterate', () => {
    it("mock.store.1.1 > empty store",()=>{
        let store = new Store();
        expect(Object.keys(store).length).toBe(0)
    })
    it("mock.store.1.2 > 1 resource store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=100;
        let store = new Store(kp);
        expect(Object.keys(store).length).toBe(1)
        expect(store[RESOURCE_ENERGY]).toBe(100)
        for(let attr in store){
            expect(kp[attr]).toBeTruthy()
        }
    })
    it("mock.store.1.3 > 2 resource store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=100;
        kp[RESOURCE_ZYNTHIUM]=200;
        let store = new Store(kp);
        expect(Object.keys(store).length).toBe(2)
        expect(store[RESOURCE_ENERGY]).toBe(100)
        expect(store[RESOURCE_ZYNTHIUM]).toBe(200)
        for(let attr in store){
            expect(kp[attr]).toBeTruthy()
        }
    })
});

describe('mock.store.2 > _setTotalCapacity()', () => {
    it("mock.store.2.1 > must be positive with no error. Doesn't interfere with key-pair",()=>{
        let store = new Store();
        store._setTotalCapacity(100);
        expect(Object.keys(store).length).toBe(0)
        expect(store.getCapacity()).toBe(100)
    })
    it("mock.store.2.2 > Having 2 stores, different caps. Doesn't interfere with key-pair",()=>{
        let storeA = new Store();
        let storeB = new Store();
        storeA._setTotalCapacity(100);
        storeB._setTotalCapacity(200);
        expect(Object.keys(storeA).length).toBe(0)
        expect(Object.keys(storeB).length).toBe(0)
        expect(storeA.getCapacity()).toBe(100)
        expect(storeB.getCapacity()).toBe(200)
    })
});

describe('mock.store.3 > _setResourceCapacity()', () => {
    it("mock.store.3.1 > must be positive with no error. Doesn't interfere with key-pair",()=>{
        let store = new Store();
        store._setResourceCapacity(RESOURCE_ENERGY,100);
        expect(Object.keys(store).length).toBe(0)
    })
    it("mock.store.3.2 > set values for 2 different resources. Doesn't interfere with key-pair",()=>{
        let store = new Store();
        store._setResourceCapacity(RESOURCE_ENERGY,100);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,200);
        expect(Object.keys(store).length).toBe(0)
    })
    it("mock.store.3.3 > overrides _setTotalCapacity(). Doesn't interfere with key-pair",()=>{
        let store = new Store();
        store._setTotalCapacity(500);
        store._setResourceCapacity(RESOURCE_ENERGY,100);
        expect(Object.keys(store).length).toBe(0)
        expect(store.getCapacity()).toBe(null)
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(100)
    })
    it("mock.store.3.4 > support labs; 2000 ENERGY + Any 1 other Mineral",()=>{
        let store = new Store();
        store._setResourceCapacity(LOOK_MINERALS,3000);
        store._setResourceCapacity(RESOURCE_ENERGY,2000);
        expect(Object.keys(store).length).toBe(0)

    })
});

describe('mock.store.4 > getCapacity()', () => {
    it("mock.store.4.1 > cap of a general purpose store",()=>{
        let store = new Store();
        store._setTotalCapacity(500);
        expect(store.getCapacity()).toBe(500)
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(500)

    })
    it("mock.store.4.2 > caps for limited purpose store",()=>{
        let store = new Store();
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,300);
        expect(store.getCapacity()).toBe(null)
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(500)
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(300)
    })
    it("mock.store.4.2 > set limited purpose store. Returns NULL for none supported Resource.",()=>{
        let store = new Store();
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(500)
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(null)
    })
    it("mock.store.4.3 > cap when empty",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=0;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(500)

    })
    it("mock.store.4.4 > cap when part full",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=250;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(500)
    })
    it("mock.store.4.5 > cap when full",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=500;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(500)
    })
    it("mock.store.4.6 > lab > ANY_ONE_MINERAL when have no mineral",()=>{
        // EXPECT ANY_ONE_MINERAL to return full capacity when not committed the mineral yet
        let store = new Store();
        store._setResourceCapacity(LOOK_MINERALS,500);
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_UTRIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_HYDROGEN)).toBe(500)
        expect(store.getCapacity(RESOURCE_LEMERGIUM_ACID)).toBe(500)
    })
    it("mock.store.4.7 > lab > ANY_ONE_MINERAL when have some mineral",()=>{
        // EXPECT: once committed to the mineral, only support cap for THAT mineral
        let kp={};
        kp[RESOURCE_ZYNTHIUM]=500;
        let store = new Store(kp);
        store._setResourceCapacity(LOOK_MINERALS,500);
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_UTRIUM)).toBe(null)
    })
    it("mock.store.4.8 > lab > ANY_ONE_MINERAL, can still check energy",()=>{
        // EXPECT: once committed to the mineral, that we can still separately store ENERGY
        let kp={};
        kp[RESOURCE_ZYNTHIUM]=500;
        let store = new Store(kp);
        store._setResourceCapacity(LOOK_MINERALS,500);
        store._setResourceCapacity(RESOURCE_ENERGY,200);
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(200)
    })

    it("mock.store.4.9 > lab > ANY_ONE_MINERAL, check lock in when filling AFTER construction",()=>{
        let store = new Store();
        store._setResourceCapacity(LOOK_MINERALS,500);
        store._setResourceCapacity(RESOURCE_ENERGY,200);
        store._set(RESOURCE_UTRIUM,50);
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(null)
        expect(store.getCapacity(RESOURCE_UTRIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(200)
    })
    it("mock.store.4.10 > lab > ANY_ONE_MINERAL, check unlock AFTER emptied and WAS locked in",()=>{
        let store = new Store();
        store._setResourceCapacity(LOOK_MINERALS,500);
        store._setResourceCapacity(RESOURCE_ENERGY,200);
        store._set(RESOURCE_UTRIUM,50);
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(null)
        expect(store.getCapacity(RESOURCE_UTRIUM)).toBe(500)
        store._set(RESOURCE_UTRIUM,0);
        expect(store.getCapacity(RESOURCE_ZYNTHIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_UTRIUM)).toBe(500)
        expect(store.getCapacity(RESOURCE_ENERGY)).toBe(200)
    })
});

describe('mock.store.5 > getFreeCapacity()', () => {
    it("mock.store.5.1 > when empty - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=0;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(500)
    })
    it("mock.store.5.2 > when part full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=50;
        kp[RESOURCE_ZYNTHIUM]=50;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(400)
    })
    it("mock.store.5.3 > when full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=250;
        kp[RESOURCE_ZYNTHIUM]=250;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(0)
    })

    it("mock.store.5.4 > when empty - limited store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=0;
        kp[RESOURCE_ZYNTHIUM]=0;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,400);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(500)
        expect(store.getFreeCapacity(RESOURCE_ZYNTHIUM)).toBe(400)
    })
    it("mock.store.5.5 > when part full - limited store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=100;
        kp[RESOURCE_ZYNTHIUM]=200;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,400);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(400)
        expect(store.getFreeCapacity(RESOURCE_ZYNTHIUM)).toBe(200)
    })
    it("mock.store.5.6 > when full - limited store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=500;
        kp[RESOURCE_ZYNTHIUM]=400;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,500);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,400);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(0)
        expect(store.getFreeCapacity(RESOURCE_ZYNTHIUM)).toBe(0)
    })

    it("mock.store.5.7 > one complicated lab test. ANY_ONE_MINERAL",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=1900;
        kp[RESOURCE_ZYNTHIUM]=250;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,2000);
        store._setResourceCapacity(LOOK_MINERALS,3000);
        expect(store.getFreeCapacity(RESOURCE_ENERGY)).toBe(100)
        expect(store.getFreeCapacity(RESOURCE_ZYNTHIUM)).toBe(2750)
        expect(store.getFreeCapacity(RESOURCE_UTRIUM)).toBe(null)
        store._set(RESOURCE_ZYNTHIUM,0)
        expect(store.getFreeCapacity(RESOURCE_ZYNTHIUM)).toBe(3000)
        expect(store.getFreeCapacity(RESOURCE_UTRIUM)).toBe(3000)
        store._set(RESOURCE_UTRIUM,500)
        expect(store.getFreeCapacity(RESOURCE_ZYNTHIUM)).toBe(null)
        expect(store.getFreeCapacity(RESOURCE_UTRIUM)).toBe(2500)
    })

    it("mock.store.5.8 > no resource passed. store is empty - general store",()=>{
        let store = new Store();
        store._setTotalCapacity(500);
        expect(store.getFreeCapacity()).toBe(500)
    })
    it("mock.store.5.9 > no resource passed. store is part full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=50;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getFreeCapacity()).toBe(450)
    })
    it("mock.store.5.10 > no resource passed. store is full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=500;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getFreeCapacity()).toBe(0)
    })
});

describe('mock.store.6 > getUsedCapacity()', () => {
    it("mock.store.6.1 > when empty - general store",()=>{
        let store = new Store();
        store._setTotalCapacity(500);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(0)

    })
    it("mock.store.6.2 > when part full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=500;
        kp[RESOURCE_ZYNTHIUM]=400;
        let store = new Store(kp);
        store._setTotalCapacity(1000);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(500)
    })
    it("mock.store.6.3 > when full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=500;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(500)
    })

    it("mock.store.6.4 > when empty - limited store",()=>{
        let kp={};
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,300);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,500);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(0)
        expect(store.getUsedCapacity(RESOURCE_ZYNTHIUM)).toBe(0)
    })
    it("mock.store.6.5 > when part full - limited store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=50;
        kp[RESOURCE_ZYNTHIUM]=100;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,300);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,500);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(50)
        expect(store.getUsedCapacity(RESOURCE_ZYNTHIUM)).toBe(100)
    })
    it("mock.store.6.6 > when full - limited store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=300;
        kp[RESOURCE_ZYNTHIUM]=500;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,300);
        store._setResourceCapacity(RESOURCE_ZYNTHIUM,500);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(300)
        expect(store.getUsedCapacity(RESOURCE_ZYNTHIUM)).toBe(500)
    })

    it("mock.store.6.7 > one complicated lab test. ANY_ONE_MINERAL",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=1900;
        kp[RESOURCE_ZYNTHIUM]=250;
        let store = new Store(kp);
        store._setResourceCapacity(RESOURCE_ENERGY,2000);
        store._setResourceCapacity(LOOK_MINERALS,3000);
        expect(store.getUsedCapacity(RESOURCE_ENERGY)).toBe(1900)
        expect(store.getUsedCapacity(RESOURCE_ZYNTHIUM)).toBe(250)
        expect(store.getUsedCapacity(RESOURCE_UTRIUM)).toBe(null)
        store._set(RESOURCE_ZYNTHIUM,0)
        expect(store.getUsedCapacity(RESOURCE_ZYNTHIUM)).toBe(0)
        expect(store.getUsedCapacity(RESOURCE_UTRIUM)).toBe(0)
        store._set(RESOURCE_UTRIUM,500)
        expect(store.getUsedCapacity(RESOURCE_ZYNTHIUM)).toBe(null)
        expect(store.getUsedCapacity(RESOURCE_UTRIUM)).toBe(500)
    })

    it("mock.store.6.8 > no resource passed. store is empty - general store",()=>{
        let kp={};
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getUsedCapacity()).toBe(0)
    })
    it("mock.store.6.9 > no resource passed. store is part full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=50;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getUsedCapacity()).toBe(50)
    })
    it("mock.store.6.10 > no resource passed. store is full - general store",()=>{
        let kp={};
        kp[RESOURCE_ENERGY]=500;
        let store = new Store(kp);
        store._setTotalCapacity(500);
        expect(store.getUsedCapacity()).toBe(500)
    })

});
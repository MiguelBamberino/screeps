require('./Store');
require('./RoomObject')
const {STRUCTURE_CONTROLLER, STRUCTURE_STORAGE, STRUCTURE_TERMINAL,OK, STRUCTURE_CONTAINER, STRUCTURE_EXTENSION,
    RESOURCE_ENERGY
} = require("@screeps/common/lib/constants");

class Structure extends RoomObject{
    constructor(id, type,room) {

        super({x:1,y:1,roomName:room.name},room)
        this.id=id;
        this.structureType=type;
        this.hits = 0;
        this.hitsMax = 0;
        /* @var Store|undefined */
        this.store=undefined;
    }
    _setHits(hits,hitsMax=undefined){
        this.hits = hits;
        this.hitsMax= Number.isInteger(hitsMax)?hitsMax:this.hitsMax;
    }
    _setStore(resources={}){
        this.store = new Store(resources);
        return this.store;
    }
    destroy(){return this._func_fake("destroy",undefined,OK)}
}
class OwnedStructure extends Structure{
    constructor(id,type,room,ownerName) {
        super(id,type,room);
        this._setOwner(ownerName);
    }
    _setOwner(name){
        this.my = (name==='MadDokMike');
        this.owner={ username:name};
    }
}
class StructureContainer extends Structure{
    constructor(id,room) {
        super(id,STRUCTURE_CONTAINER,room);
        this._setHits(250000,250000);
        this._setStore()._setTotalCapacity(2000);
        this.ticksToDecay = 250000;
    }
}
class StructureController extends OwnedStructure{
    constructor(id,room,level=0,ownerName=undefined) {
        super(id,STRUCTURE_CONTROLLER,room,ownerName);
        this.level = level;
        this.progress=0;
        this.progressTotal=200;

        this.safeMode=undefined;
        this.safeModeAvailable=0;
        this.ticksToDowngrade=0;
        this.upgradeBlocked=0;
        if(!ownerName){
            this.my=false;
            this.owner=undefined;
        }
    }
    activateSafeMode(){return this._func_fake("activateSafeMode",undefined,OK)}
    unclaim(){return this._func_fake("unclaim",undefined,OK)}
}
class StructureExtension extends OwnedStructure{
    constructor(id,room,ownerName,rcl=1) {
        super(id,STRUCTURE_EXTENSION,room,ownerName);
        this._setHits(1000,1000);
        this._setStore()
        if(rcl===8)this.store._setResourceCapacity(RESOURCE_ENERGY,200);
        if(rcl===7)this.store._setResourceCapacity(RESOURCE_ENERGY,100);
        else this.store._setResourceCapacity(RESOURCE_ENERGY,50);
    }
}

global.Structure = Structure;
global.OwnedStructure = OwnedStructure;
global.StructureContainer = StructureContainer;
global.StructureController = StructureController;
global.StructureExtension = StructureExtension;

module.exports = {
    _createController(roomName,level=0){
        let c = this._create(STRUCTURE_CONTROLLER,roomName);
        c.level = level;
        return c;
    },
    _createStorage(roomName,resources={}){
        let s = this._create(STRUCTURE_STORAGE,roomName);
        s._createStore(resources)._setTotalCapacity(1000000);
        return s;
    },
    _createTerminal(roomName,resources={}){
        let t = this._create(STRUCTURE_TERMINAL,roomName);
        t._createStore(resources)._setTotalCapacity(300000);
        t.cooldown = 0;
        t.__send_response = OK;
        t.send= function(resourceType, amount, destination){
            return this.__send_response;
        }
        return t;
    }
}
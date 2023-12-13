require('./Store');
const {STRUCTURE_CONTROLLER, STRUCTURE_STORAGE, STRUCTURE_TERMINAL,OK} = require("@screeps/common/lib/constants");

global.Structure=function(type,roomName){
    this.id="c123456789"
    this.structureType=type
    this.pos={x:1,y:1,roomName:roomName}
}
Structure.prototype._setOwner=function(name){
    this.my = (name==='MadDokMike');
    this.owner={ username:name};
}
Structure.prototype._createStore=function(resources={}){
    this.store = new Store(resources);
    return this.store;
}

// monkey-patch in additional prototypes
require('../../src/prototype.structure.store.js');

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
    },
    _create(type,roomName){
        return new Structure(type,roomName);
    }
}
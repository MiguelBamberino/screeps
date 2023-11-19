const {STRUCTURE_STORAGE, STRUCTURE_CONTROLLER} = require("@screeps/common/lib/constants");

module.exports = {
    time:1,
    rooms:{},
    structures:{},
    resetData(){
        this.rooms={};
        this.structures={};
        Memory={};
    },
    addHallwayRoom(name){
        this.rooms[name] = this._createRoom(name);
        return this.rooms[name];
    },
    addRoom(name,level=1){
        this.rooms[name]=this._createRoom(name);
        this.rooms[name].controller=this._createController(name,level);
        this.rooms[name].storage= level>=4?this._createStorage():undefined;
        return this.rooms[name];
    },
    _createController(roomName,level=0){
        let c = this._createStructure(STRUCTURE_CONTROLLER,roomName);
        c.level = level;
        return c;
    },
    _createStorage(roomName){
        return this._createStructure(STRUCTURE_STORAGE,roomName)
    },
    _createRoom(name){
        return {
            name:name,
            find(type){
                return [];
            }
        }
    },
    _createStructure(type,roomName){
        return {
            id:"c123456789",
            structureType:type,
            pos:{x:1,y:1,roomName:roomName},
            _setOwner(name){
                this.my=(name==='MadDokMike');
                this.owner={username:name};
            },
            _setStore(resources={}){
                this.store=resources;
            }
        }
    }
}
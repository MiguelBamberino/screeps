const {STRUCTURE_STORAGE, STRUCTURE_CONTROLLER, STRUCTURE_TERMINAL} = require("@screeps/common/lib/constants");
let RoomFactory=require('./Room');
module.exports = {
    time:1,
    rooms:{},
    structures:{},
    _resetData(){
        this.time = 1;
        this.rooms={};
        this.structures={};
        Memory={};
    },
    _addHallwayRoom(name){
        this.rooms[name] = RoomFactory._create(name);
        return this.rooms[name];
    },
    _addPlayerRoom(name,level=0,ownerName=undefined){
        this.rooms[name]=RoomFactory._createPlayerRoom(name,level,ownerName);
        return this.rooms[name];
    },
}

const {STRUCTURE_STORAGE, STRUCTURE_CONTROLLER, STRUCTURE_TERMINAL} = require("@screeps/common/lib/constants");
let RoomFactory=require('./Room');
function
__buildMarket(){
    return {
        credits:0,
        incomingTransaction:[],
        outgoingTransaction:[],
    };
}
module.exports = {
    time:1,
    rooms:{},
    market:__buildMarket(),
    structures:{},
    _resetData(){
        this.time = 1;
        this.rooms={};
        this.market=__buildMarket()
        this.structures={};
        Memory={};
    },
    _tickOver(){
        this.time++;
    },
    _addHallwayRoom(name){
        this.rooms[name] = RoomFactory._create(name);
        return this.rooms[name];
    },
    _addSourceKeeperRoom(name){
        this.rooms[name] = RoomFactory._create(name);
        return this.rooms[name];
    },
    _addPlayerRoom(name,level=0,ownerName=undefined){
        this.rooms[name]=RoomFactory._createPlayerRoom(name,level,ownerName);
        return this.rooms[name];
    },
}

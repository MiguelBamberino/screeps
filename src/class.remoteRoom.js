const AbstractRoom = require('class.abstractRoom')

class RemoteRoom extends AbstractRoom{
    // 
    constructor(supportSpawn,roomName,defend=true){
        super(supportSpawn+'-West',roomName);
        this.supportSpawn = supportSpawn;
        this.defend = defend;
        this.maxDistanceFromSpawn = 100;
        
    }
    
    runTick(){
        if(!this.safeToRun())return false;
        
        if(!mb.hasRoom(this.roomName)){
            this.scoutRoom();
            return;
        }
    }
    safeToRun(){
        if(!Game.spawns[this.supportSpawn]){clog("cannot run. Support spawn is gone",this.roomName);return false;}
    }
    planOnFirstVision(){
        clog(mb.getControllerForRoom(this.roomName),'controller');
        clog(mb.getSources({roomNames:[this.roomName]}),'sources')
    }
    planOutRoom(){
        
    }
    scoutRoom(){
       let cname = this.name+'-scout';
        if(!Game.creeps[cname]){
            Game.spawns[this.supportSpawn].spawnCreepX('1m',cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
       
            creep.moveOffRoomEdge();
            
            let target = new RoomPosition(25,25,this.roomName);
            if(!creep.pos.isEqualTo(target))
                creep.moveToPos(target);
            
            if(!mb.hasRoom(this.roomName) && creep.pos.roomName==this.roomName){
                mb.scanRoom(this.roomName);
                this.planOnFirstVision();
            }
        }
    }
}

module.exports = RemoteRoom;
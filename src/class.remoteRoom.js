const AbstractRoom = require('class.abstractRoom')

class RemoteRoom extends AbstractRoom{
    // 
    constructor(supportSpawn,roomName,direction,defend=true){
        super(supportSpawn+'-'+direction,roomName);
        this.supportSpawn = supportSpawn;
        this.defend = defend;
        this.maxDistanceFromSpawn = 100;
        this.sources=[];
        
        if(mb.hasRoom(this.roomName)){
            this.buildMetaData();
        }
    }
    
    

    planOnFirstVision(){
        clog(mb.getControllerForRoom(this.roomName),'controller');
        clog(mb.getSources({roomNames:[this.roomName]}),'sources')
    }
    buildMetaData(){
        let srcs = mb.getSources({roomNames:[this.roomName],requireVision:false});
        for(let src of srcs){
            // let work out the path length and decide with its worth collecting
            let result = PathFinder.search(Game.spawns[this.supportSpawn].pos, new RoomPosition(src.pos.x,src.pos.y,src.pos.roomName) ,{swampCost:1});
            
            clog( result.path.length,src.pos )
            
            //clog( Game.creeps[this.name+'-scout'].pos.findPathTo(src).length,src.pos )
        }
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
    ////////////////////////////////////////////////////////////
    // Override functions - that configure templates
    ////////////////////////////////////////////////////////////
    runTickBody(){
        
       
        
        if(!mb.hasRoom(this.roomName)){
            this.scoutRoom();
            return;
        }
        
        // if supportspawn < RCL3 
            // override reserving to false
        
        // if invaderCoure && !reserving
            // abandon room for X ticks
        
        // if reserving
            // run reserver
            // if invaderCore
                // dispatch attackers
        
        // for each active source
            // run harvesters
        
        // 
        
    }
    workForceRoleNames(){
        return ['harvester','reserver'];
    }
    safeToRun(){
        if(!Game.spawns[this.supportSpawn]){clog("cannot run. Support spawn is gone",this.roomName);return false;}
        return true;
    }
}

module.exports = RemoteRoom;
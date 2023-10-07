
/**
 * Find a given object type at a location
 * this function will search and filter results
 */ 
Room.prototype.lookForStructureAt = function(type,x,y){
    let results = this.lookForAt(LOOK_STRUCTURES,x,y);
    for(let r in results){
        if(results[r].structureType ===type){
            return results[r]; 
        }
    }
    return false;
}
/**
 * Find a construction site at this location
 */ 
Room.prototype.lookForConstructionAt = function(x,y){
    let results = this.lookForAt(LOOK_CONSTRUCTION_SITES,x,y);
    for(let r in results){
        return results[r]; 
    }
    return false;
}
////////////////////////////////////////////////////////////////////////////////////
// Creeps Seen Cache
////////////////////////////////////////////////////////////////////////////////////
global.CREEPS_ROOM_CACHE={};

Room.prototype.getHostiles=function(){
    
    if(this.baddies===undefined){
        this.baddies={};
    }

    if(this.baddies[Game.time]===undefined){
        this.baddies={};
        this.baddies[Game.time] = this.find(FIND_HOSTILE_CREEPS);
       // clog(Game.time,this.name+":getHostiles")
    }
   return this.baddies[Game.time];
}
Room.prototype._parseHostileCreeps=function(cacheSensitivity=5){
    
    //clog(Game.time,'Game.time')
   // clog(CREEPS_ROOM_CACHE,'CREEPS_ROOM_CACHE[this.name]')
    
    if(CREEPS_ROOM_CACHE[this.name] && CREEPS_ROOM_CACHE[this.name].last_cache + cacheSensitivity < Game.time ){
         
        //clog( (Game.time-CREEPS_ROOM_CACHE[this.name].last_cache)+' ticks ago','Deleted CREEPS_ROOM_CACHE for '+this.name+'. Created :')
         delete CREEPS_ROOM_CACHE[this.name];
    }

    if(CREEPS_ROOM_CACHE[this.name]===undefined){
        
        //clog(Game.time,'Creating CREEPS_ROOM_CACHE for '+this.name+' at :')

        CREEPS_ROOM_CACHE[this.name]={
            last_cache:Game.time,
            all:[],allies:[],nonallies:[],dangerousCreeps:[],
            skeepers:[],invaders:[],
            enemyPlayerCreeps:[],enemyPlayerFighters:[],enemyPlayerCivilians:[]
            
        };
        
        let creeps =  this.find(FIND_HOSTILE_CREEPS);
        for(let creep of creeps){
            
            if( BOT_ALLIES.includes(creep.owner.username) ){
                CREEPS_ROOM_CACHE[this.name].allies.push(creep.id);
            }
            else{
                CREEPS_ROOM_CACHE[this.name].nonallies.push(creep.id);
            } 
            
            if( creep.owner.username=='Source Keeper' ){
                CREEPS_ROOM_CACHE[this.name].dangerousCreeps.push(creep.id);
                CREEPS_ROOM_CACHE[this.name].skeepers.push(creep.id);
            }
            else if( creep.owner.username=='Invader' ){
                CREEPS_ROOM_CACHE[this.name].dangerousCreeps.push(creep.id);
                CREEPS_ROOM_CACHE[this.name].invaders.push(creep.id);
            }else {
                
                CREEPS_ROOM_CACHE[this.name].enemyPlayerCreeps.push(creep.id);
                if(creep.isFighter() || creep.isDismantler()){
                    CREEPS_ROOM_CACHE[this.name].dangerousCreeps.push(creep.id);
                    CREEPS_ROOM_CACHE[this.name].enemyPlayerFighters.push(creep.id);
                }else if(creep.isCivilian()){
                    CREEPS_ROOM_CACHE[this.name].enemyPlayerCivilians.push(creep.id);
                }
                
            }
            
        }
    }else{
       // clog(Game.time,'READ CREEPS_ROOM_CACHE for '+this.name+' at :')
    }
   return CREEPS_ROOM_CACHE[this.name];
}


Room.prototype.getAllyCreeps=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).allies;
     
}
Room.prototype.getNoneAllyCreeps=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).nonallies;
     
}
Room.prototype.getDangerousCreeps=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).dangerousCreeps;
}
Room.prototype.getEnemyPlayerCreeps=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).enemyPlayerCreeps;
}
Room.prototype.getEnemyPlayerFighters=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).enemyPlayerFighters;
}
Room.prototype.getEnemyPlayerCivilians=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).enemyPlayerCivilians;
}
Room.prototype.getSourceKeepers=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).skeepers;
}
Room.prototype.getInvaders=function(cacheSensitivity=5){
    return this._parseHostileCreeps(cacheSensitivity).invaders;
}
/*

  for(let hostile of hostiles){
                    let theirTotalFightParts = hostile.partCount(ATTACK)+hostile.partCount(RANGED_ATTACK);
                    let myTotalFightyParts = creep.partCount(ATTACK)+creep.partCount(RANGED_ATTACK);
                    creep.memory.fleeZoneOfControl = false;
                    if(
                        creep.memory.dontFlee===undefined &&
                        this.pos.getRangeTo(hostile) < 4 
                        && myTotalFightyParts < theirTotalFightParts 
                        && hostile.owner.username!='GT500' && hostile.owner.username!='NeomCamouflage' && hostile.owner.username!='joethebarber' ){
                        // if the creep is too close, then flee, before repathing
                        let r = target.pos?target.pos.roomName:target.roomName;
                        target = new RoomPosition(25,25,r);
                        creep.memory.fleeZoneOfControl = true;
                       // clog(hostile.name+" stronger than "+creep.name ,'fleeing')
                    }
                    
                }

*/
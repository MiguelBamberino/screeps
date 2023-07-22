
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
global.CREEPS_IN_ROOM_CACHE={};

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
    
    clog(Game.time,'Game.time')
    clog(CREEPS_IN_ROOM_CACHE,'CREEPS_IN_ROOM_CACHE[this.name]')
    
    if(CREEPS_IN_ROOM_CACHE[this.name] && CREEPS_IN_ROOM_CACHE[this.name].last_cache + cacheSensitivity < Game.time ){
         delete CREEPS_IN_ROOM_CACHE[this.name];
         clog(Game.time-cacheSensitivity,'Deleted hostile cache for '+this.name+' at :')
    }

    if(CREEPS_IN_ROOM_CACHE[this.name]===undefined){
        
        clog(Game.time,'Creating hostile cache for '+this.name+' at :')

        CREEPS_IN_ROOM_CACHE[this.name]={
            last_cache:Game.time,
            all:[],allies:[],
            skeepers:[],invaders:[],
            enemyPlayerCreeps:[],enemyPlayerFighters:[],enemyPlayerCivilians:[]
            
        };
        
        let creeps =  this.find(FIND_HOSTILE_CREEPS);
        for(let creep of creeps){
            
            if( Memory.allies.includes(creep.owner.username) ){
                CREEPS_IN_ROOM_CACHE[this.name].allies.push(creep.name);
            }
            else if( creep.owner.username=='Source Keeper' ){
                CREEPS_IN_ROOM_CACHE[this.name].skeepers.push(creep.name);
            }
            else if( creep.owner.username=='Invader' ){
                CREEPS_IN_ROOM_CACHE[this.name].invaders.push(creep.name);
            }else {
                
                CREEPS_IN_ROOM_CACHE[this.name].enemyPlayerCreeps.push(creep.name);
                if(creep.isFighter()){
                    CREEPS_IN_ROOM_CACHE[this.name].enemyPlayerFighters.push(creep.name);
                }else if(creep.isCivilian()){
                    CREEPS_IN_ROOM_CACHE[this.name].enemyPlayerCivilians.push(creep.name);
                }
                
            }
            
        }
    }else{
        clog(Game.time,'READ hostile cache for '+this.name+' at :')
    }
   return CREEPS_IN_ROOM_CACHE[this.name];
}


Room.prototype.getAllyCreeps=function(){
    return this._parseHostileCreeps().allies;
     
}
Room.prototype.getDangerousCreeps=function(){
    
}
Room.prototype.getEnemyPlayerFighters=function(){
    return this._parseHostileCreeps().enemyPlayerFighters;
}
Room.prototype.getEnemyPlayerCivilians=function(){
    return this._parseHostileCreeps().enemyPlayerCivilians;
}
Room.prototype.getSourceKeepers=function(){
    return this._parseHostileCreeps().skeepers;
}
Room.prototype.getInvaders=function(){
    return this._parseHostileCreeps().invaders;
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
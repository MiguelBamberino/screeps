
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
Room.prototype._parseHostileCreeps=function(){
    
    let cacheLength=10;
    if(this.creep_lookup===undefined){
        this.creep_lookup={};
    }

    if(this.creep_lookup[Game.time]===undefined){
        
        if(this.creep_lookup[Game.time-cacheLength]){
            delete this.creep_lookup[Game.time-cacheLength];
            clog(Game.time-cacheLength,'Deleted hostile cache for '+this.name+' at :')
        }
        
        this.creep_lookup[Game.time]={
            all:[],allies:[],
            skeepers:[],invaders:[],
            enemyPlayerCreeps:[],enemyPlayerFighters:[],enemyPlayerCivilians:[]
            
        };
        
        let creeps =  this.find(FIND_HOSTILE_CREEPS);
        for(let creep of creeps){
            
            if( Memory.allies.includes(creep.owner.username) ){
                this.creep_lookup[Game.time].allies.push(creep.name);
            }
            else if( creep.owner.username=='Source Keeper' ){
                this.creep_lookup[Game.time].skeepers.push(creep.name);
            }
            else if( creep.owner.username=='Invader' ){
                this.creep_lookup[Game.time].invaders.push(creep.name);
            }else {
                this.creep_lookup[Game.time].enemyPlayerCreeps.push(creep.name);
            }
            
        }
        
       // clog(Game.time,this.name+":getHostiles")
    }
   return this.creep_lookup[Game.time];
}


Room.prototype.getAllyCreeps=function(){
    return this._parseHostileCreeps().allies;
     
}
Room.prototype.getDangerousCreeps=function(){
    
}
Room.prototype.getEnemyPlayerFighters=function(){
    
}
Room.prototype.getEnemyPlayerCivilians=function(){
    
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
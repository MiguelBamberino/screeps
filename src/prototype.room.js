
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


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

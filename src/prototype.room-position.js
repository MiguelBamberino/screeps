
/**
 * Find a given object type at a location
 * this function will search and filter results
 */ 
RoomPosition.prototype.lookForStructure = function(type){
    let results = this.lookFor(LOOK_STRUCTURES);
    for(let r in results){
        if(results[r].structureType ===type){
            return results[r]; 
        }
    }
    return false;
}
/**
 * Find a list of given objects by type in all adjacent squares 
 * this function will search and filter results
 * string type = a valid STRUCTURE_* constant
 * bool includeSelf=false, if set to true, will also look at this position too
 */ 
RoomPosition.prototype.lookForNearStructures = function(type,includeSelf=false){
    
    let positions = [];
    positions.push( new RoomPosition(this.x-1,this.y-1,this.roomName) );
    positions.push( new RoomPosition(this.x,this.y-1,this.roomName) );
    positions.push( new RoomPosition(this.x+1,this.y-1,this.roomName) );
    
    positions.push( new RoomPosition(this.x-1,this.y,this.roomName) );
    if(includeSelf){
        positions.push(this);
    }
    positions.push( new RoomPosition(this.x+1,this.y,this.roomName) );
    
    positions.push( new RoomPosition(this.x-1,this.y+1,this.roomName) );
    positions.push( new RoomPosition(this.x,this.y+1,this.roomName) );
    positions.push( new RoomPosition(this.x+1,this.y+1,this.roomName) );
    
    let found = [];
    for(let p in positions){
        let results = positions[p].lookFor(LOOK_STRUCTURES);
        for(let r in results){
            if(results[r].structureType ===type){
                found.push(results[r]); 
            }
        }
    }

    return found;
}
RoomPosition.prototype.findNearbyBuildableSpot = function () {
    const terrain = new Room.Terrain(this.roomName);
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;
            const newX = this.x + x;
            const newY = this.y + y;
            if (newX >= 0 && newX < 50 && newY >= 0 && newY < 50) {
                const terrainMask = terrain.get(newX, newY);
                if (terrainMask === 0) { // 0 means plain, no walls or swamps
                    const pos = new RoomPosition(newX, newY, this.roomName);
                    const structures = pos.lookFor(LOOK_STRUCTURES);
                    const constructionSites = pos.lookFor(LOOK_CONSTRUCTION_SITES);
                    if (structures.length === 0 && constructionSites.length === 0) {
                        return pos;
                    }
                }
            }
        }
    }
    return null;
}

/**
 * Find a list of given construction sites in all adjacent squares 
 * bool includeSelf=false, if set to true, will also look at this position too
 */ 
RoomPosition.prototype.lookForNearConstructions = function(includeSelf=false){
    
    let positions = [];
    positions.push( new RoomPosition(this.x-1,this.y-1,this.roomName) );
    positions.push( new RoomPosition(this.x,this.y-1,this.roomName) );
    positions.push( new RoomPosition(this.x+1,this.y-1,this.roomName) );
    
    positions.push( new RoomPosition(this.x-1,this.y,this.roomName) );
    if(includeSelf){
        positions.push(this);
    }
    positions.push( new RoomPosition(this.x+1,this.y,this.roomName) );
    
    positions.push( new RoomPosition(this.x-1,this.y+1,this.roomName) );
    positions.push( new RoomPosition(this.x,this.y+1,this.roomName) );
    positions.push( new RoomPosition(this.x+1,this.y+1,this.roomName) );
    
    let found = [];
    for(let p in positions){
        let results = positions[p].lookFor(LOOK_CONSTRUCTION_SITES);
        for(let r in results){
            found.push(results[r]); 
        }
    }

    return found;
}
/**
 * Find a construction site at this location
 */ 
RoomPosition.prototype.lookForConstruction = function(){
    let results = this.lookFor(LOOK_CONSTRUCTION_SITES);
    for(let r in results){
        return results[r]; 
    }
    return false;
}
/**
 * Find a given resource at this location
 */ 
RoomPosition.prototype.lookForResource = function (resource_type) {
    const resources = this.lookFor(LOOK_RESOURCES).filter(resource => resource.resourceType === resource_type);
    return resources.length > 0 ? resources[0] : false;
};
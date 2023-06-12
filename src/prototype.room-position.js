
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
    
    let positions = this.getNearbyPositions();
    if(includeSelf){
        positions.push(this);
    }
    
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
RoomPosition.prototype.isWalkable = function(checkForCreeps = false) {
    const terrain = Game.map.getRoomTerrain(this.roomName);
    if (terrain.get(this.x, this.y) & TERRAIN_MASK_WALL) {
        return false;
    }

    const structures = this.lookFor(LOOK_STRUCTURES);
    for (const structure of structures) {
        if (OBSTACLE_OBJECT_TYPES.includes(structure.structureType)) {
            return false;
        }
    }

    if (checkForCreeps) {
        const creeps = this.lookFor(LOOK_CREEPS);
        if (creeps.length > 0) {
            return false;
        }
    }

    return true;
}

RoomPosition.prototype.lookForNearbyWalkable = function(includeCreeps=false,includeSelf=true){
    let positions = this.getNearbyPositions();
    if(includeSelf){
        positions.push(this);
    }
    let walkable =[];
    for(let pos of positions){
        if(pos.isWalkable(includeCreeps))walkable.push(pos);
    }
    return walkable;
}
RoomPosition.prototype.getNearbyPositions = function(){
    let positions = [];
    
    if(this.x>1 && this.y>1)positions.push( new RoomPosition(this.x-1,this.y-1,this.roomName) );
    if(this.y>1)positions.push( new RoomPosition(this.x,this.y-1,this.roomName) );
    if(this.x<49 && this.y>1) positions.push( new RoomPosition(this.x+1,this.y-1,this.roomName) );
    
    if(this.x>1)positions.push( new RoomPosition(this.x-1,this.y,this.roomName) );
    if(this.x<49)positions.push( new RoomPosition(this.x+1,this.y,this.roomName) );
    
    if(this.x>1 && this.y<49)positions.push( new RoomPosition(this.x-1,this.y+1,this.roomName) );
    if(this.y<49)positions.push( new RoomPosition(this.x,this.y+1,this.roomName) );
    if(this.x<49 && this.y<49)positions.push( new RoomPosition(this.x+1,this.y+1,this.roomName) );
    return positions;
    
}
/**
 * Get all positions X away from this position
 * This function will go through all tiles in a square grid centered at pos with side length 2*range+1, 
 * and for each tile, it will create a new RoomPosition object and add it to the positions array, which it will return at the end. 
 * It also checks to make sure the positions are within the room boundaries, as RoomPosition objects with coordinates outside these boundaries are not valid.
 * Please note that this function returns all positions in a square with sides of length 2*range+1, not a circle. 
 */
RoomPosition.prototype.getPositionsInRange=function(range) {
    let positions = [];
    for(let dx = -range; dx <= range; dx++) {
        for(let dy = -range; dy <= range; dy++) {
            let x = this.x + dx;
            let y = this.y + dy;
            
            // Only add positions inside room boundaries
            if(x >= 0 && x < 50 && y >= 0 && y < 50) {
                positions.push(new RoomPosition(x, y, this.roomName));
            }
        }
    }
    return positions;
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


RoomPosition.prototype.colourIn = function(colour){
     Game.rooms[this.roomName].visual.circle(this,{fill: colour, radius: 0.55, stroke: colour});
}
RoomPosition.prototype.drawPolyAround = function(distance,colour='red') {
    const { x, y, roomName } = this;

    // Calculate the corners of the square
    const topLeft = [x - distance, y - distance];
    const topRight = [x + distance, y - distance];
    const bottomRight = [x + distance, y + distance];
    const bottomLeft = [x - distance, y + distance];

    // Define the points of the polygon
    const points = [topLeft, topRight, bottomRight, bottomLeft, topLeft]; // Close the polygon by returning to the first point

    // Draw the polygon using RoomVisual
    new RoomVisual(roomName).poly(points, { stroke: colour, fill: colour, opacity:0.2, strokeWidth: 0.15 });

    // Return the points for further use
    return points;
}


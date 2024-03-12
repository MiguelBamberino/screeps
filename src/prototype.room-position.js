RoomPosition.prototype.isRoomEdge = function(){

    if( this.isLeftRoomEdge() ){
        return true;
    }
    else if( this.isTopRoomEdge() ){
        return true;

    }
    else if( this.isRightRoomEdge() ){
        return true;
    }
    else if( this.isBottomRoomEdge() ){
        return true;
    }else{
        return false;
    }
}
RoomPosition.prototype.nearRoomEdge = function(){

    if( this.nearLeftRoomEdge() ){
        return true;
    }
    else if( this.nearTopRoomEdge() ){
        return true;

    }
    else if( this.nearRightRoomEdge() ){
        return true;
    }
    else if( this.nearBottomRoomEdge() ){
        return true;
    }else{
        return false;
    }
}
RoomPosition.prototype.isLeftRoomEdge = function(){
    return (this.x===0);
}
RoomPosition.prototype.nearLeftRoomEdge = function(){
    return (this.x===1);
}

RoomPosition.prototype.isRightRoomEdge = function(){
    return (this.x===49);
}
RoomPosition.prototype.nearRightRoomEdge = function(){
    return (this.x===48);
}

RoomPosition.prototype.isTopRoomEdge = function(){
    return (this.y===0);
}
RoomPosition.prototype.nearTopRoomEdge = function(){
    return (this.y===1);
}

RoomPosition.prototype.isBottomRoomEdge = function(){
    return (this.y===49);
}
RoomPosition.prototype.nearBottomRoomEdge = function(){
    return (this.y===48);
}
/**
 * Get direction in opposite direction to the target object
 * for example, if obj was LEFT, this would return RIGHT
 * @param RoomPosition|RoomObject obj
 * @returns Number 0-8 Screeps Direction constant
 */
RoomPosition.prototype.getReverseDirectionTo = function(obj){
    let dir = this.getDirectionTo(obj);
    if(dir===TOP)return BOTTOM;
    if(dir===TOP_RIGHT)return BOTTOM_LEFT;
    if(dir===RIGHT)return LEFT;
    if(dir===BOTTOM_RIGHT)return TOP_LEFT;
    if(dir===BOTTOM)return TOP;
    if(dir===BOTTOM_LEFT)return TOP_RIGHT;
    if(dir===LEFT)return RIGHT;
    if(dir===TOP_LEFT)return BOTTOM_RIGHT;
}
/**
 * Given a direction, return the adjacent position in that direction
 * If this would be a room edge, return false
 * @param dir
 * @param RoomPosition|false
 */
RoomPosition.prototype.getPosInDirection = function(dir){
    if(this.isRoomEdge())return false;
    if(dir===TOP_LEFT)return new RoomPosition(this.x-1,this.y-1,this.roomName);
    if(dir===TOP)return new RoomPosition(this.x,this.y-1,this.roomName);
    if(dir===TOP_RIGHT)return new RoomPosition(this.x+1,this.y-1,this.roomName);
    if(dir===LEFT)return new RoomPosition(this.x-1,this.y,this.roomName);
    if(dir===RIGHT)return new RoomPosition(this.x+1,this.y,this.roomName);
    if(dir===BOTTOM_LEFT)return new RoomPosition(this.x-1,this.y+1,this.roomName);
    if(dir===BOTTOM)return new RoomPosition(this.x,this.y+1,this.roomName);
    if(dir===BOTTOM_RIGHT)return new RoomPosition(this.x+1,this.y+1,this.roomName);
}
RoomPosition.prototype.getPosAtDistanceAndAngle = function(distance, angle) {
    // Adjust the angle for the game's coordinate system
    const adjustedAngle = (angle - 90 + 360) % 360;
    const rad = (adjustedAngle * Math.PI) / 180;

    // Calculate the new x and y coordinates
    let newX = Math.round(this.x + distance * Math.cos(rad));
    if(newX>49)newX=49;
    let newY = Math.round(this.y + distance * Math.sin(rad));
    if(newY>49)newY=49;
    //console.log("newX",newX);
    //console.log("newY",newY);

    return new RoomPosition(newX, newY, this.roomName);
}

RoomPosition.prototype.getOffsets = function(targetPosition) {
    // Ensure the target position is a valid RoomPosition object
    if (!(targetPosition instanceof RoomPosition)) {
        throw new Error('The target must be an instance of RoomPosition.');
    }

    // Ensure both positions are in the same room
    if (this.roomName !== targetPosition.roomName) {
        throw new Error('Both RoomPosition objects must be in the same room.');
    }

    return {
        x: targetPosition.x - this.x,
        y: targetPosition.y - this.y,
    };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////
// Finding positions within/at certain range criteria
/////////////////////////////////////////////////////////////////////////////////////////////////////

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
 * Get all positions within X distance from this position
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
/**
 * Get all exactly positions X away from this position
 * This function will go through all tiles in a square grid centered at pos with side length 2*range+1, 
 * and for each tile, it will create a new RoomPosition object and add it to the positions array, which it will return at the end. 
 * It also checks to make sure the positions are within the room boundaries, as RoomPosition objects with coordinates outside these boundaries are not valid.
 * Please note that this function returns all positions in a square with sides of length 2*range+1, not a circle. 
 */
RoomPosition.prototype.getPositionsAtRangeEdge=function(range) {
    let positions = [];
    for(let dx = -range; dx <= range; dx++) {
        for(let dy = -range; dy <= range; dy++) {
            let x = this.x + dx;
            let y = this.y + dy;
            
           // Only consider positions that are exactly X away
            if(!((Math.abs(dx) === range) || (Math.abs(dy) === range))) {
                continue;
            }


            
            // Only add positions inside room boundaries
            if(x >= 0 && x < 50 && y >= 0 && y < 50) {
                positions.push(new RoomPosition(x, y, this.roomName));
            }
        }
    }
    return positions;
}
/**
 * Get all the positions that sit at the edge of an area/rect that is defined by L T R B
 * The positions will be within the distances set, so top=3 would be positions this.y-3
 * @param ints left, top, right, bottom
 * @return array of positions
 * 
 **/
RoomPosition.prototype.getPositionsAtAreaEdge = function(left, top, right, bottom) {
    let positions = [];
    
    // Top edge
    for(let x = (this.x-left); x <= (this.x+right); x++) {
        if(x >= 0 && x < 50 && this.y-top >= 0 && this.y-top < 50) {
            positions.push(new RoomPosition(x, this.y-top, this.roomName));
        }
    }
    
    // Bottom edge
    for(let x = (this.x-left); x <= (this.x+right); x++) {
        if(x >= 0 && x < 50 && this.y+bottom >= 0 && this.y+bottom < 50) {
            positions.push(new RoomPosition(x, this.y+bottom, this.roomName));
        }
    }

    // Left edge, but skipping the corners since they are already added in the top and bottom edges
    for(let y = this.y-top+1; y < this.y+bottom; y++) {
        if(this.x-left >= 0 && this.x-left < 50 && y >= 0 && y < 50) {
            positions.push(new RoomPosition(this.x-left, y, this.roomName));
        }
    }

    // Right edge, skipping the corners
    for(let y = this.y-top+1; y < this.y+bottom; y++) {
        if(this.x+right >= 0 && this.x+right < 50 && y >= 0 && y < 50) {
            positions.push(new RoomPosition(this.x+right, y, this.roomName));
        }
    }

    return positions;
}
/**
 * Get all the positions inside of an area/rect that is defined by L T R B
 * The positions will be within the distances set, so top=3 would be positions this.y-3
 * @param ints left, top, right, bottom
 * @return array of positions
 * 
 **/
RoomPosition.prototype.getPositionsInsideArea = function(left, top, right, bottom) {
    let positions = [];
    
    for(let x = (this.x-left); x <= (this.x+right); x++) {
        for(let y = (this.y-top); y <= (this.y+bottom); y++) {
            if(x >= 0 && x < 50 && y >= 0 && y < 50) {
                positions.push(new RoomPosition(x, y, this.roomName));
            }
        }
    }

    return positions;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Finding spots buildable/ walkable
/////////////////////////////////////////////////////////////////////////////////////////////////////

RoomPosition.prototype.findBuildableSpotsAtAreaEdge = function (left, top, right, bottom,structureType=STRUCTURE_RAMPART) {
    let positions =[];
    for(let pos of this.getPositionsAtAreaEdge(left, top, right, bottom)){
        if(pos.canBuild(structureType))positions.push(pos)
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
RoomPosition.prototype.isWalkable = function(checkForCreeps = false,checkForStructures=true) {
    const terrain = Game.map.getRoomTerrain(this.roomName);
    if (terrain.get(this.x, this.y) & TERRAIN_MASK_WALL) {
        return false;
    }
    if(checkForStructures){
        const structures = this.lookFor(LOOK_STRUCTURES);
        for (const structure of structures) {
            if (OBSTACLE_OBJECT_TYPES.includes(structure.structureType)) {
                return false;
            }
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
RoomPosition.prototype.canBuild = function(structureType,allowWalls=false) {

    // Get the terrain for the room
    const terrain = new Room.Terrain(this.roomName);

    // Check if the terrain is wall, as no structure can be built on walls
    if(terrain.get(this.x, this.y) === TERRAIN_MASK_WALL) {
        // if we are allowing walls and the structure could be built on a wall, then DONT return false...don't not not not pfft 
        if(  !(allowWalls && structureType===STRUCTURE_ROAD) ){
            return false;
        }
    }

    // Check if there's already a structure or construction site at this position
    const constructionSitesAtPos = this.lookFor(LOOK_CONSTRUCTION_SITES);
    if(constructionSitesAtPos.length > 0) {
        return false;
    }
    
    let results = this.lookFor(LOOK_STRUCTURES);
    let haveNoneWalkable = false;
    for(let r in results){
        // if we already have this structure, then bail
        if(results[r].structureType ===structureType){
            return false; 
        }
        if( [STRUCTURE_RAMPART,STRUCTURE_ROAD,STRUCTURE_CONTAINER].includes(results[r].structureType)===false ){
            
            haveNoneWalkable=true;
        }
    }
    // ramps and roads go above and under other structures
    if( [STRUCTURE_RAMPART,STRUCTURE_ROAD].includes(structureType) ) return true;
    // containers or any other structures cant exist in the same spot
    if(haveNoneWalkable)return false;
    // if we got this far, then we must be able to build
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
/**
 * Find the best worker spots that contains a shared containerSpot
 * optimising for most adjacent spots, to the container, in the shortest path
 * from pathingPos
 * @param RoomPosition pathingPos - where would workers come from
 * @param int range - how far from the pos, can the positions be
 * @param int spotCap - the max worker positions to find
 */ 
RoomPosition.prototype.findBestStandingSpots=function(pathingPos,range=1,spotCap=8){
    
        logs.startCPUTracker('findBestStandingSpots');
        let closestDist = 99;
        let best = {containerSpot:false,standingSpots:[],path:false};
        
        // find all positions within the given range of the position. 
        // these will be our potential positions.
        let potentialSpots = this.getPositionsInRange(range);
        
        // for each spot, lets see how good it is. Assuming this ws the container spot
        for(let pos of potentialSpots){
            
            if(!pos.isWalkable(false,false))continue;
            
            let standingSpots=[];   
            // how many workable spots are adjacent to this spot.
			for(let pos2 of potentialSpots){
				if(pos.isNearTo(pos2) && pos2.isWalkable(false,false) && standingSpots.length < spotCap )standingSpots.push(pos2);
			}
    		
    		// prefer spots where the container would have more adj spots
    		if(standingSpots.length > best.standingSpots.length){
    			best.path = pathingPos.findPathTo(pos);
    			closestDist=best.path.length;
    			best.containerSpot=pos;
    			best.standingSpots=standingSpots;
    			continue;
    		}
            
    		// otherwise just prefer closer points thats not worse
    		if(standingSpots.length == best.standingSpots.length){
    		    // nest this check to cut down of wasting CPU on pathing useless options
    		    let path = pathingPos.findPathTo(pos);
    		    if(path.length<closestDist){
                    closestDist=path.length;
                    best.path = path;
        			best.containerSpot=pos;
        			best.standingSpots=standingSpots;
    		    }
            }
        }
        
        logs.stopCPUTracker('findBestStandingSpots',false);
        return best;
        
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Object Search functions
/////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Find a given object type at a location
 * this function will search and filter results
 */ 
RoomPosition.prototype.lookForCreep = function(){
    let results = this.lookFor(LOOK_CREEPS);
    if(results.length>0) return results[0];

    return false;
}

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
RoomPosition.prototype.lookForNearbyResource = function(resource_type,includeSelf=true,minAmount=1){
    let found = false;
    if(includeSelf){
         found = this.lookForResource(resource_type);
         //clog(found.pos,resource_type)
         if(found)return found;
    }
    
    for(let pos of this.getNearbyPositions()){
         found = pos.lookForResource(resource_type);
        if(found && (found.amount >= minAmount || found.mineralAmount >= minAmount))return found;
    }
    return false;
}
RoomPosition.prototype.lookForNearbyResources = function(resource_type,includeSelf=true,minAmount=1){
    let finds = [];
    let found = false;
    if(includeSelf){
         found = this.lookForResource(resource_type);
         //clog(found.pos,resource_type)
         if(found && (found.amount >= minAmount || found.mineralAmount >= minAmount))finds.push(found);
    }
    
    for(let pos of this.getNearbyPositions()){
         found = pos.lookForResource(resource_type);
        if(found && (found.amount >= minAmount || found.mineralAmount >= minAmount))finds.push(found);
    }
    return finds;
}
/**
 * Find a given resource at this location
 */ 
RoomPosition.prototype.lookForResource = function (resource_type) {
    const resources = this.lookFor(LOOK_RESOURCES).filter(resource => resource.resourceType === resource_type);
    return resources.length > 0 ? resources[0] : false;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Render functions
/////////////////////////////////////////////////////////////////////////////////////////////////////
RoomPosition.prototype.colourIn = function(colour,opa=0.5,text=false){
     Game.rooms[this.roomName].visual.circle(this,{fill: colour, radius: 0.55, stroke: colour,opacity:opa});
     if(text!==false)Game.rooms[this.roomName].visual.text(text,this)
}
RoomPosition.prototype.text = function(text,colour='#fff'){
     Game.rooms[this.roomName].visual.text(text,this,{strokeWidth:'0.01',font:' 0.4 Times New Roman', color: colour,align:'center'/*,backgroundColor:'#f00',opacity:0.5*/});
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
    new RoomVisual(roomName).poly(points, { stroke: colour, fill: colour, opacity:0.1, strokeWidth: 0.15 });

    // Return the points for further use
    return points;
}


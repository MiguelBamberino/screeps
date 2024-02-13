module.exports = function(){
    
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//// ACTION CORE FUNCS
	//////////////////////////////////////////////////////////////////////////////////////////////////////	
	Creep.prototype.swapPositions=function(them){
	    let res = this.moveTo(them.pos)
	    if(res!==OK)return res;
	    return them.moveTo(this.pos);
	}
    Creep.prototype.actOrMoveTo=function(action,target,param2){
        let result = this.act(action,target,param2);
        if(result == ERR_NOT_IN_RANGE) {
            result = this.moveToPos(target);
        }
        return result;
    }
    Creep.prototype.act = function(action,target,param2){
        this.moveOffRoomEdge();
        let result = this[action](target,param2);
        this.traceMsg(action+"="+result);
        this.debugSay("A:"+result);
        if(result == ERR_NOT_IN_RANGE) {
            return result;
        }
        return result;
    }
    /**
     * Handle if a creep wants to stand on room edge, it needs to budge 1 sq or get teleported
     */ 
    Creep.prototype.checkRoomBorderFaff = function(){

        if( this.onLeftRoomEdge() ){
            this.move(RIGHT);
        }
        else if( this.onTopRoomEdge() ){
            this.move(BOTTOM);
            
        }
        else if( this.onRightRoomEdge() ){
            this.move(LEFT);
        }
        else if( this.onBottomRoomEdge() ){
           this.move(TOP);
        }
    }
    Creep.prototype.moveOffRoomEdge = function(){

        if( this.onLeftRoomEdge() ){
            return this.move(RIGHT);
        }
        else if( this.onTopRoomEdge() ){
            return this.move(BOTTOM);
            
        }
        else if( this.onRightRoomEdge() ){
            return this.move(LEFT);
        }
        else if( this.onBottomRoomEdge() ){
           return this.move(TOP);
        }else{
            return ERR_NOT_IN_RANGE;
        }
    }
    Creep.prototype.moveOnToRoomEdge = function(){

        if( this.nearLeftRoomEdge() ){
            return this.move(LEFT);
        }
        else if( this.nearTopRoomEdge() ){
            return this.move(TOP);
            
        }
        else if( this.nearRightRoomEdge() ){
            return this.move(RIGHT);
        }
        else if( this.nearBottomRoomEdge() ){
           return this.move(BOTTOM);
        }else{
            return ERR_NOT_IN_RANGE;
        }
    }
    

    Creep.prototype.onRoomEdge = function(){

        if( this.onLeftRoomEdge() ){
            return true;
        }
        else if( this.onTopRoomEdge() ){
            return true;
            
        }
        else if( this.onRightRoomEdge() ){
            return true;
        }
        else if( this.onBottomRoomEdge() ){
           return true;
        }else{
            return false;
        }
    }
    Creep.prototype.nearRoomEdge = function(){

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
    Creep.prototype.onLeftRoomEdge = function(){
        return (this.pos.x==0);
    }
    Creep.prototype.nearLeftRoomEdge = function(){
        return (this.pos.x==1);
    }
    
    Creep.prototype.onRightRoomEdge = function(){
        return (this.pos.x==49);
    }
    Creep.prototype.nearRightRoomEdge = function(){
        return (this.pos.x==48);
    }
    
    Creep.prototype.onTopRoomEdge = function(){
        return (this.pos.y==0);
    }
    Creep.prototype.nearTopRoomEdge = function(){
        return (this.pos.y==1);
    }
    
    Creep.prototype.onBottomRoomEdge = function(){
        return (this.pos.y==49);
    }
    Creep.prototype.nearBottomRoomEdge = function(){
        return (this.pos.y==48);
    }
    Creep.prototype.fleeFrom = function(enemy) {
        // Calculate the direction to the enemy
        let directionToEnemy = this.pos.getDirectionTo(enemy);
        
        // Calculate the opposite direction
        let oppositeDirection = (directionToEnemy + 4) % 8;
        if (oppositeDirection === 0) {
            oppositeDirection = 8;
        }
    
        // Try to move in the opposite direction
        let result = this.move(oppositeDirection);
    
        // If the way is blocked and the creep cannot move, 
        // find an alternative path and move towards it
        if (result === ERR_NO_PATH || result === ERR_INVALID_TARGET || result === ERR_NOT_FOUND) {
            const fleePath = PathFinder.search(this.pos, {pos: enemy.pos, range: 5}, {
                flee: true,
                maxRooms: 1,
            });
            this.moveByPath(fleePath.path);
        }
    }

    Creep.prototype.moveToCoord=function(x,y,roomName){
        if(!roomName){
            roomName = this.room.name;
        }
        let position = new RoomPosition(x,y,roomName);
        return this.moveToPos(position);
    }
    /**
     * Move towards a target, using the creeps mapBook to get and follow a path
     * returns -13 if no mapBook set
     */ 
    Creep.prototype.moveToUsingMap = function(target){
            
            if(!this.mapBook){
                return -13;
            }
            let path = false;
            if(this.memory._path){
                path = this.mapBook.getPath(this.memory._path.key);
            }
            if(!path || this.iAmStuck() || !this.myPathIsStillValid(target)){
                path = this.createPathTo(target);
            }
            
            let spot = path[this.memory._path.progress];
        
            if(spot && this.pos.isEqualTo(spot.x,spot.y)){
                this.memory._path.progress+=1;
                this.memory._path.attempts=0; // we actually moved, so rest the attempts
                this.memory._path.waiting=0;
            }
            
            let cutPath = path.slice(this.memory._path.progress);
            let r =  this.moveByPath(  cutPath );
            //this.say(r);
            if(r===ERR_NOT_FOUND){
                this.memory._path.attempts=100;
            }
             
            if(r===OK){
              this.memory._path.attempts+=1;// track how many attempts to move, we make  
              
            }
            this.memory._path.waiting+=1;
            
            this.room.visual.poly(cutPath, {stroke: '#ffffff',lineStyle:'dashed'});
            return r;
    }
    /**
     * Is there an obstacle on my path that is not moving?
     */ 
    Creep.prototype.iAmStuck = function(){
        return  (this.memory._path.attempts > 4 || this.memory._path.waiting>10);
    }
    /**
     * Has the target changed from our cached target?
     */ 
    Creep.prototype.myPathIsStillValid = function(target){
        if(this.memory._path){
            let rp =  this.mapBook.getRoomPositionFrom(target);
            let tk = this.mapBook.positionToString(rp );
            if(tk==this.memory._path.targetKey){
                return true;
            }
        }
        return false;
    }
    /**
     * Get a path link from the mapBook, in order to navigate along it
     * returns false if no mapBook set, otherwise a path array
     */ 
    Creep.prototype.createPathTo = function(target){
        if(!this.mapBook){
            return false;
        }
        let pk = this.mapBook.createPath(this.pos,target);
        let path = this.mapBook.getPath(pk);
        let tk = this.mapBook.positionToString( this.mapBook.getRoomPositionFrom(target) );
        this.memory._path = { key:pk, eta:(Game.time+path.length),waiting:0,progress:0,attempts:0,  targetKey:tk };
        return path;
    }
    /**
     * Move towards the given target, drawing the path.
     * Will use mapBook by default. Set useMapBook=false to use creep.moveTo()
     */ 
    Creep.prototype.moveToPos=function(target,useMapBook=false){

        let result = false;
        //let isCivillian = ( this.partCount(ATTACK)===0 && this.partCount(RANGED_ATTACK)===0);
        //if(target.name)this.say(target.name)
        if(useMapBook){
          result= this.moveToUsingMap(target);
        }else{
         
            let creep = this;// so callback works
            let hostileIDs = this.room.getDangerousCreeps();
 
            let opts = {
                maxOps:10000,reusePath:10,ignoreCreeps:true,
                visualizePathStyle: {stroke: '#ffffff'}
                 
            }
            
            if(creep.partCount(MOVE) >= (creep.body.length/2) ){
          
                opts.ignoreRoads = true;

            }
            if(creep.isASwampRat() ){
                opts.swampCost = 1;
            }
  
            let rn = target.roomName ?target.roomName :target.pos.roomName; 
            //if(this.name==='harrass-1')console.log('rn',rn,target.name,target.id)
            if(rn ==this.pos.roomName){
                // this shrinks pathfinding and forces creep to stay in this room. It also avoid ERR_NO_PATH from weird terrain that
                // would make the creep leave the room to move around
                opts.maxRooms = 1;
                /*opts.costCallback = function(roomName,costMatrix){
                    return mb.getCostMatrix('no-exit');
                }*/
                
            }
            //if(this.name==='harrass-1')clog(opts)
            
            if(Game.shard.name =='shard3'){
                opts.reusePath = 50;
            }
            if(creep.memory.swampCost){
                opts.swampCost = creep.memory.swampCost;
            }
            // if we're  still on the same space as last tick, then lets try move around the noobs
            if(this.memory.last_pos == this.pos.x+"-"+this.pos.y){
                opts.ignoreCreeps=false;
                opts.reusePath = 5;
            }

            opts.costCallback = function(roomName,costMatrix){

               // let mpCM = mb.getCostMatrix(roomName);

               // if (mpCM) return mpCM; breaks base room, because builddings are now 0, not 255
                if(roomName==='W35S21'){
                    costMatrix.set(26,19,100)
                    costMatrix.set(28,19,100)
                    costMatrix.set(27,20,100)
                    costMatrix.set(27,22,100)
                    costMatrix.set(26,21,100)
                    costMatrix.set(28,21,100)

                }

                if(roomName==='W16S22'){
                    costMatrix.set(0,10,50)
                    costMatrix.set(0,11,50)
                    costMatrix.set(0,12,50)
                    costMatrix.set(0,13,50)
                    costMatrix.set(0,14,50)
                    costMatrix.set(0,15,50)
                }
                if(roomName==='W16S24'){

                    costMatrix.set(3,49,255)
                    costMatrix.set(4,49,255)
                    costMatrix.set(5,49,255)
                    costMatrix.set(6,49,255)
                    costMatrix.set(7,49,255)
                    costMatrix.set(8,49,255)
                    costMatrix.set(9,49,255)
                    costMatrix.set(10,49,255)
                    costMatrix.set(11,49,255)
                    costMatrix.set(12,49,255)
                    costMatrix.set(13,49,255)
                    costMatrix.set(14,49,255)
                    costMatrix.set(15,49,255)
                    costMatrix.set(16,49,255)
                    costMatrix.set(17,49,255)
                    costMatrix.set(18,49,255)
                }

                return costMatrix;
            }
            
            // real hacky for now. Only runs if we're not a fighty boi
            if(Game.shard.name !=='shard3' && !this.memory.avoidEdges && hostileIDs.length>0 && Game.cpu.bucket>5000){
                
                opts.reusePath=2;
                
                let hostiles = [];
                for(let id of hostileIDs){
                    let hostile = gob(id)
                    if(!hostile)continue;
                    hostiles.push(hostile)
                    let theirTotalFightParts = hostile.partCount(ATTACK)+hostile.partCount(RANGED_ATTACK);
                    let myTotalFightyParts = creep.partCount(ATTACK)+creep.partCount(RANGED_ATTACK);
                    creep.memory.fleeZoneOfControl = false;
                    if(
                        creep.memory.dontFlee===undefined &&
                        this.pos.getRangeTo(hostile) < 5 
                        && myTotalFightyParts < theirTotalFightParts 
                        && !BOT_ALLIES.includes(hostile.owner.username)
                        ){
                        // if the creep is too close, then flee, before repathing
                        let r = target.pos?target.pos.roomName:target.roomName;
                        target = new RoomPosition(25,25,r);
                        creep.memory.fleeZoneOfControl = true;
                        creep.say('flee')
                        //clog(hostile.name+" stronger than "+creep.name ,'fleeing')
                    }
                    
                }
                
                
                this.renderAvoidance(hostiles);
                
                opts.costCallback = function(roomName,costMatrix){
                    let room = Game.rooms[roomName];
                   //  let mpCM = mb.getCostMatrix(roomName);
                    
                    if (!room ) return costMatrix;
                    
                   if (roomName==='W15S24' ) {
                        
                            for(let y=47; y<=49;y++){
                                 for(let x=0; x<=49;x++){
                                 
                                    costMatrix.set(x, y, 255);
                                   if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                                }
                            }
                    
                        }
                    if(roomName==='W16S24'){

                        costMatrix.set(3,49,255)
                        costMatrix.set(4,49,255)
                        costMatrix.set(5,49,255)
                        costMatrix.set(6,49,255)
                        costMatrix.set(7,49,255)
                        costMatrix.set(8,49,255)
                        costMatrix.set(9,49,255)
                        costMatrix.set(10,49,255)
                        costMatrix.set(11,49,255)
                        costMatrix.set(12,49,255)
                        costMatrix.set(13,49,255)
                        costMatrix.set(14,49,255)
                        costMatrix.set(15,49,255)
                        costMatrix.set(16,49,255)
                        costMatrix.set(17,49,255)
                        costMatrix.set(18,49,255)
                    }
                   
                   
                    for(let id of hostileIDs){
                        let hostile = gob(id)
                        if(!hostile)continue;
                        let range = 2;
                        let theirTotalFightParts= hostile.partCount(ATTACK)+hostile.partCount(RANGED_ATTACK);
                        let myTotalFightyParts = creep.partCount(ATTACK)+creep.partCount(RANGED_ATTACK);
                        
                      
                        if(
                            Game.shard.name !=='shard3' &&
                            // only avoid creep that are stronger
                            myTotalFightyParts < theirTotalFightParts
                            // dont avoid if we opt in for risks or need to flee from an avoid area
                             && !creep.memory.riskyBiscuits && !creep.memory.fleeZoneOfControl
                             // ally list
                            && !BOT_ALLIES.includes(hostile.owner.username)
                            // if we are avoiding SKs, then add them to the avoid list
                            || (creep.memory.avoidSkeepers && hostile.owner.username=='Source Keeper') 
                            ){
                            // changed to dist 5 because if crep & enemy diagonally move closer on same tick, they can move in range 3
                            if(hostile.partCount(RANGED_ATTACK)>0)range=5;
                            
                            if(creep.memory.touchingCloth)range = range-1;
                            
                            let avoids = hostile.pos.getPositionsInRange(range);
                           //clog(hostile.name+" stronger than "+creep.name ,'avoiding')
                            for(let a of avoids){
                                costMatrix.set(a.x, a.y, 255);
                                //a.colourIn("orange");
                            }
                        }
                    }
                    return costMatrix;
                };
            }
   
            result= this.moveTo(target,opts);
            this.debugSay("M:"+result)
            if(result===OK){
                this.memory.last_pos = this.pos.x+"-"+this.pos.y;
            }
        }
        this.traceMsg("moveTo->"+target+"="+result);
        return result;
   }
   //////////////////////////////////////////////////////////////////////////////////////////////////////
   Creep.prototype.renderAvoidance=function(hostiles,range){
       let badSpots=[];
            
            for(let hostile of hostiles){
                let range = 1;
                let colour = this.memory.riskyBiscuits?'red':'orange';
                if(hostile.partCount(RANGED_ATTACK)>0)range=4;
                if(this.memory.touchingCloth){
                    range = range-1;
                    colour='purple';
                }
                if(BOT_ALLIES.includes(hostile.owner.username))
                    colour = 'blue';
                let avoid = hostile.pos.drawPolyAround(range,colour);

            }
            
   }

    Creep.prototype.debugSay=function(msg){
        if(gui.displayCreepDebugSay){
            this.say(msg);
        }
    }
   
};
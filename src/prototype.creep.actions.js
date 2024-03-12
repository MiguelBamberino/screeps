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
     * @deprecated use moveOffRoomEdge
     * Handle if a creep wants to stand on room edge, it needs to budge 1 sq or get teleported
     */
    Creep.prototype.checkRoomBorderFaff = function(){

        if( this.pos.onLeftRoomEdge() ){
            this.move(RIGHT);
        }
        else if( this.pos.onTopRoomEdge() ){
            this.move(BOTTOM);

        }
        else if( this.pos.onRightRoomEdge() ){
            this.move(LEFT);
        }
        else if( this.pos.onBottomRoomEdge() ){
            this.move(TOP);
        }
    }
    Creep.prototype.moveOffRoomEdge = function(){

        if( this.pos.isLeftRoomEdge() ){
            return this.move(RIGHT);
        }
        else if( this.pos.isTopRoomEdge() ){
            return this.move(BOTTOM);

        }
        else if( this.pos.isRightRoomEdge() ){
            return this.move(LEFT);
        }
        else if( this.pos.isBottomRoomEdge() ){
            return this.move(TOP);
        }else{
            return ERR_NOT_IN_RANGE;
        }
    }
    Creep.prototype.moveOnToRoomEdge = function(){

        if( this.pos.nearLeftRoomEdge() ){
            return this.move(LEFT);
        }
        else if( this.pos.nearTopRoomEdge() ){
            return this.move(TOP);

        }
        else if( this.pos.nearRightRoomEdge() ){
            return this.move(RIGHT);
        }
        else if( this.pos.nearBottomRoomEdge() ){
            return this.move(BOTTOM);
        }else{
            return ERR_NOT_IN_RANGE;
        }
    }
    /**
     * @deprecated use pos.isRoomEdge
     */
    Creep.prototype.onRoomEdge = function(){
        return this.pos.isRoomEdge();
    }
    /**
     * @deprecated use pos.nearRoomEdge
     */
    Creep.prototype.nearRoomEdge = function(){

        return this.pos.nearRoomEdge();
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
     * Move towards the given target, drawing the path.
     * Will use mapBook by default. Set useMapBook=false to use creep.moveTo()
     */
    Creep.prototype.moveToPos=function(target,useMapBook=false){

        let result = false;

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
            if(roomName==='W6S23'){
                costMatrix.set(6,49,255)
                costMatrix.set(7,49,255)
                costMatrix.set(8,49,255)
                costMatrix.set(9,49,255)
                costMatrix.set(10,49,255)
                costMatrix.set(11,49,255)
                costMatrix.set(12,49,255)
                costMatrix.set(13,49,255)
                costMatrix.set(14,49,255)

            }
            if(roomName==='W35S21'){
                costMatrix.set(26,19,100)
                costMatrix.set(28,19,100)
                costMatrix.set(27,20,100)
                costMatrix.set(27,22,100)
                costMatrix.set(26,21,100)
                costMatrix.set(28,21,100)

            }
            if(roomName==='E8S15'){

                costMatrix.set(18,36,100)
                costMatrix.set(18,38,100)
                costMatrix.set(20,36,100)
                costMatrix.set(20,38,100)
            }
            if(roomName==='W19S25'){
                costMatrix.set(10,14,100)
                costMatrix.set(11,14,100)
                costMatrix.set(10,13,100)
                costMatrix.set(11,13,100)
                costMatrix.set(11,12,100)

            }
            if(roomName==='E8S15'){
                costMatrix.set(17,37,100)
                costMatrix.set(18,36,100)
                costMatrix.set(20,36,100)
                costMatrix.set(18,38,100)
                costMatrix.set(20,38,100)

            }
            if(roomName==='E10S30'){
                for(let y=0; y<=20;y++){
                    for(let x=30; x<49;x++){

                        costMatrix.set(x, y, 255);
                        if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                    }
                }


            }

            if(roomName==='E5S25'){
                for(let y=0; y<=2;y++){
                    for(let x=0; x<49;x++){

                        costMatrix.set(x, y, 255);
                        if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                    }
                }
            }
            if(roomName==='E3S24'){
                for(let y=0; y<=25;y++){
                    for(let x=48; x<=49;x++){

                        costMatrix.set(x, y, 255);
                        if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                    }
                }
            }

            if (roomName==='E14S24') {
                for(let y=0; y<=49;y++){
                    for(let x=47; x<=49;x++){
                        costMatrix.set(x, y, 255);
                        if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                    }
                }
            }
            return costMatrix;
        }

        // real hacky for now. Only runs if we're not a fighty boi
        let inSafeMode = Game.rooms[creep.pos.roomName].controller?Game.rooms[creep.pos.roomName].controller.safeMode:false;

        if(!inSafeMode && creep.pos.roomName!=='W16S24' && Game.shard.name !=='shard3' && !this.memory.avoidEdges && hostileIDs.length>0 && Game.cpu.bucket>5000){

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
                    // if we're in a home room, flee to the base, not centre of the room.
                    if(Game.rooms[r] && Game.rooms[r].storage){
                        target = Game.rooms[r].storage.pos;
                    }
                    else{
                        target = new RoomPosition(25,25,r);
                    }

                    creep.memory.fleeZoneOfControl = true;
                    creep.say('flee2')
                    //clog(hostile.name+" stronger than "+creep.name ,'fleeing')
                }

            }


            this.renderAvoidance(hostiles);

            opts.costCallback = function(roomName,costMatrix){
                let room = Game.rooms[roomName];
                //  let mpCM = mb.getCostMatrix(roomName);

                if (!room ) return costMatrix;


                if(roomName==='E8S15'){

                    costMatrix.set(18,36,100)
                    costMatrix.set(18,38,100)
                    costMatrix.set(20,36,100)
                    costMatrix.set(20,38,100)
                }

                if(roomName==='E5S25'){
                    for(let y=0; y<=2;y++){
                        for(let x=0; x<49;x++){

                            costMatrix.set(x, y, 255);
                            if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                        }
                    }
                }
                if (roomName==='E14S24') {
                    for(let y=0; y<=49;y++){
                        for(let x=47; x<=49;x++){
                            costMatrix.set(x, y, 255);
                            if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                        }
                    }
                    for(let y=47; y<=49;y++){
                        for(let x=0; x<=49;x++){
                            costMatrix.set(x, y, 255);
                            if(Game.rooms[roomName])rp(x,y,roomName).colourIn("blue");
                        }
                    }
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
                        || (creep.memory.avoidSkeepers && hostile.owner.username==='Source Keeper')
                    ){
                        // changed to dist 5 because if crep & enemy diagonally move closer on same tick, they can move in range 3
                        if(hostile.partCount(RANGED_ATTACK)>0)range=5;

                        if(creep.memory.touchingCloth)range = range-1;

                        let avoids = hostile.pos.getPositionsInRange(range);
                        //clog(hostile.name+" stronger than "+creep.name ,'avoiding')
                        for(let a of avoids){
                            // avoid walking into SKspace
                            // otherwise likely a moving target and we want builders to
                            // still path to ramps to heal in seige
                            if(hostile.owner.username==='Source Keeper')
                                costMatrix.set(a.x, a.y, 255);
                            else
                                costMatrix.set(a.x, a.y, 200);
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
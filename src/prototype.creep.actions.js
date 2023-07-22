module.exports = function(){
    
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//// ACTION CORE FUNCS
	//////////////////////////////////////////////////////////////////////////////////////////////////////	
	
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
            this.say(r);
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
        if(useMapBook){
          result= this.moveToUsingMap(target);
        }else{
            if(this.memory.last_pos != this.pos.x+"-"+this.pos.y){
                result= this.moveTo(target,{maxOps:7000,ignoreCreeps:true,reusePath:50,visualizePathStyle: {stroke: '#ffffff'}});
                this.debugSay("M:"+result)
            }else{
                result= this.moveTo(target,{maxOps:7000,ignoreCreeps:false,reusePath:5,visualizePathStyle: {stroke: '#ffffff'}}); 
                this.debugSay("M:"+-301)
            }
            if(result===OK){
                this.memory.last_pos = this.pos.x+"-"+this.pos.y;
            }
        }
        this.traceMsg("moveTo->"+target+"="+result);
        return result;
   }
   //////////////////////////////////////////////////////////////////////////////////////////////////////
    Creep.prototype.debugSay=function(msg){
        if(gui.displayCreepDebugSay){
            this.say(msg);
        }
    }
   
};
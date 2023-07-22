

var roleTanker = {


    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        let budget = spawn.getCreepBudget();
        if(budget >= 2300 ){
          //  budget = 1400;// quick fix, because i think creeps are too big
        }
        if(budget >= 1500 ){ // RCL 5 - 1000 + 500 = 1500/1800 30 ext
            return [ // 1000 capacity
                CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                
                MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE];
        }
        else if(budget >= 1300 ){ // RCL 4 - 600 + 300 = 900/1300 20 ext
            return [ // 600 capacity
                CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE];
        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 200 = 600/800 10 ext
            return [
            CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY, 
            MOVE,MOVE,MOVE,MOVE];
        }
        else if(budget >= 550 ){ // RCL 2 - 300 + 150 = 450/550 5 ext
           return [
               CARRY,CARRY,CARRY,
               CARRY,CARRY,CARRY 
               ,MOVE,MOVE,MOVE]; 
        }
        else { // RCL 1 - 200 + 100 = 300/300
            return [CARRY,CARRY,CARRY,CARRY, MOVE,MOVE];
        }
        
    },
    getMemory: function(spawn){
        return {role: "tanker",container_id:''};
    },
    /** @param {Creep} creep **/
    run: function(creep,spawn) {
        
        creep.checkAndUpdateState();

	    if(creep.isWorking()) {
	        
	        let target=false;
	        if(creep.pos.roomName == spawn.pos.roomName){
	            target = creep.getExtensionToCharge();
	        }
	        
	        if(!target){

	            target = creep.getFillerStationToFill();
	        }
	        
	        
            if(!target){
               target = creep.getUpgradeStoreToFill();
            }
	        
	        if(!target){

	            target = creep.reserveTransferToStorage();
	        }
	        
            if(target){
                creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
            }
            
	    }
	    else if(creep.isCollecting()){
	        
	        let container = creep.getFullestMineStore(spawn.remoteRoomNames());    
	        if(container){
	            let result = creep.actOrMoveTo('withdrawX',container, RESOURCE_ENERGY);
	            //creep.say(result)
            }else{
                //creep.say('Con:-404');
            }
	    }else{
	        spawn.log("ERROR","Creep entered bad state:"+creep.name);
	    }
	}
	
};

module.exports = roleTanker;
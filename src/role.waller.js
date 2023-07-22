
var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        let budget = spawn.getCreepBudget();
        
        
        
        if(budget >= 2000 ){ // RCL ? - 1000 + 500 + 500 = 2000/30prts
            return [
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, // 10
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, //10
                //CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, //10
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE//10
                ]; 
        }
        else if(budget >= 1800 ){ // RCL 5 - 600 + 600 + 300 = 1500/1800 30 ext
            return [
                WORK,WORK,WORK,WORK,WORK,WORK, // 6
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,//6
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 6
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE//6
                ]; 
        }
        else if(budget >= 1300 ){ // RCL 4 - 600 + 300 + 300 = 1200/1300 20 ext
            return [WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 200 + 200 =  800/800 10 ext
            return [WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 550){ // RCL 2 - 200 + 200 + 150 =  550/550 5 ext
            return [WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE]; 
        }
        else{ // RCL 1 - 250/300 , assume no roads early on
            return [WORK, CARRY, MOVE,MOVE]; 
        }
    },

    
    getMemory: function(spawn){
        return {role: "waller",target_to_fix_id:''};
    },
    /** @param {Creep} creep **/
    run: function(creep,spawn) {
        
        creep.checkAndUpdateState();
        
        //clog(creep.memory)
	    if(creep.isWorking()) {

	         var target = this.targetToRepair(creep,spawn);
	         //console.log(target);
            if(target) {
                let res = creep.actOrMoveTo("repair",target)
                //clog(res)
               
            }else{
                creep.actOrMoveTo("upgradeController",creep.spawn().room.controller);

            }
	    }
	    else if(creep.isCollecting()){
	        creep.memory.target_to_fix_id = "";
	        
	        /*let drop = creep.getDroppedEnergy();
            // console.log(drop)
            if(drop){
                return creep.actOrMoveTo("pickup",drop);
            }*/
	        
            creep.getEnergy();
            
	    }else{
	        spawn.log("ERROR","Creep entered bad state:"+creep.name);
	    }
	},
	targetToRepair(creep){
	    let target = Game.getObjectById(creep.memory.target_to_fix_id);
	    if(target && target.hits<target.hitsMax){
	        return target;
	    }
	    // [{attribute:'canReserveWithdraw',operator:'fn',value:[free]}])
	    target =  mb.getLowestHPStructure(creep.pos,[STRUCTURE_WALL,STRUCTURE_RAMPART],creep.spawn().roomNames(),[{attribute:'isNotMarkedForDismantle',operator:'fn',value:[]}]);
	    if(target && (target.hitsMax-target.hits)>0 ){
	        creep.memory.target_to_fix_id = target.id;
	        return target;
	    }
	    return false;
	    
	}

};

module.exports = role;
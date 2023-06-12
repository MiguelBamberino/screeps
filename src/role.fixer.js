
var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        return Creep.prototype.getDefaultParts(spawn);
    },
    getMemory: function(spawn){
        return {role: "fixer",target_to_fix_id:''};
    },
    /** @param {Creep} creep **/
    run: function(creep,spawn) {
        
        creep.checkAndUpdateState();
        
	    if(creep.isWorking()) {

	         var target = this.targetToRepair(creep,spawn);
            if(target) {
                creep.actOrMoveTo("repair",target)
               
            }else{
                creep.actOrMoveTo("upgradeController",creep.spawn().room.controller);

            }
	    }
	    else if(creep.isCollecting()){
	        
	        
	        creep.memory.target_to_fix_id = "";
    	     
    	     if(spawn.name=='Theta'){   
    	       //let drop = creep.getDroppedEnergy();
                //if(drop){
                   // return creep.actOrMoveTo("pickup",drop);
                //}
    	     }
	        
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
	    target = mb.getNearestRepairTarget(creep.pos, creep.spawn().roomNames());
	    if(target){
	        creep.memory.target_to_fix_id = target.id;
	        return target;
	    }
	    return false;
	    
	}

};

module.exports = role;
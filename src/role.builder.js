var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        return Creep.prototype.getDefaultParts(spawn);
    },
    getMemory: function(spawn){
        return {role: "builder",construction_site_id:''};
    },
    /** @param {Creep} creep **/
    run: function(creep,spawn) {
        
        creep.checkAndUpdateState();

	    if(creep.isWorking()) {
            creep.memory.drop_id = false;
            if(creep.memory.last_site_type==STRUCTURE_RAMPART){
                let finds = creep.pos.lookForNearStructures(STRUCTURE_RAMPART);
                for(let obj of finds){
                    if(obj.hits<1000){
                        creep.repair(obj);
                        return;
                    }
                }
            }
	         var site = this.siteToBuild(creep);
            if(site) {
                
                // dont camp roads and cause traffic
                if(creep.pos.lookForStructure(STRUCTURE_ROAD)){
                    creep.moveToPos(site)
                }
                
                creep.actOrMoveTo("build",site);
            }else{
                creep.say("I'm done!");
                //spawn.log("INFO" ,"Builder retiring:"+creep.name);
                creep.memory.role='upgrader';
                creep.memory.target_to_fix_id='';
                //creep.recycle();
            }
	    }
	    else if(creep.isCollecting()){
            let drop = creep.getDroppedEnergy();
            // console.log(drop)
            if(drop){
                return creep.actOrMoveTo("pickup",drop);
            }
            if(spawn.name=='Epsilon'){
                let term = Game.getObjectById('64147f377c596911152822af');
                if(term.store.getUsedCapacity(RESOURCE_ENERGY)>creep.store.getFreeCapacity(RESOURCE_ENERGY)){
                    return creep.actOrMoveTo("withdraw",term,RESOURCE_ENERGY);
                }
                
            }
	        creep.getEnergy();
	    }else{
	        spawn.log("ERROR" ,"Creep entered bad state:"+creep.name);
	    }
	},
	siteToBuild: function(creep){
	    
	    var site = Game.getObjectById(creep.memory.construction_site_id);
	    if(site){
	        return site;
	    }

	    let obj = mb.getNearestConstruction(creep.pos, creep.spawn().roomNames());
	    creep.memory.last_site_type = obj.structureType;
	    return obj;
	}
};

module.exports = role;
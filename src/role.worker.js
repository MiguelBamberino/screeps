
var role = {

    getParts: function(budget,config){
        let level = Game.getObjectById(config.controller_id).level;
        
        // assume we now have roads.
        if(level>2 && budget>=550){
            return '2w2c2m';//400, 
        }
        
        //////////////////////////////////////////////
        // assume we dont have roads below here: 
        /////////////////////////////////////////////
        if(budget>=400){
            return '2w1c3m';
        }
        // this work is used for starting a lv1 room and rebooting crashed rooms
        // RCL 1 - 300/300 , assume no roads early on
        return [WORK, CARRY, MOVE,MOVE]; 
        
    },

    run: function(creep,config){
        creep.checkAndUpdateState();
        let controller = Game.getObjectById(config.controller_id);
       // if(creep.name=='I-wo-0')clog(creep.memory.reserve_id,'rexer_id at start')
        
        if(creep.isWorking()){
            
            
            if(controller.ticksToDowngrade<1000){
                return creep.actOrMoveTo("upgradeController",controller);
            }
            let target=false;
            if(config.inRecoveryMode){
              //  if(creep.name=='I-wo-0')clog('recover mode')
                 target = creep.getFillerStationToFill([config.coreRoomName]);
                if(target){
                    
                   return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
                }
                
                
                
                    
                let spawns = mb.getStructures({roomNames:[config.coreRoomName],types:[STRUCTURE_SPAWN]});
                if(spawns.length>0){
 
                    if(spawns[0].haveSpaceFor(50)){
                        return creep.actOrMoveTo("transfer",spawns[0],RESOURCE_ENERGY);
                    }
                }
            
            }

            let repairTarget = this.targetToRepair(creep,config);
            
            if(repairTarget){
                // if we have some breathing time on repairs, check for any exts to fill
                if(repairTarget.hits>2000){
                  //  if(creep.name=='I-wo-0')clog('ext lookup')
                   // if(creep.name=='I-wo-0')clog(creep.memory.reserve_id,'rexer_id just before')
                     target = creep.getExtensionToCharge([config.coreRoomName]);
                    // if(creep.name=='I-wo-0')clog(target.structureType,target.id)
                    if(target){
                        return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
                    }
                }
                
                return creep.actOrMoveTo("repair",repairTarget);
            }
            
           
            
            
            
            
            
            let site = this.siteToBuild(creep,config);
            if(site){
                return creep.actOrMoveTo("build",site);
            }
        

            return creep.actOrMoveTo("upgradeController",controller);
 
           creep.say("Zzz");
            
        }else if(creep.isCollecting()){
            
            if(controller.level == 1){
                let drop = creep.getDroppedEnergy();
                if(drop){
                    return creep.actOrMoveTo("pickup",drop);
                }
            }
                
           return creep.getEnergy([config.coreRoomName]);

        }
        
    },
    siteToBuild: function(creep,config){
	    
	    var site = Game.getObjectById(creep.memory.construction_site_id);
	    if(site){
	        return site;
	    }

	    let obj = mb.getNearestConstruction(creep.pos, [config.coreRoomName]);
	    creep.memory.construction_site_id = obj.id;
	    //creep.memory.last_site_type = obj.structureType;
	    return obj;
	},
	targetToRepair(creep,config){
	    let target = Game.getObjectById(creep.memory.target_to_fix_id);
	    if(target && target.hits<target.hitsMax){
	        return target;
	    }
	    target = mb.getNearestRepairTarget(creep.pos, [config.coreRoomName]);
	    if(target){
	        creep.memory.target_to_fix_id = target.id;
	        return target;
	    }
	    return false;
	    
	}

};

module.exports = role;
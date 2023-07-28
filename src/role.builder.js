var role = {


    getParts: function(budget){
        return Creep.prototype.getDefaultParts(budget);
    },
    run: function(creep,config) {
        
        creep.checkAndUpdateState();

	    if(creep.isWorking()) {
	        
	        
	       if(creep.memory.last_site_type==STRUCTURE_RAMPART){
                let finds = creep.pos.lookForNearStructures(STRUCTURE_RAMPART);
                for(let obj of finds){
                    if(obj.hits<5000){
                        creep.repair(obj);
                        return;
                    }
                }
            }
	        
            
            let structure = this.targetToRepair(creep,config,[STRUCTURE_WALL,STRUCTURE_RAMPART]);
            if(structure && structure.hits < 2000){
                return creep.actOrMoveTo("repair",structure);
            }
            
	        var site = this.siteToBuild(creep,config);
            if(site) {
                
                // dont camp roads and cause traffic
                if(creep.pos.lookForStructure(STRUCTURE_ROAD)){
                    creep.moveToPos(site)
                }
                
                return creep.actOrMoveTo("build",site);
            }
            
            if(structure){
                 // dont camp roads and cause traffic
                if(creep.pos.lookForStructure(STRUCTURE_ROAD)){
                    creep.moveToPos(structure)
                }
               // creep.say("r:"+structure.hits+"/"+config.wallHeight);
                return creep.actOrMoveTo("repair",structure);
            }
            let controller = Game.getObjectById(config.controller_id);
            creep.moveTo(controller)
            return creep.actOrMoveTo("upgradeController",controller);
            //creep.say("I'm bored!");
            
	    }
	    
	    
	    else if(creep.isCollecting()){
	        creep.memory.target_to_fix_id = false;
	        
            let drop = creep.getDroppedEnergy();

            if(drop){
                return creep.actOrMoveTo("pickup",drop);
            }
            /*
            let dismantleTarget = Game.getObjectById(creep.memory.dismantle_id);
            if(!dismantleTarget){
                let structures = mb.getStructures({roomNames:[config.coreRoomName],filters:[{attribute:'isMarkedForDismantle',operator:'fn',value:[]}]})
                if(structures.length>0){
                    creep.memory.dismantle_id = structures[0].id;
                    dismantleTarget=structures[0];
                }
            }
            
            if(dismantleTarget){
                return creep.actOrMoveTo("dismantle",dismantleTarget);
            }
            */

	        creep.getEnergy([config.coreRoomName]);
	    }else{
	        creep.say("I'm ?!@!");
	    }
	},
	siteToBuild: function(creep,config){
	    
	    var site = Game.getObjectById(creep.memory.construction_site_id);
	    if(site){
	        return site;
	    }

	    let obj = mb.getNearestConstruction(creep.pos, [config.coreRoomName]);
        creep.memory.construction_site_id=obj.id;
	    return obj;
	},
	targetToRepair: function(creep,config, types){
	    let target = Game.getObjectById(creep.memory.target_to_fix_id);
	    if(target && target.hits<target.hitsMax){
	        return target;
	    }
	    target =  mb.getLowestHPStructure(creep.pos,types,[config.coreRoomName],[
	        {attribute:'isNotMarkedForDismantle',operator:'fn',value:[]},
	        {attribute:'hits',operator:'<',value:[config.wallHeight]}
	        ]);
	    if(target){
	        creep.memory.last_site_type = target.structureType;
	        // only cache stable structures, so we ensure ramparts dont fade
	        creep.memory.target_to_fix_id = target.id;
	        
	    }
	    return target;
	    
	}
};

module.exports = role;
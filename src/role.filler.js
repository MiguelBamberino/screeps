var role = {

    create: function(spawn,creepName){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn),creepName);
    },
    getParts: function(spawn){
        let level = spawn.room.controller.level;
        if(level ===8){
            return [CARRY,CARRY,CARRY,CARRY];
        }else if(level===7){
            return [CARRY,CARRY];
        }else{
            return [CARRY];
        }
    },
    getMemory: function(spawn){
        return {role: "ffiller",container_id:false,extension_ids:[],spawn_id:false};
    },
    /** @param {Creep} creep **/
    run: function(creep,spawn) {
        
        creep.checkAndUpdateState();
        if(!creep.memory.container_id){
            this.setUp(creep);
        }

        if(creep.ticksToLive<600){
            spawn.renewCreep(creep);
        }

        let blobs = creep.pos.lookFor(LOOK_ENERGY);
        let container = Game.getObjectById(creep.memory.container_id);
        if(!container.isFillerStore())container.setAsFillerStore();

	    if(creep.isWorking()) {


            let target = Game.getObjectById(creep.memory.spawn_id);
            if(target){
                if(creep.act("transfer",target,RESOURCE_ENERGY)===OK){
                   return ;
                }
            }
            
            for(let id of creep.memory.extension_ids){
                let extension = Game.getObjectById(id);
                if(extension && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= extension.store.getUsedCapacity(RESOURCE_ENERGY)){
                    if(creep.act("transfer",extension,RESOURCE_ENERGY)===OK){
                       return ;
                    }
                }else{
                    creep.goCollect();
                }

            }
            
            if(blobs.length>0){
                let resStatus = creep.reserveTransfer(container);
                if( resStatus===OK){
                    let r = creep.act("transferX",container,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }else{creep.say(r);}
                }else{
                    creep.say(resStatus);
                }
            }
            
            let link = Game.getObjectById(creep.memory.link_id);
            // if we have a link and its not empty, then lets try transfer into the container
            if(link && !link.isEmpty()){
                let resStatus = creep.reserveTransfer(container);
                if( resStatus===OK){
                    let r = creep.act("transferX",container,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }
                    //else{creep.say(r);}
                }else{
                    //creep.say(resStatus);
                }
            }
            
	    }
	    else if(creep.isCollecting()){
	        
	        if(blobs.length>0){
	            creep.pickup(blobs[0]);
	        }else if(container){
	            
	            let link = Game.getObjectById(creep.memory.link_id);
                if(link && !link.isEmpty()){
                    return creep.act("withdraw",link,RESOURCE_ENERGY);
                }
	            
	            if(creep.act("withdraw",container,RESOURCE_ENERGY)===OK){
                    return;
                }
	        }
	        
	        
	    }else{
	        spawn.log("ERROR" ,"Creep entered bad state:"+creep.name);
	    }
	},
	setUp: function(creep){
	    
	    
       let e = creep.pos.lookFor(LOOK_ENERGY);
         if(e.length>0){
            creep.pickup(e[0]);
        }
	    
	    let structures = mb.getStructures({
	        types:[STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_CONTAINER,STRUCTURE_STORAGE,STRUCTURE_LINK],
	        roomNames:[creep.pos.roomName]
	    });
	   creep.memory.extension_ids=[];
	    for(let structure of structures){
	        if(creep.pos.isNearTo(structure)){
	            if(structure.structureType===STRUCTURE_SPAWN){
	                creep.memory.spawn_id = structure.id;
	                //structure.reserveTransfer(creep.name,structure.store.getCapacity());
	                structure.lockFillSites();
	            }
	            if(structure.structureType===STRUCTURE_LINK){
	                creep.memory.link_id = structure.id;
	            }
	            if(structure.structureType===STRUCTURE_CONTAINER || structure.structureType===STRUCTURE_STORAGE){
	                //structure.reserveWithdraw(creep.name,2000); // we only need to hold 2k worth
	                creep.memory.container_id = structure.id;
	                if(!structure.isFillerStore())structure.setAsFillerStore();
	            }
	            if(structure.structureType===STRUCTURE_EXTENSION){
	                //structure.reserveTransfer(creep.name,structure.store.getCapacity());
	                creep.memory.extension_ids.push(structure.id);
	            }
	        }
	    }
	    
	}
};

module.exports = role;
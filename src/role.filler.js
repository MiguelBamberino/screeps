var role = {


    getParts: function(budget,config){
        let level = Game.getObjectById(config.controller_id).level;
        if(level ===8){
            return [CARRY,CARRY,CARRY,CARRY];
        }else if(level===7){
            return [CARRY,CARRY];
        }else{
            return [CARRY];
        }
    },
    /** @param {Creep} creep **/
    run: function(creep,config) {
        
        // lock 2k on container/storage
        // want lock, so filler is able to reserveWithdraw more under its name
        
        // if dropped E at feet
            // pickup
        
        // if link
            // reserve/lock additional 800 withdraw on storage
        
        
        // if spawn needs filling || any extension needs a fill
            // withdraw ANY energy
            // fill up spawn & exts
            // toggler link to receiver. it will stay R until a storage filler has enough E to send to storage
        
        
        // if link has E && container/storage < 2k
            // withdraw from link
            // put in container/storage
        
        // if controller link wants E && storage E > 2k+creep capacity 
            // if link full
                // toggle link to sender
            // else
                // reserve-withdraw from storage
                // put in link
        
        // if terminal > 11k E
            // reserve withdraw from terminal
            // if storage < 2k 
                // put in storage
            // if link < 800
                // put in link
            //put in storage
        
        // if terminal < 10k E && storage > 2k 
            // reserve withdraw from storage
            //put in terminal
        
        // if terminal has delivery
            // if creep has E
                // yes >>
                    // put in storage
                // no >>
                    // withdraw Mineral from terminal
                    // put in storage
        
        // if terminal has order
            // if creep has E
                // yes >>
                    // put in storage
                // no >>
                    // withdraw RESOURCE from storage
                    // put in terminal
        
        
        creep.checkAndUpdateState();
        
        // if anything changes, lets reload 
        if(Game.time % 5000 === 0){
           
            creep.memory.container_id=false;
        }
        
        if(!creep.memory.container_id){
            this.setUp(creep);
        }
        
        let spawn = Game.getObjectById(creep.memory.spawn_id);

        if(spawn && creep.ticksToLive<600){
            spawn.renewCreep(creep);
        }

        let blobs = creep.pos.lookFor(LOOK_ENERGY);
        let container = Game.getObjectById(creep.memory.container_id);
        if(container && !container.isFillerStore())container.setAsFillerStore();

	    if(creep.isWorking()) {


            let target = Game.getObjectById(creep.memory.spawn_id);
            
            if(target){
                let res = creep.act("transfer",target,RESOURCE_ENERGY);
                //creep.say(res)
                if(res===OK){
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
            
            let tower = Game.getObjectById(creep.memory.tower_id);
            
            if(tower){
                let res = creep.act("transfer",tower,RESOURCE_ENERGY);
                if(res===OK){
                   return ;
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
            let terminal = Game.getObjectById(creep.memory.terminal_id);
            // if we have a link thats not empty || a terminal with an import, then lets try transfer into the container
            if(link && !link.isEmpty()){
                let resStatus = creep.reserveTransfer(container);
                if( resStatus===OK){
                    let r = creep.act("transferX",container,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }
                }
            }
            if(terminal && terminal.storingAtleast(15000,RESOURCE_ENERGY)){
                let resStatus = creep.reserveTransfer(container);
                if( resStatus===OK){
                    let r = creep.act("transferX",container,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }
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
                let terminal = Game.getObjectById(creep.memory.terminal_id);
                if(terminal && terminal.storingAtleast(15000,RESOURCE_ENERGY)){
                    return creep.act("withdraw",terminal,RESOURCE_ENERGY);
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
	        types:[STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_CONTAINER,STRUCTURE_STORAGE,STRUCTURE_LINK,STRUCTURE_TERMINAL,STRUCTURE_TOWER],
	        roomNames:[creep.pos.roomName]
	    });
	   creep.memory.extension_ids=[];
	    for(let structure of structures){
	        if(creep.pos.isNearTo(structure)){
	            if(structure.structureType===STRUCTURE_SPAWN){
	                creep.memory.spawn_id = structure.id;
	                structure.reserveTransfer(creep.name,150,true);
	                //structure.lockFillSites();
	            }
	            if(structure.structureType===STRUCTURE_TOWER){
	                creep.memory.tower_id = structure.id;
	                structure.reserveTransfer(creep.name,250,true);
	            }
	            if(structure.structureType===STRUCTURE_LINK){
	                creep.memory.link_id = structure.id;
	            }
	            if(structure.structureType===STRUCTURE_TERMINAL){
	                creep.memory.terminal_id = structure.id;
	            }
	            if(structure.structureType===STRUCTURE_CONTAINER){
	                creep.memory.container_id = structure.id;
	                if(structure.isWithdrawLocked()===false)structure.lockReservations(['withdraw']);
	                if(!structure.isFillerStore())structure.setAsFillerStore();
	            }
	            if(structure.structureType===STRUCTURE_STORAGE){
	                structure.reserveWithdraw(creep.name,1000,true); // we only need to hold 1k worth, per filler
	                creep.memory.container_id = structure.id;
	                if(!structure.isFillerStore())structure.setAsFillerStore();
	            }
	            if(structure.structureType===STRUCTURE_EXTENSION){
	                structure.reserveTransfer(creep.name,structure.store.getCapacity(),true);
	                creep.memory.extension_ids.push(structure.id);
	            }
	        }
	    }
	    
	}
};

module.exports = role;
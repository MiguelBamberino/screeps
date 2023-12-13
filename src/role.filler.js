var role = {

    getParts: function(budget,config){
        let level = config.controller.level;
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
        let clogCPU=true;
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
        let container = Game.getObjectById(creep.memory.container_id);
        if(Game.time % 1000 === 0 || !container){
           
            creep.memory.container_id=false;
        }
        
        if(!creep.memory.container_id){
            this.setUp(creep);
            // if we still don't have a container, then reset our reservations, so other creeps can fill the extensions
            // the container went missing. something big went wrong
            if(!creep.memory.container_id){
                for(let id of creep.memory.extension_ids){
                    let ext = gob(id);
                    if(ext)ext.resetReservations()
                }
                creep.say('idle')
            }
        }
        
        let spawn = Game.getObjectById(creep.memory.spawn_id);

        if(spawn && creep.ticksToLive<600){
            spawn.renewCreep(creep);
            creep.memory.fillingInProgress=true;
        }
        if(spawn && !creep.memory.fillingInProgress  && !spawn.isFull(RESOURCE_ENERGY)){
            creep.say('reset')
            creep.memory.fillingInProgress=true;
        }
        
        // if Game.time%2==0 && spawn.spawning
        //if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':spawing');
         
        if(Game.time%2==0 && !creep.memory.fillingInProgress && creep.memory.all_spawn_ids){
           
            for(let sid of creep.memory.all_spawn_ids){
                let sp = Game.getObjectById(sid);
                if(sp && sp.spawning){
                    
                    creep.memory.fillingInProgress=true;break;
                }
            }
        }
        //if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':spawing',clogCPU);
        
        
        
        if(container && !container.isFillerStore())container.setAsFillerStore();

	    if(creep.carryingAtleast(1)) {

            //if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':spawn_id');
            if(creep.memory.fillingInProgress){
                if(spawn){
                    let res = creep.act("transfer",spawn,RESOURCE_ENERGY);
                    if(res===OK){
                       return ;
                    }
                }
            }
            //if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':spawn_id',clogCPU);
            
            //if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':extension_ids');
            if(creep.memory.fillingInProgress){
                for(let id of creep.memory.extension_ids){
                    let extension = Game.getObjectById(id);
                    if(extension && creep.storingAtLeast(1,RESOURCE_ENERGY) && extension.haveSpaceFor(1,RESOURCE_ENERGY)){
                        if(creep.act("transfer",extension,RESOURCE_ENERGY)===OK){
                           return ;
                        }
                    }else{
                        creep.goCollect();
                    }
    
                }
                creep.memory.fillingInProgress = false; // if we got this far then we have filled all extensions and spawns
            }
            
           // if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':extension_ids',clogCPU);
            
            //if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':tower_id');
            let playerAttackers = Game.rooms[creep.pos.roomName].getEnemyPlayerFighters(); 
            if(Game.time%10==0 || playerAttackers.length>0 || config.towersBuildWalls){
                for(let id of creep.memory.tower_ids){
                    let tower = Game.getObjectById(id);
                    if(tower && tower.haveSpaceFor(creep.store.getCapacity())  ){
                        let res = creep.act("transfer",tower,RESOURCE_ENERGY);
                        if(res===OK){
                           return ;
                        }
                    }
                }
            }
           // if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':tower_id',clogCPU);
            

            
            let link = Game.getObjectById(creep.memory.link_id);
            let terminal = Game.getObjectById(creep.memory.terminal_id);
            
            // if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':terminal1');
            if(terminal && container.storingAtLeast(2000) && terminal.storingLessThan(config.terminalEnergyCap,RESOURCE_ENERGY)){
                let resStatus = creep.reserveTransfer(terminal);
                if( resStatus===OK){
                    let r = creep.act("transferX",terminal,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }
                }
            }
            //if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':terminal1',clogCPU);
            
            // if we have a link thats not empty || a terminal with an import, then lets try transfer into the container
           // if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':link');
            if(link && !link.isEmpty()){
                let resStatus = creep.reserveTransfer(container);
                if( resStatus===OK){
                    let r = creep.act("transferX",container,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }
                }
            }
           // if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':link',clogCPU);
            
            //if(creep.name=='TFF0')logs.startCPUTracker(creep.name+':terminal2');
            let withdrawLimit = config.terminalEnergyCap+1+creep.store.getCapacity()
            if(terminal && terminal.storingAtLeast(withdrawLimit,RESOURCE_ENERGY)){
                let resStatus = creep.reserveTransfer(container);
                if( resStatus===OK){
                    let r = creep.act("transferX",container,RESOURCE_ENERGY);
                    if(r===OK){
                       return ;
                    }
                }
            }
            //if(creep.name=='TFF0')logs.stopCPUTracker(creep.name+':terminal2',clogCPU);
            
	    }
	    else if(creep.isCollecting()){
	        
	      /*  if(blobs.length>0){
	            creep.pickup(blobs[0]);
	        }else */
	        //creep.say('yo')
	        if(container){
	            
	            let link = Game.getObjectById(creep.memory.link_id);
                if(link && !link.isEmpty()){
                    return creep.act("withdraw",link,RESOURCE_ENERGY);
                }
                let terminal = Game.getObjectById(creep.memory.terminal_id);
                let withdrawLimit = config.terminalEnergyCap+1+creep.store.getCapacity()
               
                if(terminal && terminal.storingAtLeast(withdrawLimit,RESOURCE_ENERGY)){
                    return creep.act("withdraw",terminal,RESOURCE_ENERGY);
                }
	            
	            if(creep.act("withdraw",container,RESOURCE_ENERGY)===OK){
                    return;
                }
	        }
	        
	        
	    }else{
	        creep.log("ERROR" ,"Creep entered bad state:"+creep.name);
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
	   creep.memory.all_spawn_ids=[];
	   creep.memory.tower_ids=[];
	   creep.memory.fillingInProgress=true;
	    for(let structure of structures){
	        
	        if(structure.structureType===STRUCTURE_SPAWN){
                creep.memory.all_spawn_ids.push(structure.id);
            }
	        
	        if(creep.pos.isNearTo(structure)){
	            if(structure.structureType===STRUCTURE_SPAWN){
	                creep.memory.spawn_id = structure.id;
	                structure.reserveTransfer(creep.name,150,true);
	                //structure.lockFillSites();
	            }
	            if(structure.structureType===STRUCTURE_TOWER){
	                creep.memory.tower_ids.push(structure.id);
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
	                structure.reserveTransfer(creep.name,structure.store.getCapacity(RESOURCE_ENERGY),true);
	                creep.memory.extension_ids.push(structure.id);
	            }
	        }
	    }
	    
	}
};

module.exports = role;
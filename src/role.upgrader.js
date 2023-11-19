
var role = {

    getParts: function(budget, config){
        //clog(budget,'upgrader for:'+config.coreRoomName)
        let depotE = 0;
        let storage = mb.getStorageForRoom(config.coreRoomName);
        if(storage){
            depotE = storage.storedAmount();
            // ease up consumption if storage is near empty 
            if(depotE<5000 && budget > 550){
                budget=550;
            }
            if(depotE<10000 && budget > 800){
                budget=800;
            }
        }

        // !! WARNING!! Don't have >15 WORK parts, because thats max upgrade amount at RCL 8
       if(depotE>200000 && budget >=2450){
           // RCL ? - 1400 + 700 + 350 = 2450/1800 30 ext
           return '15w10c4m';

       }
   
      /*  if(budget >= 2000 ){ // RCL 6 - 1200 + 500 + 300 = 2000/1800 30 ext
            return '12w10c6m';
        }
        else*/ 
        if(budget >= 1800 ){ // RCL 5 - 1000 + 500 + 250 = 1750/1800 30 ext
            return '10w10c5m';
        }
        else if(budget >= 1250 ){ // RCL 4 - 800 + 300 + 200 = 1300/1300 20 ext
            return '10w2c3m'; 
        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 300 + 100 =  800/800 10 ext
            return '4w6c2m';
        }
        else if(budget >= 550){ // RCL 2 - 400 + 50 + 100 =  550/550 5 ext
            return '4w1c2m';
        }
        else{ // RCL 1 - 300/300 , assume no roads early on
            return [WORK, WORK, CARRY,MOVE]; 
        }
    },

    run: function(creep,config){
        
        creep.checkAndUpdateState();
        
         
        
        let controller = config.controller;

        let container = controller.getContainer();
        
        
        if(container){
            //container.allowOverBooking(0)
            // cant have overbooking once we have storage, because it breaks the rKeepr
            if(config.upgradeRate===RATE_FAST && !creep.room.storage ){
                container.allowOverBooking(1500)
            }else{ 
                container.allowOverBooking(0)
            }
        }
        
        let link = controller.getLink();
        if(!container){
            
            if(creep.isWorking()){
                
                let spot = controller.getStandingSpot();
                if(spot){
                    let site = spot.lookForConstruction();
                    if(!site){
                        let container = spot.lookForStructure(STRUCTURE_CONTAINER);
                        if(container){
                            controller.setContainer(container);
                            container.setAsUpgraderStore();
                        }else{
                            spot.createConstructionSite(STRUCTURE_CONTAINER);
                        }
                    }else{
                        creep.actOrMoveTo("build",site);
                    }
                }else{
                    creep.say('No stand spot')
                }
                
            }else if(creep.isCollecting()){
                
                let spot = controller.getStandingSpot();
                if(spot){
                    let drop = spot.lookForNearbyResource(RESOURCE_ENERGY);
                    if(drop){
                        creep.actOrMoveTo("pickup",drop);
                    }else{
                        // if we have no dropped E waiting for us, then go get some
                        creep.getEnergy([config.coreRoomName]);   
                    }
                }else{
                    creep.say("!spot")
                }

            }
            return;
            
        }
          
        if(creep.isWorking()){
           
            if(creep.storingAtleast(50)){
                let ext = this.getExtToCharge(creep);
                if(ext){
                    creep.transfer(ext,RESOURCE_ENERGY);
                } 
            }          

           
           if(!creep.pos.isEqualTo(container)){
               creep.moveTo(container);
           }
            if(!creep.pos.inRangeTo(container.pos,1) || !creep.pos.inRangeTo(controller,3)){
                let walkable = container.pos.lookForNearbyWalkable(true);
                for(let spot of walkable){
                    if(spot.inRangeTo(controller,3))creep.moveToPos(spot);
                }
            }
            
             if( (container.hitsMax-container.hits) > 1000){
                creep.repair(container);
             }
            
            creep.upgradeController(controller);
            
        }else if(creep.isCollecting()){
            
            if(link && !link.isEmpty()){
                creep.actOrMoveTo("withdraw",link,RESOURCE_ENERGY);
                
            }else if(container){
                container.setAsUpgraderStore();
                // lock it, so we own withdrawals of this container. stop thieves.
                if(container.isWithdrawLocked()===false)container.lockReservations(['withdraw']);
                creep.actOrMoveTo("withdraw",container,RESOURCE_ENERGY);

            }else{
                creep.say(413);
            }
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
	
	getExtToCharge:function(creep){
       
       if(creep.memory.extension_ids===undefined){
           let exts = creep.pos.lookForNearStructures(STRUCTURE_EXTENSION);
           creep.memory.extension_ids = [];
           for(let e in exts){
               creep.memory.extension_ids.push(exts[e].id);
               //exts[e].lockReservations();
           }
       }
       
       for(let id of creep.memory.extension_ids){
           let obj = Game.getObjectById(id);
           if(obj && obj.store.getUsedCapacity(RESOURCE_ENERGY)< obj.store.getCapacity(RESOURCE_ENERGY)){
               return obj;
           }
       }
       
   }
};

module.exports = role;
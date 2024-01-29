
var roleTanker = {


    getParts: function(budget,config){
        
 
        if(budget >= 1500 ){ // RCL 5 - 1000 + 500 = 1500/1800 30 ext
            return '10*2c1m';
            
        }
        else if(budget >= 1300 ){ // RCL 4 - 600 + 300 = 900/1300 20 ext
            return '6*2c1m';

        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 200 = 600/800 10 ext
            return '4*2c1m';
        }
        else if(budget >= 550 ){ // RCL 2 - 300 + 150 = 450/550 5 ext
            return '3*2c1m';

        }
        else if(!config.inRecoveryMode && budget >= 200 ){ // RCL 1 - 200 + 100 = 300/300
            return '2c2m';
        }
        else{ 
            // at low RCL, we want to make sure we're small enough to fight other workers for consumption.
            // too big and we'll never get a reservation
            return '1c1m';
        }
        
    },

    run: function(creep,config) {
        
        //if(creep.name=='B-ta-0')clog(config)
        creep.checkAndUpdateState();
        
	    if(creep.isWorking()) {
	        
	         if(!config.spawnFastFillerReady && Game.spawns[config.name].haveSpaceFor(20)){

                 if(Game.creeps[creep.memory.giveTo])
                     Game.creeps[creep.memory.giveTo].memory.waitFor = false;

                 creep.memory.giveTo = false;
                return creep.actOrMoveTo("transfer",Game.spawns[config.name],RESOURCE_ENERGY);
	         }

             // don't find a work target until we are in the room, to stop reserving on structures when really far away
             if(creep.pos.roomName!==config.coreRoomName){
                 return creep.moveToPos(Game.spawns[config.name]);
             }
	         
	    
	        if( creep.memory.giveTo){
	            let recipient = Game.creeps[ creep.memory.giveTo  ];
	            if(!recipient){
	                creep.memory.giveTo = false;
	            }else{
	                let distanceToRecipient = creep.pos.getRangeTo(recipient);
	                 if(distanceToRecipient===1){
                         creep.memory.giveTo = false;
                         creep.memory.dropAt=false;
                         recipient.memory.waitFor = false;

    	                if(creep.transfer(recipient,RESOURCE_ENERGY)===ERR_FULL){
                            // drop it as the recipients feet. they'll pick it up
                            return creep.drop(RESOURCE_ENERGY);
                        }

                         return;
    	            }else{
    	                let res = creep.moveToPos(recipient);
                         let dropSpot = rp(creep.memory.dropAt.x,creep.memory.dropAt.y,creep.memory.dropAt.roomName);
                         // in this niche situation, we are path blocked to the upgrader but within 2 of container.
                         // so we can drop, because other upgraders should pick up
                         if(res === ERR_NO_PATH && distanceToRecipient===2 && creep.pos.getRangeTo(dropSpot)===2){
                             creep.memory.giveTo = false;
                             creep.memory.dropAt=false;
                             recipient.memory.waitFor = false;
                             return creep.drop(RESOURCE_ENERGY);
                         }
                         return res;
    	            }
    	                
	            }
	           
	        }
	    
	        if( creep.memory.dropAt){
	            
	            let dropSpot = rp(creep.memory.dropAt.x,creep.memory.dropAt.y,creep.memory.dropAt.roomName);
	            if(!dropSpot)console.log(dropSpot)
	            if(creep.pos.getRangeTo(dropSpot)<5){

                    let mostSpace = 0;
                    let bestRecipient = false;
                    // if we're close to the drop location then search for a recipient to pass off too
    	            for(let name of config.creepNames){
                        if(!Game.creeps[name])continue;
                        let recipient = Game.creeps[name];

                        let recipientSpace = recipient.store.getFreeCapacity(RESOURCE_ENERGY);
                        if((recipient.memory.role==='builder' || recipient.memory.role==='upgrader') &&
                            // make sure this creep isn't already waiting for a tanker
                            !recipient.memory.waitFor &&
                            // prioritise for most empty creeps first
                            recipientSpace > mostSpace &&
                            // make sure recipient is near the target drop zone
                            recipient.pos.getRangeTo(dropSpot)<4) {
                            bestRecipient = recipient;
                            mostSpace = recipientSpace;
                        }
                    }
                    if(bestRecipient){
                        creep.memory.giveTo = bestRecipient.name;
                        bestRecipient.memory.waitFor = creep.name;
                        return creep.moveToPos(bestRecipient);
                    }
	            }
	            
	            if(creep.pos.isNearTo(dropSpot)){
	                // nobody there to give E too. plop on floor
                    creep.drop(RESOURCE_ENERGY);
	                creep.memory.dropAt=false;
	                return;
	            }else{
	                return creep.moveToPos(dropSpot)
	            }
	        }
	    
	        
	        let target = false;
            let hostiles = Game.rooms[config.coreRoomName].find(FIND_HOSTILE_CREEPS)
            if(hostiles.length>0){
                target = creep.getTowerToCharge([config.coreRoomName]);
            }else{
                
    	         target = Game.getObjectById(creep.memory.reserve_id);
            }
	        
	        
	        if(!target){
	            target = creep.getFillerStationToFill([config.coreRoomName]);
	        }
	        
	        if(!target && creep.pos.roomName == config.coreRoomName){
	            target = creep.getExtensionToCharge([config.coreRoomName]);
	        }
	        
	        if(!target){
	            target = creep.getTowerToCharge([config.coreRoomName]);
	        }
	        
	        if(!target){
	            target = creep.getLabToCharge([config.coreRoomName]);
	        }
	        
            if(!target){
                
                if( !config.controller.haveContainer() ){

                    let site = mb.getNearestConstruction( Game.spawns[config.name].pos,[config.coreRoomName]);

                    if(site && site.structureType!==STRUCTURE_ROAD){
                        creep.memory.dropAt = site.pos;
                        return creep.moveToPos(site)
                    }
                }else{

                    // if we dont have a storage yet and we want to upgrade quickly, then all this extra E needs to get dumped at the controller. we hope there is ugraders there to use it
                    if(config.upgradeRate===RATE_VERY_FAST  && !Game.rooms[config.coreRoomName].storage ){

                        creep.memory.dropAt = config.controller.getContainer().pos;
                        return creep.moveToPos(config.controller)
                    }

                    // IF we're not upgrading like BRRRRRRR....., then use normal reservation system
                    let roomNames = [config.coreRoomName];
                    if(config.funnelRoomName && Game.rooms[config.coreRoomName].storage && Game.rooms[config.coreRoomName].storage.storingAtLeast(50000)){
	            
                        roomNames = [config.coreRoomName,config.funnelRoomName];
                    }
                    //console.log(creep.name,roomNames)
                    target = creep.getUpgradeStoreToFill(roomNames);

                }
                
            }
	        
	        if(!target && config.funnelRoomName){
	            if(Game.rooms[config.coreRoomName].storage && Game.rooms[config.coreRoomName].storage.storingAtLeast(50000)){
	                //console.log(creep.name,"funneling")
	                target = creep.reserveTransferToStorage(config.funnelRoomName);
	            }
	        }
	        
	        if(!target){
    	        let terminal = mb.getTerminalForRoom(config.coreRoomName);
                if(terminal && terminal.storingLessThan(10000)){
                    target = creep.reserveTransferToTerminal(config.coreRoomName);
                }
	        }
	        
	    
	        if(!target && creep.memory.lastWithdrewFrom!==STRUCTURE_STORAGE){

	            target = creep.reserveTransferToStorage(config.coreRoomName);
	        }
	        
            if(target){
                creep.memory.lastTransferTo=target.structureType;
                let res = creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
                //creep.say("tx:"+res);
            }else{
                // if near death, put back in storage
                if(creep.ticksToLive<40){
                    creep.memory.lastWithdrewFrom=false;
                }else if(Game.time%10==0){
                    creep.memory.lastWithdrewFrom=false;
                }else{
                    creep.say('Zzz')
                    creep.moveToPos(config.retreatSpot)
                }
               
            }
            
	    }
	    else if(creep.isCollecting()){
	        
	        if(!Game.rooms[config.coreRoomName].storage){
	            let drop = false;

                if(config.inRecoveryMode){
                    drop = creep.getDropFromLocalSources();
                }

	            if(!drop ){
                    // collect from remote if we have enough TTL and not overflowing locally
                    if(creep.ticksToLive>100 && config.totalEnergyAtLocalSources <4000){
                        drop = creep.getDropFromRemoteSources(config.remoteRoomNames)
                    }

                    if(!drop){
                        drop = creep.getDropFromLocalSources();
                    }
	            }
	            if(drop){
	                creep.memory.reserve_id = false;
	                //creep.say("🫴")
                    return creep.actOrMoveTo("pickup",drop);
	            }
	           // return;
	        }
	        
	        let target = Game.getObjectById(creep.memory.reserve_id);

            
	        // collect from local MINES in this room first
	        if(!target){
	            
	            let station = creep.getFillerStationToFill([config.coreRoomName]);
	            let force = (station && station.isEmpty(RESOURCE_ENERGY));
	            
	            target = creep.getFullestMineStore([config.coreRoomName],force);
	            if(target){
                   // creep.memory.lastWithdrewFrom=STRUCTURE_CONTAINER
                }
            }
            // now look at remotes
            if(!target){
	            let roomRange = config.allRoomNames;
	            
	            if(creep.ticksToLive<100)roomRange=[config.coreRoomName];
	            // don't suck from local mines, when builders need this to build the storage. go get remote E
	            else if(config.controller.level==4 && !Game.rooms[config.coreRoomName].storage)roomRange = config.remoteRoomNames;
	           
	            target = creep.getFullestMineStore(roomRange);
	            if(target){
                    //creep.memory.lastWithdrewFrom=STRUCTURE_CONTAINER
                }
            }
            /*
            let storage = mb.getStorageForRoom(config.coreRoomName)
            if(!target && storage && !storage.getMeta().streaming){
    	        let terminal = mb.getTerminalForRoom(config.coreRoomName);
                if(terminal && terminal.storingAtLeast(15000)){
                    target = creep.reserveWithdrawalFromTerminal(config.coreRoomName);
                }
	        }*/
            
            // if not enough E in the mines, then draw from storage
             if(!target /*&& creep.memory.lastTransferTo!==STRUCTURE_STORAGE*/){
                target = creep.reserveWithdrawalFromStorage(config.coreRoomName);
                if(target){
                  //  creep.memory.lastWithdrewFrom=STRUCTURE_STORAGE
                }
             }
            if(target){
                creep.memory.lastWithdrewFrom=target.structureType;
                 let res = creep.actOrMoveTo("withdrawX",target,RESOURCE_ENERGY);
               // creep.say("wx:"+res);
                return
    
            }else{
                creep.say('bored')
                if((config.upgradeRate===RATE_FAST||config.upgradeRate===RATE_VERY_FAST) && creep.isFull() && config.controller.haveContainer()){
                    creep.moveToPos(config.controller.getContainer())
                }else{
                    creep.moveToPos(config.retreatSpot)
                }
            }
            
            
	    }else{
	        clog("ERROR:: Creep entered bad state:",creep.name);
	    }
	}
	
};

module.exports = roleTanker;
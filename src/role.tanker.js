
var roleTanker = {


    getParts: function(budget){
 
 
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
        else if(budget >= 300 ){ // RCL 1 - 200 + 100 = 300/300
            return '2*2c1m';
        }else{ // RCL fucked
            return '2c1m';
        }
        
    },

    run: function(creep,config) {
        
        //if(creep.name=='B-ta-0')clog(config)
        creep.checkAndUpdateState();

	    if(creep.isWorking()) {
	        
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
                let roomNames = config.funnelRoomName==undefined?[config.coreRoomName]:[config.coreRoomName,config.funnelRoomName];
              //  if(config.funnelRoomName=='W13N17')clog(roomNames,creep.name)
               target = creep.getUpgradeStoreToFill(roomNames);
               //if(config.funnelRoomName=='W13N17' && target)clog(target.pos.target.id)
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
	        //if(creep.name==='B-ta-5')clog(target.pos)
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
                                   creep.say('bored')
                    if(config.controller.level<4 && config.controller.haveContainer()){
                        creep.moveToPos(config.controller.getContainer())
                    }else{
                        creep.moveToPos(config.retreatSpot)
                    }
                }
               
            }
            
	    }
	    else if(creep.isCollecting()){
	        
	        let target = Game.getObjectById(creep.memory.reserve_id);

            
	        // collect from local MINES in this room first
	        if(!target){
	            target = creep.getFullestMineStore([config.coreRoomName]);
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
                if(terminal && terminal.storingAtleast(15000)){
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
                if(config.controller.level<4 && config.controller.haveContainer()){
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
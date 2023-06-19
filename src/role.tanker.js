
var roleTanker = {


    getParts: function(budget){
 
 
        if(budget >= 1500 ){ // RCL 5 - 1000 + 500 = 1500/1800 30 ext
            return '20c10m';
            
        }
        else if(budget >= 1300 ){ // RCL 4 - 600 + 300 = 900/1300 20 ext
            return '12c6m';

        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 200 = 600/800 10 ext
            return '8c4m';
        }
        else if(budget >= 550 ){ // RCL 2 - 300 + 150 = 450/550 5 ext
            return '6c3m';

        }
        else if(budget >= 300 ){ // RCL 1 - 200 + 100 = 300/300
            return '4c2m';
        }else{ // RCL fucked
            return '2c1m';
        }
        
    },

    run: function(creep,config) {
        //if(creep.name=='B-ta-0')clog(config)
        creep.checkAndUpdateState();

	    if(creep.isWorking()) {
	        
	        
	        
	        
	        let targget = false;
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
	       
            if(target){
                creep.memory.lastTransferTo=target.structureType;
                let res = creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
              //  creep.say("tx:"+res);
            }else{
                creep.say('bored')
                creep.moveToPos(config.retreatSpot)
            }
            
	    }
	    else if(creep.isCollecting()){
	        
	        let target = Game.getObjectById(creep.memory.reserve_id);

            
	        // collect from MINES in this room next
	        if(!target){
	            target = creep.getFullestMineStore(config.allRoomNames);
	            if(target){
                    creep.memory.lastWithdrewFrom=STRUCTURE_CONTAINER
                }
            }

            if(!target){
    	        let terminal = mb.getTerminalForRoom(config.coreRoomName);
                if(terminal && terminal.storingAtleast(15000)){
                    target = creep.reserveWithdrawalFromTerminal(config.coreRoomName);
                }
	        }
            
            // if not enough E in the mines, then draw from storage
             if(!target && creep.memory.lastTransferTo!==STRUCTURE_STORAGE){
                target = creep.reserveWithdrawalFromStorage(config.coreRoomName);
                if(target){
                    creep.memory.lastWithdrewFrom=STRUCTURE_STORAGE
                }
             }
            if(target){
                creep.memory.lastWithdrewFrom=target.structureType;
                 let res = creep.actOrMoveTo("withdrawX",target,RESOURCE_ENERGY);
               // creep.say("wx:"+res);
                return
    
            }else{
                creep.say('bored')
                creep.moveToPos(config.retreatSpot)
            }
            
            
	    }else{
	        clog("ERROR:: Creep entered bad state:",creep.name);
	    }
	}
	
};

module.exports = roleTanker;
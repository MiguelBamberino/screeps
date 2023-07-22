
var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        let budget = spawn.getCreepBudget();

     
  
        if(budget >= 1500 ){ // RCL 5 - 1000 + 500 = 1500/1800 30 ext
            return [ // 1000 capacity
                    CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,CARRY,
                    
                    MOVE,MOVE,MOVE,MOVE,MOVE,
                    MOVE,MOVE,MOVE,MOVE,MOVE];
        }
        else if(budget >= 1200 ){ // RCL ? - 0 + 800 + 400 =  1200/?? 10 ext
            return [
               // WORK, // 1
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 8
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 8
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE // 8
                ]; 
        }
        else if(budget >= 800 ){ // RCL 3 - 0 + 500 + 250 =  750/800 10 ext
            return [
               // WORK, // 1
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 10
                MOVE,MOVE,MOVE,MOVE,MOVE // 5
                ]; 
        }
        else if(budget >= 550){ // RCL 2 - 0 + 300 + 150 =  450/550 5 ext
            return [CARRY, CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE]; 
        }
        else{ // RCL 1 - 300/300 , assume no roads early on
            return [CARRY, CARRY,CARRY,CARRY, MOVE,MOVE]; 
        }
    },
    getMemory: function(spawn){
        return {role: "worker"};
    },
    run: function(creep,spawn){
        creep.checkAndUpdateState();
       
       
       
        if(creep.isWorking()){
            
            //if(creep.name=='E-wo-0')clog(Game.getObjectById(creep.memory.reserve_id),creep.memory.reserve_id)
            
            let target = Game.getObjectById(creep.memory.reserve_id);
            
            if(target){
               // creep.say("c0:"+target.structureType)
                return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
            }
            
             // probably want to change this so it CAN include storage
            target = creep.getFillerStationToFill();
            if(target){
                creep.say("c1")
                //creep.say(creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY));return;
                let val = creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
                //creep.say(val)
                return val;
            }
            
            
            target = creep.getExtensionToCharge();
            if(target){
                creep.say("c2")
                return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
            }
            
            target = creep.getTowerToCharge();
            if(target){
                creep.say("c3")
                return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
            }
            
            target = creep.getUpgradeStoreToFill([spawn.pos.roomName]);
            if(target){
                creep.say("c4:")
                
                return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
            }
            
            let terminal = mb.getTerminalForRoom(creep.spawn().pos.roomName);
            if(terminal && terminal.storingLessThan(10000)){
                target = creep.reserveTransferToTerminal();
                if(target){
                    creep.say("c5:")
                    return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
                }                
            }

            // lets pop the extra in the storage
            //if(!creep.memory.lastTookFromStorage){
            
                target = creep.reserveTransferToStorage();
                if(target){
                    creep.say("c6:")
                    return creep.actOrMoveTo("transferX",target,RESOURCE_ENERGY);
                }
           // }

            creep.say("Zzz");
            
        }else if(creep.isCollecting()){
            
            // collect from centre link in this room first            
        
            let link = creep.reserveWithdrawalFromStorageLink();
            if(link){
                return creep.actOrMoveTo("withdrawX",link,RESOURCE_ENERGY);
            }
            
            
            
            // collect from MINES in this room next
            let target = creep.getFullestMineStore([ creep.spawn().room.name ])
            //if(creep.spawn().pos.roomName=='W41N53')console.log(target);
            if(target){
                return creep.actOrMoveTo("withdrawX",target,RESOURCE_ENERGY);
            }
            
            let terminal = mb.getTerminalForRoom(creep.spawn().pos.roomName);
            if(terminal && terminal.storingAtleast(15000)){
                return creep.actOrMoveTo("withdraw",terminal,RESOURCE_ENERGY);
            }

            
            // if not enough E in the mines, then draw from storage
            target = creep.reserveWithdrawalFromStorage();
            if(target){
                return creep.actOrMoveTo("withdrawX",target,RESOURCE_ENERGY);
    
            }
            

            creep.say("Yyy");
        }
        
    },
    getNewWorkTarget: function(creep,spawn){
        
        // get any filler storage tht needs topping up
        
        // get any un-managed extensions that need E
        
        // do any towers need topping up ?
        
        // lets put the extra into the room storage
        
        // we have no valid work targets
        return false;
    }
};

module.exports = role;
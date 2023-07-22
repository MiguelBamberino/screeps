
var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        let budget = spawn.getCreepBudget();
             

        let depotE = 0;
        let storage = mb.getStorageForRoom(spawn.pos.roomName);
        if(storage){
            depotE = storage.storedAmount();
            // ease up consumption if storage is neat empty 
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
            return [
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, // 10
                WORK,WORK,WORK,WORK,WORK, // 5
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 10 
                CARRY,CARRY,CARRY,CARRY,CARRY, // 5
                MOVE,MOVE,MOVE,MOVE // 4 
                ]; 
       }
   
        if(budget >= 2000 ){ // RCL 6 - 1200 + 500 + 300 = 2000/1800 30 ext
            return [
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, // 10
                WORK,WORK, // 2
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 10 
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE // 6 
                ]; 
        }
        else if(budget >= 1800 ){ // RCL 5 - 1000 + 500 + 250 = 1750/1800 30 ext
            return [
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, // 10
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, // 10 
                MOVE,MOVE,MOVE,MOVE,MOVE // 5 
                ]; 
        }
        else if(budget >= 1300 ){ // RCL 4 - 800 + 300 + 200 = 1300/1300 20 ext
            return [
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, // 8
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, 
                MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 300 + 100 =  800/800 10 ext
            return [
                WORK,WORK,WORK,WORK, // 4
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,  // 1
                MOVE,MOVE
            ]; 
        }
        else if(budget >= 550){ // RCL 2 - 400 + 50 + 100 =  550/550 5 ext
            return [WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE]; 
        }
        else{ // RCL 1 - 300/300 , assume no roads early on
            return [WORK, WORK, CARRY,MOVE]; 
        }
    },

    
    getMemory: function(spawn){
        return {role: "upgrader"};
    },
    run: function(creep,spawn){
        
        creep.checkAndUpdateState();
        
        let container = creep.spawn().room.controller.getContainer();
        let link = creep.spawn().room.controller.getLink();
        if(!container&&!link){clog('no container/link',creep.name);return;}
        if(creep.isWorking()){
           // if(container){
                if(!creep.pos.isEqualTo(container.pos)){
                    creep.moveToPos(container);
                }    
           // }
            
            creep.actOrMoveTo("upgradeController",creep.spawn().room.controller);
            
        }else if(creep.isCollecting()){
            
            if(link && !link.isEmpty()){
                creep.actOrMoveTo("withdraw",link,RESOURCE_ENERGY);
            }else if(container){
                // lock it, so we own withdrawals of this container. stop thieves.
                if(container.isWithdrawLocked()===false)container.lockReservations(['withdraw']);
                creep.actOrMoveTo("withdraw",container,RESOURCE_ENERGY);

            }else{
                creep.say(413);
            }
        }
        
    },
};

module.exports = role;
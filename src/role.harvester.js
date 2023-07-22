var STATE_APPROACHING="STATE_APPROACHING";
var STATE_STORING="STATE_STORING";
var STATE_BUILDING="STATE_BUILDING";
var STATE_COLLECTING="STATE_COLLECTING";

var roleHarvester = {
    
    create: function(spawn,mine_id=false){
        
        let memory = this.getMemory(spawn,mine_id);

        
        if(!memory.mine_id)return -14;
        let source = Game.getObjectById(memory.mine_id);
        let res = spawn.createCreep(this.getParts(spawn,memory,source),memory);
        return res;
    },
    getParts: function(spawn,memory,source){
        let budget = spawn.getCreepBudget();
        
        // if its low level mine, only send small harvester
        if((source.energyCapacity==1500 && budget > 550)){
            budget=550;
        }

        
        if(budget>=1250){
            // We want a harvester with 10W (x2 more than needed), so we harvester quicker and use less CPU
            // we also want 10W2C so that we can neatly harvest and transfer into the link without dropping any
            return "10W2C3M";
            
            // if we can afford bigger Harvesters, lets harvest source X2 in 125 ticks, then idle for rest of time; saving CPU
            // 12 + 1 + 6 = 1200+50+300 = 1550
            return [
                WORK,WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,  
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE ]; 
            
        }else  if(budget>=800){
            // 6 - 1 - 3 = 600+50+150 = 800
            return [WORK,WORK,WORK,WORK,WORK,WORK, CARRY,  MOVE,MOVE,MOVE ]; // 800/800 = 12E/tick, draining source in 250 ticks
            
        }else if(budget>=550){
            return [WORK,WORK, WORK,WORK,CARRY,MOVE, MOVE]; // 550/550
            
        }
        return [WORK, WORK,CARRY, MOVE]; // 300/300
        
        
        
    },
    getMemory: function(spawn, mine_id){
        
        if(!mine_id){
            let source = spawn.getAvailableMine2();
            mine_id = source?source.id:false;
        }
        if(mine_id)
            return {role: "harvester", mine_id: mine_id};
        else {
            spawn.log("error","no free mine but require miner for source_id:"+mine_id);
            return false;
        }

    },
    run: function(creep,spawn){
       
       let src =  Game.getObjectById(creep.memory.mine_id);
       
       //if(['Beta','Epsilon','Delta'].indexOf(spawn.name)!==-1  && creep.pos.roomName===spawn.pos.roomName){
       if(src.haveLink()){
           creep.actOrMoveTo('linkHarvest',src);
           
           let container = src.getContainer();
           if( container && !container.isEmpty() && !creep.isFull() ){
               creep.withdraw(container,RESOURCE_ENERGY);
           }
           if(container && container.isEmpty()){
               container.destroy();
           }
           
       }else{
           creep.actOrMoveTo('dropHarvest',src);
       }
       //creep.actOrMoveTo('dropHarvest',src);
        
        if(creep.storingAtleast(50)){
            let ext = this.getExtToCharge(creep);
            if(ext){
                creep.transfer(ext,RESOURCE_ENERGY);
            } 
        }
 
       return;

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

module.exports = roleHarvester;
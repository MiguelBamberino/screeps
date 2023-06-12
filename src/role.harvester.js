
var roleHarvester = {
    

    getParts: function(budget,config){
        
        if(true || config.optimiseFor=='CPU'){
            if(budget>=1250){
                // We want a harvester with 10W (x2 more than needed), so we harvester quicker and use less CPU
                // we also want 10W2C so that we can neatly harvest and transfer into the link without dropping any
                return "10W2C3M";
                
                // if we can afford bigger Harvesters, lets harvest source X2 in 125 ticks, then idle for rest of time; saving CPU
                // 12 + 1 + 6 = 1200+50+300 = 1550
            }else  if(budget>=800){
                // 6 - 1 - 3 = 600+50+150 = 800
                // 800/800 = 12E/tick, draining source in 250 ticks
                return '6w1c3m';
    
            }else if(budget>=550){
                return '4w1c2m';
                
            }
            return '2w1c1m'; // 300/300
        }
        
        else{
            if(budget>=800){
                // 6 - 1 - 3 = 600+50+150 = 800
                // 800/800 = 12E/tick, draining source in 250 ticks
                return '6w1c3m';
    
            }else if(budget>=550){
                return '4w1c2m';
                
            }
            return '2w1c1m'; // 300/300
        }

        
    },
    run: function(creep,config){
       
       let src =  this.getSource(creep,config);
       if(!src){
           clog("no source",creep.name)
           return -500;
       }
       
       if( src.haveLink()){
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


        if(creep.storingAtleast(50)){
            let ext = this.getExtToCharge(creep);
            if(ext){
                creep.transfer(ext,RESOURCE_ENERGY);
            } 
        }
 
       return;

   },
   getSource: function(creep,config){
       let src =  Game.getObjectById(creep.memory.mine_id);
       if(!src){
           src = this.getAvailableMine(config);
           creep.memory.mine_id = src.id;
       }
       return src;
   },
    getAvailableMine: function(config) {

        let filters = [
            {
                operator: "fn",
                attribute: "haveNoCreep",
                value: []
            }
        ];
    
        let sources = mb.getSources({
            roomNames: config.coreRoomName,
            filters: filters
        });
        if(sources.length>0){
            return sources[0];
        }

        return false;
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
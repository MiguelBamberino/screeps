
var roleHarvester = {
    

    getParts: function(budget,config){
        
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
        return '2w1m'; // 300/300
    
    },
    run: function(creep,config){
        
        
        
       let src =  this.getSource(creep,config);
       
         
       if( !config.spawnFastFillerReady){
           
           if(src){
                if(src.haveNoCreep())src.setCreep(creep)
                return creep.actOrMoveTo('harvest',src)
           }
           
       }
       if(!src){
           let srcs = mb.getSources({roomNames:[config.coreRoomName]});
                let i = ((creep.name.charAt(5)*1)%2===0)?0:1;
                if(srcs.length==1)i=0;
                let spots = srcs[i].pos.lookForNearbyWalkable(true);
               if(spots.length>0){
                   //clog(spot,creep.name)
                   creep.memory.mine_id = srcs[i].id;
                   creep.memory.extraSupport=true;
               }else if(srcs.length>1){
                   i2 = i===1?0:1;
                   if(srcs[i2]){
                       let spots = srcs[i2].pos.lookForNearbyWalkable(true);
                       if(spots.length>0){
                           //clog(spot,creep.name)
                           creep.memory.mine_id = srcs[i2].id;
                           creep.memory.extraSupport=true;
                       }
                   }
               }
       }
       if(!src){creep.say("!src");return;}
       
       if(creep.memory.extraSupport){
           if(creep.isFull() && src.haveContainer()){
               creep.transfer(src.getContainer(),RESOURCE_ENERGY)
           }
           return creep.actOrMoveTo('harvest',src)
       }
       
        
      // if(creep.name=='K-ha-1')return creep.moveTo(new RoomPosition(18,38,'W48N54'))
        
        if(creep.memory.rampart_ids===undefined){
            if(src && creep.pos.isNearTo(src)){
                let ramps = creep.pos.lookForNearStructures(STRUCTURE_RAMPART);
                
                creep.memory.rampart_ids = [];
                for(let ramp of ramps){
                    creep.memory.rampart_ids.push(ramp.id)
                }
            }
        }
        if(creep.memory.rampart_ids && creep.memory.rampart_ids.length>0 && creep.storingAtLeast(50)){
            for(let id of creep.memory.rampart_ids){
                let rampart = Game.getObjectById(id);
                if(rampart && rampart.hits<config.wallHeight){
                    let res= creep.repair(rampart)
                    return res;
                }
            }
        }

      

       if( src.haveLink()){
           let res = creep.actOrMoveTo('linkHarvest',src);
          // creep.say(res)

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
       
        if(creep.storingAtLeast(50)){
            let target = this.getExtToCharge(creep);
            if(target){
                return creep.transfer(target,RESOURCE_ENERGY);
            } 
            target = this.getTowersToCharge(creep);
            if(target){
                return creep.transfer(target,RESOURCE_ENERGY);
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
            roomNames: [config.coreRoomName],
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
               
               let res = exts[e].reserveTransfer(creep.name,exts[e].store.getCapacity(RESOURCE_ENERGY),true)
              
           }
       }
       
       for(let id of creep.memory.extension_ids){
           let obj = Game.getObjectById(id);
           if(obj && obj.store.getUsedCapacity(RESOURCE_ENERGY)< obj.store.getCapacity(RESOURCE_ENERGY)){
               return obj;
           }
       }
       
   },
      getTowersToCharge:function(creep){
       
       if(creep.memory.tower_ids===undefined){
           let towers = creep.pos.lookForNearStructures(STRUCTURE_TOWER);
           creep.memory.tower_ids = [];
           for(let t of towers){
               creep.memory.tower_ids.push(t.id);
               t.reserveTransfer(creep.name,1000,true)
           }
       }
       
       for(let id of creep.memory.tower_ids){
           let obj = Game.getObjectById(id);
           if(obj && obj.haveSpaceFor(creep.storedAmount()) ){
               return obj;
           }
       }
       
   }
  
   

    
};

module.exports = roleHarvester;
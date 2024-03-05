
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
        if(config.allSourcesBuilt)
            return '2w1c1m'; // 300/300
        else
            return '2w1m'; // 300/300
    
    },
    /**
     *
     * @param creep
     * @param config
     * @param config.coreRoomName
     * @param config.inRecoveryMode
     * @param config.upgradeRate
     * @param config.controller
     * @param config.wallHeight
     * @returns {*}
     */
    run: function(creep,config){

        if(creep.memory.spot){
            let src = gob(creep.memory.mine_id);
            if(creep.isFull() && src.haveContainer()){
                creep.transfer(src.getContainer(),RESOURCE_ENERGY)
            }
            let spot = rp(creep.memory.spot.x,creep.memory.spot.y,creep.memory.spot.roomName);
            if(creep.pos.isEqualTo(spot)){
                return creep.harvest( src );
            }else{
                return creep.moveToPos(spot)
            }

            //return creep.actOrMoveTo('harvest',src)
        }
        
       let src =  this.getSource(creep,config);


       /*if( !config.spawnFastFillerReady){
           
           if(src){
                if(src.haveNoCreep())src.setCreep(creep)
                return creep.actOrMoveTo('harvest',src)
           }
           
       }*/
       if(!src){
           
           let srcs = mb.getSources({roomNames:[config.coreRoomName]});
           for(let src of srcs){
              let freeSpot = src.reserveStandingSpot(creep,true);
              if(freeSpot){
                creep.memory.spot = freeSpot;
                creep.memory.mine_id = src.id;
                return creep.moveToPos(freeSpot);
              }
           }
       }
       if(!src){creep.say("!src");return;}
       

       if(this.runRampartCode(creep,src,config)===OK){
           return OK;
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

        if(!config.inRecoveryMode && config.upgradeRate!==RATE_VERY_SLOW && config.controller.pos.getRangeTo(creep)<=3 && !creep.isEmpty())
            creep.upgradeController(config.controller)


       return;

   },
   runRampartCode:function(creep,src,config){
       
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
        return ERR_NOT_FOUND;

   },
   getSource: function(creep,config){
       let src =  Game.getObjectById(creep.memory.mine_id);
       //creep.memory.extraSupport=false;
       if(!src){
           src = this.getAvailableMine(creep,config);
           creep.memory.mine_id = src.id;
       }
       return src;
   },
    getAvailableMine: function(creep,config) {

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
        let bestDist = 999;
        let bestSrc = false;
        for(let src of sources){
            let dist = creep.pos.getRangeTo(src);
            if(dist<bestDist){
                bestDist = dist;
                bestSrc = src;
            }
        }

        return bestSrc;
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
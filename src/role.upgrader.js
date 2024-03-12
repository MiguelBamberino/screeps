
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
        if(config.controller.level===8 && budget >=1850){
            // RCL ? - 1500 + 150 + 200 = 2450/1800 30 ext
            return '15w3c4m';

        }

        if(budget >= 3550 ){
            // RCL 7 - 1600 + 200 + 250
            return '30w3c8m';
        }

        if(budget >= 2450 ){
            // RCL 7 - 1600 + 200 + 250
            return '20w4c5m';
        }


          if(budget >= 2000 ){ // RCL 6 - 1600 + 200 + 200 = 2000/1800 30 ext
              return '16w4c4m';
          }

        else if(budget >= 1800 ){ // RCL 5 - 1200 + 200 + 150 = 1550/1800 30 ext
            return '12w4c3m';
        }
        else if(budget >= 1250 ){ // RCL 4 - 800 + 200 + 100 = 1100/1300 20 ext
            return '8w4c2m';
        }
        else if(budget >= 800 ){ // RCL 3 - 500 + 200 + 100 =  800/800 10 ext
            return '5w4c2m'; // we want 4c to hold
        }
        else if(budget >= 550){ // RCL 2 - 400 + 50 + 100 =  550/550 5 ext
            return '4w1c2m';
        }
        else{ // RCL 1 - 300/300 , assume no roads early on
            return [WORK, WORK, CARRY,MOVE];
        }
    },
    /**
     *
     * @param creep
     * @param config
     * @param config.controller StructureController
     * @param config.upgradeRate
     * @returns {*}
     */
    run: function(creep,config){

        let controller = config.controller;

        let container = controller.getContainer();
        let standingSpot = controller.getStandingSpot()
        if(!container){
            if(standingSpot){
                if(creep.pos.getRangeTo(standingSpot)<3){
                    // don+'t stand on the standing spot, when terminal/storage need to be placed
                    if(creep.pos.isEqualTo(standingSpot))creep.moveToPos(controller);

                    if(creep.isEmpty()){
                        let drop = creep.pos.lookForNearbyResource(RESOURCE_ENERGY,true);
                        if(!drop){
                            drop = standingSpot.lookForNearbyResource(RESOURCE_ENERGY,true);
                        }
                        if(drop){
                            creep.actOrMoveTo("pickup",drop)
                        }
                    }else{
                        let site = standingSpot.lookForConstruction()
                        if(site)return creep.build(site);
                    }

                }else{
                    return creep.moveToPos(standingSpot)
                }

            }
            else
                return creep.say("!setup")

            return;// dont do logic below
        }

        if(creep.memory.boostPlans){
            creep.runBoostPlan();return;
        }

        if(container){
            //container.allowOverBooking(0)
            // cant have overbooking once we have storage, because it breaks the rKeepr
            if(config.upgradeRate===RATE_VERY_FAST /*&& !creep.room.storage*/ ){
                container.allowOverBooking(1500)
            }else{
                container.allowOverBooking(0)
            }
        }

        let link = controller.getLink();

        ////////////////////////////////////////////////////////////////////////////////////
        /// moveTo queue pos
        ////////////////////////////////////////////////////////////////////////////////////
        if(creep.memory.spot_index===undefined){
            creep.memory.spot_index = 0;
        }
        let standingSpots = controller.getStandingSpots();
        let currSpot = standingSpots[ creep.memory.spot_index ];
        if(currSpot){

            if(creep.pos.isEqualTo(currSpot)){
                let nextSpot = standingSpots[ creep.memory.spot_index+1 ];
                if(nextSpot && nextSpot.isWalkable(true)){
                    creep.memory.spot_index += 1;
                    creep.moveToPos(nextSpot);
                }
            }else{
                creep.moveToPos(currSpot);
            }

        }else{
            creep.say("!spot")
            creep.moveToPos(container)
        }
        if(!container)return;
        ////////////////////////////////////////////////////////////////////////////////////
        /// SWOOOSH spend energy
        ////////////////////////////////////////////////////////////////////////////////////
        if( (container.hitsMax-container.hits) > 1000){
            creep.repair(container);
        }

        // relay energy into the container to share with other upgraders
        if(Game.time %5===0 && config.upgradeRate===RATE_VERY_FAST && !creep.isFull()){
            // if we have drops then get them into the container quick, to avoid decay
            let drop = creep.pos.lookForNearbyResource(RESOURCE_ENERGY,true);

            if(drop){
                if(!container.isFull()){

                    // only transfer the excess so we can still upgrade this tick
                    let amount = creep.storedAmount(RESOURCE_ENERGY) - creep.partCount(WORK);
                    creep.transfer(container,RESOURCE_ENERGY,amount);
                    creep.say("rlay"+amount)
                }

                creep.say("pkup:"+creep.pickup(drop));
            }
            else if(!creep.isEmpty() && container.isEmpty()){
                let amount = creep.storedAmount(RESOURCE_ENERGY) / 2;
                creep.transfer(container,RESOURCE_ENERGY,amount);
                creep.say("sh"+amount)
            }

        }


        creep.upgradeController(controller);

        if(creep.storingAtLeast(50)){
            let ext = this.getExtToCharge(creep);
            if(ext){
                creep.transfer(ext,RESOURCE_ENERGY);
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////
        ///  Collect energy
        ////////////////////////////////////////////////////////////////////////////////////
        if(creep.isEmpty()) {

            if(config.upgradeRate===RATE_VERY_FAST){
                let drop = creep.pos.lookForNearbyResource(RESOURCE_ENERGY,true);
                if(drop){
                    return creep.pickup(drop);
                }
            }

            if (link && !link.isEmpty()) {
                return creep.actOrMoveTo("withdraw", link, RESOURCE_ENERGY);

            } else if (container) {
                container.setAsUpgraderStore();
                // lock it, so we own withdrawals of this container. stop thieves.
                if (container.isWithdrawLocked() === false) container.lockReservations(['withdraw']);
                return creep.actOrMoveTo("withdraw", container, RESOURCE_ENERGY);

            } else {
                creep.say(413);
            }
        }



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
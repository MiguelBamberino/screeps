    Creep.prototype.STATE_WORKING = 'STATE_WORKING';
    Creep.prototype.STATE_COLLECTING = 'STATE_COLLECTING';
    Creep.prototype.STATE_FLEEING = 'STATE_FLEEING'; // not used yet
    

     Creep.prototype.getDefaultParts = function(budget){

        if(budget >= 1300 ){ // RCL 4 - 600 + 300 + 300 = 1200/1300 20 ext
            return [WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 200 + 200 =  800/800 10 ext
            return [WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 550){ // RCL 2 - 200 + 200 + 150 =  550/550 5 ext
            return [WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE]; 
        }
        else{ // RCL 1 - 250/300 , assume no roads early on
            return [WORK, CARRY, MOVE,MOVE]; 
        }
        
    }
    Creep.prototype.checkAndUpdateState=function(config=undefined){
	    
	    if( (this.hitsMax - this.hits) > 100 ){
	        if(config && config.retreatSpot){
	            this.moveToPos(config.retreatSpot);
	            this.goFlee();
	            clog("I'm hurt. Fleeing to "+config.retreatSpot,this.name);
	        }
	        return;
	    }
	    
	    if( !this.isWorking() && this.store.getFreeCapacity(RESOURCE_ENERGY)==0){
            this.memory.state = this.STATE_WORKING;
             this.memory.reserve_id=false;
             this.memory.source_id="";
             this.memory.drop_id = false;
            this.debugSay('🚧');
        }else if( !this.isCollecting() && this.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            this.memory.state = this.STATE_COLLECTING;
            this.memory.reserve_id=false;
            this.memory.source_id="";
            this.memory.drop_id = false;
            this.debugSay('🔄');
        }
        
        if(this.memory.state===undefined){
            this.goWork()
        }
        
	}

	Creep.prototype.recycle = function(){
	    if(this.memory.role=='harvester'){
	        this.spawn().mines()[this.memory.mine_id].creep_id="";
	    }
	    return this.memory.role = 'recycle';
	}
    Creep.prototype.getRole = function(){
	    return this.memory.role;
	}
	Creep.prototype.setRole = function(r){
	    return this.memory.role = role;
	}
	Creep.prototype.state = function(){
	    return this.memory.state;
	}
	Creep.prototype.isWorking = function(){
	    return (this.memory.state === this.STATE_WORKING );
	}
	Creep.prototype.isCollecting = function(){
	    return (this.memory.state === this.STATE_COLLECTING );
	}
	Creep.prototype.isFleeing = function(){
	    return (this.memory.state === this.STATE_FLEEING );
	}
	Creep.prototype.goWork = function(){
	    this.memory.state = this.STATE_WORKING;
	}
	Creep.prototype.goCollect= function(){
	    this.memory.state = this.STATE_COLLECTING;
	}
		Creep.prototype.goFlee= function(){
	    this.memory.state = this.STATE_FLEEING;
	}


    Creep.prototype.spawn=function(){
       return Game.spawns[this.memory.spawn_name];
    }
    /**
     * @param resource_type > RESOURCE_*
     * @param dropMyCurrentStuff > whether to drop any resource of the given type in the same tick
     * @param lookFrequency > how many ticks to wait, since last look
     */
    Creep.prototype.pickupResourcesAtMyFeet = function (resource_type, dropMyCurrentStuff = false, lookFrequency=10) {
        // Do we have no dropped_resource_id & haven't looked in X ticks?
        if (!this.memory.droppedResourceId && (!this.memory.lookedAtResourceTicks || (Game.time - this.memory.lookedAtResourceTicks) >= lookFrequency)) {
            // Look for resources at feet & set looked=now()
            const droppedResource = this.pos.lookForResource(resource_type);
            if (droppedResource) {
                this.memory.droppedResourceId = droppedResource.id;
            }
            this.memory.lookedAtResourceTicks = Game.time;
        }
    
        let drop = Game.getObjectById(this.memory.droppedResourceId);
        // Do we now have a dropped_resource_id?
        if (drop) {
            // Drop our stored resources && Pickup dropped_resource_id
            const droppedResourceObject = Game.getObjectById(this.memory.droppedResourceId);
            if (dropMyCurrentStuff && this.store[resource_type] > 0) {
                this.drop(resource_type);
            }
            this.pickup(droppedResourceObject);
        } else {
            // Set the value to false
            this.memory.droppedResourceId = false;
        }
    }
    Creep.prototype.linkHarvest = function (source) {
        
        const standingSpot = source.getStandingSpot();
        let link = source.getLink();
    
        if (source.haveNoCreep()) {
            source.setCreep(this);
        }
        
    
        if (!standingSpot) {
            if (this.pos.isNearTo(source)) {
                source.setStandingSpot(this.pos);
                standingSpot = this.pos;
                const buildableSpot = standingSpot.findNearbyBuildableSpot();
                if (buildableSpot) {
                    mb.addConstruction(buildableSpot, STRUCTURE_LINK);
                }
                return this.harvest(source);
            } else {
                return ERR_NOT_IN_RANGE;
            }
        } else {
            if (this.pos.isEqualTo(standingSpot)) {
                if (link) {
                    if ( !link.isFull(RESOURCE_ENERGY) ) {
                        
                        this.pickupResourcesAtMyFeet(RESOURCE_ENERGY, false);
                        if(this.isFull(RESOURCE_ENERGY)){
                            this.transfer(link, RESOURCE_ENERGY);
                        }

                    }
                } else {
                    const constructionSites = standingSpot.lookForNearConstructions();
                   
                    if (!constructionSites.length>0) {
                       let links = standingSpot.lookForNearStructures(STRUCTURE_LINK);
                        if (links.length>0) {
                            source.setLink(links[0]);
                            links[0].setAsSender();
                        } else {
                            const buildableSpot = standingSpot.findNearbyBuildableSpot();
                            if (buildableSpot) {
                                mb.addConstruction(buildableSpot, STRUCTURE_LINK);
                            }
                        }
                    }
                    if (constructionSites.length>0 && this.isFull(RESOURCE_ENERGY)) {
                        return this.build(constructionSite[0]);
                    }
                }

                // Harvest energy from the source
                return this.harvest(source);
            } else {
                this.moveToPos(standingSpot);
            }
        }
    }

    Creep.prototype.dropHarvest = function (source,resourceType = RESOURCE_ENERGY) {
        //return;
        let standingSpot = source.getStandingSpot();
        let container = source.getContainer();
       // if(container)container.setAsMineStore();
        if(source.haveNoCreep()){
           source.setCreep(this);
        }
    
        // does the source have a standing spot?
        if (!standingSpot) {
            // Are we adjacent?
            if (this.pos.isNearTo(source)) {
                // Set standing spot, place storage construction site, then harvest
                source.setStandingSpot(this.pos);
                standingSpot = this.pos;
                mb.addConstruction(standingSpot, STRUCTURE_CONTAINER);
                return this.harvest(source);
            } else {
                return ERR_NOT_IN_RANGE;
            }
        } else {
            // Are we on standingSpot?
            if (this.pos.isEqualTo(standingSpot)) {
                
                if (container) {
                    // Does the container have space, lets look to see if we have any overflow to pickup
                    if (!container.isFull(resourceType)) {
                        
                        this.pickupResourcesAtMyFeet(resourceType,true);
                    }
                    
                    // Are we full with energy to use & does the container need repairing?
                    if (this.isFull(resourceType) && container.hits < container.hitsMax) {
                        return this.repair(container);
                    }
                    
                } else {
                    
                    const constructionSite = standingSpot.lookForConstruction();
                    
                    if (!constructionSite) {
                       
                        container = standingSpot.lookForStructure(STRUCTURE_CONTAINER);
                        if(container){
                            // there was not construction, but we have a container, so it was previously built.
                            source.setContainer(container);
                            container.setAsMineStore();
                        }else{
                            // no container / construction site, lets place one
                            mb.addConstruction(standingSpot, STRUCTURE_CONTAINER);
                        }
                    }
                    this.pickupResourcesAtMyFeet(resourceType,false);
                    // Is there a construction site and we have plenty of energy to build it ?
                    // if we are still level 1 room, then just drop the E for workers to collect
                    // && source.room.controller.level >1
                    if (constructionSite && this.isFull(resourceType) ) {
                        
                        return this.build(constructionSite);
                    }
                }
                // aalways Harvest; overflowing into container at feet
                return this.harvest(source);
            } else {
                this.moveToPos(standingSpot);
            }
        }
    }

    Creep.prototype.harvestPlan=function(source){
        
      
        let standingSpot = source.getStandingSpot();
        let container = source.getContainer();
        
        // does the source have a standing spot ?
            // NO >> Are we adjacent ?
                // YES >> Set standing spot, place storage construction site, harvest
                // NO >> just moveTo()
                
            // YES >> Are we on standingSpot ?
                // YES >> Is there a container ?
                    // YES >> Are we full ?
                        // YES >> 
                            // >> Does it need repairing ?
                                // YES >> Repair
                                // NO >> Harvest, overflow into container
                        
                        // NO >> Harvest
                        
                        // Does the container have space
                            // Do we have no dropped_energy_id & haven't looked in X ticks ?  
                                // NO >> Look for E at feet & set looked=now()
                            // Do we now have a dropped_energy_id ? 
                                // YES >> Drop our stored E && Pickup dropped_energy_id 
                            // Does the dropped_energy_id game object exist? 
                                // NO >> delete our reference
                            
                    // NO >> Is there a construction site?
                        // YES >> Are we full ?
                            // YES >> build
                             // NO >> harvest
                        // NO >> Place Construction site
                        
                         
                    
                    
                // NO >> moveTo( standingSpot )
            

    }
     
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Find Energy Target Funcs
	//////////////////////////////////////////////////////////////////////////////////////////////////////
    Creep.prototype.getEnergy=function(roomNames){
        

  	    let storage = this.getNearestWithdrawSite(roomNames);
  	    
        if(storage){
            let res= this.actOrMoveTo("withdrawX",storage);
            
            return res;

        }else{
            let source = this.getNearestSource(roomNames);
            return this.actOrMoveTo("harvest",source);
        }
	}
	Creep.prototype.getTombstone=function(){
	    
	    let tomb = Game.getObjectById(this.memory.tombstone_id);
	    if(tomb){
	        return;
	    }
	    
	    tomb = this.pos.findClosestByPath(FIND_TOMBSTONES);
        if(tomb){
            this.memory.tombstone_id = tomb.id;
            return tomb;
        }
        return false;
        
	}
	/**
	 * Return a droped energy resource if it is nearby AND big enough to be worth collecting
	 * where close-enough=30cells and worth-it=20e
	 */
	Creep.prototype.getDroppedEnergy=function(){
	    
	    return this.getDroppedResource(RESOURCE_ENERGY);
	}
	/**
	 * Return a droped energy resource if it is nearby AND big enough to be worth collecting
	 * where close-enough=30cells and worth-it=20e
	 */
	Creep.prototype.getDroppedResource=function(type){
	    
	    let drop = Game.getObjectById(this.memory.drop_id);
	    if(drop && drop.amount > 50){
	        return drop;
	    }
	    let drops = this.room.find(FIND_DROPPED_RESOURCES);
	    let closest = false;
	    let closestDist = 9999999;
        if(drops.length>0){
            for(let d in drops){
                let dist = this.pos.getRangeTo(drops[d]);
                if(drops[d].resourceType === type && drops[d].amount > (50+dist) && dist < closestDist){
                    
                    closest =  drops[d];
                    closestDist = dist;
                }
            }
            
        }
        if(closest){
           this.memory.drop_id = closest.id;
        }
        return closest;
        
	}
    Creep.prototype.getNearestSource=function(roomNames){
	    let source = Game.getObjectById(this.memory.source_id);
	    if(source){
	        return source;
	    }
	    source = mb.getNearestSource(this.pos,roomNames);
	   
	    if(source){
	        this.memory.source_id = source.id;
	        return source;
	    }else{
	        this.say("src:-600");
	        return false;
	    }
	    
	}
	Creep.prototype.getFillerStationToFill=function(roomNames){
        
        var storage = Game.getObjectById(this.memory.reserve_id);
        
	    if(storage){
	        return storage;
	    }
	 
	    let used =this.store.getUsedCapacity(RESOURCE_ENERGY);
	    let filts = [
	        {attribute:'isFillerStore',operator:'fn',value:[]},
	        // can this target take what dis creep got
	        {attribute:'canReserveTransfer',operator:'fn',value:[used]},
	        // does this fill station have less than 2k stored
	        {attribute:'storingLessThan',operator:'fn',value:[2000]}
	        ];
	   
	    let structures = mb.getStructures({
	                    types:[STRUCTURE_CONTAINER,STRUCTURE_STORAGE],
	                    roomNames:roomNames,
	                    filters:filts,
	                    orderBy:{fn:'storedAmount',value:[]}
	                });
	    
        if(structures.length>0){
            if(this.reserveTransfer(structures[0],used)===OK){
                return structures[0];
            }
        }
        return false;
	    
    }
    Creep.prototype.getMostEmptyDepot=function(roomNames, maxEnergy=null){
        
        var storage = Game.getObjectById(this.memory.reserve_id);
        
	    if(storage){
	        return storage;
	    }
	 
	    let used =this.store.getUsedCapacity(RESOURCE_ENERGY);
	    let filts = [{attribute:'canReserveTransfer',operator:'fn',value:[used]}];
	    if(maxEnergy>0){
	        filts.push({attribute:'storingLessThan',operator:'fn',value:[maxEnergy]});
	    }
	    let structures = mb.getStructures({
	                    types:[STRUCTURE_DEPOT],
	                    roomNames:roomNames,
	                    filters:filts,
	                    orderBy:{fn:'storedAmount',value:[]}
	                });
	    
        if(structures.length>0){
            if(this.reserveTransfer(structures[0],used)===OK){
                return structures[0];
            }
        }
        return false;
	    
    }
    Creep.prototype.getNearestWithdrawSite=function(roomNames){
        
        var storage = Game.getObjectById(this.memory.reserve_id);
        
	    if(storage){
	        return storage;
	    }
	    
	    let free =this.store.getFreeCapacity(RESOURCE_ENERGY);
	    
	    storage = mb.getNearestStructure(
                    this.pos,
                    [STRUCTURE_CONTAINER],
                    roomNames,
                    [
                        {attribute:'isMineStore',operator:'fn',value:[]},
                        {attribute:'canReserveWithdraw',operator:'fn',value:[free]}
                    ])
	    if(!storage){
    	        
    	    storage = mb.getNearestStructure(
                        this.pos,
                        [STRUCTURE_STORAGE],
                        roomNames,
                        [{attribute:'canReserveWithdraw',operator:'fn',value:[free]}])
	    }
	    
	    
        if(storage){
            if(this.reserveWithdraw(storage,free)===OK){
                return storage;
            }
        }
        return false;
	    
    }
    Creep.prototype.getFullestMineStore=function(searchRooms){
        

        let storage = Game.getObjectById(this.memory.reserve_id);
	    if(storage){
	        return storage;
	    }

	    let free =this.store.getFreeCapacity(RESOURCE_ENERGY);
	     storage = mb.getFullestStructure(
                    [STRUCTURE_CONTAINER],
                    searchRooms,
                    [
                        {attribute:'isMineStore',operator:'fn',value:[]},
                        {attribute:'canReserveWithdraw',operator:'fn',value:[free]}
                    ])
	    
        if(storage){
            if(this.reserveWithdraw(storage,free)===OK){
                return storage;
            }
        }
	    return false;
	    
    }
    
    Creep.prototype.getSpawnToCharge=function(searchRooms){
        let spawn = Game.getObjectById(this.memory.reserve_id);
        if(spawn){
            return spawn;
        }
        spawn = mb.getNearestStructure(
                    this.pos,
                    [STRUCTURE_SPAWN],
                    searchRooms,
                    [{attribute:'canReserveTransfer',operator:'fn',value:[1]}])
        if(spawn){
            if(this.reserveTransfer(spawn)===OK){
                return spawn;
            }
        }
        return false;
    }
    Creep.prototype.getExtensionToCharge=function(searchRooms){
        let ext = Game.getObjectById(this.memory.reserve_id);
        if(ext){
            return ext;
        }

        ext = mb.getNearestStructure(
                    this.pos,
                    [STRUCTURE_EXTENSION],
                    searchRooms,
                    [{attribute:'canReserveTransfer',operator:'fn',value:[1]}])
        if(ext){

            if( this.reserveTransfer(ext)===OK){
                return ext;
            }
        }
        return false;
         
    }
    Creep.prototype.getTowerToCharge=function(searchRooms){
        let target = Game.getObjectById(this.memory.reserve_id);
        if(target){
            return target;
        }

        target = mb.getNearestStructure(
                    this.pos,
                    [STRUCTURE_TOWER],
                    searchRooms,
                    [{attribute:'canReserveTransfer',operator:'fn',value:[200]}])// 200 so we dont waste driving over to fill 20e
        if(target){

            if( this.reserveTransfer(target)===OK){
                return target;
            }
        }
        return false;
         
    }
    Creep.prototype.getUpgradeStoreToFill=function(roomNames){
        let target = Game.getObjectById(this.memory.reserve_id);
        if(target){
            return target;
        }
        let targets = mb.getStructures({
                    
                    types:[STRUCTURE_CONTAINER],
                    roomNames:roomNames,
                    filters:[
                         {attribute:'isUpgraderStore',operator:'fn',value:[]},
                          {attribute:'canReserveTransfer',operator:'fn',value:[this.storedAmount()]}
                    ]})
        if(targets.length){

            if( this.reserveTransfer(targets[0])===OK){
                return targets[0];
            }
        }
        return false;
         
    }
    Creep.prototype.reserveWithdrawalFromStorage=function(searchRoom,amount=null){
        let obj = mb.getStorageForRoom(searchRoom);
        if(obj){
            if(this.reserveWithdraw(obj,amount)===OK){
                return obj;
            }
        }
        return false;
    }
    Creep.prototype.reserveWithdrawalFromTerminal=function(searchRoom,amount=null){
        let obj = mb.getTerminalForRoom(searchRoom);
        if(obj){
            if(this.reserveWithdraw(obj,amount)===OK){
                return obj;
            }
        }
        return false;
    }
    Creep.prototype.reserveWithdrawalFromStorageLink=function(searchRoom,amount=null){
        let storage = mb.getStorageForRoom(searchRoom);
        
        if(storage){
            let link = storage.getLink();
            if(link){
                let res = this.reserveWithdraw(link,amount);
                //clog(res,this.name)
                if(res===OK)return link;
            }
        }
        return false;
    }
    Creep.prototype.reserveTransferToStorage=function(searchRoom,amount=null){
        let obj = mb.getStorageForRoom(searchRoom);
        if(obj){
            if(this.reserveTransfer(obj,amount)===OK){
                return obj;
            }
        }
        return false;
    }
    Creep.prototype.reserveTransferToTerminal=function(searchRoom,amount=null){
        let obj = mb.getTerminalForRoom(searchRoom);
        if(obj){
            if(this.reserveTransfer(obj,amount)===OK){
                return obj;
            }
        }
        return false;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Core ReservationBook Funcs
	//////////////////////////////////////////////////////////////////////////////////////////////////////
    Creep.prototype.reserveWithdraw=function(target,amount=null){
        
        if(target){
            // how much space is available to reserve?
            let limit = target.getWithdrawReserveLimit();
            
            // are we force setting the amount we want to reserve?
            let reserveAmount = !amount?limit:amount;
            if(this.haveSpaceFor(reserveAmount,RESOURCE_ENERGY)==false){
                // creep can't reserve the full amount, so reserve what it can
                reserveAmount = this.store.getFreeCapacity(RESOURCE_ENERGY);
            }
            let res =  target.reserveWithdraw(this.name,reserveAmount);
            // hack, lets see if this works. Basically, if we already had a reservation, then lets just go
            if(res ===ERR_ALREADY_BOOKED){res=OK};
            if( res === OK ){
                this.memory.reserve_id = target.id;
            }else{
                this.debugSay(res);
            }
            return res;
        }
        return ERR_NOT_FOUND;
    }
    Creep.prototype.reserveTransfer=function(target,amount=null){
        if(target){
            // how much space is available to reserve?
            let limit = target.getTransferReserveLimit();
            // are we force setting the amount we want to reserve?
            let reserveAmount = !amount?limit:amount;
            if(this.carryingAtleast(reserveAmount,RESOURCE_ENERGY)==false){
                // creep can't reserve the full amount, so reserve what it can
                reserveAmount = this.store.getUsedCapacity(RESOURCE_ENERGY);
            }
            let res =  target.reserveTransfer(this.name,reserveAmount);
            
            // hack, lets see if this works. Basically, if we already had a reservation, then lets just go
            if(res ===ERR_ALREADY_BOOKED){res=OK};

            if( res === OK ){
                this.memory.reserve_id = target.id;
            }else{
                this.debugSay(res);
            }
            return res;
        }
        return ERR_NOT_FOUND;
    }
    
    Creep.prototype.withdrawX=function(target){
        let reservations = target.getReservations();
        
        if(!reservations.withdraw.reserves[this.name]){
            this.memory.reserve_id=false;// please dont bite me. I think this happens if they lose vision to container
            return ERR_NO_BOOKING;
        }
        
        if(target.canFulfillWithdraw(this.name)){
            let amount = reservations.withdraw.reserves[this.name];
           
            // if creep no longer has enough spave, only take what we can
            let free = this.store.getFreeCapacity(RESOURCE_ENERGY);
            if(amount > free){
                amount = free;
            }
            
            let res = this.withdraw(target,RESOURCE_ENERGY,amount);
            
            if(res ===OK){
                this.memory.reserve_id= false;
                target.fulfillWithdraw(this.name);
            }
            return res;
        }else{
            this.memory.reserve_id = false; // drop reservation ?
            target.fulfillWithdraw(this.name);// drop the reservation?
            return ERR_OVER_BOOKED;
        }
    
    }
    Creep.prototype.transferX=function(target){
        let reservations = target.getReservations();
        
        if(!reservations.transfer.reserves[this.name]){
            return ERR_NO_BOOKING;
        }
        if(target.canFulfillTransfer(this.name)){
            let amount = reservations.transfer.reserves[this.name];
            // if creep no longer has what it promised, just transfer what left
            let used = this.store.getUsedCapacity(RESOURCE_ENERGY);
            if(amount > used){
                amount = used;
            }
            let res = this.transfer(target,RESOURCE_ENERGY,amount);
            if(res ===OK){
                this.memory.reserve_id= false;
                target.fulfillTransfer(this.name);
            }
            return res;
        }else{
            this.memory.reserve_id = false; // drop reservation ?
            target.fulfillTransfer(this.name);// drop the reservation?
            return ERR_OVER_BOOKED;
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Store Helper Funcs
	//////////////////////////////////////////////////////////////////////////////////////////////////////
    Creep.prototype.storingAtleast = function(amount,type=RESOURCE_ENERGY){
        return ( this.store.getUsedCapacity(type) >= amount);
    }
    Creep.prototype.storingLessThan = function(amount,type=RESOURCE_ENERGY){
        return ( this.store.getUsedCapacity(type) <= amount);
    }
    Creep.prototype.haveSpaceFor = function(amount,type=RESOURCE_ENERGY){
        return ( this.store.getFreeCapacity(type) >= amount);
    }
    Creep.prototype.isFull = function(type=RESOURCE_ENERGY){
        return ( this.store.getFreeCapacity(type) == 0);
    }
    Creep.prototype.carryingAtleast = function(amount,type=RESOURCE_ENERGY){
        return this.storingAtleast(amount,type);
    }
    Creep.prototype.storedAmount=function(type=RESOURCE_ENERGY){
        return this.store.getUsedCapacity(type);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Random Functions - Refactor these into prototype.room and prototype.room-position ?
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    Creep.prototype.getStructureAtCoord=function(coord,type){
        return this.getObjectAtCoord(coord, type,LOOK_STRUCTURES);
    }
    Creep.prototype.getConstructionAtCoord=function(coord,type){
        return this.getObjectAtCoord(coord, type,LOOK_CONSTRUCTION_SITES);
    }
    Creep.prototype.getObjectAtCoord=function(coord,type,group_type){
        if(!coord.roomName){
            coord.roomName = this.room.name;
        }
        let pos = new RoomPosition(coord.x,coord.y,coord.roomName);
        return this.getObjectAtPos(pos,type,group_type);
    }
    Creep.prototype.getObjectAtPos=function(pos,type,group_type){

        let sites = this.room.lookForAt(group_type,pos);
        for(let s in sites){
            if(sites[s].structureType === type){
                return sites[s];
            }
        }
        return false;
    }

    
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	//// CORE DEBUG FUNCS
	//////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * print to console
     */ 
    Creep.prototype.log = function(type,msg){
        if(logs){
            logs.log(this.name+"::"+type,msg);
        }
    }

    /**
     * log an event to the trace print to console
     */ 
    Creep.prototype.traceMsg = function(msg){
        if(logs){
            logs.creepTrace(this,msg);
        }
        
    }

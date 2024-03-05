    Creep.prototype.STATE_WORKING = 'STATE_WORKING';
    Creep.prototype.STATE_COLLECTING = 'STATE_COLLECTING';
    Creep.prototype.STATE_FLEEING = 'STATE_FLEEING'; // not used yet
    Creep.prototype.STATE_BOOSTING = 'STATE_BOOSTING'; 
    

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

	    // kill self, if they could not complete another job and not currently doing a job
        // this avoids lots of dropped E
        if(this.ticksToLive<25 && this.isEmpty()){
            this.say("TTL<25:🪦")
            this.suicide();
            return;// return here, so we can't change state back to collect and pick up 1k E on the same tick we schedule a suicide
        }
	    //if(this.name=='I-wo-0')clog(this.memory.reserve_id,'reserve_id in checkAndUpdateState')
	    if( (this.hitsMax - this.hits) > 100 ){
	        if(config && config.retreatSpot){
	            this.moveToPos(config.retreatSpot);
	            this.goFlee();
	            clog("I'm hurt. Fleeing to "+config.retreatSpot,this.name);
	            return;// return so we keep fleeing until healed, then can go back to work
	        }
	        
	    }
	    
	  //  this.runBoostPlan();
	    
	 
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
	/**
	 * read the boostplan from creep memory and go to the planned labs for boosts
	 * plan is deleted after all boosts have applied
	 * boostplan = array of these {resource_type:RESOURCE_ZYN_HYRDIDE,lab_id:'25vj9nv8noi'}
	 */ 
    Creep.prototype.runBoostPlan = function(){
        
	    if(this.memory.boostPlans){
	        let completedCount = 0;
	        //this.goBoosting();
	        for(let plan of this.memory.boostPlans){
	            
	            if(plan.completed){
	                completedCount++; continue;
	            }
	            
	            let lab = Game.getObjectById(plan.lab_id);
	            if(!lab){
	                this.say('!lab'); plan.completed= true;continue;
	            }
	            if(lab && !plan.completed){
	                if(this.pos.isNearTo(lab)){
	                    
	                    //this.say(this.boostCount(plan.resource_type))
	                    if(this.boostCount(plan.resource_type,true)>0){
	                         plan.completed= true;this.say("rawwr")
	                    }else{
	                        let res = lab.boostCreep(this);
	                        //clog(res,this.name)
	                        if(res===ERR_NOT_ENOUGH_RESOURCES){
	                            if(Game.time%2===0)this.say("OOR!");
	                            else this.say("wait")
	                            if(plan.dontWait)plan.completed= true;
	                        }
	                        if(res===ERR_NOT_FOUND){
	                            clog(this.memory.boostPlans,"boost error:boostPlans")
	                            console.log(lab.id,lab.pos)
	                            clog(lab.store,"boost error:lab")
	                            plan.completed= true;
	                             if(Game.time%2===0)this.say("ERR-NF!");
	                            else this.say("wait")
	                        }
	                    }
	                }else{
	                    this.moveToPos(lab);
	                }
	                
	            }
	        }
	        //clog(completedCount,this.name+' completedCount')
	        //clog(this.memory.boostPlans.length,this.name+' boostPlans.length')
	        if(completedCount==this.memory.boostPlans.length){
	            delete this.memory.boostPlans;
	            //this.goWork();
	        }
	        return; // return so we boost before going to work
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
	Creep.prototype.isBoosting = function(){
	    return (this.memory.state === this.STATE_BOOSTING );
	}
	Creep.prototype.goBoosting = function(){
	    this.memory.state = this.STATE_BOOSTING;
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

        let standingSpot = source.getStandingSpot();
        let link = source.getLink();
        let buildableSpot=false;
        
        if (source.haveNoCreep()) {
            source.setCreep(this);
        }
    
        if (!standingSpot) {
            if (this.pos.isNearTo(source)) {
                source.setStandingSpot(this.pos);
                standingSpot = this.pos;
                buildableSpot = standingSpot.findNearbyBuildableSpot();
                if (buildableSpot) {
                    mb.addConstruction(buildableSpot, STRUCTURE_LINK);
                }
                return this.harvest(source);
            } else {
                return ERR_NOT_IN_RANGE;
            }
        } else {
            let nextTo = this.pos.isEqualTo(standingSpot);
            if(nextTo && source.energy==0 )return ERR_NOT_ENOUGH_RESOURCES;
            
            if (nextTo) {
                if (link) {
                    if (   !link.isFull(RESOURCE_ENERGY) ) {
                        
                        this.pickupResourcesAtMyFeet(RESOURCE_ENERGY, false,50);
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
                            buildableSpot = standingSpot.findNearbyBuildableSpot();
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
                if(this.pos.isNearTo(standingSpot)){
                    let creepInTheWay = standingSpot.lookForCreep();
                    if(creepInTheWay){
                        this.swapPositions(creepInTheWay)
                    }else{
                        this.moveToPos(standingSpot);
                    }
                }else{
                    this.moveToPos(standingSpot);
                }
                return ERR_BUSY
            }
        }
    }

    Creep.prototype.dropHarvest = function (source,resourceType = RESOURCE_ENERGY) {
        if(!source)return -404;
        let standingSpot = source.getStandingSpot();
        let container = source.getContainer();
        
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
                if(this.pos.isNearTo(standingSpot)){
                    let creepInTheWay = standingSpot.lookForCreep();
                    if(creepInTheWay){
                        this.swapPositions(creepInTheWay)
                    }else{
                        this.moveToPos(standingSpot);
                    }
                }else{
                    this.moveToPos(standingSpot);
                }
                return ERR_BUSY
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
            
            let storage = mb.getStorageForRoom(this.pos.roomName)
            let withdrawLimit = storage?15000:1000;
            if(!storage || (storage && !storage.getMeta().streaming) ){
    	        let terminal = mb.getTerminalForRoom(this.pos.roomName);
                if(terminal && terminal.storingAtLeast(withdrawLimit)){
                    target = this.reserveWithdrawalFromTerminal(this.pos.roomName);
                }
	        }
            
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
	Creep.prototype.getDropFromRemoteSources=function(roomNames=[],minDraw=50){
	     let drop = Game.getObjectById(this.memory.drop_id);
	    if(drop)return drop;
	    let copyNames = [];
        for(let n of roomNames)copyNames.push(n)
	    let shuffledRoomNames = copyNames.sort(() => Math.random() - 0.5)

	    for(let roomName of shuffledRoomNames){
	        
	        drop = this.getDropFromLocalSources(50,roomName);
	        if(drop) return drop;
	        
	    }
	    return false
	}
	Creep.prototype.getDropFromLocalSources=function(minDraw=50,roomName=false){
	    
	    let drop = Game.getObjectById(this.memory.drop_id);
	    if(drop)return drop;
	    roomName = roomName?roomName:this.pos.roomName
	    let srcs = mb.getAllSourcesForRoom(roomName);
	    let drops = [];
	    
	    if(srcs.length===0)return false;
	    
	    if(srcs.length===1){
	        drops = srcs[0].pos.lookForNearbyResources(RESOURCE_ENERGY,false,minDraw);
	    }else{
	        
	        for(let src of srcs){
	            // if a source is really close, just stick to this one first
	            if(this.pos.getRangeTo(src.pos)<= 3){
	                drops = src.pos.lookForNearbyResources(RESOURCE_ENERGY,false,minDraw);
	                //console.log(this.name,'picked local',drops.length,drops)
	                break;
	            }
	        }
	        // if we didnt find a really close one, then randomise one to load balance
	        if(drops.length===0){
	            let randomZeroOrOne = Math.round(Math.random());
	            let first = randomZeroOrOne===0?0:1;
	            let second = randomZeroOrOne===0?1:0;
	           
	            drops = srcs[first].pos.lookForNearbyResources(RESOURCE_ENERGY,false,minDraw);
	            if(drops.length===0){
	                drops = srcs[second].pos.lookForNearbyResources(RESOURCE_ENERGY,false,minDraw);
	            }
	        }
	    }
	    
	    // now we have some drops, lets pick one
	    if(drops.length>0){
            this.memory.drop_id = drops[0].id;
            return drops[0];
            
        }
        return false;
	}
	/**
	 * Return a droped energy resource if it is nearby AND big enough to be worth collecting
	 * where close-enough=30cells and worth-it=20e
	 */
	Creep.prototype.getDroppedEnergy=function(minSize=50){
	    
	    return this.getDroppedResource(RESOURCE_ENERGY,minSize);
	}
	/**
	 * Return a droped energy resource if it is nearby AND big enough to be worth collecting
	 * where close-enough=30cells and worth-it=20e
	 */
	Creep.prototype.getDroppedResource=function(type,minSize=50){
	    
	    let drop = Game.getObjectById(this.memory.drop_id);
	    if(drop && drop.amount > minSize){
	        return drop;
	    }
	    let drops = this.room.find(FIND_DROPPED_RESOURCES);
	    let closest = false;
	    let closestDist = 9999999;
        if(drops.length>0){
            for(let d in drops){
                let dist = this.pos.getRangeTo(drops[d]);
                if(drops[d].resourceType === type && drops[d].amount > (minSize+dist) && dist < closestDist){
                    
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
    Creep.prototype.getNearestSource=function(roomNames, useStandingSpots = true){
	    let source = Game.getObjectById(this.memory.source_id);
	    if(source){
	        return source;
	    }
	    source = mb.getNearestSource(this.pos,roomNames);
	   // useStandingSpots is a hack related to settting up new rooms where sources dont get standingspots set correctly
        /// will come back to bite me. fix the bugs mate
	    if(source && (!useStandingSpots || source.haveFreeStandingSpot()) ){
	        this.memory.source_id = source.id;
	        return source;
	    }else{
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
	Creep.prototype.getFillerStationToFill2=function(roomNames){
        
	 
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
            return structures[0];
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
    Creep.prototype.getFullestMineStore=function(searchRooms,force=false){
        

        let storage = Game.getObjectById(this.memory.reserve_id);
	    if(storage){
	        return storage;
	    }
        let safeRooms =[];
        for(let roomName of searchRooms){
            if(Game.rooms[roomName]) {
                if (Game.rooms[roomName].getInvaders().length === 0) safeRooms.push(roomName)
                //else console.log(this.name, " avoding unsafe room : ", roomName,Game.rooms[roomName].getInvaders())
            }
        }
	    let free =this.store.getFreeCapacity(RESOURCE_ENERGY);
	    //if(this.name==='A-ta-5')clog(searchRooms,free)
	     storage = mb.getFullestStructure(
                    [STRUCTURE_CONTAINER],
                    safeRooms,
                    [
                        {attribute:'isMineStore',operator:'fn',value:[]},
                        {attribute:'canReserveWithdraw',operator:'fn',value:[free]}
                    ])
	    
        if(storage){
            if(this.reserveWithdraw(storage,free,force)===OK){
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
    Creep.prototype.getLabToCharge=function(searchRooms){
        let lab = Game.getObjectById(this.memory.reserve_id);
       
        if(lab){
            return lab;
        }

        lab = mb.getNearestStructure(
                    this.pos,
                    [STRUCTURE_LAB],
                    searchRooms,
                    [{attribute:'canReserveTransfer',operator:'fn',value:[1]}])
        if(lab){
           
            if( this.reserveTransfer(lab)===OK){
                return lab;
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
        //clog(target.id,this.name)
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
            let res = this.reserveTransfer(targets[0]);
            if(res===OK){
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
       // if(this.name==='Et4')clog(target.pos,"here")
        if(!reservations.transfer.reserves[this.name]){
            this.memory.reserve_id = false; // drop reservation ?
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
    // Fighting Functions - funcs for fighting other creeps
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    Creep.prototype.getKillTarget = function(fightPlayers=true, fightInvaders=true, fightSourceKeepers=true, maxDistance=75){
        
        let target = Game.getObjectById(this.memory.enemy_target_id);
        if(target)return target;
        
        if(fightPlayers)
            for(let cname of this.pos.room.getEnemyPlayerCreeps()){
                let enemy = Game.creeps[cname];
                if(enemy){
                    
                }
            }
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

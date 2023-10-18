const AbstractComplex = require('class.complex.abstract')
module.exports =class ExtractorComplex extends AbstractComplex{
    
    constructor(anchor,facing,spawnName,fillerSize=600){
        
        super(anchor,facing);
        
        this.spawnName = spawnName;
        this.runCoolDown=0;// this is used for CPU saving. There is a lot of check to run, for successful run.
        
        // if a global reset happens when we're running, then turn us back on.
        for(let i in this.standingSpots){
            let cname = this.spawnName.charAt(0)+'-ex-'+i;
            if(Game.creeps[cname])this.windDown();
        }
    }
    
     runComplex(){
        
        if(this.runCoolDown>0){
            this.runCoolDown--;return ERR_TIRED;
        }
        let mineral = mb.getMineralForRoom(this.anchor.roomName);
        if(mineral.mineralAmount===0 && !this.isWindingDown()){
            this.windDown();
            //this.runCoolDown = mineral.ticksToRegeneration;
            //return ERR_TIRED;
        }
        
        
        let extractorIDs = this.getStructureIDsByType(STRUCTURE_EXTRACTOR);
        if(extractorIDs.length!==1){this.markRequiredStructureMissing(); return ERR_INVALID_ARGS;}
        let extractor = gob(extractorIDs[0]);
        if(!extractor){this.markRequiredStructureMissing(); return ERR_INVALID_ARGS;}
        
        let containerIDs = this.getStructureIDsByType(STRUCTURE_CONTAINER);
        if(containerIDs.length!==1){this.markRequiredStructureMissing(); return ERR_INVALID_ARGS;}
        let container = gob(containerIDs[0]);
        if(!container){this.markRequiredStructureMissing(); return ERR_INVALID_ARGS;}
        let atleastOneHarvyAlive=false;
        
        
        
        for(let i in this.standingSpots){
            let cname = this.spawnName.charAt(0)+'-ex-'+i;
            if(!Game.creeps[cname]  && !this.isWindingDown() ){
                let bodyPlan = '20w1c5m';
                if( this.room().energyCapacityAvailable >= 4450 )bodyPlan='39w1c10m';
                else if( this.room().energyCapacityAvailable >= 4450 )bodyPlan='39w1c10m';
                
                Game.spawns[this.spawnName].spawnCreepX(bodyPlan,cname);
            }
            if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                atleastOneHarvyAlive=true;
                let creep = Game.creeps[cname];
                if(creep.pos.isEqualTo(this.standingSpots[i])){
                    if(container.haveSpaceFor( (50*this.standingSpots.length) ,mineral.mineralType))creep.harvest(mineral)
                    
                    if( !creep.pos.isEqualTo(container.pos) ){
                        let harvestAmount = creep.partCount(WORK)*HARVEST_MINERAL_POWER;
                        if(creep.ticksToLive<extractor.cooldown || !creep.haveSpaceFor(harvestAmount,mineral.mineralType)){
                            creep.transfer(container,mineral.mineralType);
                        }
                    }else{
                        if(mineral.mineralAmount==0)creep.drop(mineral.mineralType)
                    }
                }else{
                    creep.moveToPos(this.standingSpots[i])
                }
            }
        }
        
        let cname = this.spawnName.charAt(0)+'-mh-0';
        // as long as we have a harvester, even if we are windingDown, keep collecting until offline
        if(!Game.creeps[cname] && atleastOneHarvyAlive  ){
            
            let bodyPlan = '5*2c1m';
            // if we have space for fat harvys, then we need a bigger hauler
            if(this.room().energyCapacityAvailable >= 4450 )bodyPlan='10*2c1m';
            else if(this.room().energyCapacityAvailable >= 4450 )bodyPlan='10*2c1m';
            
            Game.spawns[this.spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(creep.isFull(mineral.mineralType) || mineral.mineralAmount==0){
                if(creep.transfer( mineral.room.storage, mineral.mineralType) === ERR_NOT_IN_RANGE){
                    creep.moveToPos(mineral.room.storage)
                }
            }else{
                if(creep.withdraw( container, mineral.mineralType) === ERR_NOT_IN_RANGE){
                    creep.moveToPos(container)
                }
            }
        }
         
        return OK; 
        
     }
     
     /**
 * REQUIRE: prototype.room-position.lookForNearbyWalkable()
 * 
 * Find the best place for a containing, preferring a spot closes to [facePos]
 * and hopefully have 2 adjacent walkable spots, so 3 creeps can mine and share the container
 * @param RoomPosition facePos
 */ 
    setupMiningPositions(mineral,facePos){
        let closestDist = 99;
        let bestStandingSpots = [];
        let potentialMinerSpots = mineral.pos.lookForNearbyWalkable(false,false);
        for(let pos of potentialMinerSpots){
            let standingSpots=[];   
            let dist = pos.getRangeTo(facePos);

			for(let pos2 of potentialMinerSpots){
				if(pos.isNearTo(pos2))standingSpots.push(pos2);
			}
    		
    		// prefer spots where the container would have more adj spot
    		if(standingSpots.length > bestStandingSpots.length){
    			closestDist=dist;
    			this.containerSpot=pos;
    			bestStandingSpots=standingSpots;
    			
    		}
    		// otherwise just prefer closer points thats not worse
    		else if(dist<closestDist && standingSpots.length == bestStandingSpots.length){
                closestDist=dist;
    			this.containerSpot=pos;
    			bestStandingSpots=standingSpots;
            }
        }
        this.standingSpots = bestStandingSpots;
    }
    
    /** 
     * @param RoomPosition facingPos
     */ 
    getLayoutPlan(facingPos){
        
        let plan = [{type:STRUCTURE_EXTRACTOR,offset:{x:0,y:0},rcl:6,required:true}]
        
        let mineral = mb.getMineralForRoom(this.anchor.roomName);
        
        if(!this.containerSpot){
            
            this.setupMiningPositions(mineral,facingPos)
        }
  
        let offsets = mineral.pos.getOffsets(this.containerSpot);
        plan.push({type:STRUCTURE_CONTAINER,offset:offsets,rcl:6,required:true})
        
        return plan; 
    }
}
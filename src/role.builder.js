var role = {


    getParts: function(budget){
        if(budget >=2750){
            return '10w20c15m';
        }
        else if(budget >= 1300 ){ // RCL 4 - 600 + 300 + 300 = 1200/1300 20 ext
            return [WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 800 ){ // RCL 3 - 400 + 200 + 200 =  800/800 10 ext
            return [WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 550){ // RCL 2 - 200 + 200 + 150 =  550/550 5 ext
            return [WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE]; 
        }
        else if(budget >= 400){ 
            return '2w2c2m'; 
        }
        else{ 
            // RCL 1 - 250/300 , assume no roads early on, and builders need to move a lot
            return '1w1c2m'; 
        }

    },
    run: function(creep,config) {
        
        creep.checkAndUpdateState();
        let playerAttackers = Game.rooms[config.coreRoomName].getEnemyPlayerFighters(); 
        
        let cpuCreep = 'B-bu-3';
        
        let useWhatWeHave = (config.controller.level===1 && !creep.isEmpty())
    
	    if( /*useWhatWeHave ||*/ creep.isWorking()) {
	        
	        // if we just built a rampart, lets repair before it fades. set it as our repair target
    	   if(creep.memory.last_site_type==STRUCTURE_RAMPART && creep.memory.last_site_pos){
             // if(creep.name==='E-bu-0')clog("looking for ramp",Game.time)
               let lastSitePos = new RoomPosition(creep.memory.last_site_pos.x,creep.memory.last_site_pos.y,creep.pos.roomName)
                let obj = lastSitePos.lookForStructure(STRUCTURE_RAMPART);
                if(obj && obj.hits<10000){
                    //if(creep.name==='E-bu-0')clog("found ramp",Game.time)
                    creep.memory.construction_site_id=false;
                    creep.memory.target_to_fix_id=obj.id;
                    return creep.actOrMoveTo("repair",obj);
                }else{
                   // if(creep.name==='E-bu-0')clog("no ramp at last pos",Game.time)
                    creep.memory.last_site_type=false;
                }
                
            }
	        
	        
	        
	       let structure = false;
	      // if(creep.name==cpuCreep)logs.startCPUTracker(creep.name+':targetToRepair');
	       
	       if(!creep.memory.construction_site_id){
                structure = this.targetDefenceToRepair(creep,config);
                if(structure && structure.hits < 10000 && playerAttackers.length>0){
                    return creep.actOrMoveTo("repair",structure);
                }
	       }
          // if(creep.name==cpuCreep) logs.stopCPUTracker(creep.name+':targetToRepair',true);
            
              //  if(creep.name==cpuCreep)logs.startCPUTracker(creep.name+':siteToBuild');
            //  if(creep.name==='E-bu-0')clog("getting site",Game.time)
	        var site = this.siteToBuild(creep,config);
	           // if(creep.name==cpuCreep) logs.stopCPUTracker(creep.name+':siteToBuild',true);
            
            if(site) {
               // if(creep.name==='E-bu-0')clog("building site",Game.time)
                //if(creep.name==cpuCreep)logs.startCPUTracker(creep.name+':camp');
                // dont camp roads and cause traffic
                // Cost too much CPU on shard3
                /*if(creep.pos.lookForStructure(STRUCTURE_ROAD)){
                    creep.moveToPos(site)
                }*/
                // try not camp/crowd out the site access
                if(Game.spawns[config.name] && creep.pos.isNearTo(site)){
                    creep.moveTo(Game.spawns[config.name]);
                    return creep.build(site);
                }
               // if(creep.name==cpuCreep)logs.stopCPUTracker(creep.name+':camp',true);
                
               //if(creep.name==cpuCreep) logs.startCPUTracker(creep.name+':build');
                let res = creep.actOrMoveTo("build",site);
               //if(creep.name==cpuCreep) logs.stopCPUTracker(creep.name+':build',true);
                return res;
            }
            
            if(structure){
     
               // creep.say("r:"+structure.hits+"/"+config.wallHeight);
               //if(creep.name==cpuCreep) logs.startCPUTracker(creep.name+':repair');
                let res = creep.actOrMoveTo("repair",structure);
               //if(creep.name==cpuCreep) logs.stopCPUTracker(creep.name+':repair',true);
                return res;
            }
           
            return creep.actOrMoveTo("upgradeController",config.controller);
            //creep.say("I'm bored!");
            
	    }
	    
	    
	    else if(creep.isCollecting()){
	        //creep.memory.target_to_fix_id = false;

	        if(config.controller.level <=3 ){
                
                let drop = creep.getDropFromLocalSources(25);
                
                if(!drop){
                    drop = creep.getDroppedEnergy(25);
                }
                
                if(drop ){
                    // if creep finds drop, they might have reserved E in a container, so release it
                    if(creep.memory.reserve_id){
                        let targetToClear = gob(creep.memory.reserve_id)
                         creep.memory.reserve_id = false;
                        if(targetToClear)targetToClear.fulfillWithdraw(creep.name);
                    }
                    // keep resetting the con site, so builder does stick to a site really far away
                    creep.memory.construction_site_id = false;
                    return creep.actOrMoveTo("pickup",drop);
                }
                
                //if( !srcs[i].haveContainer() )return creep.actOrMoveTo("harvest",srcs[i]);
            }
            

           // if(creep.name==cpuCreep)logs.startCPUTracker(creep.name+':getEnergy');
	        creep.getEnergy([config.coreRoomName]);
	        //if(creep.name==cpuCreep) logs.stopCPUTracker(creep.name+':getEnergy',true);
	    }else{
	        creep.say("I'm ?!@!");
	    }
	},
	siteToBuild: function(creep,config){

	    
	    var site = Game.getObjectById(creep.memory.construction_site_id);
	    
	    if(site){
	        
	        creep.memory.last_site_type = site.structureType;
	        creep.memory.last_site_pos = {x:site.pos.x,y:site.pos.y};
	        return site;
	    }
        creep.memory.construction_site_id=false;
	    let obj = mb.getNearestConstruction(creep.pos, [config.coreRoomName]);
	    if(obj){
            creep.memory.construction_site_id=obj.id;
	        return obj;
	    }
	    return false;
	},
	targetDefenceToRepair: function(creep,config, types){
	    
	    // prioritise the rampart that looks in danger
	    let closestAttackRamp = Game.getObjectById(config.defenceIntel.closest_ramp_id);
	    let weakest = Game.getObjectById(config.defenceIntel.weakest_structure.id);
	    let structure = false;
	    
	    if(closestAttackRamp){
	        if(closestAttackRamp.pos.getRangeTo(weakest)<4){
	            structure = weakest; // if the weakest is on the front line, heal this
	        }else{
	            structure = closestAttackRamp; // heal the predicted rampart
	        }
	    }else{
	        structure = weakest;// no enemies, just heal lowest
	    }
	    return structure;
	    
	    // the below code was locking builders in the role forever and cheqing cpu on shard3. 
	    // they'd never repair the walls past max hits, so they'd keep decaying below
	    //if(creep.name==='L-bu-0')console.log(structure.hits,config.defenceIntel.rampHeight)

	    if(structure ){
	        
	        if(structure.structureType===STRUCTURE_RAMPART && structure.hits > config.defenceIntel.rampHeight)structure= false;
            else if(structure.structureType===STRUCTURE_WALL && structure.hits > config.defenceIntel.wallHeight)structure= false;
	        //else return structure;
	    }   
        if(!structure){
            for(let id of config.defenceIntel.priority_repair_targets){
                structure = gob(id);
                if(structure){
                    if(structure.structureType===STRUCTURE_RAMPART && structure.hits > config.defenceIntel.rampHeight)structure= false;
                    else if(structure.structureType===STRUCTURE_WALL && structure.hits > config.defenceIntel.wallHeight)structure= false;
                   // else return structure;
                   else break;
        
                }
            }
        }
	    
	    if(structure){
	        creep.memory.repair_id = structure.id;
	        return structure;
	    }
	    return false;
	  
	    
	}
};

module.exports = role;
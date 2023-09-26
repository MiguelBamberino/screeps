var role = {


    getParts: function(budget){
        return Creep.prototype.getDefaultParts(budget);
    },
    run: function(creep,config) {
        
        creep.checkAndUpdateState();
        let playerAttackers = Game.rooms[config.coreRoomName].getEnemyPlayerFighters(); 
        
        let cpuCreep = 'B-bu-3';

    
	    if(creep.isWorking()) {
	        
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
                if(structure && structure.hits < 10000  || playerAttackers.length>0){
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
                if(creep.pos.lookForStructure(STRUCTURE_ROAD)){
                    creep.moveToPos(site)
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
            let controller = Game.getObjectById(config.controller_id);
           
            return creep.actOrMoveTo("upgradeController",controller);
            //creep.say("I'm bored!");
            
	    }
	    
	    
	    else if(creep.isCollecting()){
	        //creep.memory.target_to_fix_id = false;

	        if(false && playerAttackers.length==0 && !creep.memory.reserve_id){
	           // if(creep.name==cpuCreep)logs.startCPUTracker(creep.name+':getDroppedEnergy');
                let drop = creep.getDroppedEnergy();
    
                if(drop){
                    let res =  creep.actOrMoveTo("pickup",drop);
                    creep.say(res)
                  //if(creep.name==cpuCreep)logs.stopCPUTracker(creep.name+':getDroppedEnergy',true);
                    return res;
                }
               // if(creep.name==cpuCreep)logs.stopCPUTracker(creep.name+':getDroppedEnergy',true);
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
	        return site;
	    }
        creep.memory.construction_site_id=false;
	    let obj = mb.getNearestConstruction(creep.pos, [config.coreRoomName]);
	    if(obj){
            creep.memory.construction_site_id=obj.id;
	        creep.memory.last_site_type = obj.structureType;
	        creep.memory.last_site_pos = {x:obj.pos.x,y:obj.pos.y};
	        return obj;
	    }
	    return false;
	},
	targetDefenceToRepair: function(creep,config, types){
	    let defenceStructure = Game.getObjectById(config.defenceIntel.weakest_structure.id);
	    if(defenceStructure )
	        return defenceStructure;
	    return false;
	    ///////////// OLD below ////////////////////////////////////////
	    
	    if(creep.memory.target_to_fix_id==='none' ){
	        // CPU saver. if wall height has been reached, then we'll find nothing to repair but keep spending 0.7cpu/tick
	        // to look for stuff. So lets only check back after some ticks when stuff decays
	       if(Game.time%100===0)creep.memory.target_to_fix_id= false; 
	       else return false;
	    }
	    
	    let target = Game.getObjectById(creep.memory.target_to_fix_id);
	    if(target && target.hits<target.hitsMax){
	        return target;
	    }
	    let rampart =  mb.getLowestHPStructure(creep.pos,[STRUCTURE_RAMPART],[config.coreRoomName],[
	        {attribute:'isNotMarkedForDismantle',operator:'fn',value:[]},
	        {attribute:'hits',operator:'<',value:[config.wallHeight]}
	        ]);
	        
	    if(rampart && rampart.hits < 20000){
	        creep.memory.target_to_fix_id = rampart.id;
	         return rampart;
	    }
	    
	    let wall =  mb.getLowestHPStructure(creep.pos,[STRUCTURE_WALL],[config.coreRoomName],[
	        {attribute:'isNotMarkedForDismantle',operator:'fn',value:[]},
	        {attribute:'hits',operator:'<',value:[config.wallHeight]}
	        ]);
	    
	    if(wall){
	        if( wall.hits < rampart.hits){
	            creep.memory.target_to_fix_id = wall.id;
	            return wall;
    	    }else{
    	        creep.memory.target_to_fix_id = rampart.id;
    	         return rampart;
    	    }
	    }
	        
        // cache that there is nothing at all to repair
        creep.memory.target_to_fix_id = 'none';
	    
	    return false;
	    
	}
};

module.exports = role;
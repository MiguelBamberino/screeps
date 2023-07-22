

var creepRoles ={
    worker:require('role.worker'),
   // prospector:require('role.prospector'),
    harvester:require('role.harvester'),
    builder:require('role.builder'),
    fixer:require('role.fixer'),
    tanker:require('role.tanker'),
    waller:require('role.waller'),
    
   // warrior:require('role.warrior'),
    claimer:require('role.claimer'),
    reserver:require('role.reserver'),
    upgrader:require('role.upgrader'),
    recycle:require('role.recycle'),
    };
var STATE_CHECK_CONSTRUCTIONS = 10;
var STATE_CHECK_STRUCTURES = 20;
var STATE_CHECK_MINES = 30;
var STATE_CHECK_CONTROLLERS = 40;
var role = {

    run: function(spawn) {
    
        if(mb.hasRoom(spawn.room.name)===false){
            logs.log(spawn.name,"Cannot run because room:"+spawn.room.name+" is not mapped")
            return
        }
 
        this.firstLoadChecks(spawn);

        // actions to run less often :
        if(spawn.memory.state ===STATE_CHECK_CONSTRUCTIONS){
          spawn.checkBuilderQuota();
        }
        
        if(spawn.memory.state ===STATE_CHECK_STRUCTURES){
            
            spawn.checkFixerQuota();
            
            spawn.checkWallerUpgraderQuota();
        }
        
       /* if(spawn.memory.state ===STATE_CHECK_MINES){
            spawn.traceMsg("Checking Mines");
            this.checkMines(spawn);
        }*/
        if(spawn.memory.state ===STATE_CHECK_CONTROLLERS){
            spawn.traceMsg("Checking Controllers");
             spawn.checkReserverQuota();
            spawn.memory.state=0;
        }
        spawn.memory.state++;
        
        this.checkMines(spawn);
        
        // actions to run every tick:
        this.manageTowers(spawn);
        
        logs.startCPUTracker(spawn.name.substring(0,1)+'-Creeps');
        this.runCreeps(spawn);
        logs.stopCPUTracker(spawn.name.substring(0,1)+'-Creeps');
         
        this.checkCreepSpawning(spawn);
        
        
	},
	firstLoadChecks:function(spawn){
	    if(typeof spawn.memory==='undefined' ){
            spawn.memory = {};
        }
        
        if(Object.keys(spawn.memory).length===0){
            spawn.memory.loaded = false;
        }

        if(spawn.memory.loaded===false){
            this.loadMemory(spawn);
        }
	},
	
	runCreeps: function(spawn){
	    for(var k in spawn.memory.workforce_quota){
            spawn.memory.workforce_quota[k].count = 0;
        }
  
        for(let name in Game.creeps){
            var creep = Game.creeps[name];
  
            
            if(!spawn.memory.workforce_quota[ creep.memory.role ])continue;
            if(creep.memory.spawn_name == spawn.name){
                
                spawn.memory.workforce_quota[ creep.memory.role ].count++;
                if(!creep.spawning){
                    logs.startCreepTracker(creep);
                    creepRoles[ creep.memory.role ].run(creep,spawn);
                    logs.stopCreepTracker(creep);
                    
                }
                if(creep.memory.role==='recycle' && spawn.pos.isNearTo(creep)){
                    spawn.recycleCreep(creep);
                    spawn.log("INFO","creep recycled:"+name);
                }
                    
            }
            
        }
	},
	
	checkCreepSpawning: function(spawn){
	    if(!spawn.spawning){
	        let priority = ['worker','harvester','tanker','reserver','fixer','waller','builder','upgrader','claimer'];
            for(var k of priority){
                let quota = spawn.memory.workforce_quota[k];
                if( quota.count <quota.required ){
                    
                   
                    let res = creepRoles[k].create(spawn);
                   // if(spawn.name=='Theta')clog(res,spawn.name+ " trying to spawn : "+k);
                    
                    // we must ensure we prioritise a worker, if there is none alive, even if its cheaper to spawn other creeps
                    if(k =='worker' && quota.count===0 && res !==OK)return;
                    // we must ensure we prioritise a harvesters after workers, if there is none alive, even if its cheaper to spawn other creeps
                    if(k =='harvester' && quota.count===0 && res !==OK)return;
                    

                   if(res ===-40){
                        console.log(spawn.name+" spawning Res : "+res+" for "+k);
                    }
                    if(res === OK){
                        return;// either busy or just started, else try another
                    }
                    
 
                }
            }
        }
	},
	// >> Load memory for a spawn with starting values
	loadMemory: function(spawn){
	    spawn.log("INFO","Loading memory for spawn: "+spawn.name);
	    spawn.memory.state = 0; // used to define what actions a spawn will take on a tick. Helps spread out CPU instensive actions
	    spawn.memory.loaded = true; // a toggle to know if we have called loadMemory
	    spawn.memory.claim_target={};
          spawn.memory.workforce_quota={
            worker:{count:0,required:0}, // refills spawn+ext, refills towers, then upgrades controller
            harvester:{count:0,required:0}, // sits on mine all life, filling and maintaining mine container
            builder:{count:0,required:0}, // spawned when con sites exist, then does the building
            fixer:{count:0,required:0}, // repairs structures, then upgrades controller
            tanker:{count:0,required:0}, // collects E from mines and puts in depot or refills spawns+ext 
            waller:{count:0,required:0}, // collects E then builds up walls
            upgrader:{count:0,required:0}, // ??
            claimer:{count:0,required:0}, // ??
            reserver:{count:0,required:0}, // will keep reserving adjacent support rooms for this spawn
            recycle:{count:0,required:0}, // a recyled creep will head home to spawn to die and returns its E
        };
        
        spawn.memory.mines={}; // store all mine info, for all mines this spawn manages, even in outer rooms
        spawn.memory.room_names={}; // the rooms that this spawn manages, auto populated once 1 structure exists in a room
        spawn.addRoom(spawn.room.name);
	},

	// >>
	checkMines: function(spawn){
	   
        let totalE = 0;
        let totalRemoteE = 0;
        let totalLocalE = 0;
        let harvestersNeeded = 0;
        
        // Get sources using the getSources function
        let sources = mb.getSources({ roomNames: spawn.roomNames() });
    
        for (let source of sources) {
            let container = source.getContainer();
            if (container) {
                let droppedResource = container.pos.lookForResource(RESOURCE_ENERGY);
                let droppedE = droppedResource ? droppedResource.amount : 0;
                let containerEnergy = container.storedAmount(RESOURCE_ENERGY);
                totalE = totalE + containerEnergy + droppedE;
    
                if (spawn.room.name != container.room.name) {
                    totalRemoteE += containerEnergy + droppedE;
                }
            }
            // A mine is considered online if it has a container
            harvestersNeeded++;
        }
        
        let harvester = spawn.memory.workforce_quota.harvester;
        if (harvester.required !== harvestersNeeded) {
            spawn.log("QUOTAS", spawn.name + " changing harvester quota to " + harvestersNeeded + ". From " + harvester.required);
            harvester.required = harvestersNeeded;
        }
    
        spawn.memory.totalContainerE = totalE;
        spawn.memory.totalRemoteE = totalRemoteE;
        totalLocalE = totalE - totalRemoteE;
        let workersWanted = 1;
        let worker = spawn.memory.workforce_quota.worker;
        if (totalLocalE > 5000) {
            workersWanted = 3;
        } else if (totalLocalE > 4000) {
            workersWanted = 2;
        } else if (totalLocalE > 0) {
            workersWanted = 1;
        } 
        if (worker.required !== workersWanted) {
            spawn.log("QUOTAS", spawn.name + " changing Worker quota to " + workersWanted + ". From " + worker.required);
            worker.required = workersWanted;
        }
        
        // if we have somewhere for the E to go and energy building up in remote containers, lets spawn some tankers to collect it
        if(spawn.room.controller.getContainer()){
            let tanker = spawn.memory.workforce_quota.tanker;
            let tankersWanted = 0;
          
            // we only want tankers if we are collecting from remote rooms

            if(totalRemoteE > 12000){
                tankersWanted = 6;
                
            }else if(totalRemoteE > 10000){
                tankersWanted = 5;
                
            }else if(totalRemoteE > 8000){
                tankersWanted = 4;
                
            }else if(totalRemoteE > 6000){
                tankersWanted = 3;
                
            }else if(totalRemoteE > 4000){
                tankersWanted = 2;
                
            }else if(totalRemoteE > 2000){
                tankersWanted = 1;
                
            }
            
            
            if( tanker.required !== tankersWanted){
                spawn.log("QUOTAS",spawn.name+" changing tanker quota to "+tankersWanted+". From "+tanker.required);
                tanker.required = tankersWanted;
            }
                
        }
	},
	manageTowers: function(spawn){
	   /* 
	    if(!spawn.memory.hostile__ids){
	        spawn.memory.hostile__ids={};
	    }
	    
	    for(let id in spawn.memory.hostile_ids){
	        let target = Game.getObjectById(id);
	        if(target){
	            break;
	        }else{
	            delete spawn.memory.hostile_ids[id];
	            spawn.log("ATTACK","Hostile no longer a threat:"+id);
	        }
	    }*/
	    
	    if( spawn.name==='Beta' || spawn.name==='Epsilon'|| spawn.name==='Zeta'|| spawn.name==='Eta'|| spawn.name==='Theta'){
	        
	        
	        let ramps = mb.getStructures({types:[STRUCTURE_RAMPART],roomNames:spawn.roomNames()} );
	        
	        
	        var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);
    	    
    	    for(var tower of mb.getStructures({types:[STRUCTURE_TOWER],roomNames:spawn.roomNames()} ) ){
    	        
    	        
    	        for(let ramp of ramps){
    	            if(ramp.hits < 1000){
    	                tower.repair(ramp);
    	            }
    	        }
    	        
    	        
    	        for(var ref in hostiles){
    	            let range = tower.pos.getRangeTo(hostiles[ref]);
    	            
    	            if(range<100){
    	                spawn.log("ATTACK"," Shooting Hostile at: "+hostiles[ref].pos+". Range:"+range+". Pew pew!" );
    	                let res = tower.attack(hostiles[ref]);
    	                break;
    	            }else{
    	                spawn.traceMsg("HOSTILE: Spotted Hostile at: "+hostiles[ref].pos+". Range:"+range+". Waiting untill in 20" );
    	            }
    	        }
    
                // we are going to reserve 600 energy for enemies
               /* if(tower.energy >= 600){
                    let target = mb.getNearestRepairTarget(tower.pos, spawn.roomNames());
                    if(target && target.hits<100000){
                        tower.repair(target);
                    }
                   
        	    }*/
    	    }
	    }

	    
	},


};

module.exports = role;
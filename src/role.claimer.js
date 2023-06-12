var STATE_APPROACHING="STATE_APPROACHING";
var STATE_CLAIMING="STATE_CLAIMING";
var STATE_BUILDING="STATE_BUILDING";
var STATE_COLLECTING="STATE_COLLECTING";
var STATE_UPGRADING="STATE_UPGRADING";

    // Game.creeps['garry'].memory.targetRoomSpot = {x:18,y:17,room:"sim"}
var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
       
        if(spawn.memory.claim_target.claimed){
          
            return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; //650  
        }else{
            
            return [WORK,WORK,CLAIM,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; //1150
        }
        
    },
    getMemory:function(spawn){
        return {role: "claimer",state:STATE_APPROACHING,targetRoomSpot:{x:28,y:14,room:'E2S37'} };
    },
    /** @param {Creep} creep **/
    run: function(creep,spawn) {
        if(creep.memory.targetRoomSpot){
            
            let roomPos = new RoomPosition(creep.memory.targetRoomSpot.x,creep.memory.targetRoomSpot.y,creep.memory.targetRoomSpot.room);
            
            if(creep.memory.state === STATE_APPROACHING &&
            creep.room.name == roomPos.roomName && creep.pos.x == roomPos.x&& creep.pos.y == roomPos.y){
                    creep.memory.state = STATE_CLAIMING;
                    this.checkForSpawnSite(creep,spawn);
            }
            
            if(creep.memory.state === STATE_COLLECTING && creep.store.getFreeCapacity(RESOURCE_ENERGY)===0){
                creep.memory.state =STATE_BUILDING;
            }
            if( (creep.memory.state === STATE_BUILDING || creep.memory.state ===STATE_UPGRADING)
            && creep.store.getUsedCapacity(RESOURCE_ENERGY)===0){
                creep.memory.state = STATE_COLLECTING;
            }
                
            if(creep.memory.state === STATE_APPROACHING){
                creep.say("ahoy!");
                creep.moveToPos(roomPos);
            }
            
    	    else if(creep.memory.state === STATE_CLAIMING) {
    	        
    	        
                this.checkForSpawnSite(creep,spawn);
    	        
    	        creep.say("so close!");
    	        creep.actOrMoveTo("claimController",creep.room.controller);
                
            } 
            
            else if(creep.memory.state === STATE_COLLECTING){
                var sources = creep.room.find(FIND_SOURCES);
                creep.actOrMoveTo("harvest",sources[0]);

            }  
            
            else if(creep.memory.state === STATE_BUILDING){
                var site = Game.getObjectById(creep.memory.spawn_site_id);
                if(site){
                    creep.actOrMoveTo("build",site);
    
                }else{
                    spawn.log("INFO","Spawn built! Room claimed! Stepping down workforce");
                    spawn.memory.workforce_quota.claimer.required = 0;
                    creep.memory.state = STATE_UPGRADING;
                }
                
            }else if(creep.memory.state ===STATE_UPGRADING){
                creep.actOrMoveTo("upgradeController",creep.room.controller);
            }    
                
                
        }else{
            creep.say("Me Claimer");
            creep.say("No target");
        }
        

	},
    checkForSpawnSite: function(creep,spawn){
        var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        for(let s in sites){
            if(sites[s].structureType==='spawn'){
                spawn.log("INFO", "Spawn site found. Lets ge building");
                creep.memory.spawn_site_id = sites[s].id;
                spawn.memory.claim_target.claimed = true;
                spawn.memory.workforce_quota.claimer.required = 2;
                creep.memory.state = STATE_COLLECTING;
                creep.say("building!");
                return sites[s];
            }
        }
        return false;
    }

	
};

module.exports = role;
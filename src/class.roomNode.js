
var creepRoles ={
    worker:require('role.worker'),
    harvester:require('role.harvester'),
    builder:require('role.builder'),
    fixer:require('role.fixer'),
    tanker:require('role.tanker'),
    filler:require('role.filler'),
    //claimer:require('role.claimer'),
    reserver:require('role.reserver'),
    upgrader:require('role.upgrader'),
    recycle:require('role.recycle'),
    };
    
class RoomNode{
    
    constructor(name,coreRoomName,spawnFacing=TOP,extraFastFillSpots=[]){
        if(!mb.hasRoom(coreRoomName))mb.scanRoom(coreRoomName)
        this.name = name;
        this.spawnFacing = spawnFacing;
        this.coreRoomName = coreRoomName;
        this.inRecoveryMode=false;
        this.wallHeight = 300000;
        this.extraFastFillSpots = extraFastFillSpots;
        //this.remoteRoomNames = remoteRoomNames;
        
        this.readInStore();

        
    }
    readInStore(){
        if(!Memory['roomNodes']){
            Memory['roomNodes']={};
        }
        if( !Memory['roomNodes'][this.name] ){
            Memory['roomNodes'][this.name]=this.setupStore();
        }
        for(let key in Memory['roomNodes'][this.name]){
            this[key] =  Memory['roomNodes'][this.name][key];
        }
    }
    
    setupStore(){
        let store = {};
        mb.scanRoom(this.coreRoomName);
        let objs = mb.getStructures({roomNames:[this.coreRoomName],types:[STRUCTURE_CONTROLLER]});
        if(objs.length>0){
            store.controller_id = objs[0].id;
        }else{
            clog("Room-node has no controller",this.name);
        }
        store.creepNames = [];
        
        store.workforce_quota={
            worker:{count:0,required:0},
            harvester:{count:0,required:0},
            tanker:{count:0,required:0},
            builder:{count:0,required:0},
            fixer:{count:0,required:0},
            upgrader:{count:0,required:0}
        };
        return store; 
    }
    saveStore(){
        let newStore={};
        for(let attrName of ['controller_id','creepNames','workforce_quota']){
            newStore[attrName] = this[attrName];
        }
        Memory['roomNodes'][this.name] = newStore;
    }
    runTick(){
        
        if(!this.safeToRun())return false;
        
        this.decideWorkforceQuotas();
        
        this.runCreeps();
        
        this.checkAndSpawnWorkforce();
        
        this.runLinkSend();
        
        this.runTowers();
        
        this.saveStore();
    }
    safeToRun(){
        if(!this.controller_id)return false;
        if(!this.controller().getStandingSpot()){clog("no controller standing spot",this.name);return false}
        if(!Game.spawns[this.name])return false;
        
        return true;
    }
    runTowers(){
       // return
        let towers = mb.getStructures({types:[STRUCTURE_TOWER],roomNames:[this.coreRoomName]} );
        if(towers.length==0)return;
        
        // safety repair, in case some event kills normal repair creeps and room is collapsing
    	let decay_structs = mb.getStructures({types:[STRUCTURE_RAMPART,STRUCTURE_CONTAINER],roomNames:[this.coreRoomName]} );
        
        var hostiles = Game.rooms[this.coreRoomName].find(FIND_HOSTILE_CREEPS);
        
    	let target = false;
        for(var ref in hostiles){
            let range = towers[0].pos.getRangeTo(hostiles[ref]);
            
            // shoot the pesky scouts and drain
            if(hostiles[ref].body.length===1){
                 target= hostiles[ref];break;
            }
            // shoot NPCs at max range
            if(hostiles[ref].owner.username==='Invader'){
               target= hostiles[ref];break;
            }
            if(range<=15 ){
                
               if(hostiles[ref].hits < hostiles[ref].hitsMax){
                   target= hostiles[ref];break;// prioritise something we are already shooting
               }  
               if(hostiles[ref].partCount(HEAL)>0){
                   target= hostiles[ref];break;// break because we want to prioritise healers
               } 
               if(hostiles[ref].partCount(ATTACK)>0 || hostiles[ref].partCount(RANGED_ATTACK)>0 ){
                    target= hostiles[ref];
               } 
            } 
        }
	    let healTarget = false;
	    for(const cname of this.creepNames){
            let creep = Game.creeps[cname];
            
            if(creep.hits < creep.hitsMax){
                healTarget = creep;
            }
        }
	    for(var tower of  towers){
	        
	        
	        for(let obj of decay_structs){
	            if(obj.hits < 5000){
	                tower.repair(obj);
	            }
	        }

	        if(target){
	            clog("ATTACK"," Shooting Hostile "+target.name+ "at: "+target.pos+". . Pew pew!" );
	            let res = tower.attack(target);
	            if(res ===OK && target.body.length==1){
	                return;// dont waste 1+ towers on a scout
	            }
	        }else if(healTarget){
	            tower.heal(healTarget);
            
	        }

	    }
    }
    runCreeps(){
        if(this.controller().level>1){
            this.runFiller(this.name,this.name.charAt(0)+ 'FF0');
            this.runFiller(this.name,this.name.charAt(0)+'FF1');
            let i=2;
            for(let pos of this.extraFastFillSpots){
                this.runFiller(this.name,this.name.charAt(0)+'FF'+i,pos);
                i++;
            }
        }
        
        
        for(let roleName in this.workforce_quota){
            this.workforce_quota[roleName].count = 0;
        }
        
        let stillAlive = [];
        for(const cname of this.creepNames){
            let creep = Game.creeps[cname];
            
            if(!creep){
                delete Memory.creeps[cname]; 
                //delete this.creepNames.splice(key,1);
                clog(cname,"Creep went missing/died."); 
                continue;
            }
                
            if(!creepRoles[ creep.getRole() ]){
                clog(creep.getRole(),"No role code for "+creep.name); continue;
            }
            
            stillAlive.push(cname)
            
            if(this.workforce_quota[creep.getRole()])this.workforce_quota[creep.getRole()].count++;
            
            if(!creep.spawning){    
             
                creepRoles[ creep.getRole() ].run(creep,this.getConfig());
            }
                    
        }
        this.creepNames = stillAlive;
    }
    runFiller(spawnName,creepName,moveToSpot=false){
        
        
               
        if(!Game.creeps[creepName]){
            let bodyPlan = creepRoles['filler'].getParts(0,this.getConfig());
            let dirs = (moveToSpot)?this.getMainSpawnSpots():this.getMainSpawnFillerSpots();
            if(moveToSpot){
                bodyPlan.push(MOVE);
            }
            Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,dirs);
        }
        
        if(Game.creeps[creepName] && !Game.creeps[creepName].spawning){
            let creep = Game.creeps[creepName];
            
            if(moveToSpot && !creep.pos.isEqualTo(moveToSpot)){
                   creep.moveTo(moveToSpot);
            }else{
                 return creepRoles['filler'].run(creep,this.getConfig());
            }
        }
    }
    
    runLinkSend() {
        const linksReadyToSend = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [this.coreRoomName],
            filters: [
                {
                    attribute: 'readyToSend',
                    value: [],
                    operator: 'fn'
                }
            ]
        });
    
        for (const link of linksReadyToSend) {
            const recipient = link.getFirstReadyRecipient();
            if (recipient) {
                link.transferEnergy(recipient);
                break;
            }
        }
    }
    
    getMainSpawnSpots(){
        
        if(this.spawnFacing===TOP){
            return [TOP_LEFT,TOP,BOTTOM_LEFT];
        }
        if(this.spawnFacing===LEFT){
            return [TOP_LEFT,LEFT,BOTTOM_LEFT];
        }
        if(this.spawnFacing===RIGHT){
            return [TOP_RIGHT,RIGHT,BOTTOM_RIGHT];
        }
        if(this.spawnFacing===BOTTOM){
            return [BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
        }
    }
    getMainSpawnFillerSpots(){
        let dirs =[];
        if(this.spawnFacing===TOP){
            dirs = [BOTTOM_LEFT,BOTTOM_RIGHT];
        }
        if(this.spawnFacing===LEFT){
            dirs = [TOP_RIGHT,BOTTOM_RIGHT];
        }
        if(this.spawnFacing===RIGHT){
            dirs = [TOP_LEFT,BOTTOM_LEFT];
        }
        if(this.spawnFacing===BOTTOM){
            dirs = [TOP_LEFT,TOP_RIGHT];
        }
        //if(this.controller().level===2)return [dirs[0]]
        
        return dirs;
    }
    
    getConfig(){
        
        return {
                    controller_id: this.controller_id,
                    coreRoomName:this.coreRoomName,
                    remoteRoomNames:this.remoteRoomNames,
                    allRoomNames:this.allRoomNames(),
                    inRecoveryMode:this.inRecoveryMode,
                    wallHeight:this.wallHeight
                    
                };
    }
    checkAndSpawnWorkforce(){

        let budget = this.getSpawnBudget();
        if(this.workforce_quota.harvester.count===0 || this.workforce_quota.tanker.count===0){
            this.inRecoveryMode=true;
        }else{
            this.inRecoveryMode=false;
        }
        
        
        for(let roleName in this.workforce_quota){
            let role = this.workforce_quota[roleName];
            if(role.count < role.required){
               // clog("need "+roleName+ " count: "+role.count+" / "+role.required)
                let bodyPlan = creepRoles[ roleName ].getParts(budget,this.getConfig());
                let cname = Game.spawns[this.name].createCreep(bodyPlan,{role:roleName},false,this.getMainSpawnSpots());
                //clog(cname,this.name+" spawn:")
                if(typeof cname ==='string'){
                    this.creepNames.push(cname);
                    return;
                }
            }
        }
        
    }

    decideWorkforceQuotas(){
        
        let sources = mb.getSources({ roomNames: [this.coreRoomName]}); 
        this.workforce_quota.harvester.required = sources.length;
        
        if(this.controller().level===1){
            this.workforce_quota.worker.required = 4;
        }else{
            
            let exts = mb.getStructures({ roomNames:[this.coreRoomName], types:[STRUCTURE_EXTENSION] });
            
            let onlineCount=0;
            let totalEnergyAtSources=0;
            for(let source of sources){
                if(source.haveContainer())onlineCount++;
                totalEnergyAtSources+= source.energyAwaitingCollection();
            }
            if( onlineCount > 1){
                this.workforce_quota.worker.required = 4;
                
            }
            

            if(exts.length >=5  && this.controller().haveContainer() ){
                this.workforce_quota.worker.required = 1;
                this.workforce_quota.builder.required = 1;
                
                if(totalEnergyAtSources > 0){
                    this.workforce_quota.tanker.required = 1;
                }
                if(totalEnergyAtSources > 2000){
                    this.workforce_quota.tanker.required = 2;
                }
                if(totalEnergyAtSources > 4000){
                    this.workforce_quota.tanker.required = 3;
                }
                let readyToSpend = this.controller().getContainer().storedAmount();
               
                if(readyToSpend==2000){
                    this.workforce_quota.upgrader.required = 5;
                }else if(readyToSpend>=1800){
                    this.workforce_quota.upgrader.required = 4;
                }else if(readyToSpend>1500){
                    this.workforce_quota.upgrader.required = 3;
                }else if(readyToSpend>800){
                    this.workforce_quota.upgrader.required = 2;
                }else{
                    this.workforce_quota.upgrader.required = 1;
                }
                
            }else{
                this.workforce_quota.upgrader.required = 1;
            }
            
            
            let hostiles = Game.rooms[this.coreRoomName].find(FIND_HOSTILE_CREEPS)
            if(hostiles.length>0){
                this.workforce_quota.upgrader.required = 0;
            }
            
        }
        
    }
    allRoomNames(){
        return [this.coreRoomName];
    }
    getSpawnBudget(){
        let capacity = 0;
        let stored = 0;
        let objs = mb.getStructures({ roomNames:[this.coreRoomName], types:[STRUCTURE_EXTENSION,STRUCTURE_SPAWN] });
        for(let obj of objs){
            capacity+= obj.store.getCapacity(RESOURCE_ENERGY);
            stored+= obj.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        return (this.workforce_quota.harvester.count===0 || this.workforce_quota.tanker.count===0)?stored: capacity;
    }
    getAvailableMine(online = false) {

        let filters = [
            {
                operator: "fn",
                attribute: "haveNoCreep",
                value: []
            }
        ];
    
        if (online) {
            filters.push({
                operator: "fn",
                attribute: "haveContainer",
                value: []
            });
        }
    
        let sources = mb.getSources({
            roomNames: [this.coreRoomName],
            filters: filters
        });
        if(sources.length>0){
            return sources[0];
        }

        return false;
    }
    controller(){
        return Game.getObjectById(this.controller_id);
    }
    
    // decide workforce qty & body size
    // spawn
    // run towers
    // run walls ?
}
module.exports = RoomNode;
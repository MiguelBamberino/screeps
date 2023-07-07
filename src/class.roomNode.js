
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
    /**
     * name >> name of the town and what will be used for spawn names 
     * coreRoomName >> the central room name, with spawns
     * options:{
            spawnFacing:TOP         >> which way the main spawn should spawn its creeps
            retreatSpot:undefined   >> where creeps should flee if attack & where idle creeps park
            extraFastFillSpots:[]   >> any extra positions to send fast filler creeps
            logger:undefined        >> an object that allows this object to report messages to a log
            funnelRoomName:false    >> if set, then haulers will funnel energy to this room
            upgradeRate:RATE_SLOW   >> if set RATE_FAST, then the room will pipe as much energy as possible into the controller. RATE_OFF to stop upgrading
            buildFast:false         >> if set, then the room will pipe as much energy as possible into building
            remoteRoomNames:[]      >> string list of roomNames we are remote mining
     * }
     **/
    constructor(name,coreRoomName, options={}){

        if(!mb.hasRoom(coreRoomName))mb.scanRoom(coreRoomName);
        
        this.name = name;
        this.coreRoomName = coreRoomName;
        
        let controller = mb.getControllerForRoom(this.coreRoomName);
        if(controller){
            this.controller_id = controller.id;
        }
        this.totalEnergyAtSources=0;
        
        // options
        this.spawnFacing = options.spawnFacing===undefined?TOP:options.spawnFacing;
        this.wallHeight = options.wallHeight===undefined?1000000:options.wallHeight;;
        this.extraFastFillSpots = options.extraFastFillSpots===undefined?[]:options.extraFastFillSpots;
        this.logger = options.logger;
        this.retreatSpot = options.retreatSpot;
        this.upgradeRate = options.upgradeRate===undefined?RATE_SLOW:options.upgradeRate;
        this.buildFast = options.buildFast===undefined?false:options.buildFast;
        this.remoteRoomNames = options.remoteRoomNames===undefined?[]:options.remoteRoomNames;
        this.funnelRoomName = options.funnelRoomName===undefined?false:options.funnelRoomName;
        
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
        for(let attrName of ['creepNames','workforce_quota']){
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
        
        if(!this.controller_id){clog("Room-node has no controller",this.name);return false;}
        
        let controller = this.controller();
        if(!controller.haveContainer()){
            clog('Searching for container...',this.coreRoomName); 
            let containers = mb.getStructures({roomNames:[this.coreRoomName],types:[STRUCTURE_CONTAINER]})
            for(let container of containers){
                if(controller.pos.getRangeTo(container)<5){
                    controller.setContainer(container);
                    controller.setStandingSpot(container.pos);
                    container.setAsUpgraderStore();
                    clog("controller container found and set up",this.coreRoomName);
                    break;
                }
            }
            
        }
        
        
        
        if(!this.controller().getStandingSpot()){clog("no controller standing spot",this.name);return false}
        if(!Game.spawns[this.name]){clog("Room-node has no spawn",this.name);return false;}
        
        return true;
    }
    runTowers(){
     //   return
        let towers = mb.getStructures({types:[STRUCTURE_TOWER],roomNames:[this.coreRoomName]} );
        
        
        // safety repair, in case some event kills normal repair creeps and room is collapsing
    	//let decay_structs = mb.getStructures({types:[STRUCTURE_RAMPART,STRUCTURE_CONTAINER],roomNames:[this.coreRoomName]} );
    	// ramparts & walls < 50k
    	// roads < 1k
    	// container < 1k
    	let decay_structs = mb.getStructures({roomNames:[this.coreRoomName], types:[STRUCTURE_RAMPART,STRUCTURE_CONTAINER,STRUCTURE_WALL,STRUCTURE_ROAD],filters:[{attribute:'hits',operator:'<',value:[2000]}]});
        
        var hostiles = Game.rooms[this.coreRoomName].getHostiles();
        
        let fighters = hostiles.filter(function(hostile){return (hostile.partCount(ATTACK)>0||hostile.partCount(RANGED_ATTACK)>0||hostile.partCount(HEAL)>0) });

        if(towers.length<2 && fighters.length>=3){
            this.controller().activateSafeMode();
        }
        
        if(towers.length==0)return;
        
    	let target = false;
        for(var ref in hostiles){
            let range = towers[0].pos.getRangeTo(hostiles[ref]);
            
            if(hostiles[ref].owner.username==='GT500'){
                 continue;
            }
            
            // shoot the pesky scouts and drain
            if(hostiles[ref].body.length===1){
                 target= hostiles[ref];break;
            }
            // shoot small NPCs at max range
            if(hostiles.length<3 && hostiles[ref].owner.username==='Invader'){
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
        
        
       this.runAllFillers();
        
        
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
    inRecoveryMode(){
        if(Game.time%10==0)this._recoverMode=undefined;
        if(this._recoverMode!==undefined){
            return this._recoverMode;
        }
        let srcs = mb.getSources({roomNames:[this.coreRoomName]})
        if(!this.fillerReady() || this.workforce_quota.harvester.count<srcs.length || this.workforce_quota.tanker.count===0){
            this._recoverMode=true;
        }else{
            this._recoverMode=false;
        }
        return this._recoverMode;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Filler Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fillerReady(){
        
        if(Game.time%10==0)this.fillerRdy=undefined;
        
        if(this.fillerRdy!==undefined){
            return this.fillerRdy;
            
        }

        let structures = mb.getStructures({roomNames:[this.coreRoomName],types:[STRUCTURE_CONTAINER]});    
        let exts = mb.getStructures({ roomNames:[this.coreRoomName], types:[STRUCTURE_EXTENSION] });
        this.fillerRdy=false;
        for(let container of structures){
            if(Game.spawns[this.name].pos.getRangeTo(container)<3 && exts.length>=5 ){
                this.fillerRdy=true;break;
            }
        }
        return this.fillerRdy;
    }
    runAllFillers(){
        
         if(this.fillerReady()){
            this.runFiller(this.name,this.name.charAt(0)+ 'FF0');
            this.runFiller(this.name,this.name.charAt(0)+'FF1');
           let i=2;
            if(this.name == 'Gamma' &&Game.spawns['Gamma-2']){
                
                this.runFiller('Gamma-2','GFF2');
                this.runFiller('Gamma-2','GFF3');
                i+=2;
            }
            if(this.name == 'Alpha' && Game.spawns['Alpha-3']){
                
                this.runFiller('Alpha-3','AFF2');
                this.runFiller('Alpha-3','AFF3');
                i+=2;
            }
            
             
            for(let pos of this.extraFastFillSpots){
                this.runFiller(this.name,this.name.charAt(0)+'FF'+i,pos);
                i++;
            }
        }
    }
    runFiller(spawnName,creepName,moveToSpot=false){
        
        // erghh...screwed me over too many times. Will do long term fix one day. Stop the tempCode creeps from spawning into a fast filler spot. 
        // nob heads!
        Game.spawns[spawnName].forceDirectionHack = this.getMainSpawnSpots();
        if(spawnName=='Gamma-2')Game.spawns['Gamma-2'].forceDirectionHack = [TOP_RIGHT,RIGHT,BOTTOM_RIGHT];
        if(spawnName=='Alpha-3')Game.spawns['Alpha-3'].forceDirectionHack = [TOP_LEFT,LEFT,BOTTOM_LEFT];
               
        if(!Game.creeps[creepName]){
            let bodyPlan = creepRoles['filler'].getParts(0,this.getConfig());
            let dirs = (moveToSpot)?this.getMainSpawnSpots():this.getMainSpawnFillerSpots();
            if(moveToSpot){
                bodyPlan.push(MOVE);
            }
            
            
            if(spawnName=='Gamma-2')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_LEFT,BOTTOM_LEFT]);
            else if(spawnName=='Alpha-3')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_RIGHT,BOTTOM_RIGHT]);
            else 
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
        return dirs;
    }

    getConfig(){
        
        return {
                    controller_id: this.controller_id,
                    coreRoomName:this.coreRoomName,
                    remoteRoomNames:this.remoteRoomNames,
                    allRoomNames:this.allRoomNames(),
                    inRecoveryMode:this.inRecoveryMode(),
                    wallHeight:this.wallHeight,
                    retreatSpot:this.retreatSpot,
                    funnelRoomName:this.funnelRoomName,
                    upgradeRate:this.upgradeRate
                    
                };
    }
    checkAndSpawnWorkforce(){

        let budget = this.getSpawnBudget();
        let config = this.getConfig();
       
        for(let roleName in this.workforce_quota){
            let role = this.workforce_quota[roleName];
            if(role.count < role.required){
               // clog("need "+roleName+ " count: "+role.count+" / "+role.required)
                let bodyPlan = creepRoles[ roleName ].getParts(budget,config);
                let cname = Game.spawns[this.name].createCreep(bodyPlan,{role:roleName},false,this.getMainSpawnSpots());
          
          
                if(Game.spawns[this.name+'-2'] && cname===ERR_BUSY){
                    let dirs = [];
                    if(this.name=='Alpha' || this.name=='Gamma'){
                        dirs=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT];
                    }
                    if(this.name=='Zeta' || this.name=='Beta'){
                        dirs=[BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
                    }
                    if(this.name=='Epsilon'){
                        dirs=[TOP_LEFT,TOP,TOP_RIGHT];
                    }
                    cname = Game.spawns[this.name+'-2'].createCreep(bodyPlan,{role:roleName},false,dirs);
              
                }
                if(Game.spawns[this.name+'-3'] && cname===ERR_BUSY){
                    let dirs = [];
                    if(this.name=='Alpha'){
                        dirs=[TOP_LEFT,LEFT,BOTTOM_LEFT];
                    }
                    
                    cname = Game.spawns[this.name+'-3'].createCreep(bodyPlan,{role:roleName},false,dirs);
              
                }
               
               
                if(typeof cname ==='string'){
                    this.creepNames.push(cname);
                    return;
                }
            }
        }
        
    }

    decideWorkforceQuotas(){
        
        let controller = this.controller();
        
        let sources = mb.getSources({ roomNames: this.allRoomNames()}); 
        let onlineCount=0;
        this.totalEnergyAtSources=0;
        let coreRoomSourcesCount = 0;
        
        for(let source of sources){
            
            if(source.haveContainer())onlineCount++;
            if(source.pos.roomName==this.coreRoomName)coreRoomSourcesCount++;
            
            this.totalEnergyAtSources+= source.energyAwaitingCollection();
        }
        this.workforce_quota.harvester.required = coreRoomSourcesCount;
        
        if(controller.level===1){
            this.workforce_quota.worker.required = 4;
        }else{
            
            if( onlineCount > 1){
                this.workforce_quota.worker.required = 4;
                
            }
           
            
            let storage = this.storage();
            // if we have too much energy stored, then try to burn some of it off
            if(this.upgradeRate!=RATE_OFF && !this.funnelRoomName && storage && !storage.haveSpaceFor(50000)){
                this.upgradeRate=RATE_FAST;
            }
            
            // base level upgraders before any boosting
            this.workforce_quota.upgrader.required = (this.upgradeRate===RATE_OFF)?0:1;


            if(this.fillerReady()  && controller.haveContainer()){
                this.workforce_quota.worker.required = 1;
                this.workforce_quota.builder.required = (this.buildFast &&  !this.inRecoveryMode())?4:1;
                
                if(this.totalEnergyAtSources > 0){
                    this.workforce_quota.tanker.required = 1;
                }
                if(this.totalEnergyAtSources > 2000){
                    this.workforce_quota.tanker.required = 2;
                }
                if(this.totalEnergyAtSources > 4000){
                    this.workforce_quota.tanker.required = 3;
                }
                if(this.totalEnergyAtSources > 6000){
                    this.workforce_quota.tanker.required = 4;
                }
                if(this.totalEnergyAtSources > 8000){
                    this.workforce_quota.tanker.required = 5;
                }
                if(this.totalEnergyAtSources > 10000){
                    this.workforce_quota.tanker.required = 6;
                }
                if(this.totalEnergyAtSources > 14000){
                    this.workforce_quota.tanker.required = 7;
                }
                if(this.totalEnergyAtSources > 18000){
                    this.workforce_quota.tanker.required = 8;
                }
                
                if(Game.cpu.bucket>5000 ){
                    if(this.totalEnergyAtSources > 22000){
                        this.workforce_quota.tanker.required = 9;
                    }
                    if(this.totalEnergyAtSources > 25000){
                        this.workforce_quota.tanker.required = 10;
                    }
                 }
                let readyToSpend = controller.getContainer().storedAmount();
               
               if(this.upgradeRate===RATE_FAST){
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
               }
               
               if(Game.cpu.bucket<5000 ){
                   this.workforce_quota.upgrader.required = 1;
                   this.workforce_quota.builder.required = 1;
               }
               
            }
            
            
            let hostiles = Game.rooms[this.coreRoomName].find(FIND_HOSTILE_CREEPS)
            if(hostiles.length>0 || this.inRecoveryMode()){
                this.workforce_quota.upgrader.required = 0;
            }
            
        }
        
    }
    
    allRoomNames(){
 
        let activeRemotes  = [];
        for(let roomName of this.remoteRoomNames){
            if(Memory.invaderSeen[roomName]< Game.time || Memory.invaderSeen[roomName]==undefined){
                activeRemotes.push(roomName)
            }
        }
        return [this.coreRoomName,...activeRemotes];
    }
    getSpawnBudget(){
        let capacity = 0;
        let stored = 0;
        let objs = mb.getStructures({ roomNames:[this.coreRoomName], types:[STRUCTURE_EXTENSION,STRUCTURE_SPAWN] });
        for(let obj of objs){
            capacity+= obj.store.getCapacity(RESOURCE_ENERGY);
            stored+= obj.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        return (this.inRecoveryMode())?stored: capacity;
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
    storage(){
        return mb.getStorageForRoom(this.coreRoomName);
    }
    controller(){
        return Game.getObjectById(this.controller_id);
    }

}
module.exports = RoomNode;
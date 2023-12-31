const ExtractorComplex = require('./class.complex.extractor');

var creepRoles ={
    worker:require('./role.worker'),
    rkeeper:require('./role.rkeeper'),
    harvester:require('./role.harvester'),
    builder:require('./role.builder'),
    fixer:require('./role.fixer'),
    tanker:require('./role.tanker'),
    filler:require('./role.filler'),
    //claimer:require('role.claimer'),
    reserver:require('./role.reserver'),
    upgrader:require('./role.upgrader'),
    recycle:require('./role.recycle'),
    };
    
class RoomNode{
    /**
     * name >> name of the town and what will be used for spawn names 
     * coreRoomName >> the central room name, with spawns
     * options:{
            spawnFacing:TOP         >> which way the main spawn should spawn its creeps
            extraFastFillSpots:[]   >> any extra positions to sfend fast filler creeps
            logger:undefined        >> an object that allows this object to report messages to a log
            retreatSpot:undefined   >> where creeps should flee if attack & where idle creeps park
            upgradeRate:RATE_SLOW   >> if set RATE_FAST, then the room will pipe as much energy as possible into the controller. RATE_OFF to stop upgrading
            buildFast:false         >> if set, then the room will pipe as much energy as possible into building           
            remoteRoomNames:[]      >> string list of roomNames we are remote mining
            funnelRoomName:false    >> if set, then haulers will funnel energy to this room
            terminalEnergyCap:15000 >> The amount to be kept in reserve in the terminal
            towersBuildWalls:false  >> If true, then the towers will build up the walls in peace time
            wallHeight:25000000     >> How hight the walls should be
            armNuke:false           >> Whether this rooms Nuke should be kept armed
            labComplex:undefined    >> if set, then it will be used to run reactions
            makeResource:undefined  >> if set, then this resource will be made in the labComplex
            exports:[]              >> a list of export instructions. Each instruction looks like:  {resource_type:RESOURCE_GHODIUM,exportOver:0,batchSize:50000},
            imports:[]              >> a list of imports instructions. Each instruction looks like:  {resource_type:RESOURCE_ENERGY,storageCap:100000},
            
     * }
     **/
    constructor(name,coreRoomName, options={}){

        if(!mb.hasRoom(coreRoomName))mb.scanRoom(coreRoomName);
        
        this.name = name;
        this.coreRoomName = coreRoomName;
        
        let mineral = mb.getMineralForRoom(coreRoomName);
        this.homeMineralType = mineral.mineralType;
        if(Game.spawns[this.name] )
            this.extractorComplex = new ExtractorComplex(mineral.pos,Game.spawns[this.name].pos,name)
  
        this.totalEnergyAtSources=0;
        this.homeMineralSurplus =  options.homeMineralSurplus===undefined?80001:options.homeMineralSurplus;
        
        // options
        this.spawnFacing = options.spawnFacing===undefined?TOP:options.spawnFacing;
        this.extraFastFillSpots = options.extraFastFillSpots===undefined?[]:options.extraFastFillSpots;
        
        this.logger = options.logger;
        
        this.retreatSpot = options.retreatSpot;
        this.upgradeRate = options.upgradeRate===undefined?RATE_SLOW:options.upgradeRate;
        this.buildFast = options.buildFast===undefined?false:options.buildFast;
        
        this.remoteRoomNames = options.remoteRoomNames===undefined?[]:options.remoteRoomNames;
        this.funnelRoomName = options.funnelRoomName===undefined?false:options.funnelRoomName;
        
        this.terminalEnergyCap = options.terminalEnergyCap===undefined?15000:options.terminalEnergyCap;
        
        this.towersBuildWalls = options.towersBuildWalls===undefined?false:options.towersBuildWalls;
        this.wallHeight = options.wallHeight===undefined?25000000:options.wallHeight;
		this.armNuke = options.armNuke===undefined?false:options.armNuke;

        this.labComplex = options.labComplex===undefined?undefined:options.labComplex;
        this.makeResource = options.makeResource===undefined?undefined:options.makeResource;
        this.splitResource = options.splitResource===undefined?undefined:options.splitResource;
        this.exports = options.exports===undefined?[]:options.exports;
        this.imports = options.imports===undefined?[]:options.imports;
        
        this.trader = options.trader===undefined?undefined:options.trader;
        this.orders = [];
        if(this.trader){
            this.orders = this.trader.getOrderIDsByRoomName(this.coreRoomName);
        }
        
        this.readInStore();
        
        this.loadInCurrentWorkForce()

     
    }
    readInStore(){
        if(!Memory['roomNodes']){
            Memory['roomNodes']={};
        }
        if( !Memory['roomNodes'][this.name] ){
            clog("Setting up roomNode store...",this.name);
            Memory['roomNodes'][this.name]=this.setupStore();
        }
        for(let key in Memory['roomNodes'][this.name]){
            this[key] =  Memory['roomNodes'][this.name][key];
        }
    }
    
    setupStore(){
        let store = {};
        
        store.creepNames = [];

        return store; 
    }
    saveStore(){
        let newStore={};
        for(let attrName of ['creepNames']){
            newStore[attrName] = this[attrName];
        }
        Memory['roomNodes'][this.name] = newStore;
    }
    loadInCurrentWorkForce(){
        this.workforce_quota={
                worker:{count:0,required:0},
                rkeeper:{count:0,required:0},
                harvester:{count:0,required:0},
                tanker:{count:0,required:0},
                builder:{count:0,required:0},
                fixer:{count:0,required:0},
                upgrader:{count:0,required:0}
            };
            
        for(const cname of this.creepNames){
            let creep = Game.creeps[cname];
            
            if(!creep){clog("Missing creep: "+cname,this.name); continue;}
            
            if(!creepRoles[ creep.getRole() ]){
                clog(creep.getRole(),"No role code for "+creep.name); continue;
            } 
            if(this.workforce_quota[creep.getRole()])this.workforce_quota[creep.getRole()].count++;
        }
    } 
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Run Per Tick Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    runTick(){
        logs.startCPUTracker(this.name+':runTick');
        
          //  logs.startCPUTracker(this.name+':safeToRun');
        if(!this.safeToRun())return false;
          //  logs.stopCPUTracker(this.name+':safeToRun');
         
          //  logs.startCPUTracker(this.name+':checkCache');
        this.checkCache();
           // logs.stopCPUTracker(this.name+':checkCache');
        
         //   logs.startCPUTracker(this.name+':decideWorkforceQuotas');
        this.decideWorkforceQuotas();
           // logs.stopCPUTracker(this.name+':decideWorkforceQuotas');

            logs.startCPUTracker(this.name+':runCreeps');
        this.runCreeps();
            logs.stopCPUTracker(this.name+':runCreeps');
        
           // logs.startCPUTracker(this.name+':checkAndSpawnWorkforce');
        this.checkAndSpawnWorkforce();
            //logs.stopCPUTracker(this.name+':checkAndSpawnWorkforce');
            
        this.runLinkSend();
            
          //  logs.startCPUTracker(this.name+':runTowers');
        this.runTowers();
          //  logs.stopCPUTracker(this.name+':runTowers');
        
        //// Manage Mineral activities /////////////////////////////////////////////////////////////
        if(this.haveStorage){  
            if(this.makeResource && this.labComplex && Game.cpu.bucket>2000){
                 this.labComplex.turnOn();
                this.labComplex.make(this.makeResource);
            }else if(this.splitResource && this.labComplex && Game.cpu.bucket>2000){
				 this.labComplex.turnOn();
                this.labComplex.split(this.splitResource);
            }else if(this.labComplex){
                this.labComplex.turnOff();
             }

            
           if(this.extractorComplex){ 
                // keep it ticking, if we only have a small amount left
                let mineral = mb.getMineralForRoom(this.coreRoomName);
                
                if(this.extractorComplex.isOn()){

                    // this is checked before run, in order to stop it getting turned back on when windDown==0
                    if( mineral.mineralAmount > 10000 && !this.extractorComplex.isWindingDown() &&  this.storage().storedAmount(this.homeMineralType) > this.homeMineralSurplus ){
                        clog("winding down. We have enough resources. Current timer:"+this.extractorComplex.windDownTimer,this.name)
                        this.extractorComplex.windDown();
                    }
					
					this.extractorComplex.runTick();
                }
				// drain the last out, so we get a big refill OR only mine what we need

                else if( (mineral.mineralAmount > 0 && mineral.mineralAmount<10000) || this.storage().storedAmount(this.homeMineralType)<(this.homeMineralSurplus-20000) ){
                    this.extractorComplex.turnOn();
                }
            }
            
        
        }
    
        //// Recovery Mode //////////////////////////////////////////////////////
        // removed this from recovery check because i was miss-using it to scale up quick in low levels 
        if( (this.workforce_quota.tanker.count==0 &&this.workforce_quota.tanker.required>0) || this.workforce_quota.harvester.count<this.workforce_quota.harvester.required || this.workforce_quota.worker.count===0){
            this.inRecoveryMode=true;
        }else{
            this.inRecoveryMode=false;
        }
        ////////////////////////////////////////////////////////////////////////
            
        this.saveStore();
        logs.stopCPUTracker(this.name+':runTick');
    }
    safeToRun(){
        
        if(!this.controller()){clog("Room-node has no controller",this.name);return false;}
        
        
        if(this.controllerSetup===undefined || (!this.controllerSetup && Game.time%10===0 && this.upgradeRate!==RATE_OFF) ){
            let controller = this.controller();
            if(this.controller().getStandingSpot()){
                this.controllerSetup=true;
            }
        }
        if(!this.controllerSetup){clog("no controller standing spot",this.name);return false;}
        
    
        if(!Game.spawns[this.name] && !Game.spawns[this.name+'-2'] && !Game.spawns[this.name+'-3']  ){clog("Room-node has no spawn",this.name);return false;}
        
        return true;
    }
    runTowers(){

        let towers = mb.getStructures({types:[STRUCTURE_TOWER],roomNames:[this.coreRoomName]} );

        let hostileIds = Game.rooms[this.coreRoomName].getNoneAllyCreeps();
        let playerFighters = Game.rooms[this.coreRoomName].getEnemyPlayerFighters();

        // safety repair, in case some event kills normal repair creeps and room is collapsing
        let repairTypes =[];
        let repairTarget=false;
    
        if(playerFighters.length>1 || this.towersBuildWalls){
            
            repairTarget = Game.getObjectById(this.defenceIntel.weakest_structure.id);

        }else if(Game.time%100==0){
            
            let decay_structs = mb.getStructures({roomNames:[this.coreRoomName], types:[STRUCTURE_CONTAINER],filters:[{attribute:'hits',operator:'<',value:[200000]}]});
            if(decay_structs.length>0)
                repairTarget=decay_structs[0];
                
        }
        
        
    	let target = false;
    	let claimAttackDetected = false;
    	let enemyNearCoreSpawn = false;

        for(var id of hostileIds){
            let enemy = Game.getObjectById(id);
            if(!enemy)continue;
            
            let rangeToTower = towers.length>0?towers[0].pos.getRangeTo(enemy):99;
            let rangeToCoreSpawn = Game.spawns[this.name]?Game.spawns[this.name].pos.getRangeTo(enemy):99;
            
            if(rangeToCoreSpawn<=2){
                enemyNearCoreSpawn=true;
            }
            
            if(!claimAttackDetected && enemy.partCount(CLAIM)>0 && enemy.pos.getRangeTo(this.controller().pos)===2 ){
                claimAttackDetected=true;
            }
    
           
            // shoot small NPCs at max range
            if(hostileIds.length<4 && enemy.owner.username==='Invader'){
               target= enemy;break;
            }
            if(rangeToTower<=15 ){
                
               if(enemy.hits < enemy.hitsMax){
                   target= enemy;break;// prioritise something we are already shooting
               }  
               if(enemy.isHealer()){
                   target= enemy;break;// break because we want to prioritise healers
               } 
               target= enemy;
            } 
        }
        
        //////////////////////////////////////////////////////////////////////
        // Safe-mode checks
        //////////////////////////////////////////////////////////////////////
        if(playerFighters.length>1){
            
            let criticalStructureIDs = mb.getStructures({
                roomNames:[this.coreRoomName],
                type:[STRUCTURE_SPAWN,STRUCTURE_STORAGE,STRUCTURE_TERMINAL],
                justIDs:true
            });
            for(let id of criticalStructureIDs){
                let structure = gob(id);
                if(!structure){
                    // somethings been destroyed
                    this.controller().activateSafeMode();break;
                }
                if(structure.hits<structure.hitsMax){
                   // somethings is being destroyed
                    this.controller().activateSafeMode();break; 
                }
            }
            
            
        }
        
        if(this.controller().level < 4 && enemyNearCoreSpawn ){
            // likely we will lose spawn if enemy is this close at low level
            this.controller().activateSafeMode();
        }
        
        if(claimAttackDetected){
            this.controller().activateSafeMode();
        }
        
        
        //////////////////////////////////////////////////////////////////////////////////////
        // Real Tower Code
        //////////////////////////////////////////////////////////////////////////////////////
        if(towers.length==0)return;
        
	    let healTarget = false;
	    for(const cname of this.creepNames){
            let creep = Game.creeps[cname];
            
            if(creep.hits < creep.hitsMax){
                healTarget = creep;
            }
        }
        
        
        
        if(target || healTarget || repairTarget){
    	    for(var tower of  towers){

	            
    	        
                if(target.hits < 600){
                    
                    tower.attack(target);
                    
                }else if( (healTarget.hitsMax-healTarget.hits)>600 ){
    	            
    	            tower.attack(target);
    
    	        } else if(target){
    	            
    	            tower.attack(target);
    
    	        }else if(healTarget){
    	            
    	            tower.heal(healTarget);
                
    	        }else if(repairTarget){
	                tower.repair(repairTarget);
	            }
    
    	    }
        }
    }

    runCreeps(){
        
       let playerAttackers = Game.rooms[this.coreRoomName].getEnemyPlayerFighters();
       logs.startCPUTracker(this.name+':runAllFillers'); 
       this.runAllFillers();
        logs.stopCPUTracker(this.name+':runAllFillers');
        
        for(let roleName in this.workforce_quota){
            this.workforce_quota[roleName].count = 0;
        }
        
        let stillAlive = [];
        for(const cname of this.creepNames){
            let creep = Game.creeps[cname];
            
            if(!creep){
                delete Memory.creeps[cname]; 
               // clog(cname,"Creep went missing/died."); 
                continue;
            }
                
            if(!creepRoles[ creep.getRole() ]){
                clog(creep.getRole(),"No role code for "+creep.name); continue;
            }
            
            stillAlive.push(cname)
            
            if(this.workforce_quota[creep.getRole()])this.workforce_quota[creep.getRole()].count++;
            
            if(!creep.spawning){
                
                if(playerAttackers.length>0 && creep.getRole()=='upgrader'){
                    // this broke on botarena for some reason
                    //creep.setRole("builder")
                }
                    logs.startCPUTracker(creep.name);
                creepRoles[ creep.getRole() ].run(creep,this.getConfig());
                    logs.stopCPUTracker(creep.name);
                
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Cache Attribute Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Check all the cached attributes and rebuild any missing / expired attributes.
     * Most expires after X game ticks
     */ 
    checkCache(){
        
        //// Storage Cache /////////////////////////////////////////////////////
        if(Game.time%50==0){
            this.haveStorage = undefined;
        }
        if(this.haveStorage===undefined){
            let storage = this.storage();
            this.haveStorage = storage?true:false;
            this.spaceInStorage = this.haveStorage?storage.store.getFreeCapacity(RESOURCE_ENERGY) :0;
            this.energySurplus = this.haveStorage?storage.store.getUsedCapacity(RESOURCE_ENERGY) :this.totalEnergyAtSources;
        }
        ////////////////////////////////////////////////////////////////////////
       
        //// Spawn Fast Filler Ready ////////////////////////////////////////////
        // Check if main spawn is ready to use fast filler
        // this should stay cached once true, because it shouldn't change unless the room is invaded and destroyed
        if(Game.time%10===0 && this.spawnFastFillerReady==false)this.spawnFastFillerReady=undefined;
        if(this.spawnFastFillerReady===undefined){
            let structures = mb.getStructures({roomNames:[this.coreRoomName],types:[STRUCTURE_CONTAINER,STRUCTURE_STORAGE]});    
            let exts = mb.getStructures({ roomNames:[this.coreRoomName], types:[STRUCTURE_EXTENSION] });
            this.spawnFastFillerReady=false;
            for(let container of structures){
                if(Game.spawns[this.name] && Game.spawns[this.name].pos.getRangeTo(container)<3 && exts.length>=5 ){
                    this.spawnFastFillerReady=true;break;
                }
                if(Game.spawns[this.name+"-2"] && Game.spawns[this.name+"-2"].pos.getRangeTo(container)<3 && exts.length>=5 ){
                    this.spawnFastFillerReady=true;break;
                }
            }
        }
        
        //// Stats about room Sources ////////////////////////////////////////////
        if(Game.time%10===0){
            this.coreRoomSourcesCount=undefined
        }
       
        if(this.coreRoomSourcesCount===undefined){
            
            this.totalEnergyAtSources=0;
            this.coreRoomSourcesCount=0;
            this.allSourcesBuilt = true;
            let sources = mb.getSources({ roomNames: this.allRoomNames()}); 
            for(let source of sources){
                 
                if(source.pos.roomName==this.coreRoomName)this.coreRoomSourcesCount++;
                if( source.pos.roomName==this.coreRoomName &&  !source.haveContainer() && !source.haveLink() ){ this.allSourcesBuilt = false;}
                
                this.totalEnergyAtSources+= source.energyAwaitingCollection();
            }
        }
        ////////////////////////////////////////////////////////////////////////
        
        
        //// Defence Intelligence //////////////////////////////////////////////
        let playerFighters = Game.rooms[this.coreRoomName].getEnemyPlayerFighters();
        let refreshTime = playerFighters.length>0?10:200;
        if(Game.time%refreshTime===0)this.defenceIntel=undefined;
        if(this.defenceIntel===undefined){
            this.surveyDefences()
        }
        ////////////////////////////////////////////////////////////////////////
    }
    
    surveyDefences(){
        let structures = mb.getStructures({
            roomNames:[this.coreRoomName],
            types:[STRUCTURE_WALL,STRUCTURE_RAMPART],
            filters:[{attribute:'isNotMarkedForDismantle',operator:'fn',value:[]}],
            orderBy:{attr:'hits'}
            
        })
        this.defenceIntel = {wallHeight:this.wallHeight,weakest_structure:{id:'',hits:0},priority_repair_targets:[]}
        if(structures.length>0){
            this.defenceIntel.weakest_structure.id = structures[0].id;
            this.defenceIntel.weakest_structure.hits = structures[0].hits;
            for(let index in structures){
                if(index<5){
                    this.defenceIntel.priority_repair_targets.push(structures[index].id)
                }
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Dynamic Attribute Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    allRoomNames(){
 
        let activeRemotes  = [];
        if(Memory.invaderSeen===undefined)Memory.invaderSeen={}
        for(let roomName of this.remoteRoomNames){
            if( Memory.invaderSeen[roomName]==undefined || emory.invaderSeen[roomName]< Game.time){
                activeRemotes.push(roomName)
            }
        }
        return [this.coreRoomName,...activeRemotes];
    }
        
    storage(){
        return this.room().storage;
    }
    terminal(){
        return this.room().terminal;
    }
    room(){
        return Game.rooms[this.coreRoomName];
    }
    controller(){
        //if(!Game.rooms[this.coreRoomName])return false; >> not sure why this line was here. comment it next dufus, when its a bug
        return this.room().controller;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Filler Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    runAllFillers(){
        
         if(this.spawnFastFillerReady){
            this.runFiller(this.name,this.name.charAt(0)+ 'FF0');
            this.runFiller(this.name,this.name.charAt(0)+'FF1');
           let i=2;

            if(Game.spawns[this.name+'-2']){
                this.runFiller(this.name+'-2', (this.name.charAt(0))+'FF2');
                this.runFiller(this.name+'-2', (this.name.charAt(0))+ 'FF3');
                i+=2;
            }
            if(this.name=='Zeta' && Game.spawns['Zeta-3']){
                this.runFiller(this.name+'-3', (this.name.charAt(0))+'FF4');
                this.runFiller(this.name+'-3', (this.name.charAt(0))+ 'FF5');
                i+=2;
            }
            if(this.name=='Beta' && Game.spawns['Beta-3']){
                this.runFiller(this.name+'-3', (this.name.charAt(0))+'FF4');
                this.runFiller(this.name+'-3', (this.name.charAt(0))+ 'FF5');
                i+=2;
            }
             
            for(let pos of this.extraFastFillSpots){
                
                this.runFiller(this.name,this.name.charAt(0)+'FF'+i,pos);
                i++;
            }
        }
    }
    runFiller(spawnName,creepName,moveToSpot=false){
        
        if(!Game.spawns[spawnName])return;
        
        // erghh...screwed me over too many times. Will do long term fix one day. Stop the tempCode creeps from spawning into a fast filler spot. 
        // nob heads!
        
        Game.spawns[spawnName].forceDirectionHack = this.getMainSpawnSpots();
        
        if(spawnName=='Zeta-3'||spawnName=='Theta-3')Game.spawns[spawnName].forceDirectionHack = [TOP_LEFT,TOP,TOP_RIGHT];
        if(spawnName=='Iota-2'||spawnName=='Lambda-2')Game.spawns[spawnName].forceDirectionHack = [TOP_RIGHT,RIGHT,BOTTOM_RIGHT];
        if(spawnName=='Theta-2')Game.spawns[spawnName].forceDirectionHack = [TOP_LEFT,LEFT,BOTTOM_LEFT];
        if(['Zeta-2','Beta-2','Alpha-2','Delta-2','Epsilon-2','Kappa-2','Mu-2'].includes(spawnName))
            Game.spawns[spawnName].forceDirectionHack = [BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
        
		 if(spawnName=='Beta-3')Game.spawns[spawnName].forceDirectionHack = [BOTTOM];
		
        if(!Game.creeps[creepName]){
            let bodyPlan = creepRoles['filler'].getParts(0,this.getConfig());
            let dirs = (moveToSpot)?this.getMainSpawnSpots():this.getMainSpawnFillerSpots();
            if(moveToSpot){
                bodyPlan.push(MOVE);
            }
            
            
            
             if(spawnName=='Zeta-3')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[BOTTOM_LEFT,BOTTOM_RIGHT]);
            else if(['Zeta-2','Beta-2','Alpha-2','Delta-2','Epsilon-2','Kappa-2','Mu-2'].includes(spawnName))
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_LEFT,TOP_RIGHT]);
            else if(spawnName=='Iota-2'||spawnName=='Lambda-2')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_LEFT,BOTTOM_LEFT]);
            else if(spawnName=='Theta-2')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_RIGHT,BOTTOM_RIGHT]);
			 else if(['Beta-3','Kappa-3','Mu-3'].includes(spawnName))
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[LEFT,RIGHT]);

            else{ 
                
                let res = Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,dirs);
                
            }
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
            return [TOP_LEFT,TOP,TOP_RIGHT];
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Spawning Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getConfig(){
        
        return {
                    controller: this.controller(),
                    coreRoomName:this.coreRoomName,
                    remoteRoomNames:this.remoteRoomNames,
                    allRoomNames:this.allRoomNames(),
                    inRecoveryMode:this.inRecoveryMode,
                    allSourcesBuilt:this.allSourcesBuilt,
                    spawnFastFillerReady:this.spawnFastFillerReady,
                    defenceIntel:this.defenceIntel,
					armNuke:this.armNuke,

                    retreatSpot:this.retreatSpot,
                    funnelRoomName:this.funnelRoomName,
                    upgradeRate:this.upgradeRate,
                    terminalEnergyCap:this.terminalEnergyCap,
                    towersBuildWalls:this.towersBuildWalls,
                    labComplex:this.labComplex,
                    imports:this.imports,
                    exports:this.exports
                    
                };
    }
    
    checkAndSpawnWorkforce(){
        
        let spawnName = false;
        if(Game.spawns[this.name] && !Game.spawns[this.name].spawning)
            spawnName = this.name;
        else if(Game.spawns[this.name+'-2'] && !Game.spawns[this.name+'-2'].spawning)
            spawnName = this.name+'-2';
        else if(Game.spawns[this.name+'-3'] && !Game.spawns[this.name+'-3'].spawning)
            spawnName = this.name+'-3';
        
        
        if(!spawnName)return;// no spawn is free

       let budget = false;
      
        for(let roleName in this.workforce_quota){
            let role = this.workforce_quota[roleName];
            if(role.count < role.required){
                
                // only calc budget once per tick and only when we have something to spawn
                if(budget===false)budget = this.getSpawnBudget();
                let config = this.getConfig();
                
               // clog("need "+roleName+ " count: "+role.count+" / "+role.required)
     
                let bodyPlan = creepRoles[ roleName ].getParts(budget,config);
                let cname = ERR_BUSY; 
                if(Game.spawns[this.name])
                    cname = Game.spawns[this.name].createCreep(bodyPlan,{role:roleName},false,this.getMainSpawnSpots());
                    

                if(Game.spawns[this.name+'-2'] && cname===ERR_BUSY){
                    let dirs = [];
                    if(this.name=='Iota'){
                        dirs=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT];
                    }
                    if(this.name=='Zeta' || this.name=='Beta'|| this.name=='Alpha'){
                        dirs=[BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
                    }
                    if(this.name=='cc'){
                        dirs=[TOP_LEFT,TOP,TOP_RIGHT];
                    }
                    if(this.name=='Theta'){
                        dirs=[TOP_LEFT,LEFT,BOTTOM_LEFT];
                    }
          
                    cname = Game.spawns[this.name+'-2'].createCreep(bodyPlan,{role:roleName},false,dirs);
               
                } 
                if(Game.spawns[this.name+'-3'] && cname===ERR_BUSY){
                    let dirs = [];
            
                    if(this.name=='Iota'){
                        dirs=[TOP_LEFT,TOP,TOP_RIGHT];
                    }
                    if(this.name=='Beta'|| this.name=='Alpha'){
                        dirs=[BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
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
        let playerAttackers = Game.rooms[this.coreRoomName].getEnemyPlayerFighters();

        
        
        this.workforce_quota.worker.required = controller.level>1 && !this.allSourcesBuilt?2:1;
        
        this.workforce_quota.harvester.required = this.coreRoomSourcesCount;
        if(Game.rooms[this.coreRoomName].energyCapacityAvailable<800){
            this.workforce_quota.harvester.required+=2;
        }

   
        if(this.buildFast && !this.inRecoveryMode && Game.cpu.bucket>3000){
            if(this.haveStorage){
                // at higher RCL, builder can consume too quick and dry out system
                if(this.energySurplus > 50000)
                    this.workforce_quota.builder.required = 4;
                else if(this.energySurplus > 30000)
                    this.workforce_quota.builder.required = 3;
                else if(this.energySurplus > 15000)
                    this.workforce_quota.builder.required = 2;
                else if(this.energySurplus > 5000)
                    this.workforce_quota.builder.required = 2;
                else
                    this.workforce_quota.builder.required = 0;
            }else{
                // at low RCL the builders can consume quicker than draw
                this.workforce_quota.builder.required = 4;
            }
                
        }else{
            this.workforce_quota.builder.required = (this.energySurplus > 5000)?1:0;
        } 
        
        if(this.haveStorage && this.spaceInStorage<50000 && this.energySurplus > 50000){
            this.workforce_quota.harvester.required=0;
        }
        
        if(this.haveStorage){
            this.workforce_quota.rkeeper.required=1;
        }
        
        // if we are early on, ensure we build the basics or we have a storage to recover with
        if( this.spawnFastFillerReady || this.haveStorage){
            
            this.workforce_quota.worker.required = 1; // xmark
            
    
            if(this.defenceIntel.weakest_structure.hits > this.defenceIntel.wallHeight && !mb.haveConstructions([this.coreRoomName])){
                this.workforce_quota.builder.required = 0;
            }
            
            if(this.allSourcesBuilt){
                let tankersPerX = Game.rooms[this.coreRoomName].energyCapacityAvailable<1300?1000:1600;
                this.workforce_quota.tanker.required = Math.floor( this.totalEnergyAtSources/tankersPerX )
            }
            //this.workforce_quota.tanker.required = this.totalEnergyAtSources===0?1:Math.ceil(this.totalEnergyAtSources/2000)
    
           if( (this.upgradeRate===RATE_FAST || this.upgradeRate===RATE_VERY_FAST) && (Game.cpu.bucket>5000||Game.rooms['sim']) && this.allSourcesBuilt && controller.haveContainer()){
               
               let readyToSpend = controller.getContainer().storedAmount();
               
                if(this.haveStorage && this.energySurplus<50000 && controller.level<=7 ){
                    // we need to start saving, incase we get attacked or need to spend
                    this.workforce_quota.upgrader.required = 1;
                }else if(readyToSpend>=1800){
                    this.workforce_quota.upgrader.required = (this.upgradeRate===RATE_VERY_FAST)?7:5;
                    if(this.totalEnergyAtSources>8000 && this.workforce_quota.tanker.count>10){
                        this.workforce_quota.upgrader.required++;
                    }
                }else if(readyToSpend>=1500){
                    this.workforce_quota.upgrader.required = 4;
                    if(this.totalEnergyAtSources>8000 && this.workforce_quota.tanker.count>10){
                        this.workforce_quota.upgrader.required++;
                    }
                }else if(readyToSpend>1200){
                    this.workforce_quota.upgrader.required = 3;
                }else if(readyToSpend>600){
                    this.workforce_quota.upgrader.required = 2;
                }else{
                    this.workforce_quota.upgrader.required = 1;
                }
           }else if(this.upgradeRate===RATE_VERY_SLOW && controller.ticksToDowngrade>100000){
               this.workforce_quota.upgrader.required = 0;
           }else{
               this.workforce_quota.upgrader.required = this.allSourcesBuilt?1:0;
			   if(this.haveStorage && this.energySurplus<25000){
                   this.workforce_quota.upgrader.required = 0;
               }
           }
           
            //////////////////////////////////////////////////////////////////////////////////
            // Safety overrides
            //////////////////////////////////////////////////////////////////////////////////
            if(this.inRecoveryMode || playerAttackers.length>0 || this.upgradeRate==RATE_OFF){
                this.workforce_quota.upgrader.required = 0;
            }
            if(playerAttackers.length>2){
                this.workforce_quota.builder.required = 6;
            }else if(playerAttackers.length>1){
                this.workforce_quota.builder.required = 4;
            }
        }
        

    }
    
    decideResourceNeeds(){
        this.wants =[];
        let terminal = this.terminal();
        let storage = this.storage();
        // we can't import/export until we have both of these.
        if(!terminal || !storage)return;
        
        for(let resource_type in this._decideBaseResources()){
            if(r.resource_type != this.homeMineralType){
                this.wants.push(r);
            }
        }
        
        // wants +- haves = exports & imports
        // basic military compounds: LO / UH / ZH / ZO >> based on tier
        // advanced : KH?
        // base compounds: O / H / OH / U / Z / L / K
        // economy compounds : GH* / UO 
        
        /* 
        
        let resources = decideWants();
        for( haves ){
            if( resources[ r ]  ){
                resources[ r ].have = have[r].amount;
                
                if( resources[ r ].have > resources[ r ].want ){
                    resources[ r ].exporting = true;
                    resources[ r ].importing = false;
                }
                else if( resources[ r ].have < resources[ r ].want ){
                    resources[ r ].importing = true;
                    resources[ r ].exporting = false;
                }
            }
            
            else resources[r] = { want:0, have:haves[r].amount, export:true },
        }
        
        
        haves.amount = terminal.amount + storage.amount
        wants.amount = decideConfig()
        
         storageCap >> the amount to import. Replaced by wants.amount ? 
         imports.amount = wants.amount - have.amount
         exporting
         
         if( haves.amount < wants.amount )
            imports.amount = wants.amount - haves.amount
         
         
        imports:[
                {resource_type:RESOURCE_HYDROGEN,storageCap:24000}, 
                {resource_type:RESOURCE_HYDROXIDE,storageCap:24000}, 
            ],
            // batchSize >> the amount to store in terminal. replaced by fixed amount ?...6k ?
            // exportOver >> how much to keep in storage, replaced by wants.want
            exports:[
                {resource_type:RESOURCE_ZYNTHIUM_OXIDE,exportOver:6000,batchSize:12000},
                {resource_type:RESOURCE_ZYNTHIUM_ACID,exportOver:6000,batchSize:12000},
            ]
        
        */
        
        
        // if RCL 8 : G
        
        
    }
    _decideBaseResources(){
        let r={};
        this._setupWant(r,RESOURCE_ENERGY,50000);
        this._setupWant(r,RESOURCE_HYDROGEN,12000);
        this._setupWant(r,RESOURCE_OXYGEN,12000);
        this._setupWant(r,RESOURCE_UTRIUM,6000);
        this._setupWant(r,RESOURCE_LEMERGIUM,6000);
        this._setupWant(r,RESOURCE_ZYNTHIUM,6000);
        
        return r;
    }
    _setupWant(store,resource_type,amount){
        if(resource_type != this.homeMineralType)
            store[resource_type] = {want:amount,have:0,import_order_id:false,export_order_id:false}
    }
    
    getSpawnBudget(){
        let capacity = Game.rooms[this.coreRoomName].energyCapacityAvailable;
        let stored = Game.rooms[this.coreRoomName].energyAvailable;
        return (this.inRecoveryMode)?stored: capacity;
    }

}
module.exports = RoomNode;
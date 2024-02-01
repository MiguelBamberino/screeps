const ExtractorComplex = require('./class.complex.extractor');
const BaseCoreComplex = require('./class.complex.base-core');
const ArmCoreComplex = require('./class.complex.base-arm');

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
            wallHeight:5,000,000     >> How hight the walls should be
            rampHeight:25,000,000     >> How hight the ramparts should be
            armNuke:false           >> Whether this rooms Nuke should be kept armed
            labComplex:undefined    >> if set, then it will be used to run reactions
            makeResource:undefined  >> if set, then this resource will be made in the labComplex
            splitResource:undefined  >> if set, then this resource will be split in the labComplex
            boostResources:undefined  >> if set, then these boost resources will be loaded in the labComplex
            exports:[]              >> a list of export instructions. Each instruction looks like:  {resource_type:RESOURCE_GHODIUM,exportOver:0,batchSize:50000},
            imports:[]              >> a list of imports instructions. Each instruction looks like:  {resource_type:RESOURCE_ENERGY,storageCap:100000},
            
     * }
     **/ 
    constructor(name, options={}){

        this.name = name;
        this.exports = [];
        this.online = options.online===undefined?true:options.online;
        this.allowCPUShutdown = options.allowCPUShutdown===undefined?false:options.allowCPUShutdown;

        // allow this to be set up front, in order to allow automatic setup of 2nd+ rooms
        this.anchor = options.anchor===undefined?undefined:options.anchor;

        if(!this.anchor ){
            console.log(name+' has no anchor. Cannot load on global reset');
            this.online = false;// turning off to save code
            return;
        }

        this.coreRoomName = this.anchor.roomName;
        if(!mb.hasRoom(this.coreRoomName))mb.scanRoom(this.coreRoomName);

        let mineral = mb.getMineralForRoom(this.coreRoomName);
        this.homeMineralType = mineral.mineralType;
        this.extractorComplex = new ExtractorComplex(mineral.pos,this.anchor,name)
        this.totalEnergyAtSources=0;
        this.homeMineralSurplus =  options.homeMineralSurplus===undefined?80001:options.homeMineralSurplus;
        
        // options
        this.spawnFacing = options.spawnFacing===undefined?TOP:options.spawnFacing;
        this.armFacing = options.armFacing===undefined?TOP:options.armFacing;
        this.armAnchor = options.armAnchor===undefined?rp(this.anchor.x,this.anchor.y+6,this.anchor.roomName):options.armAnchor;
        this.extraFastFillSpots = options.extraFastFillSpots===undefined?[]:options.extraFastFillSpots;

        
        this.logger = options.logger;
        
        this.retreatSpot = options.retreatSpot===undefined?rp(this.anchor.x-3,this.anchor.y-2,this.anchor.roomName):options.retreatSpot;
        this.upgradeRate = options.upgradeRate===undefined?RATE_SLOW:options.upgradeRate;
        this.buildFast = options.buildFast===undefined?false:options.buildFast;
        
        this.remoteRoomNames = options.remoteRoomNames===undefined?[]:options.remoteRoomNames;
        this.funnelRoomName = options.funnelRoomName===undefined?false:options.funnelRoomName;
        
        this.terminalEnergyCap = options.terminalEnergyCap===undefined?15000:options.terminalEnergyCap;
        
        this.towersBuildWalls = options.towersBuildWalls===undefined?false:options.towersBuildWalls;
        this.wallHeight = options.wallHeight===undefined?5000000:options.wallHeight;
        this.rampHeight = options.rampHeight===undefined?25000000:options.rampHeight;
		this.armNuke = options.armNuke===undefined?false:options.armNuke;

        this.labComplex = options.labComplex===undefined?undefined:options.labComplex;
        this.makeResource = options.makeResource===undefined?undefined:options.makeResource;
        this.splitResource = options.splitResource===undefined?undefined:options.splitResource;
        this.boostResources = options.boostResources===undefined?[]:options.boostResources;
        this.exports = options.exports===undefined?[]:options.exports;
        this.imports = options.imports===undefined?[]:options.imports;
        
        this.trader = options.trader===undefined?undefined:options.trader;
        this.orders = [];
        if(this.trader){
            this.orders = this.trader.getOrderIDsByRoomName(this.coreRoomName);
        }

        this.coreComplex = new BaseCoreComplex(this.anchor,this.name,this.spawnFacing)
        this.coreComplex.turnOn();
        this.armComplex = new ArmCoreComplex(this.armAnchor,this.name,this.armFacing)
        this.armComplex.turnOn();

        if(this.labComplex){
            
            if(this.boostResources.length>0){
                this.labComplex.turnOn();
                this.labComplex.loadBoosts(this.boostResources);
            }else if(this.makeResource){
                this.labComplex.turnOn();
                this.labComplex.make(this.makeResource);
            }else if(this.splitResource){
				this.labComplex.turnOn();
                this.labComplex.split(this.splitResource);
            }  
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

        if(!this.safeToRun())return false;

        logs.startCPUTracker(this.name+':runTick');

        this.checkAndSetupStandingSpots()
         
            //logs.startCPUTracker(this.name+':checkCache');
        this.checkCache();
            //logs.stopCPUTracker(this.name+':checkCache');
        this.coreComplex.run(this.getConfig())
        this.armComplex.run(this.getConfig())


           // logs.startCPUTracker(this.name+':decideWorkforceQuotas');
        this.decideWorkforceQuotas();
            //logs.stopCPUTracker(this.name+':decideWorkforceQuotas');

            logs.startCPUTracker(this.name+':runCreeps');
        this.runCreeps();
            logs.stopCPUTracker(this.name+':runCreeps');
        
            //logs.startCPUTracker(this.name+':checkAndSpawnWorkforce');
        this.checkAndSpawnWorkforce();
            //logs.stopCPUTracker(this.name+':checkAndSpawnWorkforce');
            
        this.runLinkSend();
            
            //logs.startCPUTracker(this.name+':runTowers');
        this.runTowers();
           // logs.stopCPUTracker(this.name+':runTowers');
        
        //// Manage Mineral activities /////////////////////////////////////////////////////////////
        logs.startCPUTracker(this.name+':Mineral');
        if(this.haveStorage){
            if(this.labComplex){
                 if(Game.cpu.bucket>5000){
                    this.labComplex.turnOn();
                    this.labComplex.runTick();
                }else{
                    this.labComplex.turnOff();
                 }
            }
            
           if(this.extractorComplex && this.storage()){
                // keep it ticking, if we only have a small amount left
                let mineral = mb.getMineralForRoom(this.coreRoomName);
                
                if(this.extractorComplex.isOn()){
                  
                    // this is checked before run, in order to stop it getting turned back on when windDown==0
                    if(  Game.cpu.bucket<6000 || mineral.mineralAmount > 10000 && !this.extractorComplex.isWindingDown() &&  this.storage().storedAmount(this.homeMineralType) > this.homeMineralSurplus ){
                        clog("winding down. We have enough resources. Current timer:"+this.extractorComplex.windDownTimer,this.name)
                        this.extractorComplex.windDown();
                    }
					
					this.extractorComplex.runTick();
                }
				// drain the last out, so we get a big refill OR only mine what we need

                else if( Game.cpu.bucket>6000 && ( (mineral.mineralAmount > 0 && mineral.mineralAmount<10000) || this.storage().storedAmount(this.homeMineralType)<(this.homeMineralSurplus-20000) ) ){
                    
                    this.extractorComplex.turnOn();
                }
            }
            
        
        }
        
        logs.stopCPUTracker(this.name+':Mineral');
    
        //// Recovery Mode //////////////////////////////////////////////////////
        // removed this from recovery check because i was miss-using it to scale up quick in low levels 
        if( (this.workforce_quota.tanker.count===0 &&this.workforce_quota.tanker.required>0) || this.workforce_quota.harvester.count<this.workforce_quota.harvester.required ){
            this.inRecoveryMode=true;
        }else{
            this.inRecoveryMode=false;
        }
        ////////////////////////////////////////////////////////////////////////
            
        this.saveStore();
        logs.stopCPUTracker(this.name+':runTick');
    }
    safeToRun(){

        if(!this.online)return false;

        if(!this.controller()){clog("Room-node has no controller",this.name);return false;}

        if(!Game.spawns[this.name] && !Game.spawns[this.name+'-2'] && !Game.spawns[this.name+'-3']  ){return false;}
        
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
            let rangeToCoreSpawn = this.anchor.getRangeTo(enemy);
            
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
                
	            if(target.name==='bob')continue;
    	        
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
                if(['rkeeper','worker','builder','upgrader'].includes( creep.getRole() ) )logs.startCPUTracker(creep.name);
                creepRoles[ creep.getRole() ].run(creep,this.getConfig());
                if(['rkeeper','worker','builder','upgrader'].includes( creep.getRole() ) )logs.stopCPUTracker(creep.name,false);
                
            }
                    
        }
        
        
        this.creepNames = stillAlive;
    }
    runLinkSend2(){
        if(this.controller().level<5)return;
        
        
        if(this.controller().level ===6){
            // every 500t/load, IF we dont have link at controller
            // look for links at controller
            
            // IF upgrader.count>0
            // recipeients.push(link)
        }
        if(this.controller().level ===8){
            // every 500t/load, IF we dont have link at spawn 3
            // look for links at spawn 3
            
            // IF fast-filler spots active
            // recipeients.push(link)
        }
        if(this.controller().level ===5){
            // every 500t/load, IF we dont have src links / core link. 
            // look for links at sources
            // look for link near storage
            // place them? or have harvester do this?
            
            // FOR each src
                // if src.link ready
                    // sender.push(link)
            
            // IF storage.link.isRelay
                // sender.push(link)
        }
        
        
        // IF senders empty return
        
        // r = 0;
        //FOR each SRC
            // if link ready to send
                
                // if no more queued recipients, send to first, which will be storage
                //if(!recipients[r]) sendTo recipients[0]
                
                // send to the next recipient link, so if 1+ want to send in same tick, then both get a link
                // send to recipents[r]
                // r++
            
            // IF srcs wont be sending for a while AND controller/spwn-3 wants E.
                // switch storage to fill, so it can send
            
            // IF storage.link.isFULL && storage.link.isRelay()
                // storage.link.send( recipient[0] )
                
                
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

        if(Game.time%20===0){
            if(!this.controller().haveContainer()){
                let container = this.controller().getStandingSpot().lookForStructure(STRUCTURE_CONTAINER)
                this.controller().setContainer(container)
            }
        }


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

            this.spawnFastFillerReady=false;
            for(let container of structures){
                if(Game.spawns[this.name] && this.anchor.getRangeTo(container)<3 /*&& exts.length>=5*/ ){
                    this.spawnFastFillerReady=true;break;
                }
                if(Game.spawns[this.name+"-2"] && Game.spawns[this.name+"-2"].pos.getRangeTo(container)<3 /*&& exts.length>=5*/ ){
                    this.spawnFastFillerReady=true;break;
                }
            }

        }


        //// Controller Cache /////////////////////////////////////////////////////
        if(this.spawnFastFillerReady && Game.time%10===0 && !this.controller().haveContainer()) {
            let exts = mb.getStructures({ roomNames:[this.coreRoomName], types:[STRUCTURE_EXTENSION] });
            if(exts.length>=5)mb.addConstruction(this.controller().getStandingSpot(), STRUCTURE_CONTAINER);
        }
        if(Game.time%20===0){
            this.energyAtController=undefined
        }
        if(this.energyAtController===undefined){
            this.energyAtController=0;
            if(this.controller().haveContainer()){
                this.energyAtController += this.controller().getContainer().storedAmount(RESOURCE_ENERGY);
            }
            // we are blitzing, so look for dropped energy
            if(this.upgradeRate===RATE_VERY_FAST){
                let spots = this.controller().getStandingSpots();
                for(let pos of spots){
                    let drop = pos.lookForResource(RESOURCE_ENERGY);
                    if(drop){
                        this.energyAtController +=drop.amount;
                    }
                }
            }
        }
        
        //// Stats about room Sources ////////////////////////////////////////////
        if(Game.time%10===0){
            this.coreRoomSourcesCount=undefined
        }
       
        if(this.coreRoomSourcesCount===undefined){
            
            this.totalEnergyAtSources=0;
            this.totalEnergyAtLocalSources=0;
            this.coreRoomSourcesCount=0;
            this.allSourcesBuilt = true;
            let sources = mb.getSources({ roomNames: this.allRoomNames()}); 
            for(let source of sources){
                let e = source.energyAwaitingCollection();

                if(source.pos.roomName==this.coreRoomName){
                    this.coreRoomSourcesCount++;
                    this.totalEnergyAtLocalSources+=e;
                }
                if( source.pos.roomName==this.coreRoomName &&  !source.haveContainer() && !source.haveLink() ){ this.allSourcesBuilt = false;}
                
                this.totalEnergyAtSources+= e;
            }
        }
        ////////////////////////////////////////////////////////////////////////
        
        
        //// Defence Intelligence //////////////////////////////////////////////
        let playerFighters = Game.rooms[this.coreRoomName].getEnemyPlayerFighters();
        let refreshTime = playerFighters.length>0?10:200;
        if(Game.time%refreshTime===0)this.defenceIntel=undefined;
        if(this.defenceIntel===undefined){
            //logs.startCPUTracker(this.name+' surveyDefences');
            this.surveyDefences()
            //logs.stopCPUTracker(this.name+' surveyDefences',false);
        }
        ////////////////////////////////////////////////////////////////////////
    }
    calcTowerMultiplier(x1, y1, x2, y2) {
        //return 0;
        const distance = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        const clampedDistance = Math.min(Math.max(distance,TOWER_OPTIMAL_RANGE), TOWER_FALLOFF_RANGE)
        const normalizedDistance = (clampedDistance - TOWER_OPTIMAL_RANGE) / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE);
        return 1.0 - normalizedDistance * TOWER_FALLOFF;
    }
    surveyDefences(){
       // logs.startCPUTracker(this.name+' surveyDefences-query');
        let structures = mb.getStructures({
            roomNames:[this.coreRoomName],
            types:[STRUCTURE_WALL,STRUCTURE_RAMPART],
            filters:[{attribute:'isNotMarkedForDismantle',operator:'fn',value:[]}],
            orderBy:{attr:'hits'}
            
        })
        //logs.stopCPUTracker(this.name+' surveyDefences-query',true);
        
        //logs.startCPUTracker(this.name+' surveyDefences-process');
        this.defenceIntel = {
            wallHeight:this.wallHeight,
            rampHeight:this.rampHeight,
            weakest_structure:{id:'',hits:99999999999},
            priority_repair_targets:[],
            attacker_ids:[],
            priority_attacker_id:'',
            tower_dmg_on_priority:0,
            closest_ramp_id:'',
            ramp_ids_to_defend:[]
        }
        
        let playerFighterIDs = Game.rooms[this.coreRoomName].getEnemyPlayerFighters();
        let priorityAttacker = false;
        for(let id of playerFighterIDs){
            priorityAttacker = gob(id);
            if(priorityAttacker){
                this.defenceIntel.priority_attacker_id = priorityAttacker.id;
                this.defenceIntel.attacker_ids.push(priorityAttacker.id)
            }
        }
        if(priorityAttacker){
            let towers = mb.getStructures({roomNames:[this.coreRoomName],types:[STRUCTURE_TOWER]})
            let dmg = 0;
            for(let tower of towers){
                dmg += (this.calcTowerMultiplier(tower.pos.x, tower.pos.y, priorityAttacker.pos.x, priorityAttacker.pos.y) * TOWER_POWER_ATTACK )
               
            }
            this.defenceIntel.tower_dmg_on_priority = dmg.toFixed(0)*1;
        }
        let srcs = mb.getSources({roomNames:[this.coreRoomName]})
        
        if(structures.length>0){
            
            
            this.defenceIntel.weakest_structure.id = structures[0].id;
            this.defenceIntel.weakest_structure.hits = structures[0].hits;
            let closestRamp = false;
            let closestDist = 999;
            for(let index in structures){
                    
                
                if(priorityAttacker && structures[index].structureType===STRUCTURE_RAMPART){
                    
                    let dist = priorityAttacker.pos.getRangeTo(structures[index])
                    
                    if(dist < closestDist){
                       
                       //console.log("closer:",structures[index].pos,dist)
                       
                       let sateliteRampart = false; 
                        for(let src of srcs){
                          //  console.log(src.pos,structures[index].pos,src.pos.getRangeTo(structures[index].pos))
                            // ignore ramparts that are on satelite sources, that shouldn't be in the base
                            if( src.pos.isNearTo(structures[index].pos) ){
                              sateliteRampart = true;
                            }
                        }
                        
                        if(!sateliteRampart){
                            
                            closestDist = dist;
                            closestRamp = structures[index];
                            this.defenceIntel.closest_ramp_id = structures[index].id;
                        }
                          
                        
                    }
                }
                
                
                if(structures[index].structureType===STRUCTURE_RAMPART && structures[index].hits > this.rampHeight)continue;
                if(structures[index].structureType===STRUCTURE_WALL && structures[index].hits > this.wallHeight)continue;
                if(index<5){
                    this.defenceIntel.priority_repair_targets.push(structures[index].id)
                }
            }
            if(closestRamp){
                let nearbyRamps = closestRamp.pos.lookForNearStructures(STRUCTURE_RAMPART,true);
                for(let ramp of nearbyRamps){
                    this.defenceIntel.ramp_ids_to_defend.push(ramp.id);
                }
            }
        }
        
        //logs.stopCPUTracker(this.name+' surveyDefences-process',true);
        
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Dynamic Attribute Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    allRoomNames(){
 
       /* let activeRemotes  = [];
        if(Memory.invaderSeen===undefined)Memory.invaderSeen={}
        for(let roomName of this.remoteRoomNames){
            if( Memory.invaderSeen[roomName]==undefined || Memory.invaderSeen[roomName]< Game.time){
                activeRemotes.push(roomName)
            }
        }*/
        return [this.coreRoomName,...this.remoteRoomNames];
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
    sources(){
        return mb.getAllSourcesForRoom(this.coreRoomName);
    }
    controller(){
        return this.room().controller;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Filler Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    runAllFillers(){
        return;
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
        if(['Zeta-2','Beta-2','Alpha-2','Gamma-2','Delta-2','Epsilon-2','Kappa-2','Mu-2'].includes(spawnName))
            Game.spawns[spawnName].forceDirectionHack = [BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
        
		 if(spawnName=='Beta-3')Game.spawns[spawnName].forceDirectionHack = [BOTTOM];
		
	//	logs.startCPUTracker(this.name+creepName+':spawn'); 
        if(!Game.creeps[creepName]){
            
            let bodyPlan = creepRoles['filler'].getParts(0,this.getConfig());
            
            let dirs = (moveToSpot)?this.getMainSpawnSpots():this.getMainSpawnFillerSpots();
            if(moveToSpot){
                bodyPlan.push(MOVE);
            }
            
            
            
             if(spawnName=='Zeta-3')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[BOTTOM_LEFT,BOTTOM_RIGHT]);
            else if(['Zeta-2','Beta-2','Alpha-2','Gamma-2','Delta-2','Epsilon-2','Kappa-2','Mu-2'].includes(spawnName))
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_LEFT,TOP_RIGHT]);
            else if(spawnName=='Iota-2'||spawnName=='Lambda-2')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_LEFT,BOTTOM_LEFT]);
            else if(spawnName=='Theta-2')
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[TOP_RIGHT,BOTTOM_RIGHT]);
			 else if(['Beta-3','Kappa-3','Mu-3'].includes(spawnName))
                Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,[LEFT,RIGHT]);

            else{ 
                // this is the base spawn, so should have one adj to terminal. we need to increase transfer throughput
                if( this.terminal() && (this.upgradeRate===RATE_FAST || this.upgradeRate===RATE_VERY_FAST) ){
                    bodyPlan.push(CARRY);
                } 
                
                let res = Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,dirs);
                
            }
        }
       // logs.stopCPUTracker(this.name+creepName+':spawn'); 
        
       // logs.startCPUTracker(this.name+creepName+':run'); 
        if(Game.creeps[creepName] && !Game.creeps[creepName].spawning){
            let creep = Game.creeps[creepName];
            
            if(moveToSpot && !creep.pos.isEqualTo(moveToSpot)){
                   creep.moveTo(moveToSpot);
            }else{
                 creepRoles['filler'].run(creep,this.getConfig());
            }
        }
       // logs.stopCPUTracker(this.name+creepName+':run'); 
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
                    name:this.name,
                    creepNames:this.creepNames,
                    controller: this.controller(),
                    coreRoomName:this.coreRoomName,
                    remoteRoomNames:this.remoteRoomNames,
                    allRoomNames:this.allRoomNames(),
                    inRecoveryMode:this.inRecoveryMode,
                    allSourcesBuilt:this.allSourcesBuilt,
                    totalEnergyAtLocalSources:this.totalEnergyAtLocalSources,
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


        this.workforce_quota.worker.required = this.allSourcesBuilt?1:0;
        // we dont need need the workers, but trying it out if the extra worker helps clean up dropped E efficiency
        if(controller.level>1 && controller.level<5 && (this.buildFast || (this.upgradeRate===RATE_FAST|| this.upgradeRate===RATE_VERY_FAST) ))
            this.workforce_quota.worker.required++;

        this.workforce_quota.harvester.required = this.coreRoomSourcesCount;
        let rclECap = Game.rooms[this.coreRoomName].energyCapacityAvailable; 
        if(rclECap<800){
            let srcs = mb.getSources({roomNames:[this.coreRoomName]})
            this.workforce_quota.harvester.required = 0;
            for(let src of srcs){
                let spotCount = src.getStandingSpots().length;
                if(spotCount===3 && rclECap===550)spotCount=2;
                
                this.workforce_quota.harvester.required+= spotCount;
            }

        }
        let buildersNeeded=false;
        this.workforce_quota.builder.required = 0;
        if(controller.level=== 1 || this.defenceIntel.weakest_structure.hits < this.defenceIntel.rampHeight || mb.haveConstructions([this.coreRoomName])){
            buildersNeeded = true;
        }

        if(buildersNeeded){
            if(this.buildFast && !this.inRecoveryMode && Game.cpu.bucket>3000){
                
                // how many builders do we spawn, per X surplus, at each RCL, given builders can consume E quicker at higher RCL
                let buildersPerXSurplus_PerRCL= [
                    9999999999, // RCL0
                    250, // RCL1
                    500, // RCL2
                    1000, // RCL3
                    2500, // RCL4
                    10000, // RCL5
                    15000, // RCL6
                    15000, // RCL7
                    15000 // RCL8
                    ];
                let dividePerX = buildersPerXSurplus_PerRCL[controller.level];
                 // for every extra 500e lets spawn more builders. Too many builders drains the sources and the builders waste time ping ponging
                this.workforce_quota.builder.required = Math.floor( this.energySurplus/dividePerX );
                //this.workforce_quota.builder.required += extras;
                if(this.workforce_quota.builder.required>10)this.workforce_quota.builder.required=10;
                

            }else{
                this.workforce_quota.builder.required = (this.energySurplus > 5000)?1:0;
            } 
        }
        
        if(this.haveStorage && this.spaceInStorage<50000 && this.energySurplus > 50000){
            this.workforce_quota.harvester.required=0;
        }
        
        if(this.haveStorage){
            this.workforce_quota.rkeeper.required=1;
        }
        
        
        // how many builders do we spawn, per X surplus, at each RCL, given builders can consume E quicker at higher RCL
        let tankerPerXSurplus_PerRCL= [
                9999999999, // RCL0
                250, // RCL1
                400, // RCL2
                600, // RCL3
                1000, // RCL4
                1500, // RCL5
                2000, // RCL6
                2000, // RCL7
                2000 // RCL8
                ];
        let tankersPerX = tankerPerXSurplus_PerRCL[controller.level];
        this.workforce_quota.tanker.required = Math.floor( this.totalEnergyAtSources/tankersPerX )
        if(this.workforce_quota.rkeeper.required===0 && this.workforce_quota.tanker.required ===0){
            // at low RCL we always need 1 to do filling
            this.workforce_quota.tanker.required = 1;
        }

        let tankerGap = this.workforce_quota.tanker.required - this.workforce_quota.tanker.count;
        if(this.upgradeRate===RATE_VERY_FAST && this.workforce_quota.upgrader.count===0 && tankerGap>5){
            // paused tanker spawn spam to spawn some consumption. stop e piling up at controller
            this.workforce_quota.tanker.required = this.workforce_quota.tanker.count;
        }

        this.workforce_quota.upgrader.required = 0;
        if(controller.haveContainer()){
            if(this.upgradeRate===RATE_VERY_FAST && Game.cpu.bucket>5000){

                let thresholds= {
                    999999:9,
                    4000:8,
                    3000:7,
                    2000:6,
                    1800:5,
                    1500:4,
                    1000:3,
                    500:2,
                    0:1
                };
                for(let energy in thresholds){
                    if( this.energyAtController <= energy){
                        this.workforce_quota.upgrader.required = thresholds[energy];
                        break;
                    }
                }
                if(this.controller().level>=4 &&this.workforce_quota.upgrader.required===9){
                    // need to leave open space to container for rkeeper
                    this.workforce_quota.upgrader.required=8;
                }
            }

            else if(this.upgradeRate===RATE_FAST && Game.cpu.bucket>5000){
                let thresholds= {
                    999999:5,
                    2000:5,
                    1800:4,
                    1000:3,
                    500:2,
                    0:1,
                };
                for(let energy in thresholds){
                    if( this.energyAtController <= energy){
                        this.workforce_quota.upgrader.required = thresholds[energy];
                        break;
                    }
                }
            }

            else if(this.upgradeRate===RATE_SLOW && this.energySurplus>25000 && Game.cpu.bucket>3000){
                this.workforce_quota.upgrader.required = 1;
            }
            else if(this.upgradeRate===RATE_VERY_SLOW && controller.ticksToDowngrade<100000){
                this.workforce_quota.upgrader.required = 1;
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
    
    getSpawnBudget(){
        let capacity = Game.rooms[this.coreRoomName].energyCapacityAvailable;
        let stored = Game.rooms[this.coreRoomName].energyAvailable;
        return (this.inRecoveryMode)?stored: capacity;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Resource Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
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
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Setup Room Code
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    checkAndSetupStandingSpots(reset=false){
        if(!this.controller().getStandingSpot()||reset){
            this.setControllerStandingSpots();
            this.setSourceStandingSpots();
        }
    }
    
    setSourceStandingSpots(){
        
        for(let src of this.sources()){
            if(src.getStandingSpot())continue;
            let best = src.pos.findBestStandingSpots(this.anchor,1,3);
            src.setStandingSpot(best.containerSpot)
            src.setStandingSpots(best.standingSpots)   
        }
    }
    setControllerStandingSpots(renew=false){
        
        if(!renew && this.controller().getStandingSpot())return;
        
        let best = this.controller().pos.findBestStandingSpots(this.anchor,3,9);
        
        let sorted = [];
        let lpp = best.path[(best.path.length-2)];
        let entryPos = rp(lpp.x,lpp.y,best.containerSpot.roomName);
        for(let pos of best.standingSpots){
            if(pos.isEqualTo(best.containerSpot))
                sorted[0]=pos;
            else
                sorted[ best.containerSpot.getDirectionTo(pos) ] = pos;    
        }
        let chainLookup = {};
        chainLookup[TOP]=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,,BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,0];
        chainLookup[TOP_RIGHT]=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,0];
        chainLookup[RIGHT]=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,0];
        
        chainLookup[BOTTOM_RIGHT]=[BOTTOM_RIGHT,RIGHT,TOP_RIGHT,TOP,TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,0];
        chainLookup[BOTTOM]=[BOTTOM_RIGHT,RIGHT,TOP_RIGHT,TOP,TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,0];
        
        chainLookup[BOTTOM_LEFT]=[BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,0];
        chainLookup[LEFT]=[BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,0];
        
        chainLookup[TOP_LEFT]=[TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT,RIGHT,TOP_RIGHT,TOP,0];
        
        let chain = [];
        let start = best.containerSpot.getDirectionTo(entryPos);
        for(let i in chainLookup[start]){
            let dir = chainLookup[start][i];
            if( sorted[dir] )chain.push(sorted[dir])
            
        }
        this.controller().setStandingSpot(best.containerSpot);
        this.controller().setStandingSpots(chain);
        
        best.containerSpot.colourIn('red')
        for(let p in chain)chain[p].colourIn('yellow',0.5,p)
        for(let p of best.path)Game.rooms[best.containerSpot.roomName].visual.text('X',p.x,p.y);
        
    }
    

}
module.exports = RoomNode;
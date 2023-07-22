
module.exports = {
    
    buildRoomMeta: function(storage_id,  tower_ids, target_id, checkpoint){
        
        let storage = Game.getObjectById(storage_id);
        let storage_energy = 0;
        if(storage){
            storage_energy = storage.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        
        let towersWithEnergy=0;
        let totalTowerE=0;
        for(let id of tower_ids){
            let t = Game.getObjectById(id);
            if(t && t.store.getUsedCapacity(RESOURCE_ENERGY)>9){
                towersWithEnergy++;
                totalTowerE+=t.store.getUsedCapacity(RESOURCE_ENERGY);
                
            }
        }
        
        let enemies = Game.rooms[checkpoint.roomName].find(FIND_HOSTILE_CREEPS);
        
        return {
            target_id : target_id,
            tower_ids : tower_ids,
            towers_with_energy : towersWithEnergy,
            total_tower_energy : totalTowerE,
            storage_id : storage_id,
            storage_energy: storage_energy,
            checkpoint: checkpoint,
            enemyCreepNames: Object.keys(enemies)
        };    
    },
    
    run:function(){
        
        if(false){
            let attackRoomName = 'W37N55';
            let retreatRoom = 'W38N55';
            Game.getObjectById('63fd1ff656dfcecb6ce9893a').observeRoom(attackRoomName)
          /*  let towerIds = [
                '62708c8f71db87ac8e122932','625ac3629381340bad280953','625e9815ed19c525e65a2a20',
                '62c03ee34cf64f6e4ab9b4bb','62c04135eb38557717333bcb','62c043a61b0ea9fd9b02e81f'
                ];*/
            let attackers = ['Slammy','Punchy'];
            let drainerNames = ['Dr0','Dr1','Dr2'];
            //let drainerInRoomPosition = new RoomPosition(9,42,'W39N53'); // Where healers will try to gain a foothold, once towers are weakening

            let drainerBody = '5*1t1m + 20*1h1m';

            
            let roomData = this.buildRoomMeta(
                // enemy room storage id
                '60c5d2bf8c3ae22595eccc6c',
                // enemy tower ids
                [
                    '60d2bdf6803fd40f82ae79b2','60c5f184c47b9f221c044237','60c5e5113afdf1504680e989',
                    /*'62c03ee34cf64f6e4ab9b4bb','62c04135eb38557717333bcb','62c043a61b0ea9fd9b02e81f'*/
                ],
                // enemy room target id, to attack
                '60c5e5113afdf1504680e989',
                new RoomPosition(4,22,attackRoomName) // Where healers will try to gain a foothold, once towers are weakening
                );
            
            if(roomData.total_tower_energy < 500 || roomData.towers_with_energy<3){
                drainerBody = '5*1r1m + 20*1h1m';
            }

            if(Game.creeps['Dr0'])
            this.drainRoom4('Beta-2','Dr0',new RoomPosition(48,23,retreatRoom),drainerBody, drainerNames, attackers, roomData);
            if(Game.creeps['Dr1'])
            this.drainRoom4('Gamma','Dr1',new RoomPosition(48,24,retreatRoom),drainerBody, drainerNames, attackers, roomData);
            if(Game.creeps['Dr2'])
            this.drainRoom4('Beta-3','Dr2',new RoomPosition(48,25,retreatRoom),drainerBody, drainerNames, attackers, roomData);
            
            //if(false) 
            //if(Game.creeps['Slammy'])
            this.attackDuringDrain2('Epsilon-2','Slammy','20*1w1m + 1h1m',  new RoomPosition(47,25,retreatRoom), drainerNames, roomData, 100000);
            
        }

        //#####################################################################################
        // Alpha Tasks
        //#####################################################################################
        //Game.getObjectById('63fd23123e03b762409b458f').observeRoom('W37N55')

        //this.withdrawThenUpgrade('Alpha-2','Au0','5bbcaab49099fc012e632092','641a283114993359865ee78e','25W1C13M',true);
        if(Game.creeps['Ah0'])
        this.haulResources('Alpha-2','Ah0','10c1m',
            {id:'62aa920ea7c97303402bf116',pos:{x:29,y:23,roomName:'W42N53'}},
            {id:'6411a8a7530207f3c2206c75',pos:{x:15,y:22,roomName:'W42N53'}},
            [RESOURCE_ZYNTHIUM,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_UTRIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE],[],4000,3
            /*['W42N53','W42N52','W42N51','W43N51','W44N51','W44N50','W45N50','W46N50','W46N49']*/
            );


        //if(Game.creeps['Ah2'])
        
        //Game.getObjectById('63fd201ac38c3d21f3318244').observeRoom('W46N49')
        /*this.haulResources('Alpha-2','Ah2','1*1m1c',
            {id:'60c90cef9891318f82fa19dd',pos:{x:29,y:23,roomName:'W46N49'}},
            {id:'62aa920ea7c97303402bf116',pos:{x:15,y:22,roomName:'W42N53'}},
            [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_LEMERGIUM_OXIDE],
            ['W42N53','W42N52','W42N51','W43N51','W44N51','W44N50','W45N50','W46N50','W46N49'],4000,1,50);*/
          
          
        //#####################################################################################
        // Beta Tasks
        //##################################################################################### 
        if(Game.creeps['Bh0'])
        this.haulResources('Beta-2','Bh0','10c5m',
            {id:'62c33586215eb2917a2ec866',pos:{x:29,y:23,roomName:'W41N53'}},
            {id:'6411a7ac505b0153911cd744',pos:{x:15,y:22,roomName:'W41N53'}},
            [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_LEMERGIUM_OXIDE,RESOURCE_ZYNTHIUM,RESOURCE_ENERGY],[],2000,3
            /*['W42N53','W42N52','W42N51','W43N51','W44N51','W44N50','W45N50','W46N50','W46N49']*/
            );

        this.withdrawThenUpgrade('Beta-2','Bu0','644253fa841862f67beae187','5bbcaac09099fc012e63221b','25W1C13M',true);
        //this.streamResource('W41N53','Beta-2','Bh0','10m20c','W42N52',RESOURCE_ENERGY,600000,200000);
        
         // WARNING!! make sure to stagger spawning of the 2 farmers so that farmer2 doesn't stand on the fucking container...
        //this.farmStructureAtSpot('Beta-2','Bf0',['62bf037f0587444bb13f00ec','62bf1803f563676f1ee1f835','6114a60e6a8b8864aa038b9b'],new RoomPosition(20,45,'W41N53'),'20W10M');
        //if(Game.creeps['Bf1'])this.farmStructureThenTransfer('Beta-3','Bf1',['6114a611b9da09939f47865a','62bf037f0587444bb13f00ec','6114a60e6a8b8864aa038b9b'],'6436bf9497788e5d9c41ab02','20W10M1C');
        
        
        //#####################################################################################
        // Gamma Tasks
        //##################################################################################### 
        //this.farmStructureAtSpot('Gamma','Gf0',['62dabb5adfb12c8f956e593d','62dabb543b5505095d6b70ae','62dabb4efa004b0d16eb9658'],new RoomPosition(26,26,'W42N54'),'20W10M');
        //this.farmStructureThenTransfer('Gamma','Gf1',['62dabb609eb2a2a6cbb5aabf','62dabb5adfb12c8f956e593d'],'6436c022de83ada3ddf9d1c2','20W10M1C');
        
        //if(Game.creeps['Gh0'])
        //this.streamResource('W42N54','Gamma','Gh0','1m20c','W42N52',RESOURCE_ENERGY,450000,100000);

        //#####################################################################################
        // Delta Tasks
        //##################################################################################### 

        //this.manageReactions('Delta-2','DL0');
        
        
        //#####################################################################################
        // Epsilon Tasks
        //#####################################################################################    
        // ,,RESOURCE_HYDROGEN,,RESOURCE_HYDROXIDE,,,
        let resourcesFromW37N55= [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_UTRIUM,RESOURCE_GHODIUM,
        RESOURCE_UTRIUM_LEMERGITE,RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_HYDROXIDE,RESOURCE_HYDROGEN,RESOURCE_OXYGEN,RESOURCE_LEMERGIUM,RESOURCE_LEMERGIUM_OXIDE];    
        if(Game.creeps['Eh0'])
        this.haulResources('Epsilon-2','Eh0','2*1m1c',
            {id:'60c5d2bf8c3ae22595eccc6c',pos:{x:17,y:24,roomName:'W37N55'}},
            {id:'641492dc152e5bfd96b18ffe',pos:{x:29,y:34,roomName:'W41N54'}},
            resourcesFromW37N55,['W41N54','W40N54','W40N55','W39N55','W38N55','W37N55'],4000,200,100);
       
        //this.startupNewRoom('W39N55','643b0920affb4c600132bd99','Epsilon-2',2);
        
        //#####################################################################################
        // Zeta Tasks
        //#####################################################################################        
        // Game.getObjectById('63fd2138d36cbbcfce799043').observeRoom('W46N53');
        if(Game.creeps['Za1'])
        this.killCreepsBreakTarget('Zeta-2','Za1','W46N53','10a10m','643c6c746a171c53def673ed');
        
        let controller = Game.getObjectById('5bbcaa839099fc012e63185b');
        
        //if(Game.cpu.bucket>4500)this.startupNewRoom('W45N51','63fd23123e03b762409b458f','Zeta-2',1,false,false,false,false,false);
        
        
        
        //#####################################################################################
        // Eta Tasks
        //#####################################################################################   
        if(Game.creeps['bob'])
        this.haulResources('Eta','bob','15*1m1c',
            {id:'63ba19f0cbff1696ad5af96f',pos:{x:20,y:11,roomName:'W47N52'}},
            {id:'64425880602ae58a941fdc18',pos:{x:12,y:40,roomName:'W46N53'}},
            [RESOURCE_ENERGY],[],3000);
        if(Game.creeps['bob2'])
        this.haulResources('Eta','bob2','15*1m1c',
            {id:'63ba19f0cbff1696ad5af96f',pos:{x:20,y:11,roomName:'W47N52'}},
            {id:'64425880602ae58a941fdc18',pos:{x:12,y:40,roomName:'W46N53'}},
            [RESOURCE_ENERGY],[],2500);    
        //#####################################################################################
        // Theta Tasks
        //#####################################################################################     
        //if(Game.creeps['Th0'])
        this.haulResources('Theta-2','Th0','15*1c1m',
            {id:'60c90cef9891318f82fa19dd',pos:{x:29,y:23,roomName:'W46N49'}},
            {id:'64461441034ca322eab680e7',pos:{x:10,y:13,roomName:'W45N51'}},
            [RESOURCE_ENERGY],
            /*['W45N51','W46N51','W46N50','W46N49']*/[]
            ,3000,200 // round-trip=220, so die at age=200
            );
        this.haulResources('Theta-2','Th1','15*1c1m',
            {id:'60c90cef9891318f82fa19dd',pos:{x:29,y:23,roomName:'W46N49'}},
            {id:'64461441034ca322eab680e7',pos:{x:10,y:13,roomName:'W45N51'}},
            [RESOURCE_ENERGY],
            /*['W45N51','W46N51','W46N50','W46N49']*/[]
            ,5000,200 // round-trip=220, so die at age=200
            );

        //#####################################################################################
        // Misc Tasks
        //##################################################################################### 
        
        
       
        //this.killCreepsBreakTarget('Zeta-2','Za0','W45N51','10a10m','64381ffe7a23b437cbd2d3f7');


        
        if(Game.creeps['Ws0'])this.breakStructure('Epsilon-2','Ws0',{id:'64174b510ae5d44ed9ab0f26',pos:{x:31,y:39,roomName:'W39N55'}},'10w10m')
        //this.breakStructure('Zeta','Zs0',{id:'64381ffe7a23b437cbd2d3f7',pos:{x:13,y:20,roomName:'W45N51'}},'1a1m');
        //this.breakStructure('Zeta-2','Zs1',{id:'6436571ae85b2c4427e3a515',pos:{x:3,y:28,roomName:'W46N53'}},'10w10m');
        //if(Game.creeps['bob'])this.moveWall('Epsilon','bob','63eb45fe8e3d19220e24319f','6400ba11affb4cf2732032c9','25W13M1C');
        


      //  this.buildSite('Beta-2','B2-Bu-1',{x:22,y:14,roomName:'W41N55'},{x:21,y:15,roomName:'W41N55'})

       // this.claimRoom('Zeta-2','Zc0',{id:'5bbcaa939099fc012e631aa9',pos:{x:36,y:23,roomName:'W45N51'}});
    },
    
    manageReactions: function(spawnName,cname){
        
        let creepBody = '5m10c';
        let storage_id= '62ebc781adeadd4d4a9f5c6e';
        let terminal_id= '641612502f446e5673be75ab';
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(creepBody,cname,{memory:{target:false}});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
           let creep = Game.creeps[cname];

           let targetAtStart=(creep.memory.target);
           
            this.manageLabTrio(creep,
            {
                target:{id:'642abd12570b2681989973ec',resource_type:RESOURCE_UTRIUM_HYDRIDE, put_in_id:terminal_id},
                sources:[
                    {id:'642ad130b7fc7d0b37cc3590',resource_type:RESOURCE_UTRIUM, draw_from_id:storage_id},
                    {id:'642aad62fa8f7caebbb43046',resource_type:RESOURCE_HYDROGEN, draw_from_id:storage_id}
                    ]
            });

            this.manageLabTrio(creep,
            {
                target:{id:'642b202af0dd450118d7ae6f',resource_type:RESOURCE_ZYNTHIUM_HYDRIDE, put_in_id:terminal_id},
                sources:[
                    {id:'642aeba5ef98ae31d1479ce2',resource_type:RESOURCE_ZYNTHIUM, draw_from_id:storage_id},
                    {id:'642b08bee25b4226afc7e872',resource_type:RESOURCE_HYDROGEN, draw_from_id:storage_id}
                    ]
            });
   
            // do we have space in storage, for deliveries?
            if(!creep.memory.target && Game.getObjectById(storage_id).store.getFreeCapacity(RESOURCE_ENERGY)>0){
                
                if(Game.getObjectById(terminal_id).store.getUsedCapacity(RESOURCE_HYDROGEN)>0){
                    creep.memory.target = {id:terminal_id,resource_type:RESOURCE_HYDROGEN,put_in_id:storage_id};
                    creep.memory.target.dir = 'empty';
                }
                else if(Game.getObjectById(terminal_id).store.getUsedCapacity(RESOURCE_ZYNTHIUM)>0){
                    creep.memory.target = {id:terminal_id,resource_type:RESOURCE_ZYNTHIUM,put_in_id:storage_id};
                    creep.memory.target.dir = 'empty';
                }
            }
            /*
            if(!creep.memory.target && Game.getObjectById(storage_id).store.getFreeCapacity(RESOURCE_ENERGY)>0){
                let drop = creep.getDroppedResource(RESOURCE_UTRIUM_HYDRIDE)
                
                if(drop){
                     return creep.actOrMoveTo('pickup',drop,RESOURCE_UTRIUM_HYDRIDE);
                }
            }*/
 
            if(creep.memory.target){
            
                if(creep.memory.target.dir == 'fill'){
                    this.haulResources(spawnName,cname,creepBody,
                    {id:creep.memory.target.draw_from_id,pos:{x:1,y:1,roomName:'W41N55'}},
                    {id:creep.memory.target.id,pos:{x:1,y:1,roomName:'W41N55'}},
                    [creep.memory.target.resource_type]);
                    
                    if(targetAtStart && creep.store.getUsedCapacity(creep.memory.target.resource_type)>0 ){
                       
                        creep.memory.pickedUp = true;
                    }
                    
                    if(creep.memory.pickedUp && creep.pos.isNearTo( Game.getObjectById(creep.memory.target.id) ) && creep.store.getUsedCapacity(creep.memory.target.resource_type)===0 ){
                        creep.memory.target = false;
                        creep.memory.pickedUp = false;
                    }
                }
                if(creep.memory.target.dir == 'empty'){
                    this.haulResources(spawnName,cname,creepBody,
                    {id:creep.memory.target.id,pos:{x:1,y:1,roomName:'W41N55'}},
                    {id:creep.memory.target.put_in_id,pos:{x:1,y:1,roomName:'W41N55'}},
                    [creep.memory.target.resource_type]);
                    
                    if(targetAtStart && creep.store.getUsedCapacity(creep.memory.target.resource_type)>0 ){
                       
                        creep.memory.pickedUp = true;
                    }
                    if(creep.memory.pickedUp && creep.pos.isNearTo( Game.getObjectById(creep.memory.target.put_in_id) ) && creep.store.getUsedCapacity(creep.memory.target.resource_type)===0 ){
                        creep.memory.target = false;
                        creep.memory.pickedUp = false;
                    }
                }
                
            }
            
            if(!creep.memory.target){
               creep.moveTo(new RoomPosition(17,21,'W41N55')) 
            }
          
        }
        
    },
    
    manageLabTrio: function(creep,labConfig){

        
        let reactor = Game.getObjectById(labConfig.target.id);
        let input0 = Game.getObjectById(labConfig.sources[0].id);
        let input1 = Game.getObjectById(labConfig.sources[1].id);
        
        if(!creep.memory.target){
            //clog('no target')
            if(reactor.store.getUsedCapacity(labConfig.target.resource_type)> creep.store.getFreeCapacity(labConfig.target.resource_type) ){
                //clog(labConfig.target.resource_type,'target found')
                creep.memory.target = labConfig.target;
                creep.memory.target.dir = 'empty';
            }else if(input0.store.getUsedCapacity(labConfig.sources[0].resource_type) < (3000-creep.store.getFreeCapacity(labConfig.sources[0].resource_type)) ){
                //clog(labConfig.sources[0].resource_type,'target found')
                creep.memory.target = labConfig.sources[0];
                creep.memory.target.dir = 'fill';
            }else if(input1.store.getUsedCapacity(labConfig.sources[1].resource_type) < (3000-creep.store.getFreeCapacity(labConfig.sources[1].resource_type)) ){
                //clog(labConfig.sources[1].resource_type,'target found')
                creep.memory.target = labConfig.sources[1];
                creep.memory.target.dir = 'fill';
            }
        }
        
        if(reactor.cooldown==0){
            reactor.runReaction(input0 , input1  );
        }
         
    },
    
    // send a resource in chunks of X from roomA to RoomB. Mainly for feeding energy
    streamResource: function(srcRoomName,spawnName,creepName,bodyPlan,targetRoomName,resource_type,startAt=600000,stopAt=50000,batchSize=20000){
        
        let storage = mb.getStorageForRoom(srcRoomName);
        let terminal = mb.getTerminalForRoom(srcRoomName);
        let sendEnergyCost = 5000;

        if(storage.getMeta().streaming && storage.storingLessThan(stopAt,resource_type)){
            clog(storage.id+'='+storage.store.getUsedCapacity(resource_type),'streaming OFF setting:'+srcRoomName)
            storage.setMetaAttr('streaming',false);
        }
        if(!storage.getMeta().streaming && storage.storingAtleast(startAt,resource_type)){
            clog(storage.id+'='+storage.store.getUsedCapacity(resource_type),'streaming ON setting:'+srcRoomName)
            storage.setMetaAttr('streaming',true);
        }
        
       // Game.creeps[creepName].say(stopAt)
        // we may need to stop piping data and set how much to always leave in the storage
        if( storage.getMeta().streaming ){
            //clog('on')
            // when we have enough to send, then pip over the batch
            if(terminal.storingAtleast(batchSize,resource_type) && terminal.storingAtleast(sendEnergyCost,RESOURCE_ENERGY)){
                terminal.send(resource_type, batchSize, targetRoomName) ;
             }   
              this.haulResources(spawnName, creepName, bodyPlan, storage, terminal, [resource_type] );
            
        }

    },
    // manage config, for moving resources to & from terminal and moving them to a room store
    manageDeliveriesAndExports: function(){},
    
    // move a fixed amount of a resource into the terminal, ready to send off
    haulFromStorageToTerminal: function(spawnName,cname,resource_type,amount){
        let roomName = Game.spawns[spawnName].pos.roomName;
        let storage = mb.getStorageForRoom(roomName);
        let terminal = mb.getTerminalForRoom(roomName);
        let creep = Game.creeps[cname];
        // only transfer the specified amount, then stop
        if(terminal.storingAmount(resource_type)<amount || (creep && creep.storingAtleast(1,resource_type)) || amount==undefined){
            this.haulResources(spawnName,cname,'1m20c',storage,terminal,[resource_type]);
        }
    },
    haulResources:function(spawnName,cname,parts,sourceStore,targetStore,resource_types,roomTraversal=[],cpuBucketBreak=4000,tickToLiveTo=1,minDrawSize=1){
        
        let creep = Game.creeps[cname]?Game.creeps[cname]:false;
        let resource_type = false;
        let drawFromTarget = Game.getObjectById(sourceStore.id);
        
        // id we don't have an observer on the room, then just default to first in array.
        // if you want hauler to stop when no resources left, then need to see the other room
        if(!Game.rooms[sourceStore.pos.roomName])resource_type=resource_types[0];
    
        for(let r of resource_types){
            if(creep && creep.store.getUsedCapacity(r)>0){
                resource_type = r;
                break;
            }
            if(drawFromTarget && drawFromTarget.storingAtleast(minDrawSize,r)){
                resource_type = r;
                break;
            }
        }
        //creep.say(resource_type)
        //clog(resource_type)
        if(!resource_type)return;
        
        //if(tickToLiveTo===3)clog(resource_type,'yo')
        if(!Game.creeps[cname] && Game.cpu.bucket>cpuBucketBreak ){
            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning ){

            if(creep.ticksToLive<tickToLiveTo && creep.storingLessThan(1,resource_type)){
                creep.suicide();
            }

            if(creep.store.getUsedCapacity(resource_type)==0){
                creep.say("W:"+resource_type);
                if(roomTraversal.length>0 && creep.pos.roomName!=sourceStore.pos.roomName){
                    this.traverseRooms(creep,roomTraversal);
                }else{
                    let res = this.actOrMove2(creep,sourceStore,"withdraw",resource_type);
                    creep.say("w:"+res);
                }
                
            }else{
               // clog(targetStore)
                
                if(targetStore.id=='creep'){
                    let rp = new RoomPosition(targetStore.pos.x,targetStore.pos.y,targetStore.pos.roomName);
                    let creeps = rp.lookFor(LOOK_CREEPS);
                    if(creeps.length>0){
                        targetStorage.id = creeps[0].id;
                    }
                }
                
                if(roomTraversal.length>0 && creep.pos.roomName!=targetStore.pos.roomName){
                    
                    let res = this.traverseRooms(creep,roomTraversal.reverse());
                    creep.say("t:"+resource_type.charAt(0)+":"+res);
                }else{
                      let res =  this.actOrMove2(creep,targetStore,"transfer",resource_type);
                      if(res==-2){
                          delete creep.memory._move;
                      }
                      creep.say("t:"+res);
                }
                
            }


        }
    },
    
    // ############################################################################################
    // Starting a new room functions
    // ############################################################################################
    
    startupNewRoom: function(roomName,observer_id,spawnName,workerCount=1,drawFromRuins=false,drawFromStructures=false,harvestSources=true,farmFromStructures=false,buildUpSites=false){
        
        Game.getObjectById(observer_id).observeRoom(roomName);
        if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
        
        
        let room = Game.rooms[roomName];
        let container_ids=[];
        let dismantle_ids=[];
        let repair_ids = [];
        if(room){
            
            // Firstly, lets go make a claim on the room
            if(!room.controller.owner){
                this.claimRoom(spawnName,roomName+'-cl',{id:room.controller.id,pos:{x:room.controller.pos.x,y:room.controller.pos.y,roomName:roomName}});
            }
            if(farmFromStructures){
                let structures = mb.getStructures({
                    roomNames:[roomName],
                    types:[STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_STORAGE],
                    filters:[{attribute:'isEmpty',operator:'fn',value:[]}]
                    
                });
                for(let obj of structures)dismantle_ids.push(obj.id);
            }

            // if there are RUINs then do we want to draw on their energy?
            if(drawFromRuins){
                let ruins = room.find(FIND_RUINS);
                
                for(let r in ruins){
                    if(ruins[r].store.getUsedCapacity(RESOURCE_ENERGY)>0){
                        container_ids.push(ruins[r].id);
                    }
                }
            }
            if(drawFromStructures){
                let structures = mb.getStructures({
                    roomNames:[roomName],
                    // doesn't play well once you start building own stuff. designed to steal other users stuff
                   /* types:[STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_STORAGE],*/
                     types:[STRUCTURE_STORAGE],
                    filters:[{attribute:'storingAtleast',operator:'fn',value:[1]}]
                    
                });
                if(structures.length>0)container_ids.push(structures[0].id);
                 
            }
            
            
            // now lets set up the harvesters and register and mine stores
            if(harvestSources){
                let sources  = mb.getAllSourcesForRoom(roomName);
                for(let s in sources){
                    this.harvestPoint(spawnName,roomName+'-h'+s,'6w6m1c',sources[s].id);
                    let srcCont = sources[s].getContainer();
                    if(srcCont && srcCont.storingAtleast(50))container_ids.push(srcCont.id);
                } 
            }
            
            if(buildUpSites){
                let walls = mb.getStructures({
                    roomNames:[roomName],
                     types:[STRUCTURE_RAMPART,STRUCTURE_WALL],
                    filters:[{attribute:'hits',operator:'<',value:[50000]}]
                });
                if(walls.length>0)repair_ids.push(walls[0].id);
                
                let roads = mb.getStructures({
                    roomNames:[roomName],
                     types:[STRUCTURE_ROAD],
                    filters:[{attribute:'hits',operator:'<',value:[4000]}]
                });
                if(roads.length>0)repair_ids.push(roads[0].id);
                 
            }
            

            // now lets deploy the works to draw from all containers
            if(container_ids.length>0){
                
                for(let c=0; c < workerCount;c++){
                    let bodyPlan = '10w15m5c';
                    let creepName = roomName+'-w'+c;
                    if(dismantle_ids.length>0){
                        
                         let id = dismantle_ids[c]?dismantle_ids[c]:dismantle_ids[0];
                         this.farmStructureThenUpgrade(spawnName,creepName,bodyPlan,id,room.controller.id)
                    }else{
                        let id = container_ids[c]?container_ids[c]:container_ids[0];
                        
                        let container = Game.getObjectById(id);
                        let conSite = mb.getNearestConstruction(container.pos, [roomName]);
                        
                        if(buildUpSites  && (conSite || repair_ids.length>0)){
                            if(repair_ids.length>0){
                                this.withdrawThenRepair(spawnName,creepName,id,repair_ids[0],bodyPlan);
                            }else{
                                this.withdrawThenBuild(spawnName,creepName,id,conSite.id,bodyPlan);
                            }
                            
                        }else{
                    
                            this.withdrawThenUpgrade(spawnName,creepName,id,room.controller.id,bodyPlan);
                        }
                        
                    }
                    
                }  
            }
  
                
        } 
        
    },
    
    // designed to harvest a source, but first build a container to drop into,then pickup E at feet
    harvestPoint:function(spawnName,cname,bodyPlan,source_id){
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
        //clog(targeSource)
            
            let source =  Game.getObjectById(source_id)
            //clog(source)
            creep.say(creep.actOrMoveTo('dropHarvest',source))

        }
    },
    

    // tin-ses
    claimRoom:function(spawnName,cname,target,bodyPlan='1clm'){
        
        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            
            if(controller && controller.reservation && controller.reservation.username!='MadDokMike'){
                 this.actOrMove2(creep,target,"attackController");
            }
            else if(controller && (!controller.sign || (controller.sign &&  controller.sign.username!='MadDokMike') ) ){
                this.actOrMove2(creep,target,'signController',"R.I.P tiny humans.");
            }else{
                this.actOrMove2(creep,target,"claimController");
            }
        }
    },

    enslaveRoom:function(spawnName,cname,target,bodyPlan='1clm'){
        
        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            this.actOrMove2(creep,target,'signController',"Vassal 001.");
           
        }
    },

    emptyOutOldStoresAndUpgrade: function(spawnName,cname,roomName,bodyPlan){
        
        let room = Game.rooms[roomName]
        if(!Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(creep.pos.roomName === roomName){
                
                let ruins = room.find(FIND_RUINS);
                let container_id = '';
                for(let r in ruins){
                    if(ruins[r].store.getUsedCapacity(RESOURCE_ENERGY)>0){
                       
                        container_id = ruins[r].id;
                        break;
                    }
                }
                
                if(!container_id){
                   let obj = mb.getNearestStructure(
                        creep.pos,
                        [STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_SPAWN,STRUCTURE_CONTAINER],
                        [roomName],
                        [{attribute:'storingAtleast',operator:'fn',value:[1]}]);
                    
                    if(obj){
                        container_id = obj.id;
                    }
                }
                this.withdrawThenUpgrade(spawnName,cname,container_id,room.controller.id,bodyPlan);
                
            }else{
                creep.moveOffRoomEdge();
                creep.moveToPos(new RoomPosition(25,25,roomName));
            }
        }
        
    },
    withdrawThenBuild: function(spawnName,cname,container_id,site_id,parts){
         let site = Game.getObjectById(site_id);
        let container = Game.getObjectById(container_id);
        if(container && site && !Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname,{spawn_name:spawnName});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.say('b:')
            creep.checkAndUpdateState();
            
            if(creep.isWorking()) {
                
                if(site){
                    creep.say(creep.actOrMoveTo('build',site));
                }
                
            }else if(creep.isCollecting()) {
                
                 if(container){
                    creep.say(creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY));
                }
            }
        }
    },
    withdrawThenRepair: function(spawnName,cname,container_id,target_id,parts){
         let target = Game.getObjectById(target_id);
        let container = Game.getObjectById(container_id);
        if(container && target && !Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname,{spawn_name:spawnName});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.say('r:')
            creep.checkAndUpdateState();
            
            if(creep.isWorking()) {
                
                if(target){
                    creep.say(creep.actOrMoveTo('repair',target));
                }
                
            }else if(creep.isCollecting()) {
                
                 if(container){
                    creep.say(creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY));
                }
            }
        }
    },
    withdrawThenUpgrade: function(spawnName,cname,container_id,controller_id,parts,turbo=false){
         let container = Game.getObjectById(container_id);
        if(!container){
            clog(container_id,cname+' missing container')
            return;
        }
        if(container && !Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname,{spawn_name:spawnName});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.checkAndUpdateState();
            creep.say('u')
            if(creep.isWorking()) {
                
               let controller = Game.getObjectById(controller_id);
               
                if(!creep.pos.isEqualTo(container)){
                   // creep.moveTo(container);
                }
                if(controller){
                    if(turbo)creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
                    creep.actOrMoveTo('upgradeController',controller);
                }
                
            }else if(creep.isCollecting()) {
                
                 if(container){
                    creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
                }
            }
        }
    },
    
    // ############################################################################################
    // Generic energy farming & act functions
    // ############################################################################################
    
    // dismantle a structure then use the energy to repair a structure
    farmStructureThenRepair: function(spawnName,cname,bodyPlan,dismantle_id,repair_id){
         let dismantleTarget = Game.getObjectById(dismantle_id);
        if(dismantleTarget && !Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.checkAndUpdateState();
            
            if(creep.isWorking()) {
               let repairTarget = Game.getObjectById(repair_id);
                if(repairTarget){
                    creep.actOrMoveTo('repair',repairTarget);
                }
                
            }else if(creep.isCollecting()) {
                
                 if(dismantleTarget){
                    if(dismantleTarget.isNotMarkedForDismantle())dismantleTarget.markForDismantling();
                    creep.actOrMoveTo('dismantle',dismantleTarget);
                }
            }else{
                creep.goWork();
            }
            


        }
       
    },
    // dismantle a structure then use the energy to upgrade a controller
    farmStructureThenUpgrade: function(spawnName,cname,bodyPlan,dismantle_id,controller_id){
        let dismantleTarget = Game.getObjectById(dismantle_id);
        if(dismantleTarget && !Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.checkAndUpdateState();
            creep.say('f')
            if(creep.isWorking()) {
               let controller = Game.getObjectById(controller_id);
                if(controller){
                    creep.actOrMoveTo('upgradeController',controller);
                }
                
            }else if(creep.isCollecting()) {
                
                 if(dismantleTarget){
                    if(dismantleTarget.isNotMarkedForDismantle())dismantleTarget.markForDismantling();
                    creep.actOrMoveTo('dismantle',dismantleTarget);
                }
            }else{
                creep.goWork();
            }
        }
    },
    
    // dismantle a structure at a specific position then drop the energy 
    farmStructureAtSpot: function(spawnName,cname,old_wall_ids,spot,parts){
        let oldWall=false;
        for(let old_wall_id of old_wall_ids ){
             oldWall = Game.getObjectById(old_wall_id);
             if(oldWall)break;
        }
         
        if(oldWall && !Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname,{spawn_name:spawnName});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
           let blobs = creep.pos.lookFor(LOOK_ENERGY);
            if(blobs.length>0)
                creep.act("pickup",blobs[0]);

            if(creep.pos.isEqualTo(spot)){
                if(oldWall){
                    if(oldWall.isNotMarkedForDismantle())oldWall.markForDismantling();
                    creep.actOrMoveTo('dismantle',oldWall);
                }  
            }else{
                creep.moveTo(spot);
            }    
        }
       
    },
    
    // dismantle a structure then transfer the energy to an object with store
    farmStructureThenTransfer: function(spawnName,cname,old_wall_ids,transfer_id,parts){

         let oldWall=false;
        for(let old_wall_id of old_wall_ids ){
             oldWall = Game.getObjectById(old_wall_id);
             if(oldWall)break;
        }
         
         let objWithStore = Game.getObjectById(transfer_id);
        if(oldWall && objWithStore && !Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname,{spawn_name:spawnName});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
                        
            let blobs = objWithStore.pos.lookFor(LOOK_ENERGY);
            if(blobs.length>0)
                creep.act("pickup",blobs[0]);
            

            if(creep.store.getFreeCapacity(RESOURCE_ENERGY)==0) {

               
                if(objWithStore){
                    creep.actOrMoveTo('transfer',objWithStore,RESOURCE_ENERGY);
                }
                
            }else {

                 if(oldWall){
                    if(oldWall.isNotMarkedForDismantle())oldWall.markForDismantling();
                    creep.actOrMoveTo('dismantle',oldWall);
                }
            }
            


        }
       
    },
    
    // ############################################################################################
    // Generic temp functions used in many functions
    // ############################################################################################
    
    // when a target is far away, provide a bridging travel function, to avoid crazy CPU on moveTo pathfinding
    traverseRooms:function(creep,roomNames){
        
        let curr=-1;
        for(let i in roomNames){
            if(creep.pos.roomName===roomNames[i]){
                curr = (1*i);break;
            }
        }
        // IF curr=-1, then it becomes 0 and we move to the first room
        // IF curr+1 references a valid next room, then we try to move to that room
        // IF we don't get a room, then we assume we are at the end.
        let next = curr+1;
        console.log(creep.pos)
        console.log(roomNames[next])
        creep.moveOffRoomEdge();
        if(roomNames[next]){
            let res = creep.moveToPos(new RoomPosition(25,25,roomNames[next]));
            //creep.say(res);
            return res;
        }else{
            return 200;
        }
    },
    
    // act or move to an object plan, assuming we may not have sight of the room
    actOrMove2: function(creep,target,action,param2){
        creep.moveOffRoomEdge();
       // if(creep.name=='bob'){clog("in-room:"+creep.pos.roomName,'target-room:'+target.pos.roomName);}
        if(creep.pos.roomName===target.pos.roomName){
            let targetObj = Game.getObjectById(target.id);
            if(targetObj){
                let res = creep[action](targetObj,param2)
                //creep.say(param2)
                if(res ===ERR_NOT_IN_RANGE){
                    //creep.moveOffRoomEdge()
                    //creep.say('yo')
                    res= creep.moveToPos(targetObj);
                    //creep.say(res)
                    //if(creep.name=='bob')clog(targetObj,'in-room:'+res);
                    return res;
                }
                return res;
            }else{
                creep.say("404 fok");
                return -404;
            }

        }else{
            let pos = new RoomPosition(target.pos.x,target.pos.y,target.pos.roomName);
            
            //creep.moveOffRoomEdge();
           // let res = creep.move(TOP_RIGHT)
            let res = creep.moveTo(pos);
            
           // creep.say(res)
            //if(creep.name=='bob')clog(creep.pos,'out-room:'+res);
            return res;
            
        }
        
    },

    // ############################################################################################
    // Atack room functions
    // ############################################################################################
    
    breakStructure:function(spawnName,cname,targetWall,parts){
        if(!Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            this.actOrMove2(creep,targetWall,"dismantle");


        }
    },
    
    killCreepsBreakTarget:function(spawnName,cname,roomName,parts,target_id){
        if(!Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.say('mv:'+roomName)
            if(creep.pos.roomName===roomName){
                
                var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    	        let dist = 99999;
    	        let closest = false;
    	        for(var ref in hostiles){
    	            let range = creep.pos.getRangeTo(hostiles[ref]);
    	            
    	            if(range<dist){
    	                dist = range;
    	               // closest = hostiles[ref];
    	            }
    	        }
    	        if(closest){
    	            //creep.say('crep')
    	            creep.actOrMoveTo('attack',closest);
    	            creep.actOrMoveTo('rangedAttack',closest);
    	        }else{
    	            let target =Game.getObjectById(target_id);
    	            //creep.say('trgt')
    	            creep.moveOffRoomEdge();
    	             creep.actOrMoveTo('attack',target);
    	             creep.actOrMoveTo('rangedAttack',target);
    	        }
                
                
            }else{
                
                creep.moveOffRoomEdge();
                creep.moveTo(new RoomPosition(25,25,roomName))
            }
            


        }
    },
    
    quadAttack: function(spawnNames,stagingRoomPos,stagingRoomPos2,target,approach2Dir){

        let healerBody = [];
        let attackerBody = [];
        for(let c=0;c<15;c++){
            attackerBody.push(WORK);attackerBody.push(MOVE);
        }
        for(let c=0;c<10;c++){
            attackerBody.push(MOVE);
        }
        for(let c=0;c<10;c++){
            attackerBody.push(HEAL);
        }

        for(let c=0;c<25;c++){
            healerBody.push(MOVE);
        }
        for(let c=0;c<25;c++){
            healerBody.push(HEAL);
        }

        if(!Memory.attackStage){Memory.attackStage = 'recruiting'}
        
        

        if(Memory.attackStage==='recruiting'){
            console.log(spawnNames)
            console.log(attackerBody.length)
            console.log(healerBody.length)
            if(!Game.creeps['Q1A']){
                
                let res = Game.spawns[spawnNames[0]].spawnCreep(attackerBody,'Q1A',{quad_role:'attacker',stage:'approach'});
                clog(res,spawnNames[0]);
            }
            if(!Game.creeps['Q1H']){
                let res = Game.spawns[spawnNames[1]].spawnCreep(healerBody,'Q1H',{quad_role:'healer'});
                clog(res,spawnNames[1]);
            }
            if(!Game.creeps['Q2H']){
                let res = Game.spawns[spawnNames[2]].spawnCreep(healerBody,'Q2H',{quad_role:'healer'});
                clog(res,spawnNames[2]);
            }
            if(!Game.creeps['Q3H']){
                let res = Game.spawns[spawnNames[3]].spawnCreep(healerBody,'Q3H',{quad_role:'healer'});
                clog(res,spawnNames[3]);
            }
            
             // have we built every creep ?
            let built =0;
            for(let cname of ['Q1A','Q1H','Q2H','Q3H']){
                if( Game.creeps[cname]!==undefined && !Game.creeps[cname].spawning ){
                    built++;
                }
            }
            
            if(Game.flags['staging1']){
                Game.flags['staging1'].remove()
            }
            clog(built,'built');
            if(built==4){
                Memory.attackStage='approach';
                if(!Game.flags['staging1']){
                    stagingRoomPos.createFlag('staging1')
                }
                        
            }
        }

        
        
        
        if(Game.creeps['Q1A'] && !Game.creeps['Q1A'].spawning){
            let creep = Game.creeps['Q1A'];
            
            creep.memory.direction = "pause";
            
            let wounds = creep.hitsMax - creep.hits;
            
            if(wounds!==0 && wounds < (creep.hitsMax/2)){
                clog(wounds,"attacker-wounds")
                creep.say('ow ow');
                creep.heal(creep);
            }
                
            if(Memory.attackStage =='approach'){
                

                creep.say(creep.pos.isEqualTo(stagingRoomPos))
                if(!creep.pos.isEqualTo(stagingRoomPos)){
                    creep.moveOffRoomEdge();
                    let res = creep.moveToPos(stagingRoomPos);
                    creep.say(res)
                }else{ 
                    
                    if(this.squadIsAllReadyToMove('Q1A',['Q1H','Q2H','Q3H']) ){
                         creep.say("!Z?!");
                        Memory.attackStage = "approach2";
                    }

                }
            }
            if(Memory.attackStage =='approach2'){



                if(creep.pos.isEqualTo(stagingRoomPos2)){
                    creep.say("hold");
                     if(this.squadIsAllReadyToMove('Q1A',['Q1H','Q2H','Q3H']) ){
                        creep.say("war");  
                        Memory.attackStage = "attack";
                     }
                }else{
                    creep.memory.direction = approach2Dir;
                    creep.say(creep.move(approach2Dir));
                }

            }
             
            if(Memory.attackStage =='attack'){
                
                
            
                if(wounds<2000 && this.squadIsAllReadyToMove('Q1A',['Q1H','Q2H','Q3H']) ){
                
                    
                    if(creep.pos.roomName == target.pos.roomName){
                         this.actOrMove2(creep,target,"dismantle");
                         let t = Game.getObjectById(target.id);
                         if(target){
                             clog(t.hits,"Target hits");
                         }
                         
                    }
                    
                }
            }     
        }
        
        for(let cname of ['Q1H','Q2H','Q3H']){
            if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                
                
                
                let creep = Game.creeps[cname];
                let leader = Game.creeps['Q1A'];
               
                if(Memory.attackStage =='approach'){
                    let formationPos = new RoomPosition(stagingRoomPos.x,stagingRoomPos.y,stagingRoomPos.roomName );
                    if(cname=='Q1H'){
                        formationPos.y+=1;
                    }
                    if(cname=='Q2H'){;
                         formationPos.x+=1;
                    }
                    if(cname=='Q3H'){
                        formationPos.y+=1;
                         formationPos.x+=1;
                    }
                    creep.moveOffRoomEdge();
                    let res = creep.moveToPos( formationPos);
                   creep.say(res)
                }
                if(Memory.attackStage =='approach2'){
                    if(leader){
                        
                        if(leader.memory.direction!=="pause"){
                            creep.move(leader.memory.direction);
                        }else{
                            creep.moveToPos(leader);
                        }
                        
                        
                    }else{
                        creep.say("$$")
                        creep.moveOffRoomEdge();
                        creep.moveToPos(stagingRoomPos2);
                    }
                    
                    
                }
                
                if(Memory.attackStage =='attack'){
                    // lost damage dealer, so retreat and drain
                    if(leader){
                        //creep.moveOffRoomEdge();
                        creep.moveToPos(leader)
                    }else{
                        creep.say("$$")
                        //creep.moveOffRoomEdge();
                        creep.moveToPos(stagingRoomPos2);
                    }
                }
                this.healMostHurtSquadMember(creep,['Q1A','Q1H','Q2H','Q3H']);

            }
        }
    },
   
    squadIsAllReadyToMove:function(leaderName,AllyNames){
        // are we all here and ready?
        let creep = Game.creeps[leaderName];
        let readyCount = 0;
        for(let allyName of AllyNames){
            if(Game.creeps[allyName] && creep.pos.isNearTo(Game.creeps[allyName]) && Game.creeps[allyName].fatigue==0){
                readyCount++;
            }else{
                creep.say('W:'+allyName);break;
            }
        }
        return (readyCount ==AllyNames.length)
    },
    attackDuringDrain2: function(spawnName,cname, bodyPlan,retreatRoomPos, drainerNames, roomData, energyCap){

        // if the drain has worked and the room is low on energy, then start building attackers
        // Also are the towers mostly drained ?
        if( roomData.storage_energy <energyCap && 
            (roomData.towers_with_energy <4 || roomData.total_tower_energy <500 )){
            if(!Game.creeps[cname]){
                Game.spawns[spawnName].spawnCreepX(bodyPlan,cname,{});
            }
        }
//clog(roomData.target_id)
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            let drainersInPosition=0;
            let closest= false;
            let closestDist = 99999;
            for(let name of drainerNames){
                let c = Game.creeps[name];
                if( c && c.ticksToLive>20 && c.pos.roomName==Game.getObjectById(roomData.target_id).pos.roomName){
                    let dist = creep.pos.getRangeTo(c);
                    if(dist < closestDist){
                        closestDist = dist;
                        closest = c;
                    }
                    drainersInPosition++;
                }
            }
            
            // if the healers have gained a foothold, then its safe to enter and attack
            if(drainersInPosition==drainerNames.length){
                
                if(closestDist<3){
                    creep.actOrMoveTo('dismantle', Game.getObjectById(roomData.target_id) );

                }else{
                    creep.moveOffRoomEdge();
                    creep.moveTo(closest);
                }
                
            }else{
                // hold outside the room and help the drainer room bounce
                if(creep.hits == creep.hitsMax){
                    this.healUpGroup(creep, drainerNames); 
                }else{ 
                    creep.heal(creep);
                }
                                    
                creep.moveOffRoomEdge();
                creep.moveToPos(retreatRoomPos);
            }
            
        }

    },    
    attackDuringDrain: function(spawnName,cname, bodyPlan,target,retreatRoomPos, storage_id, tower_ids, energyCap, drainerNames){
        // '63fd201ac38c3d21f3318244'
        
       // Game.getObjectById(observer_id).observeRoom(target.pos.roomName);
        let storage = Game.getObjectById(storage_id);
        let towersWithEnergy=0;
        let totalTowerE=0;
        for(let id of tower_ids){
            let t = Game.getObjectById(id);
            if(t && t.store.getUsedCapacity(RESOURCE_ENERGY)>9){
                towersWithEnergy++;
                totalTowerE+=t.store.getUsedCapacity(RESOURCE_ENERGY);
                
            }
        }
        
        // if the drain has worked and the room is low on energy, then start building attackers
        // Also are the towers mostly drained ?
        if(storage && storage.store.getUsedCapacity(RESOURCE_ENERGY)<energyCap && 
            (towersWithEnergy<4 || totalTowerE<500 )){
            if(!Game.creeps[cname]){
                let parts =[];
                for(let c=0;c<20;c++){
                    parts.push(WORK);parts.push(MOVE);
                }
                for(let c=0;c<5;c++){
                    parts.push(HEAL);parts.push(MOVE);
                }
                Game.spawns[spawnName].spawnCreepX(bodyPlan,cname,{});
            }
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            let drainersInPosition=0;
            let closest= false;
            let closestDist = 99999;
            for(let name of drainerNames){
                let c = Game.creeps[name];
                if( c && c.ticksToLive>20 && c.pos.roomName==target.pos.roomName){
                    let dist = creep.pos.getRangeTo(c);
                    if(dist < closestDist){
                        closestDist = dist;
                        closest = c;
                    }
                    drainersInPosition++;
                }
            }
            
            // if the healers have gained a foothold, then its safe to enter and attack
            if(drainersInPosition==drainerNames.length){
                
                if(closestDist<3){
                    this.actOrMove2(creep,target,"dismantle");
                }else{
                    creep.moveOffRoomEdge();
                    creep.moveTo(closest);
                }
                
                
                
                
            }else{
                // hold outside the room and help the drainer room bounce
                if(creep.hits == creep.hitsMax){
                    this.healUpGroup(creep, drainerNames); 
                }else{ 
                    creep.heal(creep);
                }
                                    
                creep.moveOffRoomEdge();
                creep.moveToPos(retreatRoomPos);
            }
            
        }

    },
    healUpGroup: function(healer,targetNames){
        
        for(let name of targetNames){
            let drainer = Game.creeps[name];
            if(drainer && drainer.pos.roomName==healer.pos.roomName){ 
                if(drainer.pos.isNearTo(healer)){
                    healer.heal(drainer);break;
                }else{
                    healer.rangedHeal(drainer);break;
                }
            }
        } 
    },

    
    healMostHurtSquadMember: function(healer,teamNames){
        // keep healing and moving to leader
        let lowestHP = 0;
        let healTarget = false;
        for(let teamName of teamNames){
            if(Game.creeps[teamName] && healer.pos.getRangeTo(Game.creeps[teamName])<3 ){
                let wounds = Game.creeps[teamName].hitsMax - Game.creeps[teamName].hits;
                if(wounds > lowestHP){
                    lowestHP = wounds;
                    healTarget = Game.creeps[teamName];
                   // console.log(healTarget);
                }
            }
        }
        if(healTarget){
            if(healer.pos.isNearTo(healTarget)){
                //creep.say("HH:"+creep.heal(healTarget) );
                healer.heal(healTarget)
            }else{
                //creep.say("RH:"+creep.rangedHeal(healTarget) );
                healer.rangedHeal(healTarget)
            }
        }
        
    },
    drainRoom4:function(spawnName,cname, retreatRoomPos, bodyPlan, fellowDrainers, attackerNames, roomData){
      
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX( bodyPlan ,cname, {memory:{arrived:false}} ),spawnName);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(creep.memory.arrived){
                let HPLoss = creep.hitsMax - creep.hits;
                

                let squadToHeal = [];
                let drainersNearby = 0;
                for(let n of fellowDrainers){
                    squadToHeal.push(n);
                    if(Game.creeps[n] && 
                    (Game.creeps[n].pos.getRangeTo(creep)<4 || Game.creeps[n].pos.getRangeTo(retreatRoomPos)<2)
                    )drainersNearby++;
                }
                
                // if more than 3 towers have energy they don't want to be in the room
                if(roomData.towers_with_energy > 3 ){
                    
                    if(creep.pos.roomName==roomData.checkpoint.roomName && !creep.onRoomEdge()){
                        creep.moveTo(retreatRoomPos);
                    }else{
                        this.roomBounceDrain(creep,retreatRoomPos);
                    }
                    
                }else{
                    let target = Game.getObjectById(roomData.target_id);
                    let moveTarget = (roomData.towers_with_energy<2)?target: roomData.checkpoint; // target
                    
                    for(let name of attackerNames){
                        let c = Game.creeps[name];
                        if(c && c.pos.roomName==roomData.checkpoint.roomName){

                            if(5 < creep.pos.getRangeTo(c)){
                                moveTarget = c;
                            }
                            
                            squadToHeal.push(name);
                        }
                    }
                   
                    creep.moveOffRoomEdge();
                    creep.moveTo(moveTarget);
                    creep.rangedAttack(target);
                    this.healMostHurtSquadMember(creep,squadToHeal);
                }   
            }else{
                if(creep.pos.isEqualTo(retreatRoomPos)){
                    creep.memory.arrived = true;
                }else{
                    creep.moveOffRoomEdge();
                    creep.moveToPos(retreatRoomPos);
                }
            }
        }
        
    },
    drainRoom3:function(spawnName,cname, retreatRoomPos, bodyPlan, fellowDrainers, innerRoomPos, towerIds,attackerNames,attack_target_id){
      
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX( bodyPlan ,cname, {memory:{arrived:false}} );
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(creep.memory.arrived){
                let HPLoss = creep.hitsMax - creep.hits;
                
                let towersWithEnergy=0;
                for(let id of towerIds){
                    let t = Game.getObjectById(id);
                    if(t && t.store.getUsedCapacity(RESOURCE_ENERGY)>9)towersWithEnergy++;
                }
                
                let squadToHeal = [];
                let drainersNearby = 0;
                for(let n of fellowDrainers){
                    squadToHeal.push(n);
                    if(Game.creeps[n] && Game.creeps[n].pos.getRangeTo(creep)<4)drainersNearby++;
                }
                
                // if more than 3 towers have energy they don't want to be in the room
                if(towersWithEnergy>3 || drainersNearby< 3){
                    if(creep.pos.roomName==innerRoomPos.roomName && !creep.onRoomEdge()){
                        creep.moveTo(retreatRoomPos);
                    }else{
                        this.roomBounceDrain(creep,retreatRoomPos);
                    }
                    
                }else{
                    let target = Game.getObjectById(attack_target_id);
                    let moveTarget = innerRoomPos; // target
                    
                    
                    
                    for(let name of attackerNames){
                        let c = Game.creeps[name];
                        if(c && c.pos.roomName==innerRoomPos.roomName){

                            if(5 < creep.pos.getRangeTo(c)){
                                moveTarget = c;
                            }
                            
                            squadToHeal.push(name);
                        }
                    }
                    creep.moveTo(moveTarget);
                    creep.rangedAttack(target);
                    this.healMostHurtSquadMember(creep,squadToHeal);
                }   
            }else{
                if(creep.pos.isEqualTo(retreatRoomPos)){
                    creep.memory.arrived = true;
                }else{
                    creep.moveOffRoomEdge();
                    creep.say(creep.moveToPos(retreatRoomPos));
                }
            }
        }
        
    },
    roomBounceDrain: function(creep,retreatRoomPos){
        let HPLoss = creep.hitsMax - creep.hits;
        // IF !full HP THEN HEAL
        if(HPLoss>0){
            creep.heal(creep);
        }
       
        // IF full HP && on safeSpot THEN move on to moveOnToRoomEdge
        if(HPLoss===0 && creep.pos.isEqualTo(retreatRoomPos)){
            creep.moveOnToRoomEdge();
        }
        // IF HP Loss > 1 ticks worth of heal THEN moveOffRoomEdge
        if( HPLoss > 0 && creep.pos.roomName===retreatRoomPos.roomName ){
            
            if(!creep.onRoomEdge() && !creep.pos.isEqualTo(retreatRoomPos)){
                // weird edge case where creep fled target room from a balls up attack and didn't get back into their drain lane
                creep.moveTo(retreatRoomPos);
            }else{
                creep.moveOffRoomEdge();
            }
            
        }
    },

    creepsReady:function(creepNames){
        for(let cn of creepNames){
            if(Game.creeps[cn]===undefined)return false;
            if(Game.creeps[cn].spawning)return false;
        }
        return true;
    },
     fillerRole:require('role.filler'),
     testFiller: function(spawnName,creepName){
         
               
        if(!Game.creeps[creepName]){
            this.fillerRole.create(Game.spawns[spawnName],creepName);
        }
        
        if(Game.creeps[creepName] && !Game.creeps[creepName].spawning){
         
            this.fillerRole.run(Game.creeps[creepName],Game.spawns[spawnName]);
        }
     },
    runFillers:function(){
        this.testFiller('Alpha','A-ff-0');
        this.testFiller('Alpha','A-ff-1');
        this.testFiller('Alpha-2','A-ff-2');
        this.testFiller('Alpha-2','A-ff-3');
        
        this.testFiller('Beta','B-ff-0');
        this.testFiller('Beta','B-ff-1');
        this.testFiller('Beta-2','B-ff-2');
        this.testFiller('Beta-2','B-ff-3');
        
        this.testFiller('Gamma','G-ff-0');
        this.testFiller('Gamma','G-ff-1');
        
        this.testFiller('Delta','D-ff-0');
        this.testFiller('Delta','D-ff-1');
        this.testFiller('Delta-2','D-ff-2');
        this.testFiller('Delta-2','D-ff-3');
        
        this.testFiller('Epsilon','E-ff-0');
        this.testFiller('Epsilon','E-ff-1');
        this.testFiller('Epsilon-2','E-ff-2');
        this.testFiller('Epsilon-2','E-ff-3');
        
        this.testFiller('Zeta','Z-ff-0');
        this.testFiller('Zeta','Z-ff-1');
        
        this.testFiller('Zeta-2','Z-ff-2');
        this.testFiller('Zeta-2','Z-ff-3');
        
        this.testFiller('Eta','E-ff-4');
        this.testFiller('Eta','E-ff-5');
        
        this.testFiller('Theta','T-ff-0');
        this.testFiller('Theta','T-ff-1');        
        this.testFiller('Theta-2','T-ff-2');
        this.testFiller('Theta-2','T-ff-3');
      //  this.testWorker2('Alpha','A-w2-0')
    }
};
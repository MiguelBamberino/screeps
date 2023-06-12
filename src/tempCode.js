let tankerRole=require('role.tanker');
module.exports = {
    

    
    run:function(){
        //return;
        let ids = ['6480e32a59a8be25e7ae82ed','6480e32a59a8be25e7ae82ed'];
        let tid= ids[0];
        for(let id of ids){
            if(Game.getObjectById(id)){
                tid = id;
            }
        }
        //this.killCreepsBreakTarget('Beta','Atilla','W15N19','10a10m1h1m',tid );
        //this.killCreepsBreakTarget('Alpha','Punchy','W15N19','10a10m',tid );
        //this.killCreepsBreakTarget('Alpha','Atilla','W11N17','3a3m','6483bdf792092ca1e24f2ec4' );
     //   this.breakStructures('Gamma','Slammy', 'W13N16',['647931db535ff40426caa0a2','647931df535ff44db6caa0a4','64793a58535ff45a8bcaa2a4','64792ce0a59895148f611e10','64792cde2d6d180b2b4d119a'],'5w5m');
       // this.reserverRoom('Alpha','nabby',{id:'646e735f071eb8276c0a6a07',pos:{x:28,y:28,roomName:'W11N17'}},'3cl3m');
        
        /*
        let cname = false;
        let attackRoom = 'W14N16';
        let staging = rp(32,44,'W14N17')
        let creep = false;
        let readyCount = 0;
        for(let i =0; i<4;i++){
            cname = 'Ak-'+i;
            this.killCreepsBreakTarget('Alpha',cname,attackRoom,'10a10m1h1m','647fffae965389f5045580f3' );
            creep = Game.creeps[cname];
            if(creep && !creep.memory.ready){
                creep.moveToPos(staging);
                creep.moveOffRoomEdge();
                if(creep.pos.isNearTo(staging))readyCount++;
            }
        }
        if(readyCount==4){
            for(let i =0; i<4;i++)Game.creeps['Ak-'+i].memory.ready=true;
        }
       */
        
       
        // '2t2m + 2*1m1a1m1r + 1h1m'
        //this.constantGuardRoom('Alpha','Atilla','W13N15','2t2m1a1m + 3*1m1r + 1h1m',{x:14,y:23});
        //this.claimRoom('Alpha','clammy',{id:'646e730b071eb8276c0a6775',pos:{x:2,y:21,roomName:'W13N15'}});
      // this.harvestAndCollectThorium('Beta','646f55fd9bdd4e0008301617','648308e2f6bdc8a2ad944b6a','647f1026358260669e2fd981');
        
        //#####################################################################################
        // Season - Alpha Tasks
        //#####################################################################################
        
        //this.startupRoomNoVision('Alpha','W15N19')
       // this.harvestAndCollectMineral(spawnName,mineral_id,container_id,store_id,mineral_type)
        this.harvestAndCollectMineral('Alpha','64765074d6ad5e002e061938','6484f6fab2d65ba2f7fa148b','647a92e8655cd29697596191',RESOURCE_ZYNTHIUM,'4m4c')
        let smallBody = '4*1c1m';
        let mediumBody = '6*1c1m';
        let bigBody = '8*1c1m';
        let AlphaHaulerN = 0;
        let controllerW14N18 = Game.getObjectById('646e72de071eb8276c0a65a9');
        let storageW14N18 = Game.getObjectById('647a92e8655cd29697596191');
        let alphaReturnTo = (controllerW14N18.haveContainer() && storageW14N18.storedAmount()>5000)?controllerW14N18.getContainer():storageW14N18;

                
        for(let i=0;i<10;i++){
            let cname = 'At'+AlphaHaulerN
            if(!Game.creeps[cname]){
                if(Game.spawns['Alpha-2'].spawnCreepX(bigBody,cname)==ERR_NOT_ENOUGH_RESOURCES)
                    if(Game.spawns['Alpha-2'].spawnCreepX(mediumBody,cname)==ERR_NOT_ENOUGH_RESOURCES)
                        Game.spawns['Alpha-2'].spawnCreepX(smallBody,cname);
                
            }
            if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                let creep = Game.creeps[cname];
                tankerRole.run(creep,{coreRoomName:'W14N18',allRoomNames:['W13N18','W15N18','W14N19','W14N18']});
            }
            
            AlphaHaulerN++;
        } 
      
        /////  Alpha Remotes  ///////////////////////////////////////////////////////////////////////////////////////////////////////  
        this.defendRoom('Alpha','Adx','W14N18',true);
        let invadersInW13N18 = this.defendRoom('Alpha','Ad0','W13N18');
        let invadersInW15N18 = this.defendRoom('Alpha','Ad1','W15N18');
        let invadersInW14N19 = this.defendRoom('Alpha','Ad2','W14N19');
        
            this.harvestPoint('Alpha','Ahr0','6w1c3m',{id:'646e7309071eb8276c0a6768',pos:{x:11,y:19,roomName:'W13N18'}});
            this.reserverRoom('Alpha','Ar0',{id:'646e7309071eb8276c0a676a',pos:{x:38,y:23,roomName:'W13N18'}},'2cl2m');
            this.harvestPoint('Alpha','Ahr1','6w1c3m',{id:'646e7309071eb8276c0a6769',pos:{x:23,y:20,roomName:'W13N18'}});

        // >>    W14N19
        this.harvestPoint('Alpha','Ahr2','4w1c2m',{id:'646e72de071eb8276c0a65a7',pos:{x:26,y:41,roomName:'W14N19'}},'4m4c');

        // >>     W15N18
            this.reserverRoom('Alpha','Ar1',{id:'646e72b3071eb8276c0a63d5',pos:{x:12,y:9,roomName:'W15N18'}},'2cl2m');
            this.harvestPoint('Alpha','Ahr3','6w1c3m',{id:'646e72b3071eb8276c0a63d7',pos:{x:42,y:31,roomName:'W15N18'}});
            this.harvestPoint('Alpha','Ahr4','6w1c3m',{id:'646e72b3071eb8276c0a63d6',pos:{x:10,y:22,roomName:'W15N18'}});

        
        //#####################################################################################
        // Season - Beta Tasks
        //#####################################################################################
        this.defendRoom('Beta','Bdx','W17N18',true);
        this.harvestAndCollectMineral('Beta','64765074d6ad5e002e06186f','6484f53ccb559300ce613087','647f1026358260669e2fd981',RESOURCE_HYDROGEN)
        // >>>>> W17N19  ////////////////////////////////////////////////////////////
        let invadersInW17N19 = this.defendRoom('Beta','Bd0','W17N19');
        let controllerW17N18 = Game.getObjectById('646e725d071eb8276c0a6079');
        let storageW17N18 = Game.getObjectById('647f1026358260669e2fd981');
        let BetaHaulerN = 0;
        let betaReturnTo = (controllerW17N18.haveContainer() && storageW17N18.storedAmount()>5000)?controllerW17N18.getContainer():storageW17N18;
   
        for(let i=0;i<10;i++){
            let cname = 'Bt'+BetaHaulerN
            if(!Game.creeps[cname]){
                if(Game.spawns['Beta'].spawnCreepX(bigBody,cname)==ERR_NOT_ENOUGH_RESOURCES)
                    if(Game.spawns['Beta'].spawnCreepX(mediumBody,cname)==ERR_NOT_ENOUGH_RESOURCES)
                        Game.spawns['Beta'].spawnCreepX(smallBody,cname);
                
            }
            if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                let creep = Game.creeps[cname];
                tankerRole.run(creep,{coreRoomName:'W17N18',allRoomNames:['W17N18','W17N19','W16N18','W16N19']});
            }
            
            BetaHaulerN++;
        } 
            
        this.reserverRoom('Beta','Br0',{id:'646e725c071eb8276c0a6075',pos:{x:28,y:28,roomName:'W17N19'}},'1cl1m');
        
        this.harvestPoint('Beta','Bhr0','6w1c3m',{id:'646e725c071eb8276c0a6076',pos:{x:36,y:35,roomName:'W17N19'}});


        this.harvestPoint('Beta','Bhr1','6w1c3m',{id:'646e725c071eb8276c0a6077',pos:{x:45,y:43,roomName:'W17N19'}});

      
         
         // >>>>> W16N18  ////////////////////////////////////////////////////////////
        
     
        this.harvestPoint('Beta','Bhr2','4w1c2m',{id:'646e7288071eb8276c0a61f7',pos:{x:37,y:26,roomName:'W16N18'}});

        // >>>>> W16N18  ////////////////////////////////////////////////////////////
        this.harvestPoint('Beta','Bhr3','4w1c2m',{id:'646e7288071eb8276c0a61f4',pos:{x:29,y:38,roomName:'W16N19'}});          

        
        //#####################################################################################
        // Season - Gamma Tasks
        //#####################################################################################
        //let controllerW13N15 = Game.rooms['W13N15'].controller;
        let storageW13N15 = false;
        let GammaHaulerN = 0;
                
        for(let i=0;i<8;i++){
            let cname = 'Gt'+GammaHaulerN
            if(!Game.creeps[cname]){
                if(Game.spawns['Gamma'].spawnCreepX(bigBody,cname)==ERR_NOT_ENOUGH_RESOURCES)
                    if(Game.spawns['Gamma'].spawnCreepX(mediumBody,cname)==ERR_NOT_ENOUGH_RESOURCES)
                        Game.spawns['Gamma'].spawnCreepX(smallBody,cname);
                
            }
            if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                let creep = Game.creeps[cname];
                tankerRole.run(creep,{coreRoomName:'W13N15',allRoomNames:['W13N15','W12N15','W13N16','W13N14']});
            }
            
            GammaHaulerN++;
        } 
        
        
        /////// W13N16  ////////////////////////////////////////
        this.scoutRoom('Gamma','Gsc1','W13N16');
        let invadersInW13N16 = this.defendRoom('Gamma','Gd0','W13N16');
        this.reserverRoom('Gamma','Gr0',{id:'646e730a071eb8276c0a6770',pos:{x:7,y:26,roomName:'W13N16'}},'2cl2m');
        let controllerW13N16 = Game.getObjectById('646e730a071eb8276c0a6770');
        if(controllerW13N16 && controllerW13N16.reservation && controllerW13N16.reservation.username=='Invader'){
            this.reserverRoom('Gamma','Gr0-x',{id:'646e730a071eb8276c0a6770',pos:{x:7,y:26,roomName:'W13N16'}},'2cl2m');
        }else{
            this.harvestPoint('Gamma','Ghr1','6w1c3m',{id:'646e730a071eb8276c0a6772',pos:{x:6,y:38,roomName:'W13N16'}});
            this.harvestPoint('Gamma','Ghr2','6w1c3m',{id:'646e730a071eb8276c0a6771',pos:{x:4,y:38,roomName:'W13N16'}});
        
        }
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga1','W13N16','3a3m');
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga2','W13N16','3a3m');
        
        /////// W12N15 ////////////////////////////////////////
        this.defendRoom('Gamma','Gd1','W12N15');
        this.scoutRoom('Gamma','Gsc2','W12N15');
        
        this.reserverRoom('Gamma','Gr1',{id:'646e7335071eb8276c0a68c3',pos:{x:30,y:31,roomName:'W12N15'}},'2cl2m');
        this.harvestPoint('Gamma','Ghr3','6w1c3m',{id:'646e7335071eb8276c0a68c2',pos:{x:14,y:17,roomName:'W12N15'}});
        this.harvestPoint('Gamma','Ghr4','6w1c3m',{id:'646e7335071eb8276c0a68c1',pos:{x:14,y:17,roomName:'W12N15'}});

        /////// W13N14 ////////////////////////////////////////
        let invadersInW12N15 = this.defendRoom('Gamma','Gd2','W13N14');
        
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga3','W13N14','3a3m');
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga4','W13N14','3a3m');
        //this.scoutRoom('Gamma','Gsc1','W12N15');
        this.harvestPoint('Gamma','Ghr5','4w1c2m',{id:'646e730b071eb8276c0a6778',pos:{x:7,y:5,roomName:'W13N14'}});
        
        
        
        /////   Harass Default0 ///////////////////////////////////////////////////////////////////////////////////////////////////////    
          let attackPlans={
            'W12N13':['W14N18','W13N18','W13N17','W12N17','W12N16','W11N16','W11N15','W12N15','W12N14','W12N13'],
            'W12N16':['W14N18','W13N18','W13N17','W12N17','W12N16'],
            'W13N14':['W14N18','W13N18','W13N17','W12N17','W12N16','W11N16','W11N15','W12N15','W12N14','W13N14'],
            'W13N12':[ 'W13N15','W13N14','W12N14','W12N13','W12N12','W13N12'],
            
            'W14N13':['W13N15','W13N14','W14N14','W14N13']
        }
       let directPaths={

            'W13N15':['W14N18','W13N18','W13N17','W12N17','W12N16','W12N15','W13N15']
        }
        //this.emptyContainersInEnemyRemote('Gamma','mosquito-1',{id:'648046bff0fb90889f92b167',pos:{x:1,y:1,roomName:'W13N15'}},directPaths['W13N15']  )
        
       // this.emptyContainersInEnemyRemote('Alpha','mosquito-1',{id:'64804180f1970a121868fd90',pos:{x:1,y:1,roomName:'W12N16'} }  )
        //this.emptyContainersInEnemyRemote('Alpha','mosquito-2',{id:'64804220f1970a588868fdcd',pos:{x:1,y:1,roomName:'W12N15'}} )
       // this.emptyContainersInEnemyRemote('Alpha','mosquito-2',{id:'6480431098bc22dcec84e645',pos:{x:1,y:1,roomName:'W12N15'}} )
        
        let activeTarget = 'W13N14';
        
       // if(Game.creeps['bob'])
       // this.killCreepsBreakTarget('Alpha','bob',activeTarget,'1a1r2m','647d9be797b75f3f9db03958',attackPlans[activeTarget] );
       // if(Game.creeps['bob2'])
        //this.killCreepsBreakTarget('Alpha','bob2','W12N13','1a1r2m','647d9be797b75f3f9db03958',attackPlans['W12N13'] ); 
   
        //this.killCreepsBreakTarget('Gamma','Bob','W13N12','2a2m','6484ab96c9ed295560327710',attackPlans['W13N12']); 
        //this.killCreepsBreakTarget('Gamma','Bob2','W13N12','2a2m','6482e3b0f1157bfec9d48f0d',attackPlans['W13N12']);
        
        //this.killCreepsBreakTarget('Gamma','Bob3','W13N12','2a2m','6482e3b0f1157bfec9d48f0d',attackPlans['W13N12']);
        
        //

          
            /*
        if(tower && tower.isEmpty()){
            
            this.killCreepsBreakTarget('Alpha','Atilla','W14N16','10*1a1m+','648026c9c37dd4c36822c97d'); 
            this.healBuddy('Alpha','Dr0','Atilla','3*1t1m + 6*1h1m')
        }else{
            this.drainRoomBounce('Alpha','Dr0',new RoomPosition(36,48,'W14N17'),'3*1t1m + 6*1h1m');
        }*/
        
        
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////    
            
        
        return;
       },
    runAllRemotesFor: function(spawnName,remoteRoomNames){
        
        ///// Haulers ////////////////////////////////////////
        let haulerN = 0;
        let smallBody = '4*1c1m';
        let mediumBody = '6*1c1m';
        let bigBody = '8*1c1m';
        
        for(let i=0;i<8;i++){
            let cname = spawnName.charAt(0)+'t'+haulerN;
            if(!Game.creeps[cname]){
                if(Game.spawns[spawnName].spawnCreepX(mediumBody,cname)==ERR_NOT_ENOUGH_RESOURCES){
                    Game.spawns[spawnName].spawnCreepX(smallBody,cname);
                }
            }
            if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                let creep = Game.creeps[cname];
                tankerRole.run(creep,{coreRoomName:Game.spawns[spawnName].pos.roomName,allRoomNames:remoteRoomNames});
            }
            
            haulerN++;
        } 
       
    },
    /**
     * spawnName
     * roomName
     * config{
     *      defend:true >> if true, then keep room clear of InvaderCores && kill invader creeps
     *      reserve:false >> whether to reserve the controller 
     * }
     */ 
    runRemote: function(spawnName,roomName,conf){
        
        let config={
            defend:conf.defend===undefined?true:conf.defend,
            reserve:conf.reserve===undefined?false:conf.reserve,
            
        }
        
        //// Vision /////////////////////////////////////////
        let room = Game.rooms[roomName];
        if(room && !mb.hasRoom(roomName))mb.scanRoom(roomName);
        let scoutName = spawnName.charAt(0)+'-ob-'+roomName;
        if(!room || Game.creeps[scoutName])this.scoutRoom(spawnName,scoutName,roomName);
        
        //// Defence /////////////////////////////////////////
        
        if(config.defend){
            let invaders = this.defendRoom(spawnName,spawnName.charAt(0)+'-de-'+roomName,roomName);
            
            
        this.keepRoomClearOfLv0InvaderCores(spawnName,spawnName.charAt(0)+'at1-'+roomName,roomName,'3a3m');
        this.keepRoomClearOfLv0InvaderCores(spawnName,spawnName.charAt(0)+'at2-'+roomName,roomName,'3a3m');
        }
        
        if(config.reserve){
            
            this.reserverRoom(spawnName,spawnName.charAt(0)+'re-'+roomName,{id:'646e730a071eb8276c0a6770',pos:{x:7,y:26,roomName:'W13N16'}},'1cl1m');
        }
        
        let controllerW13N16 = Game.getObjectById('646e730a071eb8276c0a6770');
        if(controllerW13N16 && controllerW13N16.reservation && controllerW13N16.reservation.username=='Invader'){
            this.reserverRoom('Gamma','Gr0-x',{id:'646e730a071eb8276c0a6770',pos:{x:7,y:26,roomName:'W13N16'}},'1cl1m');
        }else{
            this.harvestPoint('Gamma','Ghr1','4w1c2m',{id:'646e730a071eb8276c0a6772',pos:{x:6,y:38,roomName:'W13N16'}});
            this.harvestPoint('Gamma','Ghr2','4w1c2m',{id:'646e730a071eb8276c0a6771',pos:{x:4,y:38,roomName:'W13N16'}});
        
        }
    },
    harvestAndCollectMineral:function(spawnName,mineral_id,container_id,store_id,mineral_type,haulerBody){
        
        let roomName = Game.spawns[spawnName].pos.roomName;
        
        if(Game.getObjectById(container_id))this.harvestMineral(spawnName,spawnName.charAt(0)+'hx','10W2m',{id:mineral_id,pos:{x:1,y:1,roomName:roomName}},RESOURCE_THORIUM);
        
        this.haulResources(spawnName,spawnName.charAt(0)+'tx',haulerBody,
            {id:container_id,pos:{x:1,y:1,roomName:roomName}},
            {id:store_id,pos:{x:1,y:1,roomName:roomName}},[mineral_type] );
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
            
            if(reactor.store.getUsedCapacity(labConfig.target.resource_type)> creep.store.getFreeCapacity(labConfig.target.resource_type) ){
                
                creep.memory.target = labConfig.target;
                creep.memory.target.dir = 'empty';
            }else if(input0.store.getUsedCapacity(labConfig.sources[0].resource_type) < (3000-creep.store.getFreeCapacity(labConfig.sources[0].resource_type)) ){
                
                creep.memory.target = labConfig.sources[0];
                creep.memory.target.dir = 'fill';
            }else if(input1.store.getUsedCapacity(labConfig.sources[1].resource_type) < (3000-creep.store.getFreeCapacity(labConfig.sources[1].resource_type)) ){
                
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
        //clog(drawFromTarget)
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
       // if(creep && creep.name=='At0')clog(sourceStore,'At0')
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
           // creep.say(resource_type)
            if(creep.store.getUsedCapacity(resource_type)==0){
                
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
                  //  creep.say("t:"+resource_type.charAt(0)+":"+res);
                }else{
                      let res =  this.actOrMove2(creep,targetStore,"transfer",resource_type);
                      if(res==-2){
                          delete creep.memory._move;
                      }
                      //creep.say("t:"+res);
                }
                
            }


        }
    },
    
    // ############################################################################################
    // Starting a new room functions
    // ############################################################################################
    activeRoomOverseer:Game.creeps['Xs0']?'Xs0':'Xs1',
    startupRoomNoVision: function(spawnName,roomName,config){
        // setup with given creep. will break on global reset...but oh well. its a 1m creep.
        if(!this.activeRoomOverseer)this.activeRoomOverseer='Xs0';
        // if the active creep is near dead, then start bringing in the new one
        if(Game.creeps[this.activeRoomOverseer] && Game.creeps[this.activeRoomOverseer].ticksToLive<200)
            this.activeRoomOverseer=this.activeRoomOverseer=='Xs0'?'Xs1':'Xs0';
        // move the scout in   
        this.scoutRoom(spawnName,this.activeRoomOverseer,roomName);
        // can not we see the room, then wait for scout
        if(!Game.rooms[roomName])return; 
        
        if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
            
        return;   
        this.startupNewRoomWithVision(roomName,spawnName,config);
       
    },
    
    /**
     * var observer_id
     * var roomName
     * var spawnName
     * var config >> see startupNewRoomWithVision() for config docs
     */ 
    startupNewRoomWithObserver: function(observer_id,roomName,spawnName,config){
    
        
        Game.getObjectById(observer_id).observeRoom(roomName);
        
        this.startupNewRoomWithVision(roomName,spawnName,config);
    },
    /**
     * Startup a room, assuming you already have vision
     * var roomName
     * var spawnName
     * var config{
                workerCount:4,
                workerBody:'2w2c2m'
                drawFromRuins:false,        >> withdraw E from ruins
                drawFromStructures:false,   >> withdraw E from any existing enemy structures
                harvestSources:true,        >> send in harvesters to mine sources
                dismantleStructures:false,  >> destroy any existing enemy structures
                buildUpSites:false          >> build any construction sites
            }
     */ 
    startupNewRoomWithVision: function(roomName,spawnName, conf){
        
        let config={
            workerCount:conf.workerCount===undefined?4:conf.workerCount,
            workerBody:conf.workerBody===undefined?'2w2c2m':conf.workerBody,
            drawFromRuins:conf.drawFromRuins===undefined?false:conf.drawFromRuins,
            drawFromStructures:conf.drawFromStructures===undefined?false:conf.drawFromStructures,
            harvestSources:conf.harvestSources===undefined?true:conf.harvestSources,
            dismantleStructures:conf.dismantleStructures===undefined?true:conf.dismantleStructures,
            buildUpSites:conf.buildUpSites===undefined?true:conf.buildUpSites,
        }
        
        let room = Game.rooms[roomName];
        if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
        let container_ids=[];
        let dismantle_ids=[];
        let repair_ids = [];
        if(room){
            
            // Firstly, lets go make a claim on the room
            if(!room.controller.owner){
                this.claimRoom(spawnName,roomName+'-cl',room.controller);
            }
            if(config.dismantleStructures){
                let structures = mb.getStructures({
                    roomNames:[roomName],
                    types:[STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_STORAGE],
                    filters:[{attribute:'isEmpty',operator:'fn',value:[]}]
                    
                });
                for(let obj of structures)dismantle_ids.push(obj.id);
            }

            // if there are RUINs then do we want to draw on their energy?
            if(config.drawFromRuins){
                let ruins = room.find(FIND_RUINS);
                
                for(let r in ruins){
                    if(ruins[r].store.getUsedCapacity(RESOURCE_ENERGY)>0){
                        container_ids.push(ruins[r].id);
                    }
                }
            }
            if(config.drawFromStructures){
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
            if(config.harvestSources){
                let sources  = mb.getAllSourcesForRoom(roomName);
                for(let s in sources){
                    this.harvestPoint(spawnName,roomName+'-h'+s,'6w6m1c',sources[s].id);
                    let srcCont = sources[s].getContainer();
                    if(srcCont && srcCont.storingAtleast(50))container_ids.push(srcCont.id);
                } 
            }
            
            if(config.buildUpSites){
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
            

            // now lets deploy the workers to draw from all containers
            if(container_ids.length>0){
                
                for(let c=0; c < workerCount;c++){
                    let bodyPlan = config.workerBody;
                    let creepName = roomName+'-w'+c;
                    if(dismantle_ids.length>0){
                        
                         let id = dismantle_ids[c]?dismantle_ids[c]:dismantle_ids[0];
                         this.farmStructureThenUpgrade(spawnName,creepName,bodyPlan,id,room.controller.id)
                    }else{
                        let sid = (c % 2);
                        let id = container_ids[sid]?container_ids[sid]:container_ids[0];
                        
                        let container = Game.getObjectById(id);
                        let conSite = mb.getNearestConstruction(container.pos, [roomName]);
                        
                        if(config.buildUpSites  && (conSite || repair_ids.length>0)){
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
    harvestPoint:function(spawnName,cname,bodyPlan,target){
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
        //creep.say(target.pos.roomName)
            if(target.pos.roomName===creep.pos.roomName){
                let source =  Game.getObjectById(target.id)
                let res = creep.actOrMoveTo('dropHarvest',source);
                creep.say("dh:"+res)
            }else{
                this.actOrMove2(creep,target,"harvest");
            }
             
        }
    },
    harvestMineral:function(spawnName,cname,bodyPlan,target,resource_type){
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            this.actOrMove2(creep,target,"harvest",resource_type);
        }
    },

    // tin-ses
    claimRoom:function(spawnName,cname,target,bodyPlan='1cl1m'){
        
        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX(bodyPlan,cname),cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            
            if(controller && controller.reservation && controller.reservation.username!='MadDokMike'){
                 this.actOrMove2(creep,target,"attackController");
            }
            else if(controller && (!controller.sign || (controller.sign &&  controller.sign.username!='MadDokMike') ) ){
                this.actOrMove2(creep,target,'signController',"R.I.P tiny humans.");
            }else{
                creep.say(this.actOrMove2(creep,target,"claimController"));
            }
        }
    },
    reserverRoom:function(spawnName,cname,target,bodyPlan='2c2m'){
        
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
                this.actOrMove2(creep,target,"reserveController");
            }
        }
    },
    scoutRoom:function(spawnName,cname,roomName, bodyPlan='1m'){
       // clog(spawnName)
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
       
            creep.moveOffRoomEdge();
            creep.moveToPos(new RoomPosition(25,25,roomName));
                
           
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
           // creep.say('b:')
            creep.checkAndUpdateState();
            
            if(creep.isWorking()) {
                
                if(site){
                    creep.actOrMoveTo('build',site);
                }
                
            }else if(creep.isCollecting()) {
                
                 if(container){
                    creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
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
            //creep.say('u')
            if(creep.isWorking()) {
                
               let controller = Game.getObjectById(controller_id);
               //clog(controller_id)
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
    // Atack room functions
    // ############################################################################################
    emptyContainersInEnemyRemote:function(spawnName,cname,target,roomTraversal=[], bodyPlan='1m1c'){
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
             let container = Game.getObjectById(target.id);
            
            if(creep.pos.roomName ===target.pos.roomName){ 
                if(creep.isFull()){
                   
                    let dropLoc = rp(container.pos.x-3,container.pos.y,container.pos.roomName);
                    if(creep.pos.isEqualTo(dropLoc)){
                        creep.drop(RESOURCE_ENERGY);
                    }else{
                        creep.moveTo(dropLoc)
                    }
                    
                    
                }else{
                    let res =this.actOrMove2(creep,target,"withdraw",RESOURCE_ENERGY);
                    if(container){
                        let droppedE = container.pos.lookForResource(RESOURCE_ENERGY);
                        creep.pickup(droppedE)
                        
                    }
                }
            }else{
                creep.moveOffRoomEdge();
                if(roomTraversal.length>0){
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{
                    creep.moveTo(new RoomPosition(25,25,target.pos.roomName))
                }
            }
       
        }
    }, 
    // dismantle a structure at a specific position then drop the energy 
    breakStructures: function(spawnName,cname, roomName,ids,parts){
        
         
        if(!Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(creep.pos.roomName!==roomName){
                creep.moveOffRoomEdge();
                creep.moveToPos( new RoomPosition(25,25,roomName) );
            }else{
                
                let oldWall=false;
                for(let id of ids ){
                     oldWall = Game.getObjectById(id);
                     if(oldWall)break;
                }
                creep.actOrMoveTo('dismantle',oldWall);  
            }
             
        }
       
    },
    
    breakStructure:function(spawnName,cname,targetWall,parts){
        if(!Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            this.actOrMove2(creep,targetWall,"dismantle");


        }
    },
    keepRoomClearOfLv0InvaderCores: function(spawnName,cname,roomName,parts){
        
        let room = Game.rooms[roomName];
        if(!room)return;
        
        if(Game.time%10==0)mb.scanRoom(roomName);
        let cores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})
        
        if(!Game.creeps[cname] && cores.length>0){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            creep.actOrMoveTo('attack',cores[0]);
        }
        
    },
    /**
     * Drain all towers for a room with a level 1 invader core, then send in a burst of dismantlers
     * spawnName -
     * roomName - target room to drain & kill
     * stagingSpot - The spot where the dismantlers sit
     * drainSpots - requires array of 2 RoomPositions in the adjacent room
     */
    destroyLv1InvaderCode: function(spawnName,roomName,stagingSpot,drainSpots){
        
        if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
        
        let targets = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_TOWER,STRUCTURE_INVADER_CORE,STRUCTURE_RAMPART]});
         
         let drainerBody = '3*1t1m + 6*1h1m';
         this.drainRoomBounce(spawnName,roomName+'-Dr0',drainSpots[0],drainerBody); 
        this.drainRoomBounce(spawnName,roomName+'-Dr1',drainSpots[1],drainerBody); 
        
        let breakerParts = '10w10m';
        let breakerCount = 4;
        // ramparts on tower > tower > ramparts on core  > other ramparts
        let orderedTargetIDs = ['648026c9c37dd4c36822c97d','648026c9c37dd4c59e22c97e','648026c9c37dd45b8222c983','648026c9c37dd4512f22c97c'];
        for(let i =0; i<breakerCount;i++){
            this.breakStructures(spawnName,roomName+'-Br'+i,orderedTargetIDs,breakerParts);
        }
        // no vision / towers not drained, then breakers sit and wait at staging spot
         if(targets.length==0 || (tower && !tower.isEmpty()) ){

            for(let i =0; i<breakerCount;i++){
                if(Game.creeps[roomName+'-Br'+i] && Game.creeps[roomName+'-Br'+i].pos.roomName==stagingSpot.roomName)
                    Game.creeps[roomName+'-Br'+i].moveTo(stagingSpot)
            }
             
         }
         if(tower && tower.isEmpty()){
            if(Game.creeps['Dr0'] && Game.creeps['Dr0'].pos.roomName=='W14N16')Game.creeps['Dr0'].moveOffRoomEdge();
            if(Game.creeps['Dr1'] && Game.creeps['Dr1'].pos.roomName=='W14N16')Game.creeps['Dr1'].moveOffRoomEdge();
         }
         if(tower && !tower.isEmpty()){
            if(Game.creeps['Dr0'] && Game.creeps['Dr0'].pos.roomName=='W14N16')Game.creeps['Dr0'].moveOnToRoomEdge();
            if(Game.creeps['Dr1'] && Game.creeps['Dr1'].pos.roomName=='W14N16')Game.creeps['Dr1'].moveOnToRoomEdge();
         }
        
        
       // if(Game.creeps['Slammy'])this.breakStructure('Alpha','Slammy',{id:'64793dd4981909c46ea3f590',pos:{x:2,y:21,roomName:'W13N16'}},'5w5m')
        //this.breakStructures('Alpha','Slammy','W13N16',['647931b5eee8b9f9546ccb9f','64793a5aa59895345961216c','647931d7eee8b9ed946ccbab'],'10w10m')
        //this.breakStructures('Alpha','Punchy','W13N16',['647931b5eee8b9f9546ccb9f','64793a5aa59895345961216c','647931d7eee8b9ed946ccbab'],'10w10m')
    },
    constantGuardRoom:function(spawnName,cname,roomName,parts, waitingSpot={x:25,y:25} ){
        if(!Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        
        let hostiles = Game.rooms[roomName].getHostiles();
        let fighters = hostiles.filter(function(hostile){return (hostile.partCount(ATTACK)>0||hostile.partCount(RANGED_ATTACK)>0) });

        if(fighters.length>=3){
            Game.rooms[roomName].controller.activateSafeMode();
        }
        
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.moveOffRoomEdge();
            if(creep.hits<creep.hitsMax)creep.heal(creep);
            
            if(creep.pos.roomName===roomName){
                
                
                if(hostiles.length>0){
                    creep.rangedAttack(hostiles[0])
                     creep.actOrMoveTo("attack",hostiles[0]);
                }else{
                    creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
                }
               
            }else{
                creep.moveToPos( new RoomPosition(25,25,roomName) );
            }
            


        }
    },
    defendRoom: function(spawnName,cname,roomName, ignoreNPCs=false){
        
        if(Memory.invaderSeen===undefined){
            Memory.invaderSeen={};
        }
        // if its been over its predicted life span, then assume its dead
        if(Memory.invaderSeen[roomName] && Memory.invaderSeen[roomName]< Game.time) {
            clog("been "+Memory.invaderSeen[roomName]+" since we saw an invader",roomName);
            delete Memory.invaderSeen[roomName];
        }
        let target = false;
        let rangeTotalCount = 0;
        let meleeTotalCount = 0;
        let healTotalCount = 0;
        
        let hostiles = Game.rooms[roomName]?Game.rooms[roomName].getHostiles():[];
        for(var ref in hostiles){
            
            if(ignoreNPCs && hostiles[ref].owner.username==='Invader'){
                continue;
            }
            
            if(hostiles[ref].partCount(RANGED_ATTACK)>0 || hostiles[ref].partCount(ATTACK)>0 || hostiles[ref].partCount(HEAL)>0){
                // we want to ensure we prioritise store the healer creep, if it exits
                if(healTotalCount===0){
                    target = hostiles[ref];
                }
                
                // if we have many invaders, then size based on creep
                meleeTotalCount += hostiles[ref].partCount(ATTACK);
                rangeTotalCount += hostiles[ref].partCount(RANGED_ATTACK);
                healTotalCount += hostiles[ref].partCount(HEAL);
                
                Memory.invaderSeen[roomName] = Game.time+target.ticksToLive;
            }
        }
        /*
        if(roomName =='W14N18'){
            clog("-------"+roomName+"--------")
            clog(rangeTotalCount,'rangeTotalCount')
            clog(meleeTotalCount,'meleeTotalCount')
            clog(healTotalCount,'healTotalCount')
            clog(hostiles.length,'hostiles')
            clog(target.name,'target')
        }*/
        // only spawn if there is 1 invader. no code to handle2
        if( (target || Memory.invaderSeen[roomName]) && !Game.creeps[cname]){
            let nastyParts = meleeTotalCount+rangeTotalCount+healTotalCount;
            if(nastyParts==0){
                nastyParts = 5;// we lost vision before we could spawn a defender
            }
            
            let baseBody = '2t2m1r1m1a1m +' + nastyParts+'*1a1m';
            if(target && target.body.length>25){
                baseBody='2t2m'+baseBody+'+1h1m';
            }
           // clog(baseBody,cname+" plan:")
            clog(Game.spawns[spawnName].spawnCreepX(baseBody,cname),cname);
        }
       // clog(target.name,creep.name)
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(creep.pos.roomName ===roomName){
                creep.moveOffRoomEdge();
                if(target){
                    this.actOrMove2(creep,target,"attack");
                    creep.rangedAttack(target);
                    creep.heal(creep);
                }else{
                    delete Memory.invaderSeen[roomName];
                    creep.say('safe');
                }
            }else{
                creep.moveOffRoomEdge();
                creep.moveTo(new RoomPosition(25,25,roomName))
            }

            

        }
        return Memory.invaderSeen[roomName];
        
    },
    killCreepsBreakTarget:function(spawnName,cname,roomName,parts,target_id,roomTraversal=[], killCreeps=true){
        if(!Game.creeps[cname]){

            clog(Game.spawns[spawnName].spawnCreepX(parts,cname),cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            creep.heal(creep);
            
           // creep.say('mv:'+roomName)
            if(creep.pos.roomName===roomName){
                
                if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
                
                //creep.say('arrived');
                creep.moveOffRoomEdge();
                
                var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
                
    	        let distC = 99999;
    	        let distF=999999;
    	        let closestCivilian = false;
    	        let closestFighter = false;
    	        if(killCreeps)
    	        for(var ref in hostiles){
    	            let range = creep.pos.getRangeTo(hostiles[ref]);
    	            
    	            if(hostiles[ref].partCount(RANGED_ATTACK)>0 || hostiles[ref].partCount(ATTACK)>0){
    	                if(range<distF){
        	                distF = range;
        	                closestFighter = hostiles[ref];
        	            }
    	            }
    	            //if(hostiles[ref].partCount(WORK)>0 || hostiles[ref].partCount(CARRY)>0){
    	               if(range<distC){
        	                distC = range;
        	                closestCivilian = hostiles[ref];
        	            } 
    	            //}
    	            
    	        }
    	        
    	        if(closestFighter){
    	            /*
    	            if(closestFighter.partCount(RANGED_ATTACK)>0 && closestFighter.pos.getRangeTo(creep)<10 ){
    	                creep.fleeFrom(closestFighter);
    	                creep.say("run awaay!");
    	                return;
    	            }else */
    	            if(closestFighter.partCount(ATTACK)>0 && closestFighter.pos.getRangeTo(creep)<3 ){
    	                //creep.fleeFrom(closestFighter);
    	                creep.actOrMoveTo('attack',closestCivilian);
    	                creep.rangedAttack(closestFighter);
                        //if(Game.time %2==0)creep.say('here here');
                       //  creep.say('kiting');
                        return;
    	            }
    	        }
    	            
    	        if(closestCivilian){    
    	            creep.actOrMoveTo('attack',closestCivilian);
    	            creep.rangedAttack(closestCivilian);
    	            creep.say('raiding');
            
    	        }else{
    	            let target =Game.getObjectById(target_id);
    	           // clog(target,creep.name)  
    	            if(!target){
    	                target = mb.getNearestStructure(creep.pos,[STRUCTURE_CONTAINER,STRUCTURE_ROAD],[roomName]);
    	            }
    	           // clog(target,creep.name)  
                    //if(Game.time %2==0)creep.say('trolling');
                    //else creep.say('pew pew');
    	             creep.actOrMoveTo('attack',target);
    	             creep.actOrMoveTo('rangedAttack',target);
    	        }
                
            }else{
                
                if(roomTraversal.length>0){
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{
                    creep.moveOffRoomEdge();
                    creep.moveTo(new RoomPosition(25,25,roomName))
                }
                
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
           // clog(built,'built');
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
    healBuddy: function(spawnName,cname, buddyName, bodyPlan){
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX( bodyPlan ,cname, {memory:{arrived:false}} ),spawnName+':'+cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(creep.hits < creep.hitsMax){
                creep.heal(creep);
            }
            let buddy = Game.creeps[buddyName];
            if(buddy){
                
                if(buddy.hits<buddy.hitsMax){
                    creep.heal(buddy);
                }
                
                creep.moveToPos(buddy.pos)
                creep.moveOffRoomEdge();
            }
            
            
        }
    },
    drainRoomBounce:function(spawnName,cname, retreatRoomPos, bodyPlan){
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX( bodyPlan ,cname, {memory:{arrived:false}} ),spawnName+':'+cname);
        }
                
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            this.roomBounceDrain(creep,retreatRoomPos)
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
                    let moveTarget = (target && roomData.towers_with_energy<2)?target: roomData.checkpoint; // target
    
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
        
        if(!creep.memory.arrived && !creep.pos.isEqualTo(retreatRoomPos)){
            creep.moveTo(retreatRoomPos);
            creep.moveOffRoomEdge();
        }
        if(!creep.memory.arrived && creep.pos.isEqualTo(retreatRoomPos)){
            creep.memory.arrived =true;
        }
        
        if(creep.memory.arrived){
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
        }       

    },

        // ############################################################################################
    // Generic temp functions used in many functions
    // ############################################################################################
    
    // when a target is far away, provide a bridging travel function, to avoid crazy CPU on moveTo pathfinding
    traverseRooms:function(creep,roomNames){
        if(creep.name=='Bob3')clog(roomNames,creep.name)
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
            if(creep.name=='Bob3')clog(res,creep.name)
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
            //if(creep.name=='At0')clog(pos,'At0')
            creep.moveOffRoomEdge();
            let res = creep.moveToPos(pos);
            return res;
            
        }
        
    },

    creepsReady:function(creepNames){
        for(let cn of creepNames){
            if(Game.creeps[cn]===undefined)return false;
            if(Game.creeps[cn].spawning)return false;
        }
        return true;
    },
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
        
        let enemies = (Game.rooms[checkpoint.roomName])?Game.rooms[checkpoint.roomName].find(FIND_HOSTILE_CREEPS):[];
        
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
    
    // ############################################################################################
    // Fill code functions
    // ############################################################################################
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
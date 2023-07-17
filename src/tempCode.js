let tankerRole=require('role.tanker');
const roomNode = require('class.roomNode');
//let builderRole = require('role.builder');
module.exports = {
    
// attack on Game.time 1075909. invader quad
    // safemode, retreat, if breaks hceal()
    // keep duo together, leader running off
    run:function(){
        //return;
        let ids = ['6480e32a59a8be25e7ae82ed','6480e32a59a8be25e7ae82ed'];
        let tid= ids[0];
        for(let id of ids){
            if(Game.getObjectById(id)){
                tid = id;
            }
        }
        
        if(!mb.hasRoom('W13N12'))mb.scanRoom('W13N12')
         
         this.streamResource('Gamma','Beta',RESOURCE_ENERGY,500000,100000);  
        //this.streamResource('Beta','Epsilon',RESOURCE_ENERGY,200000,10000)
       // this.streamResource('Gamma','Strip-W16N17',RESOURCE_ENERGY,5000,2000)
       // this.streamResource('Alpha','Beta',RESOURCE_ENERGY,500000,300000)
        //this.streamResource('Zeta','Delta',RESOURCE_ENERGY,500000,300000)
        //this.streamResource('Alpha','Strip-W16N17',RESOURCE_ENERGY,100000,5000,5000)
       // this.streamResource('Alpha','Strip-W16N17',RESOURCE_ENERGY,800000,500000,5000)
        
      //  this.streamResource('Zeta','Gamma',RESOURCE_ENERGY,500000,300000)
       // this.streamResource('Alpha','Epsilon',RESOURCE_ENERGY,600000,500000)
        //this.streamResource('Epsilon','Zeta',RESOURCE_ENERGY,600000,300000,20000);
        //this.streamResource('Epsilon','Delta',RESOURCE_ENERGY,700000,600000,5000);

 
    /**
     * manage the config of what resources different rooms want. This assumes they've already been hauled to the terminal.
     * see manageMineralHauling()
     * importerConfigs - array of objs with this template: {importer:'Alpha',resource_type:RESOURCE_OXYGEN,storageCap:50000}
     * exporters - an array of rooms who are exporting, such as ['Alpha','Beta'...]
     */
        this.manageInterRoomTrading([ 
                {importer:'Gamma',resource_type:RESOURCE_LEMERGIUM,storageCap:50000},
                {importer:'Gamma',resource_type:RESOURCE_ZYNTHIUM,storageCap:50000},
                {importer:'Gamma',resource_type:RESOURCE_ZYNTHIUM_KEANITE,storageCap:50000},
                
               /* {importer:'Zeta',resource_type:RESOURCE_GHODIUM_ACID,storageCap:18000},*/
                
                {importer:'Alpha',resource_type:RESOURCE_HYDROXIDE,storageCap:18000},
                {importer:'Alpha',resource_type:RESOURCE_HYDROGEN,storageCap:18000},
                {importer:'Alpha',resource_type:RESOURCE_GHODIUM,storageCap:24000},
                {importer:'Alpha',resource_type:RESOURCE_UTRIUM_ALKALIDE,storageCap:24000},
                
                {importer:'Beta',resource_type:RESOURCE_GHODIUM_ACID,storageCap:18000},
                {importer:'Beta',resource_type:RESOURCE_UTRIUM_ALKALIDE,storageCap:18000},
                
                {importer:'Delta',resource_type:RESOURCE_GHODIUM_ACID,storageCap:18000},
                {importer:'Delta',resource_type:RESOURCE_OXYGEN,storageCap:18000},
               
                {importer:'Epsilon',resource_type:RESOURCE_HYDROXIDE,storageCap:18000}
            ],
            ['Alpha','Zeta','Gamma','Epsilon','Delta']);


        /////////// Alpha         /////////// 
        this.manageMineralHauling('Alpha',
            [
                {id:'6487afae7817371e6cef1dd8',resource_type:RESOURCE_GHODIUM,action:'fill'},
                {id:'648728193d915148ff1d3911',resource_type:RESOURCE_GHODIUM_HYDRIDE,action:'fill'},

                {id:'64a53bff66e7669492b5b659',resource_type:RESOURCE_GHODIUM_ACID,action:'empty',phaseOut:true},                
                {id:'64a53bff66e7669492b5b659',resource_type:RESOURCE_ZYNTHIUM_OXIDE,action:'fill'},
                {id:'6487d4aba1ad7797ace7c0a1',resource_type:RESOURCE_HYDROXIDE,action:'fill'},
                {id:'64875c1d820c464f9e4a5774',resource_type:RESOURCE_GHODIUM_HYDRIDE,action:'fill'},
                
                
                {id:'648771d4ea93d5700d04f97d',resource_type:RESOURCE_HYDROGEN,action:'fill'},
                {id:'6487f21514b4db61c6d46a2b',resource_type:RESOURCE_GHODIUM_ACID,action:'empty'},
                
                
                
                {id:'64a55fad1f1cd7030d011b7f',resource_type:RESOURCE_LEMERGIUM_ALKALIDE,action:'fill'},
                {id:'64a54b8e66e766bad4b5bd88',resource_type:RESOURCE_GHODIUM_ACID,action:'empty',phaseOut:true},
                {id:'64a54b8e66e766bad4b5bd88',resource_type:RESOURCE_ZYNTHIUM_ACID,action:'fill'},
                {id:'64a57747038fbe71ec1507b2',resource_type:RESOURCE_UTRIUM_ACID,action:'fill'},
                
             
            ],
            [RESOURCE_HYDROXIDE,RESOURCE_GHODIUM,RESOURCE_OXYGEN,RESOURCE_HYDROGEN,RESOURCE_UTRIUM_ALKALIDE,RESOURCE_UTRIUM_ACID],
            [
                {resource_type:RESOURCE_LEMERGIUM,exportOver:0,batchSize:12000},
                {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:12000},
                {resource_type:RESOURCE_ZYNTHIUM_KEANITE,exportOver:0,batchSize:20000},
                {resource_type:RESOURCE_UTRIUM_HYDRIDE,exportOver:300,batchSize:6000},
                {resource_type:RESOURCE_GHODIUM_ACID,exportOver:6000,batchSize:6000},
                {resource_type:RESOURCE_UTRIUM_ACID,exportOver:1,batchSize:6000},
                {resource_type:RESOURCE_ENERGY,exportOver:100000,batchSize:50000}
            ],
            rp(12,29,'W14N18'))
        // RESOURCE_GHODIUM_HYDRIDE
        this.runLabTrio('648728193d915148ff1d3911','6487afae7817371e6cef1dd8','648771d4ea93d5700d04f97d')
        this.runLabTrio('64875c1d820c464f9e4a5774','6487afae7817371e6cef1dd8','648771d4ea93d5700d04f97d')
        // RESOURCE_GHODIUM_ACID
      // this.runLabTrio('64a53bff66e7669492b5b659','6487d4aba1ad7797ace7c0a1','64875c1d820c464f9e4a5774')
       this.runLabTrio('6487f21514b4db61c6d46a2b','6487d4aba1ad7797ace7c0a1','64875c1d820c464f9e4a5774')
       // this.runLabTrio('64a54b8e66e766bad4b5bd88','6487d4aba1ad7797ace7c0a1','64875c1d820c464f9e4a5774')
        
       // RESOURCE_HYDROXIDE
       // this.runLabTrio('64a54b8e66e766bad4b5bd88','648771d4ea93d5700d04f97d','6487f21514b4db61c6d46a2b')
       // this.runLabTrio('6487d4aba1ad7797ace7c0a1','648771d4ea93d5700d04f97d','6487f21514b4db61c6d46a2b')
       
       // RESOURCE_ZYNTHIUM_OXIDE
        //this.runLabTrio('64a57747038fbe71ec1507b2','64a55fad1f1cd7030d011b7f','64a54b8e66e766bad4b5bd88')

        //////////////////////////////////////////////////
        
        /////////// Gamma         ///////////
         this.manageMineralHauling('Gamma',
            [
                {id:'64ab58f0838496a118005fef',resource_type:RESOURCE_GHODIUM,action:'empty'},
                
                {id:'6498e6cc5990a50bdb4e9841',resource_type:RESOURCE_UTRIUM_LEMERGITE,action:'fill'},
                {id:'6497ed17654a8057187c244e',resource_type:RESOURCE_UTRIUM,action:'fill'},
                {id:'6498725ffb058cee23ece3e7',resource_type:RESOURCE_LEMERGIUM,action:'fill'},
                
                {id:'649a8f82fb058c2ff9ede38f',resource_type:RESOURCE_ZYNTHIUM_KEANITE,action:'fill'},
                {id:'64996ab5282181f1b707225d',resource_type:RESOURCE_ZYNTHIUM,action:'fill'},
                {id:'649a30033e99bf8327e1a894',resource_type:RESOURCE_KEANIUM,action:'fill'},
                
                {id:'64ad7ca82cc0b6f6e5787555',resource_type:RESOURCE_LEMERGIUM_OXIDE,action:'empty',phaseOut:true},
                {id:'64ab8de7b4e019a4313d9681',resource_type:RESOURCE_GHODIUM,action:'empty'},
                {id:'64ab268b038fbe528e175e7b',resource_type:RESOURCE_GHODIUM,action:'empty'},
            ],
            [RESOURCE_OXYGEN,RESOURCE_ZYNTHIUM,RESOURCE_UTRIUM],
            [
                {resource_type:RESOURCE_HYDROGEN,exportOver:300,batchSize:6000},
                {resource_type:RESOURCE_GHODIUM,exportOver:300,batchSize:6000},
                {resource_type:RESOURCE_LEMERGIUM_OXIDE,exportOver:300,batchSize:6000}
            ],
            rp(6,29,'W13N15'))
        // RESOURCE_UTRIUM_LEMERGITE
        this.runLabTrio('6498e6cc5990a50bdb4e9841','6497ed17654a8057187c244e','6498725ffb058cee23ece3e7')
        // RESOURCE_ZYNTHIUM_KEANITE
        this.runLabTrio('649a8f82fb058c2ff9ede38f','64996ab5282181f1b707225d','649a30033e99bf8327e1a894')
        // GHODIUM
        this.runLabTrio('64ab58f0838496a118005fef','649a8f82fb058c2ff9ede38f','6498e6cc5990a50bdb4e9841')
        this.runLabTrio('64ab268b038fbe528e175e7b','649a8f82fb058c2ff9ede38f','6498e6cc5990a50bdb4e9841')
        this.runLabTrio('64ab8de7b4e019a4313d9681','649a8f82fb058c2ff9ede38f','6498e6cc5990a50bdb4e9841')
        // RESOURCE_LEMERGIUM_OXIDE
        //this.runLabTrio('64ad7ca82cc0b6f6e5787555','64ab8de7b4e019a4313d9681','64ab268b038fbe528e175e7b')
        //////////////////////////////////////////////////  
        /////////// Delta         /////////// 
                this.manageMineralHauling('Delta',
            [
                {id:'64b307ece8ddd4754fa5441f',resource_type:RESOURCE_GHODIUM_ACID,action:'fill'}

            ],
            [RESOURCE_GHODIUM_ACID],
            [
                {resource_type:RESOURCE_HYDROGEN,exportOver:6000,batchSize:6000}
            ],
            rp(12,29,'W12N23'))
                    //////////////////////////////////////////////////  
        /////////// Epsilon         /////////// 

        this.manageMineralHauling('Epsilon',
            [
                {id:'64a496cec3d595d17cfa0844',resource_type:RESOURCE_HYDROXIDE,action:'empty',phaseOut:true},
                {id:'64a396d6a2b95a5fa4e4a02b',resource_type:RESOURCE_UTRIUM_OXIDE,action:'fill'},
                {id:'64a4c1cec3d5957c2efa1ae5',resource_type:RESOURCE_HYDROGEN,action:'empty'},
               
                {id:'64a42fff5a7231fbc0e59d24',resource_type:RESOURCE_UTRIUM_ALKALIDE,action:'empty'},
                
                {id:'64a3e76fb0d622862949537d',resource_type:RESOURCE_UTRIUM_HYDRIDE,action:'fill'},
                {id:'64a50bf066e7665a30b59fe4',resource_type:RESOURCE_UTRIUM_ACID,action:'empty'},
                
                {id:'64a42fff5a7231fbc0e59d24',resource_type:RESOURCE_ENERGY,action:'fill'},
            ],
            [RESOURCE_HYDROGEN,RESOURCE_HYDROXIDE,RESOURCE_UTRIUM_HYDRIDE,RESOURCE_OXYGEN],
            [
                {resource_type:RESOURCE_UTRIUM_ALKALIDE,exportOver:300,batchSize:6000},
                 {resource_type:RESOURCE_UTRIUM_ACID,exportOver:300,batchSize:6000},
                {resource_type:RESOURCE_UTRIUM,exportOver:50000,batchSize:12000},
                {resource_type:RESOURCE_GHODIUM_ACID,exportOver:1,batchSize:6000}
            ],
            rp(41,6,'W12N13'))
        // RESOURCE_HYDROXIDE
       // this.runLabTrio('64a496cec3d595d17cfa0844','64a396d6a2b95a5fa4e4a02b','64a4c1cec3d5957c2efa1ae5')
        // RESOURCE_UTRIUM_ACID
       // this.runLabTrio('64a50bf066e7665a30b59fe4','64a3e76fb0d622862949537d','64a496cec3d595d17cfa0844')
            
        //////////////////////////////////////////////////
        
        /////////// Zeta         ///////////     
        this.manageMineralHauling('Zeta',
            [
                
                {id:'64a8b19566e7660c53b73a87',resource_type:RESOURCE_OXYGEN,action:'fill'},
                {id:'649eaebef77c6ef5f76803c3',resource_type:RESOURCE_HYDROGEN,action:'fill'},
                {id:'64a85c6ec449d31ba1a8320a',resource_type:RESOURCE_GHODIUM_ACID,action:'fill'},
                {id:'649ea2cf0b6a4a65f03edc13',resource_type:RESOURCE_HYDROXIDE,action:'empty'},
                
                {id:'64aee553a7a98d1b5bfd8da1',resource_type:RESOURCE_HYDROXIDE,action:'empty'},
                {id:'64aeda006d8f126a99edc7de',resource_type:RESOURCE_HYDROXIDE,action:'empty'}
            ],
            [RESOURCE_HYDROGEN],
            [
                {resource_type:RESOURCE_HYDROXIDE,exportOver:300,batchSize:18000},
                {resource_type:RESOURCE_GHODIUM_ACID,exportOver:300,batchSize:6000},
                {resource_type:RESOURCE_OXYGEN,exportOver:50000,batchSize:24000}
            ],
            rp(13,22,'W12N19'))
        this.runLabTrio('64aee553a7a98d1b5bfd8da1','649eaebef77c6ef5f76803c3','64a8b19566e7660c53b73a87')
        this.runLabTrio('64aeda006d8f126a99edc7de','649eaebef77c6ef5f76803c3','64a8b19566e7660c53b73a87')
        
        //this.runLabTrio('64a85c6ec449d31ba1a8320a','649eaebef77c6ef5f76803c3','64a8b19566e7660c53b73a87')
        this.runLabTrio('649ea2cf0b6a4a65f03edc13','649eaebef77c6ef5f76803c3','64a8b19566e7660c53b73a87')
            
        let thing=this;
        
        if(Game.creeps['trader'])
            this.trader('Beta','trader','6482024bb7e50830ad046a96',RESOURCE_UTRIUM,'W19N23','649f7b5a26b6445839a14755',RESOURCE_OXYGEN,[] ,400,'1c1m')
        
 
        let lightPeltastBody = '2m1a2r3m';
        let mediumPeltastBody = '3m2a4r6m';
        let heavyPeltastBody = '4m2a6r10m1h';
        let superHeavyPeltastBody = '4m8r2a12m2h';
        let spartanBody='14m6a10r18m2h';
        let hopliteBody='8m8a';
        let roomTraves = ['W14N18','W14N19','W14N20','W14N21','W15N21','W15N22','W15N23','W15N24','W15N25'];
        
        
        let drainerBody = '3*1a1m + 6*1h1m';
       // this.claimReactor('Alpha-3','thor-ninja1',{id:'646f55e99bdd4e0008300cfc',pos:{x:12,y:16,roomName:'W15N25'}},'3m1cl');
      
        this.scoutRoom('Theta','Tscout','W15N25')
        if(!mb.hasRoom('W15N25'))mb.scanRoom('W15N25')
       // this.killCreepsBreakTarget('Gamma-3','feck','W14N15','25m20a5h',[],[], true,{x:40,y:9})
        
        this.rotateCreep('SwampyJim-', function(activeCreepName){
           // if(Game.creeps[activeCreepName])
            //thing.killCreepsBreakTarget('Alpha-2',activeCreepName,'W15N25','3m15m15a15m1h1m',[],roomTraves, true,{x:12,y:18})
           // thing.constantGuardRoom('Alpha-2',activeCreepName,'W15N25','3m15m15a15m1h1m',{x:26,y:25},false,false,7,[]);
           thing.maintainRoadsInRoom('Alpha-2',activeCreepName,'W15N25','4m4w4c4m',false)
        },600)
        this.rotateCreep('SwampyBob-', function(activeCreepName){
           /// if(Game.creeps[activeCreepName])
           // thing.killCreepsBreakTarget('Alpha-3',activeCreepName,'W15N25','3m15m15a15m1h1m',[],roomTraves, true,{x:12,y:18})
           // thing.constantGuardRoom('Alpha-2',activeCreepName,'W15N25','3m15m15a15m1h1m',{x:25,y:25},false,false,7,[]);
          // thing.maintainRoadsInRoom('Alpha-3',activeCreepName,'W15N25','4m4w4c4m')
        },700)
        this.rotateCreep('Peltast1-', function(activeCreepName){
           // if(Game.creeps[activeCreepName])
            thing.killCreepsBreakTarget('Zeta-2',activeCreepName,'W11N17',heavyPeltastBody,['64b475dfe8dc39bce3d688a2'],[], true,{x:23,y:20})
           // thing.constantGuardRoom('Alpha-2',activeCreepName,'W15N25','3m15m15a15m1h1m',{x:26,y:25},false,false,7,[]);
           //thing.maintainRoadsInRoom('Alpha-2',activeCreepName,'W15N25','4m4w4c4m')
        },700)

        this.rotateCreep('thor-ninja-', function(activeCreepName){
              //  thing.claimReactor('Alpha-3',activeCreepName,{id:'646f55e99bdd4e0008300cfc',pos:{x:12,y:16,roomName:'W15N25'}},'5m1cl');
        },700)
        this.haulResources('Alpha-3','AfeX1','25*1c1m',gob('647a92e8655cd29697596191'),gob('64b557aee11f98f3318b0a56'),[RESOURCE_ENERGY],[],4000,500);
        this.haulResources('Alpha-3','AfeX1','25*1c1m',gob('647a92e8655cd29697596191'),gob('64b557aee11f98f3318b0a56'),[RESOURCE_ENERGY],[],4000,500);
        
        //#####################################################################################
        // Season - Iota Tasks
        //##################################################################################### 
        
        // >>     W13N18
        this.defendRoom('Iota','Id0','W13N12');
        this.maintainRoadsInRoom('Iota','Aw0','W13N12','1w3c1m');
        this.harvestPoint('Iota','Ihr0','6w1c3m',{id:'646e730c071eb8276c0a677f',pos:{x:11,y:19,roomName:'W13N12'}});
        this.reserverRoom('Iota','Ir0',{id:'646e730c071eb8276c0a6780',pos:{x:38,y:23,roomName:'W13N12'}},'1cl11m');
        this.harvestPoint('Iota','Ihr1','6w1c3m',{id:'646e730c071eb8276c0a6781',pos:{x:23,y:20,roomName:'W13N12'}});

   
        //#####################################################################################
        // Season - Alpha Tasks
        //#####################################################################################
        let storage = gob('647a92e8655cd29697596191'); 
        let terminal =  gob('648140f8676bfd1d7f18d344');

 
        this.harvestAndCollectMineral('Alpha','64765074d6ad5e002e061938','6484f6fab2d65ba2f7fa148b','647a92e8655cd29697596191',RESOURCE_ZYNTHIUM,'5m10c','39w10m1c')
        let smallBody = '4*1c1m';
        let mediumBody = '6*1c1m';
        let bigBody = '8*1c1m';
        let AlphaHaulerN = 0;
        let controllerW14N18 = Game.getObjectById('646e72de071eb8276c0a65a9');
        let storageW14N18 = Game.getObjectById('647a92e8655cd29697596191');
        let alphaReturnTo = (controllerW14N18.haveContainer() && storageW14N18.storedAmount()>5000)?controllerW14N18.getContainer():storageW14N18;


        /////  Alpha Remotes  ///////////////////////////////////////////////////////////////////////////////////////////////////////  
        
        // >>     W13N18
        this.defendRoom('Alpha','Ad0','W13N18');
        this.maintainRoadsInRoom('Alpha','Aw0','W13N18','1w3c1m');
        this.harvestPoint('Alpha','Ahr0','6w1c3m',{id:'646e7309071eb8276c0a6768',pos:{x:11,y:19,roomName:'W13N18'}});
        this.reserverRoom('Alpha','Ar0',{id:'646e7309071eb8276c0a676a',pos:{x:38,y:23,roomName:'W13N18'}},'2cl2m');
        this.harvestPoint('Alpha','Ahr1','6w1c3m',{id:'646e7309071eb8276c0a6769',pos:{x:23,y:20,roomName:'W13N18'}});

        // >>     W15N18
        this.defendRoom('Alpha','Ad1','W15N18');
        this.maintainRoadsInRoom('Alpha','Aw1','W15N18','2w6c2m');
       
        
        this.reserverRoom('Alpha','Ar1',{id:'646e72b3071eb8276c0a63d5',pos:{x:12,y:9,roomName:'W15N18'}},'2cl2m');
        this.harvestPoint('Alpha','Ahr3','6w1c3m',{id:'646e72b3071eb8276c0a63d7',pos:{x:42,y:31,roomName:'W15N18'}});
        this.harvestPoint('Alpha','Ahr4','6w1c3m',{id:'646e72b3071eb8276c0a63d6',pos:{x:10,y:22,roomName:'W15N18'}});
        this.keepRoomClearOfLv0InvaderCores('Alpha','Aa1','W15N18','3a3m');
        this.keepRoomClearOfLv0InvaderCores('Alpha','Aa2','W15N18','3a3m');
        
        
        // >>  W14N17 
         this.defendRoom('Alpha','Ad2','W14N17');
         
        this.maintainRoadsInRoom('Alpha','Aw2','W14N17','2w6c2m');
        this.reserverRoom('Alpha','Ar2',{id:'646e72df071eb8276c0a65ad',pos:{x:12,y:9,roomName:'W14N17'}},'2cl2m');
        this.harvestPoint('Alpha','Ahr5','6w1c3m',{id:'646e72df071eb8276c0a65ae',pos:{x:18,y:45,roomName:'W14N17'}});
        
        this.keepRoomClearOfLv0InvaderCores('Alpha','Aa1','W14N17','3a3m');
        this.keepRoomClearOfLv0InvaderCores('Alpha','Aa2','W14N17','3a3m');
         
          // W14N19 
          this.defendRoom('Alpha','Ad3','W14N19');
          this.maintainRoadsInRoom('Alpha','Aw3','W14N19','2w6c2m');
          this.reserverRoom('Alpha','Ar3',{id:'646e72de071eb8276c0a65a6',pos:{x:35,y:9,roomName:'W14N19'}},'2cl2m');
         this.harvestPoint('Alpha','Ahr7','6w1c3m',{id:'646e72de071eb8276c0a65a7',pos:{x:25,y:42,roomName:'W14N19'}});
         this.harvestPoint('Alpha','Ahr10','6w1c3m',{id:'646e72de071eb8276c0a65a5',pos:{x:34,y:10,roomName:'W14N19'}});
         
         // >>  W15N19  
         this.defendRoom('Alpha','Ad4','W15N19');
         this.maintainRoadsInRoom('Alpha','Aw4','W15N19','2w6c2m');
        this.reserverRoom('Alpha','Ar4',{id:'646e72b2071eb8276c0a63d2',pos:{x:12,y:9,roomName:'W15N19'}},'2cl2m');
        this.harvestPoint('Alpha','Ahr8','6w1c3m',{id:'646e72b2071eb8276c0a63d3',pos:{x:18,y:45,roomName:'W15N19'}});
        this.harvestPoint('Alpha','Ahr9','6w1c3m',{id:'646e72b2071eb8276c0a63d1',pos:{x:18,y:45,roomName:'W15N19'}});
         
     

        //#####################################################################################
        // Season - Beta Tasks
        //#####################################################################################
        this.harvestAndCollectMineral('Beta','646f55fc9bdd4e00083015be','64af223e48c225e71506e03d','64aed2b229eec8241264b69a',RESOURCE_THORIUM,'2m4c','20w5m1c')
        
        
        
        /////// W18N18  ////////////////////////////////////////
         this.defendRoom('Beta','Bd1','W18N18');
        this.maintainRoadsInRoom('Beta','Bw1',['W18N18','W18N17'],'1w3c1m');
        this.harvestPoint('Beta','Bhr1','4w1c2m',{id:'646e7231071eb8276c0a5f38',pos:{x:14,y:17,roomName:'W18N18'}});
        /////// W17N17  ////////////////////////////////////////
         this.defendRoom('Beta','Bd2','W17N17');
        this.maintainRoadsInRoom('Beta','Bw2',['W17N17','W17N16'],'2w6c1m');
        this.reserverRoom('Beta','Br1',{id:'646e725d071eb8276c0a607d',pos:{x:30,y:31,roomName:'W17N17'}},'2cl2m');
        this.harvestPoint('Beta','Bhr2','6w1c3m',{id:'646e725d071eb8276c0a607e',pos:{x:14,y:17,roomName:'W17N17'}});
        /////// W17N16  ////////////////////////////////////////
         this.defendRoom('Beta','Bd2','W17N16');
        this.reserverRoom('Beta','Br2',{id:'646e725e071eb8276c0a6081',pos:{x:30,y:4,roomName:'W17N16'}},'2cl2m');
        this.harvestPoint('Beta','Bhr3','6w1c3m',{id:'646e725e071eb8276c0a6080',pos:{x:30,y:4,roomName:'W17N16'}});
        /////// W19N17  ////////////////////////////////////////
         this.defendRoom('Beta','Bd3','W19N17');
         this.maintainRoadsInRoom('Beta','Bw1',['W19N17','W18N17'],'1w3c1m');
        //this.reserverRoom('Beta','Br2',{id:'646e725e071eb8276c0a6081',pos:{x:30,y:4,roomName:'W17N16'}},'2cl2m');
        this.harvestPoint('Beta','Bhr4','4w1c2m',{id:'646e7205071eb8276c0a5df9',pos:{x:30,y:4,roomName:'W19N17'}});

        //#####################################################################################
        // Season - Gamma Tasks
        //#####################################################################################
        let storageG = gob('648483965bdc7e637d357f8f'); 
        let terminalG =  gob('6487f218a38d042a92467fce');
        //398
        
         this.emptyOutStoresAndRetrieve('Gamma-3','W12N16-salvage','W12N16','648483965bdc7e637d357f8f','10*1c1m')
      
        this.harvestAndCollectCentreSectorMineral('Gamma','64765074d6ad5e002e062c85',rp(11,9,'W15N15'),'648483965bdc7e637d357f8f',RESOURCE_KEANIUM,'8*1c1m','10*2w1c1m','-k-W15N15',2)
        this.harvestAndCollectCentreSectorMineral('Gamma-2','64765074d6ad5e002e061980',rp(41,31,'W13N15'),'648483965bdc7e637d357f8f',RESOURCE_LEMERGIUM,'4*2c1m','10*2w1c1m','-L-W13N15')
        
 
      /// 
       //this.soloMineSKRoomSource('Gamma','BobX3',{id:'646e72e0071eb8276c0a65b9',pos:{x:38,y:6,roomName:'W14N15'}});
       

       //harvestAndCollectCentreSectorMineral:function(spawnName,mineral_id,standingSpot,store_id,mineral_type,haulerBody='1m2c',harvesterBody='10W2m',creep_suffix='')

        let storageW13N15 = false;
        
       this.harvestAndCollectMineral('Gamma','64765074d6ad5e002e061980','6488f92acb55935aba62c50a','648483965bdc7e637d357f8f',RESOURCE_LEMERGIUM,'5m10c','39w1c10m')         
        /////// W13N16  ////////////////////////////////////////
        //this.scoutRoom('Gamma','Gsc1','W13N16');
        let invadersInW13N16 = this.defendRoom('Gamma','Gd0','W13N16');
        this.reserverRoom('Gamma','Gr0',{id:'646e730a071eb8276c0a6770',pos:{x:7,y:26,roomName:'W13N16'}},'2cl1m');
        let controllerW13N16 = Game.getObjectById('646e730a071eb8276c0a6770');
        if(controllerW13N16 && controllerW13N16.reservation && controllerW13N16.reservation.username=='Invader'){
            this.reserverRoom('Gamma','Gr0-x',{id:'646e730a071eb8276c0a6770',pos:{x:7,y:26,roomName:'W13N16'}},'2cl1m');
        }else{
            this.harvestPoint('Gamma','Ghr1','6w1c3m',{id:'646e730a071eb8276c0a6772',pos:{x:6,y:38,roomName:'W13N16'}});
            this.harvestPoint('Gamma','Ghr2','6w1c3m',{id:'646e730a071eb8276c0a6771',pos:{x:4,y:38,roomName:'W13N16'}});
        
        }
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga1','W13N16','3a3m');
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga2','W13N16','3a3m');
        this.maintainRoadsInRoom('Gamma-2','Gw0',['W13N16'],'2w6c2m');
        /////// W12N15 ////////////////////////////////////////
        this.defendRoom('Gamma','Gd1','W12N15');
       // this.scoutRoom('Gamma','Gsc2','W12N15');
        this.maintainRoadsInRoom('Gamma-2','Gw1',['W12N15'],'2w6c2m');
        this.reserverRoom('Gamma','Gr1',{id:'646e7335071eb8276c0a68c3',pos:{x:30,y:31,roomName:'W12N15'}},'2cl2m');
        this.harvestPoint('Gamma','Ghr3','6w1c3m',{id:'646e7335071eb8276c0a68c2',pos:{x:14,y:17,roomName:'W12N15'}});
        this.harvestPoint('Gamma','Ghr4','6w1c3m',{id:'646e7335071eb8276c0a68c1',pos:{x:14,y:17,roomName:'W12N15'}});
        /////// W12N16 ////////////////////////////////////////
       if(Game.creeps['Ghr6'])this.harvestPoint('Gamma','Ghr6','4w1c2m',{id:'646e7335071eb8276c0a68bf',pos:{x:30,y:45,roomName:'W12N16'}});
        
        /////// W13N14 ////////////////////////////////////////
        let invadersInW12N15 = this.defendRoom('Gamma','Gd2','W13N14');
        this.reserverRoom('Gamma','Gr2',{id:'646e730b071eb8276c0a6779',pos:{x:7,y:26,roomName:'W13N14'}},'2cl2m');
        this.maintainRoadsInRoom('Gamma-2','Gw2',['W13N14'],'2w6c2m');
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga3','W13N14','3a3m');
        this.keepRoomClearOfLv0InvaderCores('Gamma','Ga4','W13N14','3a3m');
        //this.scoutRoom('Gamma','Gsc1','W12N15');
        this.harvestPoint('Gamma','Ghr5','4w1c2m',{id:'646e730b071eb8276c0a6778',pos:{x:7,y:5,roomName:'W13N14'}});
        
        /////// W14N14 ////////////////////////////////////////
        //this.defendRoom('Gamma','Gd3','W14N14',true);
        //this.harvestPoint('Gamma','Ghr7','10w1c5m',{id:'646e72e0071eb8276c0a65c3',pos:{x:38,y:4,roomName:'W14N14'}});
       // this.harvestPoint('Gamma','Ghr8','10w1c5m',{id:'646e72e0071eb8276c0a65c7',pos:{x:16,y:38,roomName:'W14N14'}});

        

        /////// W14N16 ////////////////////////////////////////

       // this.harvestPoint('Gamma','W14N16-hr1','10w1c5m',{id:'646e72df071eb8276c0a65b4',pos:{x:40,y:39,roomName:'W14N16'}});
       // this.harvestPoint('Gamma','W14N16-hr2','10w1c5m',{id:'646e72df071eb8276c0a65b2',pos:{x:40,y:39,roomName:'W14N16'}});
       // this.maintainRoadsInRoom('Gamma-2','Gw3',['W14N15','W14N16'],'2w6c2m');
       // this.maintainRoadsInRoom('Gamma-2','Gw3+1',['W14N15','W14N16'],'2w6c2m');
        
       // this.maintainRoadsInRoom('Gamma-2','Gw3+2',['W14N15','W14N16'],'2w6c2m');
         
        this.rotateCreep('W14N16-guard', function(activeCreepName){
            //let target = thing.constantGuardSKRoom('Gamma-3',activeCreepName,'W14N16',['646e72df071eb8276c0a65b6','646e72df071eb8276c0a65b3','646e72df071eb8276c0a65b5'])
            // duoHealer:function(spawnName,cname,parts,leaderName, leadersTarget, allies=[],renewSpawn=false,boostPlans=[],spawnFacing=LEFT){
           // if(Game.creeps[activeCreepName])thing.duoHealer('Gamma-2',activeCreepName+'-healer','2m10h10m',activeCreepName, target, [])
        },300)
        
         /////// W14N15 ////////////////////////////////////////

        this.harvestAndCollectCentreSectorMineral('Gamma','64765074d6ad5e002e062ca3',rp(32,44,'W14N15'),'648483965bdc7e637d357f8f',RESOURCE_HYDROGEN,'8*1c1m','10*2w1c1m','-H-W13N15')
        if(gob('64765074d6ad5e002e062ca3') && gob('64765074d6ad5e002e062ca3').mineralAmount>0){
            this.rotateCreep('W14N15-guard', function(activeCreepName){
                let target = thing.constantGuardSKRoom('Gamma-3',activeCreepName,'W14N15',['646e72e0071eb8276c0a65bd'])
            },250)
        }


 
        //#####################################################################################
        // Season - Delta Tasks
        //#####################################################################################
       // this.emptyContainersInEnemyRemote('Delta','mosquito-1',{id:'64a418669ca314740e7a759f',pos:{x:45,y:39,roomName:'W13N31'}},[], rp(9,37,'W12N30'), rp(32,41,'W13N31'))
       let container_id ='64ae43e829eec8738c647af3';
        this.harvestAndCollectMineral('Delta','64765074d6ad5e002e0619d3','64aed2aea7a98d1bcdfd85cf','64ad6dc0838496755f013b46',RESOURCE_HYDROGEN,'2m4c','20w5m1c')
       // this.startupRoomNoVision('Delta-2','W13N24',{harvestSources:false,workerCount:15,phaseOut:true})
        let deltaStore = gob('64ab23a839f2ded2a133dfa5');
        this.haulResources('Delta-2','DfeX1','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta-2','DfeX2','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta-2','DfeX3','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta-2','DfeX4','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta-2','DfeX5','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta-2','DfeX6','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','DfeX7','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','DfeX8','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','DfeX9','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','DfeX10','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','DfeX11','25*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        
        this.haulResources('Delta','TfeX6','10*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','TfeX2','10*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','TfeX3','10*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','TfeX4','10*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Delta','TfeX5','10*1c1m',gob('64ab23a839f2ded2a133dfa5'),gob('64b599d3a835d054dc26df2f'),[RESOURCE_ENERGY],[],4000,300);
        
        this.haulResources('Theta','TfeX1','10*1c1m',gob('64b599d3a835d054dc26df2f'),gob('64b4459fa240f6c44e427726'),[RESOURCE_ENERGY],[],4000,300);
       
        this.rotateCreep('Dux1-', function(activeCreepName){
                thing.withdrawThenUpgrade('Delta-2',activeCreepName,'64b4459fa240f6c44e427726','646e7307071eb8276c0a6755','20w10c20m',true,rp(28,9,'W13N24'),[{resource_type:RESOURCE_GHODIUM_ACID,lab_id:'64b307ece8ddd4754fa5441f'}]);
                //thing.withdrawThenBuild('Delta-2',activeCreepName,'64b430fd54833d3bdc70e9b8','64b551debbcf3074dc3fa2d8','20w10c20m');
        },500)
        this.rotateCreep('Dux2-', function(activeCreepName){
               thing.withdrawThenUpgrade('Delta-2',activeCreepName,'64b4459fa240f6c44e427726','646e7307071eb8276c0a6755','20w10c20m',true,rp(29,9,'W13N24'),[{resource_type:RESOURCE_GHODIUM_ACID,lab_id:'64b307ece8ddd4754fa5441f'}]);
        },500)
        
        this.rotateCreep('Eux1-', function(activeCreepName){
                thing.withdrawThenUpgrade('Epsilon',activeCreepName,'64b566ce6759f43367bbef50','646e72e1071eb8276c0a65d0','20w10c20m',true,rp(37,35,'W14N12'),[]);
                //thing.withdrawThenBuild('Delta-2',activeCreepName,'64b430fd54833d3bdc70e9b8','64b551debbcf3074dc3fa2d8','20w10c20m');
        },500)
       

         /////// W13N23 ////////////////////////////////////////
         this.defendRoom('Delta','Dd0','W13N23');
        this.maintainRoadsInRoom('Delta','Dw0','W13N23','1w3c1m');
        this.harvestPoint('Delta','Dhr1','6w1c3m',{id:'646e7307071eb8276c0a6759',pos:{x:24,y:37,roomName:'W13N23'}});
        this.reserverRoom('Delta','Dr1',{id:'646e7307071eb8276c0a675a',pos:{x:33,y:8,roomName:'W13N23'}},'2cl2m');
        
        /////// W12N22 ////////////////////////////////////////
        this.maintainRoadsInRoom('Delta','Dw1',['W12N22','W13N22'],'2w6c2m');
        if(!mb.hasRoom('W12N22'))mb.scanRoom('W12N22')
         this.defendRoom('Delta','Dd1','W12N22');
        this.harvestPoint('Delta','Dhr2','6w1c3m',{id:'646e7333071eb8276c0a68ac',pos:{x:5,y:13,roomName:'W12N22'}});
       this.reserverRoom('Delta','Dr2',{id:'646e7333071eb8276c0a68ad',pos:{x:33,y:8,roomName:'W12N22'}},'2cl2m');
    
        /////// W13N22 ////////////////////////////////////////
        //this.maintainRoadsInRoom('Delta','Dw2',['W13N22'],'1w3c1m');
        if(!mb.hasRoom('W13N22'))mb.scanRoom('W13N22')
         this.defendRoom('Delta','Dd2','W13N22');
        this.harvestPoint('Delta','Dhr3','6w1c3m',{id:'646e7308071eb8276c0a675c',pos:{x:45,y:20,roomName:'W13N22'}});
        this.harvestPoint('Delta','Dhr4','6w1c3m',{id:'646e7308071eb8276c0a675e',pos:{x:45,y:20,roomName:'W13N22'}});
       this.reserverRoom('Delta','Dr3',{id:'646e7308071eb8276c0a675d',pos:{x:45,y:20,roomName:'W13N22'}},'2cl2m');
        
        /////// W11N23 ////////////////////////////////////////
        this.maintainRoadsInRoom('Delta','Dw3',['W11N23'],'2w6c2m');
      //  this.maintainRoadsInRoom('Delta','Dw3+1',['W11N23'],'2w6c2m');
        if(!mb.hasRoom('W11N23'))mb.scanRoom('W11N23')
         this.defendRoom('Delta','Dd3','W11N23');
        this.harvestPoint('Delta','Dhr5','6w1c3m',{id:'646e735c071eb8276c0a69f5',pos:{x:25,y:25,roomName:'W11N23'}});
        this.harvestPoint('Delta','Dhr6','6w1c3m',{id:'646e735c071eb8276c0a69f6',pos:{x:25,y:25,roomName:'W11N23'}});
       this.reserverRoom('Delta','Dr4',{id:'646e735c071eb8276c0a69f4',pos:{x:25,y:25,roomName:'W11N23'}},'2cl2m');
        
        //this.harvestPoint('Delta','Dhrx','10w1c10m',{id:'646e72b0071eb8276c0a63bb',pos:{x:25,y:25,roomName:'W11N23'}});
        //#####################################################################################
        // Season - Epsilon Tasks
        //#####################################################################################

        this.startupRoomNoVision('Epsilon','W14N12',{phaseOut:true,workerCount:15,harvestSources:false})
        
         this.haulResources('Epsilon-2','EfeX1','20*1c1m',gob('6490e921bb3acd8a60da8c01'),gob('64b55024a835d0143f26bf83'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Epsilon-2','EfeX2','20*1c1m',gob('6490e921bb3acd8a60da8c01'),gob('64b55024a835d0143f26bf83'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Epsilon-2','EfeX3','20*1c1m',gob('6490e921bb3acd8a60da8c01'),gob('64b315eb92a3fc8a22959cc1'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Epsilon-2','EfeX4','20*1c1m',gob('6490e921bb3acd8a60da8c01'),gob('64b315eb92a3fc8a22959cc1'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Epsilon-2','EfeX5','20*1c1m',gob('6490e921bb3acd8a60da8c01'),gob('64b316fcc55cd605b4aa8fbc'),[RESOURCE_ENERGY],[],4000,300);
        this.haulResources('Epsilon-2','EfeX6','20*1c1m',gob('6490e921bb3acd8a60da8c01'),gob('64b316fcc55cd605b4aa8fbc'),[RESOURCE_ENERGY],[],4000,300);

       // this.emptyOutStoresAndRetrieve('Epsilon','W11N12-salvage','W11N12','6490e921bb3acd8a60da8c01')
        this.harvestAndCollectMineral('Epsilon','64765074d6ad5e002e0619dc','649569695990a52db34cdb6c','6490e921bb3acd8a60da8c01',RESOURCE_UTRIUM,'4c2m','20w5m');
         
        
       
        // >>>>>>>> W11N13 >>>>>>>>
        this.maintainRoadsInRoom('Epsilon','Ew0',['W11N13','W11N12'],'2w6c2m');
       
        this.defendRoom('Epsilon','Ed1','W11N13');
        //this.reserverRoom('Epsilon','Er1',{id:'646e7360071eb8276c0a6a14',pos:{x:27,y:29,roomName:'W11N13'}},'2cl2m');
        this.harvestPoint('Epsilon','Ehr1','6w1c3m',{id:'646e7360071eb8276c0a6a15',pos:{x:34,y:35,roomName:'W11N13'}});
        this.harvestPoint('Epsilon','Ehr2','6w1c3m',{id:'646e7360071eb8276c0a6a16',pos:{x:7,y:16,roomName:'W11N13'}});
        
        
         // >>>>>>>> W12N14 >>>>>>>>
        
        this.defendRoom('Epsilon','Ed2','W12N14');
        this.maintainRoadsInRoom('Epsilon','Ew1',['W12N14','W11N14'],'2w6c2m');
       // this.maintainRoadsInRoom('Epsilon','Ew1+1',['W12N14','W11N14'],'2w6c2m');
        this.reserverRoom('Epsilon','Er2',{id:'646e7336071eb8276c0a68c5',pos:{x:27,y:29,roomName:'W12N14'}},'2cl2m');
        this.harvestPoint('Epsilon','Ehr3','6w1c3m',{id:'646e7336071eb8276c0a68c7',pos:{x:34,y:35,roomName:'W12N14'}});
        this.harvestPoint('Epsilon','Ehr4','6w1c3m',{id:'646e7336071eb8276c0a68c6',pos:{x:7,y:16,roomName:'W12N14'}});
        
        // >>>>>>>> W13N13 & W14N13 >>>>>>>>
        
        this.defendRoom('Epsilon','Ed3','W13N13');
        this.defendRoom('Epsilon','Ed6','W14N13');
         this.maintainRoadsInRoom('Epsilon','Ew2',['W13N13','W14N13','W13N12'],'2w6c2m');
         this.maintainRoadsInRoom('Epsilon','Ew2+1',['W13N13','W14N13','W13N12'],'2w6c2m');
        this.reserverRoom('Epsilon','Er3',{id:'646e730c071eb8276c0a677b',pos:{x:27,y:29,roomName:'W13N13'}},'2cl2m');
        this.harvestPoint('Epsilon','Ehr5','6w1c3m',{id:'646e730c071eb8276c0a677d',pos:{x:34,y:35,roomName:'W13N13'}});
        this.harvestPoint('Epsilon','Ehr6','6w1c3m',{id:'646e730c071eb8276c0a677c',pos:{x:7,y:16,roomName:'W13N13'}});
        this.harvestPoint('Epsilon','Ehr9','4w1c2m',{id:'646e72e1071eb8276c0a65cc',pos:{x:7,y:16,roomName:'W14N13'}});
        
        // >>>>>>>> W11N12 >>>>>>>>
         this.defendRoom('Epsilon','Ed4','W11N12');
        this.harvestPoint('Epsilon','Ehr7','4w1c2m',{id:'646e7361071eb8276c0a6a18',pos:{x:8,y:17,roomName:'W11N12'}});
        
        // >>>>>>>> W11N14 >>>>>>>>
        this.defendRoom('Epsilon','Ed5','W11N14');
        this.harvestPoint('Epsilon','Ehr8','4w1c2m',{id:'646e7360071eb8276c0a6a11',pos:{x:10,y:9,roomName:'W11N14'}});
        

        
        //#####################################################################################
        // Season - Zeta Tasks
        //#####################################################################################
        if(!gob('646f56009bdd4e0008301781') || gob('646f56009bdd4e0008301781').mineralAmount<20000){
            /*
                roomToStrip='W11N19';
               this.stripMineRoomForThorium(
               // feeder node name & room to strip && bootupContainerId
               'Zeta',roomToStrip, '64a000a8116aa83c32ab5411',
               // upgrader spots 
               [rp(9,35,roomToStrip),rp(10,35,roomToStrip),rp(10,36,roomToStrip),rp(9,36,roomToStrip),rp(8,36,roomToStrip)],
               // funneler-wait-spot & hauler count & upgraderContainerSpot && upgraderBoostPlans
               rp(13,33,roomToStrip),18, rp(9,35,roomToStrip),[{resource_type:RESOURCE_GHODIUM_ACID,lab_id:'64a85c6ec449d31ba1a8320a'}],
               // thorium id & terminal pos & thorium harvester spots
               '646f56019bdd4e00083017d8',rp(33,17,roomToStrip),[rp(32,16,roomToStrip)],
               // spawn spot & storage build spot
               rp(14,17,roomToStrip),rp(33,18,roomToStrip))*/
        }
        this.emptyOutStoresAndRetrieve('Zeta-2','W11N19-salvage','W11N19','649d837753140c3091ec5697','10*1c1m')


         this.harvestAndCollectMineral('Zeta','64765074d6ad5e002e0619d6','649eb147617d9e09ed5162df','649a9d4257f6b84692fe9d26',RESOURCE_OXYGEN,'10c5m','39w10m1c')
        //this.haulResources('Zeta','Nabby1','10*1c1m',gob('649a9d4257f6b84692fe9d26'),{id:'646e7309071eb8276c0a6765',pos:{x:29,y:5,roomName:'W13N19'}},[RESOURCE_ENERGY],[],4000,150);

        // >>>>>>>> W13N19 >>>>>>>>
        this.defendRoom('Zeta','Zd1','W13N19');
        this.maintainRoadsInRoom('Zeta','Zw1','W13N19','1w3c1m');
        this.reserverRoom('Zeta','Zr1',{id:'646e7309071eb8276c0a6766',pos:{x:10,y:19,roomName:'W13N19'}},'2cl2m');
        this.harvestPoint('Zeta','Zhr1','6w1c3m',{id:'646e7309071eb8276c0a6765',pos:{x:29,y:5,roomName:'W13N19'}});
        this.harvestPoint('Zeta','Zhr2','6w1c3m',{id:'646e7309071eb8276c0a6764',pos:{x:36,y:5,roomName:'W13N19'}}); 
        
        // >>>>>>>> W11N19 >>>>>>>>
        this.defendRoom('Zeta','Zd2','W11N19');
       // this.maintainRoadsInRoom('Zeta','Zw2','W11N19','1w3c1m');
        this.reserverRoom('Zeta','Zr2',{id:'646e735e071eb8276c0a6a02',pos:{x:7,y:36,roomName:'W11N19'}},'2cl2m');
        this.harvestPoint('Zeta','Zhr3','6w1c3m',{id:'646e735e071eb8276c0a6a01',pos:{x:29,y:5,roomName:'W11N19'}});
        this.harvestPoint('Zeta','Zhr4','6w1c3m',{id:'646e735e071eb8276c0a6a00',pos:{x:36,y:5,roomName:'W11N19'}}); 
        
        // >>>>>>>> W11N18 >>>>>>>>
        this.defendRoom('Zeta','Zd3','W11N18');
        //this.reserverRoom('Zeta','Zr1',{id:'646e7360071eb8276c0a6a14',pos:{x:27,y:29,roomName:'W11N19'}},'2cl2m');
        this.harvestPoint('Zeta','Zhr5','4w1c2m',{id:'646e735e071eb8276c0a6a04',pos:{x:16,y:15,roomName:'W11N18'}});
        
        // >>>>>>>> W12N18 >>>>>>>>
        this.defendRoom('Zeta','Zd3','W12N18');
        this.maintainRoadsInRoom('Zeta','Zw4',['W12N18','W11N18'],'2w6c2m');
        this.reserverRoom('Zeta','Zr4',{id:'646e7334071eb8276c0a68b8',pos:{x:27,y:29,roomName:'W12N18'}},'2cl2m');
        this.harvestPoint('Zeta','Zhr6','6w1c3m',{id:'646e7334071eb8276c0a68b7',pos:{x:4,y:15,roomName:'W12N18'}});
    
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    

        
        return;
       },
       scheduledAttack: function(){
          // return;
          // Memory.attackOnMuscles='scheduled';
          
        
          
          //1434336 + 7k = 1,441,336
          let scheduledTick =1441200;
           if(Game.time >scheduledTick && Memory.attackOnMuscles==='scheduled'){
               Memory.attackOnMuscles='mustering';
               clog('attack mustering')
           }else if(Memory.attackOnMuscles==='scheduled'){
               if(Game.time %10===0)clog((scheduledTick - Game.time)+" ticks at "+scheduledTick,"Scheduled attack in ")
           }else if(Memory.attackOnMuscles==='mustering' || Memory.attackOnMuscles==='attacking'){
               if(Game.time %10===0)clog(Memory.attackOnMuscles,"Scheduled attack underway ")
           }
           
           if(Memory.attackOnMuscles==='mustering' || Memory.attackOnMuscles==='attacking'){
              
            // Attack Logistics ////////////////////////////////////////
                let go = (Memory.attackOnMuscles==='attacking');
                let attackRoom = 'W14N27';
                let musterSpot = rp(28,4,'W14N26');
                let retreatSpots = [rp(18,37,attackRoom),rp(20,37,attackRoom),rp(22,37,attackRoom)];
                let roomTraversal=['W14N18','W14N19','W14N20','W14N21','W15N21','W15N22','W15N23','W15N24','W15N25','W15N26','W14N26'];    
               // roomTraversal=['W14N18','W14N19','W14N20','W14N21','W15N21','W15N22','W15N23','W15N24','W16N24','W16N25','W16N25','W15N26','W14N26'];
                roomTraversal=[];
                
            // Attack Targets  //////////////////////////////////////// 
                let target_ids = [];
                let destroyResourceBanks=true;
                if(go){
                    // entry rampart
                    target_ids.push('64b60d3a4979613df47d58f1')
                    target_ids.push('64b44e0a937bbe2b3eab7675')
                    if(Game.time%10===0)mb.scanRoom(attackRoom);
                    let highPriorityTargets=[STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_TOWER];
                    let mediumPriorityTargets = [STRUCTURE_LAB,STRUCTURE_CONTAINER,STRUCTURE_LINK,STRUCTURE_EXTRACTOR];
                    if(destroyResourceBanks){
                        mediumPriorityTargets.push(STRUCTURE_STORAGE);
                        mediumPriorityTargets.push(STRUCTURE_TERMINAL);
                    }
                    /*STRUCTURE_STORAGE,STRUCTURE_TERMINAL*/
                    
                    let structureAnchorLookup = Game.creeps['duoL1']?Game.creeps['duoL1'].pos:retreatSpots[0]
                    
                    let priorityTarget = mb.getNearestStructure(structureAnchorLookup,highPriorityTargets,[attackRoom])
                    //clog(priorityTarget.pos)
                    let mediumTarget = mb.getNearestStructure(structureAnchorLookup,mediumPriorityTargets,[attackRoom])
                    let cleanupTarget = mb.getNearestStructure(structureAnchorLookup,[STRUCTURE_RAMPART],[attackRoom])
                    if(priorityTarget)target_ids.push(priorityTarget.id);
                    else if(mediumTarget)target_ids.push(mediumTarget.id);
                    else if(cleanupTarget)target_ids.push(cleanupTarget.id);
                    
                }
                
                /*
                this.breakStructures('Alpha-3','Cleanup1',attackRoom,target_ids,'20w20m');
                this.breakStructures('Alpha-2','Cleanup2',attackRoom,target_ids,'20w20m');
                this.breakStructures('Zeta-2','Cleanup3',attackRoom,target_ids,'20w20m');
                this.breakStructures('Zeta','Cleanup4',attackRoom,target_ids,'20w20m');
                
                this.breakStructures('Alpha-3','Cleanup6',attackRoom,target_ids,'20w20m');
                */
                this.breakStructures('Alpha-3','Cleanup5',attackRoom,target_ids,'25w25m');
                
               let allDuoCreepNames = ['duoL1','duoH1','duoL2','duoH2','duoL3','duoH3'];
               let renewSpawn = 'Alpha-3';
               
               let duoCount = 1;
               
               let healerBody ='25*1h1m';
               healerBody = '33h17m';
               let healerBoostPlan =[{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'64a53bff66e7669492b5b659'},{resource_type:RESOURCE_LEMERGIUM_ALKALIDE,lab_id:'64a55fad1f1cd7030d011b7f'}];
               let dismantlerBody = '20*1w1m+5r5m';
               dismantlerBody='3m25w7r15m';
               let dismantlerBoostPlan = [{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'64a53bff66e7669492b5b659'},{resource_type:RESOURCE_ZYNTHIUM_ACID,lab_id:'64a54b8e66e766bad4b5bd88'}];
               let attackerBody = '2m20a10m+12r6m';
               let attackerBoostPlan = [{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'64a53bff66e7669492b5b659'},{resource_type:RESOURCE_UTRIUM_ACID,lab_id:'64a57747038fbe71ec1507b2'}];
               
               
               let readyCount=0;
               for(let myCreepName of allDuoCreepNames){
                   if(Game.creeps[myCreepName] && musterSpot.getRangeTo(Game.creeps[myCreepName])<4){
                       readyCount++;
                   }
               }
               if(readyCount===(duoCount*2)){
                   Memory.attackOnMuscles='attacking';
               }
       
               //duoHealer:function(spawnName,cname,parts,leaderName, leadersTarget, allies=[],renewSpawn=false,boostPlans=[],spawnFacing=LEFT){
               
               if(Game.creeps['duoL1'] || Memory.attackOnMuscles==='mustering')
                    this.duoLeader('Alpha','duoL1',dismantlerBody,'duoH1',musterSpot,attackRoom,target_ids,retreatSpots[0],roomTraversal,go,renewSpawn,dismantlerBoostPlan)
                    
                if(Game.creeps['duoH1'] || Memory.attackOnMuscles==='mustering')
                    this.duoHealer('Alpha-3','duoH1',healerBody,'duoL1', false, allDuoCreepNames,renewSpawn,healerBoostPlan)
                
               if(Game.creeps['duoL2'] || Memory.attackOnMuscles==='mustering')
                    this.duoLeader('Alpha-2','duoL2',dismantlerBody,'duoH2',musterSpot,attackRoom,target_ids,retreatSpots[1],roomTraversal,go,renewSpawn,dismantlerBoostPlan)
                    
               if(Game.creeps['duoH2'] || Memory.attackOnMuscles==='mustering')
                    this.duoHealer('Alpha-2','duoH2',healerBody,'duoL2', false, allDuoCreepNames,renewSpawn,healerBoostPlan)
               /*
                if(Game.creeps['duoL3'] || Memory.attackOnMuscles==='mustering')
                    this.duoLeader('Alpha-2','duoL3',attackerBody,'duoH3',musterSpot,attackRoom,target_ids,retreatSpots[2],roomTraversal,go,renewSpawn,attackerBoostPlan)
                    
                if(Game.creeps['duoH3'] || Memory.attackOnMuscles==='mustering')
                    this.duoHealer('Alpha-3','duoH3',healerBody,'duoL3', false,allDuoCreepNames,renewSpawn,healerBoostPlan)
                    
                 if(Game.creeps['duoL4'] || Memory.attackOnMuscles==='mustering')
                    this.duoLeader('Alpha-2','duoL4',attackerBody,'duoH4',musterSpot,attackRoom,target_ids,retreatSpots[2],roomTraversal,go,renewSpawn,attackerBoostPlan)
                    
                if(Game.creeps['duoH4'] || Memory.attackOnMuscles==='mustering')
                    this.duoHealer('Alpha-3','duoH4',healerBody,'duoL4', false,allDuoCreepNames,renewSpawn,healerBoostPlan)

*/
           }
       },
     stripMineRoomNodes:[],
     /**
      * 
      * feederName - name of the room cluster that is feeding this. Assumes this room is RCL and has 2 spawns
      * roomNameToStrip - 
      * bootupContainerId - container id to start feeding energy to, for builders
      * upgraderSpots - 
      * upgradeFeederWaitSpot - where feeders wait so they don't get in the way
      * upgradeFeederCount - how many feeders for upgraders
      * upgraderContainerSpot - where to place the upgrade container, will be built if first phase
      * upgraderBoostPlans - an array of lab boostplans
      * thorium_id - mineral id
      * thoriumTerminalPos - 
      * thoriumHarvesterSpots - 
      * spawnPos - 
      * storageBuildSpot - 
      */ 
     stripMineRoomForThorium:function(feederName,roomNameToStrip,bootupContainerId, upgraderSpots,upgradeFeederWaitSpot, upgradeFeederCount, upgraderContainerSpot, upgraderBoostPlans, thorium_id,thoriumTerminalPos,thoriumHarvesterSpots,spawnPos,storageBuildSpot){
         
        let controller = mb.getControllerForRoom(roomNameToStrip);
        let feederStorage = mb.getStorageForRoom(Game.spawns[feederName].pos.roomName);
        let strippedStorage = mb.getStorageForRoom(roomNameToStrip);
        let strippedTerminal = mb.getTerminalForRoom(roomNameToStrip);
        let stripSpawn = Game.spawns['Strip-'+roomNameToStrip];
        
        
        
        if(!controller||controller.level == 0)this.rotateScouts(feederName+'-2',roomNameToStrip,roomNameToStrip+'-scout',storageBuildSpot);
        
        if(!controller){
            clog('no controller found for strip mine room. Scouting...',roomNameToStrip);
            return;
        }
        
        if(controller.level == 0){
            clog('claiming strip mine',roomNameToStrip) 
            this.reserverRoom(feederName,roomNameToStrip+'-claim',controller,'1cl1m',true);
        }
        
        
        if(controller.level >= 0){
            
             rp(spawnPos.x-2,spawnPos.y-1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x-1,spawnPos.y-1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x,spawnPos.y-1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x+1,spawnPos.y-1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x+2,spawnPos.y-1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             
            rp(spawnPos.x-3,spawnPos.y,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            rp(spawnPos.x+3,spawnPos.y,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            
            rp(spawnPos.x-3,spawnPos.y+1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            rp(spawnPos.x+3,spawnPos.y+1,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            
            rp(spawnPos.x-3,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            rp(spawnPos.x+3,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            rp(spawnPos.x-2,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_CONTAINER);
            rp(spawnPos.x+2,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_CONTAINER);
            
            rp(spawnPos.x-3,spawnPos.y+3,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            rp(spawnPos.x+3,spawnPos.y+3,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            
            rp(spawnPos.x-3,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            rp(spawnPos.x+3,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
            
             rp(spawnPos.x-2,spawnPos.y+5,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x-1,spawnPos.y+5,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x,spawnPos.y+5,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x+1,spawnPos.y+5,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             rp(spawnPos.x+2,spawnPos.y+5,roomNameToStrip).createConstructionSite(STRUCTURE_ROAD);
             
             upgraderContainerSpot.createConstructionSite(STRUCTURE_CONTAINER);
           
            if(Game.creeps[roomNameToStrip+'-w0'] || !stripSpawn || controller.level<4)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w0',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w1'] || !stripSpawn)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w1',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w2'] || !stripSpawn)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w2',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w3'] || !stripSpawn)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w3',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w4'] || !stripSpawn)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w4',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w5'] || !stripSpawn)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w5',roomNameToStrip,'4w4c4m');
            
        }
        
        let feedTarget = false;
        if(!strippedStorage){
            feedTarget = gob(bootupContainerId);
        }else if(strippedTerminal){
            feedTarget=strippedTerminal;
        }else if(strippedStorage && feederStorage && strippedStorage.storingLessThan(100000)){
            feedTarget= strippedStorage;
        }
        if(feedTarget){
            this.haulResources(feederName+'-2',roomNameToStrip+'-feeder0','10*2c1m',feederStorage,feedTarget,[RESOURCE_ENERGY],[],4000,100);
            this.haulResources(feederName+'-2',roomNameToStrip+'-feeder1','10*2c1m',feederStorage,feedTarget,[RESOURCE_ENERGY],[],4000,100);
        }
        
        let towers = mb.getStructures({roomNames:[roomNameToStrip],types:[STRUCTURE_TOWER]})
        if(towers.length==0 || Game.creeps[roomNameToStrip+'-guard'])
            this.constantGuardRoom(feederName+'-2',roomNameToStrip+'-guard',roomNameToStrip,'2t2m+5*1r1a2m+1m1h',{x:spawnPos.x,y:spawnPos.y-1},false,true);
        
        if(controller.level<1){
            if(Game.time%3==0)clog('Controller must be claimed in strip mine room',roomNameToStrip); 
            return;
        }
        
        if(!controller.haveContainer()){
            let containers = mb.getStructures({roomNames:[roomNameToStrip],types:[STRUCTURE_CONTAINER]})
            for(let container of containers){
                if(controller.pos.getRangeTo(container)<5){
                    controller.setContainer(container);
                    controller.setStandingSpot(container.pos);
                    container.setAsUpgraderStore();
                }
            }
            if(Game.time%3==0)clog('Searching for container in strip mine room',roomNameToStrip); 
            return;
        }
        
            
        this.funnelUpgradeRoom(feederName,feederName+'-2',roomNameToStrip,upgraderSpots,upgradeFeederWaitSpot,upgradeFeederCount,'10*2c1m',false,'20w10c10m',upgraderBoostPlans);
        
        
        if(stripSpawn){
               
                if(!this.stripMineRoomNodes[roomNameToStrip]){
                    this.stripMineRoomNodes[roomNameToStrip] = new roomNode('Strip-'+roomNameToStrip,roomNameToStrip,
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(spawnPos.x,spawnPos.y-3,roomNameToStrip),
                                buildFast:true,
                                upgradeRate:RATE_OFF,
                                wallHeight:10000,
                                extraFastFillSpots:[rp(spawnPos.x-1,spawnPos.y+3,roomNameToStrip),rp(spawnPos.x+1,spawnPos.y+3,roomNameToStrip)]
                            }
                        ) 
                }
                this.stripMineRoomNodes[roomNameToStrip].runTick();
        }
        
        
       
        
        if(controller.level >=2){
            
            spawnPos.createConstructionSite(STRUCTURE_SPAWN,'Strip-'+roomNameToStrip);
            // top row
            rp(spawnPos.x-1,spawnPos.y,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x-2,spawnPos.y,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x+1,spawnPos.y,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x+2,spawnPos.y,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            // first filler spots, L & R
            rp(spawnPos.x-2,spawnPos.y+1,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x,spawnPos.y+1,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x+2,spawnPos.y+1,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            // 3rd row, with containers
            rp(spawnPos.x-1,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_TOWER);
            rp(spawnPos.x+1,spawnPos.y+2,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);

        }
        if(controller.level >=4){
            // lower filler spots, L & R
            rp(spawnPos.x-2,spawnPos.y+3,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x,spawnPos.y+3,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x+2,spawnPos.y+3,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            // bottom row
            rp(spawnPos.x-1,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x-2,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x+1,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            rp(spawnPos.x+2,spawnPos.y+4,roomNameToStrip).createConstructionSite(STRUCTURE_EXTENSION);
            storageBuildSpot.createConstructionSite(STRUCTURE_STORAGE);

        }

            
        if(controller.level >=6){
            this.stripMineThorium(thorium_id,thoriumTerminalPos,[feederName+'-2',feederName,feederName+'-2'],thoriumHarvesterSpots)
        }

        
     },
     /**
      * construct an extractor and terminal at a THORIUM resources and transfer it to a score room
      * Send harvesters to a thorium mine
      * thorium_id
      * thoriumTerminalPos
      * harvesterSpawns
      * harvesterSpots
      * harvesterBody
      * scoreRoom - the room to send mined thorium
      */ 
     stripMineThorium: function(thorium_id,thoriumTerminalPos,harvesterSpawns=[],harvesterSpots=[],harvesterBody='39w1c10m',rotationDelay=200,scoreRoom='W13N15'){
         
        let thorium = gob(thorium_id);
        let thoriumTerminal = thoriumTerminalPos.lookForStructure(STRUCTURE_TERMINAL);
        if(thorium && thorium.room.controller.level>=6){
            
            let thoriumExtractor = thorium.pos.lookForStructure(STRUCTURE_EXTRACTOR);
            
            if(!thoriumTerminal){
                thoriumTerminalPos.createConstructionSite(STRUCTURE_TERMINAL)
            }
            if(!thoriumExtractor){
                thorium.pos.createConstructionSite(STRUCTURE_EXTRACTOR)
            }
            let storage = mb.getStorageForRoom(thorium.pos.roomName);
            
            let termConstructionSite = thoriumTerminalPos.lookForConstruction();
            let extractorConstructionSite = thorium.pos.lookForConstruction();
 
            //
            if( (thoriumTerminal && thoriumExtractor) || termConstructionSite || extractorConstructionSite ){
                let thing=this;
                for(let i in harvesterSpots){
                    
                     this.rotateCreep(harvesterSpawns[0].charAt(0)+'-thor-h'+i, function(activeCreepName){
                         
                            if(thoriumTerminal && thoriumExtractor){
                                if(Game.creeps[activeCreepName])Game.creeps[activeCreepName].drop(RESOURCE_ENERGY)
                                
                                thing.harvestMineralAndTransfer( harvesterSpawns[i], activeCreepName, harvesterBody, thorium, thoriumTerminal.id, RESOURCE_THORIUM, harvesterSpots[i], true);
                            }else{
                               
                                let site = extractorConstructionSite?extractorConstructionSite:termConstructionSite;
                                if(storage){
                                 
                                    thing.withdrawThenBuild(harvesterSpawns[i], activeCreepName,storage.id,site.id,harvesterBody);
                                }
                            }
                            
                            
                    },rotationDelay)
                }

            }
        }else{
            // transfers the last bits
            for(let i in harvesterSpots){
                if(Game.creeps[harvesterSpawns[i].charAt(0)+'-thor-h'+i]){Game.creeps[harvesterSpawns[i].charAt(0)+'-thor-h'+i].transfer(thoriumTerminal,RESOURCE_THORIUM)}
            }
        }
        
        if(thoriumTerminal && thoriumTerminal.storingAtleast(4000,RESOURCE_ENERGY) && thoriumTerminal.storingAtleast(5000,RESOURCE_THORIUM)){
            thoriumTerminal.send(RESOURCE_THORIUM,5000,scoreRoom);
            
        }
        if(thoriumTerminal && !thorium){
            thoriumTerminal.send(RESOURCE_THORIUM,thoriumTerminal.storedAmount(RESOURCE_THORIUM),scoreRoom);
        }
     },
     earlyWarning: function(spawnName,roomPos){
         
        let scoutName = this.rotateScouts(spawnName,roomPos.roomName,roomPos.roomName+'-beacon',roomPos);
        //this.scoutRoom(spawnName,roomPos.roomName+'-beacon',roomPos.roomName,roomPos);
        let userIgnores =['GT500','Source Keeper','Invader']; //
        let hostiles = Game.rooms[roomPos.roomName]?Game.rooms[roomPos.roomName].getHostiles():[];
        let fighters = hostiles.filter(function(hostile){return ( (hostile.partCount(ATTACK)>0 || hostile.partCount(RANGED_ATTACK)>0 || hostile.partCount(HEAL)>0) && !userIgnores.includes(hostile.owner.username) ) });
        if(fighters.length>2){
            Memory.reactorThreats.count = fighters.length;
            Memory.reactorThreats.lastSeen = Game.time;
            Memory.reactorThreats.roomLogs[roomPos.roomName]={
                tick:Game.time,
                owner:fighters[0].owner.username
            }
            let message = fighters.length+' threats detected';
            clog(message,roomPos.roomName)
            if(Game.creeps[scoutName])Game.creeps[scoutName].say(message,true)
        }
     },
    scoreThorium: function(scoring=false,guard=false){
        
            
        
           let thoriumStorage = gob('6487f218a38d042a92467fce');
           let reactor = gob('646f55e99bdd4e0008300cf9');
           let scoutName = 'Barry';
           let allyName = 'GT500';
           let roomTraversal = ['W13N15','W14N15','W15N15']
           let haulerTraversal = ['W15N15','W14N15','W13N15']
           //let roomTraversal = ['W13N15','W13N14','W14N14','W15N14','W15N15'];
          
           let haulersReq=0;
           let haulerCount=0;
           let haulerNames = [];
           let haulerMax=6;
           for(let i=0;i<haulerMax;i++){ 
               let cname = 'thor-'+i;
               haulerNames.push(cname) 
               if(Game.creeps[cname]){
                    Game.creeps[cname].memory.riskyBiscuits=true;
                    haulerCount++;
                }
           }
            
            
            let scoutMessage = scoring?'':'w/ '+allyName;
           scoutName=this.rotateScouts('Gamma-3','W15N15','thor-scout',{x:34,y:26},roomTraversal,400);
           
           if(reactor){

                if(thoriumStorage.storedAmount(RESOURCE_THORIUM)<10000  ){
                    haulersReq=0;
                    scoring=false;
                    scoutMessage='<10k w/ '+allyName;
                }

                if(scoring){
                   if(reactor.owner.username!=='MadDokMike'){
                       
                        this.claimReactor('Gamma-3','thor-claimer',reactor);
                        scoutMessage='claiming..';
                        
                    }else{
                        haulersReq=3;
                        if(reactor.store.getUsedCapacity(RESOURCE_THORIUM)<850){
                            haulersReq=5;
                        } 
                    }
                }
                               
               
                 if(reactor.store.getUsedCapacity(RESOURCE_THORIUM)<350){
                    haulersReq=6;
                }
                
                
                if(haulersReq>0 || haulerCount>0){
                    for(let cname of haulerNames){
                        
                        if(Game.creeps[cname] || haulerCount < haulersReq)
                            this.haulResources('Gamma-3',cname,'1c1m',thoriumStorage,reactor,[RESOURCE_THORIUM],[],1000,150);
                        
                        if(haulersReq==0 && reactor.store.getUsedCapacity(RESOURCE_THORIUM)>900 && Game.creeps[cname] && Game.creeps[cname].storedAmount(RESOURCE_THORIUM)==0 )Game.creeps[cname].suicide();
                        
                    }
                    scoutMessage= haulerCount+'/'+haulersReq+' haulrs';
                }
                
           }
           
            
            
            //this.earlyWarning('Alpha',rp(31,12,'W14N16'));
           // this.earlyWarning('Alpha',rp(45,5,'W15N16'));
            this.earlyWarning('Alpha',rp(18,15,'W16N16'));
            this.earlyWarning('Alpha',rp(21,6,'W17N15'));
            this.earlyWarning('Epsilon',rp(24,36,'W15N12'));
            this.earlyWarning('Epsilon',rp(47,44,'W15N13'));
            this.earlyWarning('Epsilon',rp(34,21,'W14N13'));
            this.earlyWarning('Gamma',rp(31,21,'W14N15'));
            //this.earlyWarning('Gamma',rp(46,29,'W14N14'));
            
            let guardBody = '2t2m+5*1r1m1a1m+5m5h';
            //constantGuardRoom:function(spawnName,cname,roomName,parts, waitingSpot={x:25,y:25},allyName=false,killCivilians=false, maxDistance=75 , roomTraversal=[]){
            if(guard)this.constantGuardRoom('Gamma-3','Thor-guard','W15N15',guardBody,{x:35,y:29},allyName,true,75,roomTraversal);
            if(guard)this.constantGuardRoom('Gamma-3','Thor-guard2','W15N15',guardBody,{x:39,y:27},allyName,true,75,roomTraversal);
            
            if(Memory.reactorThreats===undefined || ( (Memory.reactorThreats.lastSeen + 1500) < Game.time) )Memory.reactorThreats={count:0,lastSeen:0,roomLogs:{}};
            let test = false;
           // clog(Memory.reactorThreats)
            if(Memory.reactorThreats.count>0){
                for(let i =0; i<Memory.reactorThreats.count; i++){
                    let body = test ?'1a1m':guardBody;
                    if(i&2==0)this.constantGuardRoom('Gamma','Thor-reinforce-'+i,'W15N15',guardBody,{x:39,y:27},allyName,true,75,roomTraversal);
                    else this.constantGuardRoom('Gamma-2','Thor-reinforce-'+i,'W15N15',guardBody,{x:39,y:27},allyName,true,75,roomTraversal);
                }
                
                let msgSwitch=(Game.time+"").substr(-1);
                let roomNames = [];
                let attackers = [];
                let seenAttackers={};
                for(let roomName in Memory.reactorThreats.roomLogs){
                    
                    let log = Memory.reactorThreats.roomLogs[roomName];
                    if(!roomNames.includes(roomName))roomNames.push(roomName);
                    if(!attackers.includes(log.owner))attackers.push(log.owner);
                }
                
                if(msgSwitch==0||msgSwitch==5)scoutMessage =  Memory.reactorThreats.count+" Threats";
                if(msgSwitch==1||msgSwitch==6)scoutMessage ="in:"+roomNames.join();
                if(msgSwitch==2||msgSwitch==7)scoutMessage = attackers;
                if(msgSwitch==3||msgSwitch==8)scoutMessage ="at:"+Memory.reactorThreats.lastSeen;
                if(msgSwitch==4||msgSwitch==9)scoutMessage ="extra:"+Memory.reactorThreats.count;

            }
            
        
            if(Memory.reactorThreats.count==0 && Game.time%2==0)scoutMessage='no threats';
            
            if(Game.creeps[scoutName])Game.creeps[scoutName].say(scoutMessage,true)
       },
      trader:function(clusterName,traderName,sourceStorageID,sellResource,targetRoom,targetStorageID,buyResource,roomTraversal=[] ,suicdeTime=4,creepBody='10*1c1m'){
        
        let homeRoom = Game.spawns[clusterName].pos.roomName;
        
        //if(Game.creeps[traderName])Game.creeps[traderName].memory.touchingCloth=true;
            
        if(Game.creeps[traderName] && Game.creeps[traderName].pos.roomName==targetRoom){
            Game.creeps[traderName].say('trade '+sellResource+'>'+buyResource,true)
        }
        
        // bring back the goods
        if(Game.creeps[traderName] && !Game.creeps[traderName].spawning && Game.creeps[traderName].isEmpty(sellResource)){
            //clog('returning...',traderName)
           this.haulResources(clusterName,traderName,creepBody,
            
            {id:targetStorageID,pos:{x:25,y:25,roomName:targetRoom}},
            {id:sourceStorageID,pos:{x:25,y:25,roomName:homeRoom}},
            [buyResource],roomTraversal.reverse(),4000,suicdeTime
           
            );
     
        }
        // go take the resource to sell
        if(!Game.creeps[traderName] || ( Game.creeps[traderName] && Game.creeps[traderName].isEmpty(buyResource) && suicdeTime< Game.creeps[traderName].ticksToLive )  ){
            //clog('going...',traderName)
           this.haulResources(clusterName,traderName,creepBody,
            {id:sourceStorageID,pos:{x:25,y:25,roomName:homeRoom}},
            {id:targetStorageID,pos:{x:25,y:25,roomName:targetRoom}},
            [sellResource],roomTraversal,4000,suicdeTime
           
            );
     
        }
        if(Game.creeps[traderName] &&  Game.creeps[traderName].isEmpty(buyResource) &&  Game.creeps[traderName].isEmpty(sellResource)  && suicdeTime>= Game.creeps[traderName].ticksToLive ){
            Game.creeps[traderName].suicide();
        }
        
      },
    funnelUpgradeRoom:function(spawnNameForUpgraders,spawnNameForFeeders,targetRoom,upgraderMatrix=[],funnelerWaitSpot,funnelers=10,funnelerBody='10*2c1m',overFlowContainer_id,upgraderBody='20W10C10M',upgraderBoostPlans=[]){
        if(upgraderBoostPlans===undefined)upgraderBoostPlans=[];
        let feederStorage = mb.getStorageForRoom(Game.spawns[spawnNameForFeeders].pos.roomName);
        let feederTerminal = mb.getTerminalForRoom(Game.spawns[spawnNameForFeeders].pos.roomName);
        let controller = mb.getControllerForRoom(targetRoom);
        
        // load balance between terminal and storage
        if(feederTerminal.storedAmount(RESOURCE_ENERGY)>feederStorage.storedAmount(RESOURCE_ENERGY))
            feederStorage = feederTerminal;
        
        let feederStorageSafetyCap= 50000;
        
        if(!controller.haveContainer()){
            if(Game.time%10==0)clog('funneling can not start until controller has a container','funnelUpgradeRoom:'+targetRoom);
            return;
        }
        let goFullTilt=true;
        if(!feederStorage.storingAtleast(feederStorageSafetyCap)){
            goFullTilt=false;
            if(Game.time%10==0)clog('funneling slowing down. feederStorage < '+feederStorageSafetyCap,'funnelUpgradeRoom:'+targetRoom);
        }
        if(controller.level>=6){
            goFullTilt=false;
            if(Game.time%10==0)clog('funneling slowing down. controller RCL >= '+6,'funnelUpgradeRoom:'+targetRoom);
        }else{
            controller.getContainer().allowOverBooking(3000);
        }
        
        let targetRoomStorage = mb.getStorageForRoom(targetRoom);
        let storeToFeed = (!targetRoomStorage || controller.level<6)?controller.getContainer():targetRoomStorage;
        let overFlow = gob(overFlowContainer_id)
        if(overFlow && storeToFeed.isFull()){
            storeToFeed = overFlow;
        }
        
        let prefix = spawnNameForUpgraders.charAt(0);
        let creepNames = [prefix+'uX1',prefix+'uX2',prefix+'uX3',prefix+'uX4',prefix+'uX5'];
        
        for(let n=0; n < creepNames.length; n++){
            
            // default to join the back of the queue
            let moveToPos =upgraderMatrix[0];
            let i = 9;
            if( Game.creeps[creepNames[n]] ){
                    
                for(let p in upgraderMatrix){
                    p = p*1;
                    // are we on the queue and the next spot is free, move to it
                    let inQueue = Game.creeps[creepNames[n]].pos.isEqualTo(upgraderMatrix[p]);
                    // if we are in the queue, then lets stay here, unless the next spot is free
                    if(inQueue)moveToPos = Game.creeps[creepNames[n]].pos;
                    
                    if( inQueue &&  upgraderMatrix[p+1] && upgraderMatrix[p+1].isWalkable(true)){
                        moveToPos= upgraderMatrix[p+1];
                        i = p;
                        break;
                    }
                }
            }
            if(Game.creeps[creepNames[n]] || goFullTilt)
                this.withdrawThenUpgrade(spawnNameForUpgraders,creepNames[n],controller.getContainer().id,controller.id,upgraderBody,true,moveToPos,upgraderBoostPlans);
            
        }
        // if we've powered down, lets atleast send 1 mega upgrader, to keep things ticking
        if(!Game.creeps[creepNames[0]] && controller.level<6)
            this.withdrawThenUpgrade(spawnNameForUpgraders,creepNames[0],controller.getContainer().id,controller.id,upgraderBody,true);
            
        ///////////////////////////////////////////////////////////////////////////////
        // Feeders
        for(let i=0; i<funnelers; i++){
            let cname = spawnNameForFeeders.charAt(0)+'fe'+i;
            if(Game.creeps[cname] || goFullTilt){
                // if the container is full, then wait out of the way for the upgraders to get through
                if(Game.creeps[cname] && !storeToFeed.haveSpaceFor(Game.creeps[cname].storedAmount())){
                    Game.creeps[cname].moveToPos(funnelerWaitSpot);
                }else{
                    this.haulResources(spawnNameForFeeders,cname,funnelerBody,feederStorage, storeToFeed, [RESOURCE_ENERGY],[],4000,150);
                }
            }
        }    

        
    },
    

    manageReactions: function(spawnName,storage_id,terminal_id,labWirings,import_resource_types,parkSpot){
        
        let creepBody = '3m6c';
        let storage = gob(storage_id)
        let terminal = gob(terminal_id)

        let cname = spawnName+'-Lab'
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(creepBody,cname,{memory:{target:false}});
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
           let creep = Game.creeps[cname];
            
            let stored_type=false;
            for(let resource_type in creep.store){
                stored_type=resource_type;
            }    
            
           let targetAtStart=(creep.memory.target);
           for(let wiring of labWirings){
               this.manageLabTrio(creep,wiring);
           }

            // do we have space in storage, for deliveries?
            let refillSize =  creep.store.getCapacity();
            if( !creep.memory.target ){
                
                for(let resource_type of import_resource_types){
                    //clog(terminal.storingAtleast(1,resource_type),'terminal.storingAtleast(resource_type)>>'+resource_type)
                   // clog(storage.haveSpaceFor(1,resource_type)>refillSize,'storage.haveSpaceFor(resource_type)>refillSize>>'+resource_type)
                    if( terminal.storingAtleast(1,resource_type)>0 && storage.haveSpaceFor(refillSize,resource_type)
                        && (!stored_type || stored_type==resource_type ) ){
                        
                        creep.memory.target = {id:terminal_id,resource_type:resource_type,put_in_id:storage_id};
                        creep.memory.target.dir = 'empty';
                        clog("receive delivery of "+resource_type,creep.name)
                        break;
                        
                    }
                }
            }
            
            if(creep.memory.target){
            
                if(creep.memory.target.dir == 'fill'){
                    this.haulResources(spawnName,cname,creepBody,
                    gob(creep.memory.target.draw_from_id),
                    gob(creep.memory.target.id),
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
                   // clog(creep.memory.target,creep.name)
                    this.haulResources(spawnName,cname,creepBody,
                    gob(creep.memory.target.id),
                    gob(creep.memory.target.put_in_id),
                    [creep.memory.target.resource_type]);
                    //clog(targetAtStart,'targetAtStart')
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
               creep.moveTo(parkSpot) 
            }
            
            //clog(creep.memory.target,creep.name)
            // last check to see if something fucked up
            if(creep.memory.target && stored_type && creep.memory.target.resource_type!=stored_type){

                clog("Shit! Storing "+stored_type+" but had target for "+creep.memory.target.resource_type,creep.name)
                creep.memory.target = false;
            }
            if(!creep.memory.target && stored_type ){
                creep.memory.target = {id:storage_id,resource_type:stored_type,draw_from_id:terminal_id};
                creep.memory.target.dir = 'fill';
                clog("Shit! Storing "+stored_type+" but had no target. putting back  ")
                //creep.memory.target = false;
            }
        }
        
    },
    
    /**
     * manage the config of what resources different rooms want. This assumes they've already been hauled to the terminal.
     * see manageMineralHauling()
     * importerConfigs - array of objs with this template: {importer:'Alpha',resource_type:RESOURCE_OXYGEN,storageCap:50000}
     * exporters - an array of rooms who are exporting, such as ['Alpha','Beta'...]
     */
    manageInterRoomTrading:function(importerConfigs,exporters){
      
      let exportTerminals=[];
      let exportBatchSize=6000;
      for(let clusterName of exporters){
          if(!Game.spawns[clusterName]){clog("No spawn for"+clusterName+". Can't run",'manageInterRoomTrading')}
          let expRoomName = Game.spawns[clusterName].pos.roomName;
          let terminal = mb.getTerminalForRoom(expRoomName);
          if(!terminal){clog("terminal is missing for "+clusterName,'manageInterRoomTrading')}
          if(terminal.cooldown===0)exportTerminals.push(terminal);
      }
     
       for(let config of importerConfigs){
          if(!Game.spawns[config.importer]){clog("No spawn for"+config.importer+". Can't run",'manageInterRoomTrading')}
          let roomName = Game.spawns[config.importer].pos.roomName;
          let impStorage = mb.getStorageForRoom(roomName);
          let impTerminal = mb.getTerminalForRoom(roomName);
          if(!impStorage){clog("storage is missing for "+config.importer,'manageInterRoomTrading')}
          if(!impTerminal){clog("terminal is missing for "+config.importer,'manageInterRoomTrading')}
          
          
          
          for(let exportTerminal of exportTerminals){
            if( config.storageCap > (impStorage.storedAmount(config.resource_type) + impTerminal.storedAmount(config.resource_type) + exportBatchSize )
                && exportTerminal.storingAtleast( exportBatchSize, config.resource_type ) ){
                    
                    let res = exportTerminal.send(config.resource_type,exportBatchSize,roomName)
                    if(res===OK)clog("Sending "+exportBatchSize+" >>["+config.resource_type+"]>> to "+config.importer,'manageInterRoomTrading')
                }
          }
          
          
      }
        
    },
    
    /**
     * Run the hauler config for a core room, for all its minerals
     *  - collecting from harvesting this rooms minerals
     *  - moving resources to and from labs
     *  - handling imports, from terminal to storage
     * 
     * All resources are assumed to be moved to storage
     * 
     * clusterName - logical name for he room
     * haulerConfig - an array of destinations to empty/fill with resources. config example: {target_id:'asg35fg23f',resource_type:RESOURCE_OXYGEN,action:'empty'}
     * imports - array of resources to transfer from terminal to storage
     * eports - array of resources to export, config item example:{resource_type:RESOURCE_OXYGEN,exportOver:50000,batchSize:1000}
     * parkSpot - where to park when no jobs
     */ 
    manageMineralHauling: function(clusterName,haulerConfig, imports,exports,parkSpot){
        
        if(!Game.spawns[clusterName]){clog("No spawn for"+clusterName+". Can't run",'manageMineralHauling')}
        let roomName = Game.spawns[clusterName].pos.roomName;
        let storage = mb.getStorageForRoom(roomName);
        let terminal = mb.getTerminalForRoom(roomName);
        if(!storage){clog("storage is missing for "+clusterName,'manageMineralHauling')}
        if(!terminal){clog("terminal is missing for "+clusterName,'manageMineralHauling')}
        let creepName = clusterName.charAt(0)+"-mh-0";
        let creepBody = '6c3m';
        
        if(!Game.creeps[creepName]){
            return Game.spawns[clusterName].spawnCreepX(creepBody,creepName,{memory:{job:false}},true);
        }
        if(Game.creeps[creepName] && Game.creeps[creepName].spawning)return;
        
        let creep = Game.creeps[creepName];
        let creepSpace =  creep.store.getCapacity();
         
        let stored_type=false;
        for(let resource_type in creep.store){
            stored_type=resource_type;
        }
    
        ///////////////////////////////////////////////////
        // Job selection
        ///////////////////////////////////////////////////
        // if already carrying something, but no job, then go put it back in storage
        if(!creep.memory.job && stored_type){
            creep.memory.job = {target_id:'nope',resource_type:stored_type,action:'empty'}
        }    
        // lets first look if any containers need empting
        if(!creep.memory.job){
            
            for(let config of haulerConfig){
                let obj = Game.getObjectById(config.id);
                if(obj){
                    let pickupAmount = config.phaseOut?1:creepSpace;
                    if(config.action=='empty' && storage.haveSpaceFor(creepSpace,config.resource_type) && obj.storingAtleast(pickupAmount,config.resource_type) ){
                        creep.memory.job = { target_id:config.id, resource_type:config.resource_type, action:'empty' };
                        break;
                    }
                    if(config.action=='fill' && storage.storingAtleast(creepSpace,config.resource_type) && obj.haveSpaceFor(creepSpace,config.resource_type) ){
                        creep.memory.job = { target_id:config.id, resource_type:config.resource_type, action:'fill' };
                        break;
                    }
                }
            }
        }
        // now lets look for any import jobs
        if(!creep.memory.job){
            for(let resource_type of imports){
                if(terminal.storingAtleast(1,resource_type)){
                    creep.memory.job = {target_id:terminal.id,resource_type:resource_type,action:'empty'};
                    break;
                }
            }
        }
        // now lets look for any export jobs
        if(!creep.memory.job){
            for(let exportConf of exports){
                if(creep.name=='Z-mh-0'){
                    
                }
                if( 
                    storage.storingAtleast((exportConf.exportOver+creepSpace),exportConf.resource_type) 
                    && terminal.storingLessThan(exportConf.batchSize,exportConf.resource_type)
                    && terminal.haveSpaceFor(creepSpace,exportConf.resource_type)
                    ){
                    creep.memory.job = {target_id:terminal.id,resource_type:exportConf.resource_type,action:'fill'};
                    break;
                }
            }
        }
        
        if(creep.memory.job){
            let job = creep.memory.job;
            let jobTarget = Game.getObjectById(job.target_id);
            
            if(job.doneLastTick && creep.isEmpty(job.resource_type)){
                creep.memory.job= false;
                return;
            }
            
            if(job.action=='fill'){
                
                if(creep.carryingAtleast(1,job.resource_type)){
                    // lets make sure the target still has space
                    if(jobTarget.haveSpaceFor(creep.storedAmount(job.resource_type),job.resource_type) && creep.transfer(jobTarget,job.resource_type)===OK){
                        creep.memory.job.doneLastTick=true;
                    }else{
                        creep.moveToPos(jobTarget);
                    }
                }else{
                    creep.actOrMoveTo("withdraw",storage,job.resource_type);
                }
            }
            if(job.action=='empty'){
                
                if(creep.carryingAtleast(1,job.resource_type)){
                    // lets make sure the target still has space
                    if(storage.haveSpaceFor(creep.storedAmount(job.resource_type),job.resource_type) && creep.transfer(storage,job.resource_type)===OK){
                        creep.memory.job.doneLastTick=true;
                    }else{
                        creep.moveToPos(storage);
                    }
                }else{
                    creep.actOrMoveTo("withdraw",jobTarget,job.resource_type);
                }
            }
        }
        
        //
        if(!creep.memory.job){
           creep.moveToPos(parkSpot) 
        }
        
    },
    runLabTrio: function(reactorID,source0ID,source1ID,reverse=false){
        let reactor = Game.getObjectById(reactorID);
        let input0 = Game.getObjectById(source0ID);
        let input1 = Game.getObjectById(source1ID);
        if(reactor && input0 && input1 && reactor.cooldown==0){
            if(reverse)reactor.reverseReaction(input0 , input1  );
            else reactor.runReaction(input0 , input1  );
        }
    },
    
    // this function is soon to be deprecated
    manageLabTrio: function(creep,labConfig){

        
        let reactor = Game.getObjectById(labConfig.target.id);
        let input0 = Game.getObjectById(labConfig.sources[0].id);
        let input0_draw_from = Game.getObjectById(labConfig.sources[0].draw_from_id);
        let input1 = Game.getObjectById(labConfig.sources[1].id);
        let input1_draw_from = Game.getObjectById(labConfig.sources[1].draw_from_id);
        
        if(!creep.memory.target){
            
            // clean up old runs
           
            for(let resource_type in reactor.store){
              //  clog(resource_type,'plan:'+labConfig.target.resource_type)
                
                if(resource_type==RESOURCE_ENERGY)continue;
                
                if(resource_type!==labConfig.target.resource_type){
                    storing_another_type = resource_type;
                    labConfig.target.resource_type = resource_type;
                     creep.memory.target = labConfig.target;
                     creep.memory.target.dir = 'empty';
                     return;
                }
            }
            
            let stored_type=false;
            for(let resource_type in creep.store){
                stored_type=resource_type;
            }
           //clog(stored_type,'stored_type')
          let refillSize =  creep.store.getCapacity();
            //clog(input0.haveSpaceFor(refillSize,labConfig.sources[0].resource_type),labConfig.sources[0].resource_type)
            //clog(input0_draw_from.storingAtleast(refillSize,labConfig.sources[0].resource_type) ,'input0_draw_from.storingAtleast(refillSize,labConfig.sources[0].resource_type)')
            if(!stored_type && reactor.storingAtleast(refillSize,labConfig.target.resource_type) && labConfig.target.put_in_id!=='leave' ){
                
                creep.memory.target = labConfig.target;
                creep.memory.target.dir = 'empty';
                
            }else if(labConfig.phaseOut && !stored_type && reactor.storingAtleast(1,labConfig.target.resource_type) ){
                
                creep.memory.target = labConfig.target;
                creep.memory.target.dir = 'empty';
                
            }
            
            
            else if( !labConfig.phaseOut 
                    &&  (!stored_type||stored_type==labConfig.sources[0].resource_type) 
                    && input0.haveSpaceFor(refillSize,labConfig.sources[0].resource_type) 
                    && input0_draw_from
                    && input0_draw_from.storingAtleast(refillSize,labConfig.sources[0].resource_type)
                    && labConfig.target.draw_from_id!=='leave'){
                
                creep.memory.target = labConfig.sources[0];
                creep.memory.target.dir = 'fill';
                
            }else if( !labConfig.phaseOut 
                        && (!stored_type||stored_type==labConfig.sources[1].resource_type) 
                        && input1.haveSpaceFor(refillSize,labConfig.sources[1].resource_type) 
                        && input1_draw_from
                        && input1_draw_from.storingAtleast(refillSize,labConfig.sources[1].resource_type)
                        && labConfig.target.draw_from_id!=='leave'){
                
                creep.memory.target = labConfig.sources[1];
                creep.memory.target.dir = 'fill';
                
            }
            // if a lab has resources, and the OTHER lab is dry, AND we are done, then clean up and put back
            else if( labConfig.phaseOut 
                    &&  (!stored_type||stored_type==labConfig.sources[0].resource_type) 
                    && input1.isEmpty(labConfig.sources[1].resource_type)
                    && !input0.isEmpty(labConfig.sources[0].resource_type) 
                    && input0_draw_from.haveSpaceFor(refillSize,labConfig.sources[0].resource_type) ){
                
                creep.memory.target = labConfig.sources[0];
                creep.memory.target.dir = 'empty';
                creep.memory.target.put_in_id = creep.memory.target.draw_from_id;
                
            }else if( labConfig.phaseOut 
                    &&  (!stored_type||stored_type==labConfig.sources[1].resource_type) 
                    && input0.isEmpty(labConfig.sources[0].resource_type)
                    && !input1.isEmpty(labConfig.sources[1].resource_type) 
                    && input1_draw_from.haveSpaceFor(refillSize,labConfig.sources[1].resource_type) ){
                
                creep.memory.target = labConfig.sources[1];
                creep.memory.target.dir = 'empty';
                creep.memory.target.put_in_id = creep.memory.target.draw_from_id;
                
            }
        }
        
        if(reactor.cooldown==0){
            reactor.runReaction(input0 , input1  );
        }
         
    },
    
    // send a resource in chunks of X from roomA to RoomB. Mainly for feeding energy
    streamResource: function(srcClusterName,targetClusterName,resource_type,startAt=600000,stopAt=50000,batchSize=20000,bodyPlan='10c1m'){
        
        if(startAt<stopAt){
            clog('hey dummy. streamResource() configured wrong for:'+srcClusterName+' >>['+resource_type+'].. '+targetClusterName);
            return;
        }
        let srcRoomName = Game.spawns[srcClusterName].pos.roomName;
        let targetRoomName = Game.spawns[targetClusterName].pos.roomName;
        let creepName = srcClusterName.charAt(0)+'-streamer';
        let storage = mb.getStorageForRoom(srcRoomName);
        let terminal = mb.getTerminalForRoom(srcRoomName);
        let sendEnergyCost = 5000;
        // if we are sending energy, then we need enough to send it + what we want to send
        if(resource_type==RESOURCE_ENERGY)
            sendEnergyCost+=batchSize;

     
        
       // Game.creeps[creepName].say(stopAt)
        // we may need to stop piping data and set how much to always leave in the storage
        if( storage.getMeta().streaming ){
            this.haulResources(srcClusterName, creepName, bodyPlan, storage, terminal, [resource_type] );
            
            // when we have enough to send, then pip over the batch
            if(terminal.storingAtleast(batchSize,resource_type) && terminal.storingAtleast(sendEnergyCost,RESOURCE_ENERGY)){
                let res = terminal.send(resource_type, batchSize, targetRoomName);
                if(res===OK)clog(res,srcClusterName+' Sending >>['+batchSize+' '+resource_type+']>> '+targetClusterName) ;
             }
        }
        
        
        // now decide if we still want to stream. Do it after haul, incase we withdraw the last bit of that resource
        if(storage.getMeta().streaming && storage.storingLessThan(stopAt,resource_type)){
            clog(storage.id+'='+storage.store.getUsedCapacity(resource_type),'Less than '+stopAt+'. Streaming OF : '+srcClusterName+' >>['+resource_type+'].. '+targetClusterName)
            storage.setMetaAttr('streaming',false);
            return;
        }
        //clog(storage.storingAtleast(startAt,resource_type),'storage.storingAtleast('+startAt+','+resource_type+')')
        if(!storage.getMeta().streaming && storage.storingAtleast(startAt,resource_type)){
            clog(storage.id+'='+storage.store.getUsedCapacity(resource_type),'over '+startAt+'. Streaming  ON : '+srcClusterName+' >>['+resource_type+']>> '+targetClusterName)
            storage.setMetaAttr('streaming',true);
            return;
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
        if(creep && cname=='BBux2-fe-3')clog(targetStore,creep.name)
        let resource_type = false;
        let drawFromTarget = Game.getObjectById(sourceStore.id);
        //clog(drawFromTarget)
        // id we don't have an observer on the room, then just default to first in array.
        // if you want hauler to stop when no resources left, then need to see the other room
        if(!Game.rooms[sourceStore.pos.roomName] || sourceStore.id=='creep')resource_type=resource_types[0];
    
        for(let r of resource_types){
            if(creep && creep.store.getUsedCapacity(r)>0){
                resource_type = r;
                break;
            }
            if(drawFromTarget && drawFromTarget.store.getUsedCapacity(r)>minDrawSize){
                resource_type = r;
                break;
            }
        }
       // if(creep && creep.name=='At0')clog(sourceStore,'At0')
        
        if(!resource_type){return};
        
        //if(tickToLiveTo===3)clog(resource_type,'yo')
        if(!Game.creeps[cname] && Game.cpu.bucket>cpuBucketBreak ){
            Game.spawns[spawnName].spawnCreepX(parts,cname)
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning ){
            
            if(creep.ticksToLive<tickToLiveTo && creep.storingLessThan(1,resource_type)){
                creep.suicide();
            }
           // creep.say(resource_type)
          // clog(creep.store.getUsedCapacity(resource_type),resource_type)
            if(creep.store.getUsedCapacity(resource_type)==0){
                
                if(roomTraversal.length>0 && creep.pos.roomName!=sourceStore.pos.roomName){
                    let res =  this.traverseRooms(creep,roomTraversal);
                   // creep.say("w-r:"+res);
                }else{
                    
                    if(sourceStore.id=='creep'){
                        
                        let rp = new RoomPosition(sourceStore.pos.x,sourceStore.pos.y,sourceStore.pos.roomName);
                        if(!creep.pos.isNearTo(rp)){
                            return creep.moveToPos(rp)
                        }else{
                            let creeps = rp.lookFor(LOOK_CREEPS);
                            if(creeps.length>0){
                                return creeps[0].transfer(creep,resource_type);
                            }else{
                                let drops = rp.lookForResource(resource_type)
                                if(drops.length>0)
                                    creep.pickup(drops[0])
                            }
                        }
                    }else{
                        let res = this.actOrMove2(creep,sourceStore,"withdraw",resource_type);
                      //  creep.say("w-r:"+res);
                    }
                    
                }
                
            }else{
               // clog(targetStore)
                
                if(targetStore.id=='creep'){
                    let rp = new RoomPosition(targetStore.pos.x,targetStore.pos.y,targetStore.pos.roomName);
                    let creeps = rp.lookFor(LOOK_CREEPS);
                    //clog(creeps)
                    if(creeps.length>0){
                        //targetStorage.id = creeps[0].id;
                        return creep.actOrMoveTo("transfer",creeps[0],resource_type);
                    }
                }
                
                if(roomTraversal.length>0 && creep.pos.roomName!=targetStore.pos.roomName){
                    
                    let res = this.traverseRooms(creep,roomTraversal.reverse());
                  //  creep.say("t-r:"+resource_type.charAt(0)+":"+res);
                }else{
                      let res =  this.actOrMove2(creep,targetStore,"transfer",resource_type);
           
                     // creep.say("t:"+res);
                }
                
            }


        }
    },
    rotatingScouts:{},
    rotateScouts: function(spawnName,roomName,scoutPrefix,waitingSpot,traverseRooms=[],leadTime=200){
        // handle global reset, we need to figure which creep is active
        if(Game.creeps[ scoutPrefix+'0' ])this.rotatingScouts[scoutPrefix]= scoutPrefix+'0';
        if(Game.creeps[ scoutPrefix+'1' ])this.rotatingScouts[scoutPrefix]= scoutPrefix+'1';
        
        // setup with given creep. will break on global reset...but oh well. its a 1m creep.
        if(!this.rotatingScouts[scoutPrefix])this.rotatingScouts[scoutPrefix]=scoutPrefix+'0';
        // if the active creep is near dead, then start bringing in the new one
        if(Game.creeps[this.rotatingScouts[scoutPrefix]] && Game.creeps[this.rotatingScouts[scoutPrefix]].ticksToLive<leadTime)
            this.rotatingScouts[scoutPrefix] = this.rotatingScouts[scoutPrefix]==scoutPrefix+'0'?scoutPrefix+'1':scoutPrefix+'0';
        // move the scout in   
        if(Game.creeps[scoutPrefix+'0'] || this.rotatingScouts[scoutPrefix]==scoutPrefix+'0')this.scoutRoom(spawnName,scoutPrefix+'0',roomName,waitingSpot,traverseRooms);
        if(Game.creeps[scoutPrefix+'1'] || this.rotatingScouts[scoutPrefix]==scoutPrefix+'1')this.scoutRoom(spawnName,scoutPrefix+'1',roomName,waitingSpot,traverseRooms);
        // return the active scout name
        return this.rotatingScouts[scoutPrefix];
    },
    rotatingCreeps:{},
    rotateCreep: function(cnamePrefix, callBack,leadTime=750){
        // handle global reset, we need to figure which creep is active
        if(Game.creeps[ cnamePrefix+'0' ])this.rotatingCreeps[cnamePrefix]= cnamePrefix+'0';
        if(Game.creeps[ cnamePrefix+'1' ])this.rotatingCreeps[cnamePrefix]= cnamePrefix+'1';
        //clog('hello')
        // setup with given creep. will break on global reset...but oh well. its a 1m creep.
        if(!this.rotatingCreeps[cnamePrefix])this.rotatingCreeps[cnamePrefix]=cnamePrefix+'0';
        // if the active creep is near dead, then start bringing in the new one
        if(Game.creeps[this.rotatingCreeps[cnamePrefix]] && Game.creeps[this.rotatingCreeps[cnamePrefix]].ticksToLive<leadTime)
            this.rotatingCreeps[cnamePrefix] = this.rotatingCreeps[cnamePrefix]==cnamePrefix+'0'?cnamePrefix+'1':cnamePrefix+'0';
        // move the scout in   
        if(Game.creeps[cnamePrefix+'0'] || this.rotatingCreeps[cnamePrefix]==cnamePrefix+'0')callBack(cnamePrefix+'0');
        if(Game.creeps[cnamePrefix+'1'] || this.rotatingCreeps[cnamePrefix]==cnamePrefix+'1')callBack(cnamePrefix+'1');
        // return the active scout name
        return this.rotatingCreeps[cnamePrefix];
    },
    // ############################################################################################
    // Starting a new room functions
    // ############################################################################################
    //activeRoomOverseer:Game.creeps['Xs0']?'Xs0':'Xs1',
    startupRoomNoVision: function(spawnName,roomName,config={}){
        // setup with given creep. will break on global reset...but oh well. its a 1m creep.
        /*if(!this.activeRoomOverseer)this.activeRoomOverseer='Xs0';
        // if the active creep is near dead, then start bringing in the new one
        if(Game.creeps[this.activeRoomOverseer] && Game.creeps[this.activeRoomOverseer].ticksToLive<200)
            this.activeRoomOverseer=this.activeRoomOverseer=='Xs0'?'Xs1':'Xs0';
        // move the scout in   
        this.scoutRoom(spawnName,this.activeRoomOverseer,roomName,{x:12,y:45});*/
         this.rotateScouts(spawnName,roomName,roomName,{x:25,y:25});
        // can not we see the room, then wait for scout
        if(!Game.rooms[roomName])return; 
        
        if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
            
       // return;   
        this.startupNewRoomWithVision(roomName,spawnName,config);
       
    },
    
    /**
     * var observer_id
     * var roomName
     * var spawnName
     * var config >> see startupNewRoomWithVision() for config docs
     */ 
    startupNewRoomWithObserver: function(observer_id,roomName,spawnName,config={}){
    
        
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
                buildUpSites:true          >> build any construction sites
                reserve:false               >> instead of claim, keep it rerserved in prep of GCL++
                phaseOut:false              >> if true, then no more creeps will be spawned
            }
     */
     
    startupNewRoomWithVision: function(roomName,spawnName, conf={}){
        
        let config={
            workerCount:conf.workerCount===undefined?4:conf.workerCount,
            workerBody:conf.workerBody===undefined?'4w4c4m':conf.workerBody,
            drawFromRuins:conf.drawFromRuins===undefined?false:conf.drawFromRuins,
            drawFromStructures:conf.drawFromStructures===undefined?false:conf.drawFromStructures,
            harvestSources:conf.harvestSources===undefined?true:conf.harvestSources,
            dismantleStructures:conf.dismantleStructures===undefined?false:conf.dismantleStructures,
            buildUpSites:conf.buildUpSites===undefined?true:conf.buildUpSites,
            reserve:conf.reserve===undefined?false:conf.reserve,
            defend:conf.defend===undefined?false:conf.defend,
            defenderSpot:conf.defenderSpot===undefined?{x:18,y:13}:conf.defenderSpot,
            phaseOut:conf.phaseOut===undefined?false:conf.phaseOut
        }
        
        let room = Game.rooms[roomName];
  
        if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
        let container_ids=[];
        let dismantle_ids=[];
        let wall_ids = [];
        if(room){
            
            // Firstly, lets go make a claim on the room
            if(!room.controller.owner && !config.reserve){
               
                this.claimRoom(spawnName,roomName+'-cl',room.controller);
            }
            if(config.reserve){
                this.reserverRoom(spawnName,roomName+'-cl',room.controller,'1cl1m',true);
            }
            
            if(config.defend){
                
                 this.constantGuardRoom(spawnName,roomName+'-guard',roomName,'2t2m + 4*1a1m1r1m + 1h1m', conf.defenderSpot );
            }
            
            
            if(config.dismantleStructures){
                let structures = mb.getStructures({
                    roomNames:[roomName],
                    /*types:[STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_STORAGE],*/
                    /*filters:[{attribute:'isEmpty',operator:'fn',value:[]}]*/
                    
                });
                for(let obj of structures){
                    if(obj.owner && obj.owner.username!='MadDokMike'
                        && obj.structureType !== STRUCTURE_CONTROLLER
                        &&(!obj.store || obj.isEmpty()))
                        dismantle_ids.push(obj.id);
                }
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
                    types:[STRUCTURE_TOWER,STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_STORAGE,STRUCTURE_TERMINAL],
                    filters:[{attribute:'storingAtleast',operator:'fn',value:[1]}]
                    
                });
                for(let obj of structures){
                    if(!obj.owner || obj.owner.username!='MadDokMike')container_ids.push(obj.id);
                }
                
                 
            }
            
            
            // now lets set up the harvesters and register and mine stores
            if(config.harvestSources){
                let sources  = mb.getAllSourcesForRoom(roomName);
                for(let s in sources){
                    this.harvestPoint(spawnName,roomName+'-h'+s,'6w6m1c',sources[s]);
                } 
            }
            let containers = mb.getStructures({
                    roomNames:[roomName],
                    // doesn't play well once you start building own stuff. designed to steal other users stuff
                    types:[STRUCTURE_CONTAINER],
                    filters:[{attribute:'isMineStore',operator:'fn',value:[]},{attribute:'storingAtleast',operator:'fn',value:[250]}]
                    
                });
               // clog(containers.length,'containers')
            for(let obj of containers)
                container_ids.push(obj.id);
            
            if(config.buildUpSites){
                let walls = mb.getStructures({
                    roomNames:[roomName],
                     types:[STRUCTURE_RAMPART,STRUCTURE_WALL],
                    filters:[{attribute:'hits',operator:'<',value:[50000]}]
                });
                if(walls.length>0)wall_ids.push(walls[0].id);
                
            }
          
            // now lets deploy the workers to draw from all containers
                for(let c=0; c < config.workerCount;c++){
                    let bodyPlan = config.workerBody;
                    let creepName = roomName+'-w'+c;
                    let creep = Game.creeps[creepName];
                    
                    if(config.phaseOut && !creep)continue;
                    
                    
                    
                    if(dismantle_ids.length>0){
                        
                         let id = dismantle_ids[c]?dismantle_ids[c]:dismantle_ids[0];
                       
                         this.farmStructureThenUpgrade(spawnName,creepName,bodyPlan,id,room.controller.id)
                         
                    }else if(container_ids.length>0){
                        let sid = (c % 2);
                        let id = container_ids[sid]?container_ids[sid]:container_ids[0];
                        
                        
                        if(creep && creep.isEmpty()){
                            creep.memory.fix_id=false;
                        }
    
                        let repT = (creep)?gob(creep.memory.fix_id):false;
                        if(creep && repT && repT.hits < repT.hitsMax){
                            this.withdrawThenRepair(spawnName,creepName,id,creep.memory.fix_id,bodyPlan);
                            continue;
                        }
                        
                        
                        let container = Game.getObjectById(id);
                        let conSite = mb.getNearestConstruction(container.pos, [roomName]);
                        
                        let fixable = mb.getNearestRepairTarget(container.pos, [roomName]);
                        if( fixable && fixable.hits < 3000 ){
                            wall_ids.push(fixable.id);
                        }
                        
                        if(config.buildUpSites  && (conSite || wall_ids.length>0)){
                            if(wall_ids.length>0){
        
                                let repair_id = wall_ids[sid]?wall_ids[sid]:wall_ids[0];
                                if(creep){
                                    creep.memory.fix_id=repair_id
                                }
                                this.withdrawThenRepair(spawnName,creepName,id,repair_id,bodyPlan);
                            }else{
                               
                                this.withdrawThenBuild(spawnName,creepName,id,conSite.id,bodyPlan);
                            }
                            
                        }else{
                            this.withdrawThenUpgrade(spawnName,creepName,id,room.controller.id,bodyPlan);
                        }
                        
                    }
                    
                }  
            
        } 
    },
    
    // designed to harvest a source, but first build a container to drop into,then pickup E at feet
    harvestPoint:function(spawnName,cname,bodyPlan,target){
        if(!Game.creeps[cname] && !Memory.invaderSeen[target.pos.roomName]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(!mb.hasRoom(target.pos.roomName))mb.scanRoom(target.pos.roomName)
        //creep.say(target.pos.roomName)
            if(target.pos.roomName===creep.pos.roomName){
                let source =  Game.getObjectById(target.id)
                let res = creep.actOrMoveTo('dropHarvest',source);
               // creep.say("dh:"+res)
            }else{
                this.actOrMove2(creep,target,"harvest");
            }
             
        }
    },
       
    harvestAndCollectMineral:function(spawnName,mineral_id,container_id,store_id,mineral_type,haulerBody='1m2c',harvesterBody='10W2m',creep_suffix=''){
        
        let roomName = Game.spawns[spawnName].pos.roomName;
        let container = gob(container_id)
        if(container){
            if(!container.isFull(mineral_type))this.harvestMineral(spawnName,spawnName.charAt(0)+'hx'+creep_suffix,harvesterBody,{id:mineral_id,pos:{x:1,y:1,roomName:roomName}},mineral_type);
            if(Game.creeps[spawnName.charAt(0)+'hx'+creep_suffix])Game.creeps[spawnName.charAt(0)+'hx'+creep_suffix].moveTo(gob(container_id));
            
            this.haulResources(spawnName,spawnName.charAt(0)+'tx'+creep_suffix,haulerBody,
            gob(container_id),
            gob(store_id),[mineral_type],[],4000,200 );
        }
       
        
    },
   
    harvestAndCollectCentreSectorMineral:function(spawnName,mineral_id,standingSpot,store_id,mineral_type,haulerBody='1m2c',harvesterBody='10W2m',creep_suffix='',haulerCount=1){
        
        let roomName = Game.spawns[spawnName].pos.roomName;
        let mineral = gob(mineral_id);
        let harveyName = spawnName.charAt(0)+'hx'+creep_suffix;
        this.harvestMineral(spawnName,harveyName,harvesterBody,{id:mineral_id,pos:{x:1,y:1,roomName:roomName}},mineral_type,standingSpot);
        
        for(let h=0; h<haulerCount; h++){
            let haulerName = spawnName.charAt(0)+'tx'+creep_suffix+'-'+h
            if(Game.creeps[harveyName] || Game.creeps[haulerName] ){
                
                this.haulResources(spawnName,haulerName,haulerBody,
                    {id:'creep',pos:standingSpot},
                    {id:store_id,pos:{x:1,y:1,roomName:roomName}},[mineral_type],[],4000,200 );
            }
        }
    },
    harvestMineral:function(spawnName,cname,bodyPlan,target,resource_type,standingSpot=undefined){
        let mineral = (target)?gob(target.id):false;
       // clog(standingSpot)
        if(!Game.creeps[cname] && mineral && (mineral.amount>0 || mineral.mineralAmount>0) ){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(standingSpot && !creep.pos.isEqualTo(standingSpot)){
                creep.moveToPos(standingSpot);
                return;
            }
             let drop = creep.pos.lookForNearbyResource(resource_type);
             //clog(drop.id,cname)
            if(drop){
                creep.pickup(drop)
            }
            if(mineral)this.actOrMove2(creep,mineral,"harvest",resource_type);
        }
    },
    harvestMineralAndTransfer:function(spawnName,cname,bodyPlan,target,transfer_id,resource_type,standingSpot,speedy=false,harvestIfContainerFull=false){
        let mineral = (target)?gob(target.id):false;
        //clog(mineral)
        if(!Game.creeps[cname] && mineral && (mineral.amount>0 || mineral.mineralAmount>0) ){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname)
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            let container = gob(transfer_id);
            if(creep.isEmpty(resource_type) && creep.ticksToLive<100){
                creep.suicide();
            }
           
            if(container && creep.isFull(resource_type) || speedy){
                creep.transfer(container,resource_type);
            }
            if(!creep.pos.isEqualTo(standingSpot)){
                creep.moveToPos(standingSpot)
            }else{
                
                 let drop = creep.pos.lookForNearbyResource(resource_type);
                
                if(drop){
                    creep.pickup(drop)
                }else if(harvestIfContainerFull || (container&&!container.isFull(resource_type)))creep.harvest(target);
            }
            //creep.actOrMoveTo("harvest",target,resource_type);
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
    claimReactor:function(spawnName,cname,target,bodyPlan='1cl1m'){
        
        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX(bodyPlan,cname),cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
                let res = this.actOrMove2(creep,target,"claimReactor");
            
        }
    },
    reserverRoom:function(spawnName,cname,target,bodyPlan='2cl2m',attemptClaim=false){
        
        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname] && (!controller || (controller.level<1) ) ){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            
            
         
            if(controller && controller.owner && controller.owner.username!='MadDokMike'){
              
                 this.actOrMove2(creep,target,"attackController");
            }else if(controller && controller.reservation && controller.reservation.username!='MadDokMike'){
                 
                 this.actOrMove2(creep,target,"attackController");
            }
            else if(controller && (!controller.sign || (controller.sign &&  controller.sign.username!='MadDokMike') ) ){
                this.actOrMove2(creep,target,'signController',"R.I.P tiny humans.");
            }else{
                if(controller && attemptClaim){
                    let res = this.actOrMove2(creep,target,"claimController");
                    if(res!==ERR_GCL_NOT_ENOUGH)return;
                }else{
                    this.actOrMove2(creep,target,"reserveController");
                }
            }
            
        }
    },
    scoutRoom:function(spawnName,cname,roomName,watchSpot={x:25,y:25},roomTraversal=[], bodyPlan='1m'){
       // clog(spawnName)
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
           // creep.say('☕',true)
            creep.moveOffRoomEdge();
            
           // if(creep.name=='Barry1')clog(roomTraversal);
            
           // if(creep.pos.roomName=='W14N14')creep.memory.riskyBiscuits=true;
            
             if(roomTraversal.length>0 && creep.pos.roomName!==roomName){
                    let res = this.traverseRooms(creep,roomTraversal);
                   // if(creep.name=='Barry1')clog("trav:"+res);
                  //  creep.say("trav:"+res);
            }else{
                let target = new RoomPosition(watchSpot.x,watchSpot.y,roomName);
                if(!creep.pos.isEqualTo(target))
                    creep.moveToPos( target )
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

    emptyOutStoresAndRetrieve: function(spawnName,cname,roomName,transfer_id,bodyPlan='10*1c1m'){
        
        let room = Game.rooms[roomName];
        if(!Game.creeps[cname] && Memory.stuffToSalvage==true){
     
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.checkAndUpdateState();
            
            if(creep.isWorking()){
                
                creep.moveOffRoomEdge();
                creep.say(creep.actOrMoveTo('transfer',gob(transfer_id),RESOURCE_ENERGY));
            }
            
            
            if(creep.isCollecting()){
                
                 if( creep.pos.roomName === roomName){
                    
                    let ruins = room.find(FIND_RUINS);
                    let container_id = '';
                    for(let r in ruins){
                        if(ruins[r].store.getUsedCapacity(RESOURCE_ENERGY)>0){
                           
                            container_id = ruins[r].id;
                            break;
                        }
                    }
                    
                    if(!container_id){
                        if(!mb.hasRoom(roomName))mb.scanRoom(roomName)
                        // ignore STRUCTURE_CONTAINER because they are often my own mines
                       let obj = mb.getNearestStructure(
                            creep.pos,
                            [STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_STORAGE,STRUCTURE_TERMINAL,STRUCTURE_LINK],
                            [roomName],
                            [
                                {attribute:'storingAtleast',operator:'fn',value:[1]}]
                            );
                        
                        if(obj){
                            container_id = obj.id;
                        }
                    }
                    if(container_id){
                        Memory.stuffToSalvage=true;
                        creep.say(creep.actOrMoveTo('withdraw',gob(container_id),RESOURCE_ENERGY));
                    }else{
                        Memory.stuffToSalvage=false;
                    }
                    
                }else{
                    creep.moveOffRoomEdge();
                    creep.moveToPos(new RoomPosition(25,25,roomName));
                }
            }
        }
        
    },
    maintainRoadsInRoom:function(spawnName,cname,roomNames,parts,harvestSources=true){
        
        if(!Game.creeps[cname]){
     
            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.checkAndUpdateState();
            
            if(typeof roomNames ==='string'){
                roomNames = [roomNames];
            }
            
            if(creep.isWorking()) {
                
                
                 var site = Game.getObjectById(creep.memory.construction_site_id);
        	    if(!site){
        	        let obj = mb.getNearestConstruction(creep.pos, roomNames);
        	        creep.memory.construction_site_id = obj.id;
        	    }
                 if(site){
                     return creep.actOrMoveTo('build',site);
                 }
      
                let target = Game.getObjectById(creep.memory.target_to_fix_id);
        	    if(!target || target.hits==target.hitsMax){
        	        target = mb.getNearestRepairTarget(creep.pos, roomNames);
            	    if(target){
            	        creep.memory.target_to_fix_id = target.id;
            	    }
        	    }

                if(target){
                    if(target.isMarkedForDismantle())return creep.actOrMoveTo('dismantle',target);
                    else return creep.actOrMoveTo('repair',target);
                }else{
                    creep.say('no targets')
                }
                
            }else if(creep.isCollecting()) {
                
                let drop = creep.getDroppedEnergy();
                if(drop){
                    return creep.actOrMoveTo("pickup",drop);
                }
                
                let storage = creep.getNearestWithdrawSite(roomNames);
                if(storage){
                    let res= creep.actOrMoveTo("withdrawX",storage);
                    return res;
        
                }else if(harvestSources){
                    let source = creep.getNearestSource(roomNames);
                    return creep.actOrMoveTo("harvest",source);
                }else{
                    creep.say('no E')
                }
            }
        }
	    

	    
	
    },
    buildWithFunnelHaulers:function(spawnName,builderName,site_ids,standingSpot,container_id,store_id,haulerBody='10*1m2c',builderBody='25w13m1c',haulerCount=1){
        let roomName = Game.spawns[spawnName].pos.roomName;
        let site = false;
        for(let id of site_ids){
            site = gob(id);
            if(site){
                this.withdrawThenBuild(spawnName,builderName,container_id,id,builderBody);
                break;
            }
        }
        let haulersAlive = 0;
        for(let h=0; h<haulerCount; h++){
            let hName = builderName+'-fe-'+h;
            if(Game.creeps[hName]){
                haulersAlive++;
                if(!site)Game.creeps[hName].suicide();
            }
    
            if(Game.creeps[builderName] || Game.creeps[hName] ){
                
                this.haulResources(spawnName,hName,haulerBody,gob(store_id),gob(container_id),[RESOURCE_ENERGY],[],4000,200 );
            }
        }
        if(Game.creeps[builderName])Game.creeps[builderName].say(haulersAlive+'/'+haulerCount+' haulers')
    },
    withdrawThenBuild: function(spawnName,cname,container_id,site_id,parts){
         let site = Game.getObjectById(site_id);
        let container = Game.getObjectById(container_id);
        
        if(site && container && site && !Game.creeps[cname]){
     
            clog(Game.spawns[spawnName].spawnCreepX(parts,cname),cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            //creep.say('b:')
            creep.checkAndUpdateState();
            
            if(creep.isWorking()) {
                
                if(site){
                    creep.say(creep.actOrMoveTo('build',site));
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
            //creep.say('r:')
            creep.checkAndUpdateState();
            
            if(creep.isWorking()) {
                
                if(target){
                    creep.actOrMoveTo('repair',target);
                }
                
            }else if(creep.isCollecting()) {
                
                 if(container){
                    creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
                }
            }
        }
    },
    withdrawThenUpgrade: function(spawnName,cname,container_id,controller_id,parts,turbo=false,standingSpot=false,boostPlans=[]){
        
         let container = Game.getObjectById(container_id);
        if(!container){
            clog(container_id,cname+' missing container')
            return;
        }
        // clog(Game.creeps[cname].pos)
        if(container && !Game.creeps[cname]){
            let mem= {};
            if(boostPlans.length>0){
                mem.boostPlans = boostPlans;
            }
            Game.spawns[spawnName].spawnCreepX(parts,cname,{memory:mem});
        }
        
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            if(creep.memory.boostPlans){
                creep.runBoostPlan();return;   
            }
            
            creep.checkAndUpdateState();
            //return
            if(standingSpot && !creep.pos.isEqualTo(standingSpot)){
                creep.moveToPos(standingSpot);
            }
            
            if(creep.isWorking()) {
                
               let controller = Game.getObjectById(controller_id);
               
                
                if(controller){
                    if(turbo){
                        let drop = creep.pos.lookForNearbyResource(RESOURCE_ENERGY);
                        if(drop){
                            creep.pickup(drop)
                        }else{
                            creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
                        }
                        
                    }
                    creep.actOrMoveTo('upgradeController',controller);
                }
                if( (container.hitsMax-container.hits) > 1000){
                    creep.repair(container);
                }
                
                
            }else if(creep.isCollecting()) {
                
                let drop = (creep.pos.isNearTo(container))?creep.pos.lookForNearbyResource(RESOURCE_ENERGY):false;
                if(drop){
                    creep.pickup(drop)
                }else if(container){
                    creep.say(creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY));
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
    /**
     * squadName - prefix for all squad members, to create a unique squad
     * RCL7Spawns - array of spawn names that can handle RCL7 spawning costs, for the big creeps
     * RCL6Spawns - array of spawn names that can handle RCL6 spawning costs, for the support creeps
     * targetRoom - where we are attacking
     * target_ids - array of obj ids, in order for squad to attack
     * musterSpot - RoomPosition where the squad should form up
     */ 
    squadAttackRCL5Room:function(squadName,RCL7Spawns,RCL6Spawns,targetRoom,target_ids,musterSpot,sapperCount=3,healerCount=2,attackerCount=2){
        
        
        if(Memory.squadAttackStages===undefined){
            Memory.squadAttackStages={squadName:'mustering'};
        }
        
        // set up healer config
        let healerCreepNames =[];
        let healerParts = '';
        for(let h=0;h<healerCount; h++)healerCreepNames.push(squadName+'-hlr-'+h);
        
        // set up sapper config
        let sapperCreepNames =[];
        let sapperParts = '';
        for(let s=0;s<sapperCount; s++)sapperCreepNames.push(squadName+'-sap-'+s);
        
        // set up attackers config
        let attackerCreepNames =[];
        let attackerParts = '';
        for(let a=0;a<attackerCount; a++)attackerCreepNames.push(squadName+'-atk-'+a);
        //////////////  Spawning ///////////////////////////////////////////////////////////////////////
        // now lets spawn all the big creeps in.
        for(let spawnName of RCL7Spawns){
            for(let healerName of healerCreepNames){
                if(!Game.creeps[healerName]){
                    Game.spawns[spawnName].spawnCreepX(healerParts,healerName);
                }
            }
            for(let sapperName of sapperCreepNames){
                if(!Game.creeps[sapperName]){
                    Game.spawns[spawnName].spawnCreepX(sapperParts,sapperName);
                }
            }
        }
        // now lets spawn all the support creeps in.
        for(let spawnName of RCL6Spawns){
            for(let attackerName of attackerCreepNames){
                if(!Game.creeps[attackerName]){
                    Game.spawns[spawnName].spawnCreepX(attackerParts,attackerName);
                }
            }
        }
        
        ////////////// Mustering ///////////////////////////////////////////////////////////////////////
        
        let musteredCount = 0;
        if(Memory.squadAttackStages=='mustering'){
            for(let roleGroup of [healerCreepNames,sapperCreepNames,attackerCreepNames]){
                for(let cname of roleGroup){
                    if(Game.creeps[cname] && !Game.creeps[cname].spawning){
                        Game.creeps[cname].moveToPos(musterSpot);
                        if(musterSpot.getRangeTo(Game.creeps[cname])<3){
                            musteredCount++;
                        }
                    }
                }
            }
            if(musteredCount==(healerCount+sapperCount+attackerCount) )
                Memory.squadAttackStages='attacking';
        }
        
        ////////////// Attacking ///////////////////////////////////////////////////////////////////////
        if(Memory.squadAttackStages=='attacking'){
            for(let cname of healerCreepNames){
                if(Game.creeps[cname]){
                    this.healSupportSquad(cname,[ ...healerCreepNames, ...sapperCreepNames, ...attackerCreepNames ]);
                }
            }
            for(let cname of sapperCreepNames){
                if(Game.creeps[cname]){
                    this.breakStructures('doesnae-matter',cname,targetRoom,target_ids,sapperParts);
                }
            }
        }
        
    },
    healSupportSquad: function(cname,squadNames){
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.moveOffRoomEdge();
            
            let lowestHPName = false;
            let aliveSquadName = false;
            let biggestHurt = 0;
            for(let squadName of squadNames){
                if(Game.creeps[squadName]){
                    aliveSquadName= squadName;
                    let hurts = Game.creeps[squadName].hitsMax - Game.creeps[squadName].hits;
                    if(hurts > biggestHurt){
                        lowestHPName=squadName;
                    }
                }
            }
            if(creep.hits < creep.hitsMax){
                creep.heal(creep);
                if(aliveSquadName)creep.moveToPos(Game.creeps[aliveSquadName]);
                if(lowestHPName)creep.moveToPos(Game.creeps[aliveSquadName]);
            }else if(lowestHPName){
                creep.rangedHeal(Game.creeps[lowestHPName])
                creep.actOrMoveTo('heal',Game.creeps[lowestHPName]);
            }else{
                creep.heal(creep);//preheal
                if(aliveSquadName)creep.moveToPos(Game.creeps[aliveSquadName]);
            }
        }
    },
    
    emptyContainersInEnemyRemote:function(spawnName,cname,target,roomTraversal=[], retreatSpot=undefined, dropLocation=undefined , bodyPlan='1m1c'){
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
             let container = Game.getObjectById(target.id);
            
            
            let hostiles = (Game.rooms[target.pos.roomName])?Game.rooms[target.pos.roomName].getHostiles():[];
           // clog(hostiles.length,cname)
            
            let nearbyGuards = hostiles.filter(function(hostile){return ( hostile.partCount(ATTACK)>0 || hostile.partCount(RANGED_ATTACK)>0 ) });
            
            //clog(nearbyGuards.length,'nearbyGuards')
            
            let timeToFlee=false;
            for(let guard of nearbyGuards){
                let distance = creep.pos.getRangeTo(guard);
                //clog(distance,guard.name);
                if(distance < 20){
                    guard.pos.colourIn('red');
                    timeToFlee=true;
                }else{
                    guard.pos.colourIn('orange')
                }
            }
            
            if(timeToFlee || creep.memory.avoidUntil > Game.time){
                if(retreatSpot===undefined)retreatSpot=Game.spawns[spawnName].pos;
                creep.moveToPos(retreatSpot);
                creep.moveOffRoomEdge();
                creep.memory.avoidUntil = Game.time+50;
                creep.drop(RESOURCE_ENERGY);
                creep.say('fleee',true);
                return;
            }
            
            if(creep.pos.roomName ===target.pos.roomName){ 
                if(creep.isFull()){
                   
                    
                   
                    let dropLoc = dropLocation?dropLocation:rp(container.pos.x-2,container.pos.y,container.pos.roomName);
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
     
            clog(Game.spawns[spawnName].spawnCreepX(parts,cname),cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.avoidSkeepers=true
            if(creep.pos.roomName!==roomName){
                creep.moveOffRoomEdge();
                creep.moveToPos( new RoomPosition(25,25,roomName) );
            }else{
                
                let oldWall=false;
                for(let id of ids ){
                     oldWall = Game.getObjectById(id);
                     if(oldWall)break;
                }
                if(oldWall)creep.actOrMoveTo('dismantle',oldWall); 
                
                if(creep.partCount(HEAL)>0 && creep.hits<creep.hitsMax){
                    creep.heal(creep)
                }
                
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
  
    },
    
    constantGuardSKRoom:function(spawnName,cname,roomName, keeper_lairs=[], parts = '20m20a5h5m'){
        
        if(Memory.invaderSeen===undefined){
            Memory.invaderSeen={};
        }
        // if its been over its predicted life span, then assume its dead
        if(Memory.invaderSeen[roomName] && Memory.invaderSeen[roomName]< Game.time) {
            clog("been "+Memory.invaderSeen[roomName]+" since we saw an invader",roomName);
            delete Memory.invaderSeen[roomName];
        }
        
        if(!Game.creeps[cname]  && !Memory.invaderSeen[roomName]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.moveOffRoomEdge();
            creep.memory.touchingCloth=true;
            creep.memory.riskyBiscuits=true;
            if(creep.partCount(ATTACK)>0){
                creep.memory.dontFlee=true;
            }
     
            if(creep.pos.roomName===roomName){
                
                let hostiles = (Game.rooms[roomName])?Game.rooms[roomName].getHostiles():[];
                let fighters = hostiles.filter(function(hostile){return ( hostile.partCount(ATTACK)>0 || hostile.partCount(RANGED_ATTACK)>0 || hostile.partCount(HEAL)>0 ) });
                 let invaders = fighters.filter(function(hostile){return  hostile.owner.username=='Invader' });
                
                if(invaders.length>=2){
                    Memory.invaderSeen[roomName] = Game.time+invaders[0].ticksToLive;
                    creep.say('$h!t',true)
                }
                
     
                let target = false;
                let priorityLair = false;
                let lowestCD = 9999;
                for(let id of keeper_lairs){
                    let lair = gob(id)
                   // clog(lair.pos+'='+lair.ticksToSpawn,cname)
                    if(lair.ticksToSpawn!==undefined && lair.ticksToSpawn < lowestCD){
                        lowestCD=lair.ticksToSpawn;
                        priorityLair = lair;
                        //clog(lair.pos+' chosen',cname)
                    }
                    let targets= fighters.filter(function(hostile){return hostile.pos.getRangeTo(lair)<10});
                    if(targets.length>0){
                        target = targets[0];break;
                    }
                }
                
                if(!priorityLair)priorityLair = gob(keeper_lairs[0]);
        
                // if we wont be able to kill the next keeper, then suicide for replacement
                if(creep.ticksToLive < priorityLair.ticksToSpawn){
                   // creep.suicide();
                }
                
                let sources = mb.getSources({roomNames:[roomName]});
                let harveyToHeal=false;
                let rangeToHarvey=9999;
                for(let src of sources){
                    if(src.haveCreep()){
                        let harvester = src.getCreep();
                        rangeToHarvey = harvester.pos.getRangeTo(creep);
                        if(harvester.hits < harvester.hitsMax && rangeToHarvey<10){
                            harveyToHeal = harvester;
                        }
                    }
                }
                        
                
                if(target){
                    
                    if(creep.partCount(ATTACK)>creep.partCount(RANGED_ATTACK)){
                        creep.rangedAttack(target)
                        creep.actOrMoveTo("attack",target);
                    }else{
                        creep.attack(target)
                        creep.actOrMoveTo("rangedAttack",target);
                    }
                    if(creep.hits<creep.hitsMax && creep.pos.getRangeTo(target)>1){
                        creep.heal(creep);
                    }
                    return target;
                }else{
                    if(creep.hits<creep.hitsMax){
                        creep.heal(creep);
                        
                    }   
                    if(harveyToHeal){
                        creep.rangedHeal(harveyToHeal)
                        creep.actOrMoveTo("heal",harveyToHeal);
                        creep.say('healing')
                    }else{
                        
                        let distance = 3;
                        if(creep.partCount(ATTACK)>creep.partCount(RANGED_ATTACK)){
                            distance=1;
                        }
                        if(creep.pos.getRangeTo(priorityLair)>distance){
                            // move back to start to rinse repeat
                            creep.moveToPos( priorityLair );
                            
                        }
                        creep.say('next in '+priorityLair.ticksToSpawn,true)
                        
                    }
                     
                }
   
            }else{
                creep.moveToPos( new RoomPosition(25,25,roomName) );
            }

        }
    },

    /**
     * Leader will :  spawn > wait for partner > renew > boost > muster > attack
     * spawnName - where to spawn from
     * cname - creeps name
     * parts - creeps body parts
     * healerName - the creep name for this dduos healere
     * musterSpot - where to form up before attacking
     * roomName - to attack
     * target_ids - ids of game objects to attack/dismantle
     * retreatSpot - if self/healer is too low, then retreat to pos, thats max range of towers
     * startAttackWhenReady - if duo is assembled, then start attack. Can be overidden to allow larger coordinations
     * renewSpawn - if not the main spawner, specify another spawn to go renew at
     * boostPlans - set labs and resources to boost. assumes full boosting. Boosting is done AFTER renewing
     */ 
    duoLeader: function(spawnName,cname,parts,healerName,musterSpot,roomName,target_ids,retreatSpot,roomTraversal=[],startAttackWhenReady=true,renewSpawn=false,boostPlans=[],spawnFacing=LEFT){
        
        renewSpawn = !renewSpawn?spawnName:renewSpawn; 
        if(!Game.creeps[cname]){
             let mem= {phase:'spawning'};
            if(boostPlans.length>0){
                mem.boostPlans = boostPlans;
            }
            clog(Game.spawns[spawnName].spawnCreepX(parts,cname,{memory:mem},true),cname);
        }
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            let healer = Game.creeps[healerName];
            
            if(creep.memory.phase==='spawning'){
                
                Game.spawns[renewSpawn].pauseSpawningUntil(Game.time+10);
                ////////////////////////////////////////////////
                // Renew and follow bounce
                ////////////////////////////////////////////////
                if(creep.pos.isNearTo(Game.spawns[renewSpawn])){
                    creep.move(spawnFacing)
                    Game.spawns[renewSpawn].renewCreep(creep);
                }else{
                    creep.moveTo(Game.spawns[renewSpawn])

                } 
                
                ///////////////////////////////////////////////
                // Are we Renewed? ready to boost & muster?
                ////////////////////////////////////////////////
                if(healer && !healer.spawning && healer.pos.isNearTo(creep) && ( creep.body.length<40 || (healer.ticksToLive>1450 && creep.ticksToLive > 1450) ) ){
                    clog("everyone TTL good",cname)
                    creep.memory.phase='boosting';
                }else{
                    clog(creep.ticksToLive,cname + " my ttl")
                   if(healer) clog(healer.ticksToLive,cname + " healer ttl")
                }
            }
            if(creep.memory.phase==='boosting'){
                
                if(creep.memory.boostPlans){
                    creep.say('boost');
                    creep.runBoostPlan();   
                }else{
                    creep.memory.phase='mustering';
                }
            }
            
            creep.moveOffRoomEdge();
            creep.memory.riskyBiscuits=true;
            creep.memory.dontFlee=true;
            creep.memory.avoidSkeepers=true
            
            let retreatToHeal=false;
            let okToMove = true;
            if(healer){
                
                if(healer.fatigue>0)okToMove=false;
                if(healer.pos.getRangeTo(creep)>1)okToMove=false;
                
                let maxTowerDamage = 800;
                let healerTakenTooMuchDmg = (maxTowerDamage < (healer.hitsMax-healer.hits));
                let iveTakenTooMuchDmg = (maxTowerDamage < (creep.hitsMax-creep.hits));
                if( healerTakenTooMuchDmg || iveTakenTooMuchDmg ){
                    
                    retreatToHeal=true;
                }
            }
            //clog(okToMove,cname)
            //clog(healer.pos.getRangeTo(creep),cname)
            
            if(creep.memory.phase==='attacking'){
                
                if(creep.pos.roomName===roomName){
                    
                    let hostiles = Game.rooms[roomName].getHostiles();
                    
                    //// DECIDE TARGET ///////////////
                    let target=false;
                    let rangeToTarget=999;
                    for(let id of target_ids ){
                         target = Game.getObjectById(id);
                         if(target)break;
                    }
                    // default to shooting our main target
                    let shootTarget=target;
                    let hostilesWithin2=0;
                    for(let hostile of hostiles){
                        let distance=hostile.pos.getRangeTo(creep);
                        if(distance>3)continue;
                        if(hostile.pos.lookForStructure(STRUCTURE_RAMPART))continue;
                        
                        
                        if(distance<3)hostilesWithin2++;
                        
                        
                        if(creep.partCount(ATTACK)>0 && distance==1){
                            target=hostile;
                            rangeToTarget=distance;
                            shootTarget=hostile;
                        }
                        shootTarget=hostile;
                    }
                    
                    //// SHOOT TARGET ///////////////
                    if(shootTarget && creep.partCount(RANGED_ATTACK)>0){
                        
                        // lets mass attack if many hostiles. Only doing within2 bcs 10-4-1
                        if(hostilesWithin2>1)creep.rangedMassAttack()
                        // assume we're facing a full rampart line so mass attack
                        else if(shootTarget.structureType==STRUCTURE_RAMPART)creep.rangedMassAttack()
                        // default to solid shot our target
                        else creep.actOrMoveTo('rangedAttack',shootTarget);
                        
                    }
                    
                    //// MOVE and ACT on TARGET ///////////////
                    
                   
                    if(target && (rangeToTarget==1 || target.structureType)){
                        if(creep.partCount(ATTACK)>0){  creep.attack(target);}
                        if(creep.partCount(WORK)>0){  creep.dismantle(target);}
                    }
                    if(retreatToHeal && okToMove){
                        creep.say('FtH')
                        creep.moveToPos( retreatSpot );
                        
                    }else if(okToMove && target ){
                        creep.moveToPos(target);
                    }else{
                        creep.say("wait")
                    }

                    
                }else{
                    
                    if(okToMove){
                        creep.say('MtA')
                        creep.moveToPos( retreatSpot );
                    }else{
                        creep.say("wait")
                    }
                }

                
            }else if( creep.memory.phase==='mustering' ){
                if(!creep.pos.isEqualTo(musterSpot)){
                     creep.memory.swampCost = 5;
                     
                    if(creep.pos.roomName==='W15N24' || creep.pos.roomName==='W15N25' )creep.memory.swampCost = 3;
                    
                    if(roomTraversal.length>0 && creep.pos.roomName!=musterSpot.roomName){
                        if(okToMove){
                            let res = this.traverseRooms(creep,roomTraversal);
                        }else{
                            creep.say("wait")
                        }
                    }else{
                        return creep.moveToPos(musterSpot);
                    }

                }
                if(!healer)return;
                
                if(startAttackWhenReady && creep.pos.isNearTo(healer)){
                    creep.memory.phase='attacking'
                }
            }
        }
       
    },
    

    /**
     * Healer will :  spawn > wait for partner > renew > boost > follow leader
     * spawnName - where to spawn from
     * cname - creeps name
     * parts - creeps body parts
     * leaderName - the creep name of who is leading the duo. Who healer, will follow
     * allies - [] of creep names who are friendly and can recieve heals
     * renewSpawn - if not the main spawner, specify another spawn to go renew at
     * boostPlans - set labs and resources to boost. assumes full boosting. Boosting is done AFTER renewing
     */ 
    duoHealer:function(spawnName,cname,parts,leaderName, leadersTarget, allies=[],renewSpawn=false,boostPlans=[],spawnFacing=LEFT){
        
        renewSpawn = !renewSpawn?spawnName:renewSpawn; 
        
        if(!Game.creeps[cname]){
            let mem= {phase:'spawning'};
            if(boostPlans.length>0){
                mem.boostPlans = boostPlans;
            }
            clog(Game.spawns[spawnName].spawnCreepX(parts,cname,{memory:mem},true),cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.riskyBiscuits=true;
            creep.memory.dontFlee=true;
            creep.memory.avoidSkeepers=true
            creep.moveOffRoomEdge();
            
            let leader = Game.creeps[leaderName];
            //clog(leaderName,cname)
            if(creep.memory.phase==='spawning'){
                ////////////////////////////////////////////////
                // Renew and follow leader
                ////////////////////////////////////////////////
                if(leader){
                    creep.say(creep.moveTo(leader));

                    if(creep.pos.isNearTo(Game.spawns[renewSpawn])){
                        Game.spawns[renewSpawn].renewCreep(creep);
                    }
                }else{
                    //clog(renewSpawn)
                    Game.spawns[renewSpawn].pauseSpawningUntil(Game.time+10);
                    if(creep.pos.isNearTo(Game.spawns[renewSpawn])){
                        creep.say('L')
                        creep.move(spawnFacing)
                        Game.spawns[renewSpawn].renewCreep(creep);
                    }else{
                        creep.say('R')
                        creep.moveTo(Game.spawns[renewSpawn])
                    }
                }
                ///////////////////////////////////////////////
                // Are we Renewed? ready to muster?
                ////////////////////////////////////////////////
                if(leader && !leader.spawning && leader.pos.isNearTo(creep) && ( creep.body.length<40 || (leader.ticksToLive>1450 && creep.ticksToLive > 1450) ) ){
                    creep.memory.phase='boosting';
                }
            }
            if(creep.memory.phase==='boosting'){
                
                if(creep.memory.boostPlans){
                    creep.say('boost');
                    creep.runBoostPlan();   
                }else{
                    creep.memory.phase='following';
                }
            }
            

            if(creep.memory.phase==='following'){
                
                if( (creep.hitsMax-creep.hits) > 200 ){
                    
                    creep.heal(creep)
                    
                }else if(leader && leader.hitsMax > leader.hits){
                    
                    creep.heal(leader)
                    creep.rangedHeal(leader)
                    
                }else if( this.healMostHurtSquadMember(creep,allies) !==OK ){
                    
                    // if no squad members need a heal, then preheal leader and patch self
                    if(!leader || creep.hitsMax > creep.hits)
                        creep.heal(creep)
                    else if(leader){
                        creep.heal(leader)
                        creep.rangedHeal(leader)
                    }
                    
                }
                if(leader)creep.moveTo(leader);

                if(leadersTarget && creep.partCount(RANGED_ATTACK)>0){
                    creep.rangedAttack(leadersTarget)
                }
            }
        }
    },
    soloMineSKRoomSource:function(spawnName,cname,mineralTarget, parts = '15m1c10w15a5h1m'){
        if(Memory.invaderSeen===undefined){
            Memory.invaderSeen={};
        }
        // if its been over its predicted life span, then assume its dead
        if(Memory.invaderSeen[mineralTarget.pos.roomName] && Memory.invaderSeen[mineralTarget.pos.roomName]< Game.time) {
            clog("been "+Memory.invaderSeen[mineralTarget.pos.roomName]+" since we saw an invader",mineralTarget.pos.roomName);
            delete Memory.invaderSeen[mineralTarget.pos.roomName];
        }
     
        let maxDistance = 4;
     
        // dont spawn if there are invaders
        if(!Game.creeps[cname] && !Memory.invaderSeen[mineralTarget.pos.roomName]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.dontFlee = false;
            creep.memory.riskyBiscuits = true;
            creep.moveOffRoomEdge();
            
            
            if(creep.pos.roomName===mineralTarget.pos.roomName){
                
                let mineral = gob(mineralTarget.id)
                
                let hostiles = (Game.rooms[creep.pos.roomName])?Game.rooms[creep.pos.roomName].getHostiles():[];
                
                let invaders = hostiles.filter(function(hostile){return  hostile.owner.username=='Invader' });
                
                if(invaders.length>=2){
                    Memory.invaderSeen[mineralTarget.pos.roomName] = Game.time+invaders[0].ticksToLive;
                    creep.say('$h!t',true)
                }
                
                let closest = false;
                let dist = 99999;
                if(hostiles.length>0){
                    
                    for(let fighter of hostiles){
                        let d = creep.pos.getRangeTo(fighter);
                        if(d < dist && d < maxDistance && fighter.owner.username=='Source Keeper'){
                            dist =d;
                            closest = fighter;
                        }
                    }
                }
                
                
                if(closest){
                    creep.rangedAttack(closest);
                    //creep.actOrMoveTo('rangedAttack',closest);
                    creep.actOrMoveTo('attack',closest);
                    if(dist>1){
                        // heal regardless for a preheal
                        creep.heal(creep);
                    }

                }else{
                    creep.actOrMoveTo('dropHarvest',mineral);
                    if(creep.hits<creep.hitsMax){
                        creep.heal(creep);
                    }
                    if(mineral.haveContainer()){
                        
                        if(!mineral.getContainer().isFull()){
                            let droppedE = gob(creep.memory.drop_id);
                            if(!droppedE && Game.time%10==0){
                                droppedE = creep.pos.lookForNearbyResource(RESOURCE_ENERGY);
                                creep.memory.drop_id = droppedE.id;
                            }
                            if(droppedE){
                                creep.say('$$')
                                creep.drop(RESOURCE_ENERGY);
                                creep.pickup(droppedE);
                            }
                        }
                    }
                    
                }
               
            }else{
                creep.moveToPos( rp(mineralTarget.pos.x,mineralTarget.pos.y,mineralTarget.pos.roomName) );
            }
            


        }
    },
    soloMineSKRoomMineral:function(spawnName,cname,mineralTarget, parts = '12m10w4c10r4h'){
        
        let maxDistance = 10;
     
        if(!Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.dontFlee = true;
            creep.memory.riskyBiscuits = true;
            creep.moveOffRoomEdge();
            
            
             
            let keeperLair = mb.getNearestStructure(creep.pos,[STRUCTURE_KEEPER_LAIR],[mineralTarget.pos.roomName]);
            //clog(keeperLair.ticksToSpawn)
            if(keeperLair && creep.ticksToLive < keeperLair.ticksToSpawn){
                //creep.suicide();
            }
            
            if(creep.pos.roomName===mineralTarget.pos.roomName){
                
                let mineral = gob(mineralTarget.id)
                
                let hostiles = (Game.rooms[creep.pos.roomName])?Game.rooms[creep.pos.roomName].getHostiles():[];
                let closest = false;
                let dist = 99999;
                if(hostiles.length>0){
                    
                    for(let fighter of hostiles){
                        let d = creep.pos.getRangeTo(fighter);
                        if(d < dist && d < maxDistance && fighter.owner.username!=='Invader'){
                            dist =d;
                            closest = fighter;
                        }
                    }
                }
                let res = creep.actOrMoveTo('harvest',mineral);
                if(closest){
                    creep.rangedAttack(closest);
                    creep.attack(closest);
                    if(creep.hits<creep.hitsMax && dist>1){
                        creep.heal(creep);
                    }
                }else{
                    if(creep.hits<creep.hitsMax && (res==ERR_TIRED || res==ERR_NO_BODYPART)){
                        creep.heal(creep);
                    }
                }
              
               
            }else{
                creep.moveToPos( rp(mineralTarget.pos.x,mineralTarget.pos.y,mineralTarget.pos.roomName) );
            }
            


        }
    },
    
    constantGuardRoom:function(spawnName,cname,roomName,parts, waitingSpot={x:25,y:25},allyName=false,killCivilians=false, maxDistance=75 , roomTraversal=[]){
        if(!Game.creeps[cname]){

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }
        
        let hostiles = (Game.rooms[roomName])?Game.rooms[roomName].getHostiles():[];
        let fighters = killCivilians?hostiles: hostiles.filter(function(hostile){return ( hostile.partCount(ATTACK)>0 || hostile.partCount(RANGED_ATTACK)>0 || hostile.partCount(HEAL)>0 || hostile.partCount(CLAIM)>0 ) });
        let myCreeps = (Game.rooms[roomName])?Game.rooms[roomName].find(FIND_MY_CREEPS):[];

        if(fighters.length>=3 && Game.rooms[roomName].controller){
            Game.rooms[roomName].controller.activateSafeMode();
        }
        
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.moveOffRoomEdge();
           // creep.heal(creep)
            if(creep.pos.roomName===roomName){
                
                let closest = false;
                let healTarget=false;
                    for(let mine of myCreeps){
                        if(mine.hits<mine.hitsMax){
                            healTarget = mine;break;
                        }
                    }
                    
                    
                        if(hostiles.length==0 && healTarget){
                            creep.rangedHeal(healTarget);
                            creep.actOrMoveTo("heal",healTarget);
                            creep.say(healTarget.name)
                        }
                let dist = 99999;
                if(fighters.length>0){
                    
                    
                    for(let fighter of fighters){
                        let d = creep.pos.getRangeTo(fighter);
                        if(d < dist && d < maxDistance && fighter.owner.username!=='GT500'){
                            dist =d;
                            closest = fighter;
                        }
                        
                    }
                    
                    if(closest){
                        creep.rangedAttack(closest)
                        creep.actOrMoveTo("attack",closest);
                        
                        if(creep.hits<creep.hitsMax&&dist>1)creep.heal(creep);
                    }else{
                        
                        if(creep.hits<creep.hitsMax)creep.heal(creep);
                        creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
                        
                    }
                }else{
                    
                    if(!healTarget)creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
                    else creep.actOrMoveTo("heal",healTarget);
                }
               
            }else{
                if(roomTraversal.length>0){
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{
                    creep.moveOffRoomEdge();
                    creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
                }
            }
            


        }
    },
    defendRoom: function(spawnName,cname,roomName, skRoom=false){
        
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
        let boostedrangeTotalCount = 0;
        let boostedMeleeTotalCount = 0;
        let boostedHealTotalCount = 0;
        
        let hostiles = Game.rooms[roomName]?Game.rooms[roomName].getHostiles():[];
        for(var ref in hostiles){
            
             if(hostiles[ref].owner.username==='Source Keeper'){
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
        if( (target || Memory.invaderSeen[roomName]) && !Game.creeps[cname] && hostiles.length<3){
            let nastyParts = meleeTotalCount+rangeTotalCount+healTotalCount;
            if(nastyParts==0){
                nastyParts = 5;// we lost vision before we could spawn a defender
            }
            let baseBody = '4t4m1a1m +' + Math.ceil(nastyParts/2)+'*1r1m1a1m';
            
            
            if(hostiles.length==2 && meleeTotalCount==0 && rangeTotalCount==6 && skRoom){
                // probs a boosted duo
                baseBody = '1t11m10r10h1a';
            }
            
            
            if(target && target.body.length>25 || skRoom){
                baseBody='2t2m'+baseBody+'+1h1m';
            }
           // clog(baseBody,cname+" plan:")
            clog(Game.spawns[spawnName].spawnCreepX(baseBody,cname,{},true),cname+':'+baseBody);
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
                    creep.suicide();
                }
            }else{
                creep.moveOffRoomEdge();
                creep.moveTo(new RoomPosition(25,25,roomName))
            }

            

        }
        return Memory.invaderSeen[roomName];
        
    },
    killCreepsBreakTarget:function(spawnName,cname,roomName,parts,target_ids,roomTraversal=[], killCreeps=true,waitingSpot={x:25,y:25},dontFlee=false,kamakaziPos=false,publicMsg=false){
        if(!Game.creeps[cname]){

            clog(Game.spawns[spawnName].spawnCreepX(parts,cname),cname);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(creep.ticksToLive<50 && kamakaziPos){creep.moveToPos(kamakaziPos);return;}
            
            creep.memory.avoidSkeepers=true;
            if(publicMsg)creep.say(publicMsg,true)
            //creep.heal(creep)
            if(creep.pos.roomName===roomName){
                
                if(!mb.hasRoom(roomName))mb.scanRoom(roomName);
                
                
                
                if(dontFlee){
                    creep.memory.riskyBiscuits=true;
                    creep.memory.dontFlee=true;
                    
                }
                
                creep.moveOffRoomEdge();
                
                var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
                let myCreeps = (Game.rooms[roomName])?Game.rooms[roomName].find(FIND_MY_CREEPS):[];
                let healTarget=false;
                    for(let mine of myCreeps){
                        if(mine.hits<mine.hitsMax){
                            healTarget = mine;break;
                        }
                    }
                
    	        let distC = 99999;
    	        let distF=999999;
    	        let closestCivilian = false;
    	        let closestFighter = false;
    	        let shootTarget = false;
    	        let creepsIn3 = 0;
    	        if(killCreeps)
    	        for(var ref in hostiles){
    	            let range = creep.pos.getRangeTo(hostiles[ref]);
    	            
    	            if(range<=3){
    	                creepsIn3++;
    	            }
    	            if(
    	                hostiles[ref].owner.username=='Source Keeper' || 
    	                hostiles[ref].owner.username=='GT500'|| 
    	                 hostiles[ref].owner.username=='Trepidimous' ||
    	                hostiles[ref].owner.username=='joethebarber')continue;
    	            if(hostiles[ref].partCount(RANGED_ATTACK)>0 || hostiles[ref].partCount(ATTACK)>0|| hostiles[ref].partCount(HEAL)>0){
    	                if(range<distF){
        	                distF = range;
        	                closestFighter = hostiles[ref];
        	            }
    	            }
    	            
    	            if(hostiles[ref].partCount(WORK)>0 || hostiles[ref].partCount(CLAIM)>0 /*|| hostiles[ref].partCount(CARRY)>0|| hostiles[ref].partCount(MOVE)>0*/){
    	               if(range<distC){
        	                distC = range;
        	                closestCivilian = hostiles[ref];
        	            } 
    	            }
    	            
    	        }
    	      
    	        let target = false;
    	       
    	        if(closestFighter){
                    
                    creep.actOrMoveTo('attack',closestFighter);
    	            if( creepsIn3>1){
    	                creep.rangedMassAttack();
    	            }else{
    	                 creep.rangedAttack(closestFighter);
    	            }
    	        }
    	            
    	        else if(closestCivilian){    
    	            creep.actOrMoveTo('attack',closestCivilian);
    	            if( creepsIn3>1){
    	                creep.rangedMassAttack();
    	            }else{
    	                 creep.rangedAttack(closestFighter);
    	            }
            
    	        }else{
    	            
    	            for(let id of target_ids){
    	                target =Game.getObjectById(id);
    	                if(target)break;
    	            }
    	            
    	            if(!target){
    	                target = mb.getNearestStructure(creep.pos,[STRUCTURE_CONTAINER,STRUCTURE_ROAD,STRUCTURE_RAMPART],[roomName]);
    	            }
    	            creep.say(target.id)
    	           if(target){
                    let res = creep.actOrMoveTo('attack',target);
    	            creep.rangedAttack(target);
    	           }else{
    	               creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
    	           }

    	        }
    	        
    	        if( distC>1 && distF>1   ){
                    if(creep.hits< creep.hitsMax)
    	                creep.heal(creep);
    	           else if(healTarget){
    	                creep.heal(healTarget);
    	                creep.rangedHeal(healTarget);
    	           }else if(!target){
    	               creep.heal(creep)
    	           }
    	        }
    	        
                
            }else{
                creep.heal(creep)
                if(roomTraversal.length>0){
                    if(creep.pos.roomName==='W15N24' || creep.pos.roomName==='W15N25' )creep.memory.swampCost = 3;
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{
                    creep.moveOffRoomEdge();
                    creep.moveToPos(new RoomPosition(25,25,roomName))
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

    
    healMostHurtSquadMember: function(healer,teamNames,preHealName){
        
        let healTarget = Game.creeps[preHealName];
        let lowestHP = healTarget? (healTarget.hitsMax-healTarget.hits) :0;
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
                return healer.heal(healTarget)
            }else{
                //creep.say("RH:"+creep.rangedHeal(healTarget) );
                return healer.rangedHeal(healTarget)
            }
        }
        return false;
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
    
    drainRoomHopInOut:function(spawnName,cname, retreatRoomPos, targetRoomPos, bodyPlan){
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX( bodyPlan ,cname, {memory:{arrived:false}} ),spawnName+':'+cname);
        }
                
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            creep.heal(creep);
            if(creep.hits<creep.hitsMax){
                
                creep.moveOffRoomEdge();
                creep.moveToPos(retreatRoomPos)
            }else{
                creep.moveOffRoomEdge();
                creep.moveToPos(targetRoomPos)
            }
            //this.roomBounceDrain(creep,retreatRoomPos)
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
        //f(HPLoss>0){
            creep.heal(creep);
        //}
        
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
       // if(creep.name=='Barry0')clog(roomNames,creep.name)
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
        //if(creep.name=='Thor-guard')console.log(creep.pos)
        //if(creep.name=='Thor-guard')console.log(roomNames)
       //if(creep.name=='Thor-guard')console.log(roomNames[next])
       
        if(roomNames[next]){
            let res = creep.moveOffRoomEdge();
            //if(creep.name=='thor-0')clog(res,creep.name+'fff')
            if(res!==OK)
                res = creep.moveToPos(new RoomPosition(25,25,roomNames[next]));
            
             
            //if(creep.name=='thor-0')clog(res,creep.name)
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
                clog(target.id,creep.name)
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
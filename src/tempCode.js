
let upgraderRole=require('role.upgrader');
const roomNode = require('class.roomNode');
let harvesterRole = require('role.harvester');
/**
 * const ERR_NO_PATH @screeps/common/lib/constants
 * **/
module.exports = {

// attack on Game.time 1075909. invader quad
    // safemode, retreat, if breaks hceal()
    // keep duo together, leader running off
    run:function(){
        //return;
        if( util.getServerName()==='shard3'){
            this.shard3TempCode();
        }else if( util.getServerName()==='private'){
            this.shardPrivateTempCode();
        }else if( util.getServerName()==='swc') {
            this.shardSWCTempCode();
        }else if( util.getServerName()==='shardSeason'){
                this.shardSeasonTempCode();
        }else{
            this.shardPrivateTempCode();
        }

        logs.startCPUTracker('manageInterRoomTrading2');
        if(Game.time%10===0)this.manageInterRoomTrading2()
        logs.stopCPUTracker('manageInterRoomTrading2',false);

        return;
    },
    shardSeasonTempCode:function(){
        let thing = this;


        try{
            //if(Game.gcl.level===8)
            //this.setupNode('Alpha','Gamma')
           // if(season6.isRoomFreezingSoon(nodes.d.coreRoomName))
               // this.setupNode('Theta','Alpha',{workerBody:'15*1w1c1m',workerCount:3,defend:true})

           // if(season6.isRoomFreezingSoon(nodes.g.coreRoomName))
            //this.startupRoomNoVision('Theta','E15S32',{workerBody:'15*1w1c1m',workerCount:3,defend:false})

            this.startupNewRoomWithVision('E18S14', 'Kappa',
                {workerCount:3,workerBody:'8*1w1c1m',harvestSources:false,
                    swampy:false,defend:false})

            this.startupNewRoomWithVision('W13S23', 'Zeta',
                {workerCount:2,workerBody:'15*1w1c1m',harvestSources:true,
                    swampy:false,defend:false})

           // this.startupRoomNoVision('Delta', 'E8S15',{workerBody:'8*1w1c1m',workerCount:2,harvesterBody:'6w1c6m',haulToController:false,defend:true})


            //this.scoutPotentialBase('Theta','E15S32',true)
            //this.reserverRoom('Gamma','buff-man',Game.rooms['W36S21'].controller,'4cl4m',true,true)
        }catch (e) {
            console.log("Set-up error",e)
        }

        if(nodes.z.storage().storingAtLeast(10000,RESOURCE_UTRIUM_LEMERGITE)){
            nodes.z.makeResource= RESOURCE_ZYNTHIUM_KEANITE;
            nodes.z.labComplex.make(RESOURCE_ZYNTHIUM_KEANITE);
        }
        if(nodes.z.storage().storingAtLeast(10000,RESOURCE_ZYNTHIUM_KEANITE)){
            nodes.z.makeResource= RESOURCE_CATALYZED_GHODIUM_ALKALIDE;
            nodes.z.labComplex.make(RESOURCE_CATALYZED_GHODIUM_ALKALIDE);
        }

        //this.keepRoomsClearOfInvaderCores('Zeta',['W7S24','W7S25'])
        /*try{
            if(Game.cpu.bucket>6000)
            this.harvestAndCollectMineralNoContainer('Zeta',
                '65a7178f2b6fcef1eea24b5d',rp(33,8,'W14S24'),nodes.z.storage().id,
                RESOURCE_KEANIUM,'5*2c1m','20w10c10m','-K',1,rp(33,3,'W14S24'))

        }catch (e) {
            console.log(e.stack)
        }*/


        /*this.attackMission2('Epsilon',['W8S26','W8S25','W9S25','W7S25'],'1a1m','Ex1',{
            spawnPriority:true,
            fightyBoi2:true,
            attackStructures:false,
        },100,false)*/

        this.attackMission('Theta','E15S31','20m10r5h','T1-guard',{
            spawnPriority:true,
            waitSpot:rp(21,39,'E15S31'),
            attackStructures:false,
            keepSpawning:true
        },750,true)


/*
        try {
            this.scheduledAttack('Theta', 'E12S32', 'Tx1', rp(19, 3, 'E12S32'), 1102454, {
                duoCount: 2,
                dontMuster:true,
                routeRequired:true,
                musterSpot: rp(13, 39, 'E12S31'),
                leaderBody: '20*1s1r+5r25m',
                //  routeRequired:false,// dont require route
                //leaderBody:'2m30w6r12m',
                //leaderBody:'2m31w5r12m',
                //leaderBoostPlans:[{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'65c3b7cffb452d88c9e7c723'},{resource_type:RESOURCE_ZYNTHIUM_ACID,lab_id:'65c38d8e1dd34b549866ecec'}],
                //leaderBoostPlans:[{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'65a02aba2246ca0067c44607'}],
                healerBody: '2m18h18m', // RCL7
                //healerBody: '2m36h12m', // RCL8
                //healerBody:'7t8m25h1m', / RCL7 with gd boosts
                //healerBoostPlans:[{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'65c3b7cffb452d88c9e7c723'},{resource_type:RESOURCE_LEMERGIUM_ALKALIDE,lab_id:'65c3a45473ade15e92a4288d'}],
                renewSpawn: 'Theta', spawnFacing: TOP

            })
        }catch (e) {
            console.log("ERROR:scheduledAttack",e.stack)
        }
*/

        //this.selfBoostHaulController(nodes.z,rp(34,8,'W13S24'))
       // this.selfBoostHaulController(nodes.g,rp(8,13,nodes.g.coreRoomName),'30c15m',)
        this.selfBoostHaulController(nodes.t,rp(16,20,nodes.t.coreRoomName),'30c15m')
        this.selfBoostHaulController(nodes.t,rp(16,20,nodes.t.coreRoomName),'30c15m',false,'2')
        this.selfBoostHaulController(nodes.b,rp(9,34,nodes.b.coreRoomName),'20c10m')
        this.selfBoostHaulController(nodes.i,rp(16,18,nodes.i.coreRoomName),'30c15m')
        this.selfBoostHaulController(nodes.i,rp(16,18,nodes.i.coreRoomName),'30c15m',false,'2')
        this.selfBoostHaulController(nodes.i,rp(16,18,nodes.i.coreRoomName),'30c15m',false,'3')
        //if(!season6.isRoomFroze(nodes.a.coreRoomName) && Game.time%500===0)nodes.a.terminal().send(RESOURCE_ENERGY,30000,nodes.g.coreRoomName)

        if(Game.time%250===0 && nodes.i.terminal().haveSpaceFor(30000))
            nodes.e.terminal().send(RESOURCE_ENERGY,30000,nodes.i.coreRoomName)
        else if(Game.time%250===0 && nodes.b.terminal().haveSpaceFor(30000))
            nodes.e.terminal().send(RESOURCE_ENERGY,30000,nodes.b.coreRoomName)

        if(Game.time%250===0)
            nodes.z.terminal().send(RESOURCE_ENERGY,30000,nodes.i.coreRoomName)

        if(Game.time%250===0)
            nodes.t.terminal().send(RESOURCE_ENERGY,30000,nodes.b.coreRoomName)

        // this function broke last freeze. needs freeze protection
       // this.parentBoostHaulController('Alpha','Delta',rp(40,36,'W25S22'),2,'15*2c1m')
        if( !season6.isRoomFroze(nodes.g.coreRoomName)){
            let feeders = [nodes.z,nodes.e,nodes.t];
            if(!season6.isRoomFroze(nodes.a.coreRoomName))feeders.push(nodes.a)
            this.season6_FunnelUpgradeRoomBeforeFreeze('Gamma','W19S24',rp(26,45,'W19S24'),feeders,[],6,10)

        }


        if(false) {
            let targetNode = nodes.g;
            let supportNode = nodes.a;
            let prefix = supportNode.name.charAt(0)+'ux';
            let haulContainer = gob('65dfb91d63669e58d457eb0e')
            let drawFrom = targetNode.storage().storingAtLeast(targetNode.surplusRequired)?targetNode.storage():targetNode.terminal();

            let keepSpawning = Game.cpu.bucket>6000 && targetNode.controller().level<8 && drawFrom.storingAtLeast(20000);
            keepSpawning = false;
            let haulerWaitSpot = rp(8, 12, targetNode.coreRoomName);
            let spots = [rp(9,11,targetNode.coreRoomName),rp(9,10,targetNode.coreRoomName),rp(10,10,targetNode.coreRoomName),rp(10,11,targetNode.coreRoomName)];
            for(let s in spots){
                this.rotateCreep(prefix+s+'-', function(activeCreepName){
                        thing.withdrawThenUpgrade(supportNode.name,activeCreepName,'20w4c20m',haulContainer.id,targetNode.controller().id,false,spots[s],keepSpawning)
                },500)
            }

            this.rotateCreep(prefix+'-h-', function(activeCreepName){
                thing.haulResources(targetNode.name, activeCreepName, '20c10m',drawFrom, haulContainer, [RESOURCE_ENERGY], [], keepSpawning, 50, 1, haulerWaitSpot)
            },200)

        }

       // nodes.a.manual_addRooms=['W23S22','W23S21','W22S24'];
       // nodes.b.manual_addRooms=['W22S15','W23S15'];
        //nodes.g.manual_ignoreRooms=['W19S27'];
        //nodes.g.manual_addRooms=['W18S27','W19S23'];
        nodes.e.manual_addRooms=['W6S24','W6S23'];
        nodes.a.manual_ignoreRooms=['E14S31'];
        nodes.z.manual_ignoreRooms=['W12S24'];
        nodes.t.manual_addRooms=['E8S28']
        nodes.i.manual_addRooms=['E1S19','E4S19','E1S17']

        this.maintainRoadsInRoom('Zeta','swampy-joe',['W12S24','W12S25'],'1w3c8m')

        for(let n in nodes){
            logs.startCPUTracker('fullAutomateRoomNode-'+n);
            if(n==='t' && Game.cpu.bucket<4000)continue;
            if(n==='k' && Game.cpu.bucket<5000)continue;
            if(nodes[n].online)this.fullAutomateRoomNode(nodes[n]);
            logs.stopCPUTracker('fullAutomateRoomNode-'+n,false);

            let homeRoom = nodes.t.coreRoomName
            let term = nodes[n].terminal();
            if(season6.isRoomFreezingSoon(nodes[n].coreRoomName)) {
                nodes[n].surplusRequired = 2000;
                nodes[n].terminalEnergyCap = 200000;
                nodes[n].buildFast = false;

                if(term && !term.isEmpty())term.send(RESOURCE_ENERGY,1000,homeRoom)

            }
            if(season6.isFreezingToday(nodes[n].coreRoomName)){

                if(term){
                    nodes[n].imports = [];
                    for(let conf of nodes[n].exports){
                        nodes[n].exports.exportOver =0;// flush it all out

                        if(term.storingAtLeast(1,conf.resource_type)){
                            if(term.send(conf.resource_type,term.storedAmount(conf.resource_type),homeRoom)===OK){
                                break;
                            }
                        }
                    }

                }
            }
            if(nodes[n].controller().level===8) nodes[n].upgradeRate=RATE_VERY_SLOW;

        }



        //this.harvestAndCollectMineralFromSKRoom('Alpha','W24S24',  3,3,25000,true,false,350)
        //this.harvestAndCollectMineralFromSKRoom('Beta','W24S16',  3,3,25000,true,false,350)
        //this.harvestAndCollectMineralFromSKRoom('Gamma','W34S24',  2,3,25000,true,false,350,[rp(8,4,'W34S24'),rp(8,5,'W34S24')])

    },
    shardPrivateTempCode:function(){
        
        this.setupNode('Alpha','Beta')


        nodes.g.manual_addRooms = [];
        nodes.g.manual_addRooms.push('W5N5')

        for(let n in nodes){
            if(nodes[n].online)this.fullAutomateRoomNode(nodes[n]);
        }

    },
    shardSWCTempCode:function(){
        let thing = this;

        for(let n in nodes){
            if(nodes[n].online)this.fullAutomateRoomNode(nodes[n]);
        }
        nodes.a.manual_ignoreRooms = [];
        nodes.a.manual_addRooms = [];
        nodes.a.manual_addRooms.push('E6N5')
        nodes.a.manual_ignoreRooms.push('E7N3')

        if(nodes.g.manual_addRooms.includes('E4N5')){
            this.rotateCreep('E4N5-sk-guard-', function(activeCreepName){
                thing.constantGuardSKRoom('Gamma',activeCreepName,'E4N5', ['658f1c709ddf0f005f9abdc9','658f1c709ddf0f005f9abdc1','658f1c709ddf0f005f9abdc2'],'20m20a5h5m')
            },250)
        }

        this.haulResources('Beta','Bt1','3c3m',{id:'65941912da3a1700880722ab',pos:{x:44,y:44,roomName:'E7N3'}},gob('6590f66c28e72200640769e0'),[RESOURCE_ENERGY],[],(Game.cpu.bucket>1000),200)
/*
        this.harassRemote('Gamma','E25N30','25m20r5h',{
            reckless:true,
            spawnPriority:true,

            keepSpawning:false,
            waitSpot:{x:30,y:24},
            retreatSpot:rp(25,25,'E25N30')
        },350)*/

        this.scheduledAttack('Delta','E24N21','D1-',rp(27,35,'E24N21'),1,{
            duoCount:2,
            musterSpot:rp(25,10,'E24N20'),
            leaderBody:'2m31w5r12m',
            leaderBoostPlans:[{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'65a02aba2246ca0067c44607'},{resource_type:RESOURCE_ZYNTHIUM_ACID,lab_id:'65a0154a202246003071a027'}],
            healerBody:'7t8m20h1m',
            healerBoostPlans:[{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'65a02aba2246ca0067c44607'},{resource_type:RESOURCE_LEMERGIUM_ALKALIDE,lab_id:'659ffbe1e7138d002dfb3dba'}],
            renewSpawn:'Delta',spawnFacing:TOP

        })


        this.drainRoomBounce('Beta','b-dr-0', rp(1,2,'E30N24'), '3*1t1m + 6*1h1m',mb.getMapRoute('E6N3','E30N24'),keepS)

        //

    },

    shardBATempCode:function(){

        for(let n in nodes){
            if(nodes[n].online)this.fullAutomateRoomNode(nodes[n]);
        }

    },
    shard3TempCode:function(){
        //return;
        let thing=this;
        // this.haulResources('Theta','taxman1','20*1c1m',{id:'60c90cef9891318f82fa19dd',pos:{x:25,y:20,roomName:'W46N49'}},gob('64e672e8ff9345439bb731e3'),[RESOURCE_ENERGY],['W45N51','W46N51','W46N50','W46N49'],(Game.cpu.bucket>4000),250);
        //if(Game.creeps['taxman2'])this.haulResources('Theta','taxman2','20*1c1m',{id:'60c90cef9891318f82fa19dd',pos:{x:25,y:20,roomName:'W46N49'}},gob('64c8f4af8864060224b86e60'),[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),250);

        //gob('64f39b9f9fa508dbd35620b9').observeRoom('W45N50')

        //this.startupRoomWithVision('Zeta-2','W43N51', {workerCount:0,workerBody:'10w10c10m',defend:true,defenderSpot:{x:13,y:16}})


        if(Game.creeps['Af0']|| (gob('64d258b7ac37e86f64210866').haveSpaceFor(100000) && Game.cpu.bucket>6000))
            this.farmStructureThenTransfer('Alpha','Af0','20w1c10m',['62abbe57340721bd4f261bd9','62aa95074923f007cf85894c','62aa950aff3a5e3d1e630975','62aa951a55ae89e3fa8a5ae1'],'6530f95d0f89149d14e6b117',rp(23,1,'W42N53'))
        if(Game.creeps['Af1']|| (gob('64d258b7ac37e86f64210866').haveSpaceFor(100000) && Game.cpu.bucket>6000))
            this.farmStructureThenTransfer('Alpha','Af1','20w1c10m',['62b6b38e9fd416e67531043c','62b6b38b567017e1cd9fab73','62a825e09443b3154bc6e749'],'654520af95252fcca8bf96a6',rp(28,46,'W42N53'))
        if(Game.creeps['Af2']|| (gob('64d258b7ac37e86f64210866').haveSpaceFor(100000) && Game.cpu.bucket>6000))
            this.farmStructureThenTransfer('Alpha','Af2','20w1c10m',['62b6b38b567017e1cd9fab73','62a825f46c6a81bc80fb527c','62a825fa8e16ad62e9a64d0e'],'654520af95252fcca8bf96a6',rp(30,46,'W42N53'))

        //this.harvestAndCollectMineralNoContainer('Theta-3','5bbcb16540062e4259e92e94',rp(41,1,'W45N51'),'64e672e8ff9345439bb731e3',RESOURCE_UTRIUM,'5m5c','30W5c15m','-U',2)


        if(Game.creeps['Mx1']|| (Game.cpu.bucket>5000 && gob('5bbcaac09099fc012e63221b').ticksToDowngrade<10000) )this.withdrawThenUpgrade('Maintainer1','Mx1','1w1c','64d4a6df69e9867caf3a3604','5bbcaac09099fc012e63221b')
        if(Game.creeps['Mx2']|| (Game.cpu.bucket>5000 && gob('5bbcaab49099fc012e63208a').ticksToDowngrade<10000) )this.withdrawThenUpgrade('Maintainer2','Mx2','1w1c','64eb56bf2bd85d7bf7b94148','5bbcaab49099fc012e63208a')


        //this.haulResources('Alpha','Atx1','20c1m',gob('62dcd8f53b550551e96c02fe'),gob('6411a983df83b07a4d870320'),[RESOURCE_OXYGEN,RESOURCE_GHODIUM_OXIDE],[],(Game.cpu.bucket>4000),200)




        let hostileIds = Game.rooms['W43N51'].getNoneAllyCreeps();
        if(hostileIds.length>0 && gob('651d16f663f96bf75536f5dd'))gob('651d16f663f96bf75536f5dd').attack(gob(hostileIds[0]))

        let W41N53_to_W38N51 = ['W41N53','W40N53','W40N52','W40N51','W39N51','W38N51']
        let W41N54_to_W39N53 = ['W41N54','W40N54','W40N55','W39N55','W38N55','W38N54','W39N54','W39N53']
        let W41N53_to_W37N51 = ['W41N53','W40N53','W40N52','W40N51','W39N51'
            ,'W39N50','W38N50','W37N50','W37N51']
        let kiterBody = "2a2m+10*1r1m+2h2m";
        let fighterBody= "2t2m+10*1a1m+2h2m";
        if(Game.creeps['harrass-1'])
            // if(!Game.creeps['harrass-1'].memory.stepped){
            this.harrassRemote('Beta-3','harrass-1','W39N51',[],rp(46,15,'W40N51'),fighterBody,{x:38,y:9})
        //    Game.creeps['harrass-1'].memory.stepped = false;
        // }
        //this.harrassRemote('Beta-3','harrass-2','W38N51',W41N53_to_W38N51,rp(46,15,'W40N51'),fighterBody)
        Game.rooms['W41N54']._debugSetEnemies('enemyPlayerFighters',['bill'])
        //if(util.debug) this.harrassRemote('Epsilon-2','bob','W41N54',[],rp(15,18,'W42N54'),'4m4r',{x:15,y:19},false)
        Game.rooms['W41N54']._debugSetEnemies('enemyPlayerFighters',['bob'])
        //if(util.debug) this.harrassRemote('Epsilon-3','bill','W41N54',[],rp(15,18,'W41N53'),'3t2a2r7m',{x:15,y:23},false)
        // if(util.debug)this.killCreepsBreakTarget('Epsilon-3','bill','3t2a2r7m','W41N54',[],[], 75,{x:25,y:25},true)


        this.scheduledAttack('Beta','W39N52','B1',rp(31,47,'W39N52'),1,{
            duoCount:1,
            leaderBody:'20w5r25m',
            //leaderBoostPlans:[{resource_type:RESOURCE_GHODIUM_ALKALIDE,lab_id:'659adbb3e6a924003533f857'},{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'659aefc97b77b600382c2006'},{resource_type:RESOURCE_ZYNTHIUM_ACID,lab_id:'659ad17d715ca500374eb2f5'}],
            healerBody:'5r20h25mm',
            //healerBoostPlans:[{resource_type:RESOURCE_GHODIUM_ALKALIDE,lab_id:'659adbb3e6a924003533f857'},{resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,lab_id:'659aefc97b77b600382c2006'},{resource_type:RESOURCE_LEMERGIUM_ALKALIDE,lab_id:'659ac78b72240e002fb4cc67'}],
            //renewSpawn:'Gamma-2',spawnFacing:BOTTOM

        })


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        this.runFactory('Alpha',RESOURCE_BATTERY)
        this.runFactory('Beta',RESOURCE_BATTERY)
        this.runFactory('Epsilon',RESOURCE_BATTERY)

        this.runFactory('Zeta',RESOURCE_BATTERY)
        this.runFactory('Kappa',RESOURCE_BATTERY)
        this.runFactory('Lambda',RESOURCE_BATTERY)
        this.runFactory('Mu',RESOURCE_BATTERY)
        this.runFactory('Delta',RESOURCE_BATTERY)


    },
    keepRoomsClearOfInvaderCores:function(nodeName,roomNames){

        for(let name of roomNames){
            let scoutName = name+'-sc';
            if(!Game.rooms[name] || Game.creeps[scoutName])this.scoutRoom(nodeName,scoutName,name)
            if(Game.time%500===0)mb.scanRoom(name);
            this.keepRoomClearOfLv0InvaderCores(nodeName,'ic-killer-'+name,'10a10m',name)
        }

    },
    /**
     *
     * @param feederName - string  - name of room that is feeding this room. Note this Alpha/Beta etc.
     * @param roomName - string  - room to be boosted by feeder room
     * @param anchor - RoomPos - where to pivot controller block standing spots. Also where towers are placed
     * @param supportNodes - array - room node objects that are contributing energy to boost. These will terminal.send() energy to feeder/roomName at RCL6
     * @param boostPlans - array = an array of boost plans for upgraders
     * @param upgrCount - int - how many upgraders to run. default 6
     * @param haulerCount - int - how many haulers to run pre RCL6. default 12
     * @returns {number|number|*}
     */
    season6_FunnelUpgradeRoomBeforeFreeze:function(feederName,roomName,anchor,supportNodes=[],boostPlans=[],upgrCount=5,haulerCount=12){

        try {
            let targetRoom = Game.rooms[roomName];
            let prefix = feederName.charAt(0);
            let feederNode = nodes[ prefix.toLowerCase() ]


            this.maintainRoadsInRoom(feederName, roomName + '-w0', roomName, '5w5c5m');

            if (!targetRoom || (targetRoom && !targetRoom.controller.owner)) {
                // return so we dont start spawning the crew before claim loads un
                let c = targetRoom?targetRoom.controller:{id:'no',pos:{x:25,y:25,roomName:roomName}}
                return this.claimRoom(feederName, roomName + 'clx',c ,'1cl1m' , true,true)
            }
            if(Game.creeps[roomName + 'clx'])Game.creeps[roomName + 'clx'].suicide();

            for (let src of mb.getAllSourcesForRoom(roomName)) {
                let targetStore = targetRoom.controller.getContainer();
                if(!targetStore || (targetStore &&  targetStore.isFull())){
                    targetStore = {id:'drop',pos:targetRoom.controller.getStandingSpot()}
                }
                let drawFrom = src.getContainer();
                if(drawFrom){
                    this.haulResources(feederName, prefix + 'tx' + src.id,'8*2c1m',drawFrom,targetStore,[RESOURCE_ENERGY],[],targetRoom.controller.level<8, 50,1,anchor)
                }
                this.harvestPoint(feederName, roomName + 'h' + src.id, '10w1c5m', src);
            }


            if (!targetRoom.controller.getStandingSpot()) {
                targetRoom.controller.setControllerStandingSpots(anchor);
            }

            if(targetRoom.getDangerousCreeps().length>0 && !targetRoom.controller.safeMode){
                targetRoom.controller.activateSafeMode();
            }
            if(targetRoom.controller.safeModeCooldown && !targetRoom.controller.safeMode){
                let thing=this;
                this.rotateCreep('def-'+targetRoom+'-', function(activeCreepName){

                    thing.fightyBoi(feederNode.name,activeCreepName,'20a4r25m1h',targetRoom.name,[],{
                        spawnPriority:true,
                        reckless:true,
                        attackStructures:false,

                    })
                },250);
            }

           // if(targetRoom.storage)feederNode.funnelRoomName = targetRoom.name;

            // if we now have a terminal in boost room, then feeder can send too and void hauling
            if(targetRoom.terminal )supportNodes.push(feederNode)

            if(supportNodes.length>0){

                for(let node of supportNodes){
                    if(Game.time%50===0 && node.terminal()){
                        let res = -404;
                        if(targetRoom.terminal && targetRoom.terminal.storingLessThan(20000)){
                            res = node.terminal().send(RESOURCE_ENERGY,20000,targetRoom.name)
                            console.log(node.name, " sending resources to boost room ",targetRoom.name,"res:",res)

                        }else if(feederNode.terminal() && feederNode.terminal().storingLessThan(40000)){
                            res = node.terminal().send(RESOURCE_ENERGY,20000,feederNode.coreRoomName)
                            console.log(node.name, " sending resources to boost room ",feederNode.coreRoomName,"res:",res)
                        }

                    }
                }
            }


            let targetStore = targetRoom.controller.getContainer();
            let replacingContainer = false;
            if (!targetStore) {
                let site = targetRoom.controller.getStandingSpot().lookForConstruction();

                if(targetRoom.controller.level< 4) {

                    let storage = targetRoom.controller.getStandingSpot().lookForStructure(STRUCTURE_CONTAINER)
                    if(storage)targetRoom.controller.setContainer(storage)
                    else mb.addConstruction(targetRoom.controller.getStandingSpot(), STRUCTURE_CONTAINER);

                }else if(targetRoom.controller.level=== 4){
                    if(!site){
                        replacingContainer = true;// we'll use this to shift upgraders out of the way

                        let storage = targetRoom.controller.getStandingSpot().lookForStructure(STRUCTURE_STORAGE)
                        if(storage)targetRoom.controller.setContainer(storage)
                        else mb.addConstruction(targetRoom.controller.getStandingSpot(), STRUCTURE_STORAGE);
                    }
                }else if(targetRoom.controller.level=== 6){
                    if(!site){
                        replacingContainer = true;// we'll use this to shift upgraders out of the way

                        let storage = targetRoom.controller.getStandingSpot().lookForStructure(STRUCTURE_TERMINAL)
                        if(storage)targetRoom.controller.setContainer(storage)
                        else mb.addConstruction(targetRoom.controller.getStandingSpot(), STRUCTURE_TERMINAL);
                    }
                }

            }
            if(targetRoom.controller.level===4 && !targetRoom.storage){
                let c = targetRoom.controller.getStandingSpot().lookForStructure(STRUCTURE_CONTAINER);
                if(c)c.destroy();
            }
            if(targetRoom.controller.level===6 && !targetRoom.terminal){
                let c = targetRoom.controller.getStandingSpot().lookForStructure(STRUCTURE_STORAGE);
                if(c)c.destroy();
            }

            let upgradersAlive = 0;
            if (targetRoom && targetRoom.controller.owner && targetRoom.controller.owner.username === 'MadDokMike') {

                //let upgrCount = 6;

                for (let i = 0; i < upgrCount; i++) {
                    let cname = prefix + 'ux' + i;
                    if (!Game.creeps[cname] && targetRoom.controller.level<8) {
                        let mem= {};
                        if(boostPlans.length>0){
                            mem.boostPlans = boostPlans;
                        }
                        this.queueSpawn(feederName, cname, '30w3c15m', {memory:mem}, true, true);
                    }

                    if(replacingContainer){
                        // move upgraders out of way, to place storage
                        let creep = targetRoom.controller.getStandingSpot().lookForCreep();
                        if(creep)creep.moveToPos(anchor)
                    }
                    if (!replacingContainer && Game.creeps[cname] && !Game.creeps[cname].spawning) {
                        upgradersAlive++;
                        upgraderRole.run(Game.creeps[cname], {
                                controller: targetRoom.controller,
                                upgradeRate: RATE_VERY_FAST
                            }
                        )
                    }
                }
            }
            for (let i = 0; i < haulerCount; i++) {
                let targetStore = targetRoom.controller.getContainer();
                if(!targetStore || (targetStore &&  targetStore.isFull())){
                    targetStore = {id:'drop',pos:targetRoom.controller.getStandingSpot()}
                }
                let drawFrom = feederNode.storage().storingAtLeast(feederNode.surplusRequired)?feederNode.storage():feederNode.terminal();
                let keepSpawning = upgradersAlive>0 && targetRoom.controller.level<8 && !targetRoom.terminal;
                this.haulResources(feederName, prefix + 'tx' + i,'10*2c1m',
                    drawFrom,targetStore,[RESOURCE_ENERGY],[],keepSpawning,
                    50,1,anchor)
            }

        }catch (e) {
            console.log("ERROR:season6_FunnelUpgradeRoomBeforeFreeze",e)
            console.log("ERROR:season6_FunnelUpgradeRoomBeforeFreeze",e.stack)
        }

    },
    selfBoostHaulController:function(node,waitSpot,haulerSize='20c10m',extraContainerID,suffix='',leadTime=300,cpuBreak=5000){
        let prefix = node.name.charAt(0);
        let pullFrom = node.storage().storingLessThan(node.surplusRequired)?node.terminal():node.storage();
        let thing = this;
        let keepSpawning = (node.controller().level<8 && Game.cpu.bucket>cpuBreak && pullFrom.storingAtLeast(10000))
        let extraContainer = gob(extraContainerID);
        let targetContainer = node.controller().getContainer();
        if(extraContainer && !targetContainer.isEmpty() && extraContainer.isEmpty()){
            targetContainer = extraContainer;
        }
        this.rotateCreep(prefix+'tx'+suffix,function(activeCreepName){
            // stop rkeeper bouncing
            if(Game.creeps[activeCreepName])node.controller().getContainer().reserveTransfer(activeCreepName,Game.creeps[activeCreepName].store.getCapacity(),true)

            thing.haulResources(node.name,activeCreepName,haulerSize,
                pullFrom,targetContainer,[RESOURCE_ENERGY],[],
                keepSpawning,25,1,waitSpot,true)

        },leadTime)

    },
    parentBoostHaulController:function(feederName,boostName,waitSpot=false,supportCount=3,haulerBody='5*2c1m',extraContainerID=false){
        try {
            let boostKey = boostName.charAt(0);
            let term = nodes[boostKey.toLowerCase()].terminal();
            let storage = nodes[boostKey.toLowerCase()].storage();
            let container = nodes[boostKey.toLowerCase()].controller().getContainer();

            if(extraContainerID && container.isFull())container = gob(extraContainerID)

            if(container.isFull() && nodes[boostKey.toLowerCase()].energyAtController<5000){
                container = {id:'drop',pos:nodes[boostKey.toLowerCase()].controller().getStandingSpot()}
            }

            if (term && storage && container) {
                let keepSpawning = (nodes[boostKey.toLowerCase()].controller().level < 8);
                for (let i = 0; i < (supportCount*2); i++) {
                    this.haulResources(feederName, boostKey + 'tx' + i, haulerBody, storage, container, [RESOURCE_ENERGY], [], keepSpawning, 50,1,waitSpot)
                    i++;
                    this.haulResources(feederName, boostKey + 'tx' + i, haulerBody, term, container, [RESOURCE_ENERGY], [], keepSpawning, 50,1,waitSpot)

                }
            }
        }catch (e) {
            console.log("ERROR:parentBoostHaulController",e)
        }
    },

    scoutPotentialBase:function(nodeName,roomName,swampy=false){

        if(!Memory.baseScouts){
            Memory.baseScouts = {};
        }
        if(!Memory.baseScouts[roomName]){
            Memory.baseScouts[roomName] = {from:nodeName,travelTime:9999,status:'scouting',scoutPos:false,lastSeen:0,swampy:swampy}
        }
        let mission = Memory.baseScouts[roomName];
        let scoutName = roomName+"-bsc";
        let controller = mb.getControllerForRoom(roomName);

        if(mission.status==='scouting'){
            let targetPos = controller?controller.pos:{x:25,y:25};
            let scoutBody = swampy?'1t5m':'1t1m';
            this.scoutRoom(nodeName,scoutName,roomName,targetPos,[],scoutBody);

            // if scout dies before TTL up THEN mark no path
            if(mission.scoutPos && !Game.creeps[scoutName]){
                mission.status = 'NO-PATH';
            }
            if(Game.creeps[scoutName] && !Game.creeps[scoutName].spawning){
                let creep = Game.creeps[scoutName];

                if(creep.ticksToLive<920){
                    mission.status = 'TOO-FAR';
                }

                if(Game.rooms[roomName] && !mb.hasRoom(roomName)){
                    mb.scanRoom(roomName);
                }
                mission.scoutPos = creep.pos;
                if(controller && creep.pos.isNearTo(controller)){
                    creep.signController(controller,"🥑 claim this if you want fight me 🗡️")
                    mission.status = 'SAFE';
                    mission.lastSeen = Game.time;
                    mission.travelTime = 1500 - creep.ticksToLive;
                }
            }
        }else{
            if(Game.creeps[scoutName]){
                Game.creeps[scoutName].say('done');
            }
        }
        // room states : TOO-FAR, SCOUTING, NO-PATH, SAFE
    },

    setupNode:function(feederName,targetName,config={}){

        let t = targetName.charAt(0).toLowerCase();
        let f = feederName.charAt(0).toLowerCase();

        if( nodes[f].online  && nodes[t].anchor){
            let targetRoomName = nodes[t].anchor.roomName;

            config.swampy = config.swampy===undefined?false:config.swampy;
            config.prepUpToRCL = config.prepUpToRCL===undefined?1:config.prepUpToRCL;
            config.switchRoomOnAtRCL = config.switchRoomOnAtRCL===undefined?1:config.switchRoomOnAtRCL;
            config.workerBody = config.workerBody===undefined?'4w4c4m':config.workerBody
            config.workerBody = config.swampy ? config.workerBody+'6m':config.workerBody;
            config.phaseOut = (Game.spawns[targetName]);
            //config.defend = (!Game.spawns[targetName] || Game.spawns[targetName].room.controller.level<3);
            config.defenderSpot = {x:nodes[t].anchor.x-3,y:nodes[t].anchor.y-1};


            if(Game.rooms[targetRoomName]){
                // setup standing spots, before feeder gang turns up. Important this happens before harvesters arrive.
                nodes[t].checkAndSetupStandingSpots();
                if(Game.time%250===0)nodes[t].coreComplex.detectExistingStructures(config.prepUpToRCL);
                mb.addConstruction(nodes[t].anchor,STRUCTURE_SPAWN,targetName)
                mb.addConstruction(nodes[t].controller().getStandingSpot(),STRUCTURE_CONTAINER)
            }

            this.startupRoomNoVision(feederName,targetRoomName, config)
        }
    },

    runFactory:function(spawnName,resource){
        if(!Game.spawns[spawnName])return;

        let factory = mb.getFactoryForRoom(Game.spawns[spawnName].pos.roomName);
        if(factory){
            factory.produce(resource)
        }
    },
    fullAutomateRoomNode:function(node){

        if(!node)return
        try{
            let spawn = Game.spawns[node.name];
            if(!spawn)return spawn
            let room = spawn.room;
            let storage = mb.getStorageForRoom(room.name)

            if(room.energyCapacityAvailable>=300){
                logs.startCPUTracker('fullAutomateRoomNode-'+node.name);
                this.runRemotes(node);
                logs.stopCPUTracker('fullAutomateRoomNode-'+node.name);
            }


            //if(Game.time%500===0)this.removeRedundantRoads(node)
            logs.startCPUTracker('manageConstructionSites-'+node.name);
            if(Game.time%20===0)this.manageConstructionSites(node);
            this.defendHomeRoom(node)
            logs.stopCPUTracker('manageConstructionSites-'+node.name);
        }catch (e) {
            console.log(node.name,e)
            console.log(node.name,e.stack)
        }

    },

    scoreRemote:function(node,roomName,logPath=false){
        logs.startCPUTracker('scoreRemote-'+node.name+'-'+roomName);
        //console.log("SCORING REMOTE ",node.name, " >> ",roomName )
        if(!Memory.remotes)Memory.remotes={};
        if(!Memory.remotes[node.name])Memory.remotes[node.name]={};
        ///////////////////////////////////////////////////
        // Analyse and score remotes
        ///////////////////////////////////////////////////
        // High Scores ARE BAD , LOW scores ARE GOOD
        // score is src distances to spawn + controller distance to spawn
        if(!Memory.remotes[node.name][roomName])
            Memory.remotes[node.name][roomName]={
                score:999,
                type:'na',
                lastSeen:0,
                username:false,
                valid:true,
                online:true,
                isDangerous:false,
                guardActive:false,
                controllerSpots:0,
                reason:'scouting',
                staff:{count:0,required:0}
        };


        //  We have to go explore
        if(!mb.hasRoom(roomName))return;
        if(Game.rooms[roomName]) {
            Memory.remotes[node.name][roomName].lastSeen = Game.time;
            Memory.remotes[node.name][roomName].online = true;// we can see this room, so we should be able to accurately score it
        }

        let controller = mb.getControllerForRoom(roomName,false);
        let lairs = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_KEEPER_LAIR], requireVision:false,justIDs:true })
        let invadeCores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})
        let srcs = mb.getSources({roomNames:[roomName],requireVision:false});

        if(lairs.length>0){
            Memory.remotes[node.name][roomName].type = "skr";
        }else if(srcs.length===3){
            Memory.remotes[node.name][roomName].type = "csr";
        }else if(controller){
            Memory.remotes[node.name][roomName].type = "pr";
        }

        ///////////////////////////////////////////////////
        // Handle all shutdown/bad remote cases first
        ///////////////////////////////////////////////////
        let online = true;
        if(season6.isRoomFroze(roomName)){
            Memory.remotes[node.name][roomName].valid = false;
            Memory.remotes[node.name][roomName].reason = "closed";
            online=false;
        }
        else if(season6.isRoomFreezingSoon(roomName)){
            Memory.remotes[node.name][roomName].valid = false;
            Memory.remotes[node.name][roomName].reason = "freeze-soon";
            online=false;
        }
        else if(node.manual_ignoreRooms.includes(roomName)){
            Memory.remotes[node.name][roomName].reason = "manual-ignore";
            online=false;
        }
        else if(lairs.length>0 && node.controller().level<7 ){
            Memory.remotes[node.name][roomName].isDangerous = true;
            Memory.remotes[node.name][roomName].reason = "sk-room";
            online=false;
        }
        else if(srcs.length===0){
            Memory.remotes[node.name][roomName].valid = false;
            Memory.remotes[node.name][roomName].reason = "hallway";
            online=false;
        }
        else if(invadeCores.length>0 && invadeCores[0].level>0){
            Memory.remotes[node.name][roomName].reason = "invader-core";
            online=false;
        }

        if(Game.rooms[roomName]){

            if(Game.rooms[roomName].getInvaders().length >=3 ){
                Memory.remotes[node.name][roomName].isDangerous = true;
                Memory.remotes[node.name][roomName].reason = "big-attack";
                // exclude offlining skr for now, because these attacks are regular and shutdown the room running. Keep it running and let creeps flee or sk-gaurd chase down invaaer
                online=(Memory.remotes[node.name][roomName].type !=='skr');
            }
            // switched to player fighters to stop false fires from skeepers and allies.
            if(Game.rooms[roomName].getInvaders().length>=1 || Game.rooms[roomName].getEnemyPlayerFighters().length >=1){

                Memory.remotes[node.name][roomName].isDangerous = true;
            }else{
                Memory.remotes[node.name][roomName].isDangerous = false;
            }
        }
        if(controller && controller.owner){
            Memory.remotes[node.name][roomName].username = controller.owner.username;
            Memory.remotes[node.name][roomName].reason = "has-owner";
            Memory.remotes[node.name][roomName].valid = false;
            Memory.remotes[node.name][roomName].isDangerous = true;
            online=false;
        }
        if(controller && controller.reservation){
            if(controller.reservation.username!=='MadDokMike' && controller.reservation.username!=='Invader'){
                Memory.remotes[node.name][roomName].username = controller.reservation.username;
                Memory.remotes[node.name][roomName].reason = "has-owner";
                Memory.remotes[node.name][roomName].isDangerous = true;
                online=false;
            }
        }

        // this fixes a bug where a remote goes offline, but subsequent runs override the reason string.
        // this will get re-scouted eventually
        if( !Memory.remotes[node.name][roomName].online &&  Memory.remotes[node.name][roomName].score)online=false;

        if(!online){
            Memory.remotes[node.name][roomName].online = false;
            Memory.remotes[node.name][roomName].score+=99999;
            logs.stopCPUTracker('scoreRemote-'+node.name+'-'+roomName);
            return;
        }

        ///////////////////////////////////////////////////
        // Now lets score this potential remote
        ///////////////////////////////////////////////////
        Memory.remotes[node.name][roomName].reason = "";
        Memory.remotes[node.name][roomName].score = 0;
        Memory.remotes[node.name][roomName].staff={count:0,required:0};

        if(Memory.remotes[node.name][roomName].isDangerous){
            Memory.remotes[node.name][roomName].score+=100;
            Memory.remotes[node.name][roomName].reason += "Dngr,"
        }

        if(controller && controller.reservation){
            Memory.remotes[node.name][roomName].username = controller.reservation.username;

            if(controller.reservation.username!=='MadDokMike'){
                // try not focus on rooms that anothr player already reservs
                Memory.remotes[node.name][roomName].score+=controller.reservation.ticksToEnd;
                Memory.remotes[node.name][roomName].reason += "+RES,";
            }else{
                // let boost priority of rooms we already reserve
                Memory.remotes[node.name][roomName].reason += "-RES,";
                Memory.remotes[node.name][roomName].score-=Math.ceil(controller.reservation.ticksToEnd/10);
            }
        }



        let cores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})
        if(cores.length>0){
            // try not to prefer invader core rooms, because they are costly
            Memory.remotes[node.name][roomName].score+=100 - (node.controller().level*15);
            Memory.remotes[node.name][roomName].reason += "+IC,";
        }


        let result=false;
        let path=false;

        let roads = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_ROAD], requireVision:false,justIDs:true })
        Memory.remotes[node.name][roomName].reason += "S["
        let netSrcPathLength = 0;
        for(let src of srcs){

            if(Game.rooms[roomName] && Memory.remotes[node.name][roomName].type ==='skr'){
                if(!src.getLair()){
                    let lair = mb.getNearestStructure(src.pos,[STRUCTURE_KEEPER_LAIR],[src.pos.roomName])
                    src.setLair(lair)
                }
            }


            path = mb.getPath(node.anchor,src.pos)
            if(path===ERR_NO_PATH){
                Memory.remotes[node.name][roomName].online = false;
                Memory.remotes[node.name][roomName].score+=99999;
                Memory.remotes[node.name][roomName].reason = src.pos+" !path"
                return;
            }
            netSrcPathLength +=path.length;
            let c = '';
            if(src.haveVision && src.haveContainer()){
                netSrcPathLength -= 50;// fix reward for containers, maybe it should be weighted as revenue...
                c='c';
            }
            Memory.remotes[node.name][roomName].reason += path.length+c+",";
        }
        Memory.remotes[node.name][roomName].reason += "],";
        Memory.remotes[node.name][roomName].score+= netSrcPathLength;

        if(roads.length>0){
            // max roads should == net path lengths. roads make remote 2x efficient, so reduce path cost
            let rdMode = Math.floor(roads.length/2);
            Memory.remotes[node.name][roomName].reason += "-r["+rdMode+"],";
            Memory.remotes[node.name][roomName].score-= rdMode;
        }
            // harvesters
        Memory.remotes[node.name][roomName].staff.required+=srcs.length;
        if(srcs.length===1){
            // lower score of single src rooms. Added src.length for tie breaker
            Memory.remotes[node.name][roomName].score += 80+srcs.length;
            Memory.remotes[node.name][roomName].reason += "+1S,";
        }
        if(srcs.length===3){
            Memory.remotes[node.name][roomName].score -=  lairs.length ===0?200:100;
            Memory.remotes[node.name][roomName].reason +=  lairs.length ===0?"-CSR,":"-sk,";
        }



        // if the remote has a controller and we're in reserving capacity, then factor in th controller distances.
        if(controller && node.controller().level>=3){

            let standingSpots = controller.haveVision? controller.pos.lookForNearbyWalkable(false,false):[];
            Memory.remotes[node.name][roomName].controllerSpots = controller.haveVision? standingSpots.length:1;
            // reserver
            Memory.remotes[node.name][roomName].staff.required+=1;

            let cPos = controller.pos;
            result = PathFinder.search(Game.spawns[node.name].pos, {pos:rp(cPos.x,cPos.y,cPos.roomName),range:1 } ,{swampCost:2,maxOps:10000});
            Memory.remotes[node.name][roomName].score+= result.path.length;
            Memory.remotes[node.name][roomName].controllerDistance = result.path.length;
            Memory.remotes[node.name][roomName].reason += "C["+result.path.length+"],";
        }
        logs.stopCPUTracker('scoreRemote-'+node.name+'-'+roomName);
    },
    sortRemotes:function(node){
        logs.startCPUTracker('sortRemotes-'+node.name);
        //console.log(node.name," remote sorted from: ",node.remoteRoomNames)
        let toSorted = [];
        node.remoteRoomNames = [];
        if(Memory.remotes && Memory.remotes[node.name]){
            // Sort the object entries by the score and map to get only the keys (room names)
            for(let rn in Memory.remotes[node.name]){
                let rData = Memory.remotes[node.name][rn];
                if(rData.online){
                    toSorted.push( {name:rn, score: rData.score} );
                }
            }
            let available = toSorted.sort((a,b) => a.score - b.score).map(object => object.name)
            let supportCount = node.controller().level>=7?6:3;
            supportCount = node.controller().level===8?8:supportCount;

            for(let i=0; i<=supportCount;i++)if(available[i])node.remoteRoomNames.push(available[i]);
        }
        logs.stopCPUTracker('sortRemotes-'+node.name);
        //console.log('to: ',node.remoteRoomNames)
    },
    detectRemotes:function(node){

        if(node.remotesLoaded)return;
        logs.startCPUTracker('detectRemotes-'+node.name);
        if(node.manual_ignoreRooms===undefined)node.manual_ignoreRooms = [];
        if(node.manual_noRoads===undefined)node.manual_noRoads = [];
        if(node.manual_addRooms===undefined)node.manual_addRooms = [];

        let adjRooms = Game.map.describeExits(node.coreRoomName);
        //console.log(node.name," remote boot up. Scoring")
        for(let dir in adjRooms){
            dir = dir*1;
            if(dir===TOP){
                let adjRooms2 = Game.map.describeExits(adjRooms[dir]);
                if(adjRooms2[LEFT])this.scoreRemote(node,adjRooms2[LEFT]);
                if(adjRooms2[RIGHT])this.scoreRemote(node,adjRooms2[RIGHT]);
            }
            if(dir===LEFT){
                let adjRooms2 = Game.map.describeExits(adjRooms[dir]);
                if(adjRooms2[TOP])this.scoreRemote(node,adjRooms2[TOP]);
                if(adjRooms2[BOTTOM])this.scoreRemote(node,adjRooms2[BOTTOM]);
            }
            if(dir===BOTTOM){
                let adjRooms2 = Game.map.describeExits(adjRooms[dir]);
                if(adjRooms2[LEFT])this.scoreRemote(node,adjRooms2[LEFT]);
                if(adjRooms2[RIGHT])this.scoreRemote(node,adjRooms2[RIGHT]);
            }
            if(dir===RIGHT){
                let adjRooms2 = Game.map.describeExits(adjRooms[dir]);
                if(adjRooms2[TOP])this.scoreRemote(node,adjRooms2[TOP]);
                if(adjRooms2[BOTTOM])this.scoreRemote(node,adjRooms2[BOTTOM]);
            }
            this.scoreRemote(node,adjRooms[dir]);
        }
        if(node.manual_addRooms)for(let rn of node.manual_addRooms)this.scoreRemote(node,rn);

        this.sortRemotes(node);
        logs.stopCPUTracker('detectRemotes-'+node.name);
        node.remotesLoaded = true;
    },
    scoutRemotes:function(node){

        if(node.inRecoveryMode!==false)return;
        let roomToScout = false;

        for(let roomName in Memory.remotes[node.name]){
            let remote = Memory.remotes[node.name][roomName];
            if(!remote.valid)continue; // dont waste time on invalid remotes
            let timeSinceSeen = Game.time - remote.lastSeen;
            //if(node.name==='Theta')console.log(roomName,timeSinceSeen,remote.isDangerous)
            if(!mb.hasRoom(roomName) || (remote.isDangerous && timeSinceSeen>1500) || (!remote.isDangerous && timeSinceSeen>250) ){

                roomToScout = roomName;
                break;
            }
        }
        //if(node.name==='Theta')console.log('roomToScout',roomToScout)
        if(!roomToScout){
            // no priority room to scout, lets maintain vision on any room, we lost vision
            // this helps ensure we can always see drops/containers, even if we lose all the harvesters
            for(let name of node.remoteRoomNames){
                if(!Game.rooms[name]){
                    roomToScout = name;
                    break;
                }
            }
        }

        if(roomToScout){
            this.scoutRoom(node.name,node.name+'-rsc',roomToScout);

            if(Game.rooms[roomToScout]){
                mb.scanRoom(roomToScout);
                console.log(node.name,roomToScout," Just scanned. Scoring")
                this.scoreRemote(node,roomToScout);
                this.sortRemotes(node);
            }
        }

    },
    manageRemoteRoads:function(node,sources){
            if( Object.keys(Game.constructionSites).length>50)return;
            let placed = false;
            for(let src of sources ){
                if(placed || !src.haveVision)break;
                // only do 1 road segment at a time for the whole remote. This reduces duplicate roads

                // might already have a road being built or container. dont split focus and create too many roads
                // also reduce road spam bug trigger when road partial built and global reset happes
                if(mb.haveConstructions([src.pos.roomName]))continue;

                let to = src.getStandingSpot();
                let frequency = src.getMeta().pathed?250:50;
                if(Game.time%frequency===0   && to){
                    let path = mb.getPath(node.anchor,to);
                    let doneCount=0;

                    if(path!==ERR_NO_PATH){
                        for(let point of path){
                            let pos = rp(point.x,point.y,point.roomName);

                            // make sure we can see the position, because a path may go through a room
                            // we don't have vision on
                            if(!Game.rooms[ pos.roomName ])continue;

                            if( !pos.lookForStructure(STRUCTURE_ROAD) && pos.isWalkable() ){
                                if(pos.lookForConstruction()){
                                    placed=true;
                                    break; // this stops us placing more, before we have completed the path
                                }
                                if(mb.addConstruction(pos,STRUCTURE_ROAD)===OK){
                                    //console.log(node.name,'placed road at ',pos)
                                    placed=true;break;
                                }
                            }else{
                                doneCount++;
                            }
                        }
                        if(path.length===doneCount){
                            src.setMetaAttr('pathed',true);
                        }else{
                            src.setMetaAttr('pathed',false);
                        }
                    }
                }
            }
    },
    runRemotes:function(node){
        logs.startCPUTracker('runRemotes-'+node.name);
        // return
        this.detectRemotes(node);
        this.scoutRemotes(node);

        let eCap =  Game.rooms[node.coreRoomName].energyCapacityAvailable;
        harvyECap = eCap;
        if(harvyECap> 800)harvyECap = 800; // keep them small, to save on spawn time
        let conf = node.getConfig();

        let harvesterBodyPlan = harvesterRole.getParts(harvyECap,{});
        if(!Game.rooms[node.coreRoomName].storage){
            // if(Game.rooms[node.coreRoomName].controller.level<3){
            // super hacky, just testing out remotes not building containers too early
            harvesterBodyPlan = harvesterBodyPlan.replace('1c','');
        }

        let reSortRemotes = false;
        let previousRemoteFullyStaffed = false;
        let multiplier = 2000; // base for early RCL, to allow 1k on floor per src
        if(node.controller().level>=4)
            multiplier = 3000; // containers come online, so 2k+1k on floor
        let maxAllowedEnergyExcess = node.remoteRoomNames.length*multiplier*2;
        let tooMuchEnergyMined = (node.totalEnergyAtSources>maxAllowedEnergyExcess)
        let tankerGap = node.workforce_quota.tanker.required - node.workforce_quota.tanker.count;
        //if(tooMuchEnergyMined)console.log(node.name,'Too much EEE..stopping remote spawns',node.totalEnergyAtSources,'>',maxAllowedEnergyExcess)
        for(let roomName of node.remoteRoomNames){

            let remoteMemory = Memory.remotes[node.name][roomName];
            if(!remoteMemory){console.log(roomName,"No Memory for remote"); continue;}
            if(Game.rooms[roomName])remoteMemory.lastSeen = Game.time;
            remoteMemory.staff.count= 0;
            // short term fix because invaderCores can be added after the fact and then not in cache
            if(Game.time%100===0)mb.scanRoom(roomName);

            if(remoteMemory && remoteMemory.online==false){
                // if this happens, then a remote got shutdown from some dyanamic action. need to find new best remotes
                console.log(node.name,roomName," remote went offline. resort")
                reSortRemotes=true;
                continue;
            }

            let controller = mb.getControllerForRoom(roomName,false);
            let srcs =  mb.getSources({roomNames:[roomName],requireVision:false});
            let invadeCores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})


            /////////////// Re-Score detection  ///////////////////////////////////////////////////////
            if(node.manual_ignoreRooms.includes(roomName)){

                console.log(node.name," Room is now ignored. Rescoring")
                this.scoreRemote(node,roomName);
                reSortRemotes=true;
            }
            if(Game.rooms[roomName]){
                // console.log(node.name,roomName,Game.rooms[roomName].getInvaders().length," invaders detected. Rescoring")
                if(!remoteMemory.isDangerous && Game.rooms[roomName].getInvaders().length >= 1){
                    console.log(node.name,roomName," invaders detected. Rescoring")
                    this.scoreRemote(node,roomName);
                    reSortRemotes=true;
                }
            }
            if(controller && controller.owner){
                console.log(node.name,roomName," Room has owner. Rescoring")
                this.scoreRemote(node,roomName);
                reSortRemotes=true;
            }
            if(invadeCores.length>0 && invadeCores[0].level>0){
                console.log(node.name,roomName," invadeCore detected. Rescoring")
                this.scoreRemote(node,roomName);
                reSortRemotes=true;
            }

            // rescore every 500t
            if(Game.time%500===0 && controller.haveVision){
                //console.log(node.name,roomName," Game.time%500. Rescoring")
                this.scoreRemote(node,roomName);
                reSortRemotes=true;
            }

            /////////////// Defense  ///////////////////////////////////////////////////////

            // >>>>>> Kill Invaders / players >>>>>>>>>>>>>>>>
            this.defendRoom(node.name,roomName+'-guard',roomName);

            if(srcs.length===3){
                //let lairIDs = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_KEEPER_LAIR],justIDs:true})
                let lairIDs = [];
                if(!Game.rooms[roomName]){
                    // if we cant see the room, just get in the room with default
                    lairIDs = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_KEEPER_LAIR],justIDs:true})
                }else{
                    for(let src of srcs){
                        let lair = src.getLair();
                        if(lair)lairIDs.push(lair.id);
                    }

                }
                if(lairIDs.length>0){
                    let thing = this;
                    this.rotateCreep(roomName+'-sk-guard-', function(activeCreepName){

                        remoteMemory.guardActive = (Game.creeps[activeCreepName] && Game.creeps[activeCreepName].pos.roomName===roomName);
                        thing.constantGuardSKRoom(node.name,activeCreepName,roomName, lairIDs,'20m19a6h5m')
                       // thing.duoHealer(node.name,activeCreepName,roomName, lairIDs,'23m19a6h2m')
                    },350)
                }


            }

            // >>>>>> Kill invaderCores >>>>>>>>>>>>>>>>
            let invaderKillBodyPlan = "2a2m";
            if(node.room().energyCapacityAvailable>=550){
                invaderKillBodyPlan = "3a3m";
            }else if(node.room().energyCapacityAvailable>=800){
                invaderKillBodyPlan = "6a6m";
            }else if(node.room().energyCapacityAvailable>=1300){
                invaderKillBodyPlan = "10a10m";
            }
            if(controller && invadeCores.length>0 && invadeCores[0].level===0){
                this.keepRoomClearOfLv0InvaderCores(node.name,roomName+'-a',invaderKillBodyPlan,roomName,invadeCores)
                this.keepRoomClearOfLv0InvaderCores(node.name,roomName+'-a2',invaderKillBodyPlan,roomName,invadeCores)
            }


            /////////////// Harvesters  ///////////////////////////////////////////////////////
            let invaderReserved = false;
            let harvestersAlive = 0;
            if(controller.haveVision && controller.reservation && controller.reservation.username!=='MadDokMike'){
                invaderReserved = controller.reservation.ticksToEnd;
            }

            // if we have 3 srcs, we have a sk room
            if(srcs.length===3 && eCap >=1300)
                harvesterBodyPlan="10w1c5m";
            // save on CPU at higher RCLs:
            if(node.controller().level>=7)
                harvesterBodyPlan="12w1c6m";

            if(!invaderReserved && invadeCores.length===0){
                for(let src of srcs){
                    let harveyName = roomName+'-'+src.pos.x+'-'+src.pos.y+'-h';
                    if(Game.creeps[harveyName]) {
                        harvestersAlive++;
                        remoteMemory.staff.count++;
                    }
                    let keepSpawningHarvy = (!remoteMemory.isDangerous && !tooMuchEnergyMined && !node.inRecoveryMode);
                    if(remoteMemory.type==='skr' && !remoteMemory.guardActive)keepSpawningHarvy=false;
                    // if we have some tankers, but we need a harvester, then prioritise this
                    let priorityHarvest = tankerGap < 5 && node.workforce_quota.tanker.count >0;
                    this.harvestPoint(node.name,harveyName,harvesterBodyPlan,src,(remoteMemory.type==='skr'),keepSpawningHarvy,priorityHarvest);

                }
            }

            /////////////// Others  ///////////////////////////////////////////////////////
            if(!node.manual_noRoads.includes(roomName) && invadeCores.length===0 && node.controller().level>=3){
                let keepSpawningRoady = harvestersAlive>0  && !node.inRecoveryMode;
                if(remoteMemory.type==='skr' && !remoteMemory.guardActive)keepSpawningRoady=false;
                let wBody = (remoteMemory.type ==='skr')?'2w6c4m':'1w3c2m'
                this.maintainRoadsInRoom(node.name,roomName+'-w',roomName,wBody,true,keepSpawningRoady);
                this.manageRemoteRoads(node,srcs);
            }


            if(srcs.length===3){
                this.pickupSKRoomDrops(node.name,roomName+'-scav',roomName,'5*1c1m',(remoteMemory.type==='skr' && !remoteMemory.guardActive))
            }


            /////////////// Reservers  ///////////////////////////////////////////////////////
            // only reserve the first 3 priority remotes.
            if(controller && ( node.controller().level>=7 || remoteMemory.controllerDistance<50 || srcs.length===2 )  && eCap>=650){
                let bodyPlan = eCap>=1300?'2cl2m':'1cl1m';
                bodyPlan = eCap>=2600?'4cl4m':bodyPlan;

                // dont spawn reserver if we've seen fighter in the room
                // if we dont have vision, we dont have a harvester near src
                // spawn harvesters first before trying to boost controller
                let keepSpawningResy = !remoteMemory.isDangerous && controller.haveVision && harvestersAlive>0  && !node.inRecoveryMode;
                // if the reservation isn't a player/invader core
                // and we've smashed it, then cool off
                if(!invaderReserved && controller.reservation && controller.reservation.ticksToEnd>4000)
                    keepSpawningResy = false;

                let reserverName = roomName+'-cl';
                if(Game.creeps[reserverName]) {
                    remoteMemory.staff.count++;
                }


                this.reserverRoom(node.name,reserverName,controller,bodyPlan,false,keepSpawningResy)
                // if we are still on 1 spawn, then spawn 1 extra claimer to cover gap
                if(remoteMemory.controllerSpots>1 && node.controller().level<7){
                   // let doubleTeam = (invaderReserved || invadeCores.length>0);
                    // we used to only spawn in support to fend off invaderCores, but there is adv to getting the reservation highg
                    // and keeping it high, on high value remotes.
                    this.reserverRoom(node.name,roomName+'-cl2',controller,bodyPlan,false,keepSpawningResy)

                }

            }

            previousRemoteFullyStaffed = (remoteMemory.staff.count===remoteMemory.staff.required)

        }

        if(reSortRemotes && (!this.lastSort || (Game.time-this.lastSort)>100 )){
            console.log(node.name,"Resort requested")
            this.sortRemotes(node);
            this.lastSort= Game.time;
        }

        logs.stopCPUTracker('runRemotes-'+node.name);
    },
    /**
     * remove walls that have later ended up with a structure on then
     * @param node
     */
    removeRedundantRoads: function(node){
        let spawn = Game.spawns[node.name];
        let roads = mb.getStructures({roomNames:[node.coreRoomName],types:[STRUCTURE_ROAD]})
        for(let road of roads){
            if(!road.pos.isWalkable()){
                road.destroy();
            }
            if(road.pos.isEqualTo(rp(spawn.pos.x-1,spawn.pos.y+1,spawn.pos.roomName)))road.destroy()
            if(road.pos.isEqualTo(rp(spawn.pos.x+1,spawn.pos.y+1,spawn.pos.roomName)))road.destroy()
            if(road.pos.isEqualTo(rp(spawn.pos.x-1,spawn.pos.y+3,spawn.pos.roomName)))road.destroy()
            if(road.pos.isEqualTo(rp(spawn.pos.x+1,spawn.pos.y+3,spawn.pos.roomName)))road.destroy()
        }
    },
    /**
     * manage building 3 layers of roads.
     * @param node
     */
    manageWalls:function(node){

        // once all walls are high enough, lets maybe build another
        if(Game.time%500==0 && node.defenceIntel.weakest_structure.hits>=node.wallHeight)this.wallCheck=undefined;
        let allRampsBuilt = true;
        if(this.wallCheck===undefined){
            for(let pos of Game.spawns[node.name].pos.findBuildableSpotsAtAreaEdge(10,4,6,12)){

                pos.createConstructionSite(STRUCTURE_RAMPART);
                allRampsBuilt=false;
                break;
            }

            if(allRampsBuilt){
                // let antiBlinkWalls = Game.spawns[node.name].pos.getPositionsAtAreaEdge(12,6,8,14)
                // this.buildWallRing(node,antiBlinkWalls)
                // let antiContactWalls = Game.spawns[node.name].pos.getPositionsAtAreaEdge(11,5,7,13)
                // this.buildWallRing(node,antiContactWalls)
            }

            this.wallCheck = Game.time;
        }

    },
    /**
     * build a ring of alternating walls for a given array of positions
     * designed for building our wall rings, around bases ramparts
     * @param node
     * @param positions
     */
    buildWallRing:function(node,positions){
        let ignoreSpots = [];
        let srcs = mb.getSources({roomNames:[node.coreRoomName]});
        let controller = mb.getControllerForRoom(node.coreRoomName);
        for(let s of srcs)ignoreSpots.push(s.getStandingSpot());
        ignoreSpots.push(controller.getStandingSpot());

        for(let i in positions){
            //pos.colourIn('blue')
            if(i%2==0 && positions[i].canBuild(STRUCTURE_WALL)){
                if(positions[i].lookForStructure(STRUCTURE_ROAD)){

                    if( positions[i+1] && positions[i+1].isWalkable()){
                        positions[i+1].createConstructionSite(STRUCTURE_ROAD);
                    }else if(positions[i-1] && positions[i-1].isWalkable()){
                        positions[i-1].createConstructionSite(STRUCTURE_ROAD);

                    }
                }
                let nope=false;
                for(let spot of ignoreSpots){
                    if(spot.isEqualTo(positions[i])){
                        nope=true;break;
                    }
                }
                if(!nope)positions[i].createConstructionSite(STRUCTURE_WALL);
            }
        }
    },

    defendHomeRoom:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        let hostileIds = room.getEnemyPlayerFighters();

        if(hostileIds.length===0){
            hostileIds = room.getInvaders();
            if(hostileIds.length<3)hostileIds=[];
        }
        if(hostileIds.length===0)return;

        let towers = mb.getStructures({roomNames:[room.name],types:[STRUCTURE_TOWER]})

        let bodyPlan = "2a2m";
        if(room.energyCapacityAvailable>=2300){
            bodyPlan = "20a10m"; // RCL 6 - 2100
        }else if(room.energyCapacityAvailable>=1800){
            bodyPlan = "16a8m"; // RCL 5 - 1680
        }else if(room.energyCapacityAvailable>=1300){
            bodyPlan = "10a10m"; // RCL 4
        }else if(room.energyCapacityAvailable>=800){
            bodyPlan = "6a6m"; // RCL 3
        }else if(room.energyCapacityAvailable>=550){
            bodyPlan = "1t1m+3a3m"; // RCL 2
        }


        // bodyPlan = '1a1m';
        if(towers.length==0){
            // if we have no towers just charge and hope for best
            for(let i in hostileIds){
                this.constantGuardRoom(node.name,"guard"+i,room.name,bodyPlan)
            }
        }else{

            let ramparts = mb.getStructures({roomNames:[room.name],types:[STRUCTURE_RAMPART]})
            if(ramparts.length<6){
                // we dont have a full wall so keep near the tower and then fight
                for(let i=0; i<=(2*hostileIds.lengh); i++){
                    this.constantGuardRoom(node.name,"guard"+i,room.name,bodyPlan,towers[0].pos,false,false,10);
                }
            }else{

                for(let i in node.defenceIntel.ramp_ids_to_defend){
                    let id = node.defenceIntel.ramp_ids_to_defend[i]
                    let ramp = gob(id);
                    let maxDist = 10;// if the ramps gone missing them chase inside base
                    if(ramp){
                        maxDist = 1;
                    }
                    this.constantGuardWalls(node.name,"hoplite"+i,room.name,bodyPlan,ramp.pos,maxDist);
                }
            }

        }

    },

    manageConstructionSites:function(node){

        if(node.controller().level>=2)this.buildRoadsToSrcArndController(node)
        if(node.controller().level===5)this.buildAtRCL5(node)
        if(node.controller().level===6)this.buildAtRCL6(node)
        if(node.controller().level===7)this.buildAtRCL7(node)
        if(node.controller().level===8)this.buildAtRCL8(node)
    },
    linksSetup:{},
    buildAtRCL8:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;

        let linkCount = mb.countStructures([STRUCTURE_LINK],[room.name])
        if( this.linksSetup[room.name]!==linkCount){
            util.setLinksInRoom(room.name,false);
            this.linksSetup[room.name]=linkCount;
        }
    },
    buildAtRCL7:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;

        let linkCount = mb.countStructures([STRUCTURE_LINK],[room.name])
        if(this.linksSetup[room.name]!==linkCount){
            util.setLinksInRoom(room.name,false);
            this.linksSetup[room.name]=linkCount;
        }
    },
    buildAtRCL6:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        let sources = mb.getSources({roomNames:[room.name]});
        let linkCount = mb.countStructures([STRUCTURE_LINK],[room.name])

        if(linkCount<3){
            for(let src of sources){
                if(!src.haveLink()){
                    let buildableSpot = src.getStandingSpot().findNearbyBuildableSpot();
                    if(buildableSpot)buildableSpot.createConstructionSite(STRUCTURE_LINK);
                    break;
                }
            }

        }
        if(linkCount==3 && this.linksSetup[room.name]!=linkCount){
            util.setLinksInRoom(room.name,false);
            this.linksSetup[room.name]=linkCount;
        }
    },
    buildAtRCL5:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;

        let sources = mb.getSources({roomNames:[room.name]});
        let linkCount = mb.countStructures([STRUCTURE_LINK],[room.name])

        if(linkCount<2) {
            let furthestPos = false;
            let maxDist = 1;
            for (let src of sources) {
                let dist = src.pos.getRangeTo(spawn);
                let buildableSpot = src.getStandingSpot().findNearbyBuildableSpot();
                if (buildableSpot && dist > maxDist) {
                    furthestPos = buildableSpot;
                    maxDist = dist;
                }
            }
            if (furthestPos) {
                mb.addConstruction(furthestPos, STRUCTURE_LINK);
            }
        }
        if(linkCount>=2 && this.linksSetup[room.name]!=linkCount){
            util.setLinksInRoom(room.name,false);
            this.linksSetup[room.name]=linkCount;
            //clog("here")
            for(let src of sources){
                src.getStandingSpot().createConstructionSite(STRUCTURE_RAMPART);
                if(src.haveLink())src.getLink().pos.createConstructionSite(STRUCTURE_RAMPART);
            }
        }


    },

    buildRoadsToSrcArndController:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;

        if(room.controller.haveContainer() && !room.controller.getMeta().pathed ){

            let path = spawn.pos.findPathTo(room.controller.getStandingSpot(),{ignoreCreeps:true});
            clog("pathing controller...",path.length)
            for(let point of path){
                room.createConstructionSite(point.x,point.y,STRUCTURE_ROAD)
            }
            room.controller.setMetaAttr('pathed',true)

            let sources = mb.getSources({roomNames:[room.name]})
            for(let src of sources){
                let path = spawn.pos.findPathTo(src.getStandingSpot(),{ignoreCreeps:true});
                clog("pathing src...",path.length);
                let placed = 0;
                for(let point of path){
                    if(placed===path.length)break;

                    placed++;
                    room.createConstructionSite(point.x,point.y,STRUCTURE_ROAD)
                }
                src.setMetaAttr('pathed',true)
            }

        }
    },

    setControllerUp:function(node){
        let positions = node.controller().pos.getPositionsInRange(3);
        let spawn = Game.spawns[node.name];
        let closest = false;
        let closestDist=9999;
        for(let pos of positions){
            let dist = spawn.pos.getRangeTo(pos)
            //clog(dist,pos)
            if(pos.isWalkable() && dist<closestDist){
                closestDist=dist;
                closest = pos;
            }
        }
        clog("controller spot set",closest)
        node.controller().setStandingSpot(closest);
    },
    setSourcesUp:function(node){

        for(let src of mb.getSources({roomNames:[node.coreRoomName]}) ){
            let spots = src.pos.lookForNearbyWalkable(false,false);
            let containerSpot = false;
            let closestDist = 999;

            let bestStandingSpots = [];

            for(let pos of spots){
                let dist = Game.spawns[node.name].pos.getRangeTo(pos)
                let standingSpots=[];

                for(let pos2 of spots){
                    if(pos.isNearTo(pos2)){
                        standingSpots.push(pos2);
                    }
                }

                // prefer spots where the container would have more adj spot
                if(standingSpots.length > bestStandingSpots.length && standingSpots.length<=3){
                    closestDist=dist;
                    containerSpot=pos;
                    bestStandingSpots=standingSpots;

                }
                // otherwise just prefer closer points thats not worse
                else if(dist<closestDist && standingSpots.length === bestStandingSpots.length){
                    closestDist=dist;
                    containerSpot=pos;
                    bestStandingSpots=standingSpots;
                }

            }
            for(let sp of bestStandingSpots){
                sp.colourIn('red')
            }
            containerSpot.colourIn('blue')
            src.setStandingSpot(containerSpot)
            src.setStandingSpots(bestStandingSpots)
        }

    },

    spawnHarvest:function(feedSpawn, renewSpawn, cname,src_id){

        if(!Game.creeps[cname]){

        }
        if( Game.spawns[renewSpawn] && Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.mine_id = src_id;
            if( creep.ticksToLive<1400){
                Game.spawns[renewSpawn].renewCreep(creep)
            }
            harvesterRole.run(creep,{coreRoomName: Game.spawns[renewSpawn].pos.roomName,wallHeight:10000})
        }

    },
    maintainerSpawn:function(spawnName){
        if(Game.spawns[spawnName]){
            let controller = Game.spawns[spawnName].room.controller;
            let cname = spawnName+"w";
            if(!Game.creeps[cname]){
                Game.spawns[spawnName].spawnCreepX(creepBody,creepName,{memory:{job:false}},true);
            }

        }
    },
    /**
     * string                nodeName
     * string                attackRoom
     * Int                   scheduledTick
     * Object   config -> toggle optional features
     *
     * string   config.leaderBody -> 25w25m etc, default:1a1m
     * string   config.healerBody -> 25h25m etc, default:1h1m
     * RoomPos  config.musterSpot -> which position to wait for everyone in the squad, default: 25,25 of penultamate route room
     * RoomPos  config.retreatSpot -> which position to retreat to, if taking too much dmg. default: musterSpot
     * Array    config.target_ids -> any hard coded ids to target. Default: duo will stall. needs improving
     * Bool     config.destroyBanks -> if true, the duo will destroy storage and terminal, default:true
     * Bool     config.attackWhenReady -> if true, the duo will attack, if false, duo will hold at muster spot
     *
     * string   config.renewSpawn -> which spawn to use to sync creeps ttl, default primary room spawn
     * Array    config.leaderBoostPlans -> boostPlan config for visiting the labs. default:[]; no boosts
     * Array    config.healerBoostPlans -> boostPlan config for visiting the labs. default:[]; no boosts
     * Int      config.spawnFacing  -> which way the renewSpawn faces, so the creeps can rotate. default TOP
     * Bool     config.keepSpawning  -> whether to spawn again, after creeps die
     * bool                  destroyResourceBanks - whether to destroy storage and terminal
     *
     **/
    scheduledAttack: function(nodeName,attackRoom,attackName,entryPoint,scheduledTick="off",config={}){

        let logCPUUsag= false;
        config.routeRequired =         config.routeRequired!==undefined?      config.routeRequired:true;
        config.dontMuster =            config.dontMuster!==undefined?      config.dontMuster:false;

        if(Memory.scheduledAttackState===undefined){
            Memory.scheduledAttackState = {};
        }
        if(Memory.scheduledAttackState[attackName]===undefined){
            Memory.scheduledAttackState[attackName] = 'scheduled';
        }

        //////// Basic Validation ////////////////////////////////////////////////////////
        if(!Game.spawns[nodeName]){
            console.log("ATTACK ERROR: no base spawn: "+nodeName+" >> "+attackRoom)
            return;

        }
        let route = config.routeRequired?mb.getMapRoute(Game.spawns[nodeName].pos.roomName,attackRoom):[];
        if(config.routeRequired && !route){
            console.log("ATTACK ERROR: not route for "+Game.spawns[nodeName].pos.roomName+" >> "+attackRoom)
            return;
        }
        if(!entryPoint){
            console.log("ATTACK ERROR: no entryPoint for "+Game.spawns[nodeName].pos.roomName+" >> "+attackRoom)
            return;
        }


        //////// Schedule Triggers  ////////////////////////////////////////////////////////
        //1483013 + 8.2k = 1491277
        if(Game.time >scheduledTick && Memory.scheduledAttackState[attackName]==='scheduled'){
            Memory.scheduledAttackState[attackName]='mustering';
            clog('attack mustering',attackRoom)
        }else if(Memory.scheduledAttackState[attackName]==='scheduled'){
            if(Game.time %10===0)clog((scheduledTick - Game.time)+" ticks at "+scheduledTick,"Scheduled attack on "+attackRoom+" in ")
        }else if(Memory.scheduledAttackState[attackName]==='mustering' || Memory.scheduledAttackState[attackName]==='attacking'){
            if(Game.time %10===0)clog(Memory.scheduledAttackState[attackName],"Scheduled attack underway against "+attackRoom)
        }

        //////// Config Defaults  ////////////////////////////////////////////////////////
        let defaultMuster = route.length>0? rp(25,25,route[(route.length -2)]):entryPoint;

        config.musterSpot =         config.musterSpot!==undefined?      config.musterSpot:defaultMuster;
        config.destroyBanks =       config.destroyBanks!==undefined?    config.destroyBanks:true;
        config.duoCount =           config.duoCount!==undefined?        config.duoCount:1;
        config.attackWhenReady = false;
        if(Memory.scheduledAttackState[attackName]==='attacking'){
            config.attackWhenReady = true;
        }

        allCreepNames = [];
        for(let i=0; i<config.duoCount;i++){
            allCreepNames.push(attackName+'duo-'+i+'-L')
            allCreepNames.push(attackName+'duo-'+i+'-H')
        }
        config.allyCreepNames = allCreepNames;


        ///// Attack Logistics ////////////////////////////////////////
        if(Memory.scheduledAttackState[attackName]==='mustering' || Memory.scheduledAttackState[attackName]==='attacking'){
            logs.startCPUTracker('scheduledAttack-prep');


            // Attack Targets  ////////////////////////////////////////
            let target_ids =['65d2e5b39ddf5e7256143ce8'];
            let destroyResourceBanks=false;
            if(config.attackWhenReady){
                // entry rampart
                let entryWall = false;
                if(Game.rooms[attackRoom]){

                    if(Game.time%10===0 && !entryWall)mb.scanRoom(attackRoom);

                    let hostileIDs = Game.rooms[attackRoom].getEnemyPlayerCreeps();
                    let defenderCount = 0;
                    for(let id of hostileIDs){
                        let fighter = gob(id);
                        if(fighter && fighter.partCount(ATTACK)>20 && fighter.pos.isNearTo(entryPoint)){
                            defenderCount++;
                        }
                    }
                    if(defenderCount>=2){
                        let ramps = mb.getStructures({roomNames:[attackRoom],types:[STRUCTURE_RAMPART]});
                        for(let ramp of ramps){
                            if(ramp.pos.getRangeTo(entryPoint) > 4){
                                entryPoint = ramp;break;
                            }
                        }
                    }


                    entryWall = entryPoint.lookForStructure(STRUCTURE_WALL);

                    if(entryWall){
                        priority_target_ids.push(entryWall.id)
                    }else {
                        entryWall = entryPoint.lookForStructure(STRUCTURE_RAMPART);
                        if(entryWall)
                            target_ids.push(entryWall.id)
                    }
                }
                //console.log('entryWall',entryWall)

                let highPriorityTargets=[STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_LINK];
                let mediumPriorityTargets = [STRUCTURE_SPAWN,STRUCTURE_LAB,STRUCTURE_CONTAINER,STRUCTURE_EXTRACTOR];
                if(config.destroyBanks){
                    mediumPriorityTargets.push(STRUCTURE_STORAGE);
                    mediumPriorityTargets.push(STRUCTURE_TERMINAL);
                }

                if(!entryWall){
                    let structureAnchorLookup = Game.creeps[allCreepNames[0]]?Game.creeps[allCreepNames[0]].pos:config.retreatSpot

                    let priorityTarget = mb.getNearestStructure(structureAnchorLookup,highPriorityTargets,[attackRoom])

                    let mediumTarget = mb.getNearestStructure(structureAnchorLookup,mediumPriorityTargets,[attackRoom])
                    let cleanupTarget = mb.getNearestStructure(structureAnchorLookup,[STRUCTURE_RAMPART],[attackRoom])
                    if(priorityTarget)target_ids.push(priorityTarget.id);
                    else if(mediumTarget)target_ids.push(mediumTarget.id);
                    else if(cleanupTarget)target_ids.push(cleanupTarget.id);
                }

            }
            config.target_ids = target_ids;
            logs.stopCPUTracker('scheduledAttack-prep',false);


            let healerBody ='10*4h1m';
            healerBody='25h25m';
            //healerBody = '16*2h1m+1h1m';

            let dismantlerBody = '10*3w1m+5r5m';
            dismantlerBody='12*2w1m+4*2r1m+1w1m';
            dismantlerBody='23w2r25m';
            let attackerBody = '12*2a1m+4*2r1m+1a1m';
            attackerBody='5r20a25m';


            let readyCount=0;
            let aliveCount=0;
            for(let myCreepName of allCreepNames){
                if(Game.creeps[myCreepName] && config.musterSpot.getRangeTo(Game.creeps[myCreepName])<4){
                    readyCount++;
                }
                if(Game.creeps[myCreepName]){
                    aliveCount++;
                    if(Game.time%10===0)console.log(attackName, myCreepName,Game.creeps[myCreepName].pos)
                }
            }

            if(aliveCount===0 &&  Memory.scheduledAttackState[attackName]==='attacking'){
                Memory.scheduledAttackState[attackName]='ended'
            }

            if(readyCount===(config.duoCount*2) || ( config.dontMuster && aliveCount===(config.duoCount*2) )){
                Memory.scheduledAttackState[attackName]='attacking';
                config.attackWhenReady = true;
            }else{
                if(Memory.scheduledAttackState[attackName]==='mustering' && Game.time%3===0){
                    clog(readyCount+'/'+allCreepNames.length,attackName+' musteredCount=')
                    clog(aliveCount+'/'+allCreepNames.length,attackName+' aliveCount=')
                }
            }

            config.keepSpawning = (Memory.scheduledAttackState[attackName]==='mustering')

            for(let i=0; i<config.duoCount;i++){
                this.duoBois(nodeName,attackName+'duo-'+i,attackRoom,config);
            }


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
     * harvesterBoostPlans -
     * spawnPos -
     * storageBuildSpot -
     */
    stripMineRoomForThorium:function(feederName,roomNameToStrip,bootupContainerId, upgraderSpots,upgradeFeederWaitSpot, upgradeFeederCount, upgraderContainerSpot, upgraderBoostPlans, thorium_id,thoriumTerminalPos,thoriumHarvesterSpots,harvesterBoostPlans,spawnPos,storageBuildSpot){

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
            if(Game.time %10==0)clog('claiming strip mine',roomNameToStrip)
            this.reserverRoom(feederName,roomNameToStrip+'-claim',controller,'1cl1m',true);
        }


        let towers = mb.getStructures({roomNames:[roomNameToStrip],types:[STRUCTURE_TOWER]})

        this.constantGuardRoom(feederName+'-2',roomNameToStrip+'-guard',roomNameToStrip,'4m+10*1a1m+1r1m1m1h',{x:spawnPos.x,y:spawnPos.y-1},false,true);


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
            let exts = mb.countStructures([STRUCTURE_EXTENSION],[roomNameToStrip])
            if(Game.creeps[roomNameToStrip+'-w0'] || !stripSpawn || exts<10)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w0',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w1'] || !stripSpawn || exts<10)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w1',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w2'] || !stripSpawn || exts<10)this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w2',roomNameToStrip,'4w4c4m');
            if(Game.creeps[roomNameToStrip+'-w3'] || !stripSpawn )this.maintainRoadsInRoom(feederName+'-2',roomNameToStrip+'-w3',roomNameToStrip,'4w4c4m');
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
            this.haulResources(feederName+'-2',roomNameToStrip+'-feeder0','10*2c1m',feederStorage,feedTarget,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),100);
            this.haulResources(feederName+'-2',roomNameToStrip+'-feeder1','10*2c1m',feederStorage,feedTarget,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),100);
        }


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
            if(controller.level<6){

                let sPutIn =controller.getContainer();
                if(strippedStorage && sPutIn.storingAtLeast(1500)){
                    sPutIn = strippedStorage
                }

                this.haulResources('Strip-'+roomNameToStrip,'SfeX1','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
                this.haulResources('Strip-'+roomNameToStrip,'SfeX2','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
                this.haulResources('Strip-'+roomNameToStrip,'SfeX3','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
                this.haulResources('Strip-'+roomNameToStrip,'SfeX4','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
                this.haulResources('Strip-'+roomNameToStrip,'SfeX5','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
                this.haulResources('Strip-'+roomNameToStrip,'SfeX6','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
                this.haulResources('Strip-'+roomNameToStrip,'SfeX7','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200);
            }
        }




        if(controller.level >=2){

            spawnPos.createConstructionSite(STRUCTURE_SPAWN,'Strip-'+roomNameToStrip);
            spawnPos.createConstructionSite(STRUCTURE_RAMPART);
            storageBuildSpot.createConstructionSite(STRUCTURE_RAMPART);
            thoriumTerminalPos.createConstructionSite(STRUCTURE_RAMPART);
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
            this.stripMineThorium(thorium_id,thoriumTerminalPos,[feederName+'-2',feederName,feederName+'-2'],thoriumHarvesterSpots,'39w1c10m',200,'W13N15',harvesterBoostPlans)
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
    earlyWarning2: function(spawnName,roomPos){

        let scoutName = this.rotateScouts(spawnName,roomPos.roomName,roomPos.roomName+'-beacon',roomPos);
        //this.scoutRoom(spawnName,roomPos.roomName+'-beacon',roomPos.roomName,roomPos);
        let userIgnores =[ ...BOT_ALLIES,'Source Keeper','Invader']; //
        let hostiles = Game.rooms[roomPos.roomName]?Game.rooms[roomPos.roomName].getHostiles():[];
        let fighters = hostiles.filter(function(hostile){return ( (hostile.partCount(ATTACK)>0 || hostile.partCount(RANGED_ATTACK)>0 || hostile.partCount(HEAL)>0) && !userIgnores.includes(hostile.owner.username) ) });
        if(fighters.length>2){
            Memory.reactorThreats2.count = fighters.length;
            Memory.reactorThreats2.lastSeen = Game.time;
            Memory.reactorThreats2.roomLogs[roomPos.roomName]={
                tick:Game.time,
                owner:fighters[0].owner.username
            }
            let message = fighters.length+' threats detected';
            clog(message,roomPos.roomName)
            if(Game.creeps[scoutName])Game.creeps[scoutName].say(message,true)
        }
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
                [buyResource],roomTraversal.reverse(),(Game.cpu.bucket>4000),suicdeTime

            );

        }
        // go take the resource to sell
        if(!Game.creeps[traderName] || ( Game.creeps[traderName] && Game.creeps[traderName].isEmpty(buyResource) && suicdeTime< Game.creeps[traderName].ticksToLive )  ){
            //clog('going...',traderName)
            this.haulResources(clusterName,traderName,creepBody,
                {id:sourceStorageID,pos:{x:25,y:25,roomName:homeRoom}},
                {id:targetStorageID,pos:{x:25,y:25,roomName:targetRoom}},
                [sellResource],roomTraversal,(Game.cpu.bucket>4000),suicdeTime

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
        if(!feederStorage.storingAtLeast(feederStorageSafetyCap)){
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
        creepNames=[];
        for(let i in upgraderMatrix)
            creepNames.push( prefix+'uX'+((i*1)+1) )
        // clog(creepNames)
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
                this.withdrawThenUpgrade(spawnNameForUpgraders,creepNames[n],upgraderBody,controller.getContainer().id,controller.id,true,moveToPos,upgraderBoostPlans);

        }
        // if we've powered down, lets atleast send 1 mega upgrader, to keep things ticking
        if(!Game.creeps[creepNames[0]] && controller.level<6)
            this.withdrawThenUpgrade(spawnNameForUpgraders,creepNames[0],upgraderBody,controller.getContainer().id,controller.id,true);

        ///////////////////////////////////////////////////////////////////////////////
        // Feeders
        for(let i=0; i<funnelers; i++){
            let cname = spawnNameForFeeders.charAt(0)+'fe'+i;
            if(Game.creeps[cname] || goFullTilt){
                // if the container is full, then wait out of the way for the upgraders to get through
                if(Game.creeps[cname] && !storeToFeed.haveSpaceFor(Game.creeps[cname].storedAmount())){
                    Game.creeps[cname].moveToPos(funnelerWaitSpot);
                }else{
                    this.haulResources(spawnNameForFeeders,cname,funnelerBody,feederStorage, storeToFeed, [RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),150);
                }
            }
        }


    },


    manageInterRoomTrading2:function(){

        let storages={};
        let terminals={};

        // {resource_type:RESOURCE_GHODIUM,storageCap:6000}

        for(let n in nodes){

            if(!nodes[n].online || !nodes[n].terminal() || !nodes[n].storage()){
                continue;
            }
            for(let imp of nodes[n].imports){
                if( !trader.getOpenOrderByDetail(nodes[n].room().name, imp.resource_type) ){
                    let got = nodes[n].terminal().storedAmount(imp.resource_type) + nodes[n].storage().storedAmount(imp.resource_type);
                    if(got < imp.storageCap){
                        let want = imp.storageCap-got;
                        let amount = want>6000?6000:want;
                        trader.createOrder(nodes[n].room().name, imp.resource_type, amount);
                    }
                }


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

        let exportTerminals={};
        let exportBatchSize=6000;
        let importerLookup={};
        for(let clusterName of exporters){
            if(!Game.spawns[clusterName]){clog("No spawn for "+clusterName+". Can't run",'manageInterRoomTrading'); return;}
            let expRoomName = Game.spawns[clusterName].pos.roomName;
            let terminal = mb.getTerminalForRoom(expRoomName);
            if(!terminal){clog("terminal is missing for "+clusterName,'manageInterRoomTrading')}
            if(terminal.cooldown===0)exportTerminals[clusterName]=terminal;
        }
        for(let config of importerConfigs){
            // make sure we dont get ping pong as an importer sends their own imports back out
            if(importerLookup[config.importer]===undefined)
                importerLookup[config.importer]=[];

            importerLookup[config.importer].push(config.resource_type)
        }

        for(let config of importerConfigs){



            if(!Game.spawns[config.importer]){clog("No spawn for "+config.importer+". Can't run",'manageInterRoomTrading');return;}
            let roomName = Game.spawns[config.importer].pos.roomName;
            let impStorage = mb.getStorageForRoom(roomName);
            let impTerminal = mb.getTerminalForRoom(roomName);
            if(!impStorage){clog("storage is missing for "+config.importer,'manageInterRoomTrading');continue;}
            if(!impTerminal){clog("terminal is missing for "+config.importer,'manageInterRoomTrading');continue;}



            for(let exportCluster in exportTerminals){

                let exportTerminal = exportTerminals[exportCluster];

                if(!exportTerminal){clog("terminal is missing for "+exportCluster,'manageInterRoomTrading');continue;}

                // make sure we dont get ping pong as an importer sends resources to themselves
                if(impStorage.pos.roomName===exportTerminal.pos.roomName){
                    //clog("skipped sending to itself",exportCluster)
                    continue;
                }
                // make sure we dont get ping pong as an importer sends their own imports back out
                if(importerLookup[exportCluster] && importerLookup[exportCluster].includes(config.resource_type)){
                    // clog("skipped sending "+config.resource_type+" because this room wants it too",exportCluster)
                    continue;
                }

                let spaceToReceive = (config.storageCap >= (impStorage.storedAmount(config.resource_type) + impTerminal.storedAmount(config.resource_type) + exportBatchSize ));
                if(config.importer=='xxx' && config.resource_type==RESOURCE_ZYNTHIUM_KEANITE/* && exportTerminal.pos.roomName=='W13N15'*/){
                    clog(config,'exporter '+exportCluster);
                    clog(spaceToReceive,'spaceToReceive')
                    clog(exportTerminal.storingAtLeast( exportBatchSize, config.resource_type ),'exportTerminal.storingAtLeast( exportBatchSize, config.resource_type )')
                }

                if( spaceToReceive && exportTerminal.storingAtLeast( exportBatchSize, config.resource_type ) ){

                    let res = exportTerminal.send(config.resource_type,exportBatchSize,roomName)
                    if(res===OK){
                        clog("Sending "+exportBatchSize+" >>["+config.resource_type+"]>> to "+config.importer,'manageInterRoomTrading::'+exportCluster+'='+res)
                        delete exportTerminals[exportCluster]// lets duplicate send actions
                    }
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
        let creepBody = '12c6m';

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

        let roomId = clusterName.charAt(0).toLowerCase()
        if(nodes[roomId].labComplex && !creep.memory.job){

            let haulJob = nodes[roomId].labComplex.takeJob()
            //clog(haulJob,roomId)
            // if(clusterName==='Beta')return
            if( haulJob ){
                //clog('collected new job')
                if(haulJob.action =='fill' && storage.storingAtLeast(creepSpace,haulJob.resource_type)){
                    creep.memory.job ={ target_id:haulJob.id, resource_type:haulJob.resource_type, action:haulJob.action };
                }
                if(haulJob.action =='empty' && storage.haveSpaceFor(creepSpace,haulJob.resource_type)){
                    creep.memory.job ={ target_id:haulJob.id, resource_type:haulJob.resource_type, action:haulJob.action };
                }
                //clog('took job off labComplex')
            }
        }

        // lets first look if any containers need empting
        if(!creep.memory.job){

            for(let config of haulerConfig){
                let obj = Game.getObjectById(config.id);
                if(obj){
                    let pickupAmount = config.phaseOut?1:creepSpace;
                    if(config.action=='empty' && storage.haveSpaceFor(creepSpace,config.resource_type) && obj.storingAtLeast(pickupAmount,config.resource_type) ){
                        creep.memory.job = { target_id:config.id, resource_type:config.resource_type, action:'empty' };
                        break;
                    }
                    let dropAmount = config.fillup?1:creepSpace;
                    if(config.action=='fill' && storage.storingAtLeast(creepSpace,config.resource_type) && obj.haveSpaceFor(dropAmount,config.resource_type) ){
                        creep.memory.job = { target_id:config.id, resource_type:config.resource_type, action:'fill' };
                        break;
                    }
                }
            }
        }
        // now lets look for any import jobs
        if(!creep.memory.job){
            for(let resource_type of imports){
                if(terminal.storingAtLeast(1,resource_type)){
                    creep.memory.job = {target_id:terminal.id,resource_type:resource_type,action:'empty'};
                    break;
                }
            }
        }
        // now lets look for any export jobs
        if(!creep.memory.job){
            for(let exportConf of exports){

                if(
                    storage.storingAtLeast((exportConf.exportOver+creepSpace),exportConf.resource_type)
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
            //if(clusterName==='Beta')clog(job,Game.time)
            let jobTarget = Game.getObjectById(job.target_id);

            if(job.doneLastTick && creep.isEmpty(job.resource_type)){
                creep.memory.job= false;
                //if(clusterName==='Beta')clog("job done")
                return;
            }


            if(job.action=='fill'){

                if(creep.carryingAtleast(1,job.resource_type)){
                    // lets make sure the target still has space
                    let res = creep.transfer(jobTarget,job.resource_type);
                    if(res===ERR_FULL){
                        creep.memory.job = false;creep.say("dumb fck")
                    }
                    if(jobTarget.haveSpaceFor(creep.storedAmount(job.resource_type),job.resource_type) && res ===OK){
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
                    //if(clusterName==='Beta')clog('got resource:'+creep.storedAmount(job.resource_type),job.resource_type)
                    // lets make sure the target still has space
                    if(storage.haveSpaceFor(creep.storedAmount(job.resource_type),job.resource_type) && creep.transfer(storage,job.resource_type)===OK){
                        creep.memory.job.doneLastTick=true;
                    }else{
                        creep.moveToPos(storage);
                    }
                }else{

                    if(jobTarget.storedAmount(job.resource_type)===0){
                        creep.memory.job= false;
                        creep.say('derp!')
                    }

                    // if(clusterName==='Beta')clog('collecting')
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
            if(terminal.storingAtLeast(batchSize,resource_type) && terminal.storingAtLeast(sendEnergyCost,RESOURCE_ENERGY)){
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
        //clog(storage.storingAtLeast(startAt,resource_type),'storage.storingAtLeast('+startAt+','+resource_type+')')
        if(!storage.getMeta().streaming && storage.storingAtLeast(startAt,resource_type)){
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
        if(terminal.storingAmount(resource_type)<amount || (creep && creep.storingAtLeast(1,resource_type)) || amount==undefined){
            this.haulResources(spawnName,cname,'1m20c',storage,terminal,[resource_type]);
        }
    },
    haulResources:function(spawnName,cname,parts,sourceStore,targetStore,resource_types,roomTraversal=[],keepSpawning=true,tickToLiveTo=1,minDrawSize=1,waitSpot=undefined,prioritySpawn = false){

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
        if(!Game.creeps[cname] ){

            this.queueSpawn(spawnName,cname,parts,{},keepSpawning,prioritySpawn);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning ){

            if(creep.ticksToLive<tickToLiveTo && creep.storingLessThan(1,resource_type)){
                creep.suicide();
            }
            // creep.say(resource_type)
            // clog(creep.store.getUsedCapacity(resource_type),resource_type)
            if(creep.store.getUsedCapacity(resource_type)===0){

                if(roomTraversal.length>0 && creep.pos.roomName!==sourceStore.pos.roomName){
                    let res =  this.traverseRooms(creep,roomTraversal);
                    // creep.say("w-r:"+res);
                }else{

                    if(waitSpot && creep.memory.waitFor>0){
                        creep.memory.waitFor--;
                        creep.say("wait")
                        return creep.moveToPos(waitSpot);
                    }

                    if(sourceStore.id==='creep'){

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
                                else
                                    creep.memory.waitFor=25;
                            }
                        }
                    }else{
                        let res = this.actOrMove2(creep,sourceStore,"withdraw",resource_type);
                        if(util.debug)creep.say("w-r:"+res);
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
                    }else{
                        let drop = rp.lookForResource(resource_type)
                        return creep.pickup(drop)
                    }
                }
                if(targetStore.id==="drop"){
                    let rp = new RoomPosition(targetStore.pos.x,targetStore.pos.y,targetStore.pos.roomName);
                    if(creep.pos.isNearTo(rp)){
                        return creep.drop(resource_type);
                    }else{
                        return creep.moveToPos(rp);
                    }
                }

                if(roomTraversal.length>0 && creep.pos.roomName!==targetStore.pos.roomName){

                    let res = this.traverseRooms(creep,roomTraversal.reverse());
                    if(util.debug)creep.say("t-r:"+resource_type.charAt(0)+":"+res);
                }else{
                    let res = 404;
                    //if(creep.name=='thor-1')clog(targetStore.id,resource_type)
                    if(waitSpot && targetStore.store && targetStore.isFull(resource_type)){
                        creep.moveToPos(waitSpot);
                        res = 'wait';
                    }else{
                        res =  this.actOrMove2(creep,targetStore,"transfer",resource_type);
                    }


                    if(util.debug)creep.say("t:"+res);
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
        if(!config.phaseOut)this.rotateScouts(spawnName,roomName,roomName,{x:25,y:25});
        // can not we see the room, then wait for scout
        if(!Game.rooms[roomName]){
            if(Game.time%10===0)console.log("Scouting:",roomName)
            //return;
        }

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
            report:conf.report===undefined?false:conf.report,
            stealFromUsername:conf.stealFromUsername===undefined?false:conf.stealFromUsername,
            swampy:conf.swampy===undefined?false:conf.swampy,
            workerCount:conf.workerCount===undefined?4:conf.workerCount,
            workerBody:conf.workerBody===undefined?'4w4c4m':conf.workerBody,
            harvesterBody:conf.harvesterBody===undefined?'6w1c6m':conf.harvesterBody,
            haulerBody:conf.haulerBody===undefined?'4*2c1m':conf.haulerBody,
            haulToController:conf.haulToController===undefined?false:conf.haulToController,
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

        if(Game.rooms[roomName] && !mb.hasRoom(roomName))mb.scanRoom(roomName);
        if(mb.hasRoom(roomName)){

            let controller = mb.getControllerForRoom(roomName,false);
            if(controller.owner && controller.owner.username!=='MadDokMike' && controller.owner.username!==config.stealFromUsername ){
                console.log("ROOM_SETUP: Error. ",roomName," is already owned")
                return;
            }

            // keep room clear
            let cores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})
            this.keepRoomClearOfLv0InvaderCores(spawnName,'ic-killer-'+roomName,'10a10m',roomName,cores)

            // Firstly, lets go make a claim on the room
            let claimerBody = config.swampy?'1cl5m':'1cl1m';
            if( (!controller.owner || controller.owner.username===config.stealFromUsername )){
                if(Game.time%10===0 && config.report)console.log("ROOM_SETUP: claiming...",roomName)

                this.claimRoom(spawnName,roomName+'-cl',controller,claimerBody,true,true);
            }


            if(cores.length>0){
                return; // we dont want to spawn workers until the core is dealt with.
            }

            if(config.defend){
                let defenderBody = config.swampy?'10m + 4*1a1r + 10m2h':'4m + 4*1a1r + 10m2h';
                if(Game.creeps[roomName+'-guard'] && config.swampy)Game.creeps[roomName+'-guard'].memory.swampCost=1;

                let route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,roomName)
                if(!route)route=[];

                this.fightyBoi(spawnName,roomName+'-guard',defenderBody,roomName,route,{
                    attackStructures:false,
                    waitSpot:conf.defenderSpot
                })
               // this.constantGuardRoom(spawnName,roomName+'-guard',roomName,defenderBody, conf.defenderSpot );
            }

            // now lets set up the harvesters and register and mine stores
            if(config.harvestSources){
                let sources  = mb.getAllSourcesForRoom(roomName,false);
                let harvesterBody = config.swampy?config.harvesterBody+'6m':config.harvesterBody;
                for(let s in sources){
                    let harvyName = roomName+'-h'+s;
                    if(Game.creeps[harvyName] && config.swampy)Game.creeps[harvyName].memory.swampCost=1;
                    if(config.phaseOut && !Game.creeps[harvyName])continue;
                    this.harvestPoint(spawnName,harvyName,harvesterBody,sources[s],false,(!config.phaseOut),true);

                    if(config.haulToController && sources[s].haveContainer()){
                        this.haulResources(spawnName,harvyName+'-h',config.haulerBody,
                            sources[s].getContainer(),{id:'drop',pos:controller.pos},
                            [RESOURCE_ENERGY],[],!config.phaseOut,25,1,false,true)
                    }

                }
            }

            // now lets deploy the workers to draw from all containers
            for(let c=0; c < config.workerCount;c++){
                let bodyPlan = config.workerBody;
                let creepName = roomName+'-w'+c;
                let creep = Game.creeps[creepName];
                if(creep && config.swampy)creep.memory.swampCost = 1;

                if(config.phaseOut && !creep)continue;
                if(creep && creep.pos.roomName===roomName && creep.isWorking() && !creep.isEmpty() && ( !mb.haveConstructions([roomName]) || controller.ticksToDowngrade<2000 ) ){
                    creep.actOrMoveTo("upgradeController",controller)
                }else{
                    this.maintainRoadsInRoom(spawnName,creepName,[roomName],bodyPlan,true,true,true);
                }


            }

        }
    },

    // designed to harvest a source, but first build a container to drop into,then pickup E at feet
    harvestPoint:function(spawnName,cname,bodyPlan,target,watchLair=false, keepSpawning=true,prioritySpawn=false){

        if(!Game.creeps[cname] && !Memory.invaderSeen[target.pos.roomName]){
            this.queueSpawn(spawnName,cname,bodyPlan,{},keepSpawning,prioritySpawn);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(!mb.hasRoom(target.pos.roomName))mb.scanRoom(target.pos.roomName)
            //creep.say(target.pos.roomName)
            if(target.pos.roomName===creep.pos.roomName){

                let dangerIds = creep.room.getDangerousCreeps();
                for(let id of dangerIds){
                    let hostile = gob(id);
                    if(!hostile)continue;
                    let allowedRange = (hostile.owner.username==='Source Keeper')?5:99;
                    if(Game.spawns[spawnName] && (!Game.spawns[spawnName].controller || !Game.spawns[spawnName].controller.safeMode) && hostile.pos.getRangeTo(creep)<allowedRange){
                        creep.say("flee")
                        creep.memory.flee_until = Game.time + 50;
                        return creep.moveToPos(Game.spawns[spawnName])
                    }
                }
                if(watchLair){
                    let lair = gob(creep.memory.lair_id)
                    if(creep.memory.lair_id===undefined){
                        lair = mb.getNearestStructure(target.pos,[STRUCTURE_KEEPER_LAIR],[target.pos.roomName])
                        creep.memory.lair_id = lair.id;
                    }
                    if((lair.ticksToSpawn===undefined || lair.ticksToSpawn<15) ){

                        if(creep.pos.getRangeTo(lair)<8)
                            return creep.moveToPos(rp(25,25,target.pos.roomName))
                        else
                            return creep.say("wait")
                    }

                }

                let source =  Game.getObjectById(target.id)
                let res = creep.actOrMoveTo('dropHarvest',source);
                // creep.say("dh:"+res)
            }else{

                if(creep.memory.flee_until && creep.memory.flee_until>Game.time){
                    if(creep.onRoomEdge() || creep.nearRoomEdge()) {
                        return creep.moveToPos(Game.spawns[spawnName])
                    }
                    return creep.say("dngr!");
                }

                let route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,target.pos.roomName);
                if(route){
                    let res = this.traverseRooms(creep,route);
                    creep.say("trv:"+res);
                    return res;
                }else{
                    return creep.moveToPos(rp(target.pos.x,target.pos.y,target.pos.roomName))
                }

                //this.actOrMove2(creep,target,"harvest");
            }

        }
    },

    harvestAndCollectMineralFromSKRoom:function(nodeName,roomName,harvesterCap=3,
                                                haulerCount =2,storageSafetyCap=50000,
                                                requireScout=false,guardOtherLairs=false,
                                                guardRefreshRate=275, mineSpots=[]){
        let thing = this;

        let storage = Game.rooms[ Game.spawns[nodeName].pos.roomName ].storage;


        if(!storage){
            console.log("harvestAndCollectMineraFromSKRoom:",roomName," no storage")
            return;
        }



        if(mb.isDeadlyRoom(roomName)){
            if(Game.time&10===0)console.log("harvestAndCollectMineraFromSKRoom:",roomName," isDeadlyRoom")
            return;
        }

        if(!mb.hasRoom(roomName)){
            if(Game.rooms[roomName]){
                mb.scanRoom(roomName);
            }else{
                requireScout = true;
            }
        }

        if(Game.rooms[roomName] && Game.time%500===0){
            console.log("harvestAndCollectMineraFromSKRoom:",roomName," scanRoom")
            mb.scanRoom(roomName);
        }
        let invaderCore = mb.getInvaderCore(roomName);
        if(invaderCore){
            mb.markRoomDeadly(roomName);
            let scoutStr = "none";
            if(Game.creeps[roomName+'-scm']){
                scoutStr = roomName+'-scm '+Game.creeps[roomName+'-scm'].pos + " ttl:"+Game.creeps[roomName+'-scm'].ticksToLive
            }
            let msg = Game.time+"::harvestAndCollectMineraFromSKRoom:"+roomName+" markRoomDeadly"+invaderCore.pos+" scout :"+scoutStr;
            Memory.logs.errors.push(msg)
            console.log(msg)
            return;
        }

        // some times we need to keep vision on the room. otherwise kill scout
        if(requireScout)this.scoutRoom(nodeName,roomName+'-scm',roomName)
        else if(Game.creeps[roomName+'-scm'])Game.creeps[roomName+'-scm'].suicide();

        let mineral = mb.getMineralForRoom(roomName);
        // only collect when its full or run code off for the last 1500t
        if(mineral && (mineral.mineralAmount>0 || mineral.ticksToRegeneration>48500 ) ){


            let mineralLair = mineral.getLair();
            if(!mineralLair){
                mineralLair = mb.getNearestStructure(mineral.pos,[STRUCTURE_KEEPER_LAIR],[roomName])
                mineral.setLair(mineralLair);
            }

            let guardActive = false;
            let keepSpawning = storage.storingAtLeast(storageSafetyCap);
            if(mineSpots.length===0)
                mineSpots = mineral.pos.lookForNearbyWalkable(false,false);

            // if in centre sector, we have no sk guard
            let allLairs = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_KEEPER_LAIR]});
            if( allLairs.length>0 ){

                lairIds = [];
                if(guardOtherLairs && mineralLair.ticksToSpawn > 50){
                    for(let lair of allLairs) lairIds.push(lair.id)
                }else{
                    lairIds.push( mineralLair.id )
                }

                this.rotateCreep(roomName+'-min-guard-', function(activeCreepName){
                    thing.constantGuardSKRoom(nodeName,activeCreepName,roomName, lairIds ,'20m20a5h5m',keepSpawning)
                    if(!guardActive && Game.creeps[activeCreepName])guardActive =true;
                },guardRefreshRate)

            }else{
                // proxy the keep spawning as a guard, so we dont drain home room on centre sector
                guardActive = keepSpawning;
            }

            for(let i in mineSpots){
                if(i>=harvesterCap)continue;// safety cap for now, to stop too many harvesters

                this.harvestAndCollectMineralNoContainer(nodeName,mineral.id,mineSpots[i],storage.id,mineral.mineralType,'4*2c1m','20W10c10m','-'+i,haulerCount,false,guardActive)
            }

        }



    },

    harvestAndCollectMineralWithContainer:function(spawnName,mineral_id,container_id,store_id,mineral_type,haulerBody='1m2c',harvesterBody='10W2m',creep_suffix=''){

        let roomName = Game.spawns[spawnName].pos.roomName;
        let container = gob(container_id)
        if(container){
            if(!container.isFull(mineral_type))this.harvestMineral(spawnName,spawnName.charAt(0)+'hx'+creep_suffix,harvesterBody,{id:mineral_id,pos:{x:1,y:1,roomName:roomName}},mineral_type);
            if(Game.creeps[spawnName.charAt(0)+'hx'+creep_suffix])Game.creeps[spawnName.charAt(0)+'hx'+creep_suffix].moveTo(gob(container_id));

            this.haulResources(spawnName,spawnName.charAt(0)+'tx'+creep_suffix,haulerBody,
                gob(container_id),
                gob(store_id),[mineral_type],[],(Game.cpu.bucket>4000),200 );
        }


    },

    harvestAndCollectMineralNoContainer:function(spawnName,mineral_id,standingSpot,store_id,mineral_type,haulerBody='1m2c',harvesterBody='10W2m',creep_suffix='',haulerCount=1,haulerWaitSpot=false,keepSpawning=true){

        let roomName = Game.spawns[spawnName].pos.roomName;
        let mineral = gob(mineral_id);
        let harveyName = spawnName.charAt(0)+'hx-'+standingSpot.roomName+creep_suffix;
        this.harvestMineral(spawnName,harveyName,harvesterBody,{id:mineral_id,pos:{x:1,y:1,roomName:roomName}},mineral_type,standingSpot,keepSpawning);

        for(let h=0; h<haulerCount; h++){
            let haulerName = spawnName.charAt(0)+'tx-'+standingSpot.roomName+creep_suffix+'-'+h;

            if(haulerName==='Atx-E6N6-2-2'){
                console.log("yo")
            }
            if(Game.creeps[harveyName] || Game.creeps[haulerName] ){

                this.haulResources(spawnName,haulerName,haulerBody,
                    {id:'creep',pos:standingSpot},
                    {id:store_id,pos:{x:1,y:1,roomName:roomName}},[mineral_type],[],keepSpawning,200,1,haulerWaitSpot );
            }
        }
    },
    harvestMineral:function(spawnName,cname,bodyPlan,target,resource_type,standingSpot=undefined, watchLair=false,keepSpawning=true){
        let mineral = (target)?gob(target.id):false;
        // clog(standingSpot)
        if(!Game.creeps[cname] && mineral && (mineral.amount>0 || mineral.mineralAmount>0) ){

            this.queueSpawn(spawnName,cname,bodyPlan,{},keepSpawning);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            // we must have just lost vision, keep moving to target
            if(!mineral)return creep.moveToPos(target.pos)

            let dangerIds = creep.room.getDangerousCreeps();
            for(let id of dangerIds){
                let hostile = gob(id);
                if(hostile && hostile.pos.getRangeTo(creep)<5){
                    return creep.moveToPos(rp(25,25,creep.pos.roomName))
                }
            }

            if(watchLair && creep.pos.roomName === mineral.pos.roomName){
                let lair = gob(creep.memory.lair_id)
                if(creep.memory.lair_id===undefined){
                    lair = mb.getNearestStructure(target.pos,[STRUCTURE_KEEPER_LAIR],[target.pos.roomName])
                    creep.memory.lair_id = lair.id;
                }
                if(lair && (lair.ticksToSpawn===undefined || lair.ticksToSpawn<25) ){

                    if(creep.pos.getRangeTo(lair)<5)
                        return creep.moveToPos(rp(25,25,target.pos.roomName))
                    else
                        return creep.say("wait")
                }

            }




            if(standingSpot && !creep.pos.isEqualTo(standingSpot)){
                creep.moveToPos(standingSpot);
                return;
            }
            let drop = (Game.time%10===0)?creep.pos.lookForNearbyResource(resource_type):false;
            //clog(drop.id,cname)
            if(drop){
                creep.pickup(drop)
            }
            if(mineral)this.actOrMove2(creep,mineral,"harvest",resource_type);
        }
    },
    harvestMineralAndTransfer:function(spawnName,cname,bodyPlan,target,transfer_id,resource_type,standingSpot,boostPlans=[],speedy=false,harvestIfContainerFull=false){
        let mineral = (target)?gob(target.id):false;
        //clog(mineral)
        if(!Game.creeps[cname] && mineral && (mineral.amount>0 || mineral.mineralAmount>0) ){
            let mem= {};
            if(boostPlans.length>0){
                mem.boostPlans = boostPlans;
            }
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname,{memory:mem})
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            let container = gob(transfer_id);

            if(creep.memory.boostPlans){
                creep.runBoostPlan();return;
            }

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
    claimRoom:function(spawnName,cname,target,bodyPlan='1cl1m',keepSpawning=true,prioritySpawn=false){

        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,bodyPlan,{},keepSpawning,prioritySpawn);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            if(creep.pos.roomName===target.pos.roomName) {

                if ( (controller.reservation && controller.reservation.username !== 'MadDokMike') || (controller.owner && controller.owner.username !== 'MadDokMike')  ) {

                    creep.say("atck:" + this.actOrMove2(creep, target, "attackController"));

                } else  {
                    creep.signController(controller, "🥑");
                    let res = creep.actOrMoveTo('claimController',controller);
                    if(res===ERR_GCL_NOT_ENOUGH){
                        res = creep.actOrMoveTo('reserveController',controller);
                    }
                    creep.say("claim:" + res);
                }
            }else{
                let route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,target.pos.roomName);
                if(route){
                    let res = this.traverseRooms(creep,route);
                    creep.say("trv:"+res);
                    return res;
                }else{
                    return creep.moveToPos(rp(target.pos.x,target.pos.y,target.pos.roomName))
                }
            }
        }
    },
    reserverRoom:function(spawnName,cname,target,bodyPlan='2cl2m',attemptClaim=false,keepSpawning=true){

        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname] && (!controller || (controller.level<1) ) ){
            this.queueSpawn(spawnName,cname,bodyPlan,{},keepSpawning);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];




            if(controller && controller.owner && controller.owner.username!='MadDokMike'){

                this.actOrMove2(creep,target,"attackController");
            }else if(controller && controller.reservation && controller.reservation.username!='MadDokMike'){

                this.actOrMove2(creep,target,"attackController");
            }
            else if(controller && (!controller.sign || (controller.sign &&  controller.sign.username!='MadDokMike') ) ){
                this.actOrMove2(creep,target,'signController',"🥑 ");
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
            this.queueSpawn(spawnName,cname,bodyPlan,{},true,true);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            // creep.say('☕',true)
            creep.moveOffRoomEdge();

            // if(creep.name=='Barry1')clog(roomTraversal);

            // if(creep.pos.roomName=='W14N14')creep.memory.riskyBiscuits=true;
            if(roomTraversal.length===0) {
                let route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName, roomName);
                if (route) roomTraversal = route;
            }
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

    enslaveRoom:function(spawnName,cname,target,bodyPlan='1m1cl'){

        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            clog(this.actOrMove2(creep,target,'signController',"Vassal 001."));

        }
    },
    cleanupRoom: function(spawnName,cname,roomName,bodyPlan='10*1w1m'){

        let room = Game.rooms[roomName];
        if(!Game.creeps[cname] && Memory.stuffToClean==true){

            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            if( creep.pos.roomName === roomName){

                if(!mb.hasRoom(roomName))mb.scanRoom(roomName)
                // ignore STRUCTURE_CONTAINER because they are often my own mines
                let obj = mb.getNearestStructure(
                    creep.pos,
                    [STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_STORAGE,STRUCTURE_TERMINAL,STRUCTURE_LINK,STRUCTURE_EXTRACTOR,STRUCTURE_LAB,STRUCTURE_RAMPART],
                    [roomName]
                );
                if(roomName=='W17N18')clog(obj.id,obj.pos)
                if(obj){
                    Memory.stuffToClean=true;
                    creep.say(creep.actOrMoveTo('dismantle',obj));
                }else{
                    Memory.stuffToClean=false;
                }

            }else{
                creep.moveOffRoomEdge();
                creep.moveToPos(new RoomPosition(25,25,roomName));
            }

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
                                {attribute:'storingAtLeast',operator:'fn',value:[1]}]
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
    pickupSKRoomDrops:function(spawnName,cname,roomName,parts='5*1c1m',keepSpawning=true){

        if(!Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,parts,{},keepSpawning)
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            if(creep.isEmpty() && creep.pos.roomName!==roomName){
                return creep.moveToPos(rp(25,25,roomName))
            }

            if(creep.isFull()) {

                return creep.actOrMoveTo('transfer',Game.spawns[spawnName].room.storage,RESOURCE_ENERGY);


            }else {

                let drop = creep.getDroppedEnergy();
                if(drop){
                    return creep.actOrMoveTo("pickup",drop);
                }else{
                    creep.say('no E')
                    return creep.moveToPos(rp(25,25,roomName))
                }
            }
        }
    },
    maintainRoadToSource:function(spawnName,cname,srcTarget,storage_id,parts='1w5c3m',keepSpawning=true,priority=false){
        // todo
        if(!Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,parts,{},keepSpawning,priority)
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning) {
            let creep = Game.creeps[cname];
            let storage = gob(storage_id);

            if(creep.isEmpty()){
                if(creep.pos.roomName===srcTarget.pos.roomName){
                    creep.actOrMoveTo('withdraw')
                }
            }
        }
    },

        maintainRoadsInRoom:function(spawnName,cname,roomNames,parts,harvestSources=true,keepSpawning=true,priority=false){

        if(!Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,parts,{},keepSpawning,priority)
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.checkAndUpdateState();

            if(typeof roomNames ==='string'){
                roomNames = [roomNames];
            }

            if(!roomNames.includes(creep.pos.roomName)){
                let route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,roomNames[0]);
                if(route){
                    let res = this.traverseRooms(creep,route);
                    creep.say("trv:"+res);
                    return res;
                }else{
                    return creep.moveToPos(rp(25,25,roomNames[0]))
                }
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
                if(!target || target.hits===target.hitsMax){
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
                    return creep.moveToPos(rp(25,25,roomNames[0]))
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
                    let source = creep.getNearestSource(roomNames,false);
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
                this.withdrawThenBuild(spawnName,builderName,builderBody,container_id,id);
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

                this.haulResources(spawnName,hName,haulerBody,gob(store_id),gob(container_id),[RESOURCE_ENERGY],[],(Game.cpu.bucket>4000),200 );
            }
        }
        if(Game.creeps[builderName])Game.creeps[builderName].say(haulersAlive+'/'+haulerCount+' haulers')
    },
    withdrawThenBuild: function(spawnName,cname,parts,container_id,site_id, WithdrawOnBuild=false,keepSpawning=true,prioritySpawn=false){
        let site = Game.getObjectById(site_id);
        let container = Game.getObjectById(container_id);

        if(site && container && site && !Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,parts,{},keepSpawning,prioritySpawn);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            //creep.say('b:')
            creep.checkAndUpdateState();

            if(creep.isWorking()) {

                if(site){
                    creep.say(creep.actOrMoveTo('build',site));
                    if(WithdrawOnBuild && container){
                        creep.withdraw(container,RESOURCE_ENERGY)
                    }
                }

            }else if(creep.isCollecting()) {

                if(container){
                    creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
                }
            }
        }
    },
    withdrawThenRepair: function(spawnName,cname,parts,container_id,target_id,WithdrawOnRepair=false){
        let target = Game.getObjectById(target_id);
        let container = Game.getObjectById(container_id);
        if(container && target && !Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,parts,{},true);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            //creep.say('r:')
            creep.checkAndUpdateState();

            if(creep.isWorking()) {

                if(target){
                    creep.actOrMoveTo('repair',target);
                    if(WithdrawOnRepair && container){
                        creep.withdraw(container,RESOURCE_ENERGY)
                    }
                }

            }else if(creep.isCollecting()) {

                if(container){
                    creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY);
                }
            }
        }
    },
    withdrawThenUpgrade: function(spawnName,cname,parts,container_id,controller_id,turbo=false,standingSpot=false,keepSpawning=true,boostPlans=[]){

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
            this.queueSpawn(spawnName,cname,parts,{memory:mem},keepSpawning)
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

            if(creep.isWorking()||turbo) {

                let controller = Game.getObjectById(controller_id);


                if(controller){
                    if(turbo){
                        let drop = creep.pos.lookForNearbyResource(RESOURCE_ENERGY);
                        if(drop){
                            creep.pickup(drop)
                        }else{
                            creep.say(creep.actOrMoveTo('withdraw',container,RESOURCE_ENERGY));
                        }

                    }
                    if(standingSpot)creep.act('upgradeController',controller);
                    else creep.actOrMoveTo('upgradeController',controller);
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

            Game.spawns[spawnName].spawnCreepX(bodyPlan,cname)
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
    farmStructureThenTransfer: function(spawnName,cname,parts,old_wall_ids,transfer_id,standingSpot=false,speedy=false){

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

            if(standingSpot && !creep.pos.isEqualTo(standingSpot)){
                creep.moveToPos(standingSpot);
                return;
            }

            if(standingSpot && !creep.pos.isEqualTo(standingSpot)){
                creep.moveToPos(standingSpot);
                return;
            }

            if(Game.time%10===0){
                let blobs = objWithStore.pos.lookFor(LOOK_ENERGY);
                if(blobs.length>0)
                    creep.act("pickup",blobs[0]);
            }

            if(creep.store.getFreeCapacity(RESOURCE_ENERGY)==0) {


                if(objWithStore){
                    creep.actOrMoveTo('transfer',objWithStore,RESOURCE_ENERGY);
                }

            }else {

                if(oldWall){
                    oldWall.notifyWhenAttacked(false);
                    if(oldWall.isNotMarkedForDismantle())oldWall.markForDismantling();
                    creep.actOrMoveTo('dismantle',oldWall);
                }
                if(speedy){
                    if(objWithStore){
                        creep.actOrMoveTo('transfer',objWithStore,RESOURCE_ENERGY);
                    }
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
                    this.breakStructures('doesnae-matter',cname,sapperParts,targetRoom,target_ids);
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
    attackMission: function(spawnName,targetRoom,bodyPlan='1a1m',attackName,attackConfig={},refreshRate=350,useMapRoute=false){
        if(Memory.attacks===undefined)Memory.attacks= {};
        if( !Game.spawns[spawnName] )return;
        let route = [];
        if(useMapRoute)
            route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,targetRoom);
        if(useMapRoute && !route){
            console.log("ATTACK ERROR: not route for "+Game.spawns[spawnName].pos.roomName+" >> "+targetRoom)
            return;
        }

        let thing = this;

        this.rotateCreep(attackName+'-', function(activeCreepName){

            if(Memory.attacks[targetRoom]===undefined)Memory.attacks[targetRoom]=-5;

            if(Game.creeps[activeCreepName] && Memory.attacks[targetRoom]!=='stop')
                Memory.attacks[targetRoom] = Game.creeps[activeCreepName].ticksToLive
            // if we had the creep and then its gone, but TTL is over 5, assume it was killed
            if( !Game.creeps[activeCreepName] && Memory.attacks[targetRoom]>50 )Memory.attacks[targetRoom] = activeCreepName+' defeated:'+Game.time;

            if( Number.isInteger(Memory.attacks[targetRoom]) || Game.creeps[activeCreepName]  ){

                if(attackConfig.useHealer)
                    attackConfig.healerName=activeCreepName+'-healer';


                if(attackConfig.fightyBoi2){
                    thing.fightyBoi2(spawnName,activeCreepName,bodyPlan,targetRoom,route,attackConfig)
                }
                else if(attackConfig.teamCount){
                    for(let i=0;i<attackConfig.teamCount;i++){
                        thing.fightyBoi(spawnName,activeCreepName+'-'+i,bodyPlan,targetRoom,route,attackConfig)
                    }
                }else{
                    thing.fightyBoi(spawnName,activeCreepName,bodyPlan,targetRoom,route,attackConfig)
                }

                if(attackConfig.useHealer && attackConfig.keepSpawning) {
                    if (Game.creeps[attackConfig.healerName]
                        && !Game.creeps[attackConfig.healerName].spawning
                        && Game.creeps[attackConfig.healerName].memory.phase === 'spawning'
                        && Game.creeps[activeCreepName]){
                        Game.creeps[attackConfig.healerName].memory.phase = 'following';
                    }
                    thing.duoHealer(spawnName,attackConfig.healerName,attackConfig.healerBody,activeCreepName)
                }


                if(attackConfig.useBreaker){
                    let retreatTo = attackConfig.retreatSpot?attackConfig.retreatSpot:Game.spawns[spawnName]
                    thing.breakStructures(spawnName,targetRoom+'-br','10w10m',targetRoom,[],'all',retreatTo,attackConfig.keepSpawning)
                }


            }

        },refreshRate)


    },
    attackMission2: function(spawnName,targetRooms,bodyPlan='1a1m',attackName,attackConfig={},refreshRate=350,useMapRoute=false){


        try{
            if(Memory.attacks===undefined)Memory.attacks= {};
            if( !Game.spawns[spawnName] )return;
            let route = [];
            if(useMapRoute)
                route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,targetRooms[0]);
            if(useMapRoute && !route){
                console.log("ATTACK ERROR: not route for "+Game.spawns[spawnName].pos.roomName+" >> "+targetRooms[0])
                return;
            }

            let thing = this;

            this.rotateCreep(attackName+'-', function(activeCreepName){

                if(Memory.attacks[attackName]===undefined)Memory.attacks[attackName]=-5;

                if(Game.creeps[activeCreepName] && Memory.attacks[attackName]!=='stop')
                    Memory.attacks[attackName] = Game.creeps[activeCreepName].ticksToLive
                // if we had the creep and then its gone, but TTL is over 5, assume it was killed
                if( !Game.creeps[activeCreepName] && Memory.attacks[attackName]>50 )Memory.attacks[attackName] = activeCreepName+' defeated:'+Game.time;

                if( Number.isInteger(Memory.attacks[attackName]) || Game.creeps[activeCreepName]  ){

                    if(attackConfig.useHealer)
                        attackConfig.healerName=activeCreepName+'-healer';

                    else if(attackConfig.teamCount){
                        /*for(let i=0;i<attackConfig.teamCount;i++){
                            thing.fightyBoi(spawnName,activeCreepName+'-'+i,bodyPlan,targetRoom,route,attackConfig)
                        }*/
                    }else{
                        thing.fightyBoi2(spawnName,activeCreepName,bodyPlan,targetRooms,route,attackConfig)
                    }

                    if(attackConfig.useHealer && attackConfig.keepSpawning) {
                        if (Game.creeps[attackConfig.healerName]
                            && !Game.creeps[attackConfig.healerName].spawning
                            && Game.creeps[attackConfig.healerName].memory.phase === 'spawning'
                            && Game.creeps[activeCreepName]){
                            Game.creeps[attackConfig.healerName].memory.phase = 'following';
                        }
                        thing.duoHealer(spawnName,attackConfig.healerName,attackConfig.healerBody,activeCreepName)
                    }


                    if(attackConfig.useBreaker){
                        let retreatTo = attackConfig.retreatSpot?attackConfig.retreatSpot:Game.spawns[spawnName]
                        thing.breakStructures(spawnName,attackName+'-br','10w10m',targetRooms[0],[],'all',retreatTo,attackConfig.keepSpawning)
                    }


                }

            },refreshRate)
        }catch (e) {
            console.log("ERROR:attackMission2",e)
            console.log(e.stack)
        }




    },
    harassRemote: function(spawnName,targetRoom,bodyPlan='1a1m',attackConfig={},refreshRate=350,useMapRoute=false){
        if(Memory.attacks===undefined)Memory.attacks= {};
        if( !Game.spawns[spawnName] )return;
        let route = [];
        if(useMapRoute)
            route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,targetRoom);
        if(useMapRoute && !route){
            console.log("ATTACK ERROR: not route for "+Game.spawns[spawnName].pos.roomName+" >> "+targetRoom)
            return;
        }

        let thing = this;

        this.rotateCreep('peltast-'+targetRoom+'-', function(activeCreepName){

            if(Memory.attacks[targetRoom]===undefined)Memory.attacks[targetRoom]=-5;

            if(Game.creeps[activeCreepName] && Memory.attacks[targetRoom]!=='stop')
                Memory.attacks[targetRoom] = Game.creeps[activeCreepName].ticksToLive
            // if we had the creep and then its gone, but TTL is over 5, assume it was killed
            if( !Game.creeps[activeCreepName] && Memory.attacks[targetRoom]>50 )Memory.attacks[targetRoom] = activeCreepName+' defeated:'+Game.time;

            if( Number.isInteger(Memory.attacks[targetRoom]) || Game.creeps[activeCreepName]  ){

                if(attackConfig.useHealer)
                    attackConfig.healerName=activeCreepName+'-healer';



                if(attackConfig.teamCount){
                    for(let i=0;i<attackConfig.teamCount;i++){
                        thing.fightyBoi(spawnName,activeCreepName+'-'+i,bodyPlan,targetRoom,route,attackConfig)
                    }
                }else{
                    thing.fightyBoi(spawnName,activeCreepName,bodyPlan,targetRoom,route,attackConfig)
                }

                if(attackConfig.useHealer) {
                    if (Game.creeps[attackConfig.healerName]
                        && !Game.creeps[attackConfig.healerName].spawning
                        && Game.creeps[attackConfig.healerName].memory.phase === 'spawning'
                        && Game.creeps[activeCreepName]){
                            Game.creeps[attackConfig.healerName].memory.phase = 'following';
                    }
                    thing.duoHealer(spawnName,attackConfig.healerName,attackConfig.healerBody,activeCreepName)
                }


                if(attackConfig.useBreaker){
                    let retreatTo = attackConfig.retreatSpot?attackConfig.retreatSpot:Game.spawns[spawnName]
                    thing.breakStructures(spawnName,targetRoom+'-br','10w10m',targetRoom,[],'all',retreatTo)
                }


            }

        },refreshRate)

    },
    /**
     *
     * @param sring spawnName
     * @param string cname
     * @param string bodyPlan
     * @param string targetRoom
     * @param Array roomTraversal
     * @param Object config
     *      -> RoomPosition config.retreatSpot -> [default:spawn] where to retreat to, if in danger
     *      -> {X:1,Y:1} config.waitSpot -> [default:(25,25)] where to wait, in target room
     *
     *      -> int config.attackRange -> [default:99] how far to react-to/chase creeps to.
     *      -> bool config.attackCivilians -> [default:true] true/false to attack and kill civilian creeps
     *      -> bool config.attackStructures -> [default:true] true/false to attack and destroy structures
     *      -> array config.targetStructureTypes ->  [default:[road,container] ] what kind of structures to target
     * @param attackStructures
     * @returns {*}
     */
    fightyBoi: function(spawnName,cname,bodyPlan,targetRoom,roomTraversal=[],config={}){

        // TEST: maxRange
        // CODE: if collective power of X creeps in 5 is too much, then dodge out
        // CODE: kamikazeSpot
        // CODE: public message
        // CODE: ability to bounce between remotes
        // CODE: track if they're kiting and abandon
        // CODE : can catch if move speed is slower
        // CODE: split flee code to kite and gfo. When kiting, want to keep dist=3. when gfo...gfo
        // CODE: maybe not turn around if enemy can still hurt us. just keep kiting until dead? we are getting chip dmg

        config.retreatSpot =config.retreatSpot?config.retreatSpot:Game.spawns[spawnName].pos;
        config.kiteSpots =config.kiteSpots?config.kiteSpots:[];
        config.waitSpot = config.waitSpot?config.waitSpot:{x:25,y:25};
        config.attackRange =config.attackRange?config.attackRange:99;
        config.reckless =config.reckless!==undefined?config.reckless:false;
        config.attackCivilians =config.attackCivilians!==undefined?config.attackCivilians:true;
        config.attackStructures = config.attackStructures!==undefined?config.attackStructures:true;
        config.healerName =config.healerName?config.healerName:false;
        config.targetStructureTypes =config.targetStructureTypes?config.targetStructureTypes:[STRUCTURE_CONTAINER,STRUCTURE_ROAD];
        config.keepSpawning = config.keepSpawning!==undefined?config.keepSpawning:true;
        config.spawnPriority = config.spawnPriority!==undefined?config.spawnPriority:false;
        config.avoidSkeepers = config.avoidSkeepers!==undefined?config.avoidSkeepers:true;



        let healer = config.healerName?Game.creeps[config.healerName]:false;

        if(!Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,bodyPlan,{},config.keepSpawning,config.spawnPriority);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            creep.memory.avoidSkeepers = config.avoidSkeepers;

            if(creep.memory.kiteIndex===undefined){
                creep.memory.kiteIndex=0;
            }

            let waitingPosition = rp(config.waitSpot.x,config.waitSpot.y,targetRoom);

            if(creep.memory.flee_from_id){
                let hostile = gob(creep.memory.flee_from_id);
                // are we now stronger?
                if( hostile && creep.isMorePunchyThan(hostile) && creep.isMoreShootyThan(hostile) ){

                    // hostile has been weakened. stop fleeing
                    creep.memory.flee_from_id=false;
                    creep.memory.hostile_dies_at = false;
                }
                if(creep.memory.hostile_dies_at < Game.time || (creep.pos.roomName===targetRoom && !hostile) ){

                    creep.memory.flee_from_id=false;
                    creep.memory.hostile_dies_at = false;
                }else{
                    creep.heal(creep);
                    if(hostile && creep.partCount(RANGED_ATTACK))creep.rangedAttack(hostile);


                    if(creep.memory.flee_reason==='kiteable' && config.kiteSpots.length>0 ){


                        if(creep.pos.isNearTo( config.kiteSpots[creep.memory.kiteIndex] )){
                            creep.memory.kiteIndex++;
                        }
                        if(creep.memory.kiteIndex>=config.kiteSpots.length){
                            creep.memory.kiteIndex=0;
                        }
                        if(!hostile || creep.pos.getRangeTo(hostile)<=3)creep.moveToPos( config.kiteSpots[creep.memory.kiteIndex] );
                        if(hostile &&  creep.pos.getRangeTo(hostile)>3)creep.moveToPos( hostile );

                    }else{
                        if(!hostile || creep.pos.getRangeTo(hostile)<=3)creep.moveToPos(config.retreatSpot);
                        if(hostile &&  creep.pos.getRangeTo(hostile)>3)creep.moveToPos( hostile );
                        creep.moveOffRoomEdge();

                    }


                    return;
                }
            }

            if(creep.pos.roomName===targetRoom){

                let target = false;
                let closestTargetDistance = 99;
                let flee = false;
                creep.memory.avoidEdges = true;

                //////// Check Hostile Targets ///////////////////////////////////
                let hostileIDs = (Game.rooms[targetRoom])?Game.rooms[targetRoom].getDangerousCreeps(1):[];
                let hostilesIn3 = 0;
                if(hostileIDs.length>0){

                    for(let id of hostileIDs){
                        let hostile = gob(id);
                        if(!hostile)continue;
                        if(config.avoidSkeepers && hostile.owner.username==='Source Keeper')continue;

                        let rangeToCreep = hostile.pos.getRangeTo(creep);
                        if(rangeToCreep<=3)hostilesIn3++;

                        // Rules to follow:
                        // hostile IS more Punchy & more shooty >> ignore, then flee when close
                        // hostile IS less Punchy & more shooty >> ignore, then flee when close
                        // hostile IS more Punchy & less shooty >> approach, then kite
                        // hostile IS less Punchy & less shooty >> approach, then chase
                        // collapse above rules to this code:

                        // are we likely to get kited/out-shot? then run off early
                        if(hostile.canOutShoot(creep)){
                            if(rangeToCreep <= 5 )
                                flee = "too-op";
                           // else >> dont do this. it break target selection sometimes, when we can outshoot and out fight. we want to chase
                                //continue;//we don't want to select for a target. just ignore until closer
                        }
                        // if hostile more puncy, but in shoot range we could flee and kite this bitch
                        if(rangeToCreep <= 3 && hostile.isMorePunchyThan(creep)){
                            flee = "kiteable";// close enough to kite.
                            creep.rangedAttack(hostile); // get a cheeky shot in
                        }

                        if(config.reckless && creep.partCount(ATTACK)>0)flee= false;

                        if(flee){
                            creep.memory.flee_reason = flee;
                            creep.memory.flee_from_id = hostile.id;
                            creep.memory.hostile_dies_at = Game.time + hostile.ticksToLive;
                            // run awaaayyy
                            if(creep.memory.flee_reason==='kiteable' && config.kiteSpots.length>0 ){
                                return creep.moveToPos(config.kiteSpots[ creep.memory.kiteIndex ]);
                            }else{
                                return creep.moveToPos(config.retreatSpot);
                            }
                        }

                        // if we can punch MF, then lets punch the closest
                        if(rangeToCreep < closestTargetDistance ){
                            target = hostile;
                            closestTargetDistance = rangeToCreep;
                        }
                    }
                }
                //////// Heal if safe from Hostiles ///////////////////////////////////
                if( (closestTargetDistance > 1 || creep.partCount(ATTACK)===0 ) && creep.hits < creep.hitsMax){
                    creep.heal(creep); // heal if hurt and out of punch range
                }
                else if(closestTargetDistance !==1 && closestTargetDistance <= 4){

                    creep.heal(creep);//pre-heal when close
                }


                if(!creep.memory.scanned){
                    mb.scanRoom(targetRoom);
                    creep.memory.scanned=true;
                }

                //////// Pick Civilian Target ///////////////////////////////////
                if(!target && config.attackCivilians) {
                    // we we lock on civies, then we don't get to count them and RMA
                    // = gob(creep.memory.civillian_id);
                    //if (target)
                    closestTargetDistance = creep.pos.getRangeTo(target);

                    if (!target) {
                        let civilianIDs = Game.rooms[targetRoom].getEnemyPlayerCivilians();
                        closestTargetDistance = 99;
                        for (let id of civilianIDs) {
                            let civilian = gob(id);
                            if (!civilian) continue;

                            let dist = creep.pos.getRangeTo(civilian);

                            if(dist<=3)hostilesIn3++;

                            if (dist < closestTargetDistance) {
                                target = civilian;
                                closestTargetDistance = dist;
                                creep.memory.civillian_id = target.id;
                                creep.memory.structure_id = false;
                            }
                        }
                    }
                }
                //////// ELSE Pick structure Target ///////////////////////////////////
                if(!target && config.attackStructures && creep.memory.structure_id !=="none"){
                    target = gob(creep.memory.structure_id);

                    if(!target){
                        target = mb.getNearestStructure(creep.pos,config.targetStructureTypes,[targetRoom]);
                        if(target){
                            creep.memory.structure_id= target.id;
                        }else{
                            creep.memory.structure_id="none"
                        }
                    }
                    if(target)closestTargetDistance = creep.pos.getRangeTo(target)
                }
                //clog(hostilesIn3,creep.name+" hostilesIn3")
                if(target){


                    if(cname==='bob'){
                        console.log(creep.name,config.attackStructures,"target:",target.id,target.name,target.pos, " range:",closestTargetDistance);
                    }


                    // if target is a creep:
                    if(target.body){
                        if(healer && creep.pos.getRangeTo(healer)>=2 ){
                            creep.say("wait");
                            rangeToWaitingPos = 200;
                        }

                        // don't move towards targets on/close to room edge, to avoid getting pinged out of the room
                        if(!target.onRoomEdge() && !target.nearRoomEdge() ){
                            // only chase, if its in the attack buble of the waiting spot
                            let rangeToWaitingPos = target.pos.getRangeTo(waitingPosition);
                            let dontMoveCloser = (creep.partCount(RANGED_ATTACK)>0&&creep.partCount(ATTACK)===0&&closestTargetDistance===3)
                            let stepBack = (creep.partCount(RANGED_ATTACK)>0&&creep.partCount(ATTACK)===0&&closestTargetDistance<3)
                            // if we are ranged only and too close, then step back
                            if(stepBack){
                                let newDir = creep.pos.getReverseDirectionTo(target);
                                creep.move(newDir);
                            }
                            // IF we are chasing, then we want to always call a move intent, to insure we keep pace if its moving
                            else if(rangeToWaitingPos <= config.attackRange && !dontMoveCloser)creep.moveToPos(target);
                        }
                    }else if(closestTargetDistance>1){
                        // non-creeps are fixed targets so just use normal pathing code
                        creep.moveToPos(target);
                    }

                    if(closestTargetDistance===1)creep.attack(target);
                    if(hostilesIn3>1 && creep.partCount(RANGED_ATTACK))creep.rangedMassAttack()
                    else if(closestTargetDistance < 4 && creep.partCount(RANGED_ATTACK))creep.rangedAttack(target);

                }else{
                    creep.say("mTW")
                    creep.moveToPos(waitingPosition)
                }


            }else{
                creep.moveOffRoomEdge();

                if(  creep.hits < creep.hitsMax){
                    creep.heal(creep); // heal if hurt and out of punch range
                }


                if(healer && creep.pos.getRangeTo(healer)>=2 ){
                    creep.say("wait");
                    return;
                }

                let hostileIds = creep.room.getDangerousCreeps();
                for(let id of hostileIds){
                    let hostile = gob(id);
                    if(!hostile)continue;
                    creep.rangedAttack(hostile);
                    if(creep.partCount(ATTACK)>0)return creep.actOrMoveTo('attack',hostile);
                }

                if(roomTraversal.length>0){
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{

                    creep.moveToPos(waitingPosition)
                }

            }

        }

    },
    /**
     *
     * @param sring spawnName
     * @param string cname
     * @param string bodyPlan
     * @param array targetRoomNames
     * @param Array roomTraversal
     * @param Object config
     *      -> RoomPosition config.retreatSpot -> [default:spawn] where to retreat to, if in danger
     *      -> {X:1,Y:1} config.waitSpot -> [default:(25,25)] where to wait, in target room
     *
     *      -> int config.attackRange -> [default:99] how far to react-to/chase creeps to.
     *      -> bool config.attackCivilians -> [default:true] true/false to attack and kill civilian creeps
     *      -> bool config.attackStructures -> [default:true] true/false to attack and destroy structures
     *      -> array config.targetStructureTypes ->  [default:[road,container] ] what kind of structures to target
     * @param attackStructures
     * @returns {*}
     */
    fightyBoi2: function(spawnName,cname,bodyPlan,targetRoomNames,roomTraversal=[],config={}){

        // TEST: maxRange
        // CODE: if collective power of X creeps in 5 is too much, then dodge out
        // CODE: kamikazeSpot
        // CODE: public message
        // CODE: ability to bounce between remotes
        // CODE: track if they're kiting and abandon
        // CODE : can catch if move speed is slower
        // CODE: split flee code to kite and gfo. When kiting, want to keep dist=3. when gfo...gfo
        // CODE: maybe not turn around if enemy can still hurt us. just keep kiting until dead? we are getting chip dmg

        config.retreatSpot =config.retreatSpot?config.retreatSpot:Game.spawns[spawnName].pos;
        config.kiteSpots =config.kiteSpots?config.kiteSpots:[];
        config.waitSpot = config.waitSpot?config.waitSpot:{x:25,y:25};
        config.attackRange =config.attackRange?config.attackRange:99;
        config.reckless =config.reckless!==undefined?config.reckless:false;
        config.attackCivilians =config.attackCivilians!==undefined?config.attackCivilians:true;
        config.attackStructures = config.attackStructures!==undefined?config.attackStructures:true;
        config.healerName =config.healerName?config.healerName:false;
        config.targetStructureTypes =config.targetStructureTypes?config.targetStructureTypes:[STRUCTURE_CONTAINER,STRUCTURE_ROAD];
        config.keepSpawning = config.keepSpawning!==undefined?config.keepSpawning:true;
        config.spawnPriority = config.spawnPriority!==undefined?config.spawnPriority:false;
        config.avoidSkeepers = config.avoidSkeepers!==undefined?config.avoidSkeepers:true;



        let healer = config.healerName?Game.creeps[config.healerName]:false;

        if(!Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,bodyPlan,{},config.keepSpawning,config.spawnPriority);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];

            creep.memory.avoidSkeepers = config.avoidSkeepers;
            if(creep.memory.targetRoomName===undefined){
                creep.memory.targetRoomName = targetRoomNames[0];
            }
            if(creep.memory.scanned===undefined){
                creep.memory.scanned = [];
            }

            if(creep.memory.kiteIndex===undefined){
                creep.memory.kiteIndex=0;
            }

            // if wait coords, then wait in the first room, else wait in specified room
            let waitRoom = config.waitSpot.roomName?config.waitSpot.roomName:targetRoomNames[0]
            let waitingPosition = rp(config.waitSpot.x,config.waitSpot.y,waitRoom);

            if(creep.memory.flee_from_id){
                let hostile = gob(creep.memory.flee_from_id);
                // are we now stronger?
                if( hostile && creep.isMorePunchyThan(hostile) && creep.isMoreShootyThan(hostile) ){

                    // hostile has been weakened. stop fleeing
                    creep.memory.flee_from_id=false;
                    creep.memory.flee_from_room=false;
                    creep.memory.hostile_dies_at = false;
                }
                if(creep.memory.hostile_dies_at < Game.time || (creep.pos.roomName===creep.memory.flee_from_room && !hostile) ){

                    creep.memory.flee_from_id=false;
                    creep.memory.flee_from_room=false;
                    creep.memory.hostile_dies_at = false;
                }else{
                    creep.heal(creep);
                    if(hostile && creep.partCount(RANGED_ATTACK))creep.rangedAttack(hostile);


                    if(creep.memory.flee_reason==='kiteable' && config.kiteSpots.length>0 ){


                        if(creep.pos.isNearTo( config.kiteSpots[creep.memory.kiteIndex] )){
                            creep.memory.kiteIndex++;
                        }
                        if(creep.memory.kiteIndex>=config.kiteSpots.length){
                            creep.memory.kiteIndex=0;
                        }
                        if(!hostile || creep.pos.getRangeTo(hostile)<=3)creep.moveToPos( config.kiteSpots[creep.memory.kiteIndex] );
                        if(hostile &&  creep.pos.getRangeTo(hostile)>3)creep.moveToPos( hostile );

                    }else{
                        if(!hostile || creep.pos.getRangeTo(hostile)<=3)creep.moveToPos(config.retreatSpot);
                        if(hostile &&  creep.pos.getRangeTo(hostile)>3)creep.moveToPos( hostile );
                        creep.moveOffRoomEdge();

                    }


                    return;
                }
            }

            if( targetRoomNames.includes(creep.pos.roomName)){

                let target = false;
                let closestTargetDistance = 99;
                let flee = false;
                creep.memory.avoidEdges = true;

                //////// Check Hostile Targets ///////////////////////////////////
                let hostileIDs = creep.room.getDangerousCreeps(1);
                let hostilesIn3 = 0;
                if(hostileIDs.length>0){

                    for(let id of hostileIDs){
                        let hostile = gob(id);
                        if(!hostile)continue;
                        if(config.avoidSkeepers && hostile.owner.username==='Source Keeper')continue;

                        let rangeToCreep = hostile.pos.getRangeTo(creep);
                        if(rangeToCreep<=3)hostilesIn3++;

                        // Rules to follow:
                        // hostile IS more Punchy & more shooty >> ignore, then flee when close
                        // hostile IS less Punchy & more shooty >> ignore, then flee when close
                        // hostile IS more Punchy & less shooty >> approach, then kite
                        // hostile IS less Punchy & less shooty >> approach, then chase
                        // collapse above rules to this code:

                        // are we likely to get kited/out-shot? then run off early
                        if(hostile.canOutShoot(creep)){
                            if(rangeToCreep <= 5 )
                                flee = "too-op";
                            // else >> dont do this. it break target selection sometimes, when we can outshoot and out fight. we want to chase
                            //continue;//we don't want to select for a target. just ignore until closer
                        }
                        // if hostile more puncy, but in shoot range we could flee and kite this bitch
                        if(rangeToCreep <= 3 && hostile.isMorePunchyThan(creep)){
                            flee = "kiteable";// close enough to kite.
                            creep.rangedAttack(hostile); // get a cheeky shot in
                        }

                        if(config.reckless && creep.partCount(ATTACK)>0)flee= false;

                        if(flee){
                            creep.memory.flee_reason = flee;
                            creep.memory.flee_from_id = hostile.id;
                            creep.memory.flee_from_room=hostile.pos.roomName;
                            creep.memory.hostile_dies_at = Game.time + hostile.ticksToLive;
                            // run awaaayyy
                            if(creep.memory.flee_reason==='kiteable' && config.kiteSpots.length>0 ){
                                return creep.moveToPos(config.kiteSpots[ creep.memory.kiteIndex ]);
                            }else{
                                return creep.moveToPos(config.retreatSpot);
                            }
                        }

                        // if we can punch MF, then lets punch the closest
                        if(rangeToCreep < closestTargetDistance ){
                            target = hostile;
                            closestTargetDistance = rangeToCreep;
                        }
                    }
                }
                //////// Heal if safe from Hostiles ///////////////////////////////////
                if( (closestTargetDistance > 1 || creep.partCount(ATTACK)===0 ) && creep.hits < creep.hitsMax){
                    creep.heal(creep); // heal if hurt and out of punch range
                }
                else if(closestTargetDistance !==1 && closestTargetDistance <= 4){

                    creep.heal(creep);//pre-heal when close
                }


                if(!creep.memory.scanned.includes(creep.pos.roomName)){
                    mb.scanRoom(creep.pos.roomName);
                    creep.memory.scanned.push(creep.pos.roomName);
                }

                //////// Pick Civilian Target ///////////////////////////////////
                if(!target && config.attackCivilians) {
                    // we we lock on civies, then we don't get to count them and RMA
                    // = gob(creep.memory.civillian_id);
                    //if (target)
                    closestTargetDistance = creep.pos.getRangeTo(target);

                    if (!target) {
                        let civilianIDs = creep.room.getEnemyPlayerCivilians();
                        closestTargetDistance = 99;
                        for (let id of civilianIDs) {
                            let civilian = gob(id);
                            if (!civilian) continue;

                            let dist = creep.pos.getRangeTo(civilian);

                            if(dist<=3)hostilesIn3++;

                            if (dist < closestTargetDistance) {
                                target = civilian;
                                closestTargetDistance = dist;
                                creep.memory.civillian_id = target.id;
                                creep.memory.structure_id = false;
                            }
                        }
                    }
                }
                //////// ELSE Pick structure Target ///////////////////////////////////
                if(!target && config.attackStructures && creep.memory.structure_id !=="none"){
                    target = gob(creep.memory.structure_id);

                    if(!target){
                        target = mb.getNearestStructure(creep.pos,config.targetStructureTypes,[creep.pos.roomName]);
                        if(target){
                            creep.memory.structure_id= target.id;
                        }else{
                            creep.memory.structure_id="none"
                        }
                    }
                    if(target)closestTargetDistance = creep.pos.getRangeTo(target)
                }
                //clog(hostilesIn3,creep.name+" hostilesIn3")
                if(target){


                    if(cname==='bob'){
                        console.log(creep.name,config.attackStructures,"target:",target.id,target.name,target.pos, " range:",closestTargetDistance);
                    }


                    // if target is a creep:
                    if(target.body){
                        if(healer && creep.pos.getRangeTo(healer)>=2 ){
                            creep.say("wait");
                            rangeToWaitingPos = 200;
                        }

                        // don't move towards targets on/close to room edge, to avoid getting pinged out of the room
                        if(!target.onRoomEdge() && !target.nearRoomEdge() ){
                            // only chase, if its in the attack buble of the waiting spot
                            let rangeToWaitingPos = target.pos.getRangeTo(waitingPosition);
                            let dontMoveCloser = (creep.partCount(RANGED_ATTACK)>0&&creep.partCount(ATTACK)===0&&closestTargetDistance===3)
                            let stepBack = (creep.partCount(RANGED_ATTACK)>0&&creep.partCount(ATTACK)===0&&closestTargetDistance<3)
                            // if we are ranged only and too close, then step back
                            if(stepBack){
                                let newDir = creep.pos.getReverseDirectionTo(target);
                                creep.move(newDir);
                            }
                            // IF we are chasing, then we want to always call a move intent, to insure we keep pace if its moving
                            else if(rangeToWaitingPos <= config.attackRange && !dontMoveCloser)creep.moveToPos(target);
                        }
                    }else if(closestTargetDistance>1){
                        // non-creeps are fixed targets so just use normal pathing code
                        creep.moveToPos(target);
                    }

                    if(closestTargetDistance===1)creep.attack(target);
                    if(hostilesIn3>1 && creep.partCount(RANGED_ATTACK))creep.rangedMassAttack()
                    else if(closestTargetDistance < 4 && creep.partCount(RANGED_ATTACK))creep.rangedAttack(target);

                }else{
                    if(targetRoomNames.length>1){

                        if(creep.memory.targetRoomName===creep.pos.roomName && !creep.onRoomEdge() && !creep.nearRoomEdge()){
                            for(let i in targetRoomNames){
                                if(targetRoomNames[i] === creep.memory.targetRoomName){
                                    creep.memory.targetRoomName = targetRoomNames[((i*1)+1)]?targetRoomNames[((i*1)+1)]:targetRoomNames[0];
                                    break;
                                }
                            }
                        }
                        creep.say("mv to "+creep.memory.targetRoomName)
                        creep.moveToPos(rp(25,25,creep.memory.targetRoomName))
                    }else {
                        creep.say("wait")
                        creep.moveToPos(waitingPosition)
                    }
                }


            }else{
                creep.moveOffRoomEdge();

                if(  creep.hits < creep.hitsMax){
                    creep.heal(creep); // heal if hurt and out of punch range
                }

                let hostileIds = creep.room.getDangerousCreeps();
                let hostile = false;
                for(let id of hostileIds){
                    hostile = gob(id);
                    if(hostile)break;
                }

                if(hostile){
                    creep.rangedAttack(hostile);
                    creep.attack(hostile);
                }

                if(healer && creep.pos.getRangeTo(healer)>=2 ){
                    return creep.say("WfH");
                }else{

                    if(hostile){
                        creep.moveToPos(hostile);
                    }else if(roomTraversal.length>0){
                        let res = this.traverseRooms(creep,roomTraversal);
                        creep.say("trav:"+res);
                    }else{
                        creep.moveToPos(waitingPosition)
                    }
                }

            }

        }

    },
    remoteStealer:function(spawnName,cname,bodyPlan,targetRoom,storage_id,keepSpawning=true){

        if(mb.isDeadlyRoom(targetRoom)){
            keepSpawning = false;
        }

        if(!Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,bodyPlan,{},keepSpawning);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            let storage = gob(storage_id)

            if(!creep.memory.ready){
                if( creep.pos.roomName !== storage.pos.roomName){
                    return creep.moveToPos(storage);
                }else{
                    creep.memory.ready = true;
                }
            }

            if(creep.isFull()){
                return creep.actOrMoveTo('transfer',storage,RESOURCE_ENERGY)
            }

            if(creep.pos.roomName === targetRoom){

                if(!creep.memory.scanned){
                    mb.scanRoom(targetRoom);
                    creep.memory.scanned = true;
                }

                let hostileIDs = (Game.rooms[targetRoom])?Game.rooms[targetRoom].getDangerousCreeps():[];
                let closestHostile = false;
                let distH = 999;
                for(let id of hostileIDs){
                    let hostile =  gob(id);
                    if(!hostile)continue;
                    let dist = creep.pos.getRangeTo(hostile);
                    if(dist<distH){
                        distH = dist;
                        closestHostile = hostile;
                    }
                }

                if(closestHostile ){
                    return creep.actOrMoveTo('transfer',storage,RESOURCE_ENERGY)
                }

                let targetContainer = gob(creep.memory.container_id);
                let targetDrop = gob(creep.memory.drop_id);
                let closestSrc = false;
                let closestDist = 999;

                if(targetContainer && targetContainer.isEmpty()){
                    targetContainer = false;
                    creep.memory.container_id = false;
                }

                if(!targetContainer && !targetDrop){
                    let sources = mb.getAllSourcesForRoom(targetRoom);

                    for(let src of sources){

                       // let dist = src.pos.getRangeTo(creep);
                       // if(dist<closestDist){
                           // closestSrc = src;
                           // closestDist = dist;

                            let containers = src.pos.lookForNearStructures(STRUCTURE_CONTAINER);
                            let container = (containers.length>0)?containers[0]:false;
                            //console.log(creep.name,container)
                            //if(container)console.log(container.store.getUsedCapacity(RESOURCE_ENERGY),creep.store.getFreeCapacity(RESOURCE_ENERGY))
                            if(container && container.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.store.getFreeCapacity(RESOURCE_ENERGY)  ){
                                targetContainer = container;
                                creep.memory.container_id = container.id;
                                break;
                            }else{
                                let drop = src.pos.lookForNearbyResource(RESOURCE_ENERGY);
                                if(drop.amount>50){
                                    targetDrop = drop;
                                    creep.memory.drop_id = drop.id;
                                    break;
                                }

                            }

                        //}
                    }
                }
                if(targetContainer && !targetContainer.isEmpty()){
                    return creep.actOrMoveTo('withdraw',targetContainer,RESOURCE_ENERGY)
                }
                if(targetDrop){
                    return creep.actOrMoveTo('pickup',targetDrop)
                }
                if(closestSrc){
                    if(closestSrc.pos.getRangeTo(creep)>3) {
                        return creep.moveToPos(closestSrc);
                    }
                    creep.say('wait')
                }


            }else{

                return creep.moveToPos(rp(25,25,targetRoom));

            }

        }
    },
    mosquitoAttack:function(spawnName,cname,targetRoomName,roomTraversal=[], dropLocation=undefined , bodyPlan='1m1c', keepSpawning=true){

        // CODE : dont stop at container empty, gets killed
        // code: find own container, instead of hard code
        // code: flee and wait 100t when chased off. give guard time to reset


        if(!Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,bodyPlan,{},keepSpawning);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            let container = gob(creep.memory.container_id);

            let hostileIDs = (Game.rooms[targetRoomName])?Game.rooms[targetRoomName].getDangerousCreeps():[];
            // clog(hostiles.length,cname)


            for(let id of hostileIDs){
                let guard = gob(id);
                if(!guard)continue;

                let distance = creep.pos.getRangeTo(guard);
                //clog(distance,guard.name);
                if(distance < 8 && creep.canMoveFullSpeed()===false ){
                    // pre-empt drop so we are empty, when we path find
                    creep.drop(RESOURCE_ENERGY);
                }
                if(distance < 7){
                    guard.pos.colourIn('red');

                    creep.memory.avoidUntil = Game.time+50;

                }else{
                    guard.pos.colourIn('orange')
                }
            }

            if(creep.memory.avoidUntil > Game.time){

                creep.moveToPos(dropLocation);
                creep.moveOffRoomEdge();

                creep.say('fleee',true);
                return;
            }
            else if(creep.isFull()){

                if(creep.pos.isEqualTo(dropLocation)){
                    creep.drop(RESOURCE_ENERGY);
                }else{
                    creep.moveTo(dropLocation)
                }


            }
            else if(creep.pos.roomName ===targetRoomName){


                if(container && container.storingLessThan(creep.store.getCapacity(RESOURCE_ENERGY)) ){
                    container = false;
                }

                if(!container){
                    if(!mb.hasRoom())mb.scanRoom(targetRoomName);
                    container = mb.getNearestStructure(creep.pos,[STRUCTURE_CONTAINER],[targetRoomName],
                        /*[{attribute:'storingAtLeast',operator:'fn',value:[creep.store.getCapacity(RESOURCE_ENERGY)] } ]*/
                    );
                    if(container)creep.memory.container_id = container.id;
                }


                if(container &&  container.storingAtLeast(creep.store.getCapacity(RESOURCE_ENERGY)) ){
                    let res =this.actOrMove2(creep,container,"withdraw",RESOURCE_ENERGY);
                    let droppedE = container.pos.lookForResource(RESOURCE_ENERGY);
                    creep.pickup(droppedE)

                }else{
                    creep.memory.avoidUntil = Game.time+50;
                    return creep.moveToPos(dropLocation);

                }

            }else{
                creep.moveOffRoomEdge();
                if(roomTraversal.length>0){
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{
                    creep.moveTo(new RoomPosition(25,25,targetRoomName))
                }
            }

        }
    },
    // dismantle a structure at a specific position then drop the energy
    breakStructures: function(spawnName,cname,parts, roomName,roomTraversal=[],ids='all',retreatSpot=undefined,keepSpawning=true){


        if(!Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,parts,{},keepSpawning);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.avoidSkeepers=true

            if(creep.pos.roomName!==roomName){

                creep.moveOffRoomEdge();
                if(roomTraversal.length>0){
                    let res = this.traverseRooms(creep,roomTraversal);
                    creep.say("trav:"+res);
                }else{
                    creep.moveToPos( new RoomPosition(25,25,roomName) );
                }

            }else{


                if(retreatSpot){
                    let retreat = false;
                    if(Game.rooms[roomName].getEnemyPlayerFighters().length > 0) {
                        let hostileIDs = Game.rooms[roomName].getEnemyPlayerFighters();
                        for (let hid of hostileIDs) {
                            let hostile = gob(hid);
                            if (hostile && hostile.pos.getRangeTo(creep) < 10) {
                                retreat=true;break;
                            }
                        }
                    }
                    if(creep.hits < creep.hitsMax)retreat=true;

                    if(retreat){
                        if (creep.partCount(HEAL)) creep.heal(creep)
                        return creep.moveToPos(retreatSpot);
                    }

                }

                let target = gob(creep.memory.target_id)

                if(!target) {
                    if (ids === 'all') {
                        if (creep.memory.target_id===undefined) {
                            mb.scanRoom(roomName);
                        }

                        if (!target) {
                            target = mb.getNearestStructure(creep.pos, [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_RAMPART, STRUCTURE_ROAD, STRUCTURE_CONTAINER], [roomName]);
                            //clog(target)
                        }

                    } else {

                        for (let id of ids) {
                            target = Game.getObjectById(id);
                            if (target) break;
                        }
                    }
                }

                if(target){
                    creep.memory.target_id = target.id;
                    creep.actOrMoveTo('dismantle',target);
                }
                else{
                    creep.say("!tgt")
                    creep.moveToPos(rp(25,25,roomName))
                }

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

    keepRoomClearOfLv0InvaderCores: function(spawnName,cname,parts,roomName,invadeCores=[]){

        let cores = invadeCores.length>1?invadeCores: mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})

        if(!mb.hasRoom(roomName) || (Game.time%5000===0 && cores.length===0))mb.scanRoom(roomName);

        if(!Game.creeps[cname] && cores.length>0){

            this.queueSpawn(spawnName,cname,parts,{},true,true);
            //Game.spawns[spawnName].spawnCreepX(parts,cname);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(creep.pos.roomName!==roomName){

                    creep.moveToPos(rp(23,17,roomName))
            }else{
                if(creep.pos.roomName!==roomName){
                    let route = mb.getMapRoute(Game.spawns[spawnName].pos.roomName,roomName);
                    if(route){
                        let res = this.traverseRooms(creep,route);
                        return creep.say('tx:'+res)
                    }
                }

                creep.actOrMoveTo('attack',cores[0]);
            }

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
            this.breakStructures(spawnName,roomName+'-Br'+i,breakerParts,roomName,orderedTargetIDs);
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

    constantGuardSKRoom:function(spawnName,cname,roomName, keeper_lairs=[], parts = '20m20a5h5m',keepSpawning=true,highPriority=false){

        if(Memory.invaderSeen===undefined){
            Memory.invaderSeen={};
        }
        // if its been over its predicted life span, then assume its dead
        if(Memory.invaderSeen[roomName] && Memory.invaderSeen[roomName]< Game.time) {
            clog("been "+Memory.invaderSeen[roomName]+" since we saw an invader",roomName);
            delete Memory.invaderSeen[roomName];
        }

        if(!Memory.invaderSeen[roomName]){

            this.queueSpawn(spawnName,cname,parts,{},keepSpawning,highPriority);
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

                let srcKeeperIDs = (Game.rooms[roomName])?Game.rooms[roomName].getSourceKeepers():[];
                let invaderIDs = (Game.rooms[roomName])?Game.rooms[roomName].getInvaders():[];
                let target = false;

                if(invaderIDs.length>0){
                    target = gob(invaderIDs[0])
                    if(target){
                        Memory.invaderSeen[roomName] = Game.time+target.ticksToLive;
                        creep.say('$h!t',true)
                    }
                }



                let priorityLair = false;
                let lowestCD = 9999;
                if(!target){
                    for(let id of keeper_lairs){
                        let lair = gob(id)
                        if(!lair)continue;

                        //clog(lair.pos+'='+lair.ticksToSpawn,cname)
                        if(lair.ticksToSpawn!==undefined && lair.ticksToSpawn < lowestCD){
                            lowestCD=lair.ticksToSpawn;
                            priorityLair = lair;
                            //clog(lair.pos+' chosen',cname)
                        }
                        for(let id of srcKeeperIDs){
                            let keeper = gob(id);
                            if(keeper && keeper.pos.getRangeTo(lair)<10){
                                target = keeper;break;
                            }
                        }
                        if(target){
                            break;
                        }
                    }

                    if(!priorityLair)priorityLair = gob(keeper_lairs[0]);
                    if(!priorityLair){
                        console.log(creep.name, creep.pos, " PROBLEM > no lair" );
                        return;
                    }
                }

                if(!target && Number.isInteger(priorityLair.ticksToSpawn) && priorityLair.ticksToSpawn > creep.ticksToLive){
                    // console.log("sk-guard could suicide ",creep.name,creep.pos,creep.ticksToLive,priorityLair.ticksToSpawn)
                    //creep.suicide();
                }



                let sources = mb.getSources({roomNames:[roomName]});
                let friendToHeal=false;
                for(let friend of creep.room.find(FIND_MY_CREEPS)){

                    if(friend.hits < friend.hitsMax && friend.pos.getRangeTo(creep)<10 && friend.name!==creep.name){
                        friendToHeal = friend;break;
                    }

                }

                if(target){
                    let dist = creep.pos.getRangeTo(target);
                    // don't approach untill full healed
                    if(dist>6 && dist<8 && creep.hits<creep.hitsMax){
                        creep.say("🤚💚")
                        creep.heal(creep);

                    }else if(creep.partCount(ATTACK)>creep.partCount(RANGED_ATTACK)){
                        creep.rangedAttack(target)
                        creep.say("🦵⚔️⚔️️")
                        creep.actOrMoveTo("attack",target);
                    }else{
                        creep.say("🦵⚔️🏹")
                        creep.attack(target)
                        creep.actOrMoveTo("rangedAttack",target);
                    }
                    if(creep.hits<creep.hitsMax && dist>1){
                        creep.say("🦵💚")
                        creep.heal(creep);
                    }
                    if(dist===4){
                        // preheal
                        creep.say("💝💚")
                        creep.heal(creep);
                    }
                    return target;
                }else{

                    if(friendToHeal){
                        let dist = creep.pos.getRangeTo(friendToHeal);
                        if(dist>3){creep.heal(creep)}
                        else if(dist>1){creep.rangedHeal(friendToHeal)}
                        else {creep.heal(friendToHeal)}

                        creep.moveToPos(friendToHeal);
                        creep.say('💕💚')
                    }else{



                        let distance = 3;
                        if(creep.partCount(ATTACK)>creep.partCount(RANGED_ATTACK)){
                            distance=1;
                        }
                        if(creep.pos.getRangeTo(priorityLair)>distance){
                            // move back to start to rinse repeat
                            creep.moveToPos( priorityLair );

                        }
                        if(creep.hits<creep.hitsMax){
                            creep.say("🦵💚")
                            creep.heal(creep);

                        }
                        if(Game.time%2===0)creep.say("⏱︎"+priorityLair.ticksToSpawn)

                    }

                }

            }else{
                creep.moveToPos( new RoomPosition(25,25,roomName) );
            }

        }
    },
    /**
     * string   nodeName -> which room to spawn from
     * string   duoName -> a name prefix for the duo
     * string   targetRoom -> which room to attack
     *
     * Object   config -> toggle optional features
     *
     * string   config.leaderBody -> 25w25m etc, default:1a1m
     * string   config.healerBody -> 25h25m etc, default:1h1m
     * RoomPos  config.musterSpot -> which position to wait for everyone in the squad, default: 25,25 of penultamate route room
     * RoomPos  config.retreatSpot -> which position to retreat to, if taking too much dmg. default: musterSpot
     * Array    config.target_ids -> any hard coded ids to target. Default: duo will stall. needs improving
     * Bool     config.attackWhenReady -> if true, the duo will attack, if false, duo will hold at muster spot
     * Array    config.allyCreepNames  -> other creeps considered part of this squad, to dosecondary healing
     *
     * string   config.renewSpawn -> which spawn to use to sync creeps ttl, default primary room spawn
     * Array    config.leaderBoostPlans -> boostPlan config for visiting the labs. default:[]; no boosts
     * Array    config.healerBoostPlans -> boostPlan config for visiting the labs. default:[]; no boosts
     * Int      config.spawnFacing  -> which way the renewSpawn faces, so the creeps can rotate. default TOP
     * Bool     config.keepSpawning  -> whether to spawn again, after creeps die
     *
     **/
    duoBois:function(nodeName,duoName, targetRoom,config={}){

        config.routeRequired =    config.routeRequired!==undefined? config.routeRequired:true;

        if( !Game.spawns[nodeName] )return;
        let route = config.routeRequired?mb.getMapRoute(Game.spawns[nodeName].pos.roomName,targetRoom):[];
        if(config.routeRequired && !route){
            console.log("ATTACK ROUTE ERROR: no route for "+Game.spawns[nodeName].pos.roomName+" >> "+targetRoom)
            return;
        }
        let mroom = route.length>0?route[(route.length -2)]:targetRoom;
        let defaultMuster =  rp(25,25,mroom)

        config.musterSpot =         config.musterSpot!==undefined?      config.musterSpot:defaultMuster;
        config.retreatSpot =        config.retreatSpot!==undefined?     config.retreatSpot:config.musterSpot;
        config.leaderBody =         config.leaderBody!==undefined?      config.leaderBody:'1a1m';
        config.healerBody =         config.healerBody!==undefined?      config.healerBody:'1h1m';
        config.attackWhenReady =    config.attackWhenReady!==undefined? config.attackWhenReady:true;
        config.allyCreepNames =     config.allyCreepNames!==undefined?  config.allyCreepNames:[];
        config.target_ids =         config.target_ids!==undefined?      config.target_ids:[];

        config.renewSpawn =         config.renewSpawn!==undefined?      config.renewSpawn:false;
        config.leaderBoostPlans =   config.leaderBoostPlans!==undefined?config.leaderBoostPlans:[];
        config.healerBoostPlans =   config.healerBoostPlans!==undefined?config.healerBoostPlans:[];
        config.spawnFacing =        config.spawnFacing!==undefined?     config.spawnFacing:TOP;
        config.keepSpawning =       config.keepSpawning!==undefined?    config.keepSpawning:true;
        //console.log(duoName,config.keepSpawning)
        let leadersTarget = this.duoLeader(
            nodeName,duoName+'-L',config.leaderBody,duoName+'-H',
            // travel and attack config
            config.musterSpot,targetRoom,config.target_ids,config.retreatSpot,
            route,config.attackWhenReady,
            // rlating to spawning
            config.renewSpawn,config.leaderBoostPlans,config.spawnFacing,config.keepSpawning)

        this.duoHealer(
            nodeName,duoName+'-H',config.healerBody,duoName+'-L',
            leadersTarget, config.allyCreepNames,
            // rlating to spawning
            config.renewSpawn,config.healerBoostPlans,config.spawnFacing,config.keepSpawning)


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
     * spawnFacing -
     * keepSpawning - true/false whether to spawn succession.
     */
    duoLeader: function(spawnName,cname,parts,healerName,musterSpot,roomName,target_ids,retreatSpot,roomTraversal=[],startAttackWhenReady=true,renewSpawn=false,boostPlans=[],spawnFacing=TOP,keepSpawning=true){
        //clog(target_ids,cname)
        renewSpawn = !renewSpawn?spawnName:renewSpawn;
        if(!Game.creeps[cname]){
            let mem= {phase:'spawning'};
            if(boostPlans.length>0){
                mem.boostPlans = boostPlans;
            }

            this.queueSpawn(spawnName,cname,parts,{memory:mem},keepSpawning,true);
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
                    //clog("everyone TTL good",cnamet
                    creep.memory.phase='boosting';
                    healer.memory.phase ='boosting';
                }else{

                    //if(healer) console.log(cname + " my ttl:",creep.ticksToLive,cname + " healer ttl:",healer.ticksToLive)
                    //else console.log(cname + " my ttl:",creep.ticksToLive,cname + " healer ttl: waiting")
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
                let allowedDistance = creep.pos.roomName === roomName?1:3;
                let portals = mb.getStructures({roomNames:[creep.pos.roomName],types:[STRUCTURE_PORTAL]})
                let rangeToHealer = healer.pos.getRangeTo(creep);
                //console.log(cname,allowedDistance)
                if(rangeToHealer>allowedDistance)okToMove=false;
                // if we're using portals, then wait within 5 on the other side
                if(portals.length > 0 && rangeToHealer==='Infinity' && portals[0].pos.getRangeTo(creep)<5)okToMove=true;
                // don't get stuck on room edges. move in 1 space then wait. Didn't originally need it. might actually because target_ids was empty
                if(creep.nearRoomEdge())okToMove=true;

                let maxTowerDamage = 800;
                let healerTakenTooMuchDmg = (maxTowerDamage < (healer.hitsMax-healer.hits));
                let iveTakenTooMuchDmg = (maxTowerDamage < (creep.hitsMax-creep.hits));
                if( healerTakenTooMuchDmg || iveTakenTooMuchDmg ){

                    retreatToHeal=true;
                }
                //console.log(cname,'okToMove',okToMove,'rangeToHealer',rangeToHealer)
            }

            //clog(healer.pos.getRangeTo(creep),cname)
            if( creep.memory.phase==='safemoded' ){
                creep.say('safed')
                return creep.moveToPos(musterSpot);
            }
            if(creep.memory.phase==='attacking'){

                if(creep.pos.roomName===roomName){

                    logs.startCPUTracker('scheduledAttack-'+cname+'-attacking');

                    if(creep.room.controller.safeMode>0){
                        creep.memory.phase='safemoded';
                        return creep.moveToPos(musterSpot);
                    }

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
                        else{
                            creep.rangedAttack(shootTarget);
                            //if(okToMove)creep.moveTo(shootTarget);
                        }

                    }

                    //// MOVE and ACT on TARGET ///////////////


                    if(target && (rangeToTarget==1 || target.structureType)){
                        if(creep.partCount(ATTACK)>0){  creep.attack(target);}
                        if(creep.partCount(WORK)>0){  creep.dismantle(target);}
                    }
                    if(retreatToHeal && okToMove){
                        creep.say('FtH')
                        if(healer){
                            creep.fleeTo = retreatSpot;
                            creep.moveToPos( healer );
                        }else{
                            creep.moveToPos( retreatSpot );
                        }
                        // creep.moveToPos( retreatSpot );

                    }else if(okToMove && target ){
                        creep.moveToPos(target);
                    }else if(!target){
                        creep.say("!tgt")
                    }else{
                        creep.say("wait")
                    }
                    logs.stopCPUTracker('scheduledAttack-'+cname+'-attacking',false);

                    return shootTarget?shootTarget:target;

                }else{

                    if(okToMove){
                        if(retreatToHeal){
                            creep.say('FtH')
                            if(healer){
                                creep.fleeTo = retreatSpot;
                                creep.moveToPos( healer );
                            }else{
                                creep.moveToPos( retreatSpot );
                            }
                            //creep.moveToPos( retreatSpot );
                        }else{
                            creep.say('MtA')
                            if(retreatSpot.isEqualTo(musterSpot))
                                creep.moveToPos( rp(25,25,roomName) )
                            else
                                creep.moveToPos( retreatSpot );

                        }

                    }else{
                        creep.say("wait")
                    }
                }


            }else if( creep.memory.phase==='mustering' ){

                let hostiles = Game.rooms[creep.pos.roomName].getHostiles();
                if(hostiles.length>0){
                    for (let hostile of hostiles){
                        if(hostile.pos.getRangeTo(creep)<=4){
                            creep.actOrMoveTo("attack",hostile);
                            creep.rangedAttack(hostile);
                            break
                        }
                    }
                }


                logs.startCPUTracker('scheduledAttack-'+cname+'-mustering');
                if(!creep.pos.isNearTo(musterSpot)){
                    creep.memory.swampCost = 5;

                    if(creep.pos.roomName==='W15N24' || creep.pos.roomName==='W15N25' )creep.memory.swampCost = 3;

                    if(okToMove){
                        if(roomTraversal.length>0 && creep.pos.roomName!=musterSpot.roomName){

                            let res = this.traverseRooms(creep,roomTraversal);

                        }else{
                            return creep.moveToPos(musterSpot);
                        }
                    }else{
                        creep.say("wait")
                    }

                }
                logs.stopCPUTracker('scheduledAttack-'+cname+'-mustering',false);
                if(!healer)return;

                if(startAttackWhenReady && creep.pos.isNearTo(healer) && creep.pos.isNearTo(musterSpot)){
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
     * spawnFacing -
     * keepSpawning - true/false whether to spawn succession.
     */
    duoHealer:function(spawnName,cname,parts,leaderName, leadersTarget, allies=[],renewSpawn=false,boostPlans=[],spawnFacing=TOP,keepSpawning=true){

        renewSpawn = !renewSpawn?spawnName:renewSpawn;

        if(!Game.creeps[cname]){
            let mem= {phase:'spawning'};
            if(boostPlans.length>0){
                mem.boostPlans = boostPlans;
            }
            this.queueSpawn(spawnName,cname,parts,{memory:mem},keepSpawning,true);
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
                if(leader && !leader.spawning){
                    creep.moveTo(leader);

                    if(creep.pos.isNearTo(Game.spawns[renewSpawn])){
                        Game.spawns[renewSpawn].renewCreep(creep);
                    }
                }else{
                    //clog(renewSpawn)
                    Game.spawns[renewSpawn].pauseSpawningUntil(Game.time+10);
                    if(creep.pos.isNearTo(Game.spawns[renewSpawn])){
                        // creep.say('L')
                        creep.move(spawnFacing)
                        Game.spawns[renewSpawn].renewCreep(creep);
                    }else{
                        //creep.say('R')
                        creep.moveTo(Game.spawns[renewSpawn])
                    }
                }
                ///////////////////////////////////////////////
                // Are we Renewed? ready to muster?
                ////////////////////////////////////////////////
                if(leader && !leader.spawning && leader.pos.isNearTo(creep) && ( creep.body.length<40 || (leader.ticksToLive>1450 && creep.ticksToLive > 1450) ) ){
                    //creep.memory.phase='boosting';
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

                //let rangeToLEader = creep.pos.getRangeTo()

                if( (creep.hitsMax-creep.hits) > 200 ){

                    creep.heal(creep)

                }else if(leader && leader.hitsMax > leader.hits){

                    if(creep.heal(leader)===ERR_NOT_IN_RANGE){
                        creep.rangedHeal(leader)
                    }

                }else if( this.healMostHurtSquadMember(creep,allies) !==OK ){

                    // if no squad members need a heal, then preheal leader and patch self
                    if(!leader || creep.hitsMax > creep.hits)
                        creep.heal(creep)
                    else if(leader){
                        if(creep.heal(leader)===ERR_NOT_IN_RANGE){
                            creep.rangedHeal(leader)
                        }
                    }

                }



                if(leader){
                    // console.log("healer thinks",leader.pos)
                    let portals = mb.getStructures({roomNames:[creep.pos.roomName],types:[STRUCTURE_PORTAL]})
                    if(portals.length>0 && leader.pos.roomName !== creep.pos.roomName){
                        let portal = mb.getNearestStructure(creep.pos,[STRUCTURE_PORTAL],[creep.pos.roomName])
                        creep.moveTo(portal);
                    }else{
                        //console.log(creep.name,leader.fleeTo)
                        if(leader.fleeTo)creep.moveTo(leader.fleeTo);
                        else creep.moveTo(leader);
                    }
                }

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
            if(Game.spawns[spawnName].spawning && Game.spawns[spawnName+"-2"])
                spawnName = spawnName+"-2";
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

        let mineralPos = rp(mineralTarget.pos.x,mineralTarget.pos.y,mineralTarget.pos.roomName);

        if(!Game.creeps[cname]){
            if(Game.spawns[spawnName].spawning && Game.spawns[spawnName+"-2"])
                spawnName = spawnName+"-2";

            Game.spawns[spawnName].spawnCreepX(parts,cname);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.dontFlee = true;
            creep.memory.riskyBiscuits = true;
            creep.moveOffRoomEdge();





            if(creep.pos.roomName===mineralTarget.pos.roomName){

                let keeperLair = gob(creep.memory.lair_id);
                if(!keeperLair){
                    keeperLair = mb.getNearestStructure(mineralPos,[STRUCTURE_KEEPER_LAIR],[mineralTarget.pos.roomName]);
                }
                if(!keeperLair){
                    console.log(creep.name," configured wrong. NO KEEPER LAIR")
                    return;
                }
                creep.memory.lair_id = keeperLair.id;

                if(keeperLair && creep.ticksToLive < keeperLair.ticksToSpawn){
                    //creep.suicide();
                }

                let mineral = gob(mineralTarget.id)
                let refreshRate = (keeperLair.ticksToSpawn<=6 || !keeperLair.ticksToSpawn)?1:5;
                let keeperIDs = (Game.rooms[creep.pos.roomName])?Game.rooms[creep.pos.roomName].getSourceKeepers(refreshRate):[];

                let closestKeeper = false;
                let distToKeeper = 99;
                if(keeperIDs.length>0){

                    for(let id of keeperIDs){
                        let fighter = gob(id);
                        if(!fighter)continue;

                        distToKeeper = creep.pos.getRangeTo(fighter);

                        if(distToKeeper < 10){
                            closestKeeper = fighter;
                            break;
                        }
                    }
                }
                /* if(keeperLair.ticksToSpawn<10 || keeperLair.ticksToSpawn>290){
                     console.log("time:",Game.time, " ticksToSpawn:",keeperLair.ticksToSpawn,' refreshRate:',refreshRate,keeperIDs)
                     if(closestKeeper)console.log('found:',closestKeeper.name)
                 }*/

                if(closestKeeper){

                    // if we are more rnged focus then kite
                    if( (creep.partCount(ATTACK) < creep.partCount(RANGED_ATTACK) ) && distToKeeper <= 3 ){
                        creep.moveToPos(rp(25,25,mineralTarget.pos.roomName))
                        creep.rangedAttack(closestKeeper);
                    }else{
                        creep.moveToPos(closestKeeper)
                    }

                    if(distToKeeper===1 && creep.partCount(ATTACK)>0)creep.attack(closestKeeper);
                    creep.heal(creep);

                }else{

                    let res = creep.actOrMoveTo('harvest',mineral);
                    if(creep.hits<creep.hitsMax && (res==ERR_TIRED || res==ERR_NO_BODYPART)){
                        creep.heal(creep);
                    }
                }


            }else{
                creep.moveToPos( mineralPos);
            }



        }
    },

    constantGuardRoom:function(spawnName,cname,roomName,parts, waitingSpot={x:25,y:25},allyName=false,killCivilians=false, maxDistance=75 , roomTraversal=[]){
        if(!Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,parts,{},true,true);
        }

        let fighterIDs = (Game.rooms[roomName])?Game.rooms[roomName].getDangerousCreeps(1):[];
        let myCreeps = (Game.rooms[roomName])?Game.rooms[roomName].find(FIND_MY_CREEPS):[];



        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.moveOffRoomEdge();

            if(creep.pos.roomName===roomName){

                /////////////////// Fighting /////////////////////////////////////////
                let fighterTarget = false;
                let distF = 99999;
                let fightersIn3 = 0;
                if(fighterIDs.length>0){

                    for(let id of fighterIDs){
                        let fighter = gob(id);
                        if(!fighter)continue;

                        let d = creep.pos.getRangeTo(fighter);
                        if(d<3)fightersIn3++;
                        if(d < distF && d <= maxDistance){
                            distF =d;
                            fighterTarget = fighter;
                        }

                    }

                    if(fighterTarget){
                        if(distF===1)creep.attack(fighterTarget);
                        if(distF <=maxDistance)creep.moveToPos(fighterTarget);

                        if(fightersIn3>1)
                            creep.rangedMassAttack()
                        else
                            creep.rangedAttack(fighterTarget)
                    }

                }

                /////////////////// Healing /////////////////////////////////////////
                let healTarget=false;
                for(let mine of myCreeps){
                    if(mine.hits<mine.hitsMax){
                        healTarget = mine;break;
                    }
                }
                if(distF>1){

                    if(creep.hits<creep.hitsMax)
                        creep.heal(creep);
                    else if(healTarget && creep.pos.getRangeTo(healTarget)<4){
                        creep.rangedHeal(healTarget);
                        creep.heal(healTarget)
                    }else{
                        creep.heal(creep);
                    }
                }else{
                    if(creep.hits<creep.hitsMax)
                        creep.heal(creep);
                    else if(healTarget){
                        creep.rangedHeal(healTarget);
                        creep.actOrMoveTo("heal",healTarget);
                    }
                }
                /////////////////// Waiting /////////////////////////////////////////
                if(!fighterTarget && !healTarget){
                    creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
                }

            }else{
                if(creep.hits<creep.hitsMax)
                    creep.heal(creep);

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
    constantGuardWalls:function(spawnName,cname,roomName,parts, waitingSpot={x:25,y:25}, maxDistance=75 ){
        if(!Game.creeps[cname]){

            this.queueSpawn(spawnName,cname,parts,{},true,true);
        }

        let fighterIDs = (Game.rooms[roomName])?Game.rooms[roomName].getDangerousCreeps(1):[];
        let myCreeps = (Game.rooms[roomName])?Game.rooms[roomName].find(FIND_MY_CREEPS):[];

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.memory.dontFlee = true;
            creep.memory.riskyBiscuits = true;

            /////////////////// Fighting /////////////////////////////////////////
            let fighterTarget = false;
            let distF = 99999;
            let fightersIn3 = 0;
            if(fighterIDs.length>0){

                for(let id of fighterIDs){
                    let fighter = gob(id);
                    if(!fighter)continue;

                    let d = creep.pos.getRangeTo(fighter);
                    if(d<3)fightersIn3++;
                    if(d < distF && d <= maxDistance){
                        distF =d;
                        fighterTarget = fighter;
                    }

                }

                if(fighterTarget){
                    if(distF===1)creep.attack(fighterTarget);

                    if(distF <= maxDistance)creep.moveToPos(fighterTarget);
                    else creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );

                    if(fightersIn3>1)
                        creep.rangedMassAttack()
                    else
                        creep.rangedAttack(fighterTarget)
                }else{
                    creep.moveToPos( new RoomPosition(waitingSpot.x,waitingSpot.y,roomName) );
                }

            }



            /////////////////// Healing /////////////////////////////////////////
            if(creep.partCount(HEAL)>0){
                let healTarget=false;
                for(let mine of myCreeps){
                    if(mine.hits<mine.hitsMax){
                        healTarget = mine;break;
                    }
                }
                if(distF>1){

                    if(creep.hits<creep.hitsMax)
                        creep.heal(creep);

                    else if(healTarget && creep.pos.getRangeTo(healTarget)<4){
                        creep.rangedHeal(healTarget);
                        creep.heal(healTarget)

                    }else{
                        creep.heal(creep);
                    }
                }else{
                    if(creep.hits<creep.hitsMax)
                        creep.heal(creep);
                    else if(healTarget){
                        creep.rangedHeal(healTarget);
                        creep.actOrMoveTo("heal",healTarget);
                    }
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

        let hostileIDs = Game.rooms[roomName]?Game.rooms[roomName].getDangerousCreeps():[];
        for(var id of hostileIDs){
            let hostile = gob(id);
            if(!hostile)continue;

            if(hostile.owner.username==='Source Keeper'){
                continue;
            }
            if(!target)target = hostile;



            // if we have many invaders, then size based on creep
            meleeTotalCount += hostile.partCount(ATTACK);
            rangeTotalCount += hostile.partCount(RANGED_ATTACK);
            healTotalCount += hostile.partCount(HEAL);
            // we want to ensure we prioritise store the healer creep, if it exits
            if(healTotalCount>0){
                target = hostile;
            }
            Memory.invaderSeen[roomName] = Game.time+target.ticksToLive;

        }

        if(roomName =='xx'){
            clog("-------"+roomName+"--------")
            clog(rangeTotalCount,'rangeTotalCount')
            clog(meleeTotalCount,'meleeTotalCount')
            clog(healTotalCount,'healTotalCount')
            clog(hostileIDs.length,'hostiles')
            clog(target.name,'target')
        }
        // only spawn if there is 1 invader. no code to handle2
        if( (target || Memory.invaderSeen[roomName]) && !Game.creeps[cname] && hostileIDs.length<3){
            let nastyParts = meleeTotalCount+rangeTotalCount+healTotalCount;
            if(nastyParts==0){
                nastyParts = 5;// we lost vision before we could spawn a defender
            }
            let baseBody = '4t4m1a1m +' + Math.ceil(nastyParts/2)+'*1r1m1a1m';


            if(hostileIDs.length==2 && meleeTotalCount==0 && rangeTotalCount==6 && skRoom){
                // probs a boosted duo
                baseBody = '1t11m10r10h1a';
            }


            if(target && target.body.length>25 || skRoom){
                baseBody='2t2m'+baseBody+'+1h1m';
            }
            //clog(baseBody,cname+" plan:")
            Game.spawns[spawnName].spawnCreepX(baseBody,cname,{},true)
            //clog(Game.spawns[spawnName].spawnCreepX(baseBody,cname,{},true),cname);
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
                   // creep.suicide();
                }
            }else{
                creep.moveOffRoomEdge();
                creep.moveTo(new RoomPosition(25,25,roomName))
            }



        }
        return Memory.invaderSeen[roomName];

    },
    lv4InvaderCoreRanger:function(spawnName,cname,roomName,parts,target_ids, retreatPos){
        if(!Game.creeps[cname]){

            clog(Game.spawns[spawnName].spawnCreepX(parts,cname),cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.heal(creep);
            creep.memory.riskyBiscuits=true;
            if(creep.hits<creep.hitsMax){
                creep.moveToPos(retreatPos)
            }
            else if(creep.pos.roomName===roomName){

                let target =false;
                for(let id of target_ids){
                    target = gob(id);
                    if(target);break;
                }

                if(target){
                    let res = creep.rangedAttack(target);

                    if(target.pos.getRangeTo(creep)<2){
                        creep.moveTo(retreatPos)
                    }
                    if(res === ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                }

            }else{
                creep.moveToPos(new RoomPosition(25,25,roomName))
            }
        }
    },
    killCreepsBreakTarget:function(spawnName,cname,parts,roomName,target_ids,roomTraversal=[], maxRange=75,waitingSpot={x:25,y:25},dontFlee=false,kamakaziPos=false,publicMsg=false){
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
                if(Game.creeps['bob'])hostiles.push(Game.creeps['bob'])
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

                for(var ref in hostiles){
                    let range = creep.pos.getRangeTo(hostiles[ref]);

                    if(range>maxRange)continue;

                    if(range<=3){
                        creepsIn3++;
                    }
                    if(
                        hostiles[ref].owner.username=='Source Keeper' ||
                        hostiles[ref].owner.username=='GT500'||
                        hostiles[ref].owner.username=='Trepidimous'
                    )continue;

                    if(hostiles[ref].partCount(RANGED_ATTACK)>0 || hostiles[ref].partCount(ATTACK)>0|| hostiles[ref].partCount(HEAL)>0 ){
                        if(range<distF){
                            distF = range;
                            closestFighter = hostiles[ref];
                        }
                    }

                    if(hostiles[ref].partCount(WORK)>0 || hostiles[ref].partCount(CLAIM)>0 || hostiles[ref].partCount(CARRY)>0|| hostiles[ref].partCount(MOVE)>0){
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

                        creep.rangedAttack(closestCivilian);
                    }

                }else{
                    for(let id of target_ids){
                        target =Game.getObjectById(id);
                        if(target)break;
                    }

                    if(!target){
                        target = mb.getNearestStructure(creep.pos,[STRUCTURE_CONTAINER,STRUCTURE_ROAD,STRUCTURE_RAMPART,STRUCTURE_TOWER],[roomName]);
                    }
                    //creep.say(target.id)
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

    drainRoomBounce:function(spawnName,cname, retreatRoomPos, bodyPlan='3*1t1m + 6*1h1m',roomTraversal=[],keepSpawning=true){
        if(!Game.creeps[cname]){
            this.queueSpawn(spawnName,cname,bodyPlan,{memory:{arrived:false}},keepSpawning);
        }

        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            if(creep.pos.roomName !== retreatRoomPos.roomName && !creep.memory.arrived){

                let enemies = creep.room.getDangerousCreeps()
                if(enemies.length>0){
                    creep.heal(creep)
                }
                if(roomTraversal.length===0)
                    creep.moveToPos(retreatRoomPos)
                else
                    this.traverseRooms(creep,roomTraversal);
            }else{
                this.roomBounceDrain(creep,retreatRoomPos)
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
        let debugCreep = 'xduoL1';
        let curr=-1;
        for(let i in roomNames){
            if(creep.name===debugCreep)console.log(roomNames[i])
            if(creep.pos.roomName===roomNames[i] && !roomNames[i].includes('portal') ){

                curr = (1*i);break;
            }
        }
        // sample portal journey:
        // W4N5, W5N5,W5N5>portal>E5S5,E5S6,E5S7
        // portal is W5N5>>E5S5. DONT put portal destination as movable room, we want to get out

        // IF curr=-1, then it becomes 0 and we move to the first room
        // IF curr+1 references a valid next room, then we try to move to that room
        // IF we don't get a room, then we assume we are at the end.
        let next = curr+1;
        if(creep.name===debugCreep)console.log(Game.time,creep.pos,"curr",curr,"next:",roomNames[next],"in:",roomNames)

        if(roomNames[next]){
            let res = 404;
            if( roomNames[next].includes('portal') ) {
                if(!mb.hasRoom(creep.pos.roomName))mb.scanRoom(creep.pos.roomName);
                let portal = gob(creep.memory.portal_id);
                if(!portal){
                    portal = mb.getNearestStructure(creep.pos,
                        [STRUCTURE_PORTAL],[creep.pos.roomName])
                    if(portal){
                        creep.memory.portal_id = portal.id;
                    }
                }
                if(portal){
                    if(creep.name===debugCreep)console.log(creep.pos," moving-to-portal ",portal.pos)
                    res = creep.moveToPos(portal)
                }else{
                    if(creep.name===debugCreep)console.log(creep.pos," cant-find-portal ",roomNames)
                    res = 505;
                }

            }else {

                // we have a portal_id? but not on the traverse-portal-pointer?
                // (we likely just came through. we are on exit)
                if(creep.memory.portal_id){
                    if(creep.name===debugCreep)console.log(creep.pos," arrived-jump-off ",roomNames)

                    let jumpOffSpots = creep.pos.getNearbyPositions();
                    for(let pos of jumpOffSpots){
                        if( pos.lookForStructure(STRUCTURE_PORTAL)===false && pos.isWalkable(true)){
                            creep.memory.portal_id=false;
                            if(creep.name===debugCreep)console.log(creep.pos," jumping-to ",pos)
                            res = creep.moveToPos(pos);
                            break;
                        }
                    }
                }else {
                    res = creep.moveOffRoomEdge();
                    if (res !== OK) {

                        res = creep.moveToPos(new RoomPosition(25, 25, roomNames[next]));
                        if(creep.name===debugCreep)console.log(creep.pos," moving-to 25,25",roomNames[next],'res:',res)
                    }
                }
            }
            return res;
        }else{
            if(creep.name===debugCreep)console.log(creep.pos," end-of-traverse ",roomNames)
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
    /**
     *
     **/
    queueSpawn:function(nodeName,cname,bodyParts,options={},keepSpawning=true,highPriority=false){
        // function(parts, name, options={},highPriority=false)
        let spawnName = nodeName;
        let res = 500;
        if( !Game.spawns[spawnName] )res = "spawn-gone";
        else if(Game.spawns[spawnName].spawning && Game.spawns[spawnName+"-2"])spawnName = spawnName+"-2";
        else if(Game.spawns[spawnName+"-2"] && Game.spawns[spawnName+"-2"].spawning && Game.spawns[spawnName+"-3"])spawnName = spawnName+"-3";

        if(keepSpawning && Game.spawns[spawnName])res = Game.spawns[spawnName].spawnCreepX(bodyParts,cname,options,highPriority)
        if(!keepSpawning)res = 'spawning-paused';

        if(util.debug=='spawns')console.log(nodeName,cname,"[",bodyParts,"]"," spawn res:",res);
        return res;
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

};
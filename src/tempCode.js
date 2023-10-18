let tankerRole=require('role.tanker');
const roomNode = require('class.roomNode');
let harvesterRole = require('role.harvester');
module.exports = {
    
// attack on Game.time 1075909. invader quad
    // safemode, retreat, if breaks hceal()
    // keep duo together, leader running off
    run:function(){
        //return;
        if( util.getServerName()==='shard3'){
            this.shard3TempCode();
        }else if( util.getServerName()==='botarena' || util.getServerName()==='private'){
           this.shardBATempCode();
        }
        //
        
        return;
    },
    shardBATempCode:function(){
        
        //this.botArenaForRoomNode(nodes.a);
        this.botArenaForRoomNode(nodes.b);
        this.botArenaForRoomNode(nodes.g);
        //this.startupRoomNoVision('Alpha','W7N4', {workerCount:4,workerBody:'10w10c10m'})
        
    }, 
    shard3TempCode:function(){
        //return;
          let thing=this;
       // this.haulResources('Theta','taxman1','20*1c1m',{id:'60c90cef9891318f82fa19dd',pos:{x:25,y:20,roomName:'W46N49'}},gob('64e672e8ff9345439bb731e3'),[RESOURCE_ENERGY],['W45N51','W46N51','W46N50','W46N49'],4000,250);
        //if(Game.creeps['taxman2'])this.haulResources('Theta','taxman2','20*1c1m',{id:'60c90cef9891318f82fa19dd',pos:{x:25,y:20,roomName:'W46N49'}},gob('64c8f4af8864060224b86e60'),[RESOURCE_ENERGY],[],4000,250);
        
        //gob('64f39b9f9fa508dbd35620b9').observeRoom('W45N50')
        
        //this.startupRoomWithVision('Zeta-2','W43N51', {workerCount:0,workerBody:'10w10c10m',defend:true,defenderSpot:{x:13,y:16}})
   
        
        if(Game.creeps['Af0']|| (gob('64d258b7ac37e86f64210866').storedAmount()<600000 && Game.cpu.bucket>6000))
            this.farmStructureThenTransfer('Alpha','Af0','20w1c10m',['62aa95635d8a323481c138bb','62aa955ce2e2855ce315256a','62aa95557c404d6a8c7029e0'],'64d3a146a4357404b77dabab')
        if(Game.creeps['Af0']|| (gob('64d258b7ac37e86f64210866').storedAmount()<600000 && Game.cpu.bucket>6000))
            this.farmStructureThenTransfer('Alpha','Af1','20w1c10m',['62aa954c5ae7b06a395d48d5','62aa954fc44b546bf0aa175e','62aa953ec7649673fcfe5ff9'],'64d3ad9d691b1e72a6839726')
        

        //this.withdrawThenUpgrade('Lambda','Lux1','20w1c5m','651bc3a17484a4b6bcd123d0','5bbcaa6c9099fc012e63153a',true,rp(34,42,'W48N52'))
        if(Game.creeps['Lux2'] || Game.cpu.bucket>4000)
            this.withdrawThenUpgrade('Lambda','Lux2','20w1c5m','651bc3a17484a4b6bcd123d0','5bbcaa6c9099fc012e63153a',true,rp(34,41,'W48N52'))
        
        if(Game.creeps['Lux3'] || Game.cpu.bucket>6000)
            this.withdrawThenUpgrade('Lambda','Lux3','20w1c5m','651bc3a17484a4b6bcd123d0','5bbcaa6c9099fc012e63153a',true,rp(34,40,'W48N52'))
        
       
         //this.harvestAndCollectCentreSectorMineral('Theta-3','5bbcb16540062e4259e92e94',rp(41,1,'W45N51'),'64e672e8ff9345439bb731e3',RESOURCE_UTRIUM,'5m5c','30W5c15m','-U',2)
      
        
        if(Game.creeps['Mx1']|| (Game.cpu.bucket>5000 && gob('5bbcaac09099fc012e63221b').ticksToDowngrade<10000) )this.withdrawThenUpgrade('Maintainer1','Mx1','1w1c','64d4a6df69e9867caf3a3604','5bbcaac09099fc012e63221b')
        if(Game.creeps['Mx1']|| (Game.cpu.bucket>5000 && gob('5bbcaab49099fc012e63208a').ticksToDowngrade<10000) )this.withdrawThenUpgrade('Maintainer2','Mx2','1w1c','64eb56bf2bd85d7bf7b94148','5bbcaab49099fc012e63208a')
        if(Game.creeps['Mx1']|| (Game.cpu.bucket>5000 && gob('5bbcaac09099fc012e632211').ticksToDowngrade<10000) )this.withdrawThenUpgrade('Maintainer3','Mx3','1w1c','64eba8b3511e240c621b3cc4','5bbcaac09099fc012e632211')
        
        //this.haulResources('Kappa','Ktx1','25*1c1m',gob('6504346920565f7971fca016'),gob('650cccba513daa78ea58d199'),[RESOURCE_ENERGY],[],5000,200)
        
        if(Game.creeps['Ztx1'])
        this.haulResources('Zeta-2','Ztx1','25*1c1m',gob('64de8f2c3c187d2cb5df12b0'),gob('6523463c3085921d30ef1ffc'),[RESOURCE_ENERGY],[],5000,200)

        
        this.rotateCreep('Zux', function(activeCreepName){
            if(Game.creeps[activeCreepName] )
             thing.withdrawThenUpgrade('Zeta-2',activeCreepName,'20w5c10m','6523463c3085921d30ef1ffc','5bbcaaa99099fc012e631f0a',true,rp(6,14,'W43N51'))
        },300)

       
        
       // this.spawnHarvest('Zeta-2','Boost','W43N51-h0','5bbcaaa99099fc012e631f0b')
        
        let hostileIds = Game.rooms['W43N51'].getNoneAllyCreeps();
        if(hostileIds.length>0 && gob('651d16f663f96bf75536f5dd'))gob('651d16f663f96bf75536f5dd').attack(gob(hostileIds[0]))
        
       // this.streamResource('Iota','Theta',RESOURCE_ENERGY,400000,300000);
        
        this.rotateCreep('Peltast1-', function(activeCreepName){
            // 'W4N51','W46N51''W46N50','W47N50','W48N50','W49N50','W49N51','W49N52'
            //thing.killCreepsBreakTarget('Theta-3',activeCreepName,'5*1t1m+20*1a1m','W49N52',['64f890b684ddee8fd008c749','63f771515f51114525f722f2'],['W45N51','W46N51','W46N50','W47N50','W48N50','W49N50','W49N51','W49N52'], true)
            //thing.constantGuardRoom('Theta-3',activeCreepName,'W49N52','10a10m1h1m',{x:44,y:46},false,true,25);
        },400)
        
 
    /**
     * manage the config of what resources different rooms want. This assumes they've already been hauled to the terminal.
     * see manageMineralHauling()w
     * importerConfigs - array of objs with this template: {importer:'Alpha',resource_type:RESOURCE_OXYGEN,storageCap:50000}
     * exporters - an array of rooms who are exporting, such as ['Alpha','Beta'...]
     */
        this.manageInterRoomTrading([ 
                
                {importer:'Alpha',resource_type:RESOURCE_GHODIUM,storageCap:6000},
             
                
                {importer:'Beta',resource_type:RESOURCE_ENERGY,storageCap:100000},
                {importer:'Beta',resource_type:RESOURCE_HYDROGEN,storageCap:24000}, 
                {importer:'Beta',resource_type:RESOURCE_HYDROXIDE,storageCap:12000}, 
                {importer:'Beta',resource_type:RESOURCE_ZYNTHIUM,storageCap:24000},  
                {importer:'Beta',resource_type:RESOURCE_LEMERGIUM,storageCap:24000},
                
                {importer:'Beta',resource_type:RESOURCE_UTRIUM_LEMERGITE,storageCap:12000},
                {importer:'Beta',resource_type:RESOURCE_KEANIUM,storageCap:24000},
                
                {importer:'Epsilon',resource_type:RESOURCE_OXYGEN,storageCap:12000},
                {importer:'Epsilon',resource_type:RESOURCE_ENERGY,storageCap:200000},
                
                {importer:'Iota',resource_type:RESOURCE_HYDROGEN,storageCap:24000},
                
                
                
                {importer:'Theta',resource_type:RESOURCE_HYDROGEN,storageCap:12000},
                {importer:'Theta',resource_type:RESOURCE_OXYGEN,storageCap:12000},
                {importer:'Theta',resource_type:RESOURCE_HYDROXIDE,storageCap:12000},
                {importer:'Theta',resource_type:RESOURCE_LEMERGIUM,storageCap:12000},
                
                /*
                {importer:'Zeta',resource_type:RESOURCE_OXYGEN,storageCap:24000},
                {importer:'Zeta',resource_type:RESOURCE_LEMERGIUM,storageCap:100000},
                {importer:'Zeta',resource_type:RESOURCE_HYDROXIDE,storageCap:36000},*/
                
                /* Military imports */
                {importer:'Zeta',resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:6000},
                {importer:'Zeta',resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                {importer:'Zeta',resource_type:RESOURCE_UTRIUM_ACID,storageCap:6000},
                {importer:'Zeta',resource_type:RESOURCE_ENERGY,storageCap:24000},
                /*
                {importer:'Theta',resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                {importer:'Theta',resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                */
                {importer:'Iota',resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:6000},
                {importer:'Iota',resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                {importer:'Iota',resource_type:RESOURCE_UTRIUM_ACID,storageCap:6000},
                {importer:'Iota',resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                
                {importer:'Lambda',resource_type:RESOURCE_ENERGY,storageCap:200000},
            ],
            // atm, Alpha is getting all the flah and exporting for E, even if its not got much in terrminal. code needs to check terminals cap.
            [/*'Alpha',*/'Beta'/*'Gamma','Delta'*/,'Epsilon','Zeta','Theta','Iota','Kappa']);
    
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        
       },

    botArenaForRoomNode:function(node){
        if(!node)return
        let spawn = Game.spawns[node.name];
        if(!spawn)return spawn
        let room = spawn.room;
        let storage = mb.getStorageForRoom(room.name)
        
        
        if(!room.controller.getStandingSpot()){
            this.setControllerUp(node);
        }
        if(!mb.haveConstructions([node.coreRoomName])){
            node.upgradeRate = RATE_FAST;
            node.buildFast=storage?true:false;
        }else{
            node.buildFast=true;
            if(node.totalEnergyAtSources<3000){
                node.upgradeRate = RATE_SLOW;
            }else{
                node.upgradeRate = RATE_FAST;
            }
            if(room.controller.level>=5){
                node.upgradeRate = RATE_FAST;
            }
        }
        if(room.controller.level>=7){
             // switch focus to wall building
            node.upgradeRate = RATE_SLOW;
            node.buildFast=true; 
        }
        
        
        if(room.energyCapacityAvailable>=550){
            this.runRemotes(node);
        }
        
        if(room.controller.level>=4){
            node.wallHeight=50000;
            
            
            if(storage){
                this.manageWalls(node);
                node.extraFastFillSpots=[rp(spawn.pos.x-1,spawn.pos.y+3,room.name),rp(spawn.pos.x+1,spawn.pos.y+3,room.name)];
            }
        }
        if(room.controller.level>=5){
            node.wallHeight=500000;
        }
        if(room.controller.level>=6){
            node.wallHeight=10000000;//10m
            /*let mineral = mb.getMineralForRoom(room.name);
            if(!mineral.getStandingSpot()){
                mineral.setStandingSpot( mineral.pos.lookForNearbyWalkable(false,false)[0])
            }*/
            //this.harvestAndCollectCentreSectorMineral(node.name,mineral.id,mineral.getStandingSpot(),storage.id,mineral.mineralType,'5m10c','16w5c8m','-'+mineral.mineralType,1)
            //node.makeResource = mineral.mineralType;
        }
        
        if(Game.spawns[node.name+'-2']){
            node.extraFastFillSpots=[];
        }
        
        if(Game.time%500===0)this.removeRedundantRoads(node)
        this.manageConstructionSites(node);
        this.defendHomeRoom(node)
    },
    
    scoreRemote:function(node,roomName){
        
        if(!Memory.remotes)Memory.remotes={};
        if(!Memory.remotes[node.name])Memory.remotes[node.name]={};
        ///////////////////////////////////////////////////
        // Analyse and score remotes
        ///////////////////////////////////////////////////
        // score is src distances to spawn + controller distance to spawn
        Memory.remotes[node.name][roomName]={score:0,username:false};
        
        let controller = mb.getControllerForRoom(roomName);
        if(controller && controller.reservation){
            Memory.remotes[node.name][roomName].username = controller.reservation.username;
            
            if(controller.reservation.username!=='MadDokMike'){
                // try not focus on rooms that anothr player already reservs
                Memory.remotes[node.name][roomName].score+=controller.reservation.ticksToEnd;
            }else{
                // let boost priority of rooms we already reserve
                Memory.remotes[node.name][roomName].score-=Math.ceil(controller.reservation.ticksToEnd/10);
            }
        }
        
        let cores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})
        if(cores.length>0){
            // try not to prefer invader core rooms, because they are costly
            Memory.remotes[node.name][roomName].score+=50;
        }
        let result=false;
        
        let srcs = mb.getSources({roomNames:[roomName]});
        for(let src of srcs){
            let to = src.pos;
            result = PathFinder.search(Game.spawns[node.name].pos, rp(to.x,to.y,to.roomName) ,{swampCost:2,maxOps:10000});
            Memory.remotes[node.name][roomName].score+= result.path.length;
        }
        if(srcs.length==1){
            // lower score 
            Memory.remotes[node.name][roomName].score += Memory.remotes[node.name][roomName].score;
        }
        let cPos = controller.pos;
        result = PathFinder.search(Game.spawns[node.name].pos, rp(cPos.x,cPos.y,cPos.roomName) ,{swampCost:2,maxOps:10000});
        Memory.remotes[node.name][roomName].score+= result.path.length;
    },
    sortRemotes:function(node){
        
        let sorted = [];
        if(Memory.remotes && Memory.remotes[node.name]){
            // Sort the object entries by the score and map to get only the keys (room names)
            node.remoteRoomNames = Object.entries(Memory.remotes[node.name])
              .sort(([, a], [, b]) => a.score - b.score) // For ascending order
              .map(([key]) => key)
              //clog(sortedRoomNames)
        }
    },
    runRemotes:function(node){
       // return
        if(node.remoteRoomNames.length==0){
            node.badRooms = [];
            let adjRooms = Game.map.describeExits(node.coreRoomName);
            for(let dir in adjRooms){
                node.remoteRoomNames.push(adjRooms[dir])
            }
        }
        
        if(Game.time%200==0)this.sortRemotes(node);
        
        let eCap =  Game.rooms[node.coreRoomName].energyCapacityAvailable;
        let harvesterBodyPlan = harvesterRole.getParts(eCap,node.getConfig());
        
        for(let roomName of node.remoteRoomNames){
            
            
            if(node.badRooms.includes(roomName))continue;
            
            let c = mb.getControllerForRoom(roomName)
            if(c && c.owner){
                // forget the room
                node.badRooms.push(roomName);
                continue;
            }
            
            // skipp player room
           
            
            if(!mb.hasRoom(roomName)){
                this.scoutRoom(node.name,roomName+'-sc',roomName)
                if(Game.rooms[roomName])
                {
                    mb.scanRoom(roomName);
                    this.scoreRemote(node,roomName);
                }
            }else{
                if(Game.creeps[roomName+'-sc'])Game.creeps[roomName+'-sc'].suicide()
                
                let currConSiteCount = Object.keys(Game.constructionSites).length;
                let pathsToMaintain = false;
                let controller = mb.getControllerForRoom(roomName,false);
                if(!controller){
                    node.badRooms.push(roomName);continue;
                }
                
                if(Game.time%500==0 && controller.haveVision)this.scoreRemote(node,roomName);
                
                /////////////// Harvesters  ///////////////////////////////////////////////////////
                for(let src of mb.getSources({roomNames:[roomName],requireVision:false})){
                    
                    /*let hName = roomName+'-'+src.pos.x+'-'+src.pos.y+'-h'
                    if(!Game.creeps[hName] && !Memory.invaderSeen[roomName]){
                        Game.spawns[node.name].spawnCreepX(harvesterBodyPlan,hName);
                    }
                    if(Game.creeps[hName] && !Game.creeps[hName].spawning){
                        harvesterRole.run(Game.creeps[hName],{coreRoomName:roomName,spawnFastFillerReady:node.spawnFastFillerReady});
                    }*/
                    
                    this.harvestPoint(node.name,roomName+'-'+src.pos.x+'-'+src.pos.y+'-h',harvesterBodyPlan,src);
                    
                    if(src.haveVision &&src.getMeta().pathed){
                        pathsToMaintain=true;
                    }
                   // if(roomName==='W5N9')clog(src.getMeta(),roomName)
                    //clog(currConSiteCount,'currConSiteCount')
                    
                    if(src.haveVision && Game.time%1000==0 && currConSiteCount ==0)src.setMetaAttr('pathed',false);
                    
                    let conSpace = 100-currConSiteCount;
                    
                    if(src.haveVision && !src.getMeta().pathed && src.haveContainer() && currConSiteCount<15 && node.controller().level>3){
                        let to = src.getStandingSpot();
                        if(to){
                            let result = PathFinder.search(Game.spawns[node.name].pos, rp(to.x,to.y,to.roomName) ,{swampCost:2,maxOps:10000});
                            
                            if( result.path.length<(100-currConSiteCount) ){
                                for(let pos of result.path){
                                    let pos2 = rp(pos.x,pos.y,pos.roomName);
                                    if(pos2.isWalkable())
                                        pos2.createConstructionSite(STRUCTURE_ROAD);
                                }
                                src.setMetaAttr('pathed',true);
                                currConSiteCount+=result.path.length
                            }
                            clog(result.path.length,"Remote path: "+src.pos)
                        }
                    }
                }
                
                /////////////// Others  ///////////////////////////////////////////////////////
                if(pathsToMaintain && node.controller().level>=3)this.maintainRoadsInRoom(node.name,roomName+'-w',roomName,'1w3c2m');
                this.keepRoomClearOfLv0InvaderCores(node.name,roomName+'-a','2a2m',roomName)
                this.defendRoom(node.name,roomName+'-guard',roomName);
                
                /////////////// Reserever  ///////////////////////////////////////////////////////
                if(eCap>=650){
                    let bodyPlan = eCap>=1300?'2cl2m':'1cl1m';
                  
                    this.reserverRoom(node.name,roomName+'-cl',controller,bodyPlan)
                }
                
            }
        }
    },
    
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
    
    manageWalls:function(node){
        
        // once all walls are heiggh enough, lets maybe build another
        if(Game.time%500==0 && node.defenceIntel.weakest_structure.hits>=node.wallHeight)this.wallCheck=undefined;
        let allRampsBuilt = true;
        if(this.wallCheck===undefined){
            for(let pos of Game.spawns[node.name].pos.findBuildableSpotsAtAreaEdge(10,4,6,12)){
                
                pos.createConstructionSite(STRUCTURE_RAMPART);
                allRampsBuilt=false;
                break;
            }
           
            if(allRampsBuilt){
                let antiBlinkWalls = Game.spawns[node.name].pos.getPositionsAtAreaEdge(12,6,8,14)
                this.buildWallRing(node,antiBlinkWalls)
                let antiContactWalls = Game.spawns[node.name].pos.getPositionsAtAreaEdge(11,5,7,13)
                this.buildWallRing(node,antiContactWalls)
            }
            
            this.wallCheck = Game.time;
        }
        
    },  
    
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
        let hostileIds = room.getNoneAllyCreeps();
        if(hostileIds.length==0)return;
        
        let towers = mb.getStructures({roomNames:[room.name],types:[STRUCTURE_TOWER]})
        
        let bodyPlan = "2a2m";
        if(room.energyCapacityAvailable>=550){
                 bodyPlan = "1t1m+3*1a1m";
             }
             
        if(towers.length==0){
            // if we have no towers just charge and hope for best
            for(let i in hostileIds){
                this.constantGuardRoom(node.name,"guard"+i,room.name,bodyPlan)
            }
        }else{
            
            let ramparts = mb.getStructures({roomNames:[room.name],types:[STRUCTURE_RAMPART]})
            if(ramparts.length<10){
                // we dont have a full wall so keep near the tower and then fight 
                for(let i in hostileIds){
                    this.constantGuardRoom(node.name,"guard"+i,room.name,bodyPlan,towers[0].pos,false,false,10);
                }
            }
            
        }
        
    },
    
    manageConstructionSites:function(node){
        
        if(node.controller().level==2)this.buildAtRCL2(node)
        if(node.controller().level==3)this.buildAtRCL3(node)
        if(node.controller().level==4)this.buildAtRCL4(node)
        if(node.controller().level==5)this.buildAtRCL5(node)
        if(node.controller().level==6)this.buildAtRCL6(node)
        if(node.controller().level==7)this.buildAtRCL7(node)
    },
    buildAtRCL7:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        
        if(!Game.spawns[node.name+'-2']){
            let siteToDelete = rp(spawn.pos.x-2,spawn.pos.y+6,room.name).lookForStructure(STRUCTURE_EXTENSION);
            if(siteToDelete)siteToDelete.destroy();
            rp(spawn.pos.x-2,spawn.pos.y+6,room.name).createConstructionSite(STRUCTURE_TOWER)
            
            // Length fills
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+6,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+5,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+7,STRUCTURE_ROAD);
            
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+8,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y+6,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y+7,STRUCTURE_EXTENSION);
            
            // fast-fill/closed fill
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y+2,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+6,STRUCTURE_CONTAINER);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+4,STRUCTURE_RAMPART);
            
             let sources = mb.getSources({roomNames:[room.name]});
            for(let src of sources){
                let buildableSpot = src.getStandingSpot().findNearbyBuildableSpot();
                if(buildableSpot)buildableSpot.createConstructionSite(STRUCTURE_EXTENSION);
            }
            
            if( node.defenceIntel.weakest_structure.hits>=10000){
                room.createConstructionSite(spawn.pos.x,spawn.pos.y+4,STRUCTURE_SPAWN,node.name+'-2');
            }
            
        }else{
            
        }
    },
    buildAtRCL6:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        // x exts + 
        // +1 link
        // +1 extractor, + terminal
       // let mineral = mb.getMineralForRoom(room.name);
        //mineral.pos.createConstructionSite(STRUCTURE_EXTRACTOR)
        let sources = mb.getSources({roomNames:[room.name]});
        let linkCount = mb.countStructures([STRUCTURE_LINK],[room.name])
        
        if( node.defenceIntel.weakest_structure.hits>=node.wallHeight){
            let siteToDelete = rp(spawn.pos.x+2,spawn.pos.y+1,room.name).lookForStructure(STRUCTURE_EXTENSION);
            if(siteToDelete)siteToDelete.destroy();
            rp(spawn.pos.x+2,spawn.pos.y+1,room.name).createConstructionSite(STRUCTURE_TERMINAL)
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+7,STRUCTURE_EXTENSION);
        }
        
        
        if(linkCount<3){
            for(let src of sources){
                if(!src.haveLink()){
                    let buildableSpot = src.getStandingSpot().findNearbyBuildableSpot();
                    if(buildableSpot)buildableSpot.createConstructionSite(STRUCTURE_LINK);
                    break;
                }
            }
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+1,STRUCTURE_RAMPART);
            /// Fast filler
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y,STRUCTURE_EXTENSION);
            
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y+1,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+1,STRUCTURE_ROAD);
            
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+2,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+2,STRUCTURE_EXTENSION);
            
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y+3,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+3,STRUCTURE_ROAD);
            
            room.createConstructionSite(spawn.pos.x-6,spawn.pos.y+4,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-5,spawn.pos.y+4,STRUCTURE_EXTENSION);
            
            // Length fills
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+5,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+5,STRUCTURE_ROAD);
            
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+6,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+6,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+7,STRUCTURE_EXTENSION);
           // 
            
            
        }
        if(linkCount==3 && this.linksSetup!=linkCount){
            util.setLinksInRoom(room.name);
            this.linksSetup=linkCount;
        }
    },
    buildAtRCL5:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        
            // 10 exts + 1 destroy
            // 1 tower
            // 2 links
            let siteToDelete = rp(spawn.pos.x,spawn.pos.y+2,room.name).lookForStructure(STRUCTURE_EXTENSION);
            if(siteToDelete)siteToDelete.destroy();
            rp(spawn.pos.x,spawn.pos.y+2,room.name).createConstructionSite(STRUCTURE_LINK)
            
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+7,STRUCTURE_EXTENSION);
             
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+7,STRUCTURE_EXTENSION);
            
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+8,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-1,spawn.pos.y+8,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+8,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+8,STRUCTURE_TOWER);
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+8,STRUCTURE_EXTENSION);
            
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+1,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+3,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-4,spawn.pos.y+4,STRUCTURE_EXTENSION);
            
        let sources = mb.getSources({roomNames:[room.name]});
        let linkCount = mb.countStructures([STRUCTURE_LINK],[room.name])
        
        if(linkCount<2)
        for(let src of sources){
            let buildableSpot = src.getStandingSpot().findNearbyBuildableSpot();
            if(buildableSpot)buildableSpot.createConstructionSite(STRUCTURE_LINK);
            break;
        }
        
        if(linkCount>=2 && this.linksSetup!=linkCount){
            util.setLinksInRoom(room.name);
            this.linksSetup=linkCount;
            //clog("here") 
            for(let src of sources){
                src.getStandingSpot().createConstructionSite(STRUCTURE_RAMPART);
                if(src.haveLink())src.getLink().pos.createConstructionSite(STRUCTURE_RAMPART);
            }
        }
        
            
        },
    buildAtRCL4:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        
        
        let extCount = mb.countStructures([STRUCTURE_EXTENSION],[room.name])
        
        
        if(node.haveStorage){
            let siteToDelete = rp(spawn.pos.x,spawn.pos.y+2,room.name).lookForStructure(STRUCTURE_CONTAINER);
            if(siteToDelete)siteToDelete.destroy();
            rp(spawn.pos.x+4,spawn.pos.y+1,room.name).createConstructionSite(STRUCTURE_ROAD);
            rp(spawn.pos.x+4,spawn.pos.y+2,room.name).createConstructionSite(STRUCTURE_ROAD);
            rp(spawn.pos.x+4,spawn.pos.y+3,room.name).createConstructionSite(STRUCTURE_ROAD);
            rp(spawn.pos.x,spawn.pos.y+2,room.name).createConstructionSite(STRUCTURE_EXTENSION);
            
        }
        if(extCount==20 && node.defenceIntel.weakest_structure.hits>=node.wallHeight){
            let siteToDelete = rp(spawn.pos.x+2,spawn.pos.y+2,room.name).lookForStructure(STRUCTURE_EXTENSION);
            if(siteToDelete)siteToDelete.destroy();
            rp(spawn.pos.x+2,spawn.pos.y+2,room.name).createConstructionSite(STRUCTURE_STORAGE);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+7,STRUCTURE_EXTENSION);

        }else{
            
             // gaining 10+1destroy EXTs
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+3,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+3,spawn.pos.y+3,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+3,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+3,STRUCTURE_EXTENSION);
            
            
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+4,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+3,spawn.pos.y+4,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+4,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-1,spawn.pos.y+4,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+4,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+4,STRUCTURE_EXTENSION);
            
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+5,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-1,spawn.pos.y+5,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+5,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+5,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+5,STRUCTURE_ROAD);
            
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+6,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x-1,spawn.pos.y+6,STRUCTURE_EXTENSION);
            
            room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+6,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+6,STRUCTURE_EXTENSION);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y+6,STRUCTURE_ROAD);
            
            
            room.createConstructionSite(spawn.pos.x-1,spawn.pos.y+7,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+7,STRUCTURE_ROAD);
            
            
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+3,STRUCTURE_RAMPART);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y,STRUCTURE_RAMPART);
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+2,STRUCTURE_RAMPART);
        }
        
        
    },
    
    buildAtRCL3:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        
        // gaining 5 EXTs
        room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+1,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+1,STRUCTURE_EXTENSION);
        
        room.createConstructionSite(spawn.pos.x-2,spawn.pos.y+2,STRUCTURE_CONTAINER);//
        room.createConstructionSite(spawn.pos.x-1,spawn.pos.y+2,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+2,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+2,STRUCTURE_EXTENSION);
        
        room.createConstructionSite(spawn.pos.x+2,spawn.pos.y+3,STRUCTURE_TOWER);

        
    },

    buildAtRCL2:function(node){
        let spawn = Game.spawns[node.name];
        let room = spawn.room;
        
         // gaining 5 EXTs
        room.createConstructionSite(spawn.pos.x-2,spawn.pos.y,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x-1,spawn.pos.y,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x+1,spawn.pos.y,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x+2,spawn.pos.y,STRUCTURE_EXTENSION);
        
        room.createConstructionSite(spawn.pos.x,spawn.pos.y+1,STRUCTURE_EXTENSION);
        room.createConstructionSite(spawn.pos.x,spawn.pos.y+2,STRUCTURE_CONTAINER);
        
        
        if(node.spawnFastFillerReady){
            room.createConstructionSite(spawn.pos.x-2,spawn.pos.y-1,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-1,spawn.pos.y-1,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x,spawn.pos.y-1,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+1,spawn.pos.y-1,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+2,spawn.pos.y-1,STRUCTURE_ROAD);
            
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x+3,spawn.pos.y,STRUCTURE_ROAD);
            room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+1,STRUCTURE_ROAD);
             room.createConstructionSite(spawn.pos.x+3,spawn.pos.y+1,STRUCTURE_ROAD);
             room.createConstructionSite(spawn.pos.x-3,spawn.pos.y+2,STRUCTURE_ROAD);
             room.createConstructionSite(spawn.pos.x+3,spawn.pos.y+2,STRUCTURE_ROAD);
        
        }
 
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
                clog("pathing src...",path.length)
                for(let point of path){
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
       runRemoteRoom:function(spawnName,roomName,reserve=true,specific_source_ids=[]){
           
           let spawnRCL = Game.spawns[spawnName].room.controller.level;
           
           if(!mb.hasRoom(roomName)){
               this.scoutRoom(spawnName,roomName,roomName+'-scout');
               mb.scanRoom(roomName);
               return;
           }
           if(reserve && spawnRCL>2){
                let controller = mb.getControllerForRoom(roomName,false)
                let reservedTime = 0;
                if(controller.haveVision && controller.reservation){
                    reservedTime=controller.reservation.ticksToEnd;
                }
                let resBody = spawnRCL>3?'2m2cl':'1m1cl';
                this.reserverRoom(spawnName,roomName+'-re',controller,resBody);
           }
           
           let sources = mb.getSources({roomNames:[roomName],requireVision:false});
           let harvebody='2w1c1m';
           if(spawnRCL==2){
               harvebody='4w1c2m';
           }
           if(spawnRCL>2){
               harvebody='6w1c3m';
           }
           let h=0;
           for(let src of sources){
               
               if(specific_source_ids.length==0 || specific_source_ids.includes(src.id)){
                   
                   this.harvestPoint(spawnName,roomName+'-ha-'+h,harvebody,src);
                   h++;
               }
               
           }
           
           this.defendRoom(spawnName,roomName+'-guard',roomName);
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
       scheduledAttack: function(){
           //return;
         // if(Game.time%5000===0) Memory.scheduledAttackState='scheduled';
          
            let logCPUUsag= false;
          
          //1483013 + 8.2k = 1491277
          let scheduledTick =51137033+6627;
           if(Game.time >scheduledTick && Memory.scheduledAttackState==='scheduled'){
               Memory.scheduledAttackState='mustering';
               clog('attack mustering')
           }else if(Memory.scheduledAttackState==='scheduled'){
               if(Game.time %10===0)clog((scheduledTick - Game.time)+" ticks at "+scheduledTick,"Scheduled attack in ")
           }else if(Memory.scheduledAttackState==='mustering' || Memory.scheduledAttackState==='attacking'){
               if(Game.time %10===0)clog(Memory.scheduledAttackState,"Scheduled attack underway ")
           }
           
           if(Memory.scheduledAttackState==='mustering' || Memory.scheduledAttackState==='attacking'){
            logs.startCPUTracker('scheduledAttack-prep');  
            // Attack Logistics ////////////////////////////////////////
                let go = (Memory.scheduledAttackState==='attacking');
               
                let attackRoom = 'W39N49';
                let musterSpot = rp(26,46,'W39N50');
                //let retreatSpots = [rp(47,25,attackRoom),rp(26,10,attackRoom),rp(22,10,attackRoom)];
                let retreatSpots = [rp(11,3,attackRoom),rp(11,5,attackRoom),rp(11,7,attackRoom)];
                let roomTraversal=['W42N52','W42N51','W42N50','W41N50','W40N50','W39N50','W39N49'];    
               // roomTraversal=['W14N18','W14N19','W14N20','W14N21','W15N21','W15N22','W15N23','W15N24','W16N24','W16N25','W16N25','W15N26','W14N26'];
               // roomTraversal=[];
                
            // Attack Targets  //////////////////////////////////////// 
                let target_ids = [];
                let destroyResourceBanks=false;
                if(go){
                    // entry rampart
                    let entryPoint = rp(34,4,attackRoom)
                    let entryWall = false;
                    if(Game.rooms[attackRoom]){
                        entryPoint.lookForStructure(STRUCTURE_WALL);
                        if(entryWall){
                            target_ids.push(entryWall.id)
                        }else {
                            entryWall = entryPoint.lookForStructure(STRUCTURE_RAMPART);
                            if(entryWall)
                                target_ids.push(entryWall.id)
                        }
                    }
                    // priority targets
                   // target_ids.push('63e309775f51119a5bf285af')
                    
                    
                    if(Game.time%10===0 && !entryWall)mb.scanRoom(attackRoom);
                    let highPriorityTargets=[STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_LINK];
                    let mediumPriorityTargets = [STRUCTURE_SPAWN,STRUCTURE_LAB,STRUCTURE_CONTAINER,STRUCTURE_EXTRACTOR];
                    if(destroyResourceBanks){
                        mediumPriorityTargets.push(STRUCTURE_STORAGE);
                        mediumPriorityTargets.push(STRUCTURE_TERMINAL);
                    }
                    /*STRUCTURE_STORAGE,STRUCTURE_TERMINAL*/
                    if(!entryWall){
                        let structureAnchorLookup = Game.creeps['duoL1']?Game.creeps['duoL1'].pos:retreatSpots[0]
                        
                        let priorityTarget = mb.getNearestStructure(structureAnchorLookup,highPriorityTargets,[attackRoom])
                        //clog(priorityTarget.pos)
                        let mediumTarget = mb.getNearestStructure(structureAnchorLookup,mediumPriorityTargets,[attackRoom])
                        let cleanupTarget = mb.getNearestStructure(structureAnchorLookup,[STRUCTURE_RAMPART],[attackRoom])
                        if(priorityTarget)target_ids.push(priorityTarget.id);
                        else if(mediumTarget)target_ids.push(mediumTarget.id);
                        else if(cleanupTarget)target_ids.push(cleanupTarget.id);
                    }
                    
                }
                logs.stopCPUTracker('scheduledAttack-prep',false);
                
               let allDuoCreepNames = ['duoL1','duoH1'/*,'duoL2','duoH2','duoL3','duoH3'*/];
               let renewSpawn = 'Zeta-3';
               
               let duoCount = allDuoCreepNames.length/2;
               
               let healerBody ='10*4h1m';
               healerBody='25h25m';
               //healerBody = '16*2h1m+1h1m';  
               let healerBoostPlan =[{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'648771d4ea93d5700d04f97d'},{resource_type:RESOURCE_LEMERGIUM_ALKALIDE,lab_id:'64d02f9357eb2e16b474a53b'}];
               let healerBoostPlan2 =[{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'648771d4ea93d5700d04f97d'},{resource_type:RESOURCE_LEMERGIUM_ALKALIDE,lab_id:'648728193d915148ff1d3911'}];
               healerBoostPlan =[{resource_type:RESOURCE_LEMERGIUM_OXIDE,lab_id:'64d0d5e29994c05d6f9c9e68'}];
               healerBoostPlan2 =[{resource_type:RESOURCE_LEMERGIUM_OXIDE,lab_id:'64d1adace48efe57667b5921'}];
               //healerBoostPlan=[];
               let dismantlerBody = '10*3w1m+5r5m';
               dismantlerBody='12*2w1m+4*2r1m+1w1m';
               dismantlerBody='2r23w25m';
               let dismantlerBoostPlan = [{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'648771d4ea93d5700d04f97d'},{resource_type:RESOURCE_ZYNTHIUM_ACID,lab_id:'6487f21514b4db61c6d46a2b'}];
               dismantlerBoostPlan=[];
               dismantlerBoostPlan = [{resource_type:RESOURCE_ZYNTHIUM_ACID,lab_id:'64d0aebf91220c75b2576df8'}];
               let attackerBody = '12*2a1m+4*2r1m+1a1m';
               attackerBody='5r20a25m'; 
               let attackerBoostPlan = [{resource_type:RESOURCE_ZYNTHIUM_OXIDE,lab_id:'648771d4ea93d5700d04f97d'},{resource_type:RESOURCE_UTRIUM_ACID,lab_id:'6487afae7817371e6cef1dd8'}];
               attackerBoostPlan=[];
               attackerBoostPlan = [{resource_type:RESOURCE_UTRIUM_ACID,lab_id:'64d0cd7fb263617fc28dfa35'}];
               
               let readyCount=0;
               let aliveCount=0;
               for(let myCreepName of allDuoCreepNames){
                   if(Game.creeps[myCreepName] && musterSpot.getRangeTo(Game.creeps[myCreepName])<4){
                       readyCount++;
                       
                   }
                   if(Game.creeps[myCreepName])aliveCount++;
               }
           
               if(aliveCount===0 &&  Memory.scheduledAttackState==='attacking'){
                    Memory.scheduledAttackState='ended'
               }
               
               if(readyCount===(duoCount*2)){
                   Memory.scheduledAttackState='attacking';
               }else{
                   if(Game.time%3===0){
                        clog(readyCount+'/'+allDuoCreepNames.length,'readyCount=')
                   }
               }
                
        
               if(Game.creeps['duoL1'] || Memory.scheduledAttackState==='mustering')
                    this.duoLeader('Zeta','duoL1',dismantlerBody,'duoH1',musterSpot,attackRoom,target_ids,retreatSpots[0],roomTraversal,go,renewSpawn,dismantlerBoostPlan,TOP)

                if(Game.creeps['duoH1'] || Memory.scheduledAttackState==='mustering')
                    this.duoHealer('Zeta','duoH1',healerBody,'duoL1', false, allDuoCreepNames,renewSpawn,healerBoostPlan,TOP)
                    
                /*
               if(Game.creeps['duoL2'] || Memory.scheduledAttackState==='mustering')
                    this.duoLeader('Zeta-2','duoL2',attackerBody,'duoH2',musterSpot,attackRoom,target_ids,retreatSpots[1],roomTraversal,go,renewSpawn,attackerBoostPlan,TOP)
                    
               if(Game.creeps['duoH2'] || Memory.scheduledAttackState==='mustering')
                    this.duoHealer('Zeta-2','duoH2',healerBody,'duoL2', false, allDuoCreepNames,renewSpawn,healerBoostPlan,TOP)
              
              
                if(Game.creeps['duoL3'] || Memory.scheduledAttackState==='mustering')
                    this.duoLeader('Zeta-3','duoL3',dismantlerBody,'duoH3',musterSpot,attackRoom,target_ids,retreatSpots[2],roomTraversal,go,renewSpawn,dismantlerBoostPlan,TOP)
                    
                if(Game.creeps['duoH3'] || Memory.scheduledAttackState==='mustering')
                    this.duoHealer('Zeta','duoH3',healerBody,'duoL3', false,allDuoCreepNames,renewSpawn,healerBoostPlan2,TOP)
                 */
                /*    
                if(Game.creeps['duoL4'] || Memory.scheduledAttackState==='mustering')
                    this.duoLeader('Alpha','duoL4','24r1a25m','duoH4',musterSpot,attackRoom,target_ids,retreatSpots[2],roomTraversal,go,'Alpha-3',[],LEFT)
                    
                if(Game.creeps['duoH4'] || Memory.scheduledAttackState==='mustering')
                    this.duoHealer('Alpha-2','duoH4','25h25m','duoL4', false,allDuoCreepNames,'Alpha-3',[],LEFT)
                    
                if(Game.creeps['duoL5'] || Memory.scheduledAttackState==='mustering')
                    this.duoLeader('Alpha','duoL5','24r1a25m','duoH5',musterSpot,attackRoom,target_ids,retreatSpots[2],roomTraversal,go,'Alpha-3',[],LEFT)
                    
                if(Game.creeps['duoH5'] || Memory.scheduledAttackState==='mustering')
                    this.duoHealer('Alpha-2','duoH5','25h25m','duoL5', false,allDuoCreepNames,'Alpha-3',[],LEFT)
                    
                 if(Game.creeps['duoL6'] || Memory.scheduledAttackState==='mustering')
                    this.duoLeader('Alpha','duoL6','24r1a25m','duoH6',musterSpot,attackRoom,target_ids,retreatSpots[2],roomTraversal,go,'Alpha-3',[],LEFT)
                    
                if(Game.creeps['duoH6'] || Memory.scheduledAttackState==='mustering')
                    this.duoHealer('Alpha-2','duoH6','25h25m','duoL6', false,allDuoCreepNames,'Alpha-3',[],LEFT)*/
               

                
       /*
                let pokeRoom = go?attackRoom:'W6N17';
               if(Game.creeps['pokey1'] || Memory.scheduledAttackState==='mustering')
                this.lv4InvaderCoreRanger('Zeta-2','pokey1',pokeRoom,'20r25m5h',target_ids, musterSpot)
                
                if(Game.creeps['pokey2'] || Memory.scheduledAttackState==='mustering')
                this.lv4InvaderCoreRanger('Zeta-2','pokey2',pokeRoom,'20r25m5h',target_ids, musterSpot)
                
                if(Game.creeps['pokey3'] || Memory.scheduledAttackState==='mustering')
                this.lv4InvaderCoreRanger('Zeta-2','pokey3',pokeRoom,'20r25m5h',target_ids, musterSpot)
                
                if(Game.creeps['pokey4'] || Memory.scheduledAttackState==='mustering')
                this.lv4InvaderCoreRanger('Zeta-2','pokey4',pokeRoom,'20r25m5h',target_ids, musterSpot)*/
           }
           
              
           let slammysRoom = 'W39N49';
           let target_ids = ['650a68359c9108f2ed9b5c4c','650a68469335d88cc4f06131','650a65df88fd0bfa231aeaf6','650a6446342b61d4bc8dcca1','6431e526aeebaa73ead5b5bd']
            
            if(Game.creeps['Slammy1'])
            this.breakStructures('Beta-3','Slammy1','25*1w1m',slammysRoom,target_ids);
           if(Game.creeps['Fighty1'])
            this.killCreepsBreakTarget('Beta-2','Fighty1','10*1a1m',slammysRoom,target_ids,[], true,rp(43,21,slammysRoom))
            /*this.breakStructures('Beta-3','Slammy2','25w25m',slammysRoom,target_ids);
            this.breakStructures('Beta-2','Slammy3','25w25m',slammysRoom,target_ids);
            if(Game.creeps['Slammy4'])this.breakStructures('Beta-2','Slammy4','25w25m',slammysRoom,target_ids);
          */
            
            if(Game.creeps['Fighty2'])
            this.killCreepsBreakTarget('Beta-3','Fighty2','25*1a1m',slammysRoom,target_ids,[], true)
            if(Game.creeps['Fighty3'])this.killCreepsBreakTarget('Beta-2','Fighty3','25*1a1m',slammysRoom,target_ids,[], true)
            if(Game.creeps['Fighty4'])this.killCreepsBreakTarget('Beta-3','Fighty4','25*1a1m',slammysRoom,target_ids,[], true)
            
        
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
            this.haulResources(feederName+'-2',roomNameToStrip+'-feeder0','10*2c1m',feederStorage,feedTarget,[RESOURCE_ENERGY],[],4000,100);
            this.haulResources(feederName+'-2',roomNameToStrip+'-feeder1','10*2c1m',feederStorage,feedTarget,[RESOURCE_ENERGY],[],4000,100);
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
                    if(strippedStorage && sPutIn.storingAtleast(1500)){
                        sPutIn = strippedStorage
                    }
                    
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX1','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX2','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX3','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX4','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX5','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX6','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
                    this.haulResources('Strip-'+roomNameToStrip,'SfeX7','5*2c1m',feederStorage,sPutIn,[RESOURCE_ENERGY],[],4000,200);
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
                    this.haulResources(spawnNameForFeeders,cname,funnelerBody,feederStorage, storeToFeed, [RESOURCE_ENERGY],[],4000,150);
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
              if(config.importer=='xx' && config.resource_type==RESOURCE_ENERGY/* && exportTerminal.pos.roomName=='W13N15'*/){
                  clog(config,'exporter '+exportCluster);
                  clog(spaceToReceive,'spaceToReceive')
                  clog(exportTerminal.storingAtleast( exportBatchSize, config.resource_type ),'exportTerminal.storingAtleast( exportBatchSize, config.resource_type )')
              }
              
            if( spaceToReceive && exportTerminal.storingAtleast( exportBatchSize, config.resource_type ) ){
                    
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
                if(haulJob.action =='fill' && storage.storingAtleast(creepSpace,haulJob.resource_type)){
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
                    if(config.action=='empty' && storage.haveSpaceFor(creepSpace,config.resource_type) && obj.storingAtleast(pickupAmount,config.resource_type) ){
                        creep.memory.job = { target_id:config.id, resource_type:config.resource_type, action:'empty' };
                        break;
                    }
                     let dropAmount = config.fillup?1:creepSpace;
                    if(config.action=='fill' && storage.storingAtleast(creepSpace,config.resource_type) && obj.haveSpaceFor(dropAmount,config.resource_type) ){
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
                        creep.say("w-r:"+res);
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
                    creep.say("t-r:"+resource_type.charAt(0)+":"+res);
                }else{
                    //if(creep.name=='thor-1')clog(targetStore.id,resource_type)
                    
                      let res =  this.actOrMove2(creep,targetStore,"transfer",resource_type);
           
                      creep.say("t:"+res);
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
                            this.withdrawThenRepair(spawnName,creepName,bodyPlan,id,creep.memory.fix_id);
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
                                
                               // creep.say('R')
                                this.withdrawThenRepair(spawnName,creepName,bodyPlan,id,repair_id);
                            }else{
                               
                               // creep.say('B')
                                this.withdrawThenBuild(spawnName,creepName,bodyPlan,id,conSite.id);
                            }
                            
                        }else{
                            //creep.say('U')
                            this.withdrawThenUpgrade(spawnName,creepName,bodyPlan,id,room.controller.id);
                        }
                        
                    }
                    
                }  
            
        } 
    },
    
    // designed to harvest a source, but first build a container to drop into,then pickup E at feet
    harvestPoint:function(spawnName,cname,bodyPlan,target){
        //Memory.invaderSeen={}
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
    claimRoom:function(spawnName,cname,target,bodyPlan='1cl1m'){
        
        let controller = Game.getObjectById(target.id);
        if(!Game.creeps[cname]){
            clog(Game.spawns[spawnName].spawnCreepX(bodyPlan,cname),cname);
        }
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            
            
            if(controller && controller.reservation && controller.reservation.username!='MadDokMike'){
                 creep.say("atck:"+this.actOrMove2(creep,target,"attackController"));
            }
            else if(controller && (!controller.sign || (controller.sign &&  controller.sign.username!='MadDokMike') ) ){
                creep.say("sign:"+this.actOrMove2(creep,target,'signController',"R.I.P tiny humans."));
                creep.say("claim:"+this.actOrMove2(creep,target,"claimController"));
            }else{
                creep.say("claim:"+this.actOrMove2(creep,target,"claimController"));
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
                    //creep.say('no targets')
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
                
                this.haulResources(spawnName,hName,haulerBody,gob(store_id),gob(container_id),[RESOURCE_ENERGY],[],4000,200 );
            }
        }
        if(Game.creeps[builderName])Game.creeps[builderName].say(haulersAlive+'/'+haulerCount+' haulers')
    },
    withdrawThenBuild: function(spawnName,cname,parts,container_id,site_id, WithdrawOnBuild=false){
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
     
            Game.spawns[spawnName].spawnCreepX(parts,cname,{spawn_name:spawnName});
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
    withdrawThenUpgrade: function(spawnName,cname,parts,container_id,controller_id,turbo=false,standingSpot=false,boostPlans=[]){
        
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
    farmStructureThenTransfer: function(spawnName,cname,parts,old_wall_ids,transfer_id,speedy=false){

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
    breakStructures: function(spawnName,cname,parts, roomName,ids){
        
         
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
    
    keepRoomClearOfLv0InvaderCores: function(spawnName,cname,parts,roomName){
        
        let room = Game.rooms[roomName];
        if(!room)return;
        
        
        let cores = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_INVADER_CORE]})
        
        if(Game.time%5000==0 && cores.length==0)mb.scanRoom(roomName);
        //clog(cores.length,roomName)
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
                    //clog("everyone TTL good",cname)
                    creep.memory.phase='boosting';
                }else{
                    //clog(creep.ticksToLive,cname + " my ttl")
                   //if(healer) clog(healer.ticksToLive,cname + " healer ttl")
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
                    logs.startCPUTracker('scheduledAttack-'+cname+'-attacking'); 
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
                    logs.stopCPUTracker('scheduledAttack-'+cname+'-attacking',false); 
                    return target;
                    
                }else{
                    
                    if(okToMove){
                        creep.say('MtA')
                        creep.moveToPos( retreatSpot );
                    }else{
                        creep.say("wait")
                    }
                }

                
            }else if( creep.memory.phase==='mustering' ){
                logs.startCPUTracker('scheduledAttack-'+cname+'-mustering'); 
                if(!creep.pos.isEqualTo(musterSpot)){
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
           // Game.rooms[roomName].controller.activateSafeMode();
        }
        
        
        if(Game.creeps[cname] && !Game.creeps[cname].spawning){
            let creep = Game.creeps[cname];
            creep.moveOffRoomEdge();
    
            if(creep.pos.roomName===roomName){
                
                /////////////////// Fighting /////////////////////////////////////////
                let fighterTarget = false;
                let distF = 99999;
                let fightersIn3 = 0;
                if(fighters.length>0){
                    
                    for(let fighter of fighters){
                        let d = creep.pos.getRangeTo(fighter);
                        if(d<3)fightersIn3++;
                        if(d < distF && d < maxDistance && !BOT_ALLIES.includes(fighter.owner.username)){
                            distF =d;
                            fighterTarget = fighter;
                        }
                        
                    }
                    
                    if(fighterTarget){
                        creep.actOrMoveTo("attack",fighterTarget);
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
        
        let hostiles = Game.rooms[roomName]?Game.rooms[roomName].getDangerousCreeps():[];
        for(var id in hostiles){
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
            Game.spawns[spawnName].spawnCreepX(baseBody,cname,{},true);
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
    killCreepsBreakTarget:function(spawnName,cname,parts,roomName,target_ids,roomTraversal=[], killCreeps=true,waitingSpot={x:25,y:25},dontFlee=false,kamakaziPos=false,publicMsg=false){
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
    
};
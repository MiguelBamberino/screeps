let VERSION='19.0';
if(!Memory.VERSION){Memory.VERSION=VERSION;}
if(!Memory.creeps) { Memory.creeps = {}; }
let _memHak = require('_memHak');
require('_dev_utils');

// 25,440
// Alpha - 258,991
require('global.objectMeta');
require('global.reservationBook');
require('global.mapBook');
require('global.logger');
require('global.GUI');


require('prototype.room');
require('prototype.room-position');
require('prototype.source');

require('prototype.structure.store');

require('prototype.spawn.main')();
require('prototype.creep');
require('prototype.creep.body');
require('prototype.creep.actions')();

global.tests = require('globals.tests');
let tempCode= require('tempCode');

_memHak.register();
    /**
     * name >> name of the town and what will be used for spawn names 
     * coreRoomName >> the central room name, with spawns
     * options:{
            spawnFacing:TOP         >> which way the main spawn should spawn its creeps
            retreatSpot:undefined   >> where creeps should flee if attack & where idle creeps park
            extraFastFillSpots:[]   >> any extra positions to send fast filler creeps
            logger:undefined        >> an object that allows this object to report messages to a log
            funnelRoomName:false    >> if set, then haulers will funnel energy to this room
     * }
     **/
const roomNode = require('class.roomNode');
const RemoteRoom = require('class.remoteRoom');
global.tr = new RemoteRoom('Epsilon','W11N13','East');
let nodes = [];
nodes.push( new roomNode('Alpha','W14N18',
                            {
                                spawnFacing:LEFT,
                                retreatSpot:rp(19,42,'W14N18'),
                                extraFastFillSpots:[rp(13,35,'W14N18'),rp(13,37,'W14N18'),rp(12,41,'W14N18'),rp(14,41,'W14N18')],
                                wallHeight:1500000,
                                upgradeRate:RATE_VERY_SLOW,
                                buildFast:false,
                                remoteRoomNames:['W13N18','W14N17','W14N19','W15N18','W15N19']
                            }
) );
/*
nodes.push( new roomNode('Beta','W17N18',
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(18,45,'W17N18'),
                                extraFastFillSpots:[ rp(17,38,'W17N18') , rp(18,36,'W17N18'),rp(14,42,'W17N18'),rp(16,42,'W17N18')],
                                wallHeight:1000000,
                                upgradeRate:RATE_OFF,
                                remoteRoomNames:[]
                            }

)  );*/

nodes.push( new roomNode('Gamma','W13N15',
                            {
                                spawnFacing:LEFT,
                                retreatSpot:rp(12,23,'W13N15'),
                                extraFastFillSpots:[rp(10,30,'W13N15'),rp(12,30,'W13N15')/*,rp(18,29,'W13N15')*/,rp(10,26,'W13N15'),rp(12,26,'W13N15') ],
                                wallHeight:1000000,
                                upgradeRate: RATE_FAST,
                                buildFast:false,
                                remoteRoomNames:['W12N15','W13N16','W14N15','W13N14','W12N16','W14N16'],
                                
                            }

)  );

nodes.push( new roomNode('Delta','W15N17',
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(10,27,'W15N17'),
                                buildFast:false,
                                upgradeRate:RATE_VERY_SLOW,
                                wallHeight:10000,
                                extraFastFillSpots:[rp(4,29,'W15N17'),rp(6,29,'W15N17'),rp(7,33,'W15N17'),rp(7,35,'W15N17'),rp(12,31,'W15N17'),rp(14,31,'W15N17')],
                                remoteRoomNames:['W16N18'],
                                funnelRoomName:'W16N17'
                            }
) );

nodes.push( new roomNode('Epsilon','W12N13',
                            {
                                spawnFacing:RIGHT,
                                retreatSpot:rp(24,12,'W12N13'),
                                buildFast:false,
                                upgradeRate:RATE_VERY_SLOW,
                                wallHeight:1000000,
                                extraFastFillSpots:[rp(36,8,'W12N13'),rp(36,6,'W12N13'),rp(38,6,'W12N13'),rp(38,8,'W12N13')],
                                remoteRoomNames:['W11N13','W13N13',/*'W11N12',*/'W11N14','W12N14'],
                                funnelRoomName:'W11N12'
                            }
) );

nodes.push( new roomNode('Zeta','W12N19',
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(10,14,'W12N19'),
                                buildFast:false,
                                upgradeRate:RATE_VERY_SLOW,
                                wallHeight:1000000,
                                extraFastFillSpots:[rp(9,20,'W12N19'),rp(11,20,'W12N19'),rp(13,11,'W12N19'),rp(13,9,'W12N19'),rp(9,6,'W12N19'),rp(9,8,'W12N19')],
                                remoteRoomNames:['W13N19','W11N19','W11N18','W12N18']
                            }
) );

nodes.push( new roomNode('Strip-W16N17','W16N17',
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(33,16,'W16N17'),
                                extraFastFillSpots:[ rp(37,18,'W16N17') , rp(39,18,'W16N17')],
                                wallHeight:1000000,
                                upgradeRate:RATE_OFF,
                                buildFast:false,
                                remoteRoomNames:[]
                            }

)  );

gui.init(nodes);
//nodes.push( new roomNode('Spawn1','sim',TOP) ); util.setupSim();

module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    logs.mainLoopStarted();
    
    reservationBook.runTick();
    
    tempCode.scoreThorium(true,true);
   
    for(let n of nodes){
        n.runTick();
    }
   
    logs.startCPUTracker('map');
    mb.runTick();
    logs.stopCPUTracker('map');
    
    if(Game.cpu.bucket>2000 ){
        tempCode.run();
    }
    global.tr.runTick()
    logs.mainLoopEnded();
    
    //////// GUI CODE  //////////////////////////////////
    let low = '#990000';
    let medium = '#ebab34';
    let high = '#83eb34';
    let ultra = '#34ebd9';
    renderThorium('W11N17', high)
    renderThorium('W11N18', ultra)
    renderThorium('W11N19', high)
    renderThorium('W12N18', medium)
    renderThorium('W12N17', medium)
    renderThorium('W12N16', ultra)
    renderThorium('W12N15', high)
    renderThorium('W13N19', medium)
    renderThorium('W13N18', low)
    renderThorium('W14N17', medium)
    renderThorium('W15N19' ,medium)
    renderThorium('W15N17', high)
    renderThorium('W16N17', high)
    renderThorium('W17N17', medium)
    renderThorium('W11N16', low)
    renderThorium('W11N15', medium)
    renderThorium('W11N14', low)
    renderThorium('W11N14', low)
    renderThorium('W11N12', ultra)
    renderThorium('W12N12', medium)
    renderThorium('W13N12', medium)
    renderThorium('W14N12', high)
    renderThorium('W15N12', high)
    renderThorium('W15N11', high)
    renderThorium('W14N11', high)
    renderThorium('W13N11', medium)
    renderThorium('W12N11', high)
    renderThorium('W11N11', low)
    renderThorium('W14N13', medium)
    renderThorium('W9N17',medium)
    renderThorium('W9N18',high)
    renderThorium('W9N19',ultra)
    renderThorium('W8N19',medium)
    renderThorium('W8N18',medium)
    renderThorium('W8N17',medium)
    renderThorium('W8N16',medium)
    renderThorium('W7N19',high)
    renderThorium('W7N18',high)
    renderThorium('W9N16',high)
    renderThorium('W7N17',ultra)
    renderThorium('W11N21',medium)
    renderThorium('W12N21',medium)
    renderThorium('W13N21',high)
    renderThorium('W14N21',high)
    renderThorium('W15N21',low)
    renderThorium('W16N21',medium)
    renderThorium('W17N21',medium)
    renderThorium('W18N21',high)
    renderThorium('W19N21',high)
    renderThorium('W19N22',high)
    renderThorium('W18N22',medium)
    renderThorium('W17N22',medium)
    renderThorium('W16N22',medium)
    renderThorium('W15N22',low)
    renderThorium('W14N22',medium)
    renderThorium('W14N22',high)
    renderThorium('W12N22',medium)
    renderThorium('W11N22',high)
    renderThorium('W9N21',ultra)
    renderThorium('W11N13',medium)
    renderThorium('W18N19',high)
    renderThorium('W18N18',medium)
    renderThorium('W18N17',high)
    renderThorium('W18N16',medium)
    renderThorium('W19N16',medium)
    renderThorium('W19N16',medium)
    renderThorium('W19N18',low)
    renderThorium('W19N19',high)
    renderThorium('W17N16',medium)
    renderThorium('W9N15',high)
    renderThorium('W9N14',medium)
    renderThorium('W9N13',medium)
    renderThorium('W8N13',medium)
    renderThorium('W8N14',high)
    renderThorium('W8N15',high)
    renderThorium('W11N23',low)
    renderThorium('W12N23',medium)
    renderThorium('W13N23',high)
    renderThorium('W14N23',high)
    renderThorium('W15N23',medium)
    renderThorium('W16N23',medium)
    renderThorium('W13N22',high)
    renderThorium('W11N24',medium)
    renderThorium('W12N24',medium)
    renderThorium('W13N24',medium)
    renderThorium('W9N21',ultra)
    renderThorium('W8N21',medium)
    renderThorium('W7N21',medium)
    renderThorium('W6N21',high)
    renderThorium('W5N21',medium)
    renderThorium('W5N22',ultra)
    renderThorium('W6N22',high)
    renderThorium('W7N22',low)
    renderThorium('W8N22',low)
    renderThorium('W9N22',ultra)
    renderThorium('W9N23',high)
    renderThorium('W9N24',high)
    renderThorium('W16N12',high)
    renderThorium('W17N12',low)
    renderThorium('W17N12',medium)
    renderThorium('W17N12',high)
    renderThorium('W17N11',medium)
    renderThorium('W16N11',medium)
    renderThorium('W15N13',medium)
    renderThorium('W16N13',medium)
    renderThorium('W17N13',medium)
    renderThorium('W12N25',high)
    renderThorium('W11N25',high)
    renderThorium('W13N25',medium)
    
    gui.render();
}
function renderThorium(roomName,amount){
    Game.map.visual.circle(new RoomPosition(25,25,roomName),{ radius:5,stroke: amount, fill: amount, opacity:0.8 })
}







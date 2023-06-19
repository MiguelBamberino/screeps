let VERSION='19.0';
if(!Memory.VERSION){Memory.VERSION=VERSION;}
if(!Memory.creeps) { Memory.creeps = {}; }
let _memHak = require('_memHak');
require('_dev_utils');

// 25,440

require('global.objectMeta');
require('global.reservationBook');
require('global.mapBook');
require('global.logger');
require('global.GUI');
gui.init();

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
global.tr = new RemoteRoom('Alpha','W14N17');
let nodes = [];
nodes.push( new roomNode('Alpha','W14N18',
                            {
                                spawnFacing:LEFT,
                                retreatSpot:rp(19,44,'W14N18'),
                                extraFastFillSpots:[rp(13,35,'W14N18'),rp(13,37,'W14N18'),rp(7,33,'W14N18'),rp(6,35,'W14N18')]
                            }
) );

nodes.push( new roomNode('Beta','W17N18',
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(18,45,'W17N18'),
                                extraFastFillSpots:[ rp(17,38,'W17N18') , rp(18,36,'W17N18'),rp(14,42,'W17N18'),rp(16,42,'W17N18')],
                                upgradeFast:false
                            }

)  );

nodes.push( new roomNode('Gamma','W13N15',
                            {
                                spawnFacing:LEFT,
                                retreatSpot:rp(22,24,'W13N15'),
                                extraFastFillSpots:[/*rp(18,27,'W13N15'),*/rp(18,29,'W13N15'),rp(10,26,'W13N15'),rp(12,26,'W13N15') ],
                                upgradeFast: false
                            }

)  );

nodes.push( new roomNode('Delta','W14N19',
                            {
                                spawnFacing:TOP,
                                retreatSpot:rp(26,11,'W14N19'),
                                buildFast:false,
                                upgradeFast:false,
                                extraFastFillSpots:[rp(31,17,'W14N19'),rp(29,17,'W14N19')]
                            }
) );

//nodes.push( new roomNode('Spawn1','sim',TOP) ); util.setupSim();

module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    logs.mainLoopStarted();
    
    reservationBook.runTick();
   
    for(let n of nodes){
        n.runTick();
    }
   
    logs.startCPUTracker('map');
    mb.runTick();
    logs.stopCPUTracker('map');
    
    if(Game.cpu.bucket>2000 ){
        tempCode.run();
    }
    
    logs.mainLoopEnded();
    
    //////// GUI CODE  //////////////////////////////////
    gui.render();
}
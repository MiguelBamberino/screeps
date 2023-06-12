let VERSION='19.0';
if(!Memory.VERSION){Memory.VERSION=VERSION;}
if(!Memory.creeps) { Memory.creeps = {}; }
let _memHak = require('_memHak');
require('_dev_utils');


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

const roomNode = require('class.roomNode');
let nodes = [];
nodes.push( new roomNode('Alpha','W14N18',LEFT,[rp(13,35,'W14N18'),rp(13,37,'W14N18'),rp(7,33,'W14N18'),rp(6,35,'W14N18')]) );
nodes.push( new roomNode('Beta','W17N18',TOP,[ rp(17,38,'W17N18') , rp(18,36,'W17N18'),rp(14,42,'W17N18'),rp(16,42,'W17N18') ])  );
nodes.push( new roomNode('Gamma','W13N15',LEFT,[rp(18,27,'W13N15'),rp(18,29,'W13N15'),rp(10,26,'W13N15'),rp(12,26,'W13N15') ])  );
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
    //tempCode.harvestMineral('Spawn1','shx','1w1c1m',{id:'d8842cf53856605a56712d67',pos:{x:1,y:1,roomName:'sim'}},RESOURCE_ZYNTHIUM);
    
    logs.mainLoopEnded();
    
    //////// GUI CODE  //////////////////////////////////
    gui.render();
}
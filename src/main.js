let VERSION='19.1';
if(!Memory.VERSION){Memory.VERSION=VERSION;}
if(!Memory.creeps) { Memory.creeps = {}; }
require('global.logger');
logs.globalResetStarted();
let _memHak = require('_memHak');
let _config= require('_shard_config');
require('_dev_utils');

Memory.allies=['NeonCamouflage']

require('global.objectMeta');
require('global.reservationBook');
require('global.mapBook');
require('global.logger');
require('global.GUI');
global.tests = require('globals.tests');

require('prototype.room');
require('prototype.room-position');

require('prototype.source');
require('prototype.structure.store');

require('prototype.spawn.main')();
require('prototype.creep');
require('prototype.creep.body');
require('prototype.creep.actions')();


let tempCode= require('tempCode');

_memHak.register();

global.RATE_VERY_FAST='very-fast';
global.RATE_FAST='fast';
global.RATE_SLOW='slow';
global.RATE_VERY_SLOW='very-slow';
global.RATE_SCALE_WITH_SURPLUS='scale-with-surplus';
global.RATE_OFF='off';
//const RemoteRoom = require('class.remoteRoom');
//global.tr = new RemoteRoom('Epsilon','W11N13','East');
//global.betaLabComplex = new LabComplex(rp(33,32,'W41N53'),TOP_LEFT);
//global.episilonLabComplex = new LabComplex(rp(37,26,'W41N54'),TOP_LEFT)
global.nodes = _config.createRoomNodes('shard3');

gui.init(nodes);
//nodes.push( new roomNode('Spawn1','sim',TOP) ); util.setupSim();
logs.globalResetComplete();


module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    logs.mainLoopStarted();
    
    logs.startCPUTracker('rBook.runTick');
    reservationBook.runTick();
    logs.stopCPUTracker('rBook.runTick');
    for(let n in nodes){
        nodes[n].runTick();
    }
   
    logs.startCPUTracker('map.runTick');
    mb.runTick();
    logs.stopCPUTracker('map.runTick');
    
    if(Game.cpu.bucket>2000 ){
        logs.startCPUTracker('tempCode');
        tempCode.run();
        logs.stopCPUTracker('tempCode');
        logs.startCPUTracker('scheduledAttack');
        tempCode.scheduledAttack();
        logs.stopCPUTracker('scheduledAttack',false);
        
    }
    
    logs.mainLoopEnded();
    
   // clog(Game.cpu.getHeapStatistics())
    
    //////// GUI CODE  //////////////////////////////////
    
    gui.render();
    //gui.renderComplexPlan(episilonLabComplex)
}






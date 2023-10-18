global.BOT_VERSION='19.3';
global.BOT_ALLIES = ['NeonCamouflage'];
 
if(!Memory.VERSION){Memory.VERSION=BOT_VERSION;}
if(!Memory.creeps) { Memory.creeps = {}; }
   
   
require('global.logger');
logs.globalResetStarted();
 
let _memHak = require('_memHak');

let _config= require('_server_config');

require('_dev_utils');



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
global.RUN_FOREVER=9999999;
//const RemoteRoom = require('class.remoteRoom');

util.setupNodes()

gui.init(nodes);
//nodes.push( new roomNode('Spawn1','sim',TOP) ); util.setupSim();
logs.globalResetComplete();


module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==BOT_VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    //util.findGoodSpawnSpot('W8N3')
    //util.renderFootPrint(rp(32,10,'W8N3')) // rp(25,25,'W8N3')
    
    if(util.allowTick()){
        
        logs.mainLoopStarted();
        
        
       // clog(ec.runTick(),'extractor');
        
        
        logs.startCPUTracker('rBook.runTick');
        reservationBook.runTick();
        logs.stopCPUTracker('rBook.runTick');
        for(let n in nodes){
            nodes[n].runTick();
        }
       
        logs.startCPUTracker('map.runTick');
        mb.runTick();
        logs.stopCPUTracker('map.runTick');
        
        if(Game.cpu.bucket>2000){
            logs.startCPUTracker('tempCode');
            tempCode.run();
            logs.stopCPUTracker('tempCode',false);
            logs.startCPUTracker('scheduledAttack');
            tempCode.scheduledAttack();
            logs.stopCPUTracker('scheduledAttack',false);
            
        }
        
        
        
        logs.mainLoopEnded();
        
        //////// GUI CODE  //////////////////////////////////
        
        gui.render();
        gui.renderComplexStats(nodes.i.extractorComplex)
    }
    
}






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

const traderClass = require('class.trader');
global.trader = new traderClass();
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

util.setupNodes()

gui.init(nodes);

logs.globalResetComplete();

for(let n in nodes){
    for(let exp of nodes[n].exports){
        trader.offerExport( exp.resource_type, nodes[n].coreRoomName );
    }
}


module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==BOT_VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    if(util.allowTick()){
        
        logs.mainLoopStarted();
        
        reservationBook.runTick();
        
        for(let n in nodes){
            
            if( ["a","d"].includes(n) && Game.cpu.bucket<2000)continue;
            
            nodes[n].runTick();
        }
       
        
        mb.runTick();
        
        if(Game.cpu.bucket>1000){
            logs.startCPUTracker('tempCode');
            tempCode.run();
            logs.stopCPUTracker('tempCode',false);
            logs.startCPUTracker('scheduledAttack');
            tempCode.scheduledAttack();
            logs.stopCPUTracker('scheduledAttack',false);
            
        }
        
        if(Game.cpu.bucket>8000 && Game.time%100===0){
            runMarket();
        }
        
        logs.mainLoopEnded();
        
        //////// GUI CODE  //////////////////////////////////
        
        gui.render();
        gui.renderComplexStats(nodes.i.extractorComplex)
        gui.renderComplexStats(nodes.z.extractorComplex)
        gui.renderComplexStats(nodes.k.extractorComplex)
        
        gui.renderComplexStats(nodes.m.extractorComplex)
        gui.renderComplexStats(nodes.i.labComplex)

        gui.renderComplexStats(nodes.z.extractorComplex)
        gui.renderComplexStats(nodes.k.extractorComplex)

        gui.renderComplexStats(nodes.m.extractorComplex)
        gui.renderComplexStats(nodes.i.labComplex)
        
        ///////////////////////
      
        /*
        use this to estimate your heap usage
  const heapData = Game.cpu.getHeapStatistics!();
  const heapUsed = (heapData.total_heap_size + heapData.externally_allocated_size) / heapData.heap_size_limit;
        */

    }
    
}







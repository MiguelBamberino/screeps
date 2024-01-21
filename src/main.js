global.BOT_VERSION='19.3';

global.BOT_ALLIES = [];
 
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


const LabComplex = require('class.complex.lab')

 
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

mb.createMapRoute(['W41N53','W40N53','W40N52','W39N52'])

module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==BOT_VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}

    //Game.rooms['E7N5']._debugSetEnemies('dangerousCreeps',['bob']);Game.rooms['E7N5']._debugSetEnemies('nonallies',['bob']);Game.rooms['E7N5']._debugSetEnemies('enemyPlayerFighters',['bob'])
    //if(Game.creeps['bob'] && Game.creeps['bob'].ticksToLive < 1450) Game.rooms['E7N5']._debugSetEnemies(['bob']);
    
    if(util.debug)rp(35,23,'W45N51').findBestStandingSpots(Game.spawns['Theta'].pos,3,9)
    
    if(util.allowTick()){
        
        logs.mainLoopStarted();
        
        reservationBook.runTick();
        
        logs.startCPUTracker('nodes');
        for(let n in nodes){
            //logs.startCPUTracker(nodes[n].name);
            if( ["a","d"].includes(n) && Game.cpu.bucket<2000)continue;
            
            nodes[n].runTick();
            //logs.stopCPUTracker(nodes[n].name,true);
        }
       logs.stopCPUTracker('nodes',false);
        
        mb.runTick();
        
        if(Game.cpu.bucket>1000 || Game.time < 50){
            logs.startCPUTracker('tempCode');
            tempCode.run();
            logs.stopCPUTracker('tempCode',false);
            
        }
        
        if(Game.cpu.bucket>8000 && Game.time%100===0){
            runMarket();
        }
        if(Game.cpu.bucket>5000 && Game.time%20===0){
            logs.startCPUTracker('processOrders');
            trader.processOrders();
            logs.stopCPUTracker('processOrders',false);
        }
        
        logs.mainLoopEnded();
        
        //////// GUI CODE  //////////////////////////////////
        
        gui.render();
        
        gui.renderComplexStats(nodes.t.extractorComplex)
        if(false && Game.cpu.bucket>1000 &&util.getServerName()==='shard3'){
            gui.renderComplexStats(nodes.i.extractorComplex)
            gui.renderComplexStats(nodes.z.extractorComplex)
            gui.renderComplexStats(nodes.k.extractorComplex)
            
            gui.renderComplexStats(nodes.m.extractorComplex)
            gui.renderComplexStats(nodes.i.labComplex)
    
            gui.renderComplexStats(nodes.z.extractorComplex)
            gui.renderComplexStats(nodes.k.extractorComplex)
    
            gui.renderComplexStats(nodes.m.extractorComplex)
            gui.renderComplexStats(nodes.i.labComplex)
            //mb.renderKiteGroups('W41N54')
        }
       
        ///////////////////////
        
    }
    
}







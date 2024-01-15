global.BOT_VERSION='19.3';

global.BOT_ALLIES = ['asdpof','harabi','Mirroar','Modus','Nightdragon','Robalian','SBense','Trepidimous','Yoner'];
 
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



// BETA
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0'])
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E29N25'])
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E30N24'])
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E30N26','E30N27','E29N27','E28N25','E27N25','E27N26','E27N27'])

mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E30N24','E29N24'])
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E30N26','E30N27','E29N27'])
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E30N24','E30N23','E29N23'])
mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E29N25','E28N25','E27N25','E26N25','E26N24'])

mb.createMapRoute(['E6N3','E6N2','E6N1','E5N1','E5N0','portal','E30N25','E29N25','E28N25'])

// DELTA
mb.createMapRoute(['E7N5','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E24N20','E23N20','E23N21'])
mb.createMapRoute([ 'E7N5','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E24N20','E24N21'])

// GAMMA
mb.createMapRoute(['E3N5','E2N5','E1N5','E0N5'])

mb.createMapRoute(['E3N5','E2N5','E1N5','E0N5','portal','E25N30'])
mb.createMapRoute(['E3N5','E2N5','E1N5','E0N5','portal','E25N30','E25N29'])

mb.createMapRoute(['E3N5','E2N5','E1N5','E0N5','portal','E25N30','E25N29','E25N28'])

// ALPHA
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5'])
mb.createMapRoute(['E7N4', 'E7E10N5N3','E7N2','E7N1','E7N0','E6N0','E5N0'])
mb.createMapRoute(['E7N4', 'E7N3','E7N2','E8N2','E8N1','E8N0','E9N0','E10N0'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','portal','E26N20','E26N21'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E26N21','E26N22','E26N23'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E26N21','E26N22','E27N22'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E27N20','E28N20','E28N21'])

mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E27N20','E27N21'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E24N20','E24N21'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E25N21'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E26N21','E26N22','E25N22'])

mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E25N21','E25N22','E25N23'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E25N21','E25N22','E24N22'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E27N20'])


mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E24N20','E23N20','E23N21'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E24N20','E23N20','E22N20','E21N20','E21N21'])

mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E27N20','E28N20','E29N20','E29N21'])
mb.createMapRoute(['E7N4', 'E8N4','E8N5','E9N5','E10N5','E10N5>portal>E25N20','E25N20','E26N20','E27N20','E28N20','E28N21','E28N22'])

mb.createMapRoute(['E6N3', 'E6N2','E6N1','E6N0','E5N0','portal','E30N25'])

let doCMS = true;

module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==BOT_VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    if(doCMS){ 
        mb.markRoomDeadly('E5N6')
        doCMS=false;
    }
    
    //Game.rooms['E7N5']._debugSetEnemies('dangerousCreeps',['bob']);Game.rooms['E7N5']._debugSetEnemies('nonallies',['bob']);Game.rooms['E7N5']._debugSetEnemies('enemyPlayerFighters',['bob'])
    //if(Game.creeps['bob'] && Game.creeps['bob'].ticksToLive < 1450) Game.rooms['E7N5']._debugSetEnemies(['bob']);
    
    if(util.allowTick()){
        
        logs.mainLoopStarted();
        
        reservationBook.runTick();
        
        for(let n in nodes){
            
            if( ["a","d"].includes(n) && Game.cpu.bucket<2000)continue;
            
            nodes[n].runTick();
        }
       
        
        mb.runTick();
        
        if(Game.cpu.bucket>1000 || Game.time < 50){
            logs.startCPUTracker('tempCode');
            tempCode.run();
            logs.stopCPUTracker('tempCode',false);
            logs.startCPUTracker('scheduledAttack');
            //tempCode.scheduledAttack();
            logs.stopCPUTracker('scheduledAttack',false);
            
        }
        
        if(Game.cpu.bucket>8000 && Game.time%100===0){
            //runMarket();
        }
        if(Game.cpu.bucket>5000 && Game.time%20===0){
            logs.startCPUTracker('processOrders');
            trader.processOrders();
            logs.stopCPUTracker('processOrders',false);
        }
        
        logs.mainLoopEnded();
        
        //////// GUI CODE  //////////////////////////////////
        
        gui.render();
        let anchor = Game.spawns['Delta'].pos;
        //let lab = new LabComplex( rp( anchor.x-3,anchor.y+6,anchor.roomName ),TOP_RIGHT,600,true)
       // gui.renderComplexPlan(lab)
        gui.renderComplexStats(nodes.a.extractorComplex)
         gui.renderComplexStats(nodes.b.extractorComplex)
        
        if( Game.cpu.bucket>1000 &&util.getServerName()==='shard3'){
            gui.renderComplexStats(nodes.i.extractorComplex)
            gui.renderComplexStats(nodes.z.extractorComplex)
            gui.renderComplexStats(nodes.k.extractorComplex)
            
            gui.renderComplexStats(nodes.m.extractorComplex)
            gui.renderComplexStats(nodes.i.labComplex)
    
            gui.renderComplexStats(nodes.z.extractorComplex)
            gui.renderComplexStats(nodes.k.extractorComplex)
    
            gui.renderComplexStats(nodes.m.extractorComplex)
            gui.renderComplexStats(nodes.i.labComplex)
        }

        
        ///////////////////////
        
    }
    
}







global.BOT_VERSION='20.0';
console.log("-----------------------------------------------")
console.log("Global Reset:",Game.time)
console.log("-----------------------------------------------")

if(!Memory.VERSION){Memory.VERSION=BOT_VERSION;}
   
require('global.logger');
logs.globalResetStarted();
 
let _memHak = require('_memHak');

/////////////////////////////////////////////////////////////////////////////////////////////////
// Global Constants
/////////////////////////////////////////////////////////////////////////////////////////////////
global.BOT_ALLIES = ['Kalgen','WhiteTurbine','Dakryolith','FR4C74LH3X','Tigga','joethebarber','GT500','CaptainMuscles'];
global. _SERVER_CONFIG = false;
global.RATE_VERY_FAST='very-fast';
global.RATE_FAST='fast';
global.RATE_SLOW='slow';
global.RATE_VERY_SLOW='very-slow';
global.RATE_SCALE_WITH_SURPLUS='scale-with-surplus';
global.RATE_OFF='off';
global.RUN_FOREVER=9999999;

/////////////////////////////////////////////////////////////////////////////////////////////////
// Game Prototype Overrides
/////////////////////////////////////////////////////////////////////////////////////////////////
require('prototype.room');
require('prototype.room-position');

require('prototype.source');
require('prototype.structure.store');

require('prototype.spawn.main')();
require('prototype.creep');
require('prototype.creep.body');
require('prototype.creep.actions')();

/////////////////////////////////////////////////////////////////////////////////////////////////
// Global Classes
/////////////////////////////////////////////////////////////////////////////////////////////////
const traderClass = require('class.trader');
global.trader = new traderClass();
global.RoomNode = require('class.roomNode');
global.LabComplex = require('class.complex.lab')


/////////////////////////////////////////////////////////////////////////////////////////////////
// Global Objects
/////////////////////////////////////////////////////////////////////////////////////////////////
require('_dev_utils');
require('global.objectMeta');
require('global.reservationBook');
require('global.mapBook');
require('global.logger');
require('global.GUI');
global.tests = require('globals.tests');

/////////////////////////////////////////////////////////////////////////////////////////////////
// Load in Server
/////////////////////////////////////////////////////////////////////////////////////////////////
util.loadServer();

global.tempCode = require('tempCode')
_memHak.register();

gui.init();

logs.globalResetComplete();

for(let n in nodes){
    if(nodes[n].online && nodes[n].exports)
    for(let exp of nodes[n].exports){
        trader.offerExport( exp.resource_type, nodes[n].coreRoomName );
    }
}

for(let name in Game.creeps){
    let n = name.charAt(0).toLowerCase();
    // ignore creeps not part of a home room, using role system
    if(!Game.creeps[name].memory || !Game.creeps[name].memory.role)continue;

    if(nodes[n] && !nodes[n].creepNames.includes(name))nodes[n].creepNames.push(name);
}

module.exports.loop = function () {
    //return;
    if(!util.allowTick()){return}
    _memHak.pretick();
    util.detectRespawn();

    //Game.rooms['E7N5']._debugSetEnemies('dangerousCreeps',['bob']);Game.rooms['E7N5']._debugSetEnemies('nonallies',['bob']);Game.rooms['E7N5']._debugSetEnemies('enemyPlayerFighters',['bob'])
    //if(Game.creeps['bob'] && Game.creeps['bob'].ticksToLive < 1450) Game.rooms['E8S15']._debugSetEnemies(['bob']);
    //tempCode.scoutRoom('Kappa','bob','E8S15',{x:31,y:25},[],'1r1m')

    try {
        logs.mainLoopStarted();
        logs.startCPUTracker('rb.runTick');
        reservationBook.runTick();
        logs.stopCPUTracker('rb.runTick',false);

        logs.startCPUTracker('nodes');
        for (let n in nodes) {
            logs.startCPUTracker(nodes[n].name);
            try {

                if (nodes[n].allowCPUShutdown && Game.cpu.bucket < 2000) nodes[n].online = false;
                if (nodes[n].allowCPUShutdown && Game.cpu.bucket > 4000) nodes[n].online = true;
                if (nodes[n].online) nodes[n].runTick();
            } catch (e) {
                console.log("ERROR:", nodes[n].name);
                console.log(e,e.stack);
                if (util.throwErrors) throw e;
            }
            logs.stopCPUTracker(nodes[n].name, false);
        }
        logs.stopCPUTracker('nodes', false);

        logs.startCPUTracker('map.runTick');
        mb.runTick();
        logs.stopCPUTracker('map.runTick',false);

        if (Game.cpu.bucket > 1000 || Game.time < 50) {
            logs.startCPUTracker('tempCode');
            tempCode.run();
            logs.stopCPUTracker('tempCode', false);

        }

        if (Game.cpu.bucket > 8000 && Game.time % 100 === 0 && util.getServerName() === 'shard3') {
            runMarket();
        }
        if (Game.cpu.bucket > 5000 && Game.time % 20 === 0) {
            logs.startCPUTracker('processOrders');
            trader.processOrders();
            logs.stopCPUTracker('processOrders', false);
        }

        logs.mainLoopEnded();

    }catch (e) {
        console.log("ERROR:Main-Loop",e);
        console.log("STACK:",e.stack);
        if (util.throwErrors) throw e;
    }
        //////// GUI CODE  //////////////////////////////////
        try {
            let used = Game.cpu.getUsed();
            if(used>400){console.log("ERROR: loop cut short. ",used,"cpu used before GUI.") ;return false;}
            gui.render();
        }catch (e){
            console.log("ERROR:GUI",e);
            if(util.throwErrors)throw e;
        }
        //gui.renderComplexPlan(nodes.k.coreComplex)
        //gui.renderComplexPlan(nodes.k.armComplex)
        //let labs = new LabComplex( rp( 30,9,'W13S24' ),TOP_LEFT,600,7,true)
        //gui.renderComplexPlan(labs)

        if( Game.cpu.bucket>1000 && util.getServerName()==='shard3'){
             gui.renderComplexStats(nodes.t.extractorComplex)
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







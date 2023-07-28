let VERSION='18.4';
let bob='hello bob';
if(!Memory.VERSION){Memory.VERSION=VERSION;}

let _memHak = require('_memHak');
 

global.clog = function(data,label){
    if(typeof data==='object'){
        console.log(label+" : ");
        let s = JSON.stringify(data, null, 2);
        console.log(s);
    }else{
        console.log(label+" : "+data);
    }
}

global.packrat = require('_packRat');
const gi = require('global.GameInterval');
global.Interval = new gi();
//console.log(packrat)
const MemoryCollection2 = require('class.memory-collection-2');
global.mc = new MemoryCollection2('mcTest');

//const StatLog = require('class.statthing');
//let logA = new StatLog("test");

global.quad = require('quad');
//global.quad.resetMemory();

require('global.upgrader');

require('global.objectMeta');
require('global.reservationBook');

require('global.mapBook');
require('global.logger');
require('global.GUI');
gui.init();


var spawnRole = require('role.spawn');

require('prototype.source');
require('prototype.room');
require('prototype.structure.store');
require('prototype.room-position');
require('prototype.spawn.main')();
require('prototype.creep')();
require('prototype.creep.body');
require('prototype.creep.actions')();

global.tests = require('tests');
let tempCode= require('tempCode');

_memHak.register();

let nodes = ['Alpha','Beta','Gamma','Delta','Epsilon']; // Epsilon
nodes =['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta'];
if(Game.rooms['sim'])nodes=['Spawn1'];
module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");upgrader.recycle_all_creeps();return;}
    
    
    logs.mainLoopStarted();
    
    reservationBook.runTick();

    

    //////// RUN SPAWN ACTIVITIES     //////////////////////////////////
    for(let s of nodes){
        logs.startCPUTracker(s);
        spawnRole.run(Game.spawns[s] , mb); 
        logs.stopCPUTracker(s);
    }
    tempCode.runFillers();
    for(let r of ['W41N53','W41N54','W41N55','W42N54','W42N53','W45N51','W46N53','W42N52'])
        tests.runLinkSend(r);
    
    logs.startCPUTracker('map');
    mb.runTick();
    logs.stopCPUTracker('map');
    
    Game.getObjectById('5bbcaab49099fc012e632090').updateReport();
    Game.getObjectById('5bbcaab49099fc012e63208e').updateReport();
    
    if(Game.cpu.bucket>2000){
        tempCode.run();
    }
    
    logs.mainLoopEnded();
    
    quad.run();
    
    //////// GUI CODE  //////////////////////////////////
    gui.render();

}

/*

gui.on()
gui.off()
gui.cpu.on()
gui.cpu.off()
gui.mb.on/off() // mapBook stats

gui.alpha.rbs.on/off() // reserve-books summary
gui.alpha.rbs.filter()

gui.alpha.rb('ex04').on/off() // specific reseve book

gui.alpha.summary.on/off()



*/




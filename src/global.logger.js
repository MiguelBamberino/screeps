
global.logs = {
    cpuTrackers:{},
    creepTrackers:{},
    lastTickAt:0,
    msSinceLastTick:0,
    globalResetCPU:0,
    globalResetTick:0,
    expectedCPUProfit:0,
    cpuOnMem:0,
    bucketAtLastLoopEnd:0,
    guiCPU:0,
    initiate: function(){
        if(!Memory.logs){
            Memory.logs={trace:false,stats:{}};
        }
    },
    log: function(category,msg){
        //console.log("GT:"+Game.time+": "+category+" : "+msg);
    },
    globalResetStarted: function(){

    },
    globalResetComplete:function(){
        this.globalResetCPU = Game.cpu.getUsed();
        this.globalResetTick = Game.time;
    },
    mainLoopStarted: function(){
        this.msSinceLastTick = Date.now() - this.lastTickAt;
        this.lastTickAt = Date.now();
        this.cpuTrackers={};
        if(Game.cpu.bucket<10000){
            actualCPUProfit = Game.cpu.bucket - this.bucketAtLastLoopEnd
            this.cpuOnMem = this.expectedCPUProfit - actualCPUProfit - this.guiCPU;
        }
        //clog(Game.cpu.bucket,'bucketAtLoopStart')
        //clog(this.expectedCPUProfit,'expectedCPUProfit')
        //clog(actualCPUProfit,'actualCPUProfit')
        //clog(this.cpuOnMem,'cpuOnMem')
        this.startCPUTracker('total');
    },
    mainLoopEnded: function(){
        let cpuUsed = this.stopCPUTracker('total');
        let cpuTickBudget = 20;
        //clog('------------------')
        //clog(cpuUsed,'cpuUsed')
        this.expectedCPUProfit = cpuTickBudget - cpuUsed;
        this.bucketAtLastLoopEnd = Game.cpu.bucket;
        //clog(this.expectedCPUProfit,'expectedCPUProfit')
        //clog(this.bucketAtLastLoopEnd,'bucketAtLastLoopEnd')
    },
    totalCPUUsed:function(){
        return this.cpuTrackers['total'].stop - this.cpuTrackers['total'].start;
    },
    startCreepTracker:function(creep){
        this.creepTrackers[creep.name] = {name:creep.name,startCPU:Game.cpu.getUsed(),cpu:0,role:creep.memory.role};
    },
    stopCreepTracker:function(creep){
       this.creepTrackers[creep.name].cpu = Game.cpu.getUsed() - this.creepTrackers[creep.name].startCPU;
    },
    getCreepTrackData:function(){
        let d=[];
        for(let name in this.creepTrackers){
            d.push(this.creepTrackers[name]);
        }
        return d;
    },
    startCPUTracker: function(tag){
        this.cpuTrackers[tag] = {start:Game.cpu.getUsed(),stop:false};
    },
    stopCPUTracker: function(tag,conslog=false){
        this.cpuTrackers[tag].stop = Game.cpu.getUsed();
        if(conslog)clog( this.cpuTrackers[tag].stop-this.cpuTrackers[tag].start, Game.time+"-"+tag )
        return this.cpuTrackers[tag].stop;
    },
    getCPULog: function(){
        let report = [];
        for(let t in this.cpuTrackers){
            if(this.cpuTrackers[t].stop !==false){
                let u = this.cpuTrackers[t].stop - this.cpuTrackers[t].start;
                report.push({tag:t,usage:u})
            }
        }
        let crepes = Object.keys(Game.creeps).length;
        let deets = crepes+"*.2 = "+(crepes*0.2);
       
        report.push({tag:'~intents',usage:deets})
        return report;
    },
    /**
     * start enhanced logging
     */ 
    trace : function(val=true){
        Memory.logs.trace=val;
        this.log("TRACE",val);
    },
    spawnTrace : function(spawn,msg){
        if(Memory.logs.trace===true){
            console.log("GT:"+Game.time+"::TRACE::"+spawn.name.toUpperCase()+":"+spawn.memory.state+":"
            +":E="+spawn.store.getUsedCapacity(RESOURCE_ENERGY)+":"+msg.trim() );
        }
    },
    creepTrace : function(creep,msg){
        if(Memory.logs.trace===true){
            console.log("GT:"+Game.time+"::TRACE::"+creep.name.toUpperCase()+":"+creep.memory.state+":"
            +creep.pos+":E="+creep.store.getUsedCapacity(RESOURCE_ENERGY)+":"+msg.trim() );
        }
    },
    /**
     * log a stat record
     */ 
    stat : function(creep,action){
        this.prepStats(creep,action);
        let e=1;
        if(action==='harvest'){
            e = creep.memory.work_parts*2;
        }else if(['withdraw','transfer'].indexOf(action)!==-1 ){
            e=creep.memory.carry_parts*50;
        }else if(['build','repair'].indexOf(action)!==-1){
            e = creep.memory.work_parts
        }
        this.memory.stats[creep.memory.role][action] += e;

    },
    /**
     * reset the memory for storing stats 
     */ 
    flushStats : function(){
        this.memory.stats = {};
        this.memory.ticckOfStats = 0;
    },
    /**
     * Prep the stats object with defaults
     */
    prepStats : function(creep,action){
        

        if(typeof this.memory.stats[creep.memory.role]==='undefined'){
            this.memory.stats[creep.memory.role]={};
        }
        if(typeof this.memory.stats[creep.memory.role][action]==='undefined'){
            this.memory.stats[creep.memory.role][action]=0;
        }
        if(!creep.memory.work_parts){
            creep.memory.work_parts=0;
            creep.memory.carry_parts=0;
            let cost =0;
            for(let p in creep.body){
                if(creep.body[p].type==='work'){
                    creep.memory.work_parts++;
                    cost+=100;
                }
                if(creep.body[p].type==='carry'){
                    creep.memory.carry_parts++;
                    cost+=50;
                }
                if(creep.body[p].type==='move'){
                    creep.memory.move_parts++;
                    cost+=50;
                }
            } 
        }
    },
};
global.logs.initiate();

global.logs = {
    cpuTrackers:{},
    creepTrackers:{},
    spawnTimeTrackers:{},
    lastTickAt:0,
    msSinceLastTick:0,
    globalResetCPU:0,
    globalResetTick:0,
    expectedCPUProfit:0,
    cpuOnMem:0,
    bucketAtLastLoopEnd:0,
    guiCPU:0,
    runRCLSpeedStats:false,
    initiate: function(){
        if(!Memory.logs){
            Memory.logs={trace:false,stats:{}};
        }
        if(!Memory.logs.rclSpeedStats)Memory.logs.rclSpeedStats={}
        if(!Memory.logs.errors)Memory.logs.errors=[]
    },
    log: function(category,msg){
        //console.log("GT:"+Game.time+": "+category+" : "+msg);
    },
    logRCLGT:function(){
        if(!nodes)return;
        for(let roomName in Game.rooms){
            if(Game.rooms[roomName].controller && Game.rooms[roomName].controller.owner && Game.rooms[roomName].controller.owner.username==='MadDokMike'){
                if(!Memory.logs.rclSpeedStats[roomName]) {
                    Memory.logs.rclSpeedStats[roomName]={};
                    Memory.logs.rclSpeedStats[roomName]['RCL0']={time:Game.time,duration:0,arrivedIn:0,sinceStart:0};
                    
                }
                let rcl = Game.rooms[roomName].controller.level;
                
                if( rcl > 0 && !Memory.logs.rclSpeedStats[roomName][ 'RCL'+rcl ] ){
                    let previous = Memory.logs.rclSpeedStats[roomName][ 'RCL'+(rcl-1) ];
                    let first = Memory.logs.rclSpeedStats[roomName][ 'RCL0' ];
                    if(!previous)continue;
                    if(!first)continue;
                    Memory.logs.rclSpeedStats[roomName]['RCL'+rcl] ={time:Game.time,duration:0, arrivedIn: (Game.time-previous.time), sinceStart: (Game.time-first.time) }
                }
                if( Memory.logs.rclSpeedStats[roomName]['RCL'+rcl]){
                     Memory.logs.rclSpeedStats[roomName]['RCL'+rcl].duration++;
                }
                
                let spawns = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_SPAWN]});
                if(spawns.length===0)continue;
                //console.log(roomName,spawns)
                let n = spawns[0].name.charAt(0).toLowerCase();
                if(!nodes[n])continue;
                if( nodes[n].allSourcesBuilt && !Memory.logs.rclSpeedStats[roomName][ 'SrcsBuilt' ] ){
                    let previous = Memory.logs.rclSpeedStats[roomName][ 'RCL1' ];
                    
                    Memory.logs.rclSpeedStats[roomName]['SrcsBuilt'] ={time:Game.time,duration:0,arrivedIn: (Game.time-previous.time),sinceStart: (Game.time-previous.time) }
                }
                if( nodes[n].spawnFastFillerReady && !Memory.logs.rclSpeedStats[roomName][ 'spwnFFRdy' ] ){
                    let previous = Memory.logs.rclSpeedStats[roomName][ 'RCL1' ];
                    
                    Memory.logs.rclSpeedStats[roomName]['spwnFFRdy'] ={time:Game.time,duration:0,arrivedIn: (Game.time-previous.time),sinceStart: (Game.time-previous.time) }
                }
                
                if(Game.rooms[roomName].controller.haveContainer() && !Memory.logs.rclSpeedStats[roomName][ 'rdy2Upg' ] ){
                    let previous = Memory.logs.rclSpeedStats[roomName][ 'RCL1' ];
                    
                    Memory.logs.rclSpeedStats[roomName]['rdy2Upg'] ={time:Game.time,duration:0,arrivedIn: (Game.time-previous.time),sinceStart: (Game.time-previous.time) }
                }
                if(Game.rooms[roomName].storage && !Memory.logs.rclSpeedStats[roomName][ 'storage' ] ){
                    let previous = Memory.logs.rclSpeedStats[roomName][ 'RCL1' ];
                    
                    Memory.logs.rclSpeedStats[roomName]['storage'] ={time:Game.time,duration:0,arrivedIn: (Game.time-previous.time),sinceStart: (Game.time-previous.time) }
                }
            }
        }
    },
    globalResetStarted: function(){

    },
    globalResetComplete:function(){
        this.globalResetCPU = Game.cpu.getUsed();
        this.globalResetTick = Game.time;
    },
    mainLoopStarted: function(){
        
        if(this.runRCLSpeedStats)this.logRCLGT();
        
        this.msSinceLastTick = Date.now() - this.lastTickAt;
        this.lastTickAt = Date.now();
        this.cpuTrackers={};
        if(Game.cpu.bucket<10000){
            actualCPUProfit = Game.cpu.bucket - this.bucketAtLastLoopEnd
            this.cpuOnMem = this.expectedCPUProfit - actualCPUProfit - this.guiCPU;
        }
      
        this.startCPUTracker('total');
    },
    mainLoopEnded: function(){
        let cpuUsed = this.stopCPUTracker('total');
        let cpuTickBudget = 20;
        this.expectedCPUProfit = cpuTickBudget - cpuUsed;
        this.bucketAtLastLoopEnd = Game.cpu.bucket;
        
        let elapsed = Game.time-this.globalResetTick;
        for(let spawnName in Game.spawns){
            if(!this.spawnTimeTrackers[spawnName] ){
                this.spawnTimeTrackers[spawnName] = {spawning:0,usage:0};
            }
            if(Game.spawns[spawnName].spawning){
                this.spawnTimeTrackers[spawnName].spawning ++;
            }
            this.spawnTimeTrackers[spawnName].usage = (this.spawnTimeTrackers[spawnName].spawning/elapsed)*100;
            
        }
        if(cpuUsed>9999){
            console.log('-------------------------------------')
            console.log( JSON.stringify( this.getCPULog() ) )
            console.log('-------------------------------------')
            //this.printAsciiTable(this.getCPULog(),{tag:25,usage:10})
        }
    },
    printAsciiTable:function(records, columnConfig = {}) {
        if (!records || !records.length) {
            console.log("No records to display");
            return;
        }
    
        // Get unique keys as columns using map and reduce
        const columns = Array.from(records.reduce((acc, obj) => {
            Object.keys(obj).forEach(key => acc.add(key));
            return acc;
        }, new Set()));
    
        // Create a function to format each cell
        const formatCell = (cell, column) => {
            const width = columnConfig[column] || 15;
            return String(cell).padEnd(width, ' ');
        };
    
        // Print header
        console.log(columns.map(column => formatCell(column, column)).join(' | '));
    
        // Print separator
        console.log(columns.map(column => '-'.repeat(columnConfig[column] || 15)).join('-+-'));
    
        // Print each row
        records.forEach(record => {
            console.log(columns.map(column => formatCell(record[column] || '', column)).join(' | '));
        });
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
                report.push({tag:t,usage:u.toFixed(4)})
            }
        }
        //let crepes = Object.keys(Game.creeps).length;
        //let deets = crepes+"*.2 = "+(crepes*0.2);
        

       
        //report.push({tag:'~intents',usage:deets})
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
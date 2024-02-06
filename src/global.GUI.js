
const guiWM = require('gui.worldmap')

global.gui = {
    display:false,
    displayCreepDebugSay:false,
    cpu:false,
    creeptrack:false,
    mb:false,
    rb:false,
    nodeStats:false,
    speedRunStats:false,
    nodeSrcStats:false,
    nodeControllerStats:false,
    remoteStats:false,
    tradeStats:false,
    showDropStats:false,
    tradeHistoryLength:24000,
    renderRooms:[],
    on: function(){
        this.display=true;
       // console.log("GUI loading. Please wait...");
        //console.log("run gui.help() for options.");
    },
    off: function(){
        this.display=false;
         //console.log("GUI closing. Please wait...");
    },
    help:function(){
        console.log('===== GUI Options =====');
        console.log('gui.cpu.on/off()');
        console.log('gui.mb.on/off()');
        console.log('gui.summary.on/off()');
        console.log('gui.rb.on/off()');
        console.log('gui.creeptrack.on/off()');
        console.log('gui.nodeStats=true/false');
        console.log('gui.nodeSrcStats=true/false');
        console.log('gui.nodeControllerStats=true/false');
        console.log('gui.remoteStats=true/false');
        console.log('gui.tradeStats=true/false');
        console.log('gui.tradeHistoryLength=10');
    },
    debugSay:function(val=true){
        this.displayCreepDebugSay = val;
    },
    init:function(){
        this.on();
        

        
        //let roomsToRender = ['W42N53','W45N51','W41N53'];
        for(let n in nodes)
            if(nodes[n].online)
                this.renderRooms.push(nodes[n].coreRoomName);
        

        this.summary = Object.create( require('global.GUI.partial'));
        this.summary.headingConfig("Overview",true,{tick:3,reset:3,elapsed:2,cpu:2,memCPU:3,serverSpeed:3,bucket:2,rstCPU:2,heapUsed:2});
        this.summary.setRooms(this.renderRooms);
        
        this.summary.atCoords(18,1);
        this.summary.on();
        
        this.cpu = Object.create( require('global.GUI.partial'));
        
        this.cpu.headingConfig("CPU-USAGE",false,{tag:6,usage:3});
        this.cpu.setRooms(this.renderRooms);
        this.cpu.atCoords(30,15);
        //this.cpu.on();
        
        this.mb = Object.create( require('global.GUI.partial'));
        this.mb.headingConfig("MAP-BOOK",false,{col1:3,col2:3});
        this.mb.setRooms(this.renderRooms);
       // this.mb.on();
        
        this.rb = Object.create( require('global.GUI.partial'));
        this.rb.headingConfig("Reserve Book",true,{id:6,curr:2,ref:2,transfers:6,withdrawals:6});
        this.rb.setRooms(this.renderRooms);
        this.rb.atCoords(1,20)
        this.rb.off()
        
        this.creeptrack = Object.create( require('global.GUI.partial'));
        this.creeptrack.headingConfig("Creep Track",true,{name:2,cpu:2,role:3});
        this.creeptrack.setRooms(this.renderRooms);
       // this.creeptrack.on();
        
    },
    
    render: function(){
      
        if(!this.display)return;

        
        let st = Game.cpu.getUsed();
        
    //logs.startCPUTracker('gui.cpu');
        if(this.cpu.display)this.cpu.setData(logs.getCPULog());
        this.cpu.render();
    //logs.stopCPUTracker('gui.cpu',true);

    logs.startCPUTracker('gui.summary');
       
       if( this.heapUsed===undefined || Game.time%100===0){
            // use this to estimate your heap usage 
            const heapData = Game.cpu.getHeapStatistics();
            const size = heapData.total_heap_size + heapData.externally_allocated_size;
            this.heapUsed =  ( ( size / heapData.heap_size_limit)  *100 ).toFixed(2);
       }
        
        this.summary.setData([{
            tick:Game.time,
            reset:logs.globalResetTick,
            elapsed:Game.time-logs.globalResetTick,
            cpu:logs.totalCPUUsed().toFixed(4),
            memCPU:logs.cpuOnMem.toFixed(4),
            serverSpeed:(logs.msSinceLastTick/1000)+'s',
            bucket:Game.cpu.bucket,
            rstCPU:logs.globalResetCPU.toFixed(4),
            heapUsed: this.heapUsed+'%'
        }]);
        
    //logs.stopCPUTracker('gui.summary',true);
       // logs.startCPUTracker('gui.summary.render');
        this.summary.render();
    //logs.stopCPUTracker('gui.summary.render',true);


    //logs.startCPUTracker('gui.creeptrack');
        //this.creeptrack.setData(logs.getCreepTrackData());
        this.creeptrack.render();
    //logs.stopCPUTracker('gui.creeptrack',true);
        
    //logs.startCPUTracker('gui.renderMapBookStats');
        if(this.mb.display)this.renderMapBookStats();
    //logs.stopCPUTracker('gui.renderMapBookStats',true);

    //logs.startCPUTracker('gui.renderRoomNodeStats');
        this.renderRoomNodeStats();
    //logs.stopCPUTracker('gui.renderRoomNodeStats',true);


    //logs.startCPUTracker('gui.renderTradeStats');
        this.renderTradeStats();
    //logs.stopCPUTracker('gui.renderTradeStats',false);    
        //this.renderSourceStatTest();
        
    //logs.startCPUTracker('gui.renderReserveBookOverview');    
        if(this.rb.display)this.renderReserveBookOverview();
    //logs.stopCPUTracker('gui.renderReserveBookOverview',true);



        // 63ea53f6c136d01981747c72
        
        //this.renderStructureRefs('W41N54')
        

        for(let n in nodes) {
            if (!nodes[n].online || !nodes[n].room()) continue;
            if(nodes[n].controller().level===0)continue;

            if(this.nodeSrcStats)this.renderSourceDetails(nodes[n])
            if(this.nodeControllerStats)this.renderControllerDetails(nodes[n])

            if(nodes[n].defenceIntel && nodes[n].defenceIntel.priority_attacker_id){
                this.renderDefenseDetails(nodes[n])
            }
        }

    
    if(this.remoteStats)this.renderRemoteStats()
    
    if(this.speedRunStats)this.renderSpeedRunStats();
    
    if(this.showDropStats)this.renderDropStats();
    
        let u = Game.cpu.getUsed() - st;
        logs.guiCPU= u;
        //console.log("GUI-CPU-used: "+u);  
    },
    
    renderSpeedRunStats:function(){
        
        for(let roomName in Memory.logs.rclSpeedStats){
            
            if(!Game.rooms[roomName])continue;
            
            let data = [];
            for(let label in Memory.logs.rclSpeedStats[roomName]){
               let stat =  Memory.logs.rclSpeedStats[roomName][label]
                    
                data.push({label:label,tick:stat.time,duration:stat.duration,arrivedIn:stat.arrivedIn,sinceStart:stat.sinceStart});
            }
            Game.rooms[roomName].renderGUITable(rp(30,30,roomName),data,false,true,{label:2,tick:2,duration:2,arrivedIn:2,sinceStart:2});
            
        }
    },
    renderDropStats:function(){
        
        for(let roomName in Game.rooms){
            let drops =  Game.rooms[roomName].find(FIND_DROPPED_RESOURCES);
    	   
            if(drops.length>0){
                for(let d in drops){
                    
                    Game.rooms[roomName].visual.text("🟡" + drops[d].amount, drops[d].pos)  
                }
                
            }
        }
    },
    renderControllerDetails:function(node){
        let mainSpot = node.controller().getStandingSpot();
        if(mainSpot){
            let standingSpots = node.controller().getStandingSpots();
            for(let p in standingSpots){
                
                standingSpots[p].colourIn('white',0.1,p)
            }
             mainSpot.colourIn('blue',0.1)
            if(node.controller().haveContainer()){
                
                this.renderReserveBookFor(node.controller().getContainer().id)   
            }
        }
    },
    renderSourceDetails:function(node){
        let srcs = mb.getAllSourcesForRoom(node.coreRoomName);
        for(let src of srcs){
            if(src.haveContainer()){
                this.renderReserveBookFor(src.getContainer().id)
            }else{
                
                let standingSpots = src.getStandingSpots();
                let e = 0;
                for(let pos of standingSpots){
                    let drop = pos.lookForResource(RESOURCE_ENERGY);
                    e += drop?drop.amount:0;
                }
                src.pos.colourIn('yellow',0.2,e)
            }
            if(src.room.controller.level<4){
                let standingSpots = src.getStandingSpots();
                let mainSpot = src.getStandingSpot();
                for(let pos of standingSpots){
                    pos.colourIn('white',0.1)
                }
                mainSpot.colourIn('blue',0.1)
            }
        }
    },
    renderRemoteStats:function(){

        let doneRooms={};
        for(let n in nodes){
            if(!nodes[n].online)continue;

            let node = nodes[n]
            let remoteFlip = {};
            for( let i in node.remoteRoomNames){
                remoteFlip[ node.remoteRoomNames[i] ] = i;
            }

            for(let remoteRN in Memory.remotes[node.name] ){
                let details = Memory.remotes[node.name][remoteRN];

                if(doneRooms[remoteRN]!==undefined && doneRooms[remoteRN]===false)continue;
                let priority = remoteFlip[remoteRN]===undefined?'backup':remoteFlip[remoteRN];
                doneRooms[remoteRN] = details.online;
                //if(remoteRN==='E6N4')clog(details,node.name+"-"+remoteRN)
                let colour = '#00ff00';
                if(priority==='backup'){
                    colour = '#ff8400';
                }
                if(!details.online){
                    colour = '#ff0000';
                }

                
                Game.map.visual.rect(rp(1,1,remoteRN),45,20 ,{opacity:0.9} )
                let textCSS = {fontSize:3,align:'left',color:'#444444'};
                let totalE = 0;
                let srcs = mb.getSources({roomNames:[remoteRN]});
                for(let src of srcs)
                    totalE += src.energyAwaitingCollection();

                Game.map.visual.text("Priority: "+priority,rp(2,3,remoteRN),textCSS)
                 Game.map.visual.text("Score: "+details.score,rp(2,6,remoteRN),textCSS)
                 Game.map.visual.text("Reason: "+details.reason,rp(2,9,remoteRN),textCSS)
                 Game.map.visual.text("Energy: "+totalE,rp(2,12,remoteRN),textCSS)
                 Game.map.visual.text("Staff: "+details.staff.count+"/"+details.staff.required,rp(2,15,remoteRN),textCSS)
                Game.map.visual.text("lastSeen: "+(Game.time -details.lastSeen)+"t ago",rp(2,18,remoteRN),textCSS)
                guiWM.drawArrowFromRoomToRoom(node.coreRoomName,remoteRN,colour)
                
            }
            
        }
        
    },
    
    renderTradeStats:function(){
        
        if(this.tradeStats){
            let counter=0;
            for(let t of Game.market.outgoingTransactions){
                
                if(t.time< (Game.time-this.tradeHistoryLength) )break;
                
                guiWM.drawTransferLog({sourceRoom:t.from,targetRoom:t.to,resource_type:t.resourceType,sentAt:t.time})
                counter++;
            }

            for(let n in nodes){
                if(!nodes[n].online)continue
                let node = nodes[n]
                tradeStats = [];
                for(let exp of nodes[n].exports){
                    tradeStats.push({resource_type:exp.resource_type,demand_satisfied:false,importing:false,exporting:true})
                }
                for(let imp of nodes[n].imports){
                    tradeStats.push({resource_type:imp.resource_type,demand_satisfied:false,importing:true,exporting:false})
                }
                guiWM.drawRoomTraderStatsOnMap(nodes[n].coreRoomName,tradeStats)
            }
            
        }
        
    },

    renderComplexPlan: function(complex){
        for(let plan of complex.getLayoutPositions()){
            plan.pos.colourIn('#fff');
            plan.pos.text( plan.type.charAt(0).toUpperCase()+plan.type.charAt(1)+'/'+plan.rcl ,'#111')
        }
    },
    
    renderComplexStats: function(complex){
        let data = [];
        let rt = complex.windDownTimer===0?'OFF' : complex.windDownTimer===RUN_FOREVER?'INF':complex.windDownTimer;
        data.push({key:'Run Time',value:rt})
        data.push({key:'Run CD',value:complex.runCoolDown})
        data.push({key:'last res',value:complex.lastResult})
        Game.rooms[complex.anchor.roomName].renderGUITable(complex.anchor,data,false,false,{key:2,value:2});
    },
    
    renderDefenseDetails: function(node){
        
        let mainAttacker = gob(node.defenceIntel.priority_attacker_id);
        let targetRamp = gob(node.defenceIntel.closest_ramp_id)
        
        if( mainAttacker && targetRamp ){
            node.room().visual.line(mainAttacker.pos,targetRamp.pos)
        }
        if(mainAttacker){
            
            let towers = mb.getStructures({roomNames:[node.coreRoomName],types:[STRUCTURE_TOWER]})
            let towerStats = "dist[";
            for(let tower of towers){
                let colour = 'red';
                let dist = tower.pos.getRangeTo(mainAttacker);
                if(dist<=15){
                    colour = 'yellow';
                }
                if(dist<=5){
                    colour = 'green';
                }
                towerStats+=dist+",";
                node.room().visual.line(tower.pos,mainAttacker.pos,{color:colour})
            }
            towerStats+="]"
            node.room().visual.text(towerStats,rp(mainAttacker.pos.x+3,mainAttacker.pos.y,mainAttacker.pos.roomName) )
            node.room().visual.text("dmg:"+node.defenceIntel.tower_dmg_on_priority,rp(mainAttacker.pos.x+3,mainAttacker.pos.y+1,mainAttacker.pos.roomName) )
            
            for(let id of node.defenceIntel.ramp_ids_to_defend){
                let ramp = gob(id);
                if(ramp){
                    node.room().visual.text("🛡️",ramp.pos )
                }
            }
            
        }
        
        if(Game.time %20===0){
            let walls = mb.getStructures({roomNames:[node.coreRoomName],types:[STRUCTURE_WALL,STRUCTURE_RAMPART]});
            for(let wall of walls){
                let colour = 'white';
                let diff= node.wallHeight - wall.hits;
                let perc=100;
                if(diff>0){
                    perc= (wall.hits/node.wallHeight)*100;
                    
                        colour='rgb('+(200-(perc/2))+','+((perc*2)+1)+',1)';
                    
                }else{
                    colour= 'rgb(100,255,1)';
                }
                wall.pos.colourIn(colour);
                wall.pos.text(perc.toFixed(0)+'%');
            }
        }
    },
        
    renderMapBookStats:function(){
        
        let mbData = [{col1:'*',col2:'Path Count',col3:mb.pathCount()}];
        let rooms = mb.allRooms();
        for(let rn in rooms){
            mbData.push({col1:rn,col2:'constructions',col3:Object.keys(rooms[rn].constructionSites).length});
           // mbData.push({col1:'>',col2:'structures',col3:Object.keys(rooms[rn].structures).length});
            mbData.push({col1:'>',col2:'repairTargets',col3:Object.keys(rooms[rn].repairTargets).length});
        }
        let intervals = mb.intervals;
        for(let i in intervals){
            mbData.push({col1:'interval', col2:i ,col3: (intervals[i].refresh_rate) });
        }
        this.mb.setData(mbData);
        this.mb.render();

    },

    /**
     * 
     */ 
    renderRoomNodeStats:function(){
        let y=4;
        if(!this.nodeStats)return;
        for(let n in nodes){

            if(!nodes[n].online)continue;

            let node = nodes[n];
            let lines=[];
            let sp = Game.spawns[node.name];
           // if(!sp)continue;
            
            lines.push({ key:'E2Collect', value:node.totalEnergyAtSources });
            lines.push({ key:'E@Cntrler', value:node.energyAtController });
            lines.push({ key:'upgr rate', value:node.upgradeRate });
            lines.push({ key:'build rate', value:node.buildFast?'fast':'slow' });
            lines.push({ key:'recver mode', value:node.inRecoveryMode});
            
            if(sp ){
                let val=sp.memory.spawn_result;
                if( sp.spawning){
                    val = sp.spawning.remainingTime+'/'+sp.spawning.needTime+' '+sp.spawning.name;
                }
                 let usage = (logs.spawnTimeTrackers[node.name].usage.toFixed(0))+'%'
                lines.push({ key:node.name+' '+usage, value:val });
            }
            sp = Game.spawns[node.name+'-2'];
            if(sp){
                let val='...';
                if( sp.spawning){
                    val = sp.spawning.remainingTime+'/'+sp.spawning.needTime+' '+sp.spawning.name;
                }
                let usage = (logs.spawnTimeTrackers[node.name+'-2'].usage.toFixed(0))+'%'
                lines.push({ key:node.name+'-2'+' '+usage, value: val});
            }
            sp = Game.spawns[node.name+'-3'];
            if(sp){
                let val='...';
                if( sp.spawning){
                    val = sp.spawning.remainingTime+'/'+sp.spawning.needTime+' '+sp.spawning.name;
                }
                let usage = (logs.spawnTimeTrackers[node.name+'-3'].usage.toFixed(0))+'%'
                lines.push({ key:node.name+'-3'+' '+usage, value: val});
            }
            
            
            for(let role in node.workforce_quota){
                let quota = node.workforce_quota[role];
                lines.push({ key:role, value: quota.count+"/"+quota.required});
            }
            let renderPos = new RoomPosition(41,10,node.coreRoomName);
            
            if(['W41N53','W41N54','W48N52'].includes(node.coreRoomName) )renderPos=rp(8,20,node.coreRoomName)
            if(node.coreRoomName=='W48N54')renderPos=rp(19,4,node.coreRoomName)
            if(node.coreRoomName=='E3N5')renderPos=rp(1,25,node.coreRoomName)
            
            
            if(Game.rooms[node.coreRoomName])
                Game.rooms[node.coreRoomName].renderGUITable(renderPos,lines,node.name+" - "+node.coreRoomName,true,{key:3,value:3});
            
            y+=15;
        }
    },
    renderSourceStatTest:function(){
        const StatLog = require('class.statthing');
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        let logA = new StatLog("test",['potential','mined','harvests','repairs','scoops'],10,4);
        logA.setValue('potential',300);
        logA.addToValue('mined',getRandomInt(10));
        logA.addToValue('harvests',getRandomInt(3));
        logA.addToValue('repairs',getRandomInt(2));
        logA.addToValue('scoops',1);
        logA.runTick();
        
        Game.rooms['W41N54'].renderGUITable(new RoomPosition(2,16,'W41N54'),logA.getReportData(),false,true);
        //debug(logA);
    },
    renderSourceStats:function(id){
                let data = [];
        let src = Game.getObjectById(id);
        let cont = src.getContainer();
        let stored = (cont)?cont.store.getUsedCapacity(RESOURCE_ENERGY):0;
        let m = src.getMeta();
        let perc = Math.round((m.mined / m.potential)*100);
        data.push({label:'mined',value:m.mined+' ~ '+perc+'%'});
        data.push({label:'regen in',value:src.ticksToRegeneration});
        data.push({label:'stored',value:stored});
        data.push({label:'harvests',value:m.harvests});
        data.push({label:'repairing',value:m.repairing});
        data.push({label:'scoops',value:m.scoops});
        Game.rooms[src.room.name].renderGUITable(src.pos,data,false,true,{label:3,value:3});
    },
    renderStructureRefs:function(renderInRoom){
        let structures = mb.getStructures({roomNames:[renderInRoom],
        types:[
            STRUCTURE_STORAGE,  STRUCTURE_CONTAINER, STRUCTURE_SPAWN,STRUCTURE_EXTENSION
        ]})
        for(let s in structures){
        structures[s].room.visual.text(structures[s].ref(),structures[s].pos.x,structures[s].pos.y,{color:'#11f',font:'bold 0.4 Arial',align:'center'});
        }
    },
    renderReserveBookOverview: function(){
        if(!this.rb.display)return;
        let structures = mb.getStructures({roomNames:['W45N51'], types:[STRUCTURE_STORAGE,  STRUCTURE_CONTAINER,STRUCTURE_EXTENSION, STRUCTURE_SPAWN,STRUCTURE_TOWER]}) ;
        
        let seen={};
        let reserves = [];
        for(let s in structures){
            let l = '';
            let withdrawImplode = '';
            let transferImplode = '';
            
            let page = reservationBook.getPage(structures[s].id);
            if(page.withdraw.totalReserved>0 || page.transfer.totalReserved>0){
                
                if(page.withdraw.reserves['lock']||page.transfer.reserves['lock']){
                    l='🗝️';
                }
                
                for(let name in page.withdraw.reserves){
                    if(withdrawImplode){
                        withdrawImplode+=",";
                    }
                    withdrawImplode += name+"("+page.withdraw.reserves[name]+")";
                }
           
                
                for(let name in page.transfer.reserves){
                    if(transferImplode){
                        transferImplode+=",";
                    }
                    transferImplode += name+"("+page.transfer.reserves[name]+")";
                }

                reserves.push({ref:structures[s].shortName()+l,withdrawals:withdrawImplode,out:page.withdraw.totalReserved,transfers:transferImplode,in:page.transfer.totalReserved,curr:structures[s].store.getUsedCapacity(RESOURCE_ENERGY)});
            }
            structures[s].room.visual.text(structures[s].ref()+l,structures[s].pos.x,structures[s].pos.y,{color:'#11f',font:'bold 0.4 Arial',align:'center'});
        }
        this.rb.setData(reserves);
        this.rb.render();
        //Game.rooms[renderInRoom].renderGUITable(new RoomPosition(0,0,renderInRoom),reserves,"Reserve Book",true,{id:6,curr:2,ref:2,transfers:6,withdrawals:6});
    },
    /**
     * Render a Table, to display the Reserves of a structure, if it has a store.
     * Render anchor will be the structure.pos
     */ 
    renderReserveBookFor:function(id,pos=false){
        let obj = Game.getObjectById(id);
        
        if(obj){
            
            let renderPos = pos?pos:obj.pos;
            
            if(obj.structureType===undefined || obj.store===undefined){
                console.log("GUI ERROR:: Object is not a Structure with a store object: ",obj);
                return;
            }
            let page = obj.getReservations();
            let data = [];
            let stored = obj.store.getUsedCapacity(RESOURCE_ENERGY);

            for(let name in page.withdraw.reserves){
                data.push({ref:name,amount:"-"+page.withdraw.reserves[name]});

            }
            for(let name in page.transfer.reserves){
                data.push({ref:name,amount:"+"+page.transfer.reserves[name]});

            }
            if(page.withdraw.totalPending>0 || page.transfer.totalPending>0){
                data.push({ref:'intents',amount:'-'+page.withdraw.totalPending+'/+'+page.transfer.totalPending})
            }
            // 
            if(page.withdraw.overBookAllowance>0 || page.transfer.overBookAllowance>0){
                data.push({ref:'ovrbook',amount:'-'+page.withdraw.overBookAllowance+'/+'+page.transfer.overBookAllowance})
            }
            data.push({ref:stored,amount:'-'+page.withdraw.totalReserved+'/+'+page.transfer.totalReserved})
            Game.rooms[obj.pos.roomName].renderGUITable(renderPos,data,false,true,{ref:2,amount:3});
        }

    },
    humanifyNumber:function(val){
        let value = val+"";
        let num = +value;
        let isNeg = '';
        if(value.charAt(0)=='-'){
            num = +( value.replace('-','') );
            isNeg='-';
        }
        if(num !==NaN){
            if(num>1000){
                value = isNeg+num/1000+"K";
            }
        } 
        return value;
    }
};
/**
 * 
 * RoomPosition anchor -> the position to start the top left of the table from.
 * Array data -> array of objects, where each object have the same keys and represent row data
 * String title -> If set, then display a title rom for the table
 * Bool includeHeadings -> default:true. If true, then read rown keys and set them as column headings
 * Object columnConfig -> keys match a row and value define column width for each col. e.g. {colA:2,colB:1,colC:3}
 */ 
Room.prototype.renderGUITable =function(anchor,data,title=undefined,includeHeadings=true,columnConfig={}){
    if(data.length==0){
        return;
    }
    let defaultColWidth = 1;
    let headings = Object.keys(data[0]);
    let textColour='#fff';
    let thFont = 'bold 0.6 Arial';
    let tcFont = ' 0.6 Arial';
 
    
    let r=0;
    let c=1;
    
    let width = 0;
    for(let h in headings){
        if(columnConfig[headings[h]]){
            width+=columnConfig[headings[h]]+1;
        }else{
            width += defaultColWidth+1;
        }
    }
    
    
    if(title){
        this.visual.text(title,anchor.x,anchor.y+1,{color:'#fff',font:'bold 0.9 Arial',align:'left'});
        this.visual.rect(anchor,width,1,{opacity:0.3,fill:'#0f0'});
        r++;
        
    }
    if(includeHeadings){
        this.visual.rect(anchor.x,anchor.y+r,width,1,{opacity:0.4,fill:'#333'});
        r++;
    }
    this.visual.rect(anchor.x,anchor.y+r,width,data.length+1,{opacity:0.8,fill:'#555'});
    
    

    
    let count = 0;
    let colWidth = defaultColWidth;
    for(let h in headings){
        
        colWidth = defaultColWidth;
        if(columnConfig[headings[h]]){
            colWidth=columnConfig[ headings[h] ];
        }
        
        if(includeHeadings){
            if(colWidth==1){
                this.visual.text(headings[h].substring(0,6),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'center'});
                c++;
            }
            if(colWidth==2){
                c++;
                this.visual.text(headings[h].substring(5,8),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'left'});
                this.visual.text(headings[h].substring(0,5),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'right'});
                c++;
            }
            if(colWidth==3){
                 c+=1;
                this.visual.text(headings[h].substring(0,12),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'center'});
                c+=2;
            }
            if(colWidth==4){
                c+=2;
                this.visual.text(headings[h].substring(9,15),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'left'});
                this.visual.text(headings[h].substring(0,9),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'right'});
                c+=2;
            }
            if(colWidth==5){
                c+=2;
                this.visual.text(headings[h].substring(0,18),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'center'});
                c+=3;
            }
            if(colWidth==6){
                c+=3;
                this.visual.text(headings[h].substring(12,21),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'left'});
                this.visual.text(headings[h].substring(0,12),anchor.x+c,anchor.y+r,{color:textColour,font:thFont,align:'right'});
                c+=3;
            }

        }else{
            c+=colWidth;
        }

        // handle col border
        count++;
        if(count!=headings.length){
            let tit=title?1:0;
            this.visual.line(anchor.x+c,anchor.y+tit,anchor.x+c,anchor.y+data.length+r+1,{lineStyle:'solid',width:0.1,color:'#999'});
            c+=1;
        }
    }
    c=1;
   r++;
    for(let d in data){
        for(let a in data[d]){
            
            colWidth = defaultColWidth;
            if(columnConfig[a]){
                colWidth=columnConfig[ a ];
            }
            
            
            //let value = gui.humanifyNumber(data[d][a]);
            let value = data[d][a]+"";
            /*let num = +value;
            let isNeg = '';
            if(value.charAt(0)=='-'){
                num = +( value.replace('-','') );
                isNeg='-';
            }
            if(num !==NaN){
                if(num>1000){
                    value = isNeg+num/1000+"K";
                }
            }*/
            
            
            //if(value)

            if(colWidth==1){
                this.visual.text(value.substring(0,6).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'center'});
                c++;
            }
            if(colWidth==2){
                c++;
                this.visual.text(value.substring(5,8).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'left'});
                this.visual.text(value.substring(0,5).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'right'});
                c++;
            }
            if(colWidth==3){
                c+=1;
                this.visual.text(value.substring(0,12).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'center'});
                c+=2;
            }
            if(colWidth==4){
                c+=2;
                this.visual.text(value.substring(9,15).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'left'});
                this.visual.text(value.substring(0,9).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'right'});
                c+=2;
            }
            if(colWidth==5){
                c+=2;
                this.visual.text(value.substring(0,18).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'center'});
                c+=3;
            }
            if(colWidth==6){
                c+=3;
                this.visual.text(value.substring(12,21).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'left'});
                this.visual.text(value.substring(0,12).toLowerCase(),anchor.x+c,anchor.y+r,{color:textColour,font:tcFont,align:'right'});
                c+=3;
            }
                
            c++;// move 1 for border
        }
        c=1;
        r++;
    }
}

module.exports = gui;

Structure.prototype.shortName=function(){
    return mb.getShortNameForStructure(this);
}
Structure.prototype.ref=function(){
    return mb.getRefForStructure(this);
}

global.gui = {
    display:false,
    displayCreepDebugSay:false,
    cpu:false,
    creeptrack:false,
    mb:false,
    rb:false,
    nodes:[],
    on: function(){
        this.display=true;
        console.log("GUI loading. Please wait...");
        console.log("run gui.help() for options.");
    },
    off: function(){
        this.display=false;
         console.log("GUI closing. Please wait...");
    },
    help:function(){
        console.log('===== GUI Options =====');
        console.log('gui.cpu.on/off()');
        console.log('gui.mb.on/off()');
        console.log('gui.summary.on/off()');
        console.log('gui.rb.on/off()');
        console.log('gui.creeptrack.on/off()');
    },
    debugSay:function(val=true){
        this.displayCreepDebugSay = val;
    },
    init:function(roomNodes){
        this.on();
        
        this.nodes = roomNodes;
        
        //let roomsToRender = ['W42N53','W45N51','W41N53'];
        let roomsToRender = [];
        for(let node of this.nodes)
            roomsToRender.push(node.coreRoomName);
        
        if(Game.rooms['sim'])roomsToRender=['sim'];
        
        this.summary = Object.create( require('global.GUI.partial'));
        this.summary.headingConfig("Overview",true,{cpu:2,tick:3,serverSpeed:3,bucket:2});
        this.summary.setRooms(roomsToRender);
        
        this.summary.atCoords(34,1);
        this.summary.on();
        
        this.cpu = Object.create( require('global.GUI.partial'));
        
        this.cpu.headingConfig("CPU-USAGE",false,{tag:2,usage:3});
        this.cpu.setRooms(roomsToRender);
        this.cpu.atCoords(41,6);
        //this.cpu.on();
        
        this.mb = Object.create( require('global.GUI.partial'));
        this.mb.headingConfig("MAP-BOOK",false,{col1:3,col2:3});
        this.mb.setRooms(roomsToRender);
       // this.mb.on();
        
        this.rb = Object.create( require('global.GUI.partial'));
        this.rb.headingConfig("Reserve Book",true,{id:6,curr:2,ref:2,transfers:6,withdrawals:6});
        this.rb.setRooms(roomsToRender);
        
        this.creeptrack = Object.create( require('global.GUI.partial'));
        this.creeptrack.headingConfig("Creep Track",true,{name:2,cpu:2,role:3});
        this.creeptrack.setRooms(roomsToRender);
       // this.creeptrack.on();
        
    },
    render: function(){
      
        if(!this.display)return;
      
        
        let st = Game.cpu.getUsed();
        
        this.cpu.setData(logs.getCPULog());
        this.cpu.render();
        
        this.summary.setData([{
            cpu:logs.totalCPUUsed(),
            tick:Game.time,
            serverSpeed:(logs.msSinceLastTick/1000)+'s',
            bucket:Game.cpu.bucket
        }]);
        this.summary.render();
        //console.log(logs.getCreepTrackData());
        //this.creeptrack.setData(logs.getCreepTrackData());
        this.creeptrack.render();
        
        this.renderMapBookStats();

        this.renderRoomNodeStats();
        
        //this.renderSourceStatTest();


        //this.renderReserveBookOverview('W42N53',mb.getStructures({roomNames:['W42N53'], types:[STRUCTURE_STORAGE,  STRUCTURE_CONTAINER,STRUCTURE_EXTENSION, STRUCTURE_SPAWN,STRUCTURE_TOWER]}) );
        //this.renderReserveBookOverview('W42N54',mb.getStructures({roomNames:['W42N54'], types:[STRUCTURE_STORAGE,  STRUCTURE_CONTAINER,STRUCTURE_EXTENSION, STRUCTURE_SPAWN,STRUCTURE_TOWER]}) );


        // 63ea53f6c136d01981747c72
        
        //this.renderStructureRefs('W41N54')

        //this.renderSourceStats('5bbcaab49099fc012e632090');
        //this.renderSourceStats('63de812d8ec3bb0b54708522');
        
        ///////////// Beta ///////////////////////////
        // upgrade
        this.renderReserveBookFor('64ab1d1f5ca6fb3d0f098c28',rp(28,25,'W18N17'))
  
        
        ///////////// Alpha //////////////
        this.renderReserveBookFor('647d9486f71e27059f5c0ca9');
        this.renderReserveBookFor('647910f41e06c862d53f8fb5');
        
        this.renderReserveBookFor('647a7245535ff46892cadb5e');
        
        this.renderReserveBookFor('647a92e8655cd29697596191',new RoomPosition(17,17,'W14N18'));
      
        
        this.renderReserveBookFor('6478f4cd8ccbad57a487413a',new RoomPosition(0,40,'W14N18'));
        this.renderReserveBookFor('6478f61952c5bfe1b733b0ec',new RoomPosition(7,40,'W14N18'));
        //mines
         this.renderReserveBookFor('6482e5a8f6bdc8409b943e88');
          this.renderReserveBookFor('6482e31fd597e75632544fe0');

           this.renderReserveBookFor('6482e930b7e508806504c1b0');
            this.renderReserveBookFor('6482e95070bfded1f196de62');
        //////// Gamma //////////////////////
        // controller
        this.renderReserveBookFor('64859cff9a94182509bc4b0f',rp(28,25,'W13N15'));
        // storage
        this.renderReserveBookFor('648483965bdc7e637d357f8f',rp(0,20,'W13N15'));
        //mines
        this.renderReserveBookFor('6481d3e19e4145825aac41ce')
        this.renderReserveBookFor('6481d3fea439d4c258488ab9')
        this.renderReserveBookFor('64839e27133a097c46b37d1f')
        this.renderReserveBookFor('64839d839a94185a6dbb7a36')
        
        this.renderReserveBookFor('6483bc59cb55931e0760b5ee')
        //this.renderReserveBookFor('64899f6b133a0947a6b5d157',rp(0,37,'W13N17'))
        
        this.renderReserveBookFor('64822902f1157b0b6cd44aa7')
        this.renderReserveBookFor('6486cfbbeb2a545b91527bac')

        //////// Delta //////////////////////
        //controller
 
        this.renderReserveBookFor('64a95a7283849663edff8c48',rp(7,37,'W12N23'))
       

        //////// Epsilon //////////////////////
        //controller
       
        this.renderReserveBookFor('649b8be0fb058c6394ee5c2f',rp(23,7,'W12N14'))
        
        
        //////// Epsilon //////////////////////
        //controller
       
        this.renderReserveBookFor('6499c8c6654a803d497d0b3a',rp(24,18,'W12N19'))
        let u = Game.cpu.getUsed()-st;
        
        ///// Strip mine ////////////////
        
        this.renderReserveBookFor('64a6bf93cadd0597d786979e')
        
        
        //console.log("GUI-CPU-used: "+u);  
    },

    renderMapBookStats:function(){
        let mbData = [{col1:'*',col2:'Path Count',col3:mb.pathCount()}];
        let rooms = mb.allRooms();
        for(let rn in rooms){
            mbData.push({col1:rn,col2:'constructions',col3:Object.keys(rooms[rn].constructionSites).length});
           // mbData.push({col1:'>',col2:'structures',col3:Object.keys(rooms[rn].structures).length});
            mbData.push({col1:'>',col2:'repairTargets',col3:Object.keys(rooms[rn].repairTargets).length});
        }
        let intervals = Memory.mapBook.intervals;
        for(let i in intervals){
            mbData.push({col1:'interval', col2:i ,col3: (intervals[i].refresh_rate-intervals[i].ticker) });
        }
        this.mb.setData(mbData);
        this.mb.render();

    },

    /**
     * 
     */ 
    renderRoomNodeStats:function(){
        let y=8;

        for(let node of this.nodes){
            let lines=[];
            let sp = Game.spawns[node.name];
            if(!sp)continue;
            lines.push({ key:'E2Collect', value:node.totalEnergyAtSources });
            lines.push({ key:'upgr rate', value:node.upgradeRate });
            lines.push({ key:'build rate', value:node.buildFast?'fast':'slow' });
            
            if(sp ){
                let val=sp.memory.spawn_result;
                if( sp.spawning){
                    val = sp.spawning.remainingTime+'/'+sp.spawning.needTime+' '+sp.spawning.name;
                }
                lines.push({ key:node.name, value:val });
            }
            sp = Game.spawns[node.name+'-2'];
            if(sp){
                let val='...';
                if( sp.spawning){
                    val = sp.spawning.remainingTime+'/'+sp.spawning.needTime+' '+sp.spawning.name;
                }
                lines.push({ key:node.name+'-2', value: val});
            }
            sp = Game.spawns[node.name+'-3'];
            if(sp){
                let val='...';
                if( sp.spawning){
                    val = sp.spawning.remainingTime+'/'+sp.spawning.needTime+' '+sp.spawning.name;
                }
                lines.push({ key:node.name+'-3', value: val});
            }
            
            
            for(let role in node.workforce_quota){
                let quota = node.workforce_quota[role];
                lines.push({ key:role, value: quota.count+"/"+quota.required});
            }
            let renderPos = new RoomPosition(41,10,node.coreRoomName);
            
            if(node.coreRoomName=='W18N17')renderPos=rp(15,28,'W18N17')
            
            
            Game.rooms[node.coreRoomName].renderGUITable(renderPos,lines,node.name,true,{key:3,value:3});
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
    renderReserveBookOverview: function(renderInRoom,structures){
        
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
        this.rb.setRooms([renderInRoom]);
        if(this.rb.display===false)this.rb.on();
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
let _config= require('_server_config');
// debug any JS type
global.clog = function(data,label){
    label = Game.time+':'+label;
    if(typeof data==='object'){
        console.log(label+" : ");
        let s = JSON.stringify(data, null, 2);
        console.log(s);
    }else{
        console.log(label+" : "+data);
    }
}
global.mlog = function(id){
    clog( Game.getObjectById(id).getMeta() )
}
global.rblog = function(id){
    clog( Game.getObjectById(id).getReservations() )
}
global.rp = function(x,y,r){
    return new RoomPosition(x,y,r);
}
global.gob = function(id){
    return Game.getObjectById(id)
} 
global.sendX=function(fromClusterName,resource,amount,toClusterName){
    let term = mb.getTerminalForRoom(Game.spawns[fromClusterName].pos.roomName)
    return term.send(resource,amount,Game.spawns[toClusterName].pos.roomName)
}
StructureTerminal.prototype.sendX=function(resource,amount,toClusterName){
    return this.send(resource,amount,Game.spawns[toClusterName].pos.roomName)
}
global.util = {
    
    setupNodes:function(){
        global.nodes = _config.createRoomNodes(this.getServerName());
    },
    respawn:function(){
        
        this.destroyAllConSites();
        this.resetBotData();
        this.destroyAllStructures([STRUCTURE_SPAWN]);
        
        global.nodes = _config.createRoomNodes(this.getServerName());
        gui.init(nodes);
        
        util.resumeTicks();
        
    },
    resetBotData:function(){
        
        delete Memory.creeps;
        delete Memory.spawns;
        delete Memory.mapBook;
         delete Memory.logs;
        delete Memory.reservationBook;
        delete Memory.objectMeta;
        delete Memory.roomNodes;
        delete Memory.remotes 
        
        Memory.creeps = {};
        logs.initiate();
        mb.initiate();
        reservationBook.initiate();
        objectMeta.empty();
        for(let n in nodes){
            nodes[n].readInStore();
        }
        clog(Memory.reservationBook)
    },
     
    getServerName:function(){
        if(Game.rooms['sim'])return'sim';
        if(Game.shard.name==='DESKTOP-F9T2DG5')return 'private';
        return Game.shard.name;
        
    },
    destroyAllConSites:function(){
      
      for (let c in Game.constructionSites)Game.constructionSites[c].remove()
    },
    destroyAllStructures:function(exclude=[]){
      
      for (let s of mb.getStructures())
        if(!exclude.includes(s.structureType))s.destroy()
    },
    
    renderFootPrint:function(anchor){
        
        let buildingSpots = rp(anchor.x,anchor.y+2,anchor.roomName).getPositionsInsideArea(6,3,4,6);
        for(let pos of rp(anchor.x+4,anchor.y+5,anchor.roomName).getPositionsInsideArea(0,0,3,3))
            buildingSpots.push(pos)
        
        for(let pos of buildingSpots)pos.colourIn('blue');
        
        for(let pos of anchor.getPositionsAtAreaEdge(8,3,9,11))pos.colourIn('green')
    },
    findGoodSpawnSpot:function(roomName){
        
        //footprint dimensions
        let fpLeft=6;
        let fpTop = 1;
        let fpRight = 4;
        let fpBottom = 8;
        
        // all spots not too close to edge and not a natural wall
        let noneSillySpots = rp(25,25,roomName).getPositionsInsideArea(25-fpLeft,25-fpTop-1,25-fpRight-2,25-fpBottom-2).filter(function(pos){return pos.isWalkable()});
        
        for(let pos of noneSillySpots){
            pos.colourIn('blue')
        }
    },
    scoreSpawnSpot:function(anchor){
        
        logs.startCPUTracker('scoreSpawnSpot');
        
        let buildingSpots = rp(anchor.x,anchor.y+2,anchor.roomName).getPositionsInsideArea(6,3,4,6);
        for(let pos of rp(anchor.x+4,anchor.y+5,anchor.roomName).getPositionsInsideArea(0,0,3,3))
            buildingSpots.push(pos)
        
        this.scoreFootPrint(anchor,buildingSpots,  anchor.getPositionsAtAreaEdge(8,3,9,11))
        
        logs.stopCPUTracker('scoreSpawnSpot',true);
    },  
        
    scoreFootPrint:function(spawnPos,buildingSpots, wallSpots){
        
        if(!mb.hasRoom(spawnPos.roomName))mb.scanRoom(spawnPos.roomName)
        let canBuild = true;
        
        for(let spot of buildingSpots){
            if(!spot.isWalkable()){
                canBuild=false;break;
            }
        }
        let moveCost = 0;
        for(let src of mb.getSources({roomNames:[spawnPos.roomName]}) ){
            moveCost+= spawnPos.findPathTo(src).length;
        }
         moveCost+= spawnPos.findPathTo(Game.rooms[spawnPos.roomName].controller).length;
         
         wallCount = 0;
         
         for(let pos of wallSpots){
             if(pos.isWalkable())wallCount++;
         }
         
        clog(canBuild,"Can Build:");
        clog(moveCost,"Move Cost:");
        clog(wallCount,"Wall Count:");
        
    },
    
    playTick: function(){
        Memory.debugTick=true;
    },
    pauseTicks: function(){
        Memory.debugTick = Game.time;
    },
    resumeTicks: function(){
        Memory.debugTick = false;
    },
    allowTick: function(){
        if(!Memory.debugTick)return true;
        if(Memory.debugTick===true){
            Memory.debugTick=Game.time;
            clog(Game.time,"Playing:");
            return true;
        };
        //clog(Memory.debugTick,"Paused:");
        return false;
    },
    recycle_all_creeps:function(){
        for(let k in Memory.creeps){
            if(Game.creeps[k]){
             Game.creeps[k].suicide();
                
            }else{
                delete Memory.creeps[k];
            }
        }    
    },
    to19_2:function(){
        console.log('running upgrade to 19.2...')
        if(Memory.VERSION ==='19.1'){
            
       
           Memory.VERSION ='19.2'; 
        }else{
            console.log("Upgrade Failed. Must be on 19.1")
        }
    },
    setLinksInRoom:function(roomName) {
        const room = Game.rooms[roomName];
        const links = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [roomName]
        });
    
        const structures = mb.getStructures({
            types: [STRUCTURE_STORAGE,STRUCTURE_SPAWN, STRUCTURE_TOWER,STRUCTURE_WALL],
            roomNames: [roomName]
        });
        const sources = mb.getSources({
            roomNames: [roomName]
        });
    
        const controller = room.controller;
        let receivers = [];
        let senders = [];
        let found=false;
        for (const link of links) {
            found=false;
            // Check if the link is within 2 of a source
             let foundOneSrc = false;
            for (const source of sources) {
               
                if (link.pos.inRangeTo(source, 2)) {
                    source.setLink(link);
                    // sometimes 2 sources, share 1 link
                    if(!foundOneSrc){
                        link.setAsSender();
                        senders.push(link);
                    }

                    clog(link.pos+'','set as Sender  - Source')
                    found=true;
                    foundOneSrc=true;
                }
            }
            
            if(!found)
            for (const structure of structures) {
                if (structure.structureType === STRUCTURE_STORAGE && link.pos.inRangeTo(structure, 2)) {
                    link.setAsReceiver();
                    link.setPriority(4);
                    structure.setLink(link);
                    receivers.push(link);
                    clog(link.pos+'','set as Receiver - Priority-4 - Storage')
                    found=true;
                    break;
                } else if (structure.structureType === STRUCTURE_SPAWN && link.pos.inRangeTo(structure, 2)) {
                    link.setAsReceiver();
                    link.setPriority(1);
                    receivers.push(link);
                    clog(link.pos+'','set as Receiver - Priority-1 - Filler')
                    found=true;
                    break;
                }else if (structure.structureType === STRUCTURE_TOWER && link.pos.inRangeTo(structure, 1)) {
                    link.setAsReceiver();
                    link.setPriority(3);
                    receivers.push(link);
                    clog(link.pos+'','set as Receiver - Priority-3 - Tower')
                    found=true;
                    break;
                }else if (structure.structureType === STRUCTURE_WALL && link.pos.inRangeTo(structure, 2)) {
                    link.setAsSender();
                    senders.push(link);
                    clog(link.pos+'','set as Sender - Dismantler')
                    found=true;
                    break;
                }
            }

            if (!found && controller && link.pos.inRangeTo(controller.getContainer(), 1)) {
                link.setAsReceiver();
                link.setPriority(2);
                controller.setLink(link);
                receivers.push(link);
                found=true;
                clog(link.pos+'','set as Receiver- Priority-2 - Controller')
            }
            
            if (!found){
                link.setAsReceiver();
                link.setPriority(1);
                receivers.push(link);
                clog(link.pos+'','set as Receiver - Priority-1 - Assumed Filler')
                found=true;
                   
            }
        }
       
        for(let slink of senders){
            slink.clearRecipients();
             
            for(let rlink of receivers){
                slink.addRecipient(rlink.id);
                
            }
        }
    },
    linkReport:function(roomName) {
        const links = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [roomName]
        });
    
        for (const link of links) {
            let linkType = 'none';
            if (link.isReceiver()) {
                linkType = 'receiver';
            } else if (link.isSender()) {
                linkType = 'sender';
            }
            let recips = link.getMeta()['recipients'];
            console.log(`Link ID: ${link.id} ${link.pos} | Type: ${linkType} >> ${recips}`);
        }
    },
};
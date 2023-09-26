
// debug any JS type
global.clog = function(data,label){
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
    
    setupSim:function(){
        Game.rooms['sim'].controller.setStandingSpot(new RoomPosition(22,18,'sim'));
        
    },
    recycle_all_creeps:function(){
        for(let k in Memory.creeps){
            if(Game.creeps[k]){
              //  console.log(k)
                if(Game.creeps[k].memory.role==='harvester'){
                    Game.creeps[k].suicide();
                }
                let sp = Game.creeps[k].spawn();
                if(!sp){
                    Game.creeps[k].suicide();
                }
                if(sp.pos.isNearTo(Game.creeps[k])){
                    sp.recycleCreep(Game.creeps[k]);
                }else{
                    Game.creeps[k].moveToPos(sp);
                }
                
            }else{
                delete Memory.creeps[k];
            }
        }    
    },
    to19_0:function(){
        console.log('running upgrade to 19.0...')
        if(Memory.VERSION ==='18.4'){
            let spawnNames = ['Alpha','Beta','Gamma','Delta'];
            for(let name of spawnNames){
                

            }
          
           Memory.VERSION ='19.0'; 
        }else{
            console.log("Upgrade Failed. Must be on 18.4")
        }
    },
    setLinksInRoom:function(roomName) {
        const room = Game.rooms[roomName];
        const links = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [roomName]
        });
    
        const structures = mb.getStructures({
            types: [STRUCTURE_STORAGE,STRUCTURE_SPAWN, STRUCTURE_TOWER],
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
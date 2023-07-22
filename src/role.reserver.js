
var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        return [CLAIM,MOVE]; //1300
    },
    getMemory: function(spawn){
        let creep=null;
        for(let name in spawn.memory.room_names){
            creep = Game.getObjectById(spawn.memory.room_names[name].reserver_id);
            if((!creep || creep.memory.role==='recycle')&& spawn.pos.roomName != name){
                return {role: "reserver",room_name:name};
            }
        }
        clog(spawn.memory.room_names,'reserver mem fail')
        clog(creep,'creep exists')
        return false;
    },
    run: function(creep,spawn){
        
        spawn.memory.room_names[creep.memory.room_name].reserver_id = creep.id;
        let roomData = spawn.memory.room_names[creep.memory.room_name];
        let pos = new RoomPosition(roomData.controller_pos.x,roomData.controller_pos.y,roomData.controller_pos.roomName);
        if(creep.pos.roomName===pos.roomName){
           
            if(creep.room.controller.owner && creep.room.controller.owner.username!=='MadDokMike'){
                 creep.actOrMoveTo('attackController',creep.room.controller);
            }else if(creep.room.controller.owner && creep.room.controller.owner.username==='MadDokMike'){
                creep.actOrMoveTo('signController',creep.room.controller,"R.I.P tiny humans.");
                 creep.recycle();
                 
            }else{
                if(roomData.type==='claim'){
                    creep.actOrMoveTo('claimController',creep.room.controller)
                }else if(roomData.type==='reserve'){
                    creep.actOrMoveTo('reserveController',creep.room.controller)
                }else{
                    creep.say('404 fok');
                }

            }
            
        }else{
            creep.moveToPos(pos);
        }
        
    },
    
};

module.exports = role;
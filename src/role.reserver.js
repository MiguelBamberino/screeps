
var role = {


    getParts: function(budget){
        return [CLAIM,MOVE]; //1300
    },

    run: function(creep,config){
        
        
        
        
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
global.season6 = {
    startingWestCoord:20,
    startDate:'2024-03-01',// 2nd, because event started 1st, but shutdowns started 2nd
    shutdownHour:18,
    shutdownLookup:{},
    bootup(){

    },
    clearMapBookOfFrozenRooms:function(){
        for(let roomName in mb.allRooms()){
            if(this.isRoomFroze(roomName)){
                console.log("Room:",roomName," froze. Deleting")
                mb.deleteRoom(roomName);
            }
        }
    },
    clearObjectMetaOfFrozenRooms:function (){
        let objects = objectMeta.all();
        logs.startCPUTracker('clearObjectMetaOfFrozenRooms')
        for(let id in objects){

            if( this.isRoomFroze(objects[id].roomName) ){
                console.log("objectMeta:Froze roomName >> ",id,objects[id].roomName);
                objectMeta.delete(id)
            }

        }
        logs.stopCPUTracker('clearObjectMetaOfFrozenRooms',true)
    },
    freezeDateFor(roomName){
        const startDate = new Date(this.startDate);
        const date = new Date(startDate);
        const coords =this.explodeRoomName(roomName)
        const daysToAdd = Math.abs(-23 - coords.x);
        date.setDate(date.getDate() + (daysToAdd/2));
        return date;
    },

    daysUntilFreeze(roomName){
        const startDate = new Date(); // today
        const freezeDate = this.freezeDateFor(roomName);
        // Calculate the difference in milliseconds
        const differenceInMilliseconds = freezeDate - startDate ;
        // Convert milliseconds to days
        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
    },
    daysUntilThaw(roomName){
        const startDate = new Date(); // today
        let state = Game.map.getRoomStatus(roomName);
        if(!state)return 0;
        if(state.status==='normal')return 0
        const thawDate = new Date(state.timestamp);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = thawDate - startDate  ;
        // Convert milliseconds to days
        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
    },
    hoursUntilThaw(roomName){
        const startDate = new Date(); // today
        let state = Game.map.getRoomStatus(roomName);
        if(!state)return 0;
        if(state.status==='normal')return 0
        const thawDate = new Date(state.timestamp);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = thawDate - startDate  ;
        // Convert milliseconds to hours
        const differenceInHrs = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 ));
        return differenceInHrs;
    },
    isFreezingToday(roomName){
        return (this.daysUntilFreeze(roomName)===0)
    },
    isThawingToday(roomName){
        return (this.daysUntilFreeze(roomName)===0)
    },
    isRoomFroze(roomName){


        let state = Game.map.getRoomStatus(roomName);
        if(!state)return true;
        return (state.status==='closed')

        /*
        let daysLeft = this.daysUntilFreeze(roomName);
        if(daysLeft<0)return true;
        if(daysLeft>0)return false;

        const now = new Date();
        const currentHour = now.getHours();
        if(currentHour<17)return false;
        if(currentHour>18)return true;
        */

    },
    isRoomFreezingSoon(roomName){
        let daysLeft = this.daysUntilFreeze(roomName);
        if(daysLeft<0)return true;
        if(daysLeft>0)return false;
        const now = new Date();
        const currentHour = now.getHours();
        // before 5pm its still safe, otherwise we're very close to shutdown
        if(currentHour<17)return false;
        else return true;

    },
    explodeRoomName(roomName) {
        // Extract the direction and coordinates
        const match = roomName.match(/^([WE])(\d+)([NS])(\d+)$/);
        if (!match) return null; // Invalid room name format

        const [, horizDir, horizCoord, vertDir, vertCoord] = match;

        // Convert coordinates to integers
        const x = parseInt(horizCoord, 10) * (horizDir === 'W' ? -1 : 1);
        const y = parseInt(vertCoord, 10) * (vertDir === 'N' ? -1 : 1);

        // Return the coordinates in an object
        return { x, y };
    }


}

season6.bootup();

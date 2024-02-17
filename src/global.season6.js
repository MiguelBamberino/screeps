global.season6 = {
    startingWestCoord:50,
    startDate:'2024-02-02',// 2nd, because event started 1st, but shutdowns started 2nd
    shutdownHour:18,
    shutdownLookup:{},
    bootup(){

    },
    freezeDateFor(roomName){
        const startDate = new Date(this.startDate);
        const date = new Date(startDate);
        const coords =this.explodeRoomName(roomName)
        const daysToAdd = Math.abs(-50 - coords.x);
        date.setDate(date.getDate() + daysToAdd);
        return date;
    },
    freezeDayAfterStart(roomName){
        const startDate = new Date(this.startDate);
        const freezeDate = this.freezeDateFor(roomName);
        // Calculate the difference in milliseconds
        const differenceInMilliseconds = freezeDate - startDate ;
        // Convert milliseconds to days
        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return Math.abs(differenceInDays);
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
    isFreezingToday(roomName){
        return (this.daysUntilFreeze(roomName)===0)
    },
    isRoomFroze(roomName){
        let daysLeft = this.daysUntilFreeze(roomName);
        if(daysLeft<0)return true;
        if(daysLeft>0)return false;

        const now = new Date();
        const currentHour = now.getHours();
        if(currentHour<17)return false;
        if(currentHour>18)return true;

        let state = Game.map.getRoomStatus(roomName);
        if(!state)return true;
        return (state.status==='closed')
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

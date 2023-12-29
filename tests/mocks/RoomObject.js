let Mockable = require('./Mockable');
class RoomObject extends Mockable{
    constructor(pos,room) {
        super();
        this.pos = pos;
        this.room = room;
        this.effects = [];
    }
}

global.RoomObject = RoomObject;
let StructureFactory=require('./Structure');

module.exports = {
    _createHallWay(name){
        return this._create(name);
    },
    _createPlayerRoom(name,level=0,ownerName=undefined){
        let room = this._create(name);
        room.controller = StructureFactory._createController(name,level)
        if(ownerName)room.controller._setOwner(ownerName);
        return room;
    },
    _create(name){
        return {
            name:name,
            storage:undefined,
            terminal:undefined,
            find(type){
                return [];
            },
            _addTerminal(resources){
                this.terminal=StructureFactory._createTerminal(this.name,resources)
                return this;
            },
            _addStorage(resources){
                this.storage=StructureFactory._createStorage(this.name,resources)
                return this;
            }
        }
    }
}
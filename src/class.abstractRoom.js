class AbstractRoom{
    
    constructor(name, roomName){
        this.storeRef='roomNodes';
        this.name = name;
        this.roomName = roomName;
        this.readInStore();
        if(Object.keys(this.workforce_quota).length==0){
            this.setupWorkForceQuotas();
        }
        
    }
    controller(){
        return mb.getControllerForRoom(this.roomName,false);
    }
    setupWorkForceQuotas(){
        for(let role of this.workForceRoleNames()){
            this.workforce_quota[role]={count:0,required:0};
        }
    }
    workForceRoleNames(){
        return ['harvester'];
    }
    ////////////////////////////////////////////////////////////
    // Store functions
    ////////////////////////////////////////////////////////////
    
    readInStore(){
        if(!Memory[this.storeRef]){
            Memory[this.storeRef]={};
        }
        if( !Memory[this.storeRef][this.name] ){
            Memory[this.storeRef][this.name]=this.setupStore();
        }
        for(let key in Memory[this.storeRef][this.name]){
            this[key] =  Memory[this.storeRef][this.name][key];
        }
    }
    // run once to resest/setup the starting data for the store
    setupStore(){
        let store = {};
        store.creepNames = [];
        store.workforce_quota={ };
        return store; 
    }
    // trigger the save of any configured class attributes to memory
    saveStore(){
        let newStore={};
        for(let attrName of this.storeAttributes()){
            newStore[attrName] = this[attrName];
        }
        Memory[this.storeRef][this.name] = newStore;
    }
    // define what attributes to save from the room class, to memory
    storeAttributes(){
        return ['creepNames','workforce_quota'];
    }

}

module.exports = AbstractRoom;
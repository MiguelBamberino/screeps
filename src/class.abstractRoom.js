global.RATE_VERY_FAST='very-fast';
global.RATE_FAST='fast';
global.RATE_SLOW='slow';
global.RATE_VERY_SLOW='very-slow';
global.RATE_OFF='off';
class AbstractRoom{
    
    constructor(name, roomName){
        // the name of the central Memory object, to store this rooms data
        this.storeRef='roomNodes';
        // logical human friendly name
        this.name = name;
        // screep room name
        this.roomName = roomName;
        // load the stored data for this room, saved under the name
        this.readInStore();
        // if no workforce was pulled from the store, then build the workforce tracking object
        if(Object.keys(this.workforce_quota).length==0){
            this.setupWorkForceQuotas();
        }
        
    }
    controller(){
        return mb.getControllerForRoom(this.roomName,false);
    }
    ////////////////////////////////////////////////////////////
    // Template functions - that define blueprints for certain processes
    ////////////////////////////////////////////////////////////
    runTick(){
        // run any checks to ensure the room can actually run
        if(!this.safeToRun())return false;
        // call the sub-class code, that is run per tick
        this.runTickBody();
    }
    // should be ran when the workforce quotas needs to be rebuilt/reset
    setupWorkForceQuotas(){
        for(let role of this.workForceRoleNames()){
            this.workforce_quota[role]={count:0,required:0};
        }
    }
    ////////////////////////////////////////////////////////////
    // Override functions - to be overriden to configure templates
    ////////////////////////////////////////////////////////////
    // to be overriden by the sub-class, where it defines any code to be run per tick
    runTickBody(){
        clog("runTickBody() should be overriden in the child room class",this.name)
    }
    // to be overridden by the sub-class, to define any checks to ensure the room can actually run
    safeToRun(){
        return true;
    }
    // to be overridden by the sub-class, to define what roles this room needs
    workForceRoleNames(){
        return [];
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
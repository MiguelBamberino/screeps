const {LOOK_MINERALS, RESOURCE_ENERGY} = require("@screeps/common/lib/constants");

global.Store=function(resourceAmountKeyPair){

    // Define the config as non-enumerable property
    Object.defineProperty(this, '_config', {
        value: {totalCap: 0,resourceCaps:{},mineralCap:0,setMineral:false},
        writable: true,
        enumerable: false
    });
    for(let r in resourceAmountKeyPair) {
        this._set(r,resourceAmountKeyPair[r])
    }
}
Object.defineProperty(Store.prototype,"_set", {
    value:  function (resource, amount) {
                if(amount>0) {
                    this[resource] = amount;
                    if (this._config.mineralCap > 0 && resource !== RESOURCE_ENERGY)
                        this._config.setMineral = resource;

                    this._config.resourceCaps[resource] = this._config.mineralCap;
                }else{
                    if( this[resource] ) {
                        delete this[resource];
                        if(resource !== RESOURCE_ENERGY) {
                            delete this._config.resourceCaps[resource];
                            this._config.setMineral = false;
                        }
                    }

                }
            },
    enumerable: false
})

Object.defineProperty(Store.prototype,"_setTotalCapacity", {
        value:  function(amount){
                    this._config.totalCap = amount;
                    this._config.resourceCaps={};
                },
    enumerable:false
})
Object.defineProperty(Store.prototype,"_setResourceCapacity",{
    value:  function(resource,amount){
                this._config.totalCap=0;

                if(resource===LOOK_MINERALS) {
                    this._config.mineralCap = amount;
                    for(let storedResource in this){
                        if(storedResource!==RESOURCE_ENERGY){
                            this._config.setMineral = storedResource;
                            this._config.resourceCaps[storedResource]=amount;
                        }
                    }
                }else
                    this._config.resourceCaps[resource]=amount;
            },
    enumerable:false
})
Object.defineProperty(Store.prototype,"getCapacity",{
    value:  function(resource){

                if(this._config.totalCap>0)
                    return this._config.totalCap;
                else{
                    if(this._config.resourceCaps[resource])
                        return this._config.resourceCaps[resource];
                    else if(this._config.mineralCap>0 && this._config.setMineral===false)
                       return this._config.mineralCap;
                    else return null;
                }
            },
    enumerable:false
})
Object.defineProperty(Store.prototype,"getFreeCapacity",{
    value: function(resource){
        if(this._config.totalCap>0) {
            let used = 0;
            for(let r in this)used+=this[r];
            return this.getCapacity(resource) - used;
        }else{
            if(this._config.mineralCap && resource!==RESOURCE_ENERGY){
                if(this._config.setMineral && this._config.setMineral!==resource)
                    return null;
                else{
                    let used = this[resource]||0;
                    return this._config.mineralCap-used;
                }
            }else{
                let used = this[resource]||0;
                return this.getCapacity(resource)-used;
            }
        }
    },
    enumerable:false
})
Object.defineProperty(Store.prototype,"getUsedCapacity",{
    value: function(resource){
        if(this._config.setMineral && resource && resource!==RESOURCE_ENERGY && this._config.setMineral!==resource)
            return null;

        if(!resource){
            let used=0;
            for(let r in this)used+=this[r];
            return  used;
        }

        return  this[resource]||0;
    },
    enumerable:false
})
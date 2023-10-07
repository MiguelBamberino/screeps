Structure.prototype.storedAmount=function(type=RESOURCE_ENERGY){
    let a = this.store.getUsedCapacity(type);
    return !a?0:a;
}

Structure.prototype.storingAtleast = function(amount,type=RESOURCE_ENERGY){
    return ( this.store.getUsedCapacity(type) >= amount);
}
Structure.prototype.storingLessThan = function(amount,type=RESOURCE_ENERGY){
    return ( this.store.getUsedCapacity(type) <= amount);
}
Structure.prototype.haveSpaceFor = function(amount,type=RESOURCE_ENERGY){
    return ( this.store.getFreeCapacity(type) >= amount);
}
Structure.prototype.isFull = function(type=RESOURCE_ENERGY){
    return ( this.store.getFreeCapacity(type) == 0);
}
Structure.prototype.isEmpty = function(type=RESOURCE_ENERGY){
    return ( this.store.getUsedCapacity(type) == 0);
}


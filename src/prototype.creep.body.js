/*
 * This file contains extension functions to the Creep class
 * All functions are focused around reporting on the creep.body metrics
 * Any questions that need to iterative over creep bodies are cached in global 
 */
//////////////////////////////////////////////////////////////////////////////////////

Creep.prototype.partCount=function(partType){
    
    if(this.hits!=this.hitsMax){
        // if we are not at full HP then we might have broken parts
        return this._countUpBodyParts(false).partCounts[partType];
    }
    return this._getBodyCache().partCounts[partType];
}
Creep.prototype.boostCount=function(resourceType,refresh=false){
    let res=0;
    if(this.hits!=this.hitsMax || refresh){
        // if we are not at full HP then we might have broken parts
        res= this._countUpBodyParts(false).boostCounts[resourceType];
        return res===undefined?0:res;
    }
    res= this._getBodyCache().boostCounts[resourceType];
    return res===undefined?0:res;
}
Creep.prototype.energySpendForUpgradeController = function(){
    let w=this.partCount(WORK);
    let e= this.store.getUsedCapacity(RESOURCE_ENERGY);
    return (e<w)?e:w;
}
Creep.prototype.renewEnergyCost = function(){
    return Math.ceil(this.spawnCost()/2.5/this.body.length)
}
Creep.prototype.renewTicksGain = function(){
    return Math.floor(600/this.body.length);
}
Creep.prototype.spawnCost = function(){
    let cost = 0;
    cost += this.partCount(MOVE) * 50;
    cost += this.partCount(WORK) * 100;
    cost += this.partCount(CARRY) * 50;
    cost += this.partCount(ATTACK) * 80;
    cost += this.partCount(RANGED_ATTACK) * 150;
    cost += this.partCount(HEAL) * 250;
    cost += this.partCount(CLAIM) * 600;
    cost += this.partCount(TOUGH) * 10;
    return cost;
}
Creep.prototype.isFighter = function(){
    return (this.partCount(ATTACK)>0||this.partCount(RANGED_ATTACK)>0)
}
Creep.prototype.isDismantler = function(){
    return (this.partCount(WORK)>=20)
}
Creep.prototype.isHealer = function(){
    return (this.partCount(HEAL)>0)
}
Creep.prototype.isScout = function(){
    return (this.partCount(MOVE)===this.body.length)
}
Creep.prototype.isCivilian = function(){
    return (this.partCount(ATTACK)==0&&this.partCount(RANGED_ATTACK)===0)
}
Creep.prototype.isMorePunchyThan = function(creep){
    return ( (this.partCount(ATTACK)+this.partCount(TOUGH)) > (creep.partCount(ATTACK)+creep.partCount(TOUGH)) )
}

Creep.prototype.isMoreShootyThan = function(creep){
    return (this.partCount(RANGED_ATTACK) > creep.partCount(RANGED_ATTACK))
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//// Store Helper Funcs
//////////////////////////////////////////////////////////////////////////////////////////////////////
Creep.prototype.storingAtLeast = function(amount,type=RESOURCE_ENERGY){
    return ( this.store.getUsedCapacity(type) >= amount);
}
Creep.prototype.storingLessThan = function(amount,type=RESOURCE_ENERGY){
    return ( this.store.getUsedCapacity(type) <= amount);
}
Creep.prototype.haveSpaceFor = function(amount,type=RESOURCE_ENERGY){
    return ( this.store.getFreeCapacity(type) >= amount);
}
Creep.prototype.isFull = function(type=RESOURCE_ENERGY){
    return ( this.store.getFreeCapacity(type) == 0);
}
Creep.prototype.isEmpty = function(type=RESOURCE_ENERGY){
    return ( this.store.getUsedCapacity(type) == 0);
}
Creep.prototype.carryingAtleast = function(amount,type=RESOURCE_ENERGY){
    return this.storingAtLeast(amount,type);
}
Creep.prototype.storedAmount=function(type=RESOURCE_ENERGY){
    return this.store.getUsedCapacity(type);
}
// #####################################################################################
// CACHE MANAGEMENT FUNCs
// #####################################################################################
global.CREEP_CACHE_BODY={};
Creep.prototype._getBodyCache=function(){
    
    if(!CREEP_CACHE_BODY[this.id]){
        CREEP_CACHE_BODY[this.id] = {};
        CREEP_CACHE_BODY[this.id] = this._countUpBodyParts();
    }
    
    return CREEP_CACHE_BODY[this.id];
}
Creep.prototype._countUpBodyParts=function(includeBroken=true){

    let partCounts = {"work":0,"move":0,"carry":0,"attack":0,"ranged_attack":0,"heal":0,"tough":0,"claim":0};
    let boostCounts = {};
    for(let i in this.body){
        if(this.body[i].hits>0 || includeBroken){
            partCounts[ this.body[i].type ]++;
            if(this.body[i].boost){
                if(!boostCounts[ this.body[i].boost ])boostCounts[ this.body[i].boost ]=0;
                boostCounts[ this.body[i].boost ]++;
                
            }
        }
    }
    return {'partCounts':partCounts,'boostCounts':boostCounts};
}
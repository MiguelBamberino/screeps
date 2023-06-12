/*
 * This file contains extension functions to the Creep class
 * All functions are focused around reporting on the creep.body metrics
 * Any questions that need to iterative over creep bodies are cached in global 
 */

Creep.prototype.partCount=function(partType){
    
    if(this.hits!=this.hitsMax){
        // if we are not at full HP then we might have broken parts
        return this._countUpBodyParts(false)[partType];
    }
    return this._getBodyCache().partCounts[partType];
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
// #####################################################################################
// CACHE MANAGEMENT FUNCs
// #####################################################################################
global.CREEP_CACHE_BODY={};
Creep.prototype._getBodyCache=function(){
    
    if(!CREEP_CACHE_BODY[this.id]){
        CREEP_CACHE_BODY[this.id] = {};
        CREEP_CACHE_BODY[this.id].partCounts = this._countUpBodyParts();
    }
    
    return CREEP_CACHE_BODY[this.id];
}
Creep.prototype._countUpBodyParts=function(includeBroken=true){

    let partCounts = {"work":0,"move":0,"carry":0,"attack":0,"ranged_attack":0,"heal":0,"tough":0,"claim":0};
    for(let i in this.body){
        if(this.body[i].hits>0 || includeBroken){
            partCounts[ this.body[i].type ]++;
        }
    }
    return partCounts;
}
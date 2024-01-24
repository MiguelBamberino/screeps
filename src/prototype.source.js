Source.prototype.energyAwaitingCollection=function(){
    let stored =  0;
    let container = this.getContainer();
    if(container){
        
        stored += container.storedAmount(RESOURCE_ENERGY);
        let droppedResource = container.pos.lookForResource(RESOURCE_ENERGY);
        let droppedE = droppedResource ? droppedResource.amount : 0;
        stored+= droppedE;
        
    }else if(!this.haveLink()){
        let drops = this.pos.lookForNearbyResources(RESOURCE_ENERGY);
        for(let droppedResource of drops){
            stored+= droppedResource.amount;
        }
    }
    //
    
    return stored;
}


Source.prototype.updateReport=function(){
    return;
    let meta = this.getMeta();
    if(meta){
        if(meta.mined === undefined){
            this.setUpMeta();
        }
        
        meta.mined=this.energyCapacity - this.energy;
        
        // log the results just before the source regens
        if(this.ticksToRegeneration==1){
            // push stat on to history
            meta.logs.push({
                tick:Game.time,
                potential:meta.potential,
                mined:meta.mined,
                harvests:meta.harvests,
                scoops:meta.scoops,
                repairing:meta.repairing
            });
            if(meta.logs.length>10){
                meta.logs.shift();
            }
            
            // reset for next loop
            meta = this.resetCurrentStats(meta);
        }
         
    }

}
Source.prototype.logHarvest=function(){
    return;
    let meta = this.getMeta();
    if(meta){
        meta.harvests++;
        this.setMeta(meta);
    }
}
Source.prototype.logScoop=function(){
    return;
    let meta = this.getMeta();
    if(meta){
        meta.scoops++;
        this.setMeta(meta);
    }
    
}
Source.prototype.logRepair=function(){
    return;
    let meta = this.getMeta();
    if(meta){
        meta.repairing++;
        this.setMeta(meta);
    }
}
Source.prototype.setUpMeta=function(){
    return;
    let meta =  this.getMeta();
    if(meta){
        meta = this.resetCurrentStats(meta);
        meta.logs=[];
        this.setMeta(meta);
    }
}
Source.prototype.resetCurrentStats=function(meta){
    meta.mined = 0;
    meta.potential = this.energyCapacity;
    meta.harvests = 0;
    meta.scoops = 0;
    meta.repairing=0;
    return meta;
}
/*
Source.prototype.getMeta=function(){
    return mb.getSourceMeta(this.room.name,this.id);
}
Source.prototype.setMeta=function(data){
    return mb.updateSourceMeta(this.room.name,this.id,data);
}*/
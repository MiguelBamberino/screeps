
var roleTanker = {


    getParts: function(budget){
        
        if(budget >= 1500 ){ 
            return '10*2c1m';

        }
        if(budget >= 900 ){ 
            return '6*2c1m';

        }
        else if(budget >= 600 ){ 
            return '4*2c1m';
        }
        else if(budget >= 450 ){
            return '3*2c1m';

        }
        else if(budget >= 300 ){ 
            return '2*2c1m';
        }else{ // RCL fucked
            return '2c1m';
        }
        
    },

    run: function(creep,config) {
        //clog(creep.name)
        
        let storage = mb.getStorageForRoom(config.coreRoomName)
        // keep some space in the storage, so it doesn't fill up.
        let storageBufferSpace = 10000;
        let terminal = mb.getTerminalForRoom(config.coreRoomName)
       
        let factory = mb.getFactoryForRoom(creep.pos.roomName);
        let creepSpace =  creep.store.getCapacity();
        let energyInStorage = storage.storedAmount(RESOURCE_ENERGY)
        let stored_type=false;
        let parkSpot = config.labComplex && !config.labComplex.isBoosting()? config.labComplex.standingSpot: config.retreatSpot
        for(let resource_type in creep.store){
            stored_type=resource_type;
        }
        
        if(!creep.memory.job && creep.ticksToLive<20){
            creep.suicide();
        }
       /* let drop = creep.getDroppedResource(RESOURCE_ZYNTHIUM_ACID);
        if(drop){
            creep.moveTo(drop);
            creep.pickup(drop)
        }*/
        if(creep.memory.job){
            this.checkJobComplete(creep);
        }
        ///////////////////////////////////////////////////
        // Job selection
        ///////////////////////////////////////////////////
        // if already carrying some mineral, but no job, then go put it back in storage
        if(!creep.memory.job && stored_type && stored_type!==RESOURCE_ENERGY){
            creep.memory.job = {target_id:'nope',resource_type:stored_type,action:'empty'}
        }  
        
        /////// RESOURCE_ENERGY Jobs //////////////////////////////////

        
        
        if(!creep.memory.job && energyInStorage>=creepSpace && this.shouldCheckForFillJobs(creep,config) ){
            let reserveAmount = config.controller.level===8?200: ( config.controller.level===7?0:50 );
            let ext =  mb.getNearestStructure(creep.pos,[STRUCTURE_EXTENSION],[config.coreRoomName],[{attribute:'canReserveTransfer',operator:'fn',value:[1]}])
     
            if(ext){
                ext.reserveTransfer(creep.name,ext.store.getFreeCapacity(RESOURCE_ENERGY));
                creep.memory.job = {target_id:ext.id,resource_type:RESOURCE_ENERGY,action:'fill'}
            }else{
                creep.memory.fillingInProgress = false; // if we got this far then we have filled all extensions and spawns
            }
        }
        
        if(!creep.memory.job){
            let mineStore = mb.getFullestStructure([STRUCTURE_CONTAINER], [config.coreRoomName],
                    [ {attribute:'isMineStore',operator:'fn',value:[]},{attribute:'canReserveWithdraw',operator:'fn',value:[creepSpace]}])
            if(mineStore){
                mineStore.reserveWithdraw(creep.name,creepSpace);
                creep.memory.reserve_id=mineStore.id;
                creep.memory.job = {target_id:mineStore.id,resource_type:RESOURCE_ENERGY,action:'empty'}
            }
        }
        if(!creep.memory.job && energyInStorage>=creepSpace){
            let targets = mb.getStructures({ types:[STRUCTURE_CONTAINER],roomNames:[config.coreRoomName],
                    filters:[{attribute:'isFillerStore',operator:'fn',value:[]},{attribute:'canReserveTransfer',operator:'fn',value:[creepSpace]} ]})
                    
          // if(creep.name=='B-rk-0')clog(targets.length,"isFillerStore")
            if(targets.length>0){
                targets[0].reserveTransfer(creep.name,creepSpace);
                creep.memory.job = {target_id:targets[0].id,resource_type:RESOURCE_ENERGY,action:'fill'}
            }
        }
        if(!creep.memory.job && energyInStorage>=creepSpace){
            let targets = mb.getStructures({ types:[STRUCTURE_CONTAINER],roomNames:[config.coreRoomName],
                    filters:[{attribute:'isUpgraderStore',operator:'fn',value:[]},{attribute:'canReserveTransfer',operator:'fn',value:[creepSpace]} ]})
                    
           
            if(targets.length>0){
                targets[0].reserveTransfer(creep.name,creepSpace);
                creep.memory.job = {target_id:targets[0].id,resource_type:RESOURCE_ENERGY,action:'fill'}
            }
        }
        
        if(!creep.memory.job  && Game.time%50==0 && energyInStorage>=creepSpace){
            let towerSpace = creepSpace>=1000?500:creepSpace;
            let tower = mb.getNearestStructure(creep.pos,[STRUCTURE_TOWER],[config.coreRoomName],[{attribute:'canReserveTransfer',operator:'fn',value:[towerSpace]}])
            if(tower){
                tower.reserveTransfer(creep.name,creepSpace);
                creep.memory.job = {target_id:tower.id,resource_type:RESOURCE_ENERGY,action:'fill'}
            }
        }
        
        
        // if carrying some RESOURCE_ENERGY, but no job after all fill look ups, then go put it back in storage
        if(!creep.memory.job && stored_type===RESOURCE_ENERGY){
            creep.memory.job = {target_id:'nope',resource_type:stored_type,action:'empty'}
        } 
        
        
        /////// RESOURCE_* Jobs //////////////////////////////////
        
        if(config.armNuke && !creep.memory.job){
            let nuker = mb.getNukerForRoom(config.coreRoomName);
            if(nuker){
                if(!nuker.isFull(RESOURCE_ENERGY) && storage.storingAtLeast(creepSpace,RESOURCE_ENERGY)){
                    creep.memory.job ={ target_id:nuker.id, resource_type:RESOURCE_ENERGY, action:'fill' };
                }else if(!nuker.isFull(RESOURCE_GHODIUM) && storage.storingAtLeast(creepSpace,RESOURCE_GHODIUM)){
                    creep.memory.job ={ target_id:nuker.id, resource_type:RESOURCE_GHODIUM, action:'fill' };
                }
            }
        }
        
        if(config.labComplex && !creep.memory.job){
            let haulJob = config.labComplex.takeJob()
            //if(creep.name==='G-rk-0')clog(haulJob);
            if( haulJob ){
                // we check for atleast 5, to make sure we don't leave small crappy bits in the storage
                if(haulJob.action =='fill' && storage.storingAtLeast(5,haulJob.resource_type)){
                 creep.memory.job ={ target_id:haulJob.id, resource_type:haulJob.resource_type, action:haulJob.action };
                }
                if(haulJob.action =='empty' && storage.haveSpaceFor(creepSpace,haulJob.resource_type)){
                 creep.memory.job ={ target_id:haulJob.id, resource_type:haulJob.resource_type, action:haulJob.action };
                }
            }
        }

        /////// Import Jobs //////////////////////////////////
        if(!creep.memory.job){
            for(let importConf of config.imports){
                // 
                if(importConf.resource_type===RESOURCE_ENERGY)continue;
                
                if( terminal.storingAtLeast(1,importConf.resource_type) && storage.haveSpaceFor(creepSpace,importConf.resource_type) ){

                    creep.memory.job = {target_id:terminal.id,resource_type:importConf.resource_type,action:'empty'};
                    break;
                }
            }
        }
        
        
        /////// Export Jobs //////////////////////////////////
        if(!creep.memory.job){
            for(let exportConf of config.exports){

                if( 
                    storage.storingAtLeast( (exportConf.exportOver+creepSpace), exportConf.resource_type ) 
                    && terminal.storingLessThan( exportConf.batchSize, exportConf.resource_type )
                    && terminal.haveSpaceFor( creepSpace, exportConf.resource_type )
                    ){
                    creep.memory.job = {target_id:terminal.id,resource_type:exportConf.resource_type,action:'fill'};
                    break;
                }
            }
        }
        /////// Factory Jobs //////////////////////////////////
        if(factory && !creep.memory.job && energyInStorage>=100000 && storage.storedAmount(RESOURCE_BATTERY)<300000){
            
            if(factory.haveSpaceFor(10000)){
                creep.memory.job = {target_id:factory.id,resource_type:RESOURCE_ENERGY,action:'fill'}
            }
        }
                
        if(factory && !creep.memory.job){
            
            if(factory.storingAtLeast(creepSpace,RESOURCE_BATTERY) 
            && storage.haveSpaceFor(creepSpace+storageBufferSpace,RESOURCE_BATTERY)
            && storage.storedAmount(RESOURCE_BATTERY)<300000
            ){
                creep.memory.job = {target_id:factory.id,resource_type:RESOURCE_BATTERY,action:'empty'}
            }
        }
        
        
        if(creep.memory.job){
            this.doJob(creep,storage)
        }
        
        if(!creep.memory.job){
           creep.moveToPos(parkSpot) 
        }
	},
	
	shouldCheckForFillJobs:function(creep,config){
	    
	    if(creep.memory.fillingInProgress)return true;
	    
        if(Game.time%2==0 && !creep.memory.fillingInProgress){
            for(let sp of mb.getStructures({roomNames:[config.coreRoomName],types:[STRUCTURE_SPAWN]})){
                if(sp && sp.spawning){
                    creep.memory.fillingInProgress=true;break;
                }
            }
        }
        return creep.memory.fillingInProgress;
	},
	
	checkJobComplete:function(creep){
	    let job = creep.memory.job;
        let jobTarget = Game.getObjectById(job.target_id);
        //if(creep.name=='T-rk-0')clog(job,creep.name);
        if(!jobTarget && job.target_id!='nope'){
            // not sure why the game object would not exist, but to be safe, drop the job
            clog(creep.memory.job,creep.name+" !job error :")
            creep.memory.reserve_id = false;
            creep.say('!job obj')
            creep.memory.job= false;
            return;
        }
        if(jobTarget && !job.resource_type){
            // not sure why the job is missing resource
            if(Game.time%3==0)clog(creep.memory.job,creep.name+" !job.resource_type error :")
            creep.memory.reserve_id = false;
            creep.say('job err')
            creep.memory.job= false;
            return;
        }
        
        if(job.doneLastTick && creep.memory.job.storedBefore!==creep.storedAmount(job.resource_type) ){
           // clog(job,creep.name)
            if(jobTarget && job.action=='fill'){
                jobTarget.fulfillTransfer(creep.name)
                
            }else if(jobTarget && job.action=='empty'){
                jobTarget.fulfillWithdraw(creep.name)
                
            }
            
            creep.memory.reserve_id = false;
            creep.say('job done')
            creep.memory.job= false;
            return;
        }
        
        if(job.target_id!='nope' && job.action=='empty' &&  jobTarget.isEmpty(job.resource_type) && creep.isEmpty(job.resource_type) ){
            // not sure what the edge case is, for this, but this is a safety clause to stop creep being stuck with a fake job.
            // it could be a global reset bug/ spawning fresh bug
            jobTarget.fulfillWithdraw(creep.name)
            clog(creep.memory.job,creep.name+" all empty :")
            creep.memory.reserve_id = false;
            creep.say('all empty')
            creep.memory.job= false;
        }
        
        if(job.target_id!='nope' && job.action=='fill' &&  jobTarget.isFull(job.resource_type)){
            // not sure what the edge case is, i think it can happen when ext filler dies and the ext is not pathable
            jobTarget.fulfillTransfer(creep.name)
            clog(creep.memory.job,creep.name+" all full :")
            creep.memory.reserve_id = false;
            creep.say('all full')
            creep.memory.job= false;
        }
	}
	,
	doJob: function(creep,storage){
	       
            let job = creep.memory.job;
            let jobTarget = Game.getObjectById(job.target_id);

            if(job.action=='fill'){
                
                if(creep.carryingAtleast(1,job.resource_type)){
                    
                    
                    let res = 404;
                    if(creep.memory.reserve_id)res=creep.transferX(jobTarget,job.resource_type);
                    else res=creep.transfer(jobTarget,job.resource_type);
                    //creep.say(res)
                    if(res===ERR_NOT_IN_RANGE){
                        creep.moveToPos(jobTarget);
                    }else if(res===OK){
                        creep.memory.job.doneLastTick=true;
                        creep.memory.job.storedBefore=creep.storedAmount(job.resource_type);
                    }else{
                        jobTarget.fulfillTransfer(creep.name)
                        creep.memory.job = false;creep.say("dumb fck:"+res)
                    }
                    
                    
                }else{
                    creep.actOrMoveTo("withdraw",storage,job.resource_type);
                }
            }
            if(job.action=='empty'){
                
                if(creep.carryingAtleast(1,job.resource_type)){
                    
                    
                    let res = creep.transfer(storage,job.resource_type)
                    if(res===ERR_NOT_IN_RANGE){
                        creep.moveToPos(storage);
                    }else if(res===OK){
                        creep.memory.job.doneLastTick=true;
                        creep.memory.job.storedBefore=creep.storedAmount(job.resource_type);
                    }else{
                        creep.memory.job = false;creep.say("dim fck:"+res)
                    }
                    
                }else{
                    let func = (creep.memory.reserve_id)?"withdrawX":"withdraw"
                    creep.actOrMoveTo(func,jobTarget,job.resource_type);
                }
            }
    }
	
	
};

module.exports = roleTanker;
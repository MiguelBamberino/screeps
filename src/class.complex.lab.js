const AbstractComplex = require('class.complex.abstract')
const RUN_COOLDOWN_HAULER=10;


class LabComplex extends AbstractComplex{
    
    
    constructor(anchor,facing,fillerSize=600){
        super(anchor,facing);
        this.makingResource = false;
        this.checkForHaulJobsAfter=Game.time;// this is used for CPU saving too. it limits the amount of checks we do on lab stores.
        this.fillerSize = fillerSize;// unlikely to change, but the size of the assigned hauler
        this.haulJob=false;
        this.mode='make';
    }
    make(resource_type){
        if(REACTION_TIME[resource_type]===undefined){
            return ERR_INVALID_ARGS;
        }else{
            this.makingResource = resource_type;
            this.mode='make';
        }
        return this.runTick()
    }
    split(resource_type){

        if(REACTION_TIME[resource_type]===undefined){
            return ERR_INVALID_ARGS;
        }else{
            this.makingResource = resource_type;
            this.mode='split';
        }
        return this.runTick()
    }
    /**
     * The template function that implements the pattern for the comples run() function
     */ 
    runComplex(){
       // return
     
        let reverse = (this.mode=='split');
        let ingredients = this.getIngredients(this.makingResource);
        
        if(ingredients.length==0){
            return ERR_INVALID_ARGS;
        }
        
        if(this.runCoolDown>0){
            this.runCoolDown--;return ERR_TIRED;
        }
       
        
        let feederIDs = this.getStructureIDsByGroup('feeder');
        let reactorIDs = this.getStructureIDsByGroup('reactor');
        if(feederIDs.length<2 || reactorIDs.length<1){
           this.markRequiredStructureMissing(); 
           return ERR_INVALID_ARGS;
        }
        
        let feederLabs = [];
        this.haulJob=false;
        for(let f in feederIDs){
            
            let lab = Game.getObjectById(feederIDs[f]);
            if(!lab){
               this.markRequiredStructureMissing(); 
               return ERR_INVALID_ARGS;
            }
            feederLabs.push(lab);
            
            /////////////////////////////////////////////////////////////////////////////////
            // Find Hauler Job for feeders
            /////////////////////////////////////////////////////////////////////////////////
            //if(this.haulJob)continue;// don't bother looking for a haul job, if we have one
            let dir = reverse?'empty':'fill';
            let result = this.checkLabForHaulerJob(lab,ingredients[f],dir)
            
            if(this.mode==='make' && result===ERR_NOT_ENOUGH_RESOURCES){
                this.runCoolDown=RUN_COOLDOWN_HAULER;
                return result
            }
        }

        for(let id of reactorIDs){
            let reactor = Game.getObjectById(id);
            if(!reactor){
                this.markRequiredStructureMissing(); 
               return ERR_INVALID_ARGS;
            }
            // they should all stay in sync, but if not, lets process the ones off cooldown
            if(reactor.cooldown===0){
                if(this.mode=='make')reactor.runReaction(feederLabs[0],feederLabs[1])
                else if(this.mode=='split' && reactor.storingAtleast(1,this.makingResource))reactor.reverseReaction(feederLabs[0],feederLabs[1])
                this.runCoolDown = REACTION_TIME[this.makingResource];
                
                if(this.haulJob)continue;// don't bother looking for a haul job, if we have one
                let dir = reverse?'fill':'empty';
                this.checkLabForHaulerJob(reactor,this.makingResource,dir)
               
            }else{
                if(this.runCoolDown<reactor.cooldown)this.runCoolDown = reactor.cooldown;// re-sync the labs. Also on global reset/code upload
            }
        }
        
    }
    /**
     * check if the lab requires a hauling job to either empty it of an old resource
     * fill/empty it of the desired resource / fill its energy
     * lab - the lab to check
     * expectedResource - what resource const do we expect/want here
     * directionType - whether we will fill/empty the lab
     **/
    checkLabForHaulerJob(lab,expectedResource,directionType='fill'){
                    
            let storedAmount = lab.storedAmount( expectedResource );
            let space = LAB_MINERAL_CAPACITY - storedAmount;
            if(storedAmount===0){

                let stored_type=false;
                for(let resource_type in lab.store){
                    if(resource_type!==RESOURCE_ENERGY)stored_type = resource_type;
                }
                // if the lab is empty of all resources, AND we aiming to fill this lab, then set a job
                // not we don't want to do this for 'emoty' job types, because there is an edge case where
                // we keep emptying qty 5
                if(!stored_type && directionType=='fill'){
                    
                    this.setHaulerJob(lab,expectedResource,'fill')
                    
                }else if(stored_type && stored_type!=expectedResource){
                    
                    this.setHaulerJob(lab,stored_type,'empty')
                    
                }
                return ERR_NOT_ENOUGH_RESOURCES;
            }
            else if( (space >= this.fillerSize && directionType=='fill') || (this.fillerSize<=storedAmount && directionType=='empty') ){
                this.setHaulerJob(lab,expectedResource,directionType)
                return OK;
            }
            else if( lab.haveSpaceFor(this.fillerSize,RESOURCE_ENERGY)){
                this.setHaulerJob(lab,RESOURCE_ENERGY,'fill')
                return OK;
            }
            return ERR_FULL;
    }
    /**
     * 
     * Go through each lab and look for a haul job. 
     * This will populate the class haulJob param.
     * it will also set the haul job cooldown check timer
     */ 
    checkAllLabsForHaulJob(){
        
        let reverse = (this.mode=='split');
        let ingredients = this.getIngredients(this.makingResource);
        if(ingredients.length==0){
            return ERR_INVALID_ARGS;
        }
        
        let feederIDs = this.getStructureIDsByGroup('feeder');
        let reactorIDs = this.getStructureIDsByGroup('reactor');
        if(feederIDs.length<2 || reactorIDs.length<1){
            this.markRequiredStructureMissing(); 
               return ERR_INVALID_ARGS;
        }
        for(let f in feederIDs){
            
            let lab = Game.getObjectById(feederIDs[f]);
            if(lab){
                let dir = reverse?'empty':'fill';
                if(this.checkLabForHaulerJob(lab,ingredients[f],dir)===OK)return OK;
            }
        }
        
        for(let id of reactorIDs){
            let reactor = Game.getObjectById(id);
            if(reactor){
                let dir = reverse?'fill':'empty';
               if(this.checkLabForHaulerJob(reactor,this.makingResource,dir)===OK)return OK;
            }
        }
        this.checkForHaulJobsAfter=Game.time+REACTION_TIME[this.makingResource];
        return ERR_FULL;
    }
    /**
     * 
     * 
     */ 
    takeJob(){
       // if(this.anchor.roomName==='W45N51')clog(this.checkForHaulJobsAfter,'this.checkForHaulJobsAfter---before')
        //if(this.anchor.roomName==='W45N51')clog(this.checkForHaulJobsAfter-Game.time,'wait')
       // if(this.anchor.roomName==='W45N51')clog(this.haulJob,'this.haulJob')
        if(!this.haulJob && this.checkForHaulJobsAfter<Game.time){
            this.checkAllLabsForHaulJob()
        }
     //if(this.anchor.roomName==='W45N51')clog(this.checkForHaulJobsAfter,'this.checkForHaulJobsAfter---after')
        let job = this.haulJob;
        this.haulJob = false;
        return job;
    }
    /**
     * Set a next haul job 
     */
    setHaulerJob(lab,resource_type,actionType){
        //this.checkForHaulJobsAfter=Game.time+RUN_COOLDOWN_HAULER;
        this.haulJob = {id:lab.id,resource_type,action:actionType}
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    _getStandingSpot(facing){
        if(facing===TOP_LEFT){
            return rp(this.anchor.x+1,this.anchor.y+1,this.anchor.roomName)
        }
        if(facing===TOP_RIGHT){
            return rp(this.anchor.x-1,this.anchor.y+1,this.anchor.roomName)
        }
        if(facing===BOTTOM_RIGHT){
            return rp(this.anchor.x-1,this.anchor.y-1,this.anchor.roomName)
        }
        if(facing===BOTTOM_LEFT){
            return rp(this.anchor.x+1,this.anchor.y-1,this.anchor.roomName)
        }
    }
    
    getLayoutPlan(facing){
        if(facing===TOP_LEFT){
            return [
                {type:STRUCTURE_ROAD,offset:{x:0,y:0},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:1,y:1},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:2,y:2},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:3},rcl:6,replace:false},
                {type:STRUCTURE_LAB,offset:{x:1,y:2},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:2,y:1},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:0,y:1},rcl:6,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:1,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:2,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:0,y:2},rcl:7,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:1,y:3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:2,y:3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:3,y:1},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:3,y:2},rcl:8,replace:false,group:'reactor'},
            ];
        }
        if(facing===TOP_RIGHT){
            return [
                {type:STRUCTURE_ROAD,offset:{x:0,y:0},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:1},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-2,y:2},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-3,y:3},rcl:6,replace:false},
                {type:STRUCTURE_LAB,offset:{x:-1,y:2},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:-2,y:1},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:0,y:1},rcl:6,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:-1,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-2,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:0,y:2},rcl:7,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:-1,y:3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-2,y:3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-3,y:1},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-3,y:2},rcl:8,replace:false,group:'reactor'},
            ];
        }
        if(facing===BOTTOM_RIGHT){
            return [
                {type:STRUCTURE_ROAD,offset:{x:0,y:0},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-1},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-2,y:-2},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-3,y:-3},rcl:6,replace:false},
                {type:STRUCTURE_LAB,offset:{x:-1,y:-2},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:-2,y:-1},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:0,y:-1},rcl:6,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:-1,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-2,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:0,y:-2},rcl:7,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:-1,y:-3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-2,y:-3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-3,y:-1},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:-3,y:-2},rcl:8,replace:false,group:'reactor'},
            ];
        }
        if(facing===BOTTOM_LEFT){
            return [
                {type:STRUCTURE_ROAD,offset:{x:0,y:0},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:1,y:-1},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:2,y:-2},rcl:6,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:-3},rcl:6,replace:false},
                {type:STRUCTURE_LAB,offset:{x:1,y:-2},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:2,y:-1},rcl:6,replace:false,group:'feeder'},
                {type:STRUCTURE_LAB,offset:{x:0,y:-1},rcl:6,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:1,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:2,y:0},rcl:7,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:0,y:-2},rcl:7,replace:false,group:'reactor'},
                
                {type:STRUCTURE_LAB,offset:{x:1,y:-3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:2,y:-3},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:3,y:-1},rcl:8,replace:false,group:'reactor'},
                {type:STRUCTURE_LAB,offset:{x:3,y:-2},rcl:8,replace:false,group:'reactor'},
            ];
        }
    }
    
    
    getIngredients(product){
        
        // Tier 0 - Components
        if(product===RESOURCE_HYDROXIDE) return [RESOURCE_HYDROGEN,RESOURCE_OXYGEN]
        if(product===RESOURCE_UTRIUM_LEMERGITE) return [RESOURCE_UTRIUM,RESOURCE_LEMERGIUM]
        if(product===RESOURCE_ZYNTHIUM_KEANITE) return [RESOURCE_ZYNTHIUM,RESOURCE_KEANIUM]
        if(product===RESOURCE_GHODIUM) return [RESOURCE_UTRIUM_LEMERGITE,RESOURCE_ZYNTHIUM_KEANITE]
        
        // Tier 1
        if(product===RESOURCE_GHODIUM_OXIDE) return [RESOURCE_GHODIUM,RESOURCE_OXYGEN]
        if(product===RESOURCE_LEMERGIUM_OXIDE) return [RESOURCE_LEMERGIUM,RESOURCE_OXYGEN]
         if(product===RESOURCE_UTRIUM_OXIDE) return [RESOURCE_UTRIUM,RESOURCE_OXYGEN]
        if(product===RESOURCE_ZYNTHIUM_OXIDE) return [RESOURCE_ZYNTHIUM,RESOURCE_OXYGEN]
        if(product===RESOURCE_KEANIUM_OXIDE) return [RESOURCE_KEANIUM,RESOURCE_OXYGEN]
       
        
        if(product===RESOURCE_GHODIUM_HYDRIDE) return [RESOURCE_GHODIUM,RESOURCE_HYDROGEN]
        if(product===RESOURCE_UTRIUM_HYDRIDE) return [RESOURCE_UTRIUM,RESOURCE_HYDROGEN]
        if(product===RESOURCE_ZYNTHIUM_HYDRIDE) return [RESOURCE_ZYNTHIUM,RESOURCE_HYDROGEN]
        
        
        // Tier 2
        if(product===RESOURCE_GHODIUM_ALKALIDE) return [RESOURCE_GHODIUM_OXIDE,RESOURCE_HYDROXIDE]
        if(product===RESOURCE_LEMERGIUM_ALKALIDE) return [RESOURCE_LEMERGIUM_OXIDE,RESOURCE_HYDROXIDE]
       
        if(product===RESOURCE_GHODIUM_ACID) return [RESOURCE_GHODIUM_HYDRIDE,RESOURCE_HYDROXIDE]
        if(product===RESOURCE_UTRIUM_ACID) return [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_HYDROXIDE]
        if(product===RESOURCE_ZYNTHIUM_ACID) return [RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_HYDROXIDE]
        
        
        return [];
    }
}
module.exports = LabComplex;
const DETECT_STRUCTURES_INTERVAL=250;
const ERR_OFF=-16;
const RUN_FOREVER=9999999;

class AbstractComplex{
    
    constructor(anchor,facing){
        
        this.anchor = anchor;
        //this.on = false;
        this.windDownTimer = 0;
        this.standingSpot = this._getStandingSpot(facing);
        this.facing = facing;
        this.rcl = Game.rooms[anchor.roomName].controller.level;
        this.allRequiredStructuresBuilt=true;
        this.minRCL = 99;
        this.structureLookup={};
        this.groupLookup={};
        this.detectExistingStructures();
    }
    runTick(){
        
        
        
        if(Game.rooms[this.anchor.roomName].controller.level<this.minRCL){
            return ERR_RCL_NOT_ENOUGH;
        }
        
        if(this.windDownTimer===0)return -16;
        
        if(this.windDownTimer!=RUN_FOREVER && this.windDownTimer>0)this.windDownTimer--;
        //if(this.windDownTimer==0)this.turnOff();
        
        if(Game.time % DETECT_STRUCTURES_INTERVAL===0 || Game.rooms[this.anchor.roomName].controller.level!=this.rcl){
            
            this.rcl=Game.rooms[this.anchor.roomName].controller.level;
            logs.startCPUTracker('detectExistingStructures');
            this.detectExistingStructures(); 
            logs.stopCPUTracker('detectExistingStructures',true);
        }
        
        if(!this.allRequiredStructuresBuilt)return ERR_INVALID_ARGS;
        
        return this.runComplex();
    }
    isOn(){
        return this.windDownTimer>0;
    }
    turnOn(){
     this.windDownTimer=RUN_FOREVER;   
    }
    turnOff(){
        this.windDownTimer=0;
    }
    windDown(timer=1500){
        this.windDownTimer = timer;
    }
    isWindingDown(){
        return (this.windDownTimer>0 && this.windDownTimer!=RUN_FOREVER);
    }
    timeToWindDown(){
        return this.windDownTimer;
    }
    markRequiredStructureMissing(){
        this.allRequiredStructuresBuilt=false;
    }
    /**
     * Use the layout plan to find any existing structures and load them in local lookups
     */ 
    detectExistingStructures(){
        this.allRequiredStructuresBuilt=true;
        this.structureLookup=[];
        this.groupLookup=[];
        for(let plan of this.getLayoutPlan(this.facing)){
            
            if(plan.rcl<this.minRCL)
                this.minRCL=plan.rcl;
            
            plan.pos = new RoomPosition(this.anchor.x+plan.offset.x,this.anchor.y+plan.offset.y,this.anchor.roomName);
       
            if(this.structureLookup[plan.type]===undefined){
                this.structureLookup[plan.type]=[];
            }
            if(plan.group && this.groupLookup[plan.group]===undefined){
                this.groupLookup[plan.group]=[];
            }
            if(this.rcl>=plan.rcl){
                let struct = plan.pos.lookForStructure(plan.type)
                if(struct){
                    this.structureLookup[plan.type].push(struct.id);
                    if(plan.group){
                        this.groupLookup[plan.group].push(struct.id);
                    }
                }else{
                    if(plan.required===true)this.allRequiredStructuresBuilt=false;
                    plan.pos.createConstructionSite(plan.type)
                }
            }
        }
    }
    getStructureIDsByGroup(name){
        return this.groupLookup[name];
    }
    getStructureIDsByType(type){
        return this.structureLookup[type];
    }
    /**
     * Use the layoutPlan of offsets to decide the real positions of the structures
     */ 
    getLayoutPositions(){
        let positions = [];
        for(let plan of this.getLayoutPlan(this.facing)){
            plan.pos = new RoomPosition(this.anchor.x+plan.offset.x,this.anchor.y+plan.offset.y,this.anchor.roomName);
            positions.push(plan);
        }
        return positions;
    }
    ////////////////////////////////////////////////////////////////////
    // Common Room Quick-access 
    ////////////////////////////////////////////////////////////////////
    room(){
        return Game.rooms[this.anchor.roomName];
    }
    
    ////////////////////////////////////////////////////////////////////
    // Template Design Pattern: 
    ////////////////////////////////////////////////////////////////////
    getLayoutPlan(facing){
        return [];
    }
    _getStandingSpot(facing){
        return this.anchor;
    }
    runComplex(){
        
    }
}
module.exports = AbstractComplex;
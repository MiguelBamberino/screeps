
const DETECT_STRUCTURES_INTERVAL=250;
const ERR_OFF=-16;

class AbstractComplex{
    
    constructor(anchor,facing, draft=false){
        
        this.anchor = anchor;
        // this is used to power down slowly, if we still have workers alive
        this.windDownTimer = 0;
        // this is used for CPU saving. There is a lot of check to run, for successful run.
        this.runCoolDown=0;
        
        this.lastResult = OK;
        this.draft = draft;
        
        this.standingSpot = this._getStandingSpot(facing);
        this.facing = facing;
        this.rcl = Game.rooms[anchor.roomName].controller.level;
        this.allRequiredStructuresBuilt=true;
        this.minRCL = 99;
        this.replaceHapped = false;
        this.structureLookup={};
        this.groupLookup={};
        this.detectExistingStructures();
        this.setCostMatrixChanges(facing);
    }
    runTick(){
        
        
        
        if(Game.rooms[this.anchor.roomName].controller.level<this.minRCL){
            this.lastResult = ERR_RCL_NOT_ENOUGH;
            return this.lastResult;
        }
        
        if(this.runCoolDown>0){
            this.lastResult = ERR_TIRED;
            this.runCoolDown--;
            return this.lastResult;
        }
        // THEN if the complex has wound down, we do not run it. this means, that if it winds down THIS tick,
        // then we don't run that last tick. Previously this was causing a problem, where extractors were continuously keeping themselves online
        if(this.windDownTimer===0)return ERR_OFF;
        
        

        
        if(Game.time % DETECT_STRUCTURES_INTERVAL===0 || Game.rooms[this.anchor.roomName].controller.level!=this.rcl || this.replaceHapped){
            
            this.rcl=Game.rooms[this.anchor.roomName].controller.level;
            logs.startCPUTracker('detectExistingStructures');
            this.detectExistingStructures(); 
            logs.stopCPUTracker('detectExistingStructures',false);
        }
        
        if(!this.allRequiredStructuresBuilt){
            this.lastResult = ERR_INVALID_ARGS;
            return this.lastResult;
        }
        
        this.lastResult = this.runComplex();

		if(this.windDownTimer!=RUN_FOREVER && this.windDownTimer>0)this.windDownTimer--;

        return this.lastResult;
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
        const terrain = Game.map.getRoomTerrain(this.anchor.roomName);
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
                    if( ! [STRUCTURE_ROAD,STRUCTURE_RAMPART,STRUCTURE_CONTAINER].includes(plan.type) )
                        mb.setCostOnMatrix(plan.pos.roomName,plan.pos.x,plan.pos.y,255);
                }else{
                    if(plan.required===true)this.allRequiredStructuresBuilt=false;

                    ///////////////////////////////////////////////////////////////////////
                    // Actual constructions
                    ///////////////////////////////////////////////////////////////////////
                    if(this.draft)continue;

                    if(plan.requireStorage && !this.room().storage){
                        continue;
                    }
                    if(plan.replacedAtRCL && plan.replacedAtRCL <= this.rcl){
                        continue;
                    }
                    if(plan.requireRamp){
                        let ramp = plan.pos.lookForStructure(STRUCTURE_RAMPART)
                        if(!ramp){
                            mb.addConstruction(plan.pos,STRUCTURE_RAMPART);
                            continue;
                        }
                        if(ramp && ramp.hits < 50000){
                            continue;
                        }
                    }
                    if(plan.type===STRUCTURE_ROAD){

                        // Check if the terrain is wall, as no structure can be built on walls
                        if(terrain.get(plan.pos.x, plan.pos.y) === TERRAIN_MASK_WALL) {
                            continue;//maybe oe day we'll be crazy enough to allow roads on walls
                        }
                    }

                    if(plan.replace){
                        let structure = plan.pos.lookForStructure(plan.replace);
                        if(structure){
                            console.log("replacing",plan.replace,plan.type,plan.pos,structure)
                            // if we succeed,  we'll need another rerun next tick
                            if(structure.destroy()===OK)this.replaceHapped=true;
                        }
                    }
                    if(plan.destroy){
                        let structure = plan.pos.lookForStructure(plan.type);
                        console.log("destroying",plan.type,plan.pos)
                        if(structure)structure.destroy();
                    }else{
                        let res = mb.addConstruction(plan.pos,plan.type,plan.name)

                    }



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
    controller(){
        return this.room().controller;
    }
    ////////////////////////////////////////////////////////////////////
    // Template Design Pattern: 
    ////////////////////////////////////////////////////////////////////
    setCostMatrixChanges(facing){

    }
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
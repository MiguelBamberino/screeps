class AbstractComplex{
    
    constructor(anchor,facing){
        
        this.anchor = anchor;
        this.standingSpot = this._getStandingSpot(facing);
        this.facing = facing;
        this.rcl = Game.rooms[anchor.roomName].controller.level;
        this.minRCL = 99;
        this.structureLookup={};
        this.groupLookup={};
        this.detectExistingStructures();
    }
    runTick(){
        if(Game.rooms[this.anchor.roomName].controller.level<this.minRCL){
            return ERR_RCL_NOT_ENOUGH;
        }
        if(Game.rooms[this.anchor.roomName].controller.level!=this.rcl){
            this.rcl=Game.rooms[this.anchor.roomName].controller.level;
            clog("RCL change, rechecking complex structures ")
            //logs.startCPUTracker('detectExistingStructures');
            this.detectExistingStructures(); 
            //logs.stopCPUTracker('detectExistingStructures',true);
        }
        return this.runComplex();
    }
    /**
     * Use the layout plan to find any existing structures and load them in local lookups
     */ 
    detectExistingStructures(){
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
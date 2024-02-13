const AbstractComplex = require('class.complex.abstract')
const fillerRole = require('./role.filler');
module.exports = class BaseCoreComplex extends AbstractComplex {

    constructor(anchor, spawnName, facing, maxRCL=8, draft = false) {
        super(anchor, facing,maxRCL, draft);
        this.haulJob = false;
        this.config = {}
        this.name = spawnName;
    }

    run(config) {
        this.config = config;
        this.runTick();
    }
    runComplex(){
        if(!this.config)return;
        if(this.config.spawnFastFillerReady){

            //this.runAllFillers();
        }
    }
    getLayoutPlan(facing){

        if(facing===TOP){
            return [
                // ---------- RCL 4 --------------------------------------------------
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:0},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:0},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:0},rcl:4},
                // ---------- RCL 5 --------------------------------------------------
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:1},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:1},rcl:5},
                // row 2
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:2},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_TOWER,offset:{x:1,y:2},rcl:5,requiresRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:2},rcl:5},
                // ---------- RCL 8 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:0,y:1},rcl:8,name:this.name+'-3',replace:true},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:0,y:2},rcl:8,replace:true},

            ];
        }
        else if(facing===BOTTOM){
            return [
                // ---------- RCL 4 --------------------------------------------------
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:0},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:0},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:0},rcl:4},
                // ---------- RCL 5 --------------------------------------------------
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:-1},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-1},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-1},rcl:5},
                // row 2
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-2},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_TOWER,offset:{x:1,y:-2},rcl:5,requiresRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-2},rcl:5},
                // ---------- RCL 8 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:0,y:-1},rcl:8,name:this.name+'-3',replace:true},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:0,y:-2},rcl:8,replace:true},

            ];
        }
        else if(facing===LEFT){
            return [
                // ---------- RCL 4 --------------------------------------------------
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-2},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-1},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:2},rcl:4},
                // ---------- RCL 5 --------------------------------------------------
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:-2},rcl:5},
                // row 2
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-1},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:0},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_TOWER,offset:{x:2,y:1},rcl:5,requiresRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:2},rcl:5},
                // ---------- RCL 8 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:1,y:0},rcl:8,name:this.name+'-3',replace:true},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:2,y:0},rcl:8,replace:true},

            ];
        }
        else if(facing===RIGHT){
            return [
                // ---------- RCL 4 --------------------------------------------------
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-2},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-1},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:2},rcl:4},
                // ---------- RCL 5 --------------------------------------------------
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:0},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:-2},rcl:5},
                // row 2
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:-1},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:0},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_TOWER,offset:{x:-2,y:1},rcl:5,requiresRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:2},rcl:5},
                // ---------- RCL 8 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:-1,y:0},rcl:8,name:this.name+'-3',replace:true},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:-2,y:0},rcl:8,replace:true},

            ];
        }

    }
}
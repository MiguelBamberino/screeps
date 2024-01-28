const AbstractComplex = require('class.complex.abstract')

class BaseCoreComplex extends AbstractComplex{

    constructor(anchor,facing, draft=false){
        super(anchor,facing,draft);

        this.haulJob=false;
    }
    runComplex(){

    }
    getLayoutPlan(facing){
        if(facing===TOP){
            return [
                // ---------- RCL 1 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:0,y:0},rcl:1,replace:false},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:2},rcl:1,replace:false},
                // ---------- RCL 2 --------------------------------------------------
                // row -1 (top road)
                {type:STRUCTURE_ROAD,offset:{x:-2,y:-1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:0,y:-1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:1,y:-1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:2,y:-1},rcl:2,replace:false},
                // row 0
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:0},rcl:2,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:0},rcl:2,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:0},rcl:2,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:2,replace:false},
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-3,y:1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:1},rcl:2,replace:false},
                // row 2
                {type:STRUCTURE_ROAD,offset:{x:-3,y:2},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:2},rcl:2,replace:false},

                // ---------- RCL 3 --------------------------------------------------
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:1},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:1},rcl:3,replace:false},
                // row 2
                {type:STRUCTURE_CONTAINER,offset:{x:-2,y:2},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:2},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:2},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:2},rcl:3,replace:false},
                // row 3
                {type:STRUCTURE_TOWER,offset:{x:2,y:3},rcl:3,replace:false},

                // ---------- RCL 4 --------------------------------------------------
                // row 0 - ramp core spawn
                {type:STRUCTURE_RAMPART,offset:{x:0,y:0},rcl:4,replace:false},
                // row 2 - ramp storage spot
                {type:STRUCTURE_STORAGE,offset:{x:2,y:2},rcl:4,replace:true,requireRamp:true},
                // row 3
                {type:STRUCTURE_ROAD,offset:{x:-3,y:3},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:3},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:3},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:3},rcl:4,replace:false},
                // ramp tower
                {type:STRUCTURE_RAMPART,offset:{x:2,y:3},rcl:4,replace:false},
                // row 4
                {type:STRUCTURE_ROAD,offset:{x:-3,y:4},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:4},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:4},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:4},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:4},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:4},rcl:4,replace:false},
                // row 5
                {type:STRUCTURE_ROAD,offset:{x:-2,y:5},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:5},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:0,y:5},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:1,y:5},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:2,y:5},rcl:4,replace:false},

                // ---------- RCL 5 --------------------------------------------------
                {type:STRUCTURE_LINK,offset:{x:0,y:2},rcl:5,replace:true},
                // ---------- RCL 6 --------------------------------------------------
                {type:STRUCTURE_TERMINAL,offset:{x:2,y:1},rcl:6,replace:true},
                // ---------- RCL 7 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:0,y:4},rcl:7,replace:false},
            ];
        }
        if(facing===LEFT){
            return [
                // ---------- RCL 1 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:0,y:0},rcl:1,replace:false},
                {type:STRUCTURE_CONTAINER,offset:{x:2,y:0},rcl:1,replace:false},
                // ---------- RCL 2 --------------------------------------------------
                // column -1 (top road)
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-2},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:0},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:1},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:2},rcl:2,replace:false},
                // column 0
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-2},rcl:2,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-1},rcl:2,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:2,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:2},rcl:2,replace:false},
                // column 1
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:1,y:-3},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:1,y:3},rcl:2,replace:false},
                // column 2
                {type:STRUCTURE_ROAD,offset:{x:2,y:-3},rcl:2,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:2,y:3},rcl:2,replace:false},

                // ---------- RCL 3 --------------------------------------------------
                // column 1
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:-2},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:2},rcl:3,replace:false},
                // column 2
                {type:STRUCTURE_CONTAINER,offset:{x:2,y:2},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:1},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-1},rcl:3,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-2},rcl:3,replace:false},
                // column 3
                {type:STRUCTURE_TOWER,offset:{x:3,y:-2},rcl:3,replace:false},

                // ---------- RCL 4 --------------------------------------------------
                // column 0 - ramp core spawn
                {type:STRUCTURE_RAMPART,offset:{x:0,y:0},rcl:4,replace:false},
                // column 2 - ramp storage spot
                {type:STRUCTURE_STORAGE,offset:{x:2,y:-2},rcl:4,replace:true,requireRamp:true},
                // column 3
                {type:STRUCTURE_ROAD,offset:{x:3,y:-3},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:3,y:3},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:3,y:0},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:3,y:2},rcl:4,replace:false},
                // ramp tower
                {type:STRUCTURE_RAMPART,offset:{x:3,y:-2},rcl:4,replace:false},
                // column 4
                {type:STRUCTURE_ROAD,offset:{x:4,y:-3},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:4,y:3},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:-2},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:-1},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:1},rcl:4,replace:false},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:2},rcl:4,replace:false},
                // column 5
                {type:STRUCTURE_ROAD,offset:{x:5,y:-2},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:5,y:-1},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:5,y:0},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:5,y:1},rcl:4,replace:false},
                {type:STRUCTURE_ROAD,offset:{x:5,y:2},rcl:4,replace:false},

                // ---------- RCL 5 --------------------------------------------------
                {type:STRUCTURE_LINK,offset:{x:2,y:0},rcl:5,replace:true},
                // ---------- RCL 6 --------------------------------------------------
                {type:STRUCTURE_TERMINAL,offset:{x:1,y:-2},rcl:6,replace:true},
                // ---------- RCL 7 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:4,y:0},rcl:7,replace:false},
            ];
        }
    }
}
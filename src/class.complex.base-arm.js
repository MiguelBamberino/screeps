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
        if(Game.spawns[this.name+'-3']){

            this.runAllFillers();
        }
    }
    runAllFillers(){

        this.runFiller(this.name+'-3',this.name.charAt(0)+ 'FF4');
        this.runFiller(this.name+'-3',this.name.charAt(0)+'FF5');

    }
    runFiller(spawnName,creepName){

        if(!Game.spawns[spawnName])return;

        let mainSpawnDirs = this.getMainSpawnDirs(this.facing);
        let fillerSpawnDirs = this.getFillerSpawnDirs(this.facing);

        // erghh...screwed me over too many times. Will do long term fix one day. Stop the tempCode creeps from spawning into a fast filler spot.
        Game.spawns[spawnName].forceDirectionHack = mainSpawnDirs;

        if(!Game.creeps[creepName]){
            let bodyPlan = fillerRole.getParts(0,this.config);
            Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,fillerSpawnDirs);
        }
        if(Game.creeps[creepName] && !Game.creeps[creepName].spawning){
            let creep = Game.creeps[creepName];
            fillerRole.run(creep,this.config);
        }
    }
    getMainSpawnDirs(facing){
        return facing;
    }
    getFillerSpawnDirs(facing){
        let dirs =[];
        if(facing===TOP){
            dirs = [LEFT,RIGHT];
        }
        if(facing===LEFT){
            dirs = [TOP,BOTTOM];
        }
        if(facing===RIGHT){
            dirs = [TOP,BOTTOM];
        }
        if(facing===BOTTOM){
            dirs = [LEFT,RIGHT];
        }
        return dirs;
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
                {type:STRUCTURE_SPAWN,offset:{x:0,y:1},rcl:8,name:this.name+'-3',replace:STRUCTURE_EXTENSION},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:0,y:2},rcl:8,replace:STRUCTURE_EXTENSION},

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
                {type:STRUCTURE_SPAWN,offset:{x:0,y:-1},rcl:8,name:this.name+'-3',replace:STRUCTURE_EXTENSION},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:0,y:-2},rcl:8,replace:STRUCTURE_EXTENSION},

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
                {type:STRUCTURE_SPAWN,offset:{x:1,y:0},rcl:8,name:this.name+'-3',replace:STRUCTURE_EXTENSION},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:2,y:0},rcl:8,replace:STRUCTURE_EXTENSION},

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
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:2},rcl:5},
                // row 2
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:-2},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:-1},rcl:5},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:0},rcl:5,replacedAtRCL: 8},
                {type:STRUCTURE_TOWER,offset:{x:-2,y:1},rcl:5,requiresRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:2},rcl:5},
                // ---------- RCL 8 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:-1,y:0},rcl:8,name:this.name+'-3',replace:STRUCTURE_EXTENSION},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:0},rcl:8},
                {type:STRUCTURE_LINK,offset:{x:-2,y:0},rcl:8,replace:STRUCTURE_EXTENSION},

            ];
        }

    }
}
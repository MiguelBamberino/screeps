const AbstractComplex = require('class.complex.abstract')
const fillerRole = require('./role.filler');
module.exports = class BaseCoreComplex extends AbstractComplex{

    constructor(anchor,spawnName, facing,maxRCL=8, draft=false){
        super(anchor,facing,maxRCL,draft);
        this.haulJob=false;
        this.config = {}
        this.name = spawnName;
        this.buildTerminal = true;
        this.repairTargets = [];
    }
    run(config){
        this.config = config;

        this.runTick();
    }
    runComplex(){
        if(!this.config)return;

        this.runTowerRepairs()


        if(this.config.spawnFastFillerReady){

            this.runAllFillers();
        }
    }
    runTowerRepairs(){
        // every 50t because ramps decay quickly
        if(Game.time%50===0){
            let rampIDs = this.getStructureIDsByType(STRUCTURE_RAMPART);
            for(let id of rampIDs){
                let structure = gob(id);
                if(structure && structure.hits < this.config.defenceIntel.rampHeight && !this.repairTargets.includes(id)){
                    this.repairTargets.push(id)
                }
            }
        }
        // every 1000t because containers can afford to lose a lot before decay
        if(Game.time%1000===0){
            let rampIDs = this.getStructureIDsByType(STRUCTURE_CONTAINER);
            for(let id of rampIDs){
                let structure = gob(id);
                if(structure && (structure.hitsMax - structure.hits) > 800 ){
                    this.repairTargets.push(id)
                }
            }
        }
        // every 1000t because roads can afford to lose a lot before decay
        if(Game.time%1000===0){
            let rampIDs = this.getStructureIDsByType(STRUCTURE_ROAD);
            for(let id of rampIDs){
                let structure = gob(id);
                if(structure && (structure.hitsMax - structure.hits) > 800 ){
                    this.repairTargets.push(id)
                }
            }
        }
        if(this.repairTargets.length>0){
            let towerIDs = this.getStructureIDsByType(STRUCTURE_TOWER)
            if(towerIDs.length>0){
                let repairTower = gob(towerIDs[0]);
                if(repairTower && repairTower.storingAtLeast(200)){
                    let repairedSomething = false;
                    for(let id of this.repairTargets){
                        let structure = gob(id);
                        if(!structure)continue;
                        if( [STRUCTURE_ROAD,STRUCTURE_CONTAINER].includes(structure.structureType) && (structure.hitsMax - structure.hits) > 800){
                            repairedSomething = repairTower.repair(structure);
                            break;
                        }
                        else if( structure.hits < this.config.defenceIntel.rampHeight ){
                            repairedSomething = repairTower.repair(structure);
                            break;
                        }
                    }
                    // if nothing needs repairing, empty out the list.
                    if(repairedSomething===false){
                        this.repairTargets = [];
                    }

                }
            }
        }
    }
    runAllFillers(){


        this.extraFastFillSpots = this.getExtraFillerSpots(this.facing);

        this.runFiller(this.name,this.name.charAt(0)+ 'FF0');
        this.runFiller(this.name,this.name.charAt(0)+'FF1');
        let i=2;

        if(Game.spawns[this.name+'-2']){
            this.runFiller(this.name+'-2', (this.name.charAt(0))+'FF2');
            this.runFiller(this.name+'-2', (this.name.charAt(0))+ 'FF3');
            i+=2;
        }
        for(let pos of this.extraFastFillSpots){

            this.runFiller(this.name,this.name.charAt(0)+'FF'+i,pos);
            i++;
        }

    }
    runFiller(spawnName,creepName,moveToSpot=false){

        if(!Game.spawns[spawnName])return;

        let facing = spawnName.includes('-2')?this.getReverseDirectionTo(this.facing):this.facing;
        let mainSpawnDirs = this.getMainSpawnDirs(facing);
        let fillerSpawnDirs = this.getFillerSpawnDirs(facing);

        // erghh...screwed me over too many times. Will do long term fix one day. Stop the tempCode creeps from spawning into a fast filler spot.
        Game.spawns[spawnName].forceDirectionHack = mainSpawnDirs;
        let dirs = fillerSpawnDirs
        if(!Game.creeps[creepName]){
            let bodyPlan = fillerRole.getParts(0,this.config);
            dirs = (moveToSpot)?mainSpawnDirs:fillerSpawnDirs;
            if(moveToSpot){
                bodyPlan.push(MOVE);
            }

             Game.spawns[spawnName].createCreep(bodyPlan,{role:'filler'},creepName,dirs);

        }
        if(Game.creeps[creepName] && !Game.creeps[creepName].spawning){
            let creep = Game.creeps[creepName];

            if(moveToSpot && !creep.pos.isEqualTo(moveToSpot)){
                creep.moveTo(moveToSpot);
            }else{
                fillerRole.run(creep,this.config);
            }
        }
    }
    setCostMatrixChanges(facing){
        let a = this.anchor;
        //return;
        if(facing===TOP){
            mb.setCostOnMatrix(a.roomName,a.x-1,a.y+1,255);
            mb.setCostOnMatrix(a.roomName,a.x+1,a.y+1,255);
            mb.setCostOnMatrix(a.roomName,a.x,a.y+2,255);
        }
        else if(facing===LEFT){
            mb.setCostOnMatrix(a.roomName,a.x+1,a.y-1,255);
            mb.setCostOnMatrix(a.roomName,a.x+2,a.y,255);
            mb.setCostOnMatrix(a.roomName,a.x+1,a.y+1,255);
        }
        else if(facing===RIGHT){
            mb.setCostOnMatrix(a.roomName,a.x-1,a.y-1,255);
            mb.setCostOnMatrix(a.roomName,a.x-2,a.y,255);
            mb.setCostOnMatrix(a.roomName,a.x-1,a.y+1,255);
        }
        else if(facing===BOTTOM){
            mb.setCostOnMatrix(a.roomName,a.x-1,a.y-1,255);
            mb.setCostOnMatrix(a.roomName,a.x+1,a.y-1,255);
            mb.setCostOnMatrix(a.roomName,a.x,a.y-2,255);
        }
    }
    getExtraFillerSpots(facing){
        // only run for RCL 4,5,6
        if(!Game.rooms[this.anchor.roomName].storage)return [];
        if([1,2,3,7,8].includes(this.controller().level))return [];

        if(facing===TOP){
            return [rp(this.anchor.x-1,this.anchor.y+3,this.anchor.roomName),rp(this.anchor.x+1,this.anchor.y+3,this.anchor.roomName)]
        }
        if(facing===LEFT){
            return [rp(this.anchor.x+3,this.anchor.y-1,this.anchor.roomName),rp(this.anchor.x+3,this.anchor.y+1,this.anchor.roomName)]
        }
        if(facing===RIGHT){
            return [rp(this.anchor.x-3,this.anchor.y-1,this.anchor.roomName),rp(this.anchor.x-3,this.anchor.y+1,this.anchor.roomName)]
        }
        if(facing===BOTTOM){
            return [rp(this.anchor.x-1,this.anchor.y-3,this.anchor.roomName),rp(this.anchor.x+1,this.anchor.y-3,this.anchor.roomName)]
        }
    }
    getReverseDirectionTo(dir){
        if(dir===TOP)return BOTTOM;
        if(dir===TOP_RIGHT)return BOTTOM_LEFT;
        if(dir===RIGHT)return LEFT;
        if(dir===BOTTOM_RIGHT)return TOP_LEFT;
        if(dir===BOTTOM)return TOP;
        if(dir===BOTTOM_LEFT)return TOP_RIGHT;
        if(dir===LEFT)return RIGHT;
        if(dir===TOP_LEFT)return BOTTOM_RIGHT;
    }
    getMainSpawnDirs(facing){

        if(facing===TOP){
            return [TOP_LEFT,TOP,TOP_RIGHT];
        }
        if(facing===LEFT){
            return [TOP_LEFT,LEFT,BOTTOM_LEFT];
        }
        if(facing===RIGHT){
            return [TOP_RIGHT,RIGHT,BOTTOM_RIGHT];
        }
        if(facing===BOTTOM){
            return [BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
        }
    }
    getFillerSpawnDirs(facing){
        let dirs =[];
        if(facing===TOP){
            dirs = [BOTTOM_LEFT,BOTTOM_RIGHT];
        }
        if(facing===LEFT){
            dirs = [TOP_RIGHT,BOTTOM_RIGHT];
        }
        if(facing===RIGHT){
            dirs = [TOP_LEFT,BOTTOM_LEFT];
        }
        if(facing===BOTTOM){
            dirs = [TOP_LEFT,TOP_RIGHT];
        }
        return dirs;
    }
    getStandingSpot(){
        if(this.facing===TOP){
            return rp(this.anchor.x-2,this.anchor.y+2,this.anchor.roomName);
        }
        if(this.facing===BOTTOM){
            return rp(this.anchor.x+2,this.anchor.y-2,this.anchor.roomName);
        }
        if(this.facing===LEFT){
            return rp(this.anchor.x+2,this.anchor.y+2,this.anchor.roomName);
        }
        if(this.facing===RIGHT){
            return rp(this.anchor.x-2,this.anchor.y-2,this.anchor.roomName);
        }
    }
    getLayoutPlan(facing){

        let plans = [];

        if(facing===TOP){
            plans = [
                // ---------- RCL 0 --------------------------------------------------
                //{type:STRUCTURE_CONTAINER,offset:{x:2,y:2},rcl:0,replacedAtRCL:2},
                //{type:STRUCTURE_CONTAINER,offset:{x:-2,y:2},rcl:0,replacedAtRCL:2},
                {type:STRUCTURE_CONTAINER,offset:{x:0,y:2},rcl:0,replacedAtRCL:4},
                // ---------- RCL 1 --------------------------------------------------
                //{type:STRUCTURE_SPAWN,offset:{x:0,y:0},rcl:1,name:this.name},
                // ---------- RCL 2 --------------------------------------------------
                // row -1 (top road)
                {type:STRUCTURE_ROAD,offset:{x:-2,y:-1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:0,y:-1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:1,y:-1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:2,y:-1},rcl:2},
                // row 0
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:0},rcl:2},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:0},rcl:2},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:0},rcl:2},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-3,y:0},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:3,y:0},rcl:2},
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-3,y:1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:3,y:1},rcl:2},
                // row 2
                {type:STRUCTURE_ROAD,offset:{x:-3,y:2},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:3,y:2},rcl:2},

                // ---------- RCL 3 --------------------------------------------------
                // row 1
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:1},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:1},rcl:3,replacedAtRCL:6},
                // row 2
                {type:STRUCTURE_CONTAINER,offset:{x:-2,y:2},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:2},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:2},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:2},rcl:3,replacedAtRCL:4},
                // row 3
                {type:STRUCTURE_TOWER,offset:{x:2,y:3},rcl:3},

                // ---------- RCL 4 --------------------------------------------------
                // row 0 - ramp core spawn
                {type:STRUCTURE_RAMPART,offset:{x:0,y:0},rcl:4},
                // row 2 - ramp storage spot
                {type:STRUCTURE_STORAGE,offset:{x:2,y:2},rcl:4,replace:STRUCTURE_EXTENSION,requireRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:2},rcl:4,replace:STRUCTURE_CONTAINER,requireStorage:true,replacedAtRCL:5},
                // row 3
                {type:STRUCTURE_ROAD,offset:{x:-3,y:3},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:3,y:3},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:3},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:3},rcl:4,requireStorage:true},
                // ramp tower
                {type:STRUCTURE_RAMPART,offset:{x:2,y:3},rcl:4},
                // row 4
                {type:STRUCTURE_ROAD,offset:{x:-3,y:4},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:3,y:4},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:-2,y:4},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:-1,y:4},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:4},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:4},rcl:4},
                // row 5
                {type:STRUCTURE_ROAD,offset:{x:-2,y:5},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:5},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:0,y:5},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:1,y:5},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:2,y:5},rcl:4},

                // ---------- RCL 5 --------------------------------------------------
                {type:STRUCTURE_LINK,offset:{x:0,y:2},rcl:5,replace:STRUCTURE_EXTENSION},
                // ---------- RCL 6 --------------------------------------------------
                // ---------- RCL 7 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:0,y:4},rcl:7,name:(this.name+'-2') }
            ];
            if(this.buildTerminal)
                plans.push({type:STRUCTURE_TERMINAL,offset:{x:2,y:1},rcl:6,replace:STRUCTURE_EXTENSION,requireRamp:true})

        }
        if(facing===LEFT){
            plans= [
                // ---------- RCL 0 --------------------------------------------------
                {type:STRUCTURE_CONTAINER,offset:{x:2,y:0},rcl:0,replacedAtRCL:4},
                // ---------- RCL 1 --------------------------------------------------
                //{type:STRUCTURE_SPAWN,offset:{x:0,y:0},rcl:1,name:this.name},

                // ---------- RCL 2 --------------------------------------------------
                // column -1 (top road)
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-2},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:-1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:0},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:1},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:-1,y:2},rcl:2},
                // column 0
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-2},rcl:2},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:-1},rcl:2},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:1},rcl:2},
                {type:STRUCTURE_EXTENSION,offset:{x:0,y:2},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:0,y:-3},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:0,y:3},rcl:2},
                // column 1
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:0},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:1,y:-3},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:1,y:3},rcl:2},
                // column 2
                {type:STRUCTURE_ROAD,offset:{x:2,y:-3},rcl:2},
                {type:STRUCTURE_ROAD,offset:{x:2,y:3},rcl:2},

                // ---------- RCL 3 --------------------------------------------------
                // column 1
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:-2},rcl:3,replacedAtRCL:6},
                {type:STRUCTURE_EXTENSION,offset:{x:1,y:2},rcl:3},
                // column 2
                {type:STRUCTURE_CONTAINER,offset:{x:2,y:2},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:1},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-1},rcl:3},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:-2},rcl:3,replacedAtRCL:4},
                // column 3
                {type:STRUCTURE_TOWER,offset:{x:3,y:-2},rcl:3},

                // ---------- RCL 4 --------------------------------------------------
                // column 0 - ramp core spawn
                {type:STRUCTURE_RAMPART,offset:{x:0,y:0},rcl:4},
                // column 2 - ramp storage spot
                {type:STRUCTURE_STORAGE,offset:{x:2,y:-2},rcl:4,replace:STRUCTURE_EXTENSION,requireRamp:true},
                {type:STRUCTURE_EXTENSION,offset:{x:2,y:0},rcl:4,replace:STRUCTURE_CONTAINER,requireStorage:true,replacedAtRCL:5},
                // column 3
                {type:STRUCTURE_ROAD,offset:{x:3,y:-3},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:3,y:3},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:3,y:0},rcl:4,requireStorage:true},
                {type:STRUCTURE_EXTENSION,offset:{x:3,y:2},rcl:4},
                // ramp tower
                {type:STRUCTURE_RAMPART,offset:{x:3,y:-2},rcl:4},
                // column 4
                {type:STRUCTURE_ROAD,offset:{x:4,y:-3},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:4,y:3},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:-2},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:-1},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:1},rcl:4},
                {type:STRUCTURE_EXTENSION,offset:{x:4,y:2},rcl:4},
                // column 5
                {type:STRUCTURE_ROAD,offset:{x:5,y:-2},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:5,y:-1},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:5,y:0},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:5,y:1},rcl:4},
                {type:STRUCTURE_ROAD,offset:{x:5,y:2},rcl:4},

                // ---------- RCL 5 --------------------------------------------------
                {type:STRUCTURE_LINK,offset:{x:2,y:0},rcl:5,replace:STRUCTURE_EXTENSION},
                // ---------- RCL 6 --------------------------------------------------
                // ---------- RCL 7 --------------------------------------------------
                {type:STRUCTURE_SPAWN,offset:{x:4,y:0},rcl:7,name:(this.name+'-2')},
            ];
            if(this.buildTerminal)
                plans.push({type:STRUCTURE_TERMINAL,offset:{x:1,y:-2},rcl:6,replace:STRUCTURE_EXTENSION,requireRamp:true})
        }

        if(this.name)
            plans.push({type:STRUCTURE_SPAWN,offset:{x:0,y:0},rcl:1,name:this.name});
        return plans;
    }
}
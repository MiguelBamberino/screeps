const AbstractComplex = require('class.complex.abstract')
const {STRUCTURE_RAMPART} = require("@screeps/common/lib/constants");

class WallSection extends AbstractComplex {
    constructor(anchor, facing, leftLength = 99, rightLength = 99, draft = false) {
        super(anchor, facing, 8, draft);
        this.leftLength = leftLength;
        this.rightLength = rightLength;
    }
    getLayoutPlan(facing) {

        let leftDir = this.getDirAtRelativeLeft(facing);
        let rightDir = this.getDirAtRelativeRight(facing);
        const terrain = new Room.Terrain(this.anchor.roomName);
        let plan = [];


        // path LEFT, finding all available wall positions
        let nextPos = this.anchor.getPosInDirection(leftDir);

        for(let leftTravel=0;leftTravel<this.leftLength;leftTravel++){
            if(nextPos && nextPos.isRoomEdge() || nextPos.nearRoomEdge() || terrain.get(nextPos.x,nextPos.y)===TERRAIN_MASK_WALL ){
                break; // we've reached the end of the wall.
            }
            plan.push({
                type:STRUCTURE_RAMPART,
                offset:{
                    x:(this.anchor.x-nextPos.x),
                    y:(this.anchor.x-nextPos.y),
                }
            })
            // iterate to the next spot
            nextPos = nextPos.getPosInDirection(leftDir);
        }
        return plan;
    }

    /**
     * Travel step by step in a direction to find positions to place a defence structure
     *
     * @param existingPlans - a complex build plan array to append to
     * @param startAt       - room pos to start traveling from
     * @param dir           - the direction to travel
     * @param travelDistance - how far to travel, planning walls/ramparts
     * @param terrain - room terrain object
     */
    travelInDirToPlanWalls(existingPlans,startAt,dir,travelDistance,terrain){
        let nextPos = startAt.getPosInDirection(dir);

        for(let travelCount=0;travelCount<travelDistance;travelCount++){
            if(nextPos && nextPos.isRoomEdge() || nextPos.nearRoomEdge() || terrain.get(nextPos.x,nextPos.y)===TERRAIN_MASK_WALL ){
                break; // we've reached a break. We cant place more walls.
            }
            existingPlans.push({
                type:STRUCTURE_RAMPART,
                rcl:3,
                offset:{
                    x:(startAt.x-nextPos.x),
                    y:(startAt.x-nextPos.y),
                }
            })
            // iterate to the next spot
            nextPos = nextPos.getPosInDirection(dir);
        }
    }

    /**
     * return a direction constant that is LEFT relative to the passed
     * Dir. For example, if the dir was RIGHT, then TOP is -90 and relatively LEFT
     * @param dir
     * @returns {*}
     */
    getDirAtRelativeLeft(dir){
        if(dir===LEFT)return BOTTOM;
        if(dir===TOP_LEFT)return BOTTOM_LEFT;
        if(dir===TOP)return LEFT;
        if(dir===TOP_RIGHT)return TOP_LEFT;
        if(dir===RIGHT)return TOP;
        if(dir===BOTTOM_RIGHT)return TOP_RIGHT;
        if(dir===BOTTOM)return RIGHT;
        if(dir===BOTTOM_LEFT)return BOTTOM_RIGHT;
    }
    /**
     * return a direction constant that is RIGHT relative to the passed
     * Dir. For example, if the dir was BOTTOM, then LEFT is 90 and relatively RIGHT
     * @param dir
     * @returns {*}
     */
    getDirAtRelativeRight(dir){
        if(dir===TOP)return RIGHT;
        if(dir===TOP_RIGHT)return BOTTOM_RIGHT;
        if(dir===RIGHT)return BOTTOM;
        if(dir===BOTTOM_RIGHT)return BOTTOM_LEFT;
        if(dir===BOTTOM)return LEFT;
        if(dir===BOTTOM_LEFT)return TOP_LEFT;
        if(dir===LEFT)return TOP;
        if(dir===TOP_LEFT)return TOP_RIGHT;
    }
}
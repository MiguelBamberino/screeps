var role = {

    create: function(spawn){
        return spawn.createCreep(this.getParts(spawn),this.getMemory(spawn));
    },
    getParts: function(spawn){
        return Creep.prototype.getDefaultParts(spawn);
    },
    getMemory: function(spawn){
        return {role: "recycle"};
    },
    /** @param {Creep} creep **/
    run: function(creep,config) {
        creep.suicide();return;
        //creep.moveToPos(Game.spawns[]);
        creep.say("Recycling");
       
	}
};

module.exports = role;
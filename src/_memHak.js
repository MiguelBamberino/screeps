
module.exports = {
    memory: false,
    parseTime: -1,
    register () {
        if(Game.rooms['sim'])return;
        
        const start = Game.cpu.getUsed()
        this.memory = Memory
        const end = Game.cpu.getUsed()
        this.cleanupDeadCreeps();
        this.parseTime = end - start
        this.memory = RawMemory._parsed
    },
    cleanupDeadCreeps(){
        for(let name in this.memory.creeps){
            if(!Game.creeps[name]){
                delete this.memory.creeps[name];
            }
        }
    },
    pretick () {
        if(Game.rooms['sim'])return;
        if (this.memory) {
            delete global.Memory
            global.Memory = this.memory
            RawMemory._parsed = this.memory
        }
    },
}



module.exports = {
    memory: false,
    parseTime: -1,
    register () {
        if(Game.rooms['sim'])return;
        const start = Game.cpu.getUsed()
        this.memory = Memory
        const end = Game.cpu.getUsed()
        this.parseTime = end - start
        this.memory = RawMemory._parsed
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


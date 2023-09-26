
module.exports = {
    fname:"bob",
    sname:"burger",
    testStatLog:function(){
        let start = Game.cpu.getUsed();
        const StatLog = require('class.statthing');
        let logA = new StatLog("test",['potential','mined','harvests','repairs','scoops'],3,3);
        logA.setValue('potential',300);
        logA.setValue('mined',267);
        logA.setValue('bob',100);
        logA.addToValue('bob',100);
        logA.setManyValues({tim:100,jerry:40})
        //logA.addToManyValues({tim:2,jerry:2,bob:3})
        logA.addToValue('harvests',1);
        logA.addToValue('repairs',1);
        logA.addToValue('scoops',1);
        //logA.runTick();
        debug(logA);
        
        
        
        //console.log(logA.getReportData());
       // console.log(  (JSON.stringify(Memory).length)/1024  )
        console.log( (Game.cpu.getUsed()-start) )
        
        //console.log(x.logLength)
        
    },
    mbChanges:function() {
        let st = Game.cpu.getUsed()
        rp(20,29,'W48N52').lookForStructure(STRUCTURE_ROAD)
        let used = Game.cpu.getUsed() - st;
        clog(used,'lookForStructure');
        
        st = Game.cpu.getUsed()
        Game.getObjectById('650d89557ae44cc6b6903e7b')
        used = Game.cpu.getUsed() - st;
        clog(used,'getObjectById');
    },
    parseCPU:function(){
       let st = Game.cpu.getUsed();
       JSON.stringify(Memory)
       let used = Game.cpu.getUsed() - st;
       clog(used,'stringfy Memory CPU');
        
    },
   
    removeFlags: function(roomName){
        const room = Game.rooms[roomName];
    
        // Remove all flags in the room
        for (const flag of room.find(FIND_FLAGS)) {
            flag.remove();
        }
    
    },
    placeFlags:function(roomName) {
        const room = Game.rooms[roomName];
    
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        let index = 0;
    
        for (const site of constructionSites) {
            let flagName = site.structureType.charAt(0) + index;
            let flagColor, flagSecondaryColor;
    
            switch (site.structureType) {

                default:
                    flagColor = COLOR_YELLOW;
            }
    
            switch (site.structureType) {
                case STRUCTURE_RAMPART:
                    flagColor = COLOR_GREEN;
                    flagSecondaryColor = COLOR_GREEN;
                    break;
                case STRUCTURE_ROAD:
                    flagColor = COLOR_GREY;
                    flagSecondaryColor = COLOR_GREY;
                    break;
                case STRUCTURE_WALL:
                    flagColor = COLOR_BROWN;
                    flagSecondaryColor = COLOR_BROWN;
                    break;
                case STRUCTURE_SPAWN:
                    flagColor = COLOR_YELLOW;
                    flagSecondaryColor = COLOR_PURPLE;
                    break;
                case STRUCTURE_CONTAINER:
                    flagColor = COLOR_YELLOW;
                    flagSecondaryColor = COLOR_BLUE;
                    break;
                case STRUCTURE_EXTENSION:
                    flagColor = COLOR_YELLOW;
                    flagSecondaryColor = COLOR_WHITE;
                    break;
                case STRUCTURE_TOWER:
                    flagColor = COLOR_YELLOW;
                    flagSecondaryColor = COLOR_RED;
                    break;
                case STRUCTURE_STORAGE:
                    flagColor = COLOR_YELLOW;
                    flagSecondaryColor = COLOR_CYAN;
                    break;
                default:
                    flagColor = COLOR_YELLOW;
                    flagSecondaryColor = COLOR_YELLOW;
            }
    
            site.pos.createFlag(flagName, flagColor, flagSecondaryColor);
            index++;
        }
    },

// Usage example:
// placeFlagsOnConstructionSites('W1N1');

    cleanCreepMem:function ()
    {
        // 37780 long if pure JSON, no obj key compression 
        // 24780 long if pure JSON, with obj key swaps
        let start = Game.cpu.getUsed();
        for(let name in Memory.creeps)
        {
            if(!Game.creeps[name]){
                delete Memory.creeps[name];
                clog(name,'deleted')
            }
        }
    },

 

    resetReservations:function(){
        Game.getObjectById('').resetReservations();
        for(let name in Game.creeps){
            Game.creeps[name].memory.reserve_id=false;
        }
    },
    

//##################################################################################################################
// job - queue planning
//################################################################################################################## 
    jobPlan1:function(who='bob'){
         
        Game.creeps[who].setJobPlan({
                I_HAVE_E:[
                        {action:'transfer',target:CLOSEST_SPAWN},
                        {action:'transfer',target:CLOSEST_EXT},
                        {action:'transfer',target:CLOSEST_TOWER},
                        {action:'upgradeController',target:CLOSEST}
                    ],
                MY_E_EMPTY:[
                        {action:'withdraw',target:CLOSEST},
                        {action:'harvest',target:CLOSEST}
                    ]
            });
    },
    task1: function(){
        
       // Game.creeps['H-1'].setTask( {action:'claimMine',target:{id:'5087ebf43ee47c22e551d6ea'},param2:'id34'} )
        Game.creeps['H-2'].addTask( {action:'claimMine',target:{pos:{x:34,y:21,roomName:'sim'}},param2:'id34'} )
        Game.creeps['H-2'].addTask( {action:'containerHarvest',target:{id:'5087ebf43ee47c22e551d6ea'},param2:'id34'} )
    },
    task2: function(){
        
        Game.creeps['bob3'].setTask( {action:'containerHarvest',target:{id:'5087ebf43ee47c22e551d6ea'},param2:'id34'} )
    },
    task3: function(){
        Game.creeps['H-1'].setTaskX('upgradeController',CLOSEST);
    },
   
};


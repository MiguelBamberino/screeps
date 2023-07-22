
module.exports = {
    fname:"bob",
    sname:"burger",
   
    compressor:require('_packRat'),
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
    runLinkSend:function(roomName) {
        const linksReadyToSend = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [roomName],
            filters: [
                {
                    attribute: 'readyToSend',
                    value: [],
                    operator: 'fn'
                }
            ]
        });
    
        for (const link of linksReadyToSend) {
            const recipient = link.getFirstReadyRecipient();
            if (recipient) {
                link.transferEnergy(recipient);
                break;
            }
        }
    },
    setLinksInRoom:function(roomName) {
        const room = Game.rooms[roomName];
        const links = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [roomName]
        });
    
        const structures = mb.getStructures({
            types: [STRUCTURE_STORAGE,STRUCTURE_SPAWN, STRUCTURE_TOWER],
            roomNames: [roomName]
        });
        const sources = mb.getSources({
            roomNames: [roomName]
        });
    
        const controller = room.controller;
        let receivers = [];
        let senders = [];
        let found=false;
        for (const link of links) {
            found=false;
            // Check if the link is within 2 of a source
            for (const source of sources) {
                if (link.pos.inRangeTo(source, 2)) {
                    link.setAsSender();
                    source.setLink(link);
                    senders.push(link);
                    clog(link.pos+'','set as Sender  - Source')
                    found=true;
                    break;
                }
            }
            
            if(!found)
            for (const structure of structures) {
                if (structure.structureType === STRUCTURE_STORAGE && link.pos.inRangeTo(structure, 2)) {
                    link.setAsReceiver();
                    link.setPriority(4);
                    structure.setLink(link);
                    receivers.push(link);
                    clog(link.pos+'','seGame.gett as Receiver - Priority-4 - Storage')
                    found=true;
                    break;
                } else if (structure.structureType === STRUCTURE_SPAWN && link.pos.inRangeTo(structure, 2)) {
                    link.setAsReceiver();
                    link.setPriority(1);
                    receivers.push(link);
                    clog(link.pos+'','seGame.gett as Receiver - Priority-1 - Filler')
                    found=true;
                    break;
                }else if (structure.structureType === STRUCTURE_TOWER && link.pos.inRangeTo(structure, 1)) {
                    link.setAsReceiver();
                    link.setPriority(3);
                    receivers.push(link);
                    clog(link.pos+'','set as Receiver - Priority-3 - Tower')
                    found=true;
                    break;
                }
            }

            if (!found && controller && link.pos.inRangeTo(controller.getContainer(), 1)) {
                link.setAsReceiver();
                link.setPriority(2);
                receivers.push(link);
                clog(link.pos+'','set as Receiver- Priority-2 - Controller')
            }
        }
        
        for(slink of senders){
            slink.clearRecipients();
            for(let rlink of receivers)slink.addRecipient(rlink.id);
        }
    },
    linkReport:function(roomName) {
        const links = mb.getStructures({
            types: [STRUCTURE_LINK],
            roomNames: [roomName]
        });
    
        for (const link of links) {
            let linkType = 'none';
            if (link.isReceiver()) {
                linkType = 'receiver';
            } else if (link.isSender()) {
                linkType = 'sender';
            }
            let recips = link.getMeta()['recipients'];
            console.log(`Link ID: ${link.id} ${link.pos} | Type: ${linkType} >> ${recips}`);
        }
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
// UNIT TESTS
//##################################################################################################################
    runPackerDetectTypeTests: function(){
        testObj = this.compressor;
        this.runTest(testObj,'detectType',[true],'boolean');
        this.runTest(testObj,'detectType',[false],'boolean');
        this.runTest(testObj,'detectType',[0],'int65');
        this.runTest(testObj,'detectType',[1],'int65');
        this.runTest(testObj,'detectType',[2],'int65');
        this.runTest(testObj,'detectType',[65534],'int65');
        this.runTest(testObj,'detectType',[65535],'int');
        this.runTest(testObj,'detectType',[-1],'int');

    },
    runTest: function(obj, func, values, expectedValue){
        let actualValue = obj[func](...values);
        if( actualValue===expectedValue){
            console.log("test "+func+"("+values+"): <strong style='color:green'>PASS</strong>");
        }else{
            console.log("test "+func+"("+values+"): <strong style='color:red'>FAIL!</strong> >> expected: "+expectedValue+" but got: "+actualValue);
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


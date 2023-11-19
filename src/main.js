global.BOT_VERSION='19.3';
global.BOT_ALLIES = ['NeonCamouflage'];
 
if(!Memory.VERSION){Memory.VERSION=BOT_VERSION;}
if(!Memory.creeps) { Memory.creeps = {}; }
   
   
require('global.logger');
logs.globalResetStarted();
 
let _memHak = require('_memHak');

let _config= require('_server_config');

require('_dev_utils');



require('global.objectMeta');
require('global.reservationBook');
require('global.mapBook');
require('global.logger');
require('global.GUI');

const traderClass = require('class.trader');
global.trader = new traderClass();
global.tests = require('globals.tests');

require('prototype.room');
require('prototype.room-position');

require('prototype.source');
require('prototype.structure.store');

require('prototype.spawn.main')();
require('prototype.creep');
require('prototype.creep.body');
require('prototype.creep.actions')();




 
let tempCode= require('tempCode');

_memHak.register();

global.RATE_VERY_FAST='very-fast';
global.RATE_FAST='fast';
global.RATE_SLOW='slow';
global.RATE_VERY_SLOW='very-slow';
global.RATE_SCALE_WITH_SURPLUS='scale-with-surplus';
global.RATE_OFF='off';
global.RUN_FOREVER=9999999;
//const RemoteRoom = require('class.remoteRoom');

util.setupNodes()

gui.init(nodes);
//nodes.push( new roomNode('Spawn1','sim',TOP) ); util.setupSim();
logs.globalResetComplete();


module.exports.loop = function () {
    _memHak.pretick();
    if(Memory.VERSION!==BOT_VERSION){console.log("UPGRADE NEEDED. NOT SAFE TO RUN CODE");util.recycle_all_creeps();return;}
    
    //util.findGoodSpawnSpot('W8N3')
    //util.renderFootPrint(rp(32,10,'W8N3')) // rp(25,25,'W8N3')
    
    if(util.allowTick()){
        
        logs.mainLoopStarted();
        
        
       // clog(ec.runTick(),'extractor');
        
        
        logs.startCPUTracker('rBook.runTick');
        reservationBook.runTick();
        logs.stopCPUTracker('rBook.runTick');
        for(let n in nodes){
            nodes[n].runTick();
        }
       
        logs.startCPUTracker('map.runTick');
        mb.runTick();
        logs.stopCPUTracker('map.runTick');
        
        if(Game.cpu.bucket>2000){
            logs.startCPUTracker('tempCode');
            tempCode.run();
            logs.stopCPUTracker('tempCode',false);
            logs.startCPUTracker('scheduledAttack');
            tempCode.scheduledAttack();
            logs.stopCPUTracker('scheduledAttack',false);
            
        }
        
        
        
        logs.mainLoopEnded();
        
        //////// GUI CODE  //////////////////////////////////
        
        gui.render();
        gui.renderComplexStats(nodes.i.extractorComplex)
        gui.renderComplexStats(nodes.z.extractorComplex)
        gui.renderComplexStats(nodes.k.extractorComplex)
        
        gui.renderComplexStats(nodes.m.extractorComplex)
        gui.renderComplexStats(nodes.i.labComplex)

        gui.renderComplexStats(nodes.z.extractorComplex)
        gui.renderComplexStats(nodes.k.extractorComplex)

        gui.renderComplexStats(nodes.m.extractorComplex)
        gui.renderComplexStats(nodes.i.labComplex)
        
        let senderRoom = 'W45N55';
        let receiverRoom = 'W45N54';
        let mainColour = '#ff0000';
        let altColour = '#770000';
        let opac = Game.time%2==0?0.5:0.5;
        
        for(let w = 50; w>=40; w--){
            for(let n = 60; n>=50; n--){
                let targetRoom = "W"+w+"N"+n;
               // if(targetRoom!=senderRoom)drawArrowFromRoomToRoom(senderRoom,targetRoom) // 0.0   
            }
        }
       // drawArrowFromRoomToRoom(senderRoom,receiverRoom,'#ff0000')
        
        let altRoomName = Game.time%2==0?senderRoom:receiverRoom;
        ///////////////////////
       
        //Game.map.visual.circle(rp(25,25,altRoomName),{radius:3,fill:altColour,stroke:mainColour,opacity:1})
        
        //Game.map.visual.text("X",rp(25,25,altRoomName),{fontSize:5,color:mainColour,stroke:mainColour})
        let tradeStats = [
                {resource_type:RESOURCE_ENERGY,demand_satisfied:false,importing:true,exporting:false},
                {resource_type:RESOURCE_KEANIUM,demand_satisfied:true,importing:false,exporting:true},
                {resource_type:RESOURCE_OXYGEN,demand_satisfied:true,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROGEN,demand_satisfied:false,importing:true,exporting:false},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_UTRIUM,demand_satisfied:true,importing:false,exporting:false},
                /*{resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},
                {resource_type:RESOURCE_HYDROXIDE,demand_satisfied:false,importing:false,exporting:true},*/
                
            ]
        drawRoomTradeStatsOnMap('W46N53',tradeStats)
        let tradeLogs = [{sourceRoom:'W48N54',targetRoom:'W46N53',resource_type:RESOURCE_ENERGY,sentAt:52468960}];
        drawTradeLogs(tradeLogs)


    }
    
}
function drawRoomTradeStatsOnMap(roomName,tradeStats){
  //  logs.startCPUTracker('drawRoom');
    let anchorSpots =[rp(10,25,roomName),rp(14,19,roomName)];
    
    let centrePos = rp(25,25,roomName)
    
    
    Game.map.visual.circle(rp(25,25,roomName),{radius:15,fill:'#222222',opacity:0.5})
    
    for(let i in tradeStats){
        let offset = i>=10?20:0;
        let radius = i>=10?19:13;
        let pos = centrePos.getPosAtDistanceAndAngle( radius, (i*36)+offset )
        drawResourceTradeStatAtMapPos(pos,tradeStats[i])
    }
    //logs.stopCPUTracker('drawRoom',true);
    
}
 
function drawResourceTradeStatAtMapPos(pos,stat){
    let opac = stat.demand_satisfied && !stat.importing && !stat.exporting ? 0.5:1;
    drawResourceIconAtMapPos(pos,stat.resource_type,opac);
    if(stat.importing){
        let i = '⬇︎';
        Game.map.visual.text(i,rp(pos.x+5,pos.y-3,pos.roomName),{fontSize:6, fontStyle:'normal', fontFamily:'Arial' ,color:'#00ff00',stroke:'#000000',strokeWidth:0.4,align:'right'})
    }
    if(stat.exporting){
        let i = '⬆︎︎';
        Game.map.visual.text(i,rp(pos.x+5,pos.y-3,pos.roomName),{fontSize:6, fontStyle:'normal', fontFamily:'Arial' ,color:'#ff0000',stroke:'#000000',strokeWidth:0.4,align:'right'})
    }
}
function drawResourceIconAtMapPos(pos,resource_type,opacity=1,radius=4){
    let style = lookupResourceIconStyle(resource_type)
    let lineStyle = style.lineStyle?style.lineStyle:'solid';
    let lineColour = style.lineColour?style.lineColour:style.txtColour;
    Game.map.visual.circle(pos,{radius:radius,fill:style.bgColour,strokeWidth:0.6,stroke:lineColour,lineStyle:lineStyle,opacity:opacity})
    
    Game.map.visual.text(style.text,pos,{fontSize:4, fontStyle:'normal', fontFamily:'Arial' ,color:style.txtColour,strokeWidth:0.1,stroke:style.txtColour, opacity:opacity})

}
function lookupResourceIconStyle(resource_type){
    switch(resource_type){
        case RESOURCE_ENERGY: return {bgColour:'#686e12',txtColour:'#dbe640',text:'E'};
        

        case RESOURCE_CATALYST: return {bgColour:'#592121',txtColour:'#ff7b7b',text:RESOURCE_CATALYST};
        case RESOURCE_HYDROGEN: return {bgColour:'#4c4c4c',txtColour:'#cccccc',text:RESOURCE_HYDROGEN};
        case RESOURCE_OXYGEN: return {bgColour:'#4c4c4c',txtColour:'#cccccc',text:RESOURCE_OXYGEN};
        case RESOURCE_HYDROXIDE: return {bgColour:'#cccccc',txtColour:'#4c4c4c',text:RESOURCE_HYDROXIDE};
        
        
        case RESOURCE_GHODIUM: return {bgColour:'#fefefe',txtColour:'#aaaaaa',text:RESOURCE_GHODIUM};
        
        // RESOURCE_UTRIUM >>
        case RESOURCE_UTRIUM: return {bgColour:'#006181',txtColour:'#50d7f9',text:RESOURCE_UTRIUM};
        case RESOURCE_UTRIUM_LEMERGITE: return {bgColour:'#006181',txtColour:'#05eb9c',text:RESOURCE_UTRIUM_LEMERGITE};
        case RESOURCE_UTRIUM_HYDRIDE: return {bgColour:'#50d7f9',txtColour:'#006181',text:'UH',lineStyle:'solid',lineColour:'#006181'};
        case RESOURCE_UTRIUM_ACID: return {bgColour:'#50d7f9',txtColour:'#006181',text:'Uh²',lineStyle:'solid',lineColour:'#50d7f9'};
        case RESOURCE_CATALYZED_UTRIUM_ACID: return {bgColour:'#50d7f9',txtColour:'#006181',text:'Uh²',lineStyle:'dashed',lineColour:'#ff0000'};
        case RESOURCE_UTRIUM_OXIDE: return {bgColour:'#50d7f9',txtColour:'#006181',text:'UO',lineStyle:'solid',lineColour:'#006181'};
        case RESOURCE_UTRIUM_ALKALIDE: return {bgColour:'#50d7f9',txtColour:'#006181',text:'Uo²',lineStyle:'solid',lineColour:'#50d7f9'};
        case RESOURCE_CATALYZED_UTRIUM_ALKALIDE: return {bgColour:'#50d7f9',txtColour:'#006181',text:'Uo²',lineStyle:'dashed',lineColour:'#ff0000'};

        // RESOURCE_ZYNTHIUM >>
        case RESOURCE_ZYNTHIUM: return {bgColour:'#5d4c2e',txtColour:'#fdd388',text:RESOURCE_ZYNTHIUM};
        case RESOURCE_ZYNTHIUM_KEANITE: return {bgColour:'#371383',txtColour:'#fdd388',text:RESOURCE_ZYNTHIUM_KEANITE};
         // RESOURCE_ZYNTHIUM based compounds >>
        case RESOURCE_ZYNTHIUM_HYDRIDE: return { bgColour: '#fdd388', txtColour: '#5d4c2e', text: 'ZH' };
        case RESOURCE_ZYNTHIUM_OXIDE: return { bgColour: '#fdd388', txtColour: '#5d4c2e', text: 'ZO' };
        case RESOURCE_ZYNTHIUM_ACID: return { bgColour: '#fdd388', txtColour: '#5d4c2e', text: 'ZH²', lineColour:'#fdd388'};
        case RESOURCE_ZYNTHIUM_ALKALIDE: return { bgColour: '#fdd388', txtColour: '#5d4c2e', text: 'ZO²', lineColour:'#fdd388'};
        case RESOURCE_CATALYZED_ZYNTHIUM_ACID: return { bgColour: '#fdd388', txtColour: '#5d4c2e', text: 'ZH²',lineStyle:'dashed',lineColour:'#ff0000' };
        case RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE: return { bgColour: '#fdd388', txtColour: '#5d4c2e', text: 'ZO²',lineStyle:'dashed',lineColour:'#ff0000' };
        
         // RESOURCE_LEMERGIUM >>
         case RESOURCE_LEMERGIUM: return {bgColour:'#236144',txtColour:'#05eb9c',text:RESOURCE_LEMERGIUM};
        // RESOURCE_LEMERGIUM based compounds >>
        case RESOURCE_LEMERGIUM_HYDRIDE: return { bgColour: '#05eb9c', txtColour: '#236144', text: 'LH', lineStyle: 'solid', lineColour: '#236144' };
        case RESOURCE_LEMERGIUM_OXIDE: return { bgColour: '#05eb9c', txtColour: '#236144', text: 'LO', lineStyle: 'solid', lineColour: '#236144' };
        case RESOURCE_LEMERGIUM_ACID: return { bgColour: '#05eb9c', txtColour: '#236144', text: 'LH₂', lineStyle: 'solid', lineColour: '#05eb9c' };
        case RESOURCE_LEMERGIUM_ALKALIDE: return { bgColour: '#05eb9c', txtColour: '#236144', text: 'LO₂', lineStyle: 'solid', lineColour: '#05eb9c' };
        case RESOURCE_CATALYZED_LEMERGIUM_ACID: return { bgColour: '#05eb9c', txtColour: '#236144', text: 'LH₂', lineStyle: 'dashed', lineColour: '#ff0000' };
        case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE: return { bgColour: '#05eb9c', txtColour: '#236144', text: 'LO₂', lineStyle: 'dashed', lineColour: '#ff0000' };
        
        // RESOURCE_KEANIUM >>
        case RESOURCE_KEANIUM: return { bgColour: '#371383', txtColour: '#9e70fc', text: RESOURCE_KEANIUM };
                // RESOURCE_KEANIUM based compounds >>
        case RESOURCE_KEANIUM_HYDRIDE: return { bgColour: '#9e70fc', txtColour: '#371383', text: 'KH', lineStyle: 'solid', lineColour: '#371383' };
        case RESOURCE_KEANIUM_OXIDE: return { bgColour: '#9e70fc', txtColour: '#371383', text: 'KO', lineStyle: 'solid', lineColour: '#371383' };
        case RESOURCE_KEANIUM_ACID: return { bgColour: '#9e70fc', txtColour: '#371383', text: 'KH₂', lineStyle: 'solid', lineColour: '#9e70fc' };
        case RESOURCE_KEANIUM_ALKALIDE: return { bgColour: '#9e70fc', txtColour: '#371383', text: 'KO₂', lineStyle: 'solid', lineColour: '#9e70fc' };
        case RESOURCE_CATALYZED_KEANIUM_ACID: return { bgColour: '#9e70fc', txtColour: '#371383', text: 'KH₂', lineStyle: 'dashed', lineColour: '#ff0000' };
        case RESOURCE_CATALYZED_KEANIUM_ALKALIDE: return { bgColour: '#9e70fc', txtColour: '#371383', text: 'KO₂', lineStyle: 'dashed', lineColour: '#ff0000' };

        
        
    }
}
function drawTradeLogs(logs){
    for(let log of logs){
        if( (Game.time-log.sentAt)<10 )
            drawTransferLog(log)
    }
}
function drawTransferLog(log){
    
    let ticksSinceSend = Game.time - log.sentAt;
    // 
    // drawn Terminal CD
    Game.map.visual.circle(rp(25,25,log.sourceRoom),{radius:15,fill:'#222222',opacity:0.8})
    Game.map.visual.text(TERMINAL_COOLDOWN-ticksSinceSend,rp(25,25,log.sourceRoom),{fontSize:10, fontFamily:'Arial' ,color:'#ff0000'})
    
    // get the exact angle to 0 DP between rooms
    let ang = getAngleBetweenRooms(log.sourceRoom,log.targetRoom).toFixed(0)
    // convert angle to nearest multiple of 5
    let angle = (ang/5).toFixed()*5;
    let style = lookupResourceIconStyle(log.resource_type)
 
    drawArrowFromRoomToRoom(log.sourceRoom,log.targetRoom,style.txtColour,angle)
    
    let startPos = rp(25,25,log.sourceRoom);
    let endPos = rp(25,25,log.targetRoom);
    resourcePos = endPos;
    
    if(ticksSinceSend==0){
        resourcePos = startPos;
    }else if(ticksSinceSend==1){
        resourcePos = startPos.getPosAtDistanceAndAngle( 25, angle );
    }else if(ticksSinceSend==2){
        resourcePos = endPos.getPosAtDistanceAndAngle( 25, invertAngle(angle) );
    }
    if(ticksSinceSend<5)
        drawResourceIconAtMapPos(resourcePos,log.resource_type);
}

function drawArrowFromRoomToRoom(sourceRoom,targetRoom,colour,angle=false){

    let opac = Game.time%2==0?0.7:0.6;
    
    if(angle===false){
        let ang = getAngleBetweenRooms(sourceRoom,targetRoom).toFixed(0)
        angle = (ang/5).toFixed()*5;
    }
    Game.map.visual.line(rp(25,25,sourceRoom), rp(25,25,targetRoom).getPosAtDistanceAndAngle( 3, invertAngle(angle) ) ,{color:colour,width:2,opacity:opac})
    Game.map.visual.poly(calculateTriangle(rp(25,25,targetRoom),angle),{fill:colour,opacity:opac,stroke:colour})
    
}
function invertAngle(angle){
    return (angle>=180)?(angle-180):(angle+180)
}


function getWorldCoords(name) {
        const match = name.match(/^([WE])(\d+)([NS])(\d+)$/);
        if (!match) return null;

        let coords = {
            x: (match[1] === 'W' ? -1 : 1) * parseInt(match[2], 10),
            y: (match[3] === 'N' ? 1 : -1) * parseInt(match[4], 10),
           
        };
        coords[  match[1] ] = parseInt(match[2], 10);
        coords[  match[3] ] = parseInt(match[4], 10);
        return coords;
    };
global.getAngleBetweenRooms = function (fromRoom, toRoom) {
    const from = getWorldCoords(fromRoom);
    const to = getWorldCoords(toRoom);

    if (!from || !to) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    // Use arctangent to get the angle in radians
    const angleRadians = Math.atan2(dx, dy );

    // Convert the angle from radians to degrees
    let angleDegrees = angleRadians * (180 / Math.PI);
   
    // adjust west facing angles, because they'll be -x in relation to 0 / north
    if (angleDegrees < 0) angleDegrees += 360;
    return angleDegrees;
}

function calculateTriangle(apex, angle, length = 7, width = 8) {
    // Adjust the angle for game's coordinate system and convert to radians
    const adjustedAngle = (angle - 90 + 360) % 360;
    const rad = (adjustedAngle * Math.PI) / 180;

    // The base points will be the end points of the triangle, which can be computed by subtracting the given length from the apex
    const baseCenter = new RoomPosition(
        Math.round(apex.x - length * Math.cos(rad)),
        Math.round(apex.y - length * Math.sin(rad)),
        apex.roomName
    );

    // Calculate the two base points of the triangle by displacing the base center point by half the width in a direction perpendicular to the angle
    const base1 = new RoomPosition(
        Math.round(baseCenter.x + (width / 2) * Math.sin(rad)),
        Math.round(baseCenter.y - (width / 2) * Math.cos(rad)),
        apex.roomName
    );

    const base2 = new RoomPosition(
        Math.round(baseCenter.x - (width / 2) * Math.sin(rad)),
        Math.round(baseCenter.y + (width / 2) * Math.cos(rad)),
        apex.roomName
    );
   // clog(apex.isWalkable())
    return [apex, base1, base2];
}
function getPositionByDistanceAndAngle(position, distance, angle) {
    // Adjust the angle for the game's coordinate system
    const adjustedAngle = (angle - 90 + 360) % 360;
    const rad = (adjustedAngle * Math.PI) / 180;

    // Calculate the new x and y coordinates
    const newX = Math.round(position.x + distance * Math.cos(rad));
    const newY = Math.round(position.y + distance * Math.sin(rad));

    return new RoomPosition(newX, newY, position.roomName);
}





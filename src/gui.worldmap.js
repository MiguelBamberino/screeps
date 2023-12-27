//////////// Public functions /////////////////////////////////////////////////////


/**
 * Render a map animation of and arrow, with details of a transfer betwee  2 rooms
 * @param Object log - {sourceRoom:'W48N54',targetRoom:'W46N53',resource_type:RESOURCE_ENERGY,sentAt:52468960}
 */ 
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
/**
 * Render the array of trade stats for a given room. Stats are renders a resource circles around the
 * room Player logo on the world map. Resources are rendered in a concentric circle around the player logo.
 * @param string roomName 
 * @param Array tradeStats [...Object] 
 * tradeStat Object = {resource_type:RESOURCE_OXYGEN,demand_satisfied:true,importing:false,exporting:true}
 */ 
function drawRoomTraderStatsOnMap(roomName,tradeStats){
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
 
/**
 * Render a styled circle for a given game resource at the given room position
 * @param RoomPosition 
 * @param cons RESOURCE_*
 * @param *Number opacity
 * @param Number radius
 */
function drawResourceIconAtMapPos(pos,resource_type,opacity=1,radius=4){
    let style = lookupResourceIconStyle(resource_type)
    let lineStyle = style.lineStyle?style.lineStyle:'solid';
    let lineColour = style.lineColour?style.lineColour:style.txtColour;
    Game.map.visual.circle(pos,{radius:radius,fill:style.bgColour,strokeWidth:0.6,stroke:lineColour,lineStyle:lineStyle,opacity:opacity})
    
    Game.map.visual.text(style.text,pos,{fontSize:4, fontStyle:'normal', fontFamily:'Arial' ,color:style.txtColour,strokeWidth:0.1,stroke:style.txtColour, opacity:opacity})

}


module.exports ={drawTransferLog,drawResourceIconAtMapPos,drawRoomTraderStatsOnMap}

//////////// Private functions /////////////////////////////////////////////////////
/**
 * Render a styled circle for a given resource, at a given world position. 
 * The stat object contains the current trade state for this resource, which will reflect in the styling
 * @param RoomPosition pos
 * @param Object stat >> {resource_type:RESOURCE_OXYGEN,demand_satisfied:true,importing:false,exporting:true}
 */ 
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

/**
 * given a game resource constant, it will return back a style object.
 * @param const RESOURCE_*  
 * @return  bgColour:'#50d7f9',txtColour:'#006181',text:'UH',lineStyle:'solid',lineColour:'#006181'};
 */
function lookupResourceIconStyle(resource_type){
    switch(resource_type){
        case RESOURCE_ENERGY: return {bgColour:'#686e12',txtColour:'#dbe640',text:'E'};
        case RESOURCE_BATTERY: return {bgColour:'#dbe640',txtColour:'#686e12',text:'B'};

        case RESOURCE_CATALYST: return {bgColour:'#592121',txtColour:'#ff7b7b',text:RESOURCE_CATALYST};
        case RESOURCE_HYDROGEN: return {bgColour:'#4c4c4c',txtColour:'#cccccc',text:RESOURCE_HYDROGEN};
        case RESOURCE_OXYGEN: return {bgColour:'#4c4c4c',txtColour:'#cccccc',text:RESOURCE_OXYGEN};
        case RESOURCE_HYDROXIDE: return {bgColour:'#cccccc',txtColour:'#4c4c4c',text:RESOURCE_HYDROXIDE};
        
        
        case RESOURCE_GHODIUM: return {bgColour:'#fefefe',txtColour:'#aaaaaa',text:RESOURCE_GHODIUM};
        case RESOURCE_GHODIUM_OXIDE: return {bgColour:'#fefefe',txtColour:'#aaaaaa',text:RESOURCE_GHODIUM_OXIDE};
        case RESOURCE_GHODIUM_HYDRIDE: return {bgColour:'#fefefe',txtColour:'#aaaaaa',text:RESOURCE_GHODIUM_HYDRIDE};
        
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

        default :  return {bgColour:'#686e12',txtColour:'#dbe640',text:'?'};
        
    }
}

/**
 * 
 * @param String sourceRoom
 * @param String targetRoom
 * @param String colour - either hex colour / english colour word
 * @param Number|false angle - if set the angle at which the rooms are to each other. 
 *                              if ommited, it will be calculated. Used to set arrow head.
 */ 
function drawArrowFromRoomToRoom(sourceRoom,targetRoom,colour,angle=false){

    let opac = Game.time%2==0?0.7:0.6;
    
    if(angle===false){
        let ang = getAngleBetweenRooms(sourceRoom,targetRoom).toFixed(0)
        angle = (ang/5).toFixed()*5;
    }
    Game.map.visual.line(rp(25,25,sourceRoom), rp(25,25,targetRoom).getPosAtDistanceAndAngle( 3, invertAngle(angle) ) ,{color:colour,width:2,opacity:opac})
    Game.map.visual.poly(calculateTriangle(rp(25,25,targetRoom),angle),{fill:colour,opacity:opac,stroke:colour})
    
}
/**
 * @param Number angle
 * @return the angle exactly 180 degrees opposite
 */ 
function invertAngle(angle){
    return (angle>=180)?(angle-180):(angle+180)
}

/**
 * Given a room name, it will convert the NWSE coords into
 * X,Y cords.
 * @param String - name
 * @return Object {x:N,y:N}
 */ 
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
/**
 * Calculate the angle on the world map between the 2 rooms.
 * @param String fromRoom 
 * @param String toRoom
 * @return Number - return a number in degrees
 */ 
function getAngleBetweenRooms(fromRoom, toRoom) {
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
/**
 * Calculate an array of 3 points that make an Isosceles Triangle.
 * Given the passed apex, it will calculate the 2 base positions and return all 3 points as an array.
 * 
 * @param RoomPosition apex - the position where the triangle point should be
 * @param Number angle - which way to face the triangle
 * @param Number length=7 - how tall/long the triangle should be
 * @param Number width=8 - How wide the base should be. How far apart the base points should be
 * @return [apex <RoomPosition>, base1 <RoomPosition>, base2 <RoomPosition>]
 */
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

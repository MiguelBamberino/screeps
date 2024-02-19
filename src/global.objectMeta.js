
const MemoryCollection = require('class.memory-collection');
global.objectMeta = new MemoryCollection('objectMeta');
global.checkDeletedObjects=function(){
    let objects = objectMeta.all();
    let missingCount = 0;
    let start= Game.cpu.getUsed();
    for(let id in objects){
        let gameObj = Game.getObjectById(id);

        // if dont know the room name but can see the object, then patch in the value. this is more for patching existing servers
        // not needed on any server that starts fresh with v20.1
        if(!objects[id].roomName && gameObj){
            console.log("objectMeta:Correcting roomName >> ",gameObj.id,gameObj.pos);
            objects[id].roomName = gameObj.pos.roomName;
            objectMeta.edit(id,objects[id]);
        }
        // if the object no longer exists and we can see the room. then remove the memory
        if(!gameObj && Game.rooms[ objects[id].roomName ]){
           objectMeta.delete(id)
            missingCount++;
        }
    }
    clog("CPU:"+(Game.cpu.getUsed()-start),'ObjectMeta Cleanup. Records deleted '+missingCount)
}
checkDeletedObjects()
//#######################################################
// RoomObject Object Metas
//#######################################################
 
RoomObject.prototype.getMeta=function(){
    let meta = objectMeta.get(this.id);
   // clog(meta,'meta')
    if(!meta){
        return {};
    }
    return meta;
} 
RoomObject.prototype.setMeta=function(data){
    let meta = objectMeta.get(this.id);
    data.roomName = this.pos.roomName; // used in deletion detection
    if(meta){
        return objectMeta.edit(this.id,data);
    }else{
        return objectMeta.add(this.id,data);
    }
}
RoomObject.prototype.setMetaAttr=function(name,value){
    let meta = this.getMeta();
    // only trigger update if we're making a change
    if(meta[name]===undefined || meta[name]!==value || typeof meta[name] ==='object'){
        meta[name] = value;
        return this.setMeta(meta);
    }
    return false;
}


/*let extraFunctions={
    getMeta:function(){
        let meta = objectMeta.get(this.id);
       // clog(meta,'meta')
        if(!meta){
            return {};
        }
        return meta;
    },
    bob:function(name){clog(name,'bob1')},
    bob2:function(name){clog(this.id,'bob2')}
}
for(let funcName in extraFunctions){
    RoomObject.prototype[funcName] = extraFunctions[funcName]
}*/
//#######################################################
// RoomObject SK Metas
//#######################################################
// get the SKeeper lair associated with this source/mineral
RoomObject.prototype.getLair=function(){
    
    let meta = this.getMeta();
    if(meta.lair_id)return Game.getObjectById(meta.lair_id);
    
}
// set the SKeeper lair associated with this source/mineral
RoomObject.prototype.setLair=function(obj){
    return this.setMetaAttr('lair_id',obj.id);
}
//#######################################################
// RoomObject isActive Metas
//#######################################################
RoomObject.prototype.isActive=function(){
    let meta = this.getMeta();
    return (meta.isActive)?true:false;
}
RoomObject.prototype.setActive=function(val=true){
    return this.setMetaAttr('isActive',val);
}
//#######################################################
// RoomObject Container/Link Metas
//#######################################################
// get the object with store, that is the storage buffer, for activity on/at this object
RoomObject.prototype.getContainer=function(){
    
    let meta = this.getMeta();
    if(meta.container_id)return Game.getObjectById(meta.container_id);
    
}
// Set a object with store, to act as a storage buffer, for activity on/at this object
RoomObject.prototype.setContainer=function(obj){
    return this.setMetaAttr('container_id',obj.id);
}
// Check if this RoomObject has an associated Container object
RoomObject.prototype.haveContainer=function(){ return this.getContainer()?true:false }

// Set a Link object to act as a storage buffer, for activity on/at this object
RoomObject.prototype.setLink = function (obj) {
    
    return this.setMetaAttr('link_id', obj.id);
};

// Get the Link object associated with this RoomObject
RoomObject.prototype.getLink = function () {
    let meta = this.getMeta();
    if (meta.link_id) return Game.getObjectById(meta.link_id);
};

// Check if this RoomObject has an associated Link object
RoomObject.prototype.haveLink = function () {
    return this.getLink() ? true : false;
};
//#######################################################
// RoomObject Assigned Creep Metas
//#######################################################

RoomObject.prototype.getStandingSpot=function(){
    
    let meta = this.getMeta();
    if(meta.standing_pos)return new RoomPosition(meta.standing_pos.x,meta.standing_pos.y,meta.standing_pos.roomName);
    return undefined;
}

RoomObject.prototype.setStandingSpot=function(pos){
    return this.setMetaAttr('standing_pos',pos);
}
RoomObject.prototype.reserveStandingSpot=function(creep,ignoreMainSpot=false){
    let meta = this.getMeta();
    let mainPos = this.getStandingSpot();
    if(meta.standing_spots){
        for(let i in meta.standing_spots){

            let spot = meta.standing_spots[i];

            if(creep.id === spot.creep_id || !gob(spot.creep_id)){
             
                let pos =  new RoomPosition(spot.pos.x,spot.pos.y,spot.pos.roomName);
                if(ignoreMainSpot && pos.isEqualTo(mainPos)){
                    continue;
                }
                
                meta.standing_spots[i].creep_id = creep.id;
                this.setMetaAttr('standing_spots',meta.standing_spots);
                return pos;
            }
        }
    }
    return false;
}
RoomObject.prototype.haveFreeStandingSpot=function(){
    let meta = this.getMeta();
    if(meta.standing_spots){
        for(let i in meta.standing_spots){

            let spot = meta.standing_spots[i];
            if(!gob(spot.creep_id)){
                //let pos =  new RoomPosition(spot.pos.x,spot.pos.y,spot.pos.roomName);
                return true;
            }
        }
    }
    return false;
}
RoomObject.prototype.getStandingSpots=function(){

    let meta = this.getMeta();
    if(meta.standing_spots){
        let spots = [];
        for(let spot of meta.standing_spots){
            spots.push( new RoomPosition(spot.pos.x,spot.pos.y,spot.pos.roomName) )
        }
        return spots;

    }
    return [];
}
RoomObject.prototype.setStandingSpots=function(posList){
    let spots = [];
    let meta = this.getMeta();
    meta.standing_spots = [];
    for(let pos of posList)spots.push({creep_id:'',pos:pos})
    return this.setMetaAttr('standing_spots',spots);
}
RoomObject.prototype.getCreep = function() {
    let meta = this.getMeta();
    if (meta.creep_id) return Game.getObjectById(meta.creep_id);
};

RoomObject.prototype.haveCreep = function() {
    return this.getCreep() ? true : false;
};
RoomObject.prototype.haveNoCreep = function() {
    return this.getCreep() ? false : true;
};
// Set a creep to act as a harvester or worker for this Source object
RoomObject.prototype.setCreep = function(creep) {
    return this.setMetaAttr('creep_id', creep.id);
};

//#######################################################
// Structure Derrived Typing Metas
//#######################################################
/**
 * Does this object have a sub structure type and does it match val
 * @param string val
 */ 
Structure.prototype.isSubType=function(value){
    let meta = this.getMeta();
    return (meta.subType!==undefined && meta.subType===value)?true:false;
}
// set the value for this structures sub type
Structure.prototype.setSubType=function(val){
    return this.setMetaAttr('subType',val);
}
// set this structures sub type for use for fast filling?
Structure.prototype.setAsFillerStore=function(){
    return this.setMetaAttr('subType','f');
}
// set this structures sub type for use for upgrader storage buffer?
Structure.prototype.setAsUpgraderStore=function(){
    return this.setMetaAttr('subType','u');
}
// set this structures sub type for use for storing harvest output
Structure.prototype.setAsMineStore=function(){
    return this.setMetaAttr('subType','m');
}
// is the store of this structure used for fast filling?
Structure.prototype.isFillerStore=function(){
    return this.isSubType('f');
}
// is the store of this structure used for upgrader storage buffer?
Structure.prototype.isUpgraderStore=function(){
    return this.isSubType('u');
}
// is the store of this structure used for storing harvest output
Structure.prototype.isMineStore=function(){
    return this.isSubType('m');
}

//#######################################################
// Link Structure Typing Metas
//#######################################################
//  isSender > is this link configured to send energy
StructureLink.prototype.isSender = function () {
    const meta = this.getMeta();
    return meta.subType === 'S';
};

//  isReceiver  > is this link configured to receive energy
StructureLink.prototype.isReceiver = function () {
    const meta = this.getMeta();
    return meta.subType === 'R';
}; 

//  setAsSender method to the Link prototype
StructureLink.prototype.setAsSender = function () {
    this.setMetaAttr('subType', 'S');
};

//  setAsReceiver method to the Link prototype
StructureLink.prototype.setAsReceiver = function () {
    this.setMetaAttr('subType', 'R');
};
// Getter for priority
StructureLink.prototype.getPriority = function () {
    const meta = this.getMeta();
    return meta.priority !== undefined ? meta.priority : 0;
};

// Setter for priority
StructureLink.prototype.setPriority = function (priority) {
    return this.setMetaAttr('priority', priority);
};

StructureLink.prototype.clearRecipients = function () {
     return this.setMetaAttr('recipients', []);
}

//  addRecipient > add link as a known receiver for this link and sort by distance
StructureLink.prototype.addRecipient = function (linkID) {
    const meta = this.getMeta();
    if (meta.recipients === undefined) {
        meta.recipients = [];
    }

    // Check for duplicate link IDs before adding
    if (!meta.recipients.includes(linkID)) {
        meta.recipients.push(linkID);
    }
    //clog(meta.recipients)
    // Sort recipients by priority and then by distance if priorities are the same
    meta.recipients.sort((id1, id2) => {
        const link1 = Game.getObjectById(id1);
        const link2 = Game.getObjectById(id2);
        const priorityDiff = link1.getPriority() - link2.getPriority();

        // If priorities are the same, sort by distance
        return priorityDiff !== 0 ? priorityDiff : this.pos.getRangeTo(link1) - this.pos.getRangeTo(link2);
    });
    //clog(meta.recipients)
    this.setMetaAttr('recipients', meta.recipients);
};

StructureLink.prototype.getFirstReadyRecipient = function () {
    const meta = this.getMeta();
    const recipients = meta.recipients;

    if (!recipients) {
        return null;
    }

    for (const recipientID of recipients) {
        const recipientLink = Game.getObjectById(recipientID);

        if (recipientLink && recipientLink.readyToReceive()) {
            return recipientLink;
        }
    }

    return null;
}

StructureLink.prototype.readyToSend = function () {
    // A link is ready to send if it is marked as a sender, is full of energy, and has no cooldown.
    return this.isSender() && this.isFull(RESOURCE_ENERGY) && this.cooldown === 0;
}

StructureLink.prototype.readyToReceive = function () {
    // A link is ready to receive if it is marked as a receiver and is empty of energy.
    return this.isReceiver() && this.isEmpty(RESOURCE_ENERGY);
}

//#######################################################
// Structure Dismantling Metas
//#######################################################
Structure.prototype.isNotMarkedForDismantle=function(val){
    let meta = this.getMeta();
    return (!meta.markedForDismantle)?true:false;
}
Structure.prototype.isMarkedForDismantle=function(val){
    let meta = this.getMeta();
    return (meta.markedForDismantle)?true:false;
}
Structure.prototype.markForDismantling=function(){
    return this.setMetaAttr('markedForDismantle',true);
}

//

StructureController.prototype.setControllerStandingSpots=function(anchor,renew=false){

    if(!renew && this.getStandingSpot())return;

    let best = this.pos.findBestStandingSpots(anchor,3,9);

    let sorted = [];
    let lpp = best.path[(best.path.length-2)];
    let entryPos = rp(lpp.x,lpp.y,best.containerSpot.roomName);
    for(let pos of best.standingSpots){
        if(pos.isEqualTo(best.containerSpot))
            sorted[0]=pos;
        else
            sorted[ best.containerSpot.getDirectionTo(pos) ] = pos;
    }
    let chainLookup = {};
    chainLookup[TOP]=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,0];
    chainLookup[TOP_RIGHT]=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,0];
    chainLookup[RIGHT]=[TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,0];

    chainLookup[BOTTOM_RIGHT]=[BOTTOM_RIGHT,RIGHT,TOP_RIGHT,TOP,TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,0];
    chainLookup[BOTTOM]=[BOTTOM_RIGHT,RIGHT,TOP_RIGHT,TOP,TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,0];

    chainLookup[BOTTOM_LEFT]=[BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,0];
    chainLookup[LEFT]=[BOTTOM_LEFT,LEFT,TOP_LEFT,TOP,TOP_RIGHT,RIGHT,BOTTOM_RIGHT,BOTTOM,0];

    chainLookup[TOP_LEFT]=[TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT,RIGHT,TOP_RIGHT,TOP,0];

    let chain = [];
    let start = best.containerSpot.getDirectionTo(entryPos);
    for(let i in chainLookup[start]){
        let dir = chainLookup[start][i];
        if( sorted[dir] )chain.push(sorted[dir])

    }
    this.setStandingSpot(best.containerSpot);
    this.setStandingSpots(chain);

    best.containerSpot.colourIn('red')
    for(let p in chain)chain[p].colourIn('yellow',0.5,p)
    for(let p of best.path)Game.rooms[best.containerSpot.roomName].visual.text('X',p.x,p.y);

}
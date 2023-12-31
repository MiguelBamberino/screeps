
const MemoryCollection = require('class.memory-collection');
global.objectMeta = new MemoryCollection('objectMeta');
global.checkDeletedObjects=function(){
    let objects = objectMeta.all();
    let missingCount = 0;
    let start= Game.cpu.getUsed();
    for(let id in objects){
        let gameObj = Game.getObjectById(id);
        if(!gameObj){
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
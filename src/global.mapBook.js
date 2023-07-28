global.ERR_ROOM_NOT_SCANNED=-16;
global.STRUCTURE_DEPOT="depot";
//global.STRUCTURE_MINE_STORE="mine_store";
//global.STRUCTURE_FILLER_STORE="filler_store";
//global.STRUCTURE_UPGRADER_STORE="upgrader_store";
global.DESC='desc';
global.ASC='asc';

global.mb = {

    // how long do we keep a path, before carrying out a purge check
    PATH_CACHE_KEEP_PERIOD:1000,
    // how many uses must a path have, to not be purged
    PATH_CACHE_PURGE_THRESHOLD:5,
    
    type_shorts_lookup:{
        'container':'CO',
        'controller':'CO',
        'extension':'EX',
        'extractor':'EX',
        'factory':'FA',
        'invader_core':'IC', // STRUCTURE_INVADER_CORE
        'keeper_lair':'KL',//STRUCTURE_KEEPER_LAIR
        'lab':'LA',
        'link':'LI',
        'nuker':'NU',
        'observer':'OB',
        'power_bank':'PB',
        'power_spawn':'PS',
        'portal':'PO',
        'rampart':'RA',
        'road':'RD',
        'spawn':'SP',
        'storage':'ST',
        'terminal':'TE',
        'tower':'TW',
        'wall':'WA'
    },

    
    runTick: function(){
        this.checkIntervals();
        this.checkRoomRepairs();
        this.reviewConstructions();
    },
    checkIntervals: function(){
        for(let t in Memory.mapBook.intervals){
            
            let interval = Memory.mapBook.intervals[t];
            interval.ticker++;
            if(interval.ticker >= interval.refresh_rate){
                this[interval.callback]();
                interval.ticker=0;
            }
            
        }
    },
    initiate: function(){

        if(!Memory.mapBook){
            Memory.mapBook = {
                intervals:{},
                paths:{},
                rooms:{}
            };
            this.reloadIntervals();
        }
    },
    reloadIntervals: function(){
        Memory.mapBook.intervals={ 
                    'PATH_AUDIT':{ticker:0,refresh_rate:100,callback:'auditPaths'},  
                    'REFRESH_REPAIR':{ticker:0,refresh_rate:1000,callback:'refreshRepairTargets'},
                    'CONSTRUCTION_SCAN':{ticker:0,refresh_rate:100,callback:'scanForConstructions'},
                    'CLEAN_STRUCTURES':{ticker:0,refresh_rate:500,callback:'cleanMissingStructures'}
                };
    },
    scanRoom: function(roomName){

        if(Game.rooms[roomName]){
            let srcObjs = Game.rooms[roomName].find(FIND_SOURCES);
            let srcCache={};
            for(let s in srcObjs){
                srcCache[srcObjs[s].id]={ 
                    id:srcObjs[s].id,
                    coords:{
                        x:srcObjs[s].pos.x,
                        y: srcObjs[s].pos.y
                    }
                };
            }
            let minerals = Game.rooms[roomName].find(FIND_MINERALS);
            let mineralID = '';
            for(let mineral of minerals)
                if(mineral.mineralType!==RESOURCE_THORIUM)
                    mineralID=mineral.id;
            
            let c = Game.rooms[roomName].controller;
            //console.log(c);
            let controllerStruct =(c)?{id:c.id,coords:{x:c.pos.x,y:c.pos.y}}:{};
            Memory.mapBook.rooms[roomName]={
                constructionSites:{},
                structures:{},
                struct_id_cache:{},
                repairTargets:{},
                sources:srcCache,
                controller:controllerStruct,
                storage_id:'',
                terminal_id:'',
                mineral_id:mineralID
            };
            this.scanRoomForStructures(roomName)
            this.scanRoomForConstructions(roomName);
            this.refreshRepairTargetsForRoom(roomName);
        }else{
            return ERR_NOT_FOUND;
        }

    },
    
    getRoom: function(name){
        if(Memory.mapBook.rooms[name])return Memory.mapBook.rooms[name];
        return false;
       
    },
    deleteRoom: function(name){
        if(Memory.mapBook.rooms[name])delete Memory.mapBook.rooms[name];
    },
    hasRoom: function(name){
        return (Memory.mapBook.rooms[name])?true:false;
    },
    allRooms: function(){
        return Memory.mapBook.rooms;
    },
    createNoVisionObject: function(data,roomName){
        
        return {
            id:data.id,
            pos: new RoomPosition(data.coords.x,data.coords.y,roomName),
            haveVision:false
        };
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // Typed Structure Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    getControllerForRoom: function(roomName,requireVision=true){
        let room = this.getRoom(roomName);
        if(room){
            let obj = Game.getObjectById(room.controller.id);
            if(obj){
                obj.haveVision=true;
                return obj;
            }
            if(!requireVision){
                return this.createNoVisionObject(room.controller,roomName);
            }
            return false;
        }
        return false;
    },
    getStorageForRoom: function(roomName){
        let room = this.getRoom(roomName);
        if(room){
            let obj = Game.getObjectById(room.storage_id);
            return (obj)?obj:false;
        }
        return false;
    },
    getTerminalForRoom: function(roomName){
        let room = this.getRoom(roomName);
        if(room){
            let obj = Game.getObjectById(room.terminal_id);
            return (obj)?obj:false;
        }
        return false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    // Source Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    getMineralForRoom: function(roomName){
        let room = this.getRoom(roomName);
        if(room){
            let obj = Game.getObjectById(room.mineral_id);
            return (obj)?obj:false;
        }
        return false;
    },
    
    getNearestSource: function(pos,roomNames){
        if(!roomNames){
            roomNames = Object.keys(this.allRooms());
        }
        let target = false;
        let shortestDistance=9999999;
        for(let name of roomNames){
            let room = this.getRoom(name);
            if(room){
                for(let id in room.sources){
                    let obj = Game.getObjectById(id);
                    if(obj){
                        let dist = pos.getRangeTo(obj.pos);
                        if(dist=='Infinity'){dist=50}
                        if(dist < shortestDistance){
                            shortestDistance = dist;
                            target = obj;
                        }
                    }

                }
            }
        }
        return target;
    },
    // get all sources in all rooms we know
    getAllSources: function () {
        return this.getSources();
    },
    getSources: function (query,debug=false) {
        const allRooms = this.allRooms();
        let sources = [];
        
        if(query.requireVision===undefined)
            query.requireVision=true;
        
        if(query.filters===undefined)
            query.filters=[];
        
        if(debug)clog(query)
        for (const roomName in allRooms) {
            // Check if the filter is set and roomNames is provided, then filter the rooms
            if (query && query.roomNames && query.roomNames.length > 0) {
                if (!query.roomNames.includes(roomName)) {
                    continue;
                }
            }
    
            const room = allRooms[roomName];
            if (room && room.sources) {
                for (const id in room.sources) {
                    const source = Game.getObjectById(id);
                    if (source) {
                        source.haveVision=true;
                        // Check if the filter is set and filters is provided, then filter the sources using _matchObjectFilters
                        if (query && query.filters) {
                            if (this._matchObjectFilters(source, query.filters)) {
                                sources.push(source);
                            }
                        } else {
                            sources.push(source);
                        }
                    }else if(!query.requireVision && query.filters.length==0){
                        
                        sources.push( this.createNoVisionObject(room.sources[id],roomName) );
                    }
                }
            }
        }
    
        return sources;
    },

    // get all source in an room
    getAllSourcesForRoom: function(roomName){
        return this.getSources({roomNames:[roomName]});
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    // Structure Functions
    //////////////////////////////////////////////////////////////////////////////////////////

    cleanMissingStructures: function(){
        console.log("Cleaning MapBook...");
        for(let name in this.allRooms()){
            // make sure we can definitely see the room, before deleting anything
            if(Game.rooms[name]){
                let room = this.getRoom(name);
                // this should clear 90% of missing structures
               /* for(let s in room.structures){
                    if(!Game.getObjectById(room.structures[s].id)){
                        logs.log("Delete","Map struct deleted:"+JSON.stringify(room.structures[s]) );
                        delete room.struct_id_cache[room.structures[s].type][room.structures[s].id];
                        delete room.structures[s];
                    }
                }*/
                // some rare cases leave id cache records behind, so lets clean those too
                for(let type in room.struct_id_cache){
                    for(let id in room.struct_id_cache[type]){
                        if(!Game.getObjectById(id)){
                            logs.log("Delete","Deleting id cache for "+type+", id:"+id);
                            delete room.struct_id_cache[type][id];
                        }
                    }
                }
                
            }
        }
    },
    scanRoomForStructures: function(roomName){
        if(!Game.rooms[roomName])return;// can we see the room?
        let room = this.getRoom(roomName);
        if(room){
            // scan room for spawns first, in rare case that they exist. This is a dependency for classifying derrived struct types
            let structures = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN}
            });
            for(let s in structures){
                this.addStructure(structures[s]);
            }
            // now lets do everything else
            structures = Game.rooms[roomName].find(FIND_STRUCTURES);
            for(let s in structures){
                this.addStructure(structures[s]);
            }
        }
    },
    addStructure: function(obj){
        let room = this.getRoom(obj.pos.roomName);
        if(room){
            //room.structures[obj.id] = {id:obj.id,x:obj.pos.x,y:obj.pos.y,roomName:obj.pos.roomName,type:obj.structureType};
            
            if(obj.structureType===STRUCTURE_STORAGE){
                room.storage_id = obj.id;
            }
            if(obj.structureType===STRUCTURE_TERMINAL){
                room.terminal_id = obj.id;
            }
            // store id in a quick lookup cache
            if(!room.struct_id_cache[obj.structureType]){
                room.struct_id_cache[obj.structureType]={};
            }
            
            if(room.struct_id_cache[obj.structureType][obj.id] === undefined){
                let l = Object.keys(room.struct_id_cache[obj.structureType]).length+1;
                room.struct_id_cache[obj.structureType][obj.id]=l;
            }

            
            
        }else{
            return ERR_ROOM_NOT_SCANNED;
        }
    },

    haveStructures: function(roomNames){
        if(!roomNames){
            roomNames = Object.keys(this.allRooms());
        }
        for(let name of roomNames){
            let room = this.getRoom(name);
            if(room){
                if( Object.keys(room.struct_id_cache).length >0 )return true;
            }
        }
        return false;
    },
    countStructures: function(types,roomNames){
        if(!roomNames){
            roomNames = Object.keys(this.allRooms());
        }
        let count=0;
        for(let name of roomNames){
            let room = this.getRoom(name);
            if(room){
                for(let type of types){
                    if(room.struct_id_cache[type]){
                        count+= Object.keys(room.struct_id_cache[type]).length;
                    }
                }
            }
        }
        return count;
    },

    /**
     * Filter any structures in the mapBook and get an array back
     * types: accepts screep structureType or derrived types such as STRUCTURE_DEPOT
     * roomNames: a string array of room names, that have already been scanned
     * filter: you can filter by a structures attributes/func of that obj; setting fn as the operator
     * orderBy : You can order by an attribute/func return/mapCalculation. Supported map calcs are 'distance'
     * 
     * TIP: improve performace by setting types & roomNames
     * 
     * query{
         types:[], [STRUCURE_ROAD....]
         roomNames:[], ['W23S43'...]
         filters:[], many of {attribute:'',value:mixed,operator:'=|fn'}
         orderBy:{} >> {attr|fn|calc:'',value:mixed,dir:ASC|DESC}
     }
     */ 
    getStructures: function(query={},blog=false){
        
        // if rooms is not set, then filter on all of them
        if(! query.roomNames){
            query.roomNames = Object.keys(this.allRooms());
        }
        // if no filter set, then default to empty array
        if(!query.filters){
            query.filters = [];
        }
        if(blog)clog(JSON.stringify(query),"Query")
        let structures=[];
        let keyMap={};
        let unsortedResults={};
        for(let name of query.roomNames){
            let room = this.getRoom(name);
            if(blog)clog((room),"Room Exists?")
            if(room){
                
                // if not set, then filter all structures
                if(!query.types){
                    query.types = Object.keys(room.struct_id_cache);
                }
                if(blog)clog(query.types,"Types applied")
                
                
                for(let type of query.types){
                    if(blog)clog(type,"type")
                    
                    if(room.struct_id_cache[type]){
                        for(let id in room.struct_id_cache[type]){
                            if(blog)clog(id,"type id:")
                            let obj = Game.getObjectById(id);
                            if(blog)console.log(obj)
                            if(obj ){
                                if(this._matchObjectFilters(obj,query.filters)){
                                    if(query.orderBy){
                                        let k = this._calculateStructureOrderKey(obj,query.orderBy);
                                        if(k!==undefined){
                                            if(!keyMap[k]){
                                                keyMap[k] =[];
                                            }
                                            keyMap[k].push(obj.id);
                                            unsortedResults[obj.id]=obj;  
                                        }

                                    }else{
                                        structures.push(obj);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(query.orderBy){

            for(let p in keyMap){
                for(let g in keyMap[p]){
                    structures.push( unsortedResults[ keyMap[p][g] ] );
                }
            }
            if(query.orderBy.dir==DESC){
                structures.reverse();
            }
        }
        return structures;
    },
    /**
     * parse the orderBy query option and find the value to be used for sorting
     */ 
    _calculateStructureOrderKey: function(structure,orderBy){
        if(orderBy.attr){
            return structure[orderBy.attr];
        }
        if(orderBy.fn){
           
            if(orderBy.value === undefined){
                return structure[orderBy.fn]();
            }else{
                return structure[orderBy.fn](...orderBy.value);
            }
            
        }
        if(orderBy.calc){
            if(orderBy.calc==='distance'){
                return orderBy.value.getRangeTo(structure.pos);
            }
        }
        return structure.id;
    },
    /**
     * evaluate the filters against the object and return bool
     */ 
    _matchObjectFilters: function(object,filters){

        for(let filter of filters){
            if(filter.operator=='fn'){

                if(object[filter.attribute](...filter.value)===false){
                    return false;
                }
            }
            if(filter.operator=='='){
                if(object[filter.attribute]!==filter.value){
                    return false;
                }
            }
            if(filter.operator=='<'){
                if(object[filter.attribute]>filter.value){
                    return false;
                }
            }
            if(filter.operator=='>'){
                if(object[filter.attribute]<filter.value){
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * 
     */ 
    getNearestStructure: function(pos,typesP,roomNamesP,filtersP=[]){

        let structures = this.getStructures({types:typesP,roomNames:roomNamesP,filters:filtersP,orderBy:{calc:'distance',value:pos}});
        if(structures.length>0){
            return structures[0];
        }
        return false;
    },
    
    getFullestStructure: function(typesP,roomNamesP,filtersP=[]){

        let structures = this.getStructures({types:typesP,roomNames:roomNamesP,filters:filtersP,orderBy:{fn:'getWithdrawReserveLimit',dir:DESC}});
        if(structures.length>0){
            return structures[0];
        }
        return false;
    },
    
    getLowestHPStructure: function(pos,typesP,roomNamesP,filtersP=[]){
        let structures = this.getStructures({types:typesP,roomNames:roomNamesP,filters:filtersP,orderBy:{attr:'hits'}});
        if(structures.length>0){
            return structures[0];
        }
        return false;
    },
    
    getShortNameForStructure: function(structure){
        let room = this.getRoom(structure.pos.roomName);
        let short = this.type_shorts_lookup[structure.structureType];

        if(room){
            let n = room.struct_id_cache[structure.structureType][structure.id];
            if(n){
                if(n<10){
                    return short+'-0'+n;
                }else{
                    return short+'-'+n;
                }
            }
        }
        return short+'-00';
    },
    getRefForStructure: function(structure){
        let room = this.getRoom(structure.pos.roomName);
        if(room){
            let n = room.struct_id_cache[structure.structureType][structure.id];
            if(n){
                if(n<10){
                    return '0'+n;
                }else{
                    return n+'';
                }
            }
        }
        return '00';
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    // Repair Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    checkRoomRepairs: function(){
        let rooms = this.allRooms();
        for(let r in rooms){
            if(Object.keys(rooms[r].repairTargets).length==0 ){
                this.refreshRepairTargetsForRoom(r);
            }
        }
    },
    refreshRepairTargets: function(){
        let rooms = this.allRooms();
        for(let r in rooms){
            this.refreshRepairTargetsForRoom(r);
        }
    },
    refreshRepairTargetsForRoom: function(r){
        let room = this.getRoom(r);
        if(room){
            room.repairTargets={};
            if(room.struct_id_cache[STRUCTURE_ROAD]){
                for(let id in room.struct_id_cache[STRUCTURE_ROAD]){
                    let obj = Game.getObjectById(id);
                    if(obj && obj.hits < obj.hitsMax){
                        room.repairTargets[id]=true;
                    }
                }
            }
            if(room.struct_id_cache[STRUCTURE_CONTAINER]){
                for(let id in room.struct_id_cache[STRUCTURE_CONTAINER]){
                    let obj = Game.getObjectById(id);
                    if(obj && obj.hits < obj.hitsMax){
                        room.repairTargets[id]=true;
                    }
                }
            }
        }

    },
    getNearestRepairTarget: function(pos,roomNames){
        if(!roomNames){
            roomNames = Object.keys(this.allRooms());
        }
        let target = false;
        let shortestDistance=9999999;
        for(let name of roomNames){
            let room = this.getRoom(name);
            if(room){
                for(let id in room.repairTargets){
                    let obj = Game.getObjectById(id);
                    if(obj){
                        if(obj.hits < obj.hitsMax){
                            let dist = pos.getRangeTo(obj.pos);
                            if(dist=='Infinity'){dist=50}
                            if(dist < shortestDistance){
                                shortestDistance = dist;
                                target = obj;
                            }
                        }else{
                            delete room.repairTargets[id];
                        }
                    }

                }
            }
        }
        return target;
    },
    
    //////////////////////////////////////////////////////////////////////////////////////////
    // Constructure Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    scanForConstructions: function(){
        let rooms = this.allRooms();
        for(let r in rooms){
            this.scanRoomForConstructions(r);
        }
    },
    scanRoomForConstructions: function(r){
        if(!Game.rooms[r])return; // can we see the room ?
        let room = this.getRoom(r);
        if(room){
            let sites = Game.rooms[r].find(FIND_CONSTRUCTION_SITES);
       
            for(let s in sites){
                let site = sites[s];
                let k = this.positionToString(site.pos);
                if(!room.constructionSites[k]){
                    room.constructionSites[k]={x:site.pos.x,y:site.pos.y,roomName:site.pos.roomName,id:site.id,type:site.structureType,looks:0};
                }
            }
        }

    },
    addConstruction: function(position,type){
        let room = this.getRoom(position.roomName);
        if(room){
            let res = position.createConstructionSite(type);
            if(res===OK){
                let k = this.positionToString(position);
                room.constructionSites[k]={x:position.x,y:position.y,roomName:position.roomName,id:false,type:type,looks:0};
            }
            return res;
        }else{
           return ERR_ROOM_NOT_SCANNED;
        }
    },
    reviewConstructions: function(){
        let rooms = this.allRooms();
        for(let r in rooms){
            if(!Game.rooms[r])continue;// can we see the room ?
            for(let c in rooms[r].constructionSites){
                let site = rooms[r].constructionSites[c];
                if(site.id){
                    let obj = Game.getObjectById(site.id);
                    if(!obj){
                        let newStructure = Game.rooms[r].lookForStructureAt(site.type,site.x,site.y);
                        if(newStructure){
                            this.addStructure(newStructure);
                        }
                        delete rooms[r].constructionSites[c];
                    }
                }else{
                    let obj = Game.rooms[r].lookForConstructionAt(site.x,site.y);
                    if(obj){
                        site.id = obj.id;
                    }else{
                        site.looks++;
                        // because placing a con site is an intent, it may not exist yet when we first check for it
                        if(site.looks>2){
                            delete rooms[r].constructionSites[c];
                        }
                    }
                }
            }
        }
    },
    haveConstructions: function(roomNames){
        if(!roomNames){
            roomNames = Object.keys(this.allRooms());
        }
        for(let name of roomNames){
            let room = this.getRoom(name);
            if(room){
                if( Object.keys(room.constructionSites).length >0 )return true;
            }
        }
        return false;
    },
    getNearestConstruction: function(pos,roomNames,priorityTypes = [STRUCTURE_SPAWN,STRUCTURE_STORAGE,STRUCTURE_TOWER,STRUCTURE_TERMINAL]){
        if(!roomNames){
            roomNames = Object.keys(this.allRooms());
        }
        let target = false;
        let shortestDistance=9999999;
       
        for(let name of roomNames){
            let room = this.getRoom(name);
            if(room){
                for(let s in room.constructionSites){
                    let obj = Game.getObjectById(room.constructionSites[s].id);
                    if(obj){
                        
                        if(priorityTypes.indexOf(obj.structureType)!==-1){
                            //clog(obj,'prioritising')
                            return obj;
                        }
                            
                        let dist = pos.getRangeTo(obj.pos);
                        if(dist=='Infinity'){dist=50}
                        if(dist < shortestDistance){
                            shortestDistance = dist;
                            target = obj;
                        }
                    }

                }
            }
        }
        return target;
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // Path Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    markPathUsed: function(key){
        Memory.mapBook.paths[key].uses+=1;
    },
    savePath: function(key,_path){
        Memory.mapBook.paths[key] = { path:_path, created:Game.time, uses:1 };
    },
    havePath: function(key){
        return (Memory.mapBook.paths[key])?true:false;
    },
    getPath: function(key){
        if(Memory.mapBook.paths[key]){
            return Memory.mapBook.paths[key].path;
        }
        return false;
    },
    deletePath: function(key){
        if(Memory.mapBook.paths[key]){
            delete Memory.mapBook.paths[key];
            return true;
        }
        return false;
        
    },
    allPaths:function(){
        return Memory.mapBook.paths;
    },
    pathCount: function(){
        return Object.keys(Memory.mapBook.paths).length;
    },
    auditPaths: function(){
        
        for(let pk in this.allPaths() ){
            let path = this.getPath(pk);
            let timePassed = Game.time -path.created;
            if(timePassed >= this.PATH_CACHE_KEEP_PERIOD){
                if(path.uses < this.PATH_CACHE_PURGE_THRESHOLD){
                    this.deletePath(pk)
                }
            }
            
        }
    },
    createPath: function(from,to){
        
        let fromRpos = this.getRoomPositionFrom(from);
        let toRpos = this.getRoomPositionFrom(to);
       
        let k = this.createPathKey(fromRpos,toRpos);
        if(!this.havePath(k)){
           this.savePath(k,fromRpos.findPathTo(toRpos)); 
        }else{
            this.markPathUsed(k);
        }
        
        return k;
    },

    createPathKey: function(from,to){
        return this.positionToString(from)+'>'+this.positionToString(to);
    },
    expandPathKey: function(pathKey){
        let bits=pathKey.split('>');
        
        return { from:this.stringToPosition(bits[0]), to: this.stringToPosition(bits[1]) };
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // Core Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    positionToString: function(pos,y,roomName){
        let x=null;
        if(!y){
            x = pos.x;
            y = pos.y;
            roomName = pos.roomName;
        }else{
            x = pos;
        }
        return x+':'+y+':'+roomName;
    },
    stringToPosition: function(str){
        let bits = str.split(':');
        
        return new RoomPosition(bits[0],bits[1],bits[2]); 
    },
    /**
     * Find/create a roomPosition object from many possible things
     */ 
    getRoomPositionFrom:function(thing){
        
        if(thing instanceof RoomPosition){
            
            return thing;
            
        }else if(typeof thing.pos==='object'){

            if(thing.pos instanceof RoomPosition){
                
                return thing.pos;
                
            }else{
                return new RoomPosition(thing.pos.x,thing.pos.y,thing.pos.roomName); 
            }
            
        }else{
            
            return new RoomPosition(thing.x,thing.y,thing.roomName); 
            
        }
    }
};
mb.initiate();



Structure.prototype.shortName=function(){
    return mb.getShortNameForStructure(this);
}
Structure.prototype.ref=function(){
    return mb.getRefForStructure(this);
}

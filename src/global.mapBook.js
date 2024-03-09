global.ERR_ROOM_NOT_SCANNED=-16;
global.STRUCTURE_DEPOT="depot";
global.DESC='desc';
global.ASC='asc';

global.mb = {

    // how long do we keep a path, before carrying out a purge check
    PATH_CACHE_KEEP_PERIOD:1000,
    // how many uses must a path have, to not be purged
    PATH_CACHE_PURGE_THRESHOLD:5,
    
    paths:{},
    
    mapRoutes:{},
    
    costMatrices:{},
    deadlyRooms:{},
    
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
    intervals:{ 
       /* 'PATH_AUDIT':{refresh_rate:100,callback:'auditPaths'}, */
        'REFRESH_REPAIR':{refresh_rate:1000,callback:'refreshRepairTargets'},
        'CONSTRUCTION_SCAN':{refresh_rate:100,callback:'scanForConstructions'},
        'CLEAN_STRUCTURES':{refresh_rate:500,callback:'cleanMissingStructures'}
    },
    
    heap_rooms:{},
    
    runTick: function(){

        this.checkIntervals();
        this.checkRoomRepairs();
        this.reviewConstructions();

    },
    checkIntervals: function(){
        for(let t in this.intervals){
            let interval = this.intervals[t];
            if( Game.time% interval.refresh_rate===0){
                this[interval.callback]();
            }
        }
    },
    initiate: function(){

        this.heap_rooms={};

        if(!Memory.mapBook){
            Memory.mapBook = {
                rooms:{}
            };
        }
        if(!Memory.mapBook.rooms){
            Memory.mapBook.rooms={}
        }
        
        for(let roomName in Game.rooms){
            if(this.havePermanentVision(roomName)){
                if(Memory.mapBook.rooms[roomName])delete Memory.mapBook.rooms[roomName];
                this.scanRoom(roomName)
            }
        }
        
        for(let roomName in Memory.mapBook.rooms){
            this.heap_rooms[roomName] = Memory.mapBook.rooms[roomName];
        }
        this.createNoExitCostMatrix()
        
    },
    minutesUntilOpen(roomName){
        const startDate = new Date(); // today
        let state = Game.map.getRoomStatus(roomName);
        if(!state)return 0;
        if(state.status==='normal')return 0;
        //if(state.status!=='closed')return ERR_INVALID_ARGS;
        const thawDate = new Date(state.timestamp);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = thawDate - startDate  ;
        // Convert milliseconds to hours
        return  Math.ceil(differenceInMilliseconds / (1000 * 60  ));
    },
    hoursUntilOpen(roomName){
        const startDate = new Date(); // today
        let state = Game.map.getRoomStatus(roomName);
        if(!state)return 0;
        if(state.status==='normal')return 0;
        //if(state.status!=='closed')return ERR_INVALID_ARGS;
        const thawDate = new Date(state.timestamp);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = thawDate - startDate  ;
        // Convert milliseconds to hours
        return  Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 ));
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
                    mineralID=mineral.id;
            
            let c = Game.rooms[roomName].controller;
            let controllerStruct =(c)?{id:c.id,coords:{x:c.pos.x,y:c.pos.y}}:{};
            let base={
                constructionSites:{},
                structures:{},
                struct_id_cache:{},
                repairTargets:{},
                sources:srcCache,
                controller:controllerStruct,
                storage_id:'',
                factory_id:'',
                terminal_id:'',
				nuker_id:'',
                mineral_id:mineralID
            };
           
            if(this.havePermanentVision(roomName)){
                base.permanentVision = true;
                this.heap_rooms[roomName] = base;
            }else{
                base.permanentVision = false;
                Memory.mapBook.rooms[roomName] = base;
                 this.heap_rooms[roomName] = base;
            }
            
            this.scanRoomForStructures(roomName)
            this.scanRoomForConstructions(roomName);
            this.refreshRepairTargetsForRoom(roomName);
        }else{
            return ERR_NOT_FOUND;
        }

    },
    
    getRoom: function(name){
        if(this.heap_rooms[name])return this.heap_rooms[name];
        return false;
       
    },
    deleteRoom: function(name){
        if(this.heap_rooms[name])delete this.heap_rooms[name];
        if(Memory.mapBook.rooms[name])delete Memory.mapBook.rooms[name];
    },
    hasRoom: function(name){
        return (this.heap_rooms[name])?true:false;
    },
    havePermanentVision: function(name){
        //if()
        if(!Game.rooms[name])return false;
        if(!Game.rooms[name].controller)return false;
        if(!Game.rooms[name].controller.owner)return false;
        
        return (Game.rooms[name].controller.owner.username=='MadDokMike')
    },
    allRooms: function(){
        return this.heap_rooms;
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
        
        if(room && room.controller && room.controller.id){
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
    getNukerForRoom: function(roomName){
        let room = this.getRoom(roomName);
        if(room){
            let obj = Game.getObjectById(room.nuker_id);
            return (obj)?obj:false;
        }
        return false;
    },
    getFactoryForRoom: function(roomName){
        let room = this.getRoom(roomName);
        if(room){
            let obj = Game.getObjectById(room.factory_id);
            return (obj)?obj:false;
        }
        return false;
    },
    getInvaderCore:function(roomName){
        let structures = mb.getStructures({ roomNames:[roomName],types:[STRUCTURE_INVADER_CORE] })
        if(structures.length>0)
            return structures[0];
            
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
        let sources = [];
        if(!query)query={};
        // if rooms is not set, then filter on all of them
        if(! query.roomNames){
            query.roomNames = Object.keys(this.allRooms());
        }
        
        if(query.requireVision===undefined)
            query.requireVision=true;
        
        if(query.filters===undefined)
            query.filters=[];
        
        if(debug)clog(query)
        
        for (const roomName of query.roomNames) {
    
            let room = this.getRoom(roomName);
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
    getAllSourcesForRoom: function(roomName,requireVision=true){
        return this.getSources({roomNames:[roomName],requireVision:requireVision});
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

                // some rare cases leave id cache records behind, so lets clean those too
                for(let type in room.struct_id_cache){
                    for(let id in room.struct_id_cache[type]){
                        if(!Game.getObjectById(id)){
                            clog("Deleting id cache for "+type+", id:"+id,"Delete");
                            delete room.struct_id_cache[type][id];
                        }
                    }
                }
                
            }else{
                //clog("no vision",name)
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
        let rn = obj.pos.roomName;
        let room = this.getRoom(rn);
        
        if(room){
            //room.structures[obj.id] = {id:obj.id,x:obj.pos.x,y:obj.pos.y,roomName:obj.pos.roomName,type:obj.structureType};
            
            if(obj.structureType===STRUCTURE_STORAGE){
                room.storage_id = obj.id;
            }
            if(obj.structureType===STRUCTURE_TERMINAL){
                room.terminal_id = obj.id;
            }
			if(obj.structureType===STRUCTURE_NUKER){
                room.nuker_id = obj.id;
            }
			if(obj.structureType===STRUCTURE_FACTORY){
                room.factory_id = obj.id;
            }

            // store id in a quick lookup cache
            if(!room.struct_id_cache[obj.structureType]){
                room.struct_id_cache[obj.structureType]={};
                if(!this.havePermanentVision(rn)){
                    Memory.mapBook.rooms[rn].struct_id_cache[obj.structureType]={};
                }
            }
            
            if(room.struct_id_cache[obj.structureType][obj.id] === undefined){
                let l = Object.keys(room.struct_id_cache[obj.structureType]).length+1;
                room.struct_id_cache[obj.structureType][obj.id]=l;
                
                if(!this.havePermanentVision(rn)){
                    Memory.mapBook.rooms[rn].struct_id_cache[obj.structureType][obj.id]=l;
                }
                
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
         justIDs:bool >> if true, an array on IDs is returned
         requireVision:bool >> if false, then an array of objects containing id & pos is returned
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
         if(query.requireVision===undefined)
            query.requireVision=true;
        
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
                                        if(query.justIDs)structures.push(obj.id);
                                        else structures.push(obj);
                                    }
                                }
                            }else if(!query.requireVision){
                                if(query.justIDs)structures.push(id);
                                else structures.push( this.createNoVisionObject({id:id,coords:{x:1,y:1}},roomName) );
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
    
    getFullestStructure: function(typesP,roomNamesP,filtersP=[],blog=false){

        let structures = this.getStructures({types:typesP,roomNames:roomNamesP,filters:filtersP,orderBy:{fn:'getWithdrawReserveLimit',dir:DESC}},blog);
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
    addConstruction: function(position,type,name =undefined){
        let room = this.getRoom(position.roomName);
        if(room){
            let res = position.createConstructionSite(type,name);
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
    getNearestConstruction: function(pos,roomNames,priorityTypes = [STRUCTURE_SPAWN,STRUCTURE_TOWER,STRUCTURE_CONTAINER,STRUCTURE_EXTENSION,STRUCTURE_STORAGE,STRUCTURE_TERMINAL]){
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
    // Terrains Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    detectKiteCircuits:function(roomName){
        logs.startCPUTracker('detectKiteCircuits');
        
        let terrain = Game.map.getRoomTerrain(roomName);
        this.kite__groups=[];
        let groups=[];
        groups.push({childOf:false,coords:[{x:0,y:0}]});
        let posToGroupLookup={'0,0':0};
        
        for(let y1=0; y1<=49;y1++){
            for(let x1=0;x1<=49;x1++){
                
                let terrType = terrain.get(x1,y1);
                let thisK = x1+','+y1;
                let leftK = (x1-1)+','+y1;
                let topK = x1+','+(y1-1);
                let topRightK = (x1+1)+','+(y1-1);
                let rightK = (x1+1)+','+y1;
                let bottomK = x1+','+(y1+1);
                
                // all the borders cannot be part of a kite group
                // they go in group0, the non-islands group
                if(y1===0 || y1===49 || x1===0 || x1===49){
                    posToGroupLookup[thisK] = 0;
                    groups[0].coords.push({x:x1,y:y1})
                   // continue;
                }
                
                else if( terrType === TERRAIN_MASK_WALL){
                    
                    if(x1==1 && y1===1){
                       // console.log("topK:",topK,"group:",posToGroupLookup[ topK ], "next terrain:",terrain.get(x1+1,y1))
                        //clog(posToGroupLookup)
                    }
                    
                    if( posToGroupLookup[ topK ] !== undefined ){
                        posToGroupLookup[thisK] = posToGroupLookup[ topK ];
                        groups[ posToGroupLookup[ topK ] ].coords.push({x:x1,y:y1})
                    }
                    else if( posToGroupLookup[ leftK ] !== undefined ){
                        posToGroupLookup[thisK] = posToGroupLookup[ leftK ];
                        groups[ posToGroupLookup[ leftK ] ].coords.push({x:x1,y:y1})
                    }
                    else if( posToGroupLookup[ rightK ] !== undefined ){
                        posToGroupLookup[thisK] = posToGroupLookup[ rightK ];
                        groups[ posToGroupLookup[rightK] ].coords.push({x:x1,y:y1})
                    }
                    else if( posToGroupLookup[ bottomK ] !== undefined  ){
                        posToGroupLookup[thisK] = posToGroupLookup[ bottomK ];
                        groups[ posToGroupLookup[bottomK] ].coords.push({x:x1,y:y1})
                    }
                    else if(posToGroupLookup[ topRightK ] && terrain.get(x1+1,y1)===TERRAIN_MASK_WALL ){
                        // strange edge case that avoid tiny barnacle groups, sticking to bigger main groups
                        posToGroupLookup[thisK] = posToGroupLookup[ topRightK ];
                        groups[ posToGroupLookup[topRightK] ].coords.push({x:x1,y:y1})
                    }
                    else{
                        // create new group
                        groups.push({coords:[{x:x1,y:y1}]});
                        posToGroupLookup[thisK] = (groups.length-1) ;
                    }
                    
                }
                
                if(
                    x1!==49 && y1===49 && x1!==48
                &&  posToGroupLookup[ topRightK ] !==undefined && posToGroupLookup[ thisK ] !==undefined 
                && posToGroupLookup[ topRightK ] !== posToGroupLookup[ thisK ] 
                && terrain.get(x1+1,y1)===TERRAIN_MASK_WALL 
                ){
                    
                    logs.startCPUTracker('mergeGroups');
                    // MERGE TOP_RIGHT group into THIS group
                    let oldGroupKey = posToGroupLookup[ topRightK ];
                    console.log(thisK," Merging:",oldGroupKey," into ",posToGroupLookup[ thisK ])
                    for(let c of groups[ posToGroupLookup[ topRightK ] ].coords ){
                        
                         posToGroupLookup[ c.x+','+c.y ] = posToGroupLookup[ thisK ];
                        // console.log("thisK",thisK,posToGroupLookup[ thisK ])
                         groups[ posToGroupLookup[thisK] ].coords.push({x:c.x,y:c.y})
                         
                    }
                    delete groups[oldGroupKey];
                    logs.stopCPUTracker('mergeGroups',true);
                }
                   
            }
        }
        this.kite__groups = groups;
        logs.stopCPUTracker('detectKiteCircuits',true);
    },
    kite__groups:[],
    renderKiteGroups:function(roomName){
        let uniqueColors = ['#b0e4de', '#c41dd1', '#c22178', '#14cd76', '#206722', '#4abe3b', '#1bf577', '#710448', '#01687a', '#1709fd', '#cb88e1', '#4a024e', '#d919a8', '#665106', '#ddfb42', '#905dc7', '#654e0a', '#dbefa2', '#0a37a2', '#6f1d88'];
        for(let k in this.kite__groups){
            for(let c of this.kite__groups[k].coords){
                let pos = rp(c.x,c.y,roomName);
                pos.colourIn( uniqueColors[  k ] )
                pos.text(k);
            }
        }
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // Path Functions
    //////////////////////////////////////////////////////////////////////////////////////////

    _makePathKey(from,to){
        return from.roomName+'-'+from.x+'-'+from.y+'>>'+to.roomName+'-'+to.x+'-'+to.y;
    },
    getPath: function(from,to,range=1){
        let key = this._makePathKey(from,to);

        if(!this.paths[key]){
            logs.startCPUTracker('getPath:new '+from+" to "+to)
            let newPath = PathFinder.search(from,{pos:to,range:range} ,
                {
                    swampCost:5,plainCost:3,maxOps:10000,
                    roomCallback: function(roomName) {
                        let costMatrix = new PathFinder.CostMatrix;

                        let structs = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_ROAD]})
                        let walls = mb.getStructures({roomNames:[roomName],types:[STRUCTURE_WALL]})
                        for(let struct of structs){
                            costMatrix.set(struct.pos.x, struct.pos.y, 1);
                        }
                        for(let struct of walls){
                            costMatrix.set(struct.pos.x, struct.pos.y, 2555);
                        }
                        return costMatrix;
                    }
                });
            logs.stopCPUTracker('getPath:new '+from+" to "+to,true)
            if(!newPath.incomplete)
                this.paths[key] = newPath.path;
            else
                return ERR_NO_PATH;// no possible path exists
        }

        return this.paths[key];
    },

    pathCount: function(){
        return Object.keys(this.paths).length;
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    // MapRoute Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @param array
     */
    createMapRoute: function(route){
        if(route.length===1)return;
        
        if( !this.mapRoutes[ route[0] ] )this.mapRoutes[ route[0] ]={};
        
        this.mapRoutes[ route[0] ][ route[ (route.length-1) ] ] = route;
    },
    // 
    getMapRoute: function(from,to){
        if(this.mapRoutes[from])
            return (this.mapRoutes[from][to] )
            
        return undefined;
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    // CostMatrix Functions
    //////////////////////////////////////////////////////////////////////////////////////////
   markRoomDeadly: function(roomName){
        this.deadlyRooms[roomName]=true;
        this.createCostMatrix(roomName,this.getCostMatrix('no-exit'));
   },
    createNoExitCostMatrix: function(){
       let costMatrix = new PathFinder.CostMatrix;
       for(let x=0; x<49;x++){
            costMatrix.set(x, 0, 255);
            costMatrix.set(x, 49, 255);
        }
        for(let y=0; y<49;y++){
            costMatrix.set(0, y, 255);
            costMatrix.set(49, y, 255);
        }
        this.createCostMatrix('no-exit',costMatrix);
   },
   isDeadlyRoom:function(roomName){
       return this.deadlyRooms[roomName]?true:false;
   }, 
   createCostMatrix: function(roomName,matrix=undefined){
        if(!matrix)matrix =  new PathFinder.CostMatrix;
        this.costMatrices[ roomName ] = matrix;
        return this.costMatrices[ roomName ];
   },
    setCostOnMatrix: function (roomName,x,y,score){
        if(!this.costMatrices[roomName]){
            this.createCostMatrix(roomName);
        }
        this.costMatrices[roomName].set(x,y,score);
    },
    getCostMatrix: function(roomName){
        if(this.costMatrices[roomName])
            return this.costMatrices[roomName];
            
        return undefined;
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





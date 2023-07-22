module.exports = function(){
    
    StructureSpawn.prototype.worker_boost = 3;//4
    StructureSpawn.prototype.builder_boost = 2;//4
    StructureSpawn.prototype.fixer_boost = 1;//2
    StructureSpawn.prototype.waller_boost = 1;//2
    
    StructureSpawn.prototype.createCreep = function(parts,memory,nameOveride){

        if(!memory){
          this.log("error",this.name+":: creep create request with no memory. "+nameOveride);
          return -40;
        }
        
        let name = nameOveride?nameOveride:this.getCreepNameX(memory.role);
        if(!name){
            this.log("error","run out of creep names for role:"+memory.role);
            return ERR_NAME_EXISTS;
        }
        
        if(!parts){
            this.log("error","creep create request with no parts for "+name+" "+memory.role);
            return -30;
        }
        
        memory.spawn_name = this.name;
        delete Memory.creeps[name]; // clear out old crap
        
        let spots = [TOP_LEFT,TOP,TOP_RIGHT];
        let fillerSpots = [BOTTOM_LEFT,BOTTOM_RIGHT];
        if(this.name=='Eta' ||  this.name.indexOf('-2')>0){
            fillerSpots=[TOP_LEFT,TOP_RIGHT];
            spots = [BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
        }
        if(this.name=='Theta' ){
            fillerSpots=[TOP_LEFT,BOTTOM_LEFT];
            spots = [RIGHT,TOP_RIGHT,BOTTOM_RIGHT];
        }
        if(this.name=='Theta-2' ){
            fillerSpots=[TOP_RIGHT,BOTTOM_RIGHT];
            spots = [LEFT,TOP_LEFT,BOTTOM_LEFT];
        }
        
        if(memory && memory.role=='ffiller'){
            spots = fillerSpots;
        }
        let result = this.spawnCreepX(parts, name, {memory:memory,directions:spots});
        this.memory.spawn_result = name+": "+result;
        if(result ===OK){
            // this.memory.creep_names[name]= name; DEPRECATED=V18
            this.log("spawn",memory.role+" called "+name);
        }
        return result;
    },
    Structure.prototype.spawnCreepX= function(parts, name, options){
        if(typeof parts ==='string'){
            parts =  this.parseBody(parts);
        }
        return this.spawnCreep(parts,name,options);
    }
    StructureSpawn.prototype.getBodyPlanFromStr=function(str){
        str = str.toLowerCase();
        str = str.replace('m','m ');
        str = str.replace('w','w ');
        str = str.replace('c','c ');
        str = str.replace('a','a ');
        str = str.replace('r','r ');
        str = str.replace('h','h ');
        str = str.replace('t','t ');
        str = str.replace('c l','cl ');
    
        let parts = [];
        let lookup = {m:MOVE,w:WORK,c:CARRY,a:ATTACK,r:RANGED_ATTACK,h:HEAL,t:TOUGH,cl:CLAIM};
        let bits = str.split(' ');
        for(let i=0; i<bits.length; i++){

            let amount = bits[i].replace(/[a-z ]/gi,'');
            let typeKey = bits[i].replace(/[0-9 ]/gi,'');
            
            for(let a=0; a<amount; a++){
                parts.push(lookup[typeKey]);
            }
            
        }
        return parts;
        
    }
    StructureSpawn.prototype.parseBodyT = function(str){
        let st = Game.cpu.getUsed();
        let res = this.parseBody(str);
        clog( Game.cpu.getUsed()-st,'CPU:parseBody' );
        return res;
    }
    global.BODY_PLAN_CACHE={};
    StructureSpawn.prototype.parseBody= function(str) {
        
        str = str.replace(/\s+/g, '');
        str = str.toLowerCase();
        if(BODY_PLAN_CACHE[str])return BODY_PLAN_CACHE[str];
        
        let res = [];  
        if(str.indexOf('+')!==-1){
            let sections = str.split('+');
            // only works if 1 * is present. Will run 4*1w1m and create wmwmwmwm
            for(let s of sections){
                for(let p of this.parseBody(s))res.push(p);
            }
            BODY_PLAN_CACHE[str] = res;
            return res;
        }
        
        if(str.indexOf('*')!==-1){
            let patterns = str.split('*');
            // only works if 1 * is present. Will run 4*1w1m and create wmwmwmwm
            for(let i=0; i< patterns[0]; i++){
                for(let p of this.parseBody(patterns[1]))res.push(p);
            }
            BODY_PLAN_CACHE[str] = res;
            return res;
        }

        
        const shorts = {m:MOVE,w:WORK,c:CARRY,a:ATTACK,r:RANGED_ATTACK,h:HEAL,t:TOUGH,cl:CLAIM};
        
        for (let i=0;i<str.length;){        
            let count = str[i++];
            if (str[i] >= '0' && str[i] <= '9') {
                count += str[i++];            
            }                
            let label = str[i++];
            if (str[i] === 'l') {
                label += str[i++];            
            }
            while(count--) res.push(shorts[label]);
        }
        BODY_PLAN_CACHE[str] = res;
        return res;
    }
    /**
     * calculate what scale is the spawn at and return recommended creep size
     */ 
    StructureSpawn.prototype.getCreepBudget = function(){
        let budget = 300;
        let workers = this.memory.workforce_quota.worker.count;
        let harvesters = this.memory.workforce_quota.harvester.count;
        let energy = this.store.getUsedCapacity(RESOURCE_ENERGY);
        
        for(let ext of mb.getStructures({types:[STRUCTURE_EXTENSION],roomNames:this.roomNames()} )){
            energy += ext.store.getUsedCapacity(RESOURCE_ENERGY);
            budget += ext.store.getCapacity(RESOURCE_ENERGY);
        }
       // if(this.name=='Theta'){console.log("Engergy:"+energy);console.log("Budget:"+budget);}
        //if(this.name==='Eta'){return energy}
        if(energy<500 || workers==0 || harvesters==0 ){
            // shit hit the fan so lets recover
            return energy;
            this.log("important","system crashed, trying to recover");
        }
        return budget;
       // return energy;
    },
    /**
     * Get the next available  creep name
     */ 
    StructureSpawn.prototype.getCreepNameX = function(role){
        // A-Wo-1 vs A:wo:0
        let count = 0;
        while(count<10){
           let name = this.name.substr(0,1)+"-"+role.substr(0,2)+"-"+count;
           if(!Game.creeps[name]){
                return name;    
            }
            count++;
        }
        return false;
        
    },
    
    StructureSpawn.prototype.getAvailableMine2 = function(online = false) {
        const roomNames = this.roomNames();
        let filters = [
            {
                operator: "fn",
                attribute: "haveNoCreep",
                value: []
            }
        ];
    
        if (online) {
            filters.push({
                operator: "fn",
                attribute: "haveContainer",
                value: []
            });
        }
    
        let sources = mb.getSources({
            roomNames: roomNames,
            filters: filters
        });
        if(sources.length>0){
            return sources[0];
        }

        return false;
    }
    StructureSpawn.prototype.roomNames = function(){
        return Object.keys(this.memory.room_names);
    }
    StructureSpawn.prototype.remoteRoomNames = function(){
        let rooms = [];
        for(let r of this.roomNames()){
            if(this.room.name !=r){
                rooms.push(r);
            }
        }
        return rooms;
    }
    StructureSpawn.prototype.checkBuilderQuota = function(){
        
        let builder_quota = this.memory.workforce_quota.builder;
        let haveSites = mb.haveConstructions(this.roomNames());
        if(haveSites && builder_quota.required!== this.builder_boost){
            this.log("QUOTAS",this.name+" Stuff to build. Increasing builder quota by "+this.builder_boost);
            builder_quota.required = this.builder_boost;
        }
        if( !haveSites && builder_quota.required>0){
            this.log("QUOTAS",this.name+" No stuff to build. decreasing builder quota to 0");
            builder_quota.required = 0;
        }
    },
       StructureSpawn.prototype.checkWallerUpgraderQuota = function(){

        this.depotE = 0;
        let storage = mb.getStorageForRoom(this.pos.roomName);
        if(storage){
            this.depotE = storage.storedAmount();
        }
  

        let wallCount = mb.countStructures([STRUCTURE_WALL,STRUCTURE_RAMPART],this.roomNames());
        let onePer2k = Math.floor(  (this.depotE/2)/1000  );
        let onePer200k = Math.floor(  (this.depotE/2)/100000  );
        let oneper300k = Math.floor(((this.depotE/3)/100000));
        let oneper400k = Math.floor(((this.depotE/4)/100000));
        let wallersWanted = wallCount>1?1:0;
        if(storage && this.depotE<1000){
            wallersWanted=0;
        }
        
        let upgradersWanted = this.room.controller.getContainer()? 1:0;
        
       
        //if(this.room.controller.level<4){
           // upgradersWanted += onePer2k;
          // upgradersWanted =1;
        //}else{
            if(this.room.controller.level==8){
                wallersWanted += onePer200k;
                //upgradersWanted += oneper300k;
            }else{
                wallersWanted += oneper300k;
                //upgradersWanted += onePer200k;
            }
        //}
        if(this.name=='Alpha' || this.name=='Gamma'){
            wallersWanted=0;
        }
        if(this.name=='Eta' ){
           // upgradersWanted=2;
        }
        if(this.name=='Delta' && wallersWanted>0){
            wallersWanted=1;
        }

        if(Game.cpu.bucket<5000){
            if(wallersWanted>0)wallersWanted--;
            //if(upgradersWanted>0)upgradersWanted--;
        }
    
        if(Game.cpu.bucket<2000){
            wallersWanted=0;
            upgradersWanted=1;
        }

        let quota = this.memory.workforce_quota.waller;
        if(quota.required!== wallersWanted){
            this.log("QUOTA",this.name+" Changing waller quota to "+wallersWanted);
            quota.required = wallersWanted;
        }
        quota = this.memory.workforce_quota.upgrader;
        if(quota.required!== upgradersWanted){
            this.log("QUOTA",this.name+" Changing upgrader quota to "+upgradersWanted);
            quota.required = upgradersWanted;
        }
   },
    StructureSpawn.prototype.checkFixerQuota = function(){
        let fixer_quota = this.memory.workforce_quota.fixer;
        let count = mb.countStructures([STRUCTURE_ROAD],this.roomNames());
        if(this.room.controller.level > 1 && count>1 && fixer_quota.required!== this.fixer_boost){
            this.log("QUOTA",this.name+" Changing fixer quota to "+this.fixer_boost);
            fixer_quota.required = this.fixer_boost;
        }
   },
    StructureSpawn.prototype.checkReserverQuota = function(){
        
        let roomsToReserve = 0;
        for(let name in this.memory.room_names){
            this.memory.room_names[name]['type']='claim';
            if(name==='W42N51'){
                this.memory.room_names[name]['type']='claim';
            }
            // skip spawns room and can we see the remote
            if(this.room.name !== name && Game.rooms[name]){
                

                
                if(this.memory.room_names[name].type =='claim'){
                    if(typeof Game.rooms[name].controller.owner==='undefined'){
                        roomsToReserve++;
                    }else if(Game.rooms[name].controller.ticksToDowngrade < 200){
                        roomsToReserve++;
                    }
                }else if(this.memory.room_names[name].type =='reserve'){
                   
                    roomsToReserve++;
                }

            }
        }
        if(this.memory.workforce_quota.reserver.required != roomsToReserve){
            this.log("quota",this.name+" Changing reserver quota to "+roomsToReserve);
            this.memory.workforce_quota.reserver.required= roomsToReserve;
        }
    },
    
     StructureSpawn.prototype.recycleAll = function(){
        for(let name in Memory.creeps){
            if(Game.creeps[name]){
                Game.creeps[name].recycle();
            }
        }
    },
    StructureSpawn.prototype.clearUpMemory = function(){
        for(let name in Memory.creeps){
            if(!Game.creeps[name]){
                this.log("cleanup","Cleaning up creep:"+name);
                delete Memory.creeps[name];
            }
        }
    }
    StructureSpawn.prototype.reportHostile = function(hostile){
        
        if(typeof this.memory.room_names[hostile.room.name]!=='undefined'){

            if(typeof this.memory.room_names[hostile.room.name].hostiles[hostile.id]==='undefined'){
                
                hostile.room.name;
                this.memory.room_names[hostile.room.name].dangerous = true;
                let attckParts=0;
                for(let i in hostile.body){
                    if(hostile.body[i].type===ATTACK||hostile.body[i].type===ATTACK){
                        attckParts++;
                    }
                }
                
                this.memory.room_names[hostile.room.name].hostiles[hostile.id] = {
                    last_known_pos:{x:hostile.pos.x,y:hostile.pos.y,roomName:hostile.room.name},
                    attack_parts:attckParts
                };
                this.log('ATTACK','New hostile found in '+hostile.room.name);
            }
        }
    }
    StructureSpawn.prototype.reportHostileDead = function(roomName,hostile_id){
        if(typeof this.memory.room_names[roomName]!=='undefined'){
            if(typeof this.memory.room_names[roomName].hostiles[hostile_id]!=='undefined'){
                delete this.memory.room_names[roomName].hostiles[hostile_id];
                this.log('ATTACK','Hostile marked dead in '+roomName+" id:"+hostile_id);
            }
            if(Object.keys(this.memory.room_names[roomName].hostiles).length===0){
                this.memory.room_names[roomName].dangerous = false;
                this.log('ATTACK','All hostiles are gone. '+roomName+" is now safe.");
            }
            let c = Object.keys(this.memory.room_names[roomName].hostiles).length;
            
        }
    }
    StructureSpawn.prototype.addRoom = function(roomName){

       let controller = Game.rooms[roomName].controller;   
       this.memory.room_names[roomName] = {controller_id:controller.id,controller_pos:controller.pos,reserver_id:"",dangerous:false,hostiles:{},dropped_energy:{},type:"claim",level:"claim"}; 
            
    }
    
    StructureSpawn.prototype.lockFillSites= function(){
        
        let results = this.room.lookForAtArea(LOOK_STRUCTURES,this.pos.y,this.pos.x-2,this.pos.y+2,this.pos.x+2,true);
       // console.log(results.length);
        for(let s in results){
            //console.log(results[s].structure.id)
           // console.log(JSON.stringify(results[s].structure.getReservations()))
            //results[s].structure.resetReservations();
            if(results[s].structure.structureType === STRUCTURE_CONTAINER){
                if(results[s].structure.isWithdrawLocked()===false)results[s].structure.lockReservations(['withdraw']);
            }else if(results[s].structure.structureType === STRUCTURE_SPAWN){
                if(results[s].structure.isWithdrawLocked()===false)results[s].structure.lockReservations(['transfer']);
            }else if(results[s].structure.structureType === STRUCTURE_EXTENSION){
                if(results[s].structure.isWithdrawLocked()===false)results[s].structure.lockReservations(['transfer']);
            }
        }
    }
       
    StructureSpawn.prototype.unlockFillSites= function(){
        
        let results = this.room.lookForAtArea(LOOK_STRUCTURES,this.pos.y,this.pos.x-2,this.pos.y+2,this.pos.x+2,true);
       // console.log(results.length);
        for(let s in results){
            if(results[s].structure.structureType === STRUCTURE_SPAWN){
                results[s].structure.resetReservations();
            }else if(results[s].structure.structureType === STRUCTURE_EXTENSION){
                results[s].structure.resetReservations();
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
	//// CORE DEBUG FUNCS
	//////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * print to console
     */ 
    StructureSpawn.prototype.log = function(type,msg){
        if(logs){
            logs.log(this.name+"::"+type,msg);
        }
    },

    /**
     * log an event to the trace print to console
     */ 
    StructureSpawn.prototype.traceMsg = function(msg){
        if(logs){
            logs.spawnTrace(this,msg);
        }
        
    }
    
};
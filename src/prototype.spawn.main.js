module.exports = function(){
    
    StructureSpawn.prototype.worker_boost = 3;//4
    StructureSpawn.prototype.builder_boost = 2;//4
    StructureSpawn.prototype.fixer_boost = 1;//2
    StructureSpawn.prototype.waller_boost = 1;//2
    StructureSpawn.prototype.spawningStarted = false;
    
    StructureSpawn.prototype.pauseSpawningUntil = function(gameTime){
        this.memory.pausedUntil= gameTime;
    }
    
    StructureSpawn.prototype.createCreep = function(parts,memory,nameOveride,directions=[]){
       // if(this.name=='Delta'){clog(nameOveride,'createCreep'+Game.time);clog(directions,'directions')}
        if(this.spawningStarted!==false){
            return -50;
        }
        
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
        
        //memory.spawn_name = this.name;
        delete Memory.creeps[name]; // clear out old crap
        
        let result = this.spawnCreepX(parts, name, {memory:memory,directions:directions});
        this.memory.spawn_result = name+": "+result;
        if(result ===OK){
            
            // this.memory.creep_names[name]= name; DEPRECATED=V18
            this.log("spawn",memory.role+" called "+name);
            return name;
        }
        return result;
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
    Structure.prototype.spawnCreepX= function(parts, name, options={},highPriority=false){
        
        if(!highPriority && this.memory.pausedUntil && this.memory.pausedUntil > Game.time)return -60;
        
        //if(this.name=='Delta'){clog(name,'spawnCreepX '+Game.time);clog(options,'options')}
        
        if( options.directions==undefined && this.forceDirectionHack){
            // erghh...screwed me over too many times. Will do long term fix one day. Stop the tempCode creeps from spawning into a fast filler spot. 
            // nob heads!
            options.directions =this.forceDirectionHack; 
        }
       // if(this.name=='Delta'){clog(name,'spawnCreepX '+Game.time);clog(options,'options after')}
        if(this.spawningStarted!==false && !highPriority){
            return -50;
        }
        if(typeof parts ==='string'){
            parts =  this.parseBody(parts);
        }
        
        let res = this.spawnCreep(parts,name,options);
        if(res===OK){
            this.spawningStarted = name;
        }
        return res;
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
    
    
    StructureSpawn.prototype.roomNames = function(){
        return Object.keys(this.memory.room_names);
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
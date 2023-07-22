
global.upgrader = {
    
    recycle_all_creeps:function(){
        for(let k in Memory.creeps){
            if(Game.creeps[k]){
              //  console.log(k)
                if(Game.creeps[k].memory.role==='harvester'){
                    Game.creeps[k].suicide();
                }
                let sp = Game.creeps[k].spawn();
                if(!sp){
                    Game.creeps[k].suicide();
                }
                if(sp.pos.isNearTo(Game.creeps[k])){
                    sp.recycleCreep(Game.creeps[k]);
                }else{
                    Game.creeps[k].moveToPos(sp);
                }
                
            }else{
                delete Memory.creeps[k];
            }
        }    
    },
    to18_3:function(){
        if(Memory.VERSION ==='18.2'){
            let spawnNames = ['Alpha','Beta','Gamma'];
            for(let name of spawnNames){
                
                delete Game.spawns[name].memory.version;
                delete Game.spawns[name].memory.repairTargets;
                delete Game.spawns[name].memory.construction_site_ids;
                delete Game.spawns[name].memory.managed_structures;
                delete Memory.mapbooks;
                mb.initiate();
                mb.scanRoom('W42N54');
                mb.scanRoom('W42N53');
                mb.scanRoom('W42N52');
                mb.scanRoom('W41N52');
                mb.scanRoom('W41N53');
            }
           Memory.VERSION ='18.3'; 
        }else{
            console.log("Upgrade Failed. Must be on 18.2")
        }
    },
    to18_4:function(){
        console.log('running upgrade to 18.4...')
        if(Memory.VERSION ==='18.3'){
            let spawnNames = ['Alpha','Beta','Gamma','Delta'];
            for(let name of spawnNames){
                
                delete Game.spawns[name].memory.withdraw_reservations;
                delete Game.spawns[name].memory.depot_ids;
                delete Game.spawns[name].memory.extension_ids;
                delete Game.spawns[name].memory.tower_ids;

            }
            mb.scanRoom('W42N54');
            mb.scanRoom('W42N53');
            mb.scanRoom('W42N52');
            mb.scanRoom('W42N51');
            
            mb.scanRoom('W41N52');
            mb.scanRoom('W41N53');
            mb.scanRoom('W41N55');
           Memory.VERSION ='18.4'; 
        }else{
            console.log("Upgrade Failed. Must be on 18.4")
        }
    }
};
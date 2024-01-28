console.log("LOADING... _server_config")
// hello world
gui.nodeStats = true;
gui.remoteStats = true;
gui.speedRunStats = true;
gui.tradeStats = true;
gui.nodeSrcStats = true;
gui.nodeControllerStats =true;
gui.showDropStats = true;
logs.runRCLSpeedStats = true;
// mb.createMapRoute(['W41N53','W40N53','W40N52','W39N52'])

let loader = {
    allowRespawnDetection:false,
    spawn_id:'',
    loadNodes(){
        nodes.a  = new RoomNode('Alpha',{buildFast:true,upgradeRate:RATE_VERY_FAST});
    },
    detectRespawn(){
        let mainSpawnID = false;
        for(let name in Game.spawns){
            mainSpawnID = Game.spawns[name].id;
            break;
        }
        if(!this.spawn_id){
            this.spawn_id = mainSpawnID;
        }
        if(this.allowRespawnDetection && this.spawn_id !== mainSpawnID ){
            console.log("RESPAWN Detected...",mainSpawnID,"!=",this.spawn_id)
            this.spawn_id = mainSpawnID;
            this.resetData();
        }


    },
    resetData(){
        console.log("RESETTING... _server_config")


        this.resetBotData()
        this.loadNodes();
        util.destroyAllConSites();
        util.destroyAllStructures([STRUCTURE_ROAD,STRUCTURE_CONTAINER]);

        gui.init();
    },
    resetBotData(){

        delete Memory.creeps;
        delete Memory.spawns;
        delete Memory.mapBook;
        delete Memory.logs;
        delete Memory.reservationBook;
        delete Memory.objectMeta;
        delete Memory.roomNodes;
        delete Memory.remotes

        Memory.creeps = {};
        logs.initiate();
        mb.initiate();
        reservationBook.initiate();
        objectMeta.empty();

    }
};
module.exports = loader;
loader.loadNodes();



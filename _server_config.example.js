console.log("LOADING... _server_config")

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
    alpha_id:'',
    loadNodes(){
        nodes.a  = new RoomNode('Alpha',{buildFast:true,upgradeRate:RATE_VERY_FAST});
    },
    detectRespawn(){

        if(Game.spawns['Alpha']){
            if(this.alpha_id && this.alpha_id!==Game.spawns['Alpha'].id){
                console.log("RESPAWN Detected...")
                this.alpha_id = Game.spawns['Alpha'].id;
                this.resetData();
            }
            this.alpha_id = Game.spawns['Alpha'].id;
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



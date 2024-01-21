console.log("LOADING... _server_config")

gui.nodeStats = true;
gui.tradeStats = true;
// mb.createMapRoute(['W41N53','W40N53','W40N52','W39N52'])

let loader = {
    alpha_id:'',
    loadNodes(){
        nodes.a  = new RoomNode('Alpha',{});
    },
    detectRespawn(){

        if(Game.spawns['Alpha']){
            if(this.alpha_id!==Game.spawns['Alpha'].id){
                console.log("RESPAWN Detected...")
                this.alpha_id = Game.spawns['Alpha'].id;
                this.resetData();
            }
        }

    },
    resetData(){
        console.log("RESETTING... _server_config")
        this.loadNodes();
    }
};
module.exports = loader;
loader.loadNodes();

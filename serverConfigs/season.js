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

module.exports = {
    allowRespawnDetection:false,
    cpuLimit:100,
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {buildFast: true,spawnFacing:LEFT,armAnchor:rp(19,41,'W21S22'), upgradeRate: RATE_VERY_FAST})
        }
    }
};




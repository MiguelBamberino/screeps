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
            a: new RoomNode('Alpha', {anchor:rp(17,37,'W21S22'),buildFast: false,spawnFacing:LEFT,armAnchor:rp(19,41,'W21S22'), upgradeRate: RATE_FAST}),
            b: new RoomNode('Beta', {anchor:rp(13,15,'W22S17'),buildFast: false,spawnFacing:LEFT, upgradeRate: RATE_FAST})
        }
    }
};




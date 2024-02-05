// hello world
gui.nodeStats = true;
gui.remoteStats = true;
gui.speedRunStats = true;
gui.tradeStats = true;
gui.nodeSrcStats = true;
gui.nodeControllerStats =true;
gui.showDropStats = true;
logs.runRCLSpeedStats = true;
mb.createMapRoute(['W21S22','W20S22','W19S22','W18S22','W18S21','W17S21','W16S21','W16S20','W15S20','W14S20','W13S20','W12S20','W11S20','W11S21','W11S22','W12S22','W12S23','W12S24','W13S24'])

module.exports = {
    allowRespawnDetection:false,
    cpuLimit:100,
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {anchor:rp(17,37,'W21S22'),buildFast: false,spawnFacing:LEFT,armAnchor:rp(19,41,'W21S22'), upgradeRate: RATE_FAST}),
            b: new RoomNode('Beta', {anchor:rp(13,15,'W22S17'),buildFast: false,spawnFacing:LEFT, upgradeRate: RATE_FAST}),
            g: new RoomNode('Gamma', {anchor:rp(28,4,'W13S24'),buildFast: false,spawnFacing:TOP, upgradeRate: RATE_FAST})
        }
    }
};




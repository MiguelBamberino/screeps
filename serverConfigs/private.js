// hello bob
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
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {spawnFacing:TOP,anchor:rp(32,8,'W7N3'),armAnchor:rp(25,10,'W7N3'),armFacing:BOTTOM, buildFast: true, upgradeRate: RATE_VERY_FAST}),
            b: new RoomNode('Beta', {spawnFacing:TOP, anchor:rp(34,31,'W6N1'), armAnchor:rp(30,33,'W6N1'),armFacing:RIGHT, buildFast: true, upgradeRate: RATE_VERY_FAST}),
            g: new RoomNode('Gamma', {spawnFacing:TOP, buildFast: true, upgradeRate: RATE_VERY_FAST}),
        }
    }
};



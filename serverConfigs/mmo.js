// hello world
// mb.createMapRoute(['W41N53','W40N53','W40N52','W39N52'])

module.exports = {
    allowRespawnDetection:false,
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {buildFast: true, upgradeRate: RATE_VERY_FAST})
        }
    }
};




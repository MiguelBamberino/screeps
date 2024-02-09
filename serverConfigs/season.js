// hello world
gui.nodeStats = true;
gui.remoteStats = true;
gui.speedRunStats = false;
gui.tradeStats = true;
gui.nodeSrcStats = false;
gui.nodeControllerStats =true;
gui.showDropStats = true;
logs.runRCLSpeedStats = false;
mb.createMapRoute(['W21S22','W20S22','W19S22','W18S22','W18S21','W17S21','W16S21','W16S20','W15S20','W14S20','W13S20','W12S20','W11S20','W11S21','W11S22','W12S22','W12S23','W12S24','W13S24'])
//mb.createMapRoute(['W21S22','W22S22','W23S22','W24S22','W24S21','W25S21','W26S21','W26S20','W27S20','W28S20','W29S20','W30S20','W31S20','W32S20','W33S20','W34S20','W34S21','W35S21'])
//mb.createMapRoute(['W21S22','W22S22','W23S22','W24S22','W24S21','W25S21','W26S21','W26S20','W27S20','W28S20','W28S21','W29S21','W30S21','W31S21','W32S21','W32S22'])
//mb.createMapRoute(['W21S22','W22S22','W21S22'])
require('global.season6');


module.exports = {
    allowRespawnDetection:false,
    cpuLimit:100,
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {
                retreatSpot:rp(25,25,'W21S22'),
                anchor:rp(17,37,'W21S22'),spawnFacing:LEFT,armAnchor:rp(19,41,'W21S22'),
                buildFast: false,
                upgradeRate: RATE_FAST,
                makeResource:RESOURCE_ZYNTHIUM_HYDRIDE,
                labComplex:new LabComplex( rp( 14,37,'W21S22' ),TOP_RIGHT,600),
                imports:[
                    {resource_type:RESOURCE_LEMERGIUM,storageCap:12000},
                    {resource_type:RESOURCE_ZYNTHIUM,storageCap:12000},
                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:40000,batchSize:10000},
                ]

            }),
            b: new RoomNode('Beta', {
                retreatSpot:rp(25,25,'W22S17'),
                anchor:rp(13,15,'W22S17'),spawnFacing:LEFT,
                buildFast: false,
                upgradeRate: RATE_FAST,
                imports:[
                    /*{resource_type:RESOURCE_ENERGY,storageCap:100000},*/
                ],

                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:40000,batchSize:10000},
                    {resource_type:RESOURCE_LEMERGIUM,exportOver:0,batchSize:10000},
                ]

            }),
            g: new RoomNode('Gamma', {
                retreatSpot:rp(25,25,'W32S22'),
                anchor:rp(6,14,'W32S22'),spawnFacing:TOP,
                buildFast: false,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000,
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],

                exports:[
                   /* {resource_type:RESOURCE_ENERGY,exportOver:25000,batchSize:10000},*/
                    {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:10000},
                ]
            }),
            d: new RoomNode('Delta', {
                retreatSpot:rp(26,25,'W38S19'),
                anchor:rp(26,14,'W38S19'),spawnFacing:LEFT,armFacing:BOTTOM,armAnchor:rp(29,9,'W38S19'),
                buildTerminal: false,
                extractMineral:false,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000
            })
        }
    }
};




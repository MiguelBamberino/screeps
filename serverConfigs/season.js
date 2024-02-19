// hello world
gui.nodeStats = true;
gui.remoteStats = false;
gui.speedRunStats = false;
gui.tradeStats = false;
gui.nodeSrcStats = false;
gui.nodeControllerStats =false;
gui.showDropStats = false;
logs.runRCLSpeedStats = false;
mb.createMapRoute(['W21S22','W20S22','W19S22','W18S22','W17S22','W16S22','W16S23','W17S23','W17S24','W16S24','W15S24','W14S24','W13S24'])
mb.createMapRoute(['W21S22','W21S23','W21S24','W20S24','W20S25','W19S25','W18S25','W17S25','W17S26','W16S26','W15S26','W14S26','W14S27','W13S27','W13S26'])
mb.createMapRoute(['W21S22','W21S23','W21S24','W20S24','W20S25','W20S26','W20S27','W19S27','W19S26'])
mb.createMapRoute(['W21S22','W21S23','W21S24','W20S24','W20S25','W19S25'])
mb.createMapRoute(['W21S22','W21S23','W21S24','W22S24','W22S25','W22S25','W22S26','W22S27','W22S28'])
mb.createMapRoute(['W22S17','W23S17','W23S18','W24S18'])
mb.createMapRoute(['W13S24','W12S24','W12S25','W11S25','W11S26','W10S26','W9S26','W8S26','W8S27','W7S27','W6S27','W5S27','W4S27','W3S27'])
mb.createMapRoute(['W13S24','W12S24','W12S25','W11S25','W10S25','W10S24','W9S24','W8S24'])
// harrass UncleDian
mb.createMapRoute(['W21S22','W20S22','W19S22','W18S22','W18S21','W17S21','W16S21','W16S20','W15S20','W14S20','W13S20','W12S20'])
mb.createMapRoute(['W21S22','W20S22','W19S22','W18S22','W18S21','W17S21','W16S21','W16S20','W15S20','W14S20','W13S20','W12S20','W11S20','W10S20','W9S20','W8S20','W7S20','W6S20','W5S20','W5S21','W4S21'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20','W8S20','W7S20','W6S20','W6S21','W5S21','W4S21'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20','W8S20','W7S20','W6S20','W6S21','W5S21','W4S21','W4S22'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20','W8S20','W7S20','W6S20','W6S21','W5S21'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W11S20'])
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
                terminalEnergyCap:100000,
                upgradeRate: RATE_VERY_SLOW,
                makeResource:RESOURCE_GHODIUM,
                //boostResources:[RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_OXIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_HYDRIDE],
                //boostResources:[RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ALKALIDE],
                labComplex:new LabComplex( rp( 14,37,'W21S22' ),TOP_RIGHT,600,7),
                imports:[
                    {resource_type:RESOURCE_LEMERGIUM,storageCap:48000},
                    {resource_type:RESOURCE_ZYNTHIUM,storageCap:48000},
                    {resource_type:RESOURCE_KEANIUM,storageCap:48000},
                    {resource_type:RESOURCE_UTRIUM,storageCap:48000},
                    {resource_type:RESOURCE_HYDROGEN,storageCap:48000},
                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:20000,batchSize:10000},
                ]

            }),
            b: new RoomNode('Beta', {
                retreatSpot:rp(25,25,'W22S17'),
                anchor:rp(13,15,'W22S17'),spawnFacing:LEFT,
                buildFast: false,
                upgradeRate: RATE_VERY_SLOW,
                terminalEnergyCap:200000,
                imports:[
                    /*{resource_type:RESOURCE_ENERGY,storageCap:100000},*/
                ],

                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:40000,batchSize:10000},
                    {resource_type:RESOURCE_LEMERGIUM,exportOver:0,batchSize:10000},
                    {resource_type:RESOURCE_HYDROGEN,exportOver:0,batchSize:10000},
                    {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:10000},
                ]

            }),
            g: new RoomNode('Gamma', {
                retreatSpot:rp(25,25,'W32S22'),
                anchor:rp(6,14,'W32S22'),spawnFacing:TOP,
                buildFast: false,
                upgradeRate: RATE_VERY_SLOW,
                surplusRequired:25000,
                terminalEnergyCap:200000,
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],

                exports:[
                   /* {resource_type:RESOURCE_ENERGY,exportOver:25000,batchSize:10000},*/
                    {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:10000},
                    {resource_type:RESOURCE_UTRIUM,exportOver:0,batchSize:10000},
                ]
            }),
            d: new RoomNode('Delta', {
                retreatSpot:rp(40,36,'W25S22'),
                anchor:rp(28,35,'W25S22'),spawnFacing:TOP,armFacing:RIGHT,armAnchor:rp(24,37,'W25S22'),
                allowCPUShutdown:true,
                buildTerminal: true,
                extractMineral:true,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000
            }),
            e: new RoomNode('Epsilon', {
                retreatSpot:rp(20,21,'W8S24'),
                anchor:rp(32,26,'W8S24'),spawnFacing:TOP,
                allowCPUShutdown:true,
                buildTerminal: true,
                extractMineral:true,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],
                exports:[
                    {resource_type:RESOURCE_HYDROGEN,exportOver:0,batchSize:10000},
                ],
                surplusRequired:25000
            }),
            z: new RoomNode('Zeta', {
                retreatSpot:rp(20,21,'W13S24'),
                anchor:rp(28,4,'W13S24'),spawnFacing:TOP,armFacing:RIGHT,armAnchor:rp(24,6,'W13S24'),
                buildTerminal: true,
                extractMineral:true,
                buildFast: false,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000,
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],
                exports:[
                    {resource_type:RESOURCE_UTRIUM,exportOver:0,batchSize:10000},
                ]
            }),
            t: new RoomNode('Theta', {
                retreatSpot:rp(32,25,'W33S25'),
                anchor:rp(21,19,'W33S25'),spawnFacing:TOP,armFacing:LEFT,armAnchor:rp(26,20,'W33S25'),
                buildTerminal: true,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:10000,
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],
                exports:[
                    {resource_type:RESOURCE_KEANIUM,exportOver:0,batchSize:10000},
                ]
            }),
            i: new RoomNode('Iota', {
                retreatSpot:rp(22,25,'W22S25'),
                anchor:rp(22,30,'W22S25'),spawnFacing:LEFT,armFacing:RIGHT,armAnchor:rp(20,30,'W22S25'),
                buildTerminal: false,
                extractMineral:true,
                buildFast: false,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000
            }),
            k: new RoomNode('Kappa', {
                retreatSpot:rp(30,20,'E1S23'),
                anchor:rp(10,37,'E1S23'),spawnFacing:LEFT,armFacing:TOP,armAnchor:rp(5,28,'E1S23'),
                buildTerminal: false,
                extractMineral:true,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000
            })
        }
    }
};




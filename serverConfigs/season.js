// hello world
gui.nodeStats = true;
gui.remoteStats = false;
gui.speedRunStats = false;
gui.tradeStats = false;
gui.nodeSrcStats = false;
gui.nodeControllerStats =false;
gui.showDropStats = false;
logs.runRCLSpeedStats = false;
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20','W8S20','W7S20','W6S20','W6S21','W5S21','W4S21'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20','W8S20','W7S20','W6S20','W6S21','W5S21','W4S21','W4S22'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20','W8S20','W7S20','W6S20','W6S21','W5S21'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W9S20'])
mb.createMapRoute(['W13S24','W12S24','W12S23','W11S23','W11S22','W10S22','W10S21','W10S20','W11S20'])

// From Kappa
mb.createMapRoute(['E8S15','E9S15','E10S15','E11S15','E12S15','E13S15','E14S15','E15S15','E16S15','E17S15','E18S15','E18S14'])

// From Alpha
// From Epsilon
mb.createMapRoute(['W8S24','W7S24','W6S24','W5S24','W5S23','W5S22','W5S21','W5S20','W4S20','W3S20','W2S20','W2S19','W1S19','W1S18'])
mb.createMapRoute(['W8S24','W7S24','W6S24','W5S24','W5S23','W5S22','W5S21','W4S21'])
mb.createMapRoute(['W8S24','W7S24','W6S24','W5S24','W5S23','W4S23','W4S22','W3S22','W2S22','W2S21','W2S20','W1S20','W0S20','E0S20','E1S20','E2S20','E2S19'])

// from Zeta
mb.createMapRoute(['W13S24','W12S24','W12S25','W11S25','W10S25','W9S25','W8S25','W8S24','W7S24','W6S24','W6S24','W5S23', 'W5S22','W5S21','W4S21'])
//mb.createMapRoute(['E1S23','E2S23','E2S22','E3S22','E4S22','E4S21'])
//mb.createMapRoute(['E1S23','E2S23','E3S23','E3S24','E3S25','E4S25','E5S25','E6S25','E7S25','E8S25','E8S26'])

// from Theta
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E11S30','E12S30','E12S31'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E11S30','E12S30','E13S30','E14S30','E15S30','E15S31'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E11S30','E12S30','E13S30','E14S30','E15S30','E15S31','E15S32'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E10S31','E10S32','E10S33'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E10S31','E10S32','E10S33','E11S33'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E10S31','E10S32','E10S33','E11S33','E12S33'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E11S30','E12S30','E12S31','E12S32'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E11S30','E12S30','E12S31','E12S32','E13S32'])
mb.createMapRoute(['E8S26','E8S27','E9S27','E10S27','E10S28','E10S29','E10S30','E11S30','E12S30','E12S31','E12S32','E13S32','E14S32'])
mb.createMapRoute(['E8S26','E8S27','E7S27','E7S28','E7S29','E7S30','E7S31','E7S32'])
mb.createMapRoute(['E8S26','E9S26','E10S26','E10S25','E10S24','E11S24','E12S24','E13S24','E14S24','E14S23','E13S23','E13S22'])
mb.createMapRoute(['E8S26','E9S26','E10S26','E10S25','E10S24','E11S24','E12S24','E13S24','E14S24','E14S23','E15S23','E16S23','E17S23','E18S23','E18S22'])

require('global.season6');

module.exports = {
    allowRespawnDetection:false,
    cpuLimit:100,
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {
                wallHeight:1000000,
                rampHeight:1000000,
                retreatSpot:rp(25,25,'E15S32'),
                anchor:rp(33,7,'E15S32'),spawnFacing:TOP,
                buildFast: false,
                extractMineral:false,
                //terminalEnergyCap:200000,
                upgradeRate: RATE_VERY_FAST,
               // makeResource:RESOURCE_HYDROXIDE,
                //boostResources:[RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID],
                //boostResources:[RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ALKALIDE],
                //labComplex:new LabComplex( rp( 14,37,'W21S22' ),TOP_RIGHT,600,7),
                imports:[
                   // {resource_type:RESOURCE_OXYGEN,storageCap:500},
                ],
                exports:[
                    //{resource_type:RESOURCE_ENERGY,exportOver:20000,batchSize:10000},
                ]

            }),
            b: new RoomNode('Beta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(30,30,'E7S32'),
                anchor:rp(18,21,'E7S32'),spawnFacing:TOP,
                buildFast: false,
                upgradeRate: RATE_SLOW,
                terminalEnergyCap:50000,
                imports:[
                  //  {resource_type:RESOURCE_ENERGY,storageCap:500000},
                ],

                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                    //{resource_type:RESOURCE_LEMERGIUM,exportOver:0,batchSize:10000},
                    {resource_type:RESOURCE_HYDROGEN,exportOver:0,batchSize:10000},
                    //{resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:10000},
                ]

            }),
            g: new RoomNode('Gamma', {
                online:false,
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(22,31,'E13S24'),
                anchor:rp(28,21,'E13S24'),spawnFacing:LEFT,
                buildFast: false,
                extractMineral:false,
                towersBuildWalls:false,
                upgradeRate: RATE_SLOW,
                surplusRequired:5000,
                terminalEnergyCap:50000,
                upgradeBoostPlan:[
                    /*{resource_type:RESOURCE_GHODIUM_ACID,lab_id:'65de7f3dc07674e00ab3db83'}*/
                ],
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:400000},
                   // {resource_type:RESOURCE_GHODIUM_ACID,storageCap:12000},

                ],
                exports:[
                    {resource_type:RESOURCE_GHODIUM_ACID,exportOver:0,batchSize:6000},
                    {resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                   /* {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:10000},
                    {resource_type:RESOURCE_UTRIUM,exportOver:0,batchSize:10000},
                    {resource_type:RESOURCE_UTRIUM_LEMERGITE,exportOver:0,batchSize:10000},*/
                ]
            }),
            d: new RoomNode('Delta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(40,36,'E6S18'),
                anchor:rp(25,20,'E6S18'),spawnFacing:TOP,

                buildTerminal: true,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_SLOW,
                terminalEnergyCap:50000,
                //funnelRoomName:'W25S23',
                imports:[
                   // {resource_type:RESOURCE_ENERGY,storageCap:100000},

                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                ],
                surplusRequired:25000
            }),
            e: new RoomNode('Epsilon', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(35,27,'E27S21'),
                anchor:rp(31,21,'E27S21'),spawnFacing:TOP,
                allowCPUShutdown:true,
                buildTerminal: false,
                extractMineral:false,
                buildFast: false,
                terminalEnergyCap:200000,
                surplusRequired:10000,
                upgradeRate: RATE_VERY_FAST,
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],
                exports:[
                   // {resource_type:RESOURCE_ENERGY,exportOver:10000,batchSize:200000},
                ],
                surplusRequired:25000
            }),
            z: new RoomNode('Zeta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(20,21,'E13S22'),
                anchor:rp(23,33,'E13S22'),spawnFacing:TOP,
                buildTerminal: true,
                extractMineral:false,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:50000,
                imports:[
                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:5000,batchSize:200000},
                ]
            }),
            t: new RoomNode('Theta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(32,25,'E8S26'),
                anchor:rp(19,28,'E8S26'),spawnFacing:TOP,
                allowCPUShutdown:true,
                buildTerminal: true,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_VERY_SLOW,
                terminalEnergyCap:50000,
                surplusRequired:10000,
                makeResource:RESOURCE_GHODIUM_HYDRIDE,
                boostResources:[RESOURCE_LEMERGIUM_OXIDE],
                labComplex:new LabComplex( rp( 16,37,'E8S26' ),TOP_RIGHT,600,7),
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:50000},
                    {resource_type:RESOURCE_CATALYST,storageCap:6000},
                    {resource_type:RESOURCE_ZYNTHIUM,storageCap:6000},
                    {resource_type:RESOURCE_UTRIUM,storageCap:48000},
                    {resource_type:RESOURCE_LEMERGIUM,storageCap:60000},
                    {resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:90000},
                    {resource_type:RESOURCE_LEMERGIUM_ALKALIDE,storageCap:90000},
                    {resource_type:RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,storageCap:90000},
                    {resource_type:RESOURCE_UTRIUM_LEMERGITE,storageCap:90000},
                    {resource_type:RESOURCE_ZYNTHIUM_KEANITE,storageCap:90000},
                    {resource_type:RESOURCE_KEANIUM,storageCap:6000},
                    {resource_type:RESOURCE_OXYGEN,storageCap:12000},
                    {resource_type:RESOURCE_HYDROGEN,storageCap:12000},
                    {resource_type:RESOURCE_ZYNTHIUM_HYDRIDE,storageCap:6000},
                    {resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                    {resource_type:RESOURCE_ZYNTHIUM_ALKALIDE,storageCap:18000},
                    {resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:18000},

                    {resource_type:RESOURCE_GHODIUM_HYDRIDE,storageCap:18000},
                    {resource_type:RESOURCE_GHODIUM_ALKALIDE,storageCap:18000},
                    {resource_type:RESOURCE_GHODIUM_OXIDE,storageCap:18000},
                    {resource_type:RESOURCE_CATALYZED_GHODIUM_ALKALIDE,storageCap:18000},
                    {resource_type:RESOURCE_HYDROXIDE,storageCap:18000},
                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                    {resource_type:RESOURCE_GHODIUM_ACID,exportOver:0,batchSize:10000},
                    //{resource_type:RESOURCE_UTRIUM_LEMERGITE,exportOver:0,batchSize:12000},
                    //{resource_type:RESOURCE_ZYNTHIUM_KEANITE,exportOver:0,batchSize:12000},
                ]
            }),
            i: new RoomNode('Iota', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(28,8,'E2S19'),
                anchor:rp(29,18,'E2S19'),spawnFacing:TOP,
                armFacing:LEFT,armAnchor:rp(35,18,'E2S19'),
                buildTerminal: true,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_SLOW,
                terminalEnergyCap:50000,
                surplusRequired:25000,
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                    {resource_type:RESOURCE_OXYGEN,exportOver:0,batchSize:10000},
                ],
            }),
            k: new RoomNode('Kappa', {
                wallHeight:1000000,
                rampHeight:1000000,
                //online:false,
                //noWorkers:true,
                retreatSpot:rp(30,20,'E8S15'),
                anchor:rp(19,35,'E8S15'),spawnFacing:TOP,
                buildTerminal: false,
                extractMineral:false,
                buildFast: false,
                allowCPUShutdown:true,
               // online:false,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000
            }),
            l: new RoomNode('Lambda', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(20,21,'E18S22'),
                anchor:rp(34,18,'E18S22'),spawnFacing:TOP,
                buildTerminal: true,
                extractMineral:false,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:50000,
                imports:[
                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:5000,batchSize:200000},
                ]
            }),
        }
    }
};




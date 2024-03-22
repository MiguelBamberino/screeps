// hello world
gui.nodeStats = true;
gui.remoteStats = false;
gui.speedRunStats = false;
gui.tradeStats = false;
gui.nodeSrcStats = false;
gui.nodeControllerStats =false;
gui.showDropStats = false;
logs.runRCLSpeedStats = false;

// Alpha

// From Kappa
mb.createMapRoute(['E8S15','E9S15','E10S15','E11S15','E12S15','E13S15','E14S15','E15S15','E16S15','E17S15','E18S15','E18S14'])

// From Gamma
mb.createMapRoute(['E32S18','E33S18','E33S17','E34S17','E35S17','E35S16','E35S15','E36S15','E37S15','E38S15','E38S16'])

// Mu
mb.createMapRoute(['E28S21','E29S21','E30S21','E30S22','E30S23','E30S24','E30S25','E30S26','E30S27','E30S28','E30S29','E30S30'])
mb.createMapRoute(['E28S21','E29S21','E30S21','E30S22','E30S23','E30S24','E30S25','E30S26','E30S27','E30S28','E30S29','E30S30','E30S31','E30S32','E31S32'])
mb.createMapRoute(['E28S21','E29S21','E30S21','E30S22','E30S23','E30S24','E30S25','E30S26','E30S27','E30S28','E30S29','E30S30','E30S31','E29S31','E28S31','E28S32'])
mb.createMapRoute(['E28S21','E29S21','E30S21','E30S22','E30S23','E30S24','E30S25','E30S26','E30S27','E30S28','E30S29','E30S30','E31S30','E32S30','E33S30','E34S30','E35S30'])
mb.createMapRoute(['E28S21','E29S21','E30S21','E30S22','E30S23','E30S24','E30S25','E30S26','E30S27','E30S28','E30S29','E30S30','E31S30','E32S30','E33S30','E34S30','E35S30','E36S30'])

// From Gamma
mb.createMapRoute(['E29S25','E29S26','E30S26','E30S27','E30S28','E30S29','E30S30','E30S31','E30S32','E31S32'])

// from Zeta
mb.createMapRoute(['W13S24','W12S24','W12S25','W11S25','W10S25','W9S25','W8S25','W8S24','W7S24','W6S24','W6S24','W5S23', 'W5S22','W5S21','W4S21'])
//mb.createMapRoute(['E1S23','E2S23','E2S22','E3S22','E4S22','E4S21'])
//mb.createMapRoute(['E1S23','E2S23','E3S23','E3S24','E3S25','E4S25','E5S25','E6S25','E7S25','E8S25','E8S26'])

// from Iota
mb.createMapRoute(['E31S32','E32S32','E32S31','E32S30','E33S30','E34S30','E35S30','E36S30','E36S31','E35S31','E34S31'])

require('global.season6');


module.exports = {
    allowRespawnDetection:false,
    cpuLimit:100,
    loadNodes(){
        return {
            a: new RoomNode('Alpha', {
                wallHeight:1000000,
                rampHeight:2000000,
                retreatSpot:rp(25,25,'E15S32'),
                anchor:rp(33,7,'E15S32'),spawnFacing:TOP,
                buildFast: false,
                extractMineral:false,
                terminalEnergyCap:50000,
                surplusRequired:75000,
                upgradeRate: RATE_VERY_SLOW,
                 makeResource:RESOURCE_HYDROXIDE,
                //boostResources:[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_UTRIUM_ACID,RESOURCE_GHODIUM_ALKALIDE],
               // boostResources:[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID, RESOURCE_GHODIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_UTRIUM_ACID,RESOURCE_LEMERGIUM_OXIDE],
                //boostResources:[RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ALKALIDE],
                labComplex:new LabComplex( rp( 29,10,'E15S32' ),TOP_RIGHT,600,7),
                imports:[
                   // {resource_type:RESOURCE_ENERGY,storageCap:100000},

                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:10000,batchSize:200000},
                ]

            }),
            b: new RoomNode('Beta', {
                online:true,
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(30,30,'E33S24'),
                anchor:rp(26,20,'E33S24'),spawnFacing:LEFT,
                armFacing:RIGHT,armAnchor:rp(29,26,'E33S24'),
                buildFast: false,
                upgradeRate: RATE_SLOW,
               // terminalEnergyCap:50000,

                upgradeBoostPlan:[
                    {resource_type:RESOURCE_GHODIUM_ACID,lab_id:'65fb605ab9e70ca4ee303127'}
                ],
                imports:[
                      {resource_type:RESOURCE_GHODIUM_ACID,storageCap:12000},
                      //{resource_type:RESOURCE_ENERGY,storageCap:100000},
                      {resource_type:RESOURCE_CATALYST,storageCap:100000},
                      {resource_type:RESOURCE_OXYGEN,storageCap:100000},
                      {resource_type:RESOURCE_HYDROGEN,storageCap:100000},
                      {resource_type:RESOURCE_UTRIUM,storageCap:100000},
                      {resource_type:RESOURCE_LEMERGIUM,storageCap:100000},
                      {resource_type:RESOURCE_ZYNTHIUM,storageCap:100000},

                    {resource_type:RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,storageCap:100000},
                    {resource_type:RESOURCE_CATALYZED_ZYNTHIUM_ACID,storageCap:100000},
                ],

                exports:[
                    {resource_type:RESOURCE_OXYGEN,exportOver:0,batchSize:50000},
                    {resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                ]

            }),
            g: new RoomNode('Gamma', {
                online:true,
                wallHeight:1000000,
                rampHeight:1000000,
                retreatSpot:rp(22,31,'E32S18'),
                anchor:rp(20,15,'E32S18'),spawnFacing:TOP,
                //armFacing:TOP,armAnchor:rp(17,24,'E28S21'),
                buildFast: true,
                buildTerminal: true,
                extractMineral:true,
                towersBuildWalls:false,
                upgradeRate: RATE_SLOW,
                surplusRequired:25000,
                terminalEnergyCap:50000,
                //labComplex:new LabComplex( rp( 15,28,'E32S18' ),TOP_RIGHT,1000,7),
                upgradeBoostPlan:[
                    /*{resource_type:RESOURCE_GHODIUM_ACID,lab_id:'65de7f3dc07674e00ab3db83'}*/
                ],
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:400000},
                     {resource_type:RESOURCE_LEMERGIUM,storageCap:6000},
                     {resource_type:RESOURCE_UTRIUM,storageCap:6000},
                     {resource_type:RESOURCE_KEANIUM,storageCap:6000},
                     {resource_type:RESOURCE_ZYNTHIUM,storageCap:6000},
                     {resource_type:RESOURCE_OXYGEN,storageCap:6000},
                     {resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                     {resource_type:RESOURCE_ZYNTHIUM_HYDRIDE,storageCap:12000},
                     {resource_type:RESOURCE_ZYNTHIUM_KEANITE,storageCap:2000},

                ],
                exports:[
                    {resource_type:RESOURCE_GHODIUM_ACID,exportOver:0,batchSize:6000},
                    {resource_type:RESOURCE_HYDROGEN,exportOver:12000,batchSize:6000},
                    //{resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                    /* {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:10000},
                     {resource_type:RESOURCE_UTRIUM,exportOver:0,batchSize:10000},
                     {resource_type:RESOURCE_UTRIUM_LEMERGITE,exportOver:0,batchSize:10000},*/
                ]
            }),
            d: new RoomNode('Delta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(40,36,'E34S31'),
                anchor:rp(27,33,'E34S31'),spawnFacing:LEFT,
                armFacing:BOTTOM,armAnchor:rp(33,28,'E34S31'),
                buildTerminal: false,
                extractMineral:false,
                allowCPUShutdown:true,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
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
                online:false,
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(31,29,'E38S16'),
                anchor:rp(33,22,'E38S16'),spawnFacing:LEFT,
                allowCPUShutdown:true,
                buildTerminal: false,
                extractMineral:false,
                buildFast: true,
                terminalEnergyCap:200000,
                surplusRequired:10000,
                upgradeRate: RATE_VERY_FAST,
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],
                exports:[
                    // {resource_type:RESOURCE_ENERGY,exportOver:10000,batchSize:200000},
                ],
            }),
            z: new RoomNode('Zeta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(20,21,'E38S33'),
                anchor:rp(22,38,'E38S33'),spawnFacing:TOP,
                allowCPUShutdown:true,
                buildTerminal: false,
                extractMineral:false,
                buildFast: true,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:500000,
                terminalEnergyCap:50000,
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:100000},
                ],
                exports:[
                   // {resource_type:RESOURCE_ENERGY,exportOver:5000,batchSize:50000},
                ]
            }),
            t: new RoomNode('Theta', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(20,18,'E28S32'),
                anchor:rp(22,23,'E28S32'),spawnFacing:TOP,
                allowCPUShutdown:false,
                buildTerminal: false,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_VERY_FAST,
                //terminalEnergyCap:50000,
                surplusRequired:50000,
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:50000},
                ],
                exports:[
                ]
            }),
            i: new RoomNode('Iota', {
                wallHeight:500000,
                rampHeight:500000,
                retreatSpot:rp(12,30,'E31S32'),
                anchor:rp(17,23,'E31S32'),spawnFacing:LEFT,
                armFacing:RIGHT,armAnchor:rp(19,17,'E31S32'),
                buildTerminal: false,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_VERY_FAST,
                //terminalEnergyCap:200000,
                surplusRequired:5000,
                allowCPUShutdown:false,
                exports:[
                    //{resource_type:RESOURCE_ENERGY,exportOver:5000,batchSize:200000},
                    ]
            }),
            k: new RoomNode('Kappa', {
                wallHeight:750000,
                rampHeight:1000000,
                online:true,
                //noWorkers:true,
                retreatSpot:rp(22,14,'E22S32'),
                anchor:rp(20,18,'E22S32'),spawnFacing:LEFT,
                armFacing:LEFT,armAnchor:rp(26,20,'E22S32'),
                buildTerminal: false,
                extractMineral:false,
                buildFast: true,
                allowCPUShutdown:false,
                // online:false,
                upgradeRate: RATE_VERY_FAST,
                surplusRequired:25000,
                exports:[
                    //{resource_type:RESOURCE_ENERGY,exportOver:5000,batchSize:200000},

                ],
            }),
            l: new RoomNode('Lambda', {
                wallHeight:1000000,
                rampHeight:2000000,
                retreatSpot:rp(20,21,'E18S22'),
                anchor:rp(34,18,'E18S22'),spawnFacing:TOP,
                buildTerminal: true,
                extractMineral:false,
                buildFast: false,
                upgradeRate: RATE_SLOW,
                surplusRequired:20000,
                terminalEnergyCap:100000,
                imports:[
                    //{resource_type:RESOURCE_ENERGY,storageCap:600000},

                ],
                exports:[
                    {resource_type:RESOURCE_ENERGY,exportOver:20000,batchSize:100000},
                ]
            }),
            m: new RoomNode('Mu', {
                online:true,
                wallHeight:2000000,
                rampHeight:2000000,
                retreatSpot:rp(22,31,'E28S21'),
                anchor:rp(9,25,'E28S21'),spawnFacing:LEFT,
                armFacing:TOP,armAnchor:rp(17,24,'E28S21'),
                buildFast: true,
                extractMineral:true,
                upgradeRate: RATE_SLOW,
                surplusRequired:25000,
                terminalEnergyCap:50000,
                makeResource:RESOURCE_HYDROXIDE,
               // boostResources:[RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_ZYNTHIUM_ACID,RESOURCE_UTRIUM_ACID,RESOURCE_ZYNTHIUM_ALKALIDE],
                labComplex:new LabComplex( rp( 20,24,'E28S21' ),BOTTOM_LEFT,1000,7),
                upgradeBoostPlan:[
                    /*{resource_type:RESOURCE_GHODIUM_ACID,lab_id:'65de7f3dc07674e00ab3db83'}*/
                ],
                imports:[
                    {resource_type:RESOURCE_ENERGY,storageCap:100000},

                ],
                exports:[
                    //{resource_type:RESOURCE_ENERGY,exportOver:50000,batchSize:50000},
                     {resource_type:RESOURCE_ZYNTHIUM,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_OXYGEN,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_OXYGEN,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_HYDROGEN,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_UTRIUM,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_KEANIUM,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_CATALYST,exportOver:0,batchSize:12000},
                     {resource_type:RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,exportOver:0,batchSize:6000},
                     {resource_type:RESOURCE_CATALYZED_ZYNTHIUM_ACID,exportOver:0,batchSize:6000},
                     {resource_type:RESOURCE_LEMERGIUM,exportOver:0,batchSize:6000},
                     {resource_type:RESOURCE_LEMERGIUM_OXIDE,exportOver:0,batchSize:6000},
                     {resource_type:RESOURCE_ZYNTHIUM_KEANITE,exportOver:0,batchSize:6000},
                     {resource_type:RESOURCE_ZYNTHIUM_HYDRIDE,exportOver:0,batchSize:6000},
                     {resource_type:RESOURCE_GHODIUM_ACID,exportOver:0,batchSize:12000},
                ]
            }),
        }
    }
};




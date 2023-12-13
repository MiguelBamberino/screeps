/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('_shard_config');
 * mod.thing == 'a thing'; // true
 */

const roomNode = require('class.roomNode');
const LabComplex = require('class.complex.lab')
module.exports = {
    createRoomNodes:function(shard){
        
        if(shard==='shard3')return this.createShard3RoomNodes();
        if(shard==='private')return this.createLocalServerRoomNodes();
        if(shard==='sim')return this.createShardSimRoomNodes();
        if(shard==='botarena')return this.createBotArenaRoomNodes();
            
        return {};
    },
    createBotArenaRoomNodes:function(){
        let nodes = {};
        if(Game.spawns['Alpha']){
                let spwn = Game.spawns['Alpha']
                nodes['a']= new roomNode(spwn.name,spwn.pos.roomName,
                                        {
                                            spawnFacing:TOP,
                                            retreatSpot:rp(spwn.pos.x-2,spwn.pos.y+2,spwn.pos.roomName),
                                            extraFastFillSpots:[],
                                            upgradeRate:RATE_SLOW,
                                            buildFast:false,/*
                                            labComplex:new LabComplex(rp(spwn.pos.x+3,spwn.pos.y+5,spwn.pos.roomName),TOP_LEFT),
                                            makeResource: RESOURCE_HYDROXIDE*/
                                        }
                    )
        }
        if(Game.spawns['Beta']){
                let spwn = Game.spawns['Beta']
                nodes['b']= new roomNode(spwn.name,spwn.pos.roomName,
                                        {
                                            spawnFacing:TOP,
                                            retreatSpot:rp(spwn.pos.x-2,spwn.pos.y+2,spwn.pos.roomName),
                                            extraFastFillSpots:[],
                                            upgradeRate:RATE_SLOW,
                                            buildFast:false,/*
                                            labComplex:new LabComplex(rp(spwn.pos.x+3,spwn.pos.y+5,spwn.pos.roomName),TOP_LEFT),
                                            makeResource: RESOURCE_HYDROXIDE*/
                                        }
                    )
        }
        if(Game.spawns['Gamma']){
                let spwn = Game.spawns['Gamma']
                nodes['g']= new roomNode(spwn.name,spwn.pos.roomName,
                                        {
                                            spawnFacing:TOP,
                                            retreatSpot:rp(spwn.pos.x-2,spwn.pos.y+2,spwn.pos.roomName),
                                            extraFastFillSpots:[],
                                            upgradeRate:RATE_SLOW,
                                            buildFast:false,/*
                                            labComplex:new LabComplex(rp(spwn.pos.x+3,spwn.pos.y+5,spwn.pos.roomName),TOP_LEFT),
                                            makeResource: RESOURCE_HYDROXIDE*/
                                        }
                    )
        }
        return nodes;
    },
    createLocalServerRoomNodes:function(){

        return this.createBotArenaRoomNodes();
    },
    createShardSimRoomNodes:function(){
        let nodes = {};
            let spwn = Game.spawns['Alpha']
            nodes['a']= new roomNode(spwn.name,spwn.pos.roomName,
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(spwn.pos.x-2,spwn.pos.y+2,spwn.pos.roomName),
                                        extraFastFillSpots:[],
                                        upgradeRate:RATE_SLOW,
                                        buildFast:false,
                                        labComplex:new LabComplex(rp(spwn.pos.x+4,spwn.pos.y+5,spwn.pos.roomName),TOP_LEFT),
                                        makeResource: RESOURCE_HYDROXIDE
                                    }
                )
        return nodes;
    },
    createShard3RoomNodes:function(){
        let nodes={};
        
        nodes['a']= new roomNode('Alpha','W42N53',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(17,25,'W42N53'),
                                        extraFastFillSpots:[],
                                        upgradeRate:RATE_SLOW,
                                        buildFast:false,
                                        armNuke:true,
                                        wallHeight:10010001,
                                        terminalEnergyCap:100000,
                                        imports:[
                                            {resource_type:RESOURCE_GHODIUM,storageCap:6000}
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_OXYGEN,exportOver:50000,batchSize:100000}
                                        ]
                                    }
        );
        
        
        nodes['b']= new roomNode('Beta','W41N53',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(36,32,'W41N53'),
                                        extraFastFillSpots:[],
                                        upgradeRate:RATE_VERY_SLOW,
                                        buildFast:false,
                                        towersBuildWalls:false,
                                        armNuke:true,
                                        terminalEnergyCap:100000,
                                        labComplex:new LabComplex(rp(33,32,'W41N53'),TOP_LEFT),
                                        makeResource:RESOURCE_ZYNTHIUM_KEANITE,
                                        imports:[
                                            {resource_type:RESOURCE_GHODIUM,storageCap:6000},
                                            {resource_type:RESOURCE_HYDROGEN,storageCap:24000}, 
                                            {resource_type:RESOURCE_HYDROXIDE,storageCap:24000}, 
                                            {resource_type:RESOURCE_KEANIUM,storageCap:6000},  
                                            // military
                                            
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_ZYNTHIUM_KEANITE,exportOver:1,batchSize:50000},
                                            {resource_type:RESOURCE_UTRIUM_LEMERGITE,exportOver:1,batchSize:50000},
											{resource_type:RESOURCE_OXYGEN,exportOver:24000,batchSize:50000},
                                            {resource_type:RESOURCE_ZYNTHIUM_OXIDE,exportOver:6000,batchSize:12000},
                                            {resource_type:RESOURCE_ZYNTHIUM_ACID,exportOver:6000,batchSize:12000},
                                            {resource_type:RESOURCE_LEMERGIUM_OXIDE,exportOver:6000,batchSize:12000},
                                            {resource_type:RESOURCE_LEMERGIUM_ALKALIDE,exportOver:6000,batchSize:12000},
                                        ]
                                    }
        
        );
        
        /*
        nodes['g']=new roomNode('Gamma','W13N15',
                                    {
                                        spawnFacing:LEFT,
                                        retreatSpot:rp(12,23,'W13N15'),
                                        extraFastFillSpots:[rp(10,30,'W13N15'),rp(12,30,'W13N15'),rp(10,26,'W13N15'),rp(12,26,'W13N15'),rp(21,24,'W13N15'),rp(23,24,'W13N15') ],
                                        wallHeight:1000000,
                                        upgradeRate: RATE_VERY_SLOW,
                                        buildFast:false,
                                        remoteRoomNames:[],
                                        funnelRoomName:''
                                    }
        
        );
        */
        
        nodes['d']= new roomNode('Delta','W41N55',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(17,16,'W41N55'),
                                        buildFast:false,
                                        upgradeRate:RATE_SLOW,
                                        wallHeight:10000001,
                                        extraFastFillSpots:[],
                                        remoteRoomNames:[],
                                        funnelRoomName:'',
                                        labComplex:new LabComplex(rp(18,18,'W41N55'),TOP_RIGHT),
                                        makeResource:RESOURCE_ZYNTHIUM_KEANITE,
                                        exports:[
											{resource_type:RESOURCE_ZYNTHIUM,exportOver:6000,batchSize:12000},
                                            {resource_type:RESOURCE_HYDROGEN,exportOver:6000,batchSize:12000},
                                            {resource_type:RESOURCE_KEANIUM,exportOver:6000,batchSize:12000},
                                            {resource_type:RESOURCE_ZYNTHIUM_KEANITE,exportOver:6000,batchSize:12000},
                                        ]
                                    }
        );
        
        
        nodes['e']= new roomNode('Epsilon','W41N54',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(32,30,'W41N54'),
                                        buildFast:false,
                                        upgradeRate:RATE_VERY_SLOW,
                                        armNuke:true,
                                        extraFastFillSpots:[],
                                        terminalEnergyCap:120000,
                                        labComplex:new LabComplex(rp(37,26,'W41N54'),TOP_LEFT),
                                        makeResource:RESOURCE_GHODIUM,
                                        imports:[
                                            {resource_type:RESOURCE_OXYGEN,storageCap:12000},
                                            {resource_type:RESOURCE_GHODIUM_OXIDE,storageCap:12000},
                                            
                                            {resource_type:RESOURCE_UTRIUM_LEMERGITE,storageCap:12000},
                                            {resource_type:RESOURCE_ZYNTHIUM_KEANITE,storageCap:12000},
                                            // military
                                            {resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_ALKALIDE,storageCap:6000},
                                            {resource_type:RESOURCE_UTRIUM_ACID,storageCap:6000},
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_GHODIUM,exportOver:12000,batchSize:50000},
                                            {resource_type:RESOURCE_HYDROGEN,exportOver:24000,batchSize:48000},
                                            {resource_type:RESOURCE_HYDROXIDE,exportOver:24000,batchSize:24000}
                                            ]
                                    }
        );
        
        nodes['z']= new roomNode('Zeta','W42N52',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(14,20,'W42N52'),
                                        buildFast:false,
                                        upgradeRate:RATE_VERY_SLOW,
                                        armNuke:true,
                                        extraFastFillSpots:[],
                                        remoteRoomNames:[],
                                        funnelRoomName:'',
                                        terminalEnergyCap:15000,
                                        wallHeight:3000000,
                                        labComplex:new LabComplex(rp(20,36,'W42N52'),BOTTOM_RIGHT),
                                        //makeResource:RESOURCE_,
                                        imports:[
                                            {resource_type:RESOURCE_OXYGEN,storageCap:12000},
                                            {resource_type:RESOURCE_GHODIUM,storageCap:6000},
                                            // military
                                            {resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_ALKALIDE,storageCap:6000},
                                            {resource_type:RESOURCE_UTRIUM_ACID,storageCap:6000},
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_KEANIUM,exportOver:24000,batchSize:24000}
                                        ]
                                    }
        );
        
        
        nodes['t']= new roomNode('Theta','W45N51',
                                    {
                                        spawnFacing:RIGHT,
                                        retreatSpot:rp(6,15,'W45N51'),
                                        buildFast:false,
                                        upgradeRate:RATE_VERY_SLOW,
                                        terminalEnergyCap:150000,
                                        towersBuildWalls:false,
                                        armNuke:true,
                                        labComplex:new LabComplex(rp(4,13,'W45N51'),TOP_RIGHT),
                                        makeResource:RESOURCE_UTRIUM_LEMERGITE,
                                        imports:[
                                            {resource_type:RESOURCE_GHODIUM,storageCap:6000},
                                            {resource_type:RESOURCE_OXYGEN,storageCap:12000},
                                            {resource_type:RESOURCE_HYDROGEN,storageCap:12000},
                                            {resource_type:RESOURCE_HYDROXIDE,storageCap:12000},
                                            // military
                                            {resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_ALKALIDE,storageCap:6000},
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_UTRIUM_ACID,exportOver:6000,batchSize:24000},
                                            {resource_type:RESOURCE_UTRIUM_ALKALIDE,exportOver:0,batchSize:24000},
                                            {resource_type:RESOURCE_UTRIUM_LEMERGITE,exportOver:0,batchSize:12000}
                                        ]
                                    }
        );
        
        nodes['i']= new roomNode('Iota','W46N53',
                                    {
                                        spawnFacing:LEFT,
                                        retreatSpot:rp(21,39,'W46N53'),
                                        buildFast:false,
                                        upgradeRate:RATE_VERY_SLOW,
                                        labComplex:new LabComplex(rp(13,40,'W46N53'),TOP_RIGHT),
                                        //makeResource:RESOURCE_HYDROXIDE,
                                        imports:[
                                            {resource_type:RESOURCE_GHODIUM,storageCap:6000},
                                            {resource_type:RESOURCE_HYDROGEN,storageCap:12000},
                                            {resource_type:RESOURCE_ENERGY,storageCap:200000},
                                            // military
                                            {resource_type:RESOURCE_ZYNTHIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_ZYNTHIUM_ACID,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_OXIDE,storageCap:6000},
                                            {resource_type:RESOURCE_LEMERGIUM_ALKALIDE,storageCap:6000},
                                            {resource_type:RESOURCE_UTRIUM_ACID,storageCap:6000},
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_OXYGEN,exportOver:24000,batchSize:24000},
                                            {resource_type:RESOURCE_HYDROXIDE,exportOver:24000,batchSize:24000}
                                            ]
                                    }
        );
        
        nodes['k']= new roomNode('Kappa','W48N54',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(33,29,'W48N54'),
                                        extraFastFillSpots:[],
                                        buildFast:false,
                                        upgradeRate:RATE_VERY_SLOW,
                                        terminalEnergyCap:20000,
                                        armNuke:true,
                                        labComplex:new LabComplex(rp(32,33,'W48N54'),TOP_LEFT),
                                         makeResource:RESOURCE_ZYNTHIUM_ACID,
                                        imports:[
                                            {resource_type:RESOURCE_GHODIUM,storageCap:6000},
                                            {resource_type:RESOURCE_ENERGY,storageCap:100000},
                                            {resource_type:RESOURCE_HYDROGEN,storageCap:12000},
                                            {resource_type:RESOURCE_HYDROXIDE,storageCap:12000},
                                            {resource_type:RESOURCE_OXYGEN,storageCap:12000}
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_ZYNTHIUM_HYDRIDE,exportOver:12000,batchSize:24000},
                                            {resource_type:RESOURCE_ZYNTHIUM,exportOver:24000,batchSize:12000},
                                        ]

                                    }
        );
        
        nodes['l']= new roomNode('Lambda','W48N52',
                                    {
                                        spawnFacing:LEFT,
                                        retreatSpot:rp(32,13,'W48N52'),
                                        extraFastFillSpots:[],
                                        buildFast:false,
                                        armNuke:true,
                                        upgradeRate:RATE_VERY_SLOW,
                                        terminalEnergyCap:20000,
										imports:[
										    {resource_type:RESOURCE_GHODIUM,storageCap:6000},
                                            {resource_type:RESOURCE_ENERGY,storageCap:100000},
                                            {resource_type:RESOURCE_HYDROGEN,storageCap:12000},
                                            {resource_type:RESOURCE_OXYGEN,storageCap:12000}
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_LEMERGIUM,exportOver:50000,batchSize:24000},
                                        ]

                                    }
        );
        nodes['m']= new roomNode('Mu','W43N51',
                                    {
                                        spawnFacing:TOP,
                                        retreatSpot:rp(42,29,'W43N51'),
                                        extraFastFillSpots:[],
                                        buildFast:true,
                                        upgradeRate:RATE_VERY_SLOW,
                                        terminalEnergyCap:20000,
                                        
										imports:[
                                            {resource_type:RESOURCE_ENERGY,storageCap:100000}
                                        ],
                                        exports:[
                                            {resource_type:RESOURCE_CATALYST,exportOver:24000,batchSize:50000},
                                        ]
                                    }
        );
        
        return nodes;
    }
};
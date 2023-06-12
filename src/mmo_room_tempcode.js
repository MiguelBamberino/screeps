 if(false){
            let attackRoomName = 'W37N55';
            let retreatRoom = 'W38N55';
            Game.getObjectById('63fd1ff656dfcecb6ce9893a').observeRoom(attackRoomName)
          /*  let towerIds = [
                '62708c8f71db87ac8e122932','625ac3629381340bad280953','625e9815ed19c525e65a2a20',
                '62c03ee34cf64f6e4ab9b4bb','62c04135eb38557717333bcb','62c043a61b0ea9fd9b02e81f'
                ];*/
            let attackers = ['Slammy','Punchy'];
            let drainerNames = ['Dr0','Dr1','Dr2'];
            //let drainerInRoomPosition = new RoomPosition(9,42,'W39N53'); // Where healers will try to gain a foothold, once towers are weakening

            let drainerBody = '5*1t1m + 20*1h1m';

            
            let roomData = this.buildRoomMeta(
                // enemy room storage id
                '60c5d2bf8c3ae22595eccc6c',
                // enemy tower ids
                [
                    '60d2bdf6803fd40f82ae79b2','60c5f184c47b9f221c044237','60c5e5113afdf1504680e989',
                    /*'62c03ee34cf64f6e4ab9b4bb','62c04135eb38557717333bcb','62c043a61b0ea9fd9b02e81f'*/
                ],
                // enemy room target id, to attack
                '60c5e5113afdf1504680e989',
                new RoomPosition(4,22,attackRoomName) // Where healers will try to gain a foothold, once towers are weakening
                );
            
            if(roomData.total_tower_energy < 500 || roomData.towers_with_energy<3){
                drainerBody = '5*1r1m + 20*1h1m';
            }

            if(Game.creeps['Dr0'])
            this.drainRoom4('Beta-2','Dr0',new RoomPosition(48,23,retreatRoom),drainerBody, drainerNames, attackers, roomData);
            if(Game.creeps['Dr1'])
            this.drainRoom4('Gamma','Dr1',new RoomPosition(48,24,retreatRoom),drainerBody, drainerNames, attackers, roomData);
            if(Game.creeps['Dr2'])
            this.drainRoom4('Beta-3','Dr2',new RoomPosition(48,25,retreatRoom),drainerBody, drainerNames, attackers, roomData);
            
            //if(false) 
            //if(Game.creeps['Slammy'])
            this.attackDuringDrain2('Epsilon-2','Slammy','20*1w1m + 1h1m',  new RoomPosition(47,25,retreatRoom), drainerNames, roomData, 100000);
            
        }

        //#####################################################################################
        // Alpha Tasks
        //#####################################################################################
        //Game.getObjectById('63fd23123e03b762409b458f').observeRoom('W37N55')

        //this.withdrawThenUpgrade('Alpha-2','Au0','5bbcaab49099fc012e632092','641a283114993359865ee78e','25W1C13M',true);
        if(Game.creeps['Ah0'])
        this.haulResources('Alpha-2','Ah0','10c1m',
            {id:'62aa920ea7c97303402bf116',pos:{x:29,y:23,roomName:'W42N53'}},
            {id:'6411a8a7530207f3c2206c75',pos:{x:15,y:22,roomName:'W42N53'}},
            [RESOURCE_ZYNTHIUM,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_UTRIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE],[],4000,3
            /*['W42N53','W42N52','W42N51','W43N51','W44N51','W44N50','W45N50','W46N50','W46N49']*/
            );


        //if(Game.creeps['Ah2'])
        
        //Game.getObjectById('63fd201ac38c3d21f3318244').observeRoom('W46N49')
        /*this.haulResources('Alpha-2','Ah2','1*1m1c',
            {id:'60c90cef9891318f82fa19dd',pos:{x:29,y:23,roomName:'W46N49'}},
            {id:'62aa920ea7c97303402bf116',pos:{x:15,y:22,roomName:'W42N53'}},
            [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_LEMERGIUM_OXIDE],
            ['W42N53','W42N52','W42N51','W43N51','W44N51','W44N50','W45N50','W46N50','W46N49'],4000,1,50);*/
          
          
        //#####################################################################################
        // Beta Tasks
        //##################################################################################### 
        if(Game.creeps['Bh0'])
        this.haulResources('Beta-2','Bh0','10c5m',
            {id:'62c33586215eb2917a2ec866',pos:{x:29,y:23,roomName:'W41N53'}},
            {id:'6411a7ac505b0153911cd744',pos:{x:15,y:22,roomName:'W41N53'}},
            [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_LEMERGIUM_OXIDE,RESOURCE_ZYNTHIUM,RESOURCE_ENERGY],[],2000,3
            /*['W42N53','W42N52','W42N51','W43N51','W44N51','W44N50','W45N50','W46N50','W46N49']*/
            );

        this.withdrawThenUpgrade('Beta-2','Bu0','644253fa841862f67beae187','5bbcaac09099fc012e63221b','25W1C13M',true);
        //this.streamResource('W41N53','Beta-2','Bh0','10m20c','W42N52',RESOURCE_ENERGY,600000,200000);
        
         // WARNING!! make sure to stagger spawning of the 2 farmers so that farmer2 doesn't stand on the fucking container...
        //this.farmStructureAtSpot('Beta-2','Bf0',['62bf037f0587444bb13f00ec','62bf1803f563676f1ee1f835','6114a60e6a8b8864aa038b9b'],new RoomPosition(20,45,'W41N53'),'20W10M');
        //if(Game.creeps['Bf1'])this.farmStructureThenTransfer('Beta-3','Bf1',['6114a611b9da09939f47865a','62bf037f0587444bb13f00ec','6114a60e6a8b8864aa038b9b'],'6436bf9497788e5d9c41ab02','20W10M1C');
        
        
        //#####################################################################################
        // Gamma Tasks
        //##################################################################################### 
        //this.farmStructureAtSpot('Gamma','Gf0',['62dabb5adfb12c8f956e593d','62dabb543b5505095d6b70ae','62dabb4efa004b0d16eb9658'],new RoomPosition(26,26,'W42N54'),'20W10M');
        //this.farmStructureThenTransfer('Gamma','Gf1',['62dabb609eb2a2a6cbb5aabf','62dabb5adfb12c8f956e593d'],'6436c022de83ada3ddf9d1c2','20W10M1C');
        
        //if(Game.creeps['Gh0'])
        //this.streamResource('W42N54','Gamma','Gh0','1m20c','W42N52',RESOURCE_ENERGY,450000,100000);

        //#####################################################################################
        // Delta Tasks
        //##################################################################################### 

        //this.manageReactions('Delta-2','DL0');
        
        
        //#####################################################################################
        // Epsilon Tasks
        //#####################################################################################    
        // ,,RESOURCE_HYDROGEN,,RESOURCE_HYDROXIDE,,,
        let resourcesFromW37N55= [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_UTRIUM,RESOURCE_GHODIUM,
        RESOURCE_UTRIUM_LEMERGITE,RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_HYDROXIDE,RESOURCE_HYDROGEN,RESOURCE_OXYGEN,RESOURCE_LEMERGIUM,RESOURCE_LEMERGIUM_OXIDE];    
        if(Game.creeps['Eh0'])
        this.haulResources('Epsilon-2','Eh0','2*1m1c',
            {id:'60c5d2bf8c3ae22595eccc6c',pos:{x:17,y:24,roomName:'W37N55'}},
            {id:'641492dc152e5bfd96b18ffe',pos:{x:29,y:34,roomName:'W41N54'}},
            resourcesFromW37N55,['W41N54','W40N54','W40N55','W39N55','W38N55','W37N55'],4000,200,100);
       
        //this.startupNewRoom('W39N55','643b0920affb4c600132bd99','Epsilon-2',2);
        
        //#####################################################################################
        // Zeta Tasks
        //#####################################################################################        
        // Game.getObjectById('63fd2138d36cbbcfce799043').observeRoom('W46N53');
        if(Game.creeps['Za1'])
        this.killCreepsBreakTarget('Zeta-2','Za1','W46N53','10a10m','643c6c746a171c53def673ed');
        
        let controller = Game.getObjectById('5bbcaa839099fc012e63185b');
        
        //if(Game.cpu.bucket>4500)this.startupNewRoom('W45N51','63fd23123e03b762409b458f','Zeta-2',1,false,false,false,false,false);
        
        
        
        //#####################################################################################
        // Eta Tasks
        //#####################################################################################   
        if(Game.creeps['bob'])
        this.haulResources('Eta','bob','15*1m1c',
            {id:'63ba19f0cbff1696ad5af96f',pos:{x:20,y:11,roomName:'W47N52'}},
            {id:'64425880602ae58a941fdc18',pos:{x:12,y:40,roomName:'W46N53'}},
            [RESOURCE_ENERGY],[],3000);
        if(Game.creeps['bob2'])
        this.haulResources('Eta','bob2','15*1m1c',
            {id:'63ba19f0cbff1696ad5af96f',pos:{x:20,y:11,roomName:'W47N52'}},
            {id:'64425880602ae58a941fdc18',pos:{x:12,y:40,roomName:'W46N53'}},
            [RESOURCE_ENERGY],[],2500);    
        //#####################################################################################
        // Theta Tasks
        //#####################################################################################     
        //if(Game.creeps['Th0'])
        this.haulResources('Theta-2','Th0','15*1c1m',
            {id:'60c90cef9891318f82fa19dd',pos:{x:29,y:23,roomName:'W46N49'}},
            {id:'64461441034ca322eab680e7',pos:{x:10,y:13,roomName:'W45N51'}},
            [RESOURCE_ENERGY],
            /*['W45N51','W46N51','W46N50','W46N49']*/[]
            ,3000,200 // round-trip=220, so die at age=200
            );
        this.haulResources('Theta-2','Th1','15*1c1m',
            {id:'60c90cef9891318f82fa19dd',pos:{x:29,y:23,roomName:'W46N49'}},
            {id:'64461441034ca322eab680e7',pos:{x:10,y:13,roomName:'W45N51'}},
            [RESOURCE_ENERGY],
            /*['W45N51','W46N51','W46N50','W46N49']*/[]
            ,5000,200 // round-trip=220, so die at age=200
            );

        //#####################################################################################
        // Misc Tasks
        //##################################################################################### 
        
        
       
        //this.killCreepsBreakTarget('Zeta-2','Za0','W45N51','10a10m','64381ffe7a23b437cbd2d3f7');


        
        if(Game.creeps['Ws0'])this.breakStructure('Epsilon-2','Ws0',{id:'64174b510ae5d44ed9ab0f26',pos:{x:31,y:39,roomName:'W39N55'}},'10w10m')
        //this.breakStructure('Zeta','Zs0',{id:'64381ffe7a23b437cbd2d3f7',pos:{x:13,y:20,roomName:'W45N51'}},'1a1m');
        //this.breakStructure('Zeta-2','Zs1',{id:'6436571ae85b2c4427e3a515',pos:{x:3,y:28,roomName:'W46N53'}},'10w10m');
        //if(Game.creeps['bob'])this.moveWall('Epsilon','bob','63eb45fe8e3d19220e24319f','6400ba11affb4cf2732032c9','25W13M1C');
        


      //  this.buildSite('Beta-2','B2-Bu-1',{x:22,y:14,roomName:'W41N55'},{x:21,y:15,roomName:'W41N55'})

       // this.claimRoom('Zeta-2','Zc0',{id:'5bbcaa939099fc012e631aa9',pos:{x:36,y:23,roomName:'W45N51'}});
    
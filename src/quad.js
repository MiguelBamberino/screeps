global.QUAD_OUT_OF_FORMATION=-1;
module.exports = {

    leaderName:'QL',
    squadNames:['Q1','Q2','Q3'],
    allNames:['QL','Q1','Q2','Q3'],
    musterPos:new RoomPosition(22,39,'W41N54'),
    run: function(){
        let leader= Game.creeps[this.leaderName];
        if(this.isRecruiting()){
            this.spawnUp();
            this.moveAllToMuster();
            if(this.allAlive()){
                this.muster();
            }
        }
        
        if(this.isMustering()){
            
            if(this.mustered()){
                this.approach();
            }else{
                 this.moveAllToMuster();
            }
            
        }
        
    },
    spawnUp: function(){
        
       // Game.spawns['Epsilon-2'].spawnCreepX('1m',this.leaderName);
        for(let name of this.allNames){
            Game.spawns['Epsilon-2'].spawnCreepX('1t1m',name);
        }
    },
    formUp:function(){
        let leader = Game.creeps[this.leaderName];
        Game.creeps[ this.squadNames[0] ].moveTo(new RoomPosition(leader.pos.x+1,leader.pos.y,leader.pos.roomName));
        Game.creeps[ this.squadNames[1] ].moveTo(new RoomPosition(leader.pos.x,leader.pos.y+1,leader.pos.roomName));
        Game.creeps[ this.squadNames[2] ].moveTo(new RoomPosition(leader.pos.x+1,leader.pos.y+1,leader.pos.roomName));
    },
    moveToInFormation: function(pos){
        
        let leader= Game.creeps[this.leaderName];
        let path = leader.pos.findPathTo(pos,{ignoreCreeps:true});
        leader.room.visual.poly(path,{lineStyle:'dashed',stroke:'#f00'});
        
        if(this.allUnfatigued()){
            for(let name of this.allNames){
                Game.creeps[name].move( path[0].direction );
            }
        }
        
    },
    changeFacing: function(direction){
        
    },
    moveAllToMuster: function(){

        for(let name of this.allNames){
            
           if(Game.creeps[name]){
               Game.creeps[name].moveTo(this.musterPos);
           }
       } 
        if(Game.creeps[ this.leaderName ])Game.creeps[ this.leaderName ].moveTo(this.musterPos);
        if(Game.creeps[ this.squadNames[0] ])Game.creeps[ this.squadNames[0] ].moveTo(new RoomPosition(this.musterPos.x+1,this.musterPos.y,this.musterPos.roomName));
        if(Game.creeps[ this.squadNames[0] ])Game.creeps[ this.squadNames[1] ].moveTo(new RoomPosition(this.musterPos.x,this.musterPos.y+1,this.musterPos.roomName));
        if(Game.creeps[ this.squadNames[0] ])Game.creeps[ this.squadNames[2] ].moveTo(new RoomPosition(this.musterPos.x+1,this.musterPos.y+1,this.musterPos.roomName));
    },
    calculateFormation: function(){
        let leader= Game.creeps[this.leaderName];
        let counts = {L:0,T:0,B:0,R:0}
        for(let name of this.squadNames){
            let creep = Game.creeps[name];
            clog((leader.pos.x - creep.pos.x))
            if( (leader.pos.x - creep.pos.x) ===1)counts.L++;
            if( (leader.pos.x - creep.pos.x) ===-1)counts.R++;
            if( (leader.pos.y - creep.pos.y) ===1)counts.T++;
            if( (leader.pos.y - creep.pos.y) ===-1)counts.B++;
        }
        if(counts.B==2 && counts.R==2)return TOP_LEFT;
        if(counts.T==2 && counts.R==2)return BOTTOM_LEFT;
        if(counts.B==2 && counts.L==2)return TOP_RIGHT;
        if(counts.T==2 && counts.L==2)return BOTTOM_RIGHT;
        return QUAD_OUT_OF_FORMATION;
    },
    approach: function(){
        Memory.quad.state='approaching';
    },
    recruit: function(){
        Memory.quad.state='recruiting';
    },
    muster: function(){
        Memory.quad.state='mustering';
    },
    isApproaching: function(){
        return Memory.quad.state=='approaching';
    },
    isRecruiting: function(){
        return Memory.quad.state=='recruiting';
    },
    isMustering: function(){
        return Memory.quad.state=='mustering';
    },
    mustered: function(){
        return (Game.creeps[this.leaderName].pos.isEqualTo(this.musterPos) && this.calculateFormation() !== QUAD_OUT_OF_FORMATION);
    },
    resetMemory: function(){
        Memory.quad = {state:'offline'};
    },
    allUnfatigued: function(){
        for(let name of this.allNames){
           if(Game.creeps[name].fatigue > 0){
               Game.creeps[name].say('tired');
               return false;
           }
       } 
       return true;
    },
    allAlive: function(){
       for(let name of this.allNames){
           if(!Game.creeps[name] || ( Game.creeps[name] && Game.creeps[name].spawning) ){
               return false;
           }
       } 
       return true;
       
    },
    allDead: function(){
       for(let name of this.allNames){
           if(Game.creeps[name]){
               return false;
           }
       } 
       return true;
    }
};


module.exports = {
    display:false,
    rooms:[],
    coords:{x:0,y:0},
    data:[],
    title:"",
    includeHeadings:false,
    colConfig:{},
    on:function(){
        console.log("GUI ["+this.title+"] loading. Please wait...");
        this.display = true;
    },
    off:function(){
        console.log("GUI ["+this.title+"] closing. Please wait...");
        this.display = false;
    },
    atCoords:function(a,b){
        this.coords = {x:a,y:b};
    },
    headingConfig: function(t, incH, colC){
        this.title = t;
        this.includeHeadings = incH;
        this.colConfig = colC;
    },
    setRooms: function(r){
        this.rooms = r;
    },
    setData:function(d){
         this.data = d;
    },
    render: function(){
        if(!this.display)return;
        
        for(let rn of this.rooms){
            if(Game.rooms[rn])Game.rooms[rn].renderGUITable(new RoomPosition(this.coords.x,this.coords.y,rn),this.data,this.title, this.includeHeadings,this.colConfig);
        }
    }
};
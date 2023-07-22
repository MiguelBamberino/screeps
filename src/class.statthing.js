class StatLog{
   
    constructor(ref,schema=[],trackTime=1500,logLength=10){
        
        this.ref = ref;
        
        if(!this.loadFromMemory(ref)){
            this.createNew(schema,trackTime,logLength);
            this.saveToMemory();
        }
        
    }
    /**
     * If we've never tracked this log ref before then set up for a brand new track
     */ 
    createNew(schema=[],trackTime=1500,logLength=10){
        this.currStat={};
       // this.schema={};
        for(let s of schema){
            this.currStat[s]=0;
        }
        this.mins={};
        this.maxs={};
        this.avgs={};
        this.logs=[];
        
        this.trackTime = trackTime;
        this.refreshIn = trackTime;
        this.logLength = logLength;
    }

    /**
     * Add an amount to the existing stored total, for the specifed key in the current tracker
     * If the key does not exist, then it will be created
     */
    addToValue(k,v){
        if(this.currStat[k]!==undefined)this.currStat[k]+=v;
    }
    /**
     * add amounts to many keys in the current tracker, increasing the existing stored values
     * Any keys that does not exist, will be created
     */
    addToManyValues(keyPairs){
        for(let k in keyPairs){
            this.addToValue(k,keyPairs[k]);
        }
    }
    /**
     * set the amount for the specifed key in the current tracker, overriding any previous set amount
     * If the key does not exist, then it will be created
     */
    setValue(k,v){
        if(this.currStat[k]!==undefined)this.currStat[k]=v;
    }
    /**
     * set the amounts for many keys in the current tracker, overriding any previous set amounts
     * Any keys that does not exist, will be created
     */
    setManyValues(keyPairs){
        for(let k in keyPairs){
            this.setValue(k,keyPairs[k]);
        }
    }
    getReportData(){
        let report = [];
        let rowC = {label:'current'};
        let rowA = {label:'average'};
        let rowMi = {label:'min'};
        let rowMa = {label:'max'};

        for(let i in this.currStat){
            rowC[i]= this.currStat[i];
            rowA[i]= this.avgs[i];
            rowMi[i]= this.mins[i];
            rowMa[i]= this.maxs[i];
        }
        report.push(rowC);
        report.push(rowA);
        report.push(rowMi);
        report.push(rowMa);
        
        for(let i in this.logs){
            let row={label:'log:'+i};
            for(let c in this.currStat){
                row[c] = this.logs[i][c];
            }
            report.push(row);
        }
        
        return report;
    }
    /**
     * Run all the per tick logic for this log
     */ 
    runTick(){
        
        this.refreshIn--;
        
        if(this.refreshIn==0){
            this.refreshIn = this.trackTime;
            let row = Object.assign({},this.currStat);
            this.logs.push(row);
            
            if(this.logs.length>this.logLength){
                this.logs.shift();
            }
            
            this.mins={};
            this.maxs={};
            this.avgs={};
            for(let a in this.currStat){
                this.mins[a]=9999999999999999;
                this.maxs[a]=0;
                this.avgs[a]=0;
                this.currStat[a]=0;
            }
            // aggregate results
            for(let i in this.logs){
                
                for(let attr in this.logs[i]){
                    // if there is a bigger number, then update the max()
                    if( this.logs[i][attr] > this.maxs[attr] ){
                        this.maxs[attr]=this.logs[i][attr];
                    }
                    // if there is a smaller number, then update the mins()
                    if( this.logs[i][attr] < this.mins[attr] ){
                        this.mins[attr]=this.logs[i][attr];
                    }
                    this.avgs[attr]+=this.logs[i][attr];
                }
            }
            // now lets divide the avgs down to get true avg
            for(let attr in this.avgs){
                this.avgs[attr] = this.avgs[attr]/this.logs.length;
            }

            
        }
        
        this.saveToMemory();
        
    }
    /*############### Memory READ/WRITE ###############*/
    // do we already have stats stored on memory for this ref
    existsOnMemory(ref){
        return (Memory.statLogs && Memory.statLogs[ ref ]);
    }
    // load the data for this log from memory and build class
    loadFromMemory(ref){
        
        if(this.existsOnMemory(ref)){
            
            this.ref = ref;
            //this.schema = Memory.statLogs[ ref ].schema;
            this.currStat= Memory.statLogs[ ref ].currStat;
            this.mins= Memory.statLogs[ ref ].mins;
            this.maxs= Memory.statLogs[ ref ].maxs;
            this.avgs= Memory.statLogs[ ref ].avgs;
            this.logs= Memory.statLogs[ ref ].logs;
            this.trackTime = Memory.statLogs[ ref ].trackTime;
            this.logLength = Memory.statLogs[ ref ].logLength;
            this.refreshIn = Memory.statLogs[ ref ].refreshIn;
            
            return true;
        }
        return false;
    }
    // commit the current in-memory values to persistent Memory object
    saveToMemory(){
        if(!Memory.statLogs){
            Memory.statLogs={};
        }
        Memory.statLogs[ this.ref ] = {
            currStat:this.currStat,
           // schema:this.schema,
            mins:this.mins,
            maxs:this.maxs,
            avgs:this.avgs,
            logs:this.logs,
            trackTime:this.trackTime,
            refreshIn:this.refreshIn,
            logLength:this.logLength
        }
    }
}
/*

-  current
- long of events, x long
- set how many logs to keep
- min, max, avg

*/
module.exports = StatLog;
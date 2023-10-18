class MemoryCollection{
    
    /**
     * 
     * string ref -> unique name of collection to use on storage
     * string config -> H
     */ 
    constructor(ref,config={}){
        
        this.ref = ref;
        this.config = config;
        this.swapChars = "abcdefghijklmnopqrstuvwxyz";
        
        this.edits=0;
        this.deletes=0;
        this.mutationsBeforeReload=100;
        this.loadedAt = Game.time;

        this.ensureMemoryExists();
        this.readInCollection();

    } 
    get(key){
        return (this.collection[key])?this.collection[key]:undefined;
    }
    all(){
        return this.collection;
    }
    filter(fn){
        return Object.values(this.collection).filter(fn);
    }
    empty(){
        this.collection={};
        this.resetMemory();
    }
    delete(key){
        delete this.collection[key];
        this.deletes++;
        this.deleteFromCollection(key);
        
        this.checkMutationsForReload();
    }
    add(key,data){
        if(this.collection[key])return false;
        this.collection[key]=data;
        this.addToCollection(key,data);
        return true;
    }
    edit(key,data){
        if(!this.collection[key])return false;
        this.collection[key]=data;
        this.edits++;
        this.editInCollection(key,data);
        
        this.checkMutationsForReload();
        return true;
    }
    checkMutationsForReload(){
        if( (this.deletes+this.edits) > this.mutationsBeforeReload){
            this.logMsg('reload-and-clean','edits:'+this.edits+' deletes:'+this.deletes +' mutationsBeforeReload:'+this.mutationsBeforeReload+ ' ticksSinceLastClean:'+(Game.time-this.loadedAt) );
            this.readInCollection();
        }
    }
    logMsg(type, msg){
        clog(msg, 'mem-coll['+this.ref+']-'+type );
    }
    //################################################################################################################
    //## Compression Functions
    //################################################################################################################
    /**
     * Compress an uncompressed item of the collection to string format using the
     * configured compression rules set for this collection. 
     * 
     * @param mixed dataItem -> object to compress
     * @return string > compressed data as a string
     */ 
    compressDataItem(key,dataItem,keysToSwaps){
        
        let dataToCompress={};
        for(let dataItemKey in dataItem){
            if(keysToSwaps[ dataItemKey ]){
                // remap to smaller key name
                dataToCompress[ keysToSwaps[ dataItemKey ] ] = dataItem[dataItemKey];
            }else{
                dataToCompress[dataItemKey] = dataItem[dataItemKey];
            }
        }
        
        
        if(this.config.itemCompression==='ccsv'){
            
        }else{
            // default to JSON
            let c = JSON.stringify(dataToCompress);
            return c.length + c;
        }    
    }
    
    /**
     * uncompress the string data blob, following the compression rules set for this collection
     * 
     * @param  string -> data blob
     * @param  object -> keyed objects of swap > key mappings, uncompress the keys
     * @return collection {} -> keyed object of data items
     */ 
    unCompressAllData(strData, keySwaps){
        if(this.config.itemCompression==='ccsv'){
            
        }else{
            // default to JSON
            return this.unCompressAllData_json(strData,keySwaps);
        }
    }
    
    /**
     * uncompress the string data blob, following the rule, that each data item
     * was compressed to JSON with a int length header.
     * 
     * Collection will be keyed by what was set in config and at compression
     * 
     * Sample data: '46{\"x\":34,\"y\":10,\"roomName\":\"bob\",\"__colKey\":45}45{\"a\":12,\"y\":34,\"roomName\":\"bob\",\"__colKey\":2}'
     * 
     * @param  string -> data blob
     * @param  object -> keyed objects of swap > key mappings, uncompress the keys
     * @return collection {} -> keyed object of data items
     */ 
    unCompressAllData_json(strData, keySwaps){
        let collection = {};
        if(strData.length>0){
            
            let progress = 0;
            let safety = 0;
            //clog(keySwaps,'keySwaps');clog(strData,'strData'); clog(strData.length,'strData.len')
            while(progress < strData.length && safety<strData.length){
                // pull first 4 chars to look for data str blob length
                let dataLen = parseInt(strData.substr(progress,4),10);
                // work out the  starting offset, bassed on progress and the len of our dataLen integer
                let offset = progress + ((dataLen+'').length);
                // now pull out the compressed data str from the blob and uncompress the data
                let c = strData.substr(offset,dataLen);
                //clog(progress,'progress');clog(dataLen,'dataLen');clog(offset,'offset');clog(c,'c')
                let unCompressed =  this.unCompressDataItem( c );
                //clog(unCompressed,'unCompressed');
                let reKeyed={};
                for(let key in unCompressed){
                    reKeyed[ keySwaps[key] ] = unCompressed[key];
                }
                // where do we find the collection key?
                let key = (this.config.keyFromData)?this.config.keyFromData:'__colKey';
                collection[ reKeyed[key] ] = reKeyed; 
                // increase while safety switch
                safety++;
                progress = dataLen+offset;
            }

        }
        
        return collection;
    }
    /**
     * uncompress an item of the collection, using configured compression rules set
     * for this collection. 
     * 
     * @param string strDataItem -> compressed string form of a data item
     * @return mixed
     */ 
    unCompressDataItem( strDataItem ){
        
        if(this.config.itemCompression==='ccsv'){
            
        }else{
            // default to JSON
            return JSON.parse(strDataItem);
        }
    } 
    
    //################################################################################################################
    //## Collection->Memory Manager functions
    //################################################################################################################
    readInCollection(){
        let start = Game.cpu.getUsed();
        
        let meta = this.readFromMemory();
        this.collection = this.unCompressAllData(meta.data,meta.keySwaps);
        
        this.swapToKey = meta.keySwaps;
        this.keyToSwap = {};
        // reverse swaps to we have a cache lookup of both directions
        for(let s in meta.keySwaps){
            this.keyToSwap[ meta.keySwaps[s] ] = s;
        }
       
        //this.logMsg('uncompress',(Game.cpu.getUsed()-start));
        start = Game.cpu.getUsed();
        
        this.__applyCachedActions(meta,this.collection,this.keyToSwap);
        
        //this.logMsg('applyCachedActions',(Game.cpu.getUsed()-start));
        
        return this.collection;
    }
    /**
     * add an item to the collection. Item appended to compressed data blob
     * @param key -> the collection item to add
     * @param data -> new object data
     */
    addToCollection(key,data){
       // let start = Game.cpu.getUsed();
        let meta = this.readFromMemory();
        
        if(!this.config.keyFromData){
            data['__colKey']=key;
        }
        
        // save new sway data to Memory
        meta.keySwaps = this.__createAnyNewSwaps(data);

        meta.data += this.compressDataItem( key, data, this.keyToSwap );
        
        this.writeToMemory(meta);
        //clog((Game.cpu.getUsed()-start),'mem-coll-addToCollection' );
    }
    /**
     * mark edits of an item of the collection to be applied to store on next reload
     * @param key -> the collection item to edit
     * @param data -> new object data
     */ 
    editInCollection(key,data){
        //let start = Game.cpu.getUsed();
        let meta = this.readFromMemory();
        
        if(!this.config.keyFromData){
            data['__colKey']=key;
        }
         
        // save new sway data to Memory
        meta.keySwaps = this.__createAnyNewSwaps(data);
        meta.edits += this.compressDataItem( key, data, this.keyToSwap );

        this.writeToMemory(meta);
        //clog((Game.cpu.getUsed()-start),'mem-coll-applyCachedActions' );
    }
    __createAnyNewSwaps(data){
        
        // do we need to add any new key swaps ?
        for(let dataItemKey in data){
            if(!this.keyToSwap[ dataItemKey ]){
                // lets find the length of our existing swap lookup and find the next one
                let newSwap = this.swapChars[ Object.keys(this.keyToSwap).length ];
                // save new sway data to heap cache
               // meta.keySwaps[ newSwap ] = dataItemKey;
                this.swapToKey[ newSwap ] = dataItemKey;
                this.keyToSwap[ dataItemKey ] = newSwap;
            }
        }
        return this.swapToKey;
    }
    /**
     * mark an item of the collection for Deletion on next reload
     * @param key -> the collection item to delete
     */ 
    deleteFromCollection(key){
        //let start = Game.cpu.getUsed();
        let meta = this.readFromMemory();
        
        if(meta.deletes.length>0){
            meta.deletes +=','; 
        }
        meta.deletes += key;
        
        this.writeToMemory(meta);
        //clog((Game.cpu.getUsed()-start),'mem-coll-deleteFromCollection' );
    }
    /**
     * run through any cached deletes and edits, recorded since last build and update internal memory string
     * @param object meta -> the meta object read from this.readFromMemory()
     * @param object collection -> a ref to the in mem collection object
     * @param object keysToSwaps -> a keypair object, mapping collection item keys to their swaps
     */
    __applyCachedActions(meta, collection, keysToSwaps){
       // clog(collection,'before')
        
        meta.data = ''; 
        
        // apply deletes
        if(meta.deletes.length >0){
            let ids = meta.deletes.split(',');
            for(let id of ids){
                clog(id,this.ref+'::deleting')
                if(collection[id]){
                    delete collection[id];
                }
            }
            meta.deletes = '';
            this.deletes=0;
        }

        //clog(collection,'after-deletes') 
        // apply edits  
        if(meta.edits.length >0){
            let edits = this.unCompressAllData( meta.edits,meta.keySwaps );
            for(let id in edits){
                if(collection[id]){
                   // if(id == '642d55269de5745e5e9a4978' ){clog(collection[id],'col-before');clog(edits[id],'edit');}
                    collection[id]=edits[id];
                } 
            }
            meta.edits = '';
            this.edits = 0;
        } 
       //clog(collection['642d55269de5745e5e9a4978'],'coll-after');
        //clog(collection,'after-edits')
        // save new collection
        for(let key in collection){
            meta.data += this.compressDataItem( key, collection[key], keysToSwaps );
        }
        
        
        this.writeToMemory(meta);
    }
    //################################################################################################################
    //## Encapsulate where we READ/WRITE Screeps MEMORY object 
    //################################################################################################################
    writeToMemory(compressedData){
        Memory[this.ref]=compressedData;
    }
    resetMemory(){
        Memory[this.ref]={keySwaps:{},data:'',edits:'',deletes:''};
    }
    readFromMemory(){
        return Memory[this.ref];
    }
    ensureMemoryExists(){
        if(!Memory[this.ref]){
            this.resetMemory();
        }
    }
}
module.exports = MemoryCollection;
/*
 * Code copied from https://github.com/bencbartlett/screeps-packrat/blob/master/src/packrat.js
 * Code compresses Screeps game IDs, COORDs & roomNames
 */
global.PERMACACHE = {}; // Create a permanent cache for immutable items such as room names
PERMACACHE._packedRoomNames = PERMACACHE._packedRoomNames || {};
PERMACACHE._unpackedRoomNames = PERMACACHE._unpackedRoomNames || {};

let packer = {
    compressStructTypeLook:{},
    unCompressStructTypeLook:{},
    setupCompressionLookup: function(){
        let struct_types = [
            STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_ROAD,STRUCTURE_WALL,STRUCTURE_RAMPART,STRUCTURE_KEEPER_LAIR,
            STRUCTURE_PORTAL,STRUCTURE_CONTROLLER,STRUCTURE_LINK,STRUCTURE_STORAGE,STRUCTURE_TOWER,STRUCTURE_OBSERVER,
            STRUCTURE_POWER_BANK,STRUCTURE_POWER_SPAWN,STRUCTURE_EXTRACTOR,STRUCTURE_LAB,STRUCTURE_TERMINAL,
            STRUCTURE_CONTAINER,STRUCTURE_NUKER,STRUCTURE_FACTORY,STRUCTURE_INVADER_CORE];
        let alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let alphaSplit = alphabet.split('');
        for(let s in struct_types){
            this.compressStructTypeLook[ struct_types[s] ] = alphaSplit[s];
            this.unCompressStructTypeLook[ alphaSplit[s] ] = struct_types[s];
        }
        
    },
    
    packBool: function(bool) {
        return bool ? '1' : '0';
    },
    unpackBool: function(str) {
        return str === '1';
    },
    packInt65: function(int) {
        if (int < 0 || int > 65535) {
            throw new Error("The input integer should be between 0 and 65535");
        }
        return String.fromCharCode(int);
    },
    unpackInt65: function(char) {
        return char.charCodeAt(0);
    },
    packInt: function(num) {
        if (num < 0) {
            throw new Error("The input integer should be 0 or more. it can not be negative.");
        }
        const base = 65535;
        let result = '';
        let fullUnits = Math.floor(num / base);
        for(let i=0; i<fullUnits; i++){
            result +=String.fromCharCode(base);
        }
        // add the remainder
        result += String.fromCharCode( (num-(base*fullUnits)) );
    
        return result;
    },
    unpackInt: function(str) {
        const base = 65535;
        let result = 0;
    
        for (let i = str.length - 1; i >= 0; i--) {
            result += str.charCodeAt(i);
        }
    
        return result;
    },


    
    /**
     * Convert a standard 24-character hex id in screeps to a compressed UTF-16 encoded string of length 6.
     *
     * Benchmarking: average of 500ns to execute on shard2 public server, reduce stringified size by 75%
     */
    packId: function(id) {
    	return String.fromCharCode(parseInt(id.substr(0, 4), 16)) +
    		   String.fromCharCode(parseInt(id.substr(4, 4), 16)) +
    		   String.fromCharCode(parseInt(id.substr(8, 4), 16)) +
    		   String.fromCharCode(parseInt(id.substr(12, 4), 16)) +
    		   String.fromCharCode(parseInt(id.substr(16, 4), 16)) +
    		   String.fromCharCode(parseInt(id.substr(20, 4), 16));
    },
    
    /**
     * Convert a compressed six-character UTF-encoded id back into the original 24-character format.
     *
     * Benchmarking: average of 1.3us to execute on shard2 public server
     */
    unpackId: function(packedId) {
    	let id = '';
    	let current;
    	for (let i = 0; i < 6; ++i) {
    		current = packedId.charCodeAt(i);
    		id += (current >>> 8).toString(16).padStart(2, '0'); // String.padStart() requires es2017+ target
    		id += (current & 0xFF).toString(16).padStart(2, '0');
    	}
    	return id;
    },
    /**
     * Packs a coord as a single utf-16 character. The seemingly strange choice of encoding value ((x << 6) | y) + 65 was
     * chosen to be fast to compute (x << 6 | y is significantly faster than 50 * x + y) and to avoid control characters,
     * as "A" starts at character code 65.
     *
     * Benchmarking: average of 150ns to execute on shard2 public server, reduce stringified size by 80%
     */
    packCoord: function(coord) {
    	return String.fromCharCode(((coord.x << 6) | coord.y) + 65);
    },
    
    /**
     * Unpacks a coord stored as a single utf-16 character
     *
     * Benchmarking: average of 60ns-100ns to execute on shard2 public server
     */
    unpackCoord: function(char) {
    	const xShiftedSixOrY = char.charCodeAt(0) - 65;
    	return {
    		x: (xShiftedSixOrY & 0b111111000000) >>> 6,
    		y: (xShiftedSixOrY & 0b000000111111),
    	};
    },
    /**
     * Packs a roomName as a single utf-16 character. Character values are stored on permacache.
     */
    packRoomName: function(roomName) {
    	if (PERMACACHE._packedRoomNames[roomName] === undefined) {
    		const coordinateRegex = /(E|W)(\d+)(N|S)(\d+)/g;
    		const match = coordinateRegex.exec(roomName);
    		const xDir = match[1];
    		const x = Number(match[2]);
    		const yDir = match[3];
    		const y = Number(match[4]);
    		let quadrant;
    		if (xDir == 'W') {
    			if (yDir == 'N') {
    				quadrant = 0;
    			}
    			else {
    				quadrant = 1;
    			}
    		}
    		else {
    			if (yDir == 'N') {
    				quadrant = 2;
    			}
    			else {
    				quadrant = 3;
    			}
    		}
    		// y is 6 bits, x is 6 bits, quadrant is 2 bits
    		const num = (quadrant << 12 | (x << 6) | y) + 65;
    		const char = String.fromCharCode(num);
    		PERMACACHE._packedRoomNames[roomName] = char;
    		PERMACACHE._unpackedRoomNames[char] = roomName;
    	}
    	return PERMACACHE._packedRoomNames[roomName];
    },
    
    /**
     * Packs a roomName as a single utf-16 character. Character values are stored on permacache.
     */
    unpackRoomName: function(char) {
    	if (PERMACACHE._unpackedRoomNames[char] === undefined) {
    		const num = char.charCodeAt(0) - 65;
    		const { q, x, y } = {
    			q: (num & 0b11000000111111) >>> 12,
    			x: (num & 0b00111111000000) >>> 6,
    			y: (num & 0b00000000111111),
    		};
    		let roomName;
    		switch (q) {
    			case 0:
    				roomName = 'W' + x + 'N' + y;
    				break;
    			case 1:
    				roomName = 'W' + x + 'S' + y;
    				break;
    			case 2:
    				roomName = 'E' + x + 'N' + y;
    				break;
    			case 3:
    				roomName = 'E' + x + 'S' + y;
    				break;
    			default:
    				roomName = 'ERROR';
    		}
    		PERMACACHE._packedRoomNames[roomName] = char;
    		PERMACACHE._unpackedRoomNames[char] = roomName;
    	}
    	return PERMACACHE._unpackedRoomNames[char];
    },
    
    /**
     * Packs a RoomPosition as a pair utf-16 characters. The seemingly strange choice of encoding value ((x << 6) | y) + 65
     * was chosen to be fast to compute (x << 6 | y is significantly faster than 50 * x + y) and to avoid control
     * characters, as "A" starts at character code 65.
     *
     * Benchmarking: average of 150ns to execute on shard2 public server, reduce stringified size by 90%
     */
    packPos: function(pos) {
    	return this.packCoord(pos) + this.packRoomName(pos.roomName);
    },
    
    /**
     * Unpacks a RoomPosition stored as a pair of utf-16 characters.
     *
     * Benchmarking: average of 600ns to execute on shard2 public server.
     */
    unpackPos: function(chars) {
    	let coords = this.unpackCoord(chars[0]);
    	coords.roomName = this.unpackRoomName(chars[1]);
    	return coords;
    },
    
    /**
     * Pack a Screeps structureType enum/string into 1 utf-16 character
     */ 
    packStructureType: function(type){
        return this.compressStructTypeLook[ type ];
    },
    /**
     * UnPack a Screeps structureType from a utf-16 character back into its enum/string form
     */ 
    unpackStructureType: function(char){
        return this.unCompressStructTypeLook[ char ];
    },
    /**
     * Pack a Screeps Structure object into a length 9 string of UTF-16 characters
     * assumes passed object is structured: {id:'xxx',pos:{x:0,y:0,roomName:'W12N34'},structureType:'road'}
     * only compresses attributes of use that are not liable to change per tick
     */ 
    packStructure: function(structureObj){
        return  this.packId(structureObj.id) 
                + this.packPos(structureObj.pos)
                + this.packStructureType(structureObj.structureType)
                ;
    },
    /**
     * unpack a Screeps Structure object into an object looking like this: {id:'xxx',pos:{x:0,y:0,roomName:'W12N34'},structureType:'road'}
     * from the compres length 9 string of UTF-16 characters
     * 
     */ 
    unpackStructure: function(compressedStr){
        let idComp = compressedStr.substr(0,6);
        let typeComp = compressedStr.substr(8,1);
        console.log(typeComp);
        console.log(compressedStr.substr(8,1));
        let struct = this.unpackPos(compressedStr.substr(6,3));
        struct.id = this.unpackId(idComp);
        struct.type = this.unpackStructureType(typeComp);
        return struct;
    },
        /**
     * compress a value based on the supported compression types in the packer
     * @param mixed value
     * @param string type > the data type for value
     */ 
    packValue:function(value, type = 'string'){
        switch(type){
            case 'int':
                return this.packInt(value);
            case 'int65':
                return this.packInt65(value);
            case 'string':
                return value; // As there's no explicit string compression in _packRat, returning string as is
            case 'boolean':
                return this.packBool(value);
            case 'id':
                return this.packId(value);
            case 'coord':
                return this.packCoord(value);
            case 'roomName':
                return this.packRoomName(value);
            case 'pos':
                return this.packPos(value);
            case 'structureType':
                return this.packStructureType(value);
            case 'structure':
                return this.packStructure(value);
            // Add more case statements for any other data types that you want to support.
            default:
                throw new Error(`Unsupported data type: ${type}`);
        }
    },
    /**
     * uncompress a value based on the supported compression types in the packer
     * @param mixed value
     * @param string type > the data type for value
     */ 
    unpackValue: function(value, type = 'string'){
        switch(type){
            case 'int':
                return this.unpackInt(value);
            case 'int65':
                return this.unpackInt65(value);
            case 'string':
                return value; // As there's no explicit string compression in _packRat, returning string as is
            case 'boolean':
                return this.unpackBool(value);
            case 'id':
                return this.unpackId(value);
            case 'coord':
                return this.unpackCoord(value);
            case 'roomName':
                return this.unpackRoomName(value);
            case 'pos':
                return this.unpackPos(value);
            case 'structureType':
                return this.unpackStructureType(value);
            case 'structure':
                return this.unpackStructure(value);
            // Add more case statements for any other data types that you want to support.
            default:
                throw new Error(`Unsupported data type: ${type}`);
        }
    },
    detectType: function(data){
        
        let jsType = typeof data;
        
        if(jsType==='boolean')return jsType;
        
        if(jsType==='string'){
            if(struct_types.indexOf(data)!==-1 )return 'structureType';
            if(this.isHexadecimal(data) && data.length===24)return 'id';
            if(this.isRoomName(data))return 'roomName';
            return jsType;
        }
        
        if(jsType==='number'){
            if(Number.isInteger(data)){
                if(data<65535)return 'int65';
                else return 'int';
            }else{
                return 'float';
            }
        }
        
        if(jsType==='object'){
            if(data.length)return 'array';
            if(this.coord(data)){
              if(data.hasOwnProperty('roomName')) return 'pos';
              else return 'coord'  
            }
            if(data.hasOwnProperty('structureType') )return 'structure';
            return jsType;
        }
    },
    isHexadecimal: function(str) {
        const regex = /^[0-9a-f]+$/i;
        return regex.test(str);
    },
    isRoomName: function(str) {
        const roomNameRegex = /^[EW]\d{1,2}[NS]\d{1,2}$/;
        return roomNameRegex.test(str);
    },
    isCoord: function(obj) {
        return obj.hasOwnProperty('x') 
            && obj.hasOwnProperty('y') 
            ;
    }

};
packer.setupCompressionLookup();
module.exports = packer;

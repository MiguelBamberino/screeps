
global.reservationBook = {
    initiate:function(){
        if(!Memory.reservationBook){
            Memory.reservationBook={};
        }
    },
    runTick:function(){
        for(let id in Memory.reservationBook){
            for(let type in Memory.reservationBook[id]){
                
                let structure = Game.getObjectById(id);
                if(!structure){
                    
                    console.log("Structure disappeared. Deleting reservation book id:"+id);
                    delete Memory.reservationBook[id];
                    
                }else{
                    
                    Memory.reservationBook[id][type].totalPending=0;
                    for(let cname in Memory.reservationBook[id][type].reserves){
                        if(cname==='lock')continue;
                        if(!Game.creeps[cname]){
                            logs.log("Death","Releasing reserves of "+cname+" because they died.")
                            Memory.reservationBook[id][type].totalReserved-=Memory.reservationBook[id][type].reserves[cname];
                            delete Memory.reservationBook[id][type].reserves[cname];
                        }
                    }
                    
                }

            }
        }
    },
    getPage:function(id){
        if(!Memory.reservationBook[id]){
            Memory.reservationBook[id]={
                withdraw:{totalPending:0,totalReserved:0,reserves:{}},
                transfer:{totalPending:0,totalReserved:0,reserves:{}}
                
            };
        }
        return  Memory.reservationBook[id];
    },
    savePage:function(id,page){
        Memory.reservationBook[id]=page;
    }
};
reservationBook.initiate();
global.ERR_STRUCTURE_HAS_NO_STORE=-20;
global.ERR_NO_SPACE_FOR_RESERVATION=-21;
global.ERR_INVALID_RESERVATION_TYPE=-22;
global.ERR_OVER_BOOKED=-23;
global.ERR_ALREADY_BOOKED=-24;
global.ERR_NO_STORE=-25;
global.ERR_NO_BOOKING=-26;
global.ERR_RESERVE_ZERO_INVALID=-27;

Structure.prototype.getReservations=function(){
    return reservationBook.getPage(this.id);
}
Structure.prototype.resetReservations=function(){
    let reservations = this.getReservations();
    reservations.withdraw.totalPending=0;
    reservations.withdraw.totalReserved=0;
    reservations.withdraw.reserves={};
    reservations.transfer.totalPending=0;
    reservations.transfer.totalReserved=0;
    reservations.transfer.reserves={};
}
Structure.prototype.lockReservations=function(dirs=['withdraw','transfer']){
    this.resetReservations();
    let reservations = this.getReservations();
    for(let dir of dirs){
        reservations[dir].reserves["lock"]=this.store.getCapacity(RESOURCE_ENERGY);
        reservations[dir].totalReserved = this.store.getCapacity(RESOURCE_ENERGY);
    }
}
Structure.prototype.isWithdrawLocked=function(){
    let reservations = this.getReservations();
    return reservations['withdraw'].reserves["lock"]?true:false;
}
/**
 * What is currently the most that can be reserved for withdrawal
 */ 
Structure.prototype.getWithdrawReserveLimit=function(type=RESOURCE_ENERGY){
    if(this.store){
        this.reservations = this.getReservations();
        let stored = this.store.getUsedCapacity(type);
        let claimed = this.reservations.withdraw.totalReserved + this.reservations.withdraw.totalPending;
        return (stored - claimed);
    }else{
        return 0;
    }
}
/**
 * What is currently the most that can be reserved for transfer
 */ 
Structure.prototype.getTransferReserveLimit=function(type=RESOURCE_ENERGY){
    if(this.store){
        this.reservations = this.getReservations();
        let free = this.store.getFreeCapacity(RESOURCE_ENERGY);
        let claimed = this.reservations.transfer.totalReserved + this.reservations.transfer.totalPending;
        return (free - claimed);
    }else{
        return 0;    
    }
}
/**
 * Check there is space to make a reservation to withdraw X amount
 */ 
Structure.prototype.canReserveWithdraw=function(amount){
    amount = amount===null?1:amount;// if called empty, lets check if there is ANY space
    let limit = this.getWithdrawReserveLimit();
    if(limit===0|| amount===0)return false;
    return (limit>=amount);
}
/**
 * Check there is space to make a reservation to transfer X amount
 */ 
Structure.prototype.canReserveTransfer=function(amount){
    amount = amount===null?1:amount;// if called empty, lets check if there is ANY space
    let limit = this.getTransferReserveLimit();
    if(limit===0|| amount===0)return false;
    return (limit >=amount);
}
/**
 * Check there is space and then attempt to make a reservation to withdraw X amount
 */ 
Structure.prototype.reserveWithdraw=function(ref,amount){
    if(amount===0){
        return ERR_RESERVE_ZERO_INVALID;
    }
    if(this.store){
        this.reservations = this.getReservations();
        if(this.reservations.withdraw.reserves[ref]===undefined){
           if(this.canReserveWithdraw(amount)){
                if(!this.reservations.withdraw.reserves[ref]){
                    this.reservations.withdraw.reserves[ref]=amount;
                    this.reservations.withdraw.totalReserved+=amount;
                }
                return OK;
            }else{
                return ERR_NO_SPACE_FOR_RESERVATION;
            }     
        }else{
            return ERR_ALREADY_BOOKED;
        }
    }else{
        return ERR_NO_STORE;
    }
}
/**
 * Check there is space and then attempt to make a reservation to transfer X amount
 */ 
Structure.prototype.reserveTransfer=function(ref,amount){
    if(amount===0){
        return ERR_RESERVE_ZERO_INVALID;
    }
    if(this.store){
        let reservations = this.getReservations();
        if(reservations.transfer.reserves[ref]===undefined){
            if(!this.canReserveTransfer(amount)){
                amount = this.store.getFreeCapacity(RESOURCE_ENERGY);
            }
            if(this.canReserveTransfer(amount)){
                
                if(!reservations.transfer.reserves[ref]){
                    reservations.transfer.reserves[ref]=amount;
                    reservations.transfer.totalReserved+=amount; 
                    return OK;
                }else{
                    return -30;
                }
                
            }else{
                return ERR_NO_SPACE_FOR_RESERVATION;
            }
        }else{
            return ERR_ALREADY_BOOKED;
        }
    }else{
        return ERR_NO_STORE;
    }
}
/**
 * Check there is space to complete a reservation to withdraw X amount
 */ 
Structure.prototype.canFulfillWithdraw=function(ref){
    if(this.store){
        this.reservations = this.getReservations();
        let stored = this.store.getUsedCapacity(RESOURCE_ENERGY);
        let amount = this.reservations.withdraw.reserves[ref];
        if(stored===0 || !amount)return false;
        return ((stored - this.reservations.withdraw.totalPending)>=amount);
    }else{
        return false;
    }
}
/**
 * Check there is space to complete a reservation to transfer X amount
 */ 
Structure.prototype.canFulfillTransfer=function(ref){
    if(this.store){
        this.reservations = this.getReservations();
        let free = this.store.getFreeCapacity(RESOURCE_ENERGY);
        let amount = this.reservations.transfer.reserves[ref];
        if(free===0 || !amount)return false;
        return ((free - this.reservations.transfer.totalPending)>=amount);
    }else{
        return false;
    }
}
/**
 * Release reservation of a given withdrawal
 */ 
Structure.prototype.fulfillWithdraw = function(creepName){
    let reservations = this.getReservations();
    let amount = reservations.withdraw.reserves[creepName];
    if(!amount)return false;
    reservations.withdraw.totalPending+=amount;
    reservations.withdraw.totalReserved-=amount;
    delete reservations.withdraw.reserves[creepName];
    return true;
}
/**
 * Release reservation of a given transfer
 */ 
Structure.prototype.fulfillTransfer = function(creepName){
    
    let reservations = this.getReservations();
    let amount = reservations.transfer.reserves[creepName];
    //if(this.id=='63f0955456dfce0118e56dd4'){clog(creepName,'fulfillTransfer:creepName');clog(amount,'fulfillTransfer:amount');clog(reservations);}
    if(!amount)return false;
    
    reservations.transfer.totalPending+=amount;
    reservations.transfer.totalReserved-=amount;
    
    delete reservations.transfer.reserves[creepName];
    return true;
}

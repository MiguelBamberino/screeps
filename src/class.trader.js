
class Trader {
    constructor() {
        this.orders = {}; // Store orders in an object with IDs as keys
        this.orderDups = {};
    }
    
    createOrder(roomName, resourceType, amount) {

        if( !roomName || roomName.length<4 || roomName.length>6 )return ERR_INVALID_ARGS;
        if( !['W','E'].includes(roomName.charAt(0)) )return ERR_INVALID_ARGS;
        if(amount<1||amount>250000)return ERR_INVALID_ARGS;
        if(resourceType!==RESOURCE_ENERGY && !REACTIONS[resourceType])return ERR_INVALID_ARGS;
        if(this.orderDups[roomName+resourceType])return ERR_NAME_EXISTS;

        // Create a unique ID for the order based on roomName, resourceType, and Game.time
        const id = `${roomName}_${resourceType}_${Game.time}`;

        // Add the order to the internal orders object
        this.orders[id] = {
            id,
            roomName,
            resourceType,
            amount,
            fulfilledBy:null,
            fulfilledAt: null
        };
        this.orderDups[roomName+resourceType]=true;
        // Return the newly created order
        return id;
    }

    _fulfillOrder(orderId,roomName){
        if(!this.orders[orderId])return ERR_NOT_FOUND;
        if(this.orders[orderId].fulfilledAt)return ERR_INVALID_TARGET;
        if(this.orders[orderId].roomName===roomName)return ERR_INVALID_TARGET;

        this.orders[orderId].fulfilledAt = Game.time;
        this.orders[orderId].fulfilledBy = roomName;
        delete this.orderDups[ this.orders[orderId].roomName+this.orders[orderId].resourceType ]
        return OK;
    }

    getOrders(filters = []) {
        // If no filters are provided, return all orders
        if (filters.length === 0) {
          return Object.values(this.orders);
        }
        
        // If filters are provided, filter the orders accordingly
        return Object.values(this.orders).filter(order => {
          // Check each filter condition
          return filters.every(filter => {
            return order[filter.key] === filter.value;
          });
        });
    }
    getOrderIDsByRoomName(roomName) {
        // Return only the IDs of the orders for the given roomName
        const orderIDs = [];
        for (let id in this.orders) {
            if (this.orders[id].roomName === roomName) {
                orderIDs.push(id);
            }
        }
        return orderIDs;
    }

    getOrder(id) {
        // Return the order with the given ID, or undefined if it doesn't exist
        return this.orders[id];
    }
}

module.exports = Trader;
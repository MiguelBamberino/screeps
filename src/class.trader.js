class Trader {
    constructor() {
        this.orders = {}; // Store orders in an object with IDs as keys
    }
    
    createOrder(roomName, resourceType, amount) {
        // Create a unique ID for the order based on roomName, resourceType, and Game.time
        const id = `${roomName}_${resourceType}_${Game.time}`;
        
        // Create the order object
        const order = {
          id,
          roomName,
          resourceType,
          amount,
          fulfilledAt: null
        };
        
        // Add the order to the internal orders object
        this.orders[id] = order;
        
        // Return the newly created order
        return order;
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
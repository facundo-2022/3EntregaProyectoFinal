import config from '../../config/config.js';
import Cart from '../clases/carts.dao.js'


switch (config.persistence) {
    case "MONGO":
        const CartMongo = require ('../classes/cart.dao.js')
        Cart = new CartMongo ();
        break
    case "MEMORY":
        const CartMemory= require('../memory/cart.memory.js');
        Cart = new CartMemory;
        break;
}

export default Cart;
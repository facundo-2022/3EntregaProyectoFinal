import config from '../../config/config.js';
import Product from '../clases/products.dao.js'

switch (config.persistence) {
    case "MONGO":
        const ProductMongo = require ('../classes/product.dao.js')
        Product = new ProductMongo ();
        break
    case "MEMORY":
        const ProductMemory= require('../memory/product.memory.js');
        Product = new ProductMemory;
        break;
}
export default Product;
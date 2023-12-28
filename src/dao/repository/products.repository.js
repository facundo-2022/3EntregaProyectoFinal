import ProductDTO from '../DTO/products.DTO.js'

export default class ProductRepository {
    constructor(dao){
        this.dao = dao
    }
    getProducts = async () => {
        let result = await this.dao.getProducts()
        return result
    }
    createProduct = async (product) => {
        let productInsert = new ProductDTO(product)
        let result = await this.dao.createProduct(productInsert)
        return result
    }
}
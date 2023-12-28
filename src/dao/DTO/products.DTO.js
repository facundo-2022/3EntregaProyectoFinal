export default class ProductDTO {
    constructor(product){
        this.title = product.title,
        this.description = product.description,
        this.category = product.code,
        this.price = product.price,
        this.stock = product.stock,
        this.code = product.category,
        this.thumbnails = product.thumbnails ? [thumbnails] : []
        
    }
}
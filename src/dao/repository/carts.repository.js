import CartDTO from '../DTO/carts.DTO.js'

export default class CartRepository {
    constructor(dao){
        this.dao = dao
    }
    getCarts = async () => {
        let result = await this.dao.getCarts()
        return result
    }
    createCart = async (cart) => {
        let cartToInsert = new CartDTO(cart)
        let result = await this.dao.createCart(cartToInsert)
        return result
    }
}
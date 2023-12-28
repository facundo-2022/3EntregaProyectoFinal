
const fs = new Contenedor () 

export default class Cart {
    constructor() {
        this.data = []
    }
    
    getCarts = async () => {
        return fs.getAll()
    }

    getCartById = async (pid) => {
        return fs.getById(pid)
    }

    createCart = async (product) => {
        fs(product)
    }

    deleteCart = async (pid) => {
        fs.deleteById(pid)
    }
    updateCart = async (cartId) => {
        fs.updateObject(cartId)
    }
}
//importamos a carts para crear el carrito con sus atributos y a products para que al agregar, modificar, actualizar o eliminar un prodructo lo llamemos desde el dao desde la class creada por sus endpoints

import Cart from '../dao/clases/carts.dao.js'
import Product from '../dao/clases/products.dao.js'


const cartService = new Cart()
export const getCart = async(req, res) => {
    let result = await cartService.getCart(req.params)
    res.send({status: "success", result: result})
}

export const getCartById = async(req, res) => {
    const {cid} = req.params
    let cart = await userService.getCartById(uid)
    res.send({status: "success", result: cart})
}


export const createCart = async(req, res) => {
    const {cart, products} = req.body
    const resultProduct = await productService.getProductsById(product) 
    const resultCart = await cartService.getCartById(cart)
    let actualCart = resultCart.products.filter(product => product.includes(product.id))
    let sum = actualCart.reduce((acc, prev) => {
        acc += prev.price
        return acc
    }, 0)
    let cartNumber = Date.Now() + Math.floor(Math.random() * 10000 + 1)
    let cartNew = {
        number : cartNumber,
        cart,
        products: actualCart.map(product => product.id)
    }
    let cartResult = await cartService.createCart(cartNew)
    res.send({status : "success", result : cartResult})

}

export const resolveCart = async(req, res) => {
    const {resolveCart} = res.query
    let cart = await cartService.getCartById(req.params.cid)
    cart.status = resolveCart
    await cartService.resolveCart(cart._id, cart)
    res.send({status: "success", result: "orden resuelta"})
}

export const deleteCart = async(req,res) => {



}

import cartModel from '../models/carts.model.js'

export default class Cart{
    getCart= async() => {
        try {
            let result = await cartModel.find()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getCartById= async(id) => {
        try {
            let result = await cartModel.findOne({_id: id})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    createCart= async() => {
        try {
            let result = await cartModel.create(cart)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    resolveCart= async(id, art) => {
        try {
            let result = await orderModel.updateOne({_id: id},{$set : cart})
        } catch (error) {
           console.log(error) 
           return null
        }
    }

}
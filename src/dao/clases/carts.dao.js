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

    getCartById= async(cid) => {
        try {
            let result = await cartModel.findOne({_id: cid})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    createCart= async(cart) => {
        try {
            let result = await cartModel.create(cart)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateCart= async(cid, cart) => {
        try {
            let result = await cartModel.updateOne({_id: cid},{$set : cart})
            return result
        } catch (error) {
           console.log(error) 
           return null
        }
    }

    totalcartquantity = async (cid, newtotal) =>{
        try{
            const result = await cartModel.updateOne({_id: cid}, {set:{total:newtotal}})
            return result;
        }  catch(error){
            console.log(error)
            return null
        }
    }

    deleteCart= async(cid)=>{
        try {
            let result = await cartModel.deleteOne({_id: cid})
        } catch (error) {
            console.log(error)
            return null
        }
    }

    
    linkProductInCart = async (cartId, productId) =>{
     try{
        const cart = await cartModel.findOne({_id: cartId})
        if(!cart){
        return null
        }
        //para iterar los producto del carrito utilizamos el for y compara el productId con el ID del producto proporcionado.si coincide retorna al index donde se encuentra dicho producto
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].product === productId) {
                cart.products[i].quantity ++
                await cartModel.replaceOne({_id: cartId},cart)
              return i;
            }
          } 
          console.log(productId)
          cart.products.push({product: productId, quantity: 1})
          cart.total++ 
        const newCart =  await cartModel.replaceOne({_id: cartId},cart)
        return newCart
        }catch(error){
        console.error('No se pudo ejecutar el codigo ', error);
        return null;
     }   
    }
    
    
    
    
}
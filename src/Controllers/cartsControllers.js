//importamos a carts para crear el carrito con sus atributos y a products para que al agregar, modificar, actualizar o eliminar un prodructo lo llamemos desde el dao desde la class creada por sus endpoints

import Cart from '../dao/clases/carts.dao.js'
import Product from '../dao/clases/products.dao.js'


const cartService = new Cart()
const productService = new Product()
export const getCart = async(req, res) => {
    try{
        let cart = await cartService.getCart()
        res.send({status: "success", payload: cart})
    }catch(error){
        res.status({status: "error", error:'No se pudo obtener los carritos'})
    }
    
}

export const getCartById = async(req, res) => {
    try{
        const {cid} = req.params
        let cart = await userService.getCartById(uid)
        if(!cart){
            res.send({status:'error', error:'carrito no encontrado'})
        }
        res.send({status: "success", payload: cart})
    }catch(error){
        res.send({status:' error', error: 'Error al buscar el carrtio por su ID'})
    }
}


export const createCart = async(req, res) => {
    try{
        const newCart = {
            products :[],
            total : 0,
        }
        let cartResult = await cartService.createCart(newCart)
    res.send({status : "success", payload : cartResult})

    }catch(error){
         res.send({status: 'error', error: 'Error al agregar el carrito'})
    }
}

export const updateCart = async(req, res) => {
    try{
        const pid = req.params.id
        const cid = req.params.id
        const quantity = parseInt(req.body.quantity)
        if(quantity <= 0){
            return res.send({status:'Error', error: 'Por favor debe ingresar la o las cantidades del producto'})
        }
        const addCart = await cartService.getCartById(cid)
        if(!addCart){
            return res.send({status: 'error', error:"carrito no existe"})
        }
        const product = await productService.getProductsById(pid)
        if(!product){
            return res.send({status:'error', error:'No se encontro dicho producto o no existe, por favor verificar'})
        }else{
            res.send({status:'message', message: 'Existe el producto'})
        }
        if(product.stock < quantity){
            return res.send({status: 'error', error: 'Producto sin stock'})
        }else{
            return res.send({status: 'message', message:'Producto con stock'})
        }
        //una vez que los producto estan el carrito debo verificar si los mismo se encuentrar agregados para descontar del stock.
        const productincart = await cartService.linkproductincart(cid,pid)
        if(productincart !== -1){
            const productexists = addCart.products[linkproductincart]
            if(productexists){
                productexists.quantity += quantity
            }
        }else{
            addCart.products.push({product: pid, quantity})
        }
        //markModified es un método que se utiliza para notificar a Mongoose que un camino específico dentro de un documento ha sido modificado y debe ser guardado. Esto es útil cuando estás trabajando con campos anidados en documentos MongoDB y necesitas informar a Mongoose sobre cambios en esos campos para que se reflejen correctamente al guardar el documento.
        addCart.markModified('products')
        const newStock = product.stock-quantity
        product.stock = newStock
        await cartService.updateCart(cid,addCart)
        await productService.updateProduct(pid, product)
        const newTotal = addCart.total + (product.price * quantity);
        const totalResult = await cartService.CartTotal(cid, newTotal);
        return res.json({ message: 'Producto agregado al carrito correctamente.' });
    }catch(error){
        console.error('Error al agregar el producto:', error);
        return res.status(500).json({ message: 'Error al agregar el producto.' });
    }
}

export const deleteCart = async(req,res) => {
    try{
        const cid =req.params.cid
        const removeCart = await productService.getProductsById({ _id: cid})
        
        if(!removeCart){
            return res.send(404).json({status:"error", error:'no se encuentra el carrito'})
        }
        //el lo lo utilizamos para por tener los producto que habiamos comprado supuestamente en el carrito vuelvan al stock de cada producto
        for (const productInTheCart of removeCart.products) {
            const product = await productService.getProductById(productInTheCart.product);
            const quantity = productInTheCart.quantity;

            await productService.updateProduct(
                { _id: product._id },
                { $inc: { stock: quantity } }
            );
        }

    await cartService.deleteCart({ _id: cid });
        return res.json({ message: 'Carrito eliminado y stock normalizado.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el carrito.' });
    }
}




export const deleteproductontheCart = async (req, res)=> {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = parseInt(req.body.quantity);
        if (quantity <= 0) {
            return res.status(400).json({ error: 'La cantidad de los producto debe ser mayor que 0.' });
        }
        const cart = await cartService.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'No se detecta ningun carrito.' });
        }
        const product = await productService.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'No se encuentra el producto.' });
        }
        const productIndex = await cartService.linkproductincart(cid, pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'No existe ningun producto agregado al carrito' });
        }
        const productInTheCart = cart.products[productIndex];
        if (productInTheCart.quantity < quantity) {
            return res.status(400).json({ error: 'La cantidad a eliminar es mayor que la cantidad en el carrito.' });
        }
        // Restar la cantidad del producto en el carrito
        productInTheCart.quantity -= quantity;
        // Actualizar el stock del producto y el total del carrito
        product.stock += quantity;
        const productTotal = product.price * quantity;
        cart.total -= productTotal;
        if (productInTheCart.quantity === 0) {
        // Si la cantidad llega a 0, eliminar el producto del carrito
            cart.products.splice(productIndex, 1);
        }
        await productService.updateProduct(pid, product);
        await cartService.updateCart(cid, cart);

        res.json({ message: 'Producto eliminado del carrito correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }

}
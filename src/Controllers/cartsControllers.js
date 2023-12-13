//importamos a carts para crear el carrito con sus atributos y a products para que al agregar, modificar, actualizar o eliminar un prodructo lo llamemos desde el dao desde la class creada por sus endpoints

import { configDotenv } from 'dotenv'
import Cart from '../dao/clases/carts.dao.js'
import Product from '../dao/clases/products.dao.js'
import Ticket from '../dao/clases/ticket.dao.js'
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const cartService = new Cart()
const productService = new Product()
const ticketService = new Ticket()
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
        const pid = req.params.pid
        const cid = req.params.cid
        console.log(pid,cid)
        const quantity = req.body.quantity
        if(quantity <= 0){
            return res.send({status:'Error', error: 'Por favor debe ingresar la o las cantidades del producto'})
        }
        const addCart = await cartService.getCartById(cid)
        console.log(addCart)
        if(!addCart){
            return res.send({status: 'error', error:"carrito no existe"})
        }
        const product = await productService.getProductsById(pid)
        if(!product){
            return res.send({status:'error', error:'No se encontro dicho producto o no existe, por favor verificar'})
        }
        if(product.stock < quantity){
            return res.send({status: 'error', error: 'Producto sin stock'})
        }
        //una vez que los producto estan el carrito debo verificar si los mismo se encuentrar agregados para descontar del stock.
        const productincart = await cartService.linkproductincart(cid,pid)
        if(typeof productincart === "number" ){
            const productexists = addCart.products[productincart]
                productexists.quantity += quantity
                res.send({status: 'success', message:'Se agrego una unidad al producto existente',result: productincart})
        }else if(!productincart){
            return res.send({status:'error', error: 'Obtuvimos error en el metodo de cartdao'})
         
        }else{
            res.send({status: 'success', result: productincart})
        }
     
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
        for (const productincart of removeCart.products) {
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
        
        productInTheCart.quantity -= quantity;
       
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
export const purchease = async (req, res)=> {
   try {
    const cartId = req.params.cid
    const cart = await cartService.getCartById(cartId)
    if(!cart){
      return  res.send({status: 'error', error: 'Carrito no encontrado'})
    }
    
    let amount = 0;
    for (let i = 0; i < cart.products.length; i++) {
        const product = await productService.getProductsById(cart.products[i].product)
        if(product.stock > cart.products[i].quantity ){
            cart.products.splice(i,1)
            cart.total--
            product.stock -= cart.products[i].quantity
            await productService.updateProduct(product.id, { stock: product.stock });

            const totalProduct = product.price * cart.products[i].quantity;
            amount += totalProduct;


            console.log(`Producto: ${product.title}, Cantidad: ${cart.products[i].quantity}, Subtotal: ${totalProduct}`);
        } 
        
    }

    ///para generar el unico code utilice un formate que  saque de internet el uuid para generar un unico codigo universal. tuve que instalar el uuid y el date-fns para el formato de la fecha
    const generateUniqueCode = () => {
        return uuidv4();
    };
    
    //una vez cumplido el codigo anterior lo que hago hacer esa info para imprimir el ticket utilizando el formato que hicimos en dao
    const ticket = {
        code: generateUniqueCode(),
        purchase_datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        amount: amount,
        purchase: cart.products
    };
    //lo que hago es consologuear el codigo y ver que se este ejecutando, y si podia lo mando a la base de datos
    console.log('Ticket:', ticket);
    return res.send({ status: 'success', payload: ticket });


    }  catch(error) {
    console.error(error);
     return res.send('no se genero el ticket')
    }
   
}
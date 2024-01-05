//importamos a carts para crear el carrito con sus atributos y a products para que al agregar, modificar, actualizar o eliminar un prodructo lo llamemos desde el dao desde la class creada por sus endpoints

import { configDotenv } from 'dotenv'
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
        let cart = await cartService.getCartById(cid)
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

export const deleteCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const removeCart = await cartService.getCartById({ _id: cid });

        if (!removeCart) {
            return res.status(404).json({ status: "error", error: 'No se encuentra el carrito' });
        }

        // Utilizamos un bucle para devolver los productos del carrito al stock
        for (const productInTheCart of removeCart.products) {
            const product = await productService.getProductsById(productInTheCart.product);
            const quantity = productInTheCart.quantity;

            await productService.updateProduct(
                { _id: product._id },
                { $inc: { stock: quantity } }
            );
        }

        await cartService.deleteCart({ _id: cid });
        return res.json({ message: 'Carrito eliminado y stock normalizado.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el carrito.' });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const pid = req.params.pid;
        const quantity = parseInt(req.body.quantity);

        // Validación de cantidad
        if (quantity <= 0) {
            return res.status(400).json({ error: 'La cantidad del producto debe ser mayor que 0.' });
        }

        // Obtener el carrito por ID
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'No se encuentra ningún carrito.' });
        }

        // Obtener el producto por ID
        const product = await productService.getProductsById(pid);
        if (!product) {
            return res.status(404).json({ error: 'No se encuentra el producto.' });
        }

        // Obtener el índice del producto en el carrito
        const productIndex = await cartService.linkProductInCart(cartId, pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'No existe ningún producto agregado al carrito.' });
        }

        // Verificar que la cantidad a eliminar no sea mayor que la cantidad en el carrito
        const productInTheCart = cart.products[productIndex];
        if (productInTheCart.quantity < quantity) {
            return res.status(400).json({ error: 'La cantidad a eliminar es mayor que la cantidad en el carrito.' });
        }

        // Actualizar la cantidad, el stock y el total del carrito
        productInTheCart.quantity -= quantity;
        product.stock += quantity;
        const productTotal = product.price * quantity;
        cart.total -= productTotal;

        // Si la cantidad llega a 0, eliminar el producto del carrito
        if (productInTheCart.quantity === 0) {
            cart.products.splice(productIndex, 1);
        }

        // Actualizar la información en la base de datos
        await productService.updateProduct(pid, product);
        await cartService.updateCart(cartId, cart);

        res.json({ message: 'Producto eliminado del carrito correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }
};

/* export const purchase = async (req, res)=> {
   try {
    const cartId = req.params.cid
    const cart = await cartService.getCartById(cartId)
    if(!cart){
      return  res.send({status: 'error', error: 'Carrito no encontrado'})
    }
    
   let amount = 0 ;
    for (let i = 0; i < cart.products.length; i++) {
        const product = await productService.getProductsById(cart.products[i].product);
        
        if (product.stock > cart.products[i].quantity) {
            cart.products.splice(i, 1);
            cart.total--;
            product.stock--;
         //  await productService.addProduct(product.id, { stock: product.stock }); 

           
             const totalProduct = product.price * cart.products[i].quantity;
            amount += totalProduct  
            
          
             console.log(`Producto: ${product.title}, Cantidad: ${cart.products[i].quantity}, Subtotal: ${totalProduct}`);
 
        
        }
       
   
    }
    
    //console.log('total de la compra', totalAmount)
    
   
    ///para generar el unico code utilice un formate que  saque de internet el uuid para generar un unico codigo universal. tuve que instalar el uuid y el date-fns para el formato de la fecha
      const generateUniqueCode = () => {
        return uuidv4();
    };
     
    //una vez cumplido el codigo anterior lo que hago hacer esa info para imprimir el ticket utilizando el formato que hicimos en dao
    const ticket = {
        code: generateUniqueCode(),
        purchase_datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        amount:amount,
        purchase: cart.products
    }; 
 
    //lo que hago es consologuear el codigo y ver que se este ejecutando, y si podia lo mando a la base de datos
    console.log('Ticket:', ticket);
   return res.send({ status: 'success', payload: ticket });
 
   


    }  catch(error) {
    console.error(error);
     return res.send('no se genero el ticket')
    }
   
} */


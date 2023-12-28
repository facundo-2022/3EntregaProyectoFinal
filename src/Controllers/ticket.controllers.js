
import ticketService from "../dao/fs/ticket.factory.js"
import cartService from "../dao/fs/carts.factory.js"
import userService from "../dao/fs/usuario.factory.js"
import path from "path";
import TicketDTO from '../dao/DTO/ticket.DTO.js'
//import {  sendEmail } from '../utils/server.js'
//import { sendSMS } from '../utils/twilio.js'
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';



export const purchase = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            return res.send({ status: 'error', error: 'Carrito no encontrado' });
        }

        let amount = 0;
        const updatedProducts = [];

        for (const cartProduct of cart.products) {
            const product = await productService.getProductsById(cartProduct.product);

            if (product.stock > cartProduct.quantity) {
                const totalProduct = product.price * cartProduct.quantity;
                amount += totalProduct;

                console.log(`Producto: ${product.title}, Cantidad: ${cartProduct.quantity}, Subtotal: ${totalProduct}`);

                // Añadir el producto actualizado al nuevo array
                updatedProducts.push({
                    product: cartProduct.product,
                    quantity: cartProduct.quantity
                });

                // Actualizar el stock del producto
                product.stock--;

               //actualizo los datos del stock en mi base de datos
                 await productService.addProduct(product.id, { stock: product.stock });
            }
        }

        // Actualizar el array de productos en el carrito
        cart.products = updatedProducts;
        cart.total = updatedProducts.length;

        

        const generateUniqueCode = () => {
            return uuidv4();
        };

        const ticket = {
            code: generateUniqueCode(),
            purchase_datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            amount: amount,
            purchase: cart.products
        };
        // Guardar el ticket en la base de datos
        const savedTicket = await ticketService.saveTicket(ticket);

        console.log('Ticket guardado en la base de datos:', savedTicket);
        return res.send({ status: 'success', payload: savedTicket });
        /* console.log('Ticket:', ticket);
        return res.send({ status: 'success', payload: ticket }); */
    } catch (error) {
        console.error(error);
        return res.send('no se generó el ticket');
    }
};


//buscar todo los ticket
export const getAllTickets = async(req,res)=>{

    try {
        const result = await ticketService.getAllTickets(tid)

    } catch (error) {
        
    }
}
//buscar ticket por su id

export const getTicketById = async (req, res) => {
    try {
        const {tid} = req.params;

        const ticket = await ticketService.getTicketById(tid);

        if (!ticket) {
            return res.status(404).send({ status: 'error', error: 'Ticket no encontrado' });
        }

        res.send({ status: 'success', payload: ticket });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};


export const deleteTicket = async (req, res) => {
    try {
        let {tid} = req.params;
        let result = await ticketService.deleteTicket({_id: tid})
        res.send({ result: "success", message: 'Ticket eliminado con exito.', payload: result })      
    } catch (error) {
        res.send({ status: "error", error: 'Error no se pudo eliminar el ticket.' });
    }
}
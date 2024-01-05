import { getCart, getCartById, createCart, updateCart, deleteCart, deleteProductFromCart,  } from "../Controllers/cartsControllers.js";
import {getAllTickets, purchase, getTicketById} from '../Controllers/ticket.controllers.js'
import { Router} from 'express'
import { get } from "mongoose";


const router = Router();

router.get("/", getCart)
router.get("/:cid", getCartById)
router.post("/", createCart)
router.put("/:cid/:pid", updateCart)
router.post("/:cid/purchase", purchase )
router.delete("/:cid", deleteCart)
router.delete('/:cid/producto/:pid', deleteProductFromCart)
router.get("/ticket/:tid", getTicketById)

export default router

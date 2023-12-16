import { getCart, getCartById, createCart, updateCart, deleteCart, deleteproductontheCart, purchase, getTicketById } from "../Controllers/cartsControllers.js";
import { Router} from 'express'
import { get } from "mongoose";


const router = Router();

router.get("/", getCart)
router.get("/:cid", getCartById)
router.post("/", createCart)
router.put("/:cid/:pid", updateCart)
router.post("/:cid/purchase", purchase )
router.delete("/", deleteCart)
router.delete('/:cid/producto/:pid', deleteproductontheCart)
router.get("/:tid", getTicketById)

export default router

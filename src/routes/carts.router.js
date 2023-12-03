import { getCart, getCartById, createCart, updateCart, deleteCart, deleteproductontheCart } from "../Controllers/cartsControllers.js";
import { Router} from 'express'


const router = Router();

router.get("/", getCart)
router.get("/:cid", getCartById)
router.post("/", createCart)
router.put("/:cid", updateCart)
router.delete("/", deleteCart)
router.delete('/:cid/producto/:pid', deleteproductontheCart)

export default router

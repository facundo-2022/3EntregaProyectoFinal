import { getCart, getCartById, createCart, updateCart, deleteCart, deleteproductontheCart, purchease } from "../Controllers/cartsControllers.js";
import { Router} from 'express'


const router = Router();

router.get("/", getCart)
router.get("/:cid", getCartById)
router.post("/", createCart)
router.put("/:cid/:pid", updateCart)
router.post("/:cid/purchease", purchease )
router.delete("/", deleteCart)
router.delete('/:cid/producto/:pid', deleteproductontheCart)

export default router

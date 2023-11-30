
import {getProducts, getProductsById, createProducts, addProduct, deleteProduct,  } from '../Controllers/productsControllers.js'
 import {Router}  from 'express'

const router = Router();

router.get("/", getProducts)
router.get("/:pid", getProductsById)
router.post("/", createProducts)
router.put("/:pid/products", addProduct)
router.delete("/pid", deleteProduct)


export default router


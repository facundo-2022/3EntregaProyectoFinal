
import Product from '../dao/clases/products.dao.js'

const productService = new Product()

export const createProducts = async(req, res) => {
    const product = req.body
    let result = await productService.saveProduct(product)
    if(!result) return res.status(500).send({status: "error", error: "Error al crear un producto"})
    res.send({status: "success", result: result})
}

export const addProduct = async(req, res) => {
    let product = req.body
    let result = await productService.getProductsById(req.params.bid)
    products.push(result)
    await productService.updateProduct(result._id, result)

    res.send({status: "success", result: "Producto actualizado"})
}

export const getProducts = async(req, res) => {
    let result = await productService.getProducts()
    if(!result) return res.status(500).send({status: "error", error: "Error al consultar producto"})
     res.send({status: "success", result: "getProducts"})
}

export const getProductsById = async(req, res) => {
    const {pid} = req.params
    let result = await productService.getProductsById(pid)
    if(!result) return res.status(500).send({status: "error", error: "Error de busqueda"})
    res.send({status: "success", result: "getProductsById"})
}

export const deleteProducts = async (req, res) =>{
    const {pid} = req.params
    let result = await productService.deleteProducts(pid)
    if (!result) return res.status(500).send({status: "error", error: "Error al eliminar producto"})
    res.send({status: "success", result: "deleteProducts"})
}





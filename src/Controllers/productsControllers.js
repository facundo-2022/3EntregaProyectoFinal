
import Product from '../dao/clases/products.dao.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirnname = dirname(__filename)
const productService = new Product()
export const createProducts = async(req, res) => {
    try{
        let { title, description, category, price, stock} = req.body;
        if (!title || !description || !category || !price || !stock || !code) {
            return res.status(400).send({ status: "error", error: 'Campo obligatorio, Por favor completar los datos ' });
    }
    const thumbnailFilename = req.file ? req.file.filename : null;
        const thumbnails = thumbnailFilename ? [thumbnailFilename] : [];
        // cargamos los nuevos productos a la base de datos

        let result = await productService.createProduct({
            title, 
            description, 
            category, 
            price, 
            stock,
            code,
            thumbnails,
            status: true
        })
            res.send({status: "success", payload: result})
            console.log(result)
} catch(error){
        res.status(304).send({ status: "error", error: 'Error, no se pudo agregar  producto'  });

}
}
export const addProduct = async(req, res) => {
    try{
        let {pid} = req.params
        const updateproduct = req.body
        //ahora vamos a configurar los parametros de acutilizar los compos de un producto como su stock, estado del producto
        if(Object.keys(updateproduct).length ==0){
            return res.send({status: 'error', error: 'completar lo datos para acutilizar los productos'})
        }
        if(updateproduct.stock === "0"){
            updateproduct.status = false;
        }else{updateproduct.status = true;
        console.log("Producto se actualizo:" + updateproduct)
    }
        let result = await productService.addProduct(pid, updateproduct);
        if(!result){
            return res.send({status: "success", error: "no se encontro el producto"})
        }
        
    }catch(error){
        console.error(`Error: ${error}`);
        res.send({ status: "error", error: 'Error no se pudo actualizar el producto.' });
    }

}

export const getProducts = async(req, res) => {
    let result = await productService.getProducts()
    if(!result) return res.status(500).send({status: "error", error: "Error al consultar producto"})
     res.send({status: "success", result: result})
}


//endpoint para consultar producto por su id
export const getProductsById = async(req, res) => {
    const {pid} = req.params
    let result = await productService.getProductsById(pid)
    if(!result) return res.status(500).send({status: "error", error: "Error de busqueda"})
    res.send({status: "success", result: result})
}

//endpoint para eliminar un producto
export const deleteProduct = async (req, res) =>{
    try{
        const {pid} = req.params
        let result = await productService.deleteProduct({_id: pid})
        res.send({result: "status", mesaage:'Producto eliminado con exito'})
    }catch(error){
        res.status(422).send({status: "error", error: "Error, no se pudo eliminar producto"})
    }
    
    
}
/* 
export const productForm = (req, res) =>{
    res.render('product')
}


 */
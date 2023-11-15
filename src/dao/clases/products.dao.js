import productModel from '../models/products.model.js'

export default class Product {
    getProducts = async() =>{
        try {
            let result = await productModel.findOne()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    getProductsById = async(id) =>{
        try {
            let result = await productModel.findOne({_id: id})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    createProducts = async(product) =>{
        try {
            let result = await productModel.create(product)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    addProduct = async(id, product) =>{
        try {
            let result = await productModel.updateOne({_id: id},{$set:product})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    saveProduct = async(user) => {
        try {
            let result = await productModel.create()
            return result
            console.log('El usuario creo correctamente')
        } catch (error) {
            console.log(error)
            return res.status(404).send({status:"error", error:'Error al guardar usuario'})
            
        }
    }

    deleteProduct = async (id, product) =>{
        try{
            let result = await productModel.deleteOne({ _id: uid });
            res.send({ result: "success", payload: result });
            return result
        }catch{
            console.log(error)
          return res.status(500).send({status:"error", error:'error al eliminar el producto'})
        }
    }
}
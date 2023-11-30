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
    getProductsById = async(pid) =>{
        try {
            let result = await productModel.findOne({_id: pid})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    createProduct = async(product) =>{
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
 
    deleteProduct = async (id, product) =>{
        try{
            let result = await productModel.deleteOne({ _id: pid });
            res.send({ result: "success", payload: result });
            return result
        }catch{
            console.log(error)
          return res.status(500).send({status:"error", error:'error al eliminar el producto'})
        }
    }

    paginate = async (conditions, options) => {
        try {
            const { page, limit, sort } = options;

            const result = await productModel.paginate(conditions, {
                page,
                limit,
                sort,
            });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
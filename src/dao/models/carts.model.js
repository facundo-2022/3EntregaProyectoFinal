import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const cartCollection = "carts";

const cartProductSchema = new mongoose.Schema({
  product: { type: String, required: true  },
  quantity: { type: Number, required: true },
},{ _id: false });


const cartSchema = mongoose.Schema({
  products: [cartProductSchema],
   total:{type: Number, required: true, default: 0},
  },{ versionKey: false });
  ;


cartSchema.plugin(mongoosePaginate); 
const cartModel = mongoose.model(cartCollection, cartSchema);


export default cartModel
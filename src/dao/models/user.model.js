import mongoose from "mongoose";
import  mongoosePaginate from "mongoose-paginate-v2";
 
const userCollection = "users";

//El esquema de modelado de como van a lucir los datos

const userSchema = mongoose.Schema({
  first_name: { type: String, index: true },
  last_name: String,
  email: String,
  age: String,
  password: String,
  cartId: {type: mongoose.Schema.Types.ObjectId, ref: 'cart'},
  role:{ type: String, enum: ["user", "admin"], default: "user"},
},{ versionKey: false });



userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);

 export default userModel
 
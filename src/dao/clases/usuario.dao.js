import userModel from '../models/user.model.js'

export default class User {

    createUser = async(user) =>{
        try {
            let result = await userModel.create(user)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
   
    getUser = async() =>{
        try {
            let users = await userModel.find()
            return users
            //console.log("El usuario encontrado contiene los siguientes datos:" + users)
        } catch (error) {
            console.log(error)
            return null                                                         
            //return res.status(404).send({status:"error", error:'usuario no existe, verificar datos'})
            
        }
    }

    //consultamos el usaurio por su id
     getUserById = async(id) =>{
        try {
            let user = await userModel.findOne({_id: id})
            return user
        } catch (error) {
            console.log(error)
           return null
        }
    }

    updateUser = async (id, user) => {
        try {
            let result = await userModel.updateOne({ _id: id }, { $set: user })
            return result
        } catch (error) {
            return null
        }
    }

    deleteUser = async (id) => {
        try {
            let user = await userModel.deleteOne({ _id: id })
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getUserByEmail = async (email) => {
        try {
            let user = await userModel.findOne({ email: email });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}


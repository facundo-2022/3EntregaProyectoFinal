import userModel from '../models/user.model.js'

export default class User {

    
    getUser = async() =>{
        try {
            let users = await userModel.find()
            return users
            console.log("El usuario encontrado contiene los siguientes datos:" + users)
        } catch (error) {
            console.log(error)
            return res.status(404).send({status:"error", error:'usuario no existe, verificar datos'})
            
        }
    }

    //consultamos el usaurio por su id
    getUserById = async() =>{
        try {
            let user = await userModel.findOne({_id: id})
            return user
        } catch (error) {
            console.log(error)
            return res.status(404).send({status:"error", error:'El id no coincide con el usuario'})
        }
    }


    //creamos el usuario en user y usamos los parametros desde userModel 
    saveUser = async(user) => {
        try {
            let result = await userModel.create(user)
            return result
            console.log('El usuario creo correctamente')
        } catch (error) {
            console.log(error)
            return res.status(404).send({status:"error", error:'Error al guardar usuario'})
            
        }
    }
}
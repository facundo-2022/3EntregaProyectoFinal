import User from '../dao/clases/usuario.dao.js'
import Cart from '../dao/clases/carts.dao.js'
import { createHash, isValidatePassword } from '../utils/utils.js'
import passport from 'passport'
import config from '../config/passport.config.js'



const admin = config.adminName
const usuarioService = new User()
const cartService = new Cart()


export const getUser = async(req, res) =>{
    try{
       const user = await usuarioService.getUser()
       if(user || user.length > 0){
        res.send({result:"success", payload: user})
       }else{
        res.send({status:"success", message:'usuario no registrado, por favor registrarse'})
       }
       
    }catch(error){
        res.send({status:"error", error:' no se encuentra registrado el usuario'})

    }
}

export const getUserById = async(req, res) =>{

    try{ const {uid} = req.params
    const user = await usuarioService.getUserById(uid)
    if(user){
        res.send({status:"success", payload:user})
    }else{
        res.send({status:"error", message: 'usuario no registrado, por favor registrarse' })
    }

    }catch(error){
        res.send({status:"error", error:' no se encuentra registrado el usuario'})
    }
   
}
 

export const updateUser = async(req, res) =>{
    const user = req.body
    let result = await usuarioService.updateUser(user)
    res.send({status:"success", result: result})
}

export const createUser = async(req, res, next) =>{
    const user = req.body
    let result = await usuarioService.createUser(user)
    res.send({status:"success", result: result}) 
    
}

export const deleteUser = async(req,res)=>{
    const user = req.body
    let result = await usuarioService.deleteUser(user)
    res.send({status:"success", result: result}) 
}
export const userForm = (req, res)=>{
    res.render('register')}

export const userSession = (req, res) =>{
    res.render('login')
}
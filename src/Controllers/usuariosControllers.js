import User from '../dao/clases/usuario.dao.js'
import Cart from '../dao/clases/carts.dao.js'
import { createHash, isValidatePassword } from '../utils/utils.js'
import passport from 'passport'
import config from '../config/config.js'




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
    
        const update = req.body;
            if (!update || Object.keys(update).length === 0) {
            return res.status(400).send({ status: "error", error: "Faltan datos, por favor completar para actualizar" });
        }
        try {
            const user = await usuarioService.getUserByEmail(update.email);
            if (!user) {
                return res.status(404).send({ status: "error", error: "Error, No encuentra el usuario" });
            }
            // si me olvido la contraseña puedo actualizarla con update.password
            if (update.password) {
                update.password = createHash(update.password);
            }
            // aca podemos actualizar los datos del usuario que vamos a recibir desde el body
            const updatedUser = await usuarioService.updateUser(user._id, update);
            if (!updatedUser) {
                return res.status(500).send({ status: "error", error: "Faltan datos, por favor completar para actualizar" });
            }
            //aca si tengo un error lo que hacemos es volver a la pagina de login para intantar nuevamente.

            res.redirect('/login');
            
        } catch (error) {
            console.error(error);
            return res.status(500).send({ status: "error", error: "Faltan datos, por favor completar para actualizar" });
        }
    }



export const createUser = async(req, res, next) =>{
    passport.authenticate('registro', (err,user, info)=>{
        if(err){
            console.log(err)
            return res.status(500).json({error: 'No se pudo registrar, vuelva a intentarlo '})
        }
        if(!user){
            return res.reditect('./register')
        }
        return res.redirect('login')
    }) (req, res,next)
    
    
}

export const deleteUser = async(req,res)=>{


    try{
        const userId = req.params.uid;
        if(!userId){
            return res.status(404).json({status:'Error', error: 'Error, completar id del usuario'})
        }
        const userdelete = await usuarioService.getUserById(userId);
        if (!userdelete) {
            return res.status(404).json({ status: 'Error', error: 'Error, No encuentra el usuario' });
        }else{
            return res.json({ status: 'Usuario eliminado correctamente' });

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'Error', error: 'Ocurrio un error no se puede eliminar usuario' });
    }
    }

 
export const userForm = (req, res)=>{
    res.render('./register')}

export const userSession = (req, res, next) =>{
    passport.authenticate('login', (err, user, info)=>{
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            cart: user.cart
        }
        //si es error que me mande un msj de error y que me direccione al registro
        if(err){
            console.error(err)
            return res.status(500).json({error:'Error al iniciar session, verifique datos o por favor registrarse'})
            
        }
        if(!user){
            return res.redirect('/register')
        }
        //si user.email coincide con admin que me envia al hbs de admin para poder modificar o editar lo que el quisiera y de caso contrario que te direccione al hbs de products para poder hacer una comprar como usuario común.
        if(user.email ===admin){
            req.session.admin =true
            return res.redirect('/licenseadmin')
        }else{
            req.session.admin = false
            res.redirect('/products')
        }
        

    })(req, res, next);
}

export const login = passport.authenticate('login', {
    successRedirect: '/successlogin',
    failureRedirect: '/faillogin',
})
export  const logout = (req, res) => {
    req.logout();
    res.redirect('login');
  };
import passport from "passport";
import local from "passport-local";
import  User from '../dao/clases/usuario.dao.js';
import Cart from '../dao/clases/carts.dao.js'
import { createHash, isValidatePassword } from "../utils/utils.js";
import GitHubStrategy from "passport-github2";
import config  from './config.js';

const localStrategy = local.Strategy;
const admin = config.adminName
const clientID = config.clientID
const clientSecret = config.clientSecret
const callbackURL = config.callbackURL
const usuarioService = new User()
const cartService = new Cart()

//configuracion del middleware y su  autenticacion para passport.js 
const initializePassport = () => {
    configureLocalStrategy();
    configureGitHubStrategy();
    configureSerialization();
};


//aca configuro la autenticación para GitHub para que con mi usuario de github pueda ingresar.
const configureLocalStrategy = () => {
// Configuración de la estrategia local de registro
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            const { first_name, last_name, email, age} = req.body;
            try {
                let user = await usuarioService.getUserByEmail(username);
                if (user) {
                    console.log("El usuario registrado con exito");
                    return done(null, false);
                }
                
                // Crear el carrito primero
                const newCart = await cartService.createCart({
                    products: [],
                    total: 0
                });

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: newCart._id
                }

                if (email === admin) {
                    newUser.role = "admin";
                    console.log('Usted tiene permiso de edicion')
                }

                // Crear el usuario después de crear el carrito
                let result = await usuarioService.createUser(newUser);
                return done(null, result);
            } catch (error) {
                console.error("Error en el registro:", error);
                return done(error);
            }
        }
        ));
    // Configuración par ña estrategia local de inicio de sesión del usuario
    passport.use('login', new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await usuarioService.getUserByEmail(email);
            if (!user) {
                console.log('El usuario no existe, verificar datos ingresados ');
                return done(null, false);
            }
            if (!isValidatePassword(user, password)) {
                console.log('Password incorrecto, verificar datos ingresados');
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return done(error);
        }
    }));
    
}
const configureGitHubStrategy = () => { 
    // Configuración de la estrategia de registro con GitHub, para poder utilizar esta opcion debemos instalar passport-github2
    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.f26e4f1f954a0d52",
        clientSecret: "481456f66b327ccccb6c701d5717c5b97784e6db",
        callbackURL: "http://localhost:8080/api/usuarios/githubcallback",
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            let user = await usuarioService.getUserByEmail(profile._json.email)
            if(!user){ // si el usuario agregado no existe se agrega a la base de dato y luego creo el carrito correspondiente al usuario
                const newCart = await cartService.createCart({
                    products: [],
                    total: 0
                });
                let newUser = {
                    first_name:profile._json.name,
                    last_name:'',
                    age:18,
                    email:profile._json.email,
                    password:'', 
                    cart: newCart._id
                }
                let result = await usuarioService.createUser(newUser)
                done(null, result)
            } else { //aca verifico si mi usuario existe es porque esta en la base de datos.
                done(null, user)
            }
        }catch(error){
            return done(error)
        }
    }))
}
//configuramos la serialización y deserialización de los usuarios,para almacenar la información del usuario en la sesión después de su autenticacion lo que permite a la aplicación recordar el estado de autenticación del usuario en las solicitudes subsiguientes.
const configureSerialization = () => { 
    // Serialización del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    // Deserialización del usuario
    passport.deserializeUser(async (id, done) => {
        let user = await usuarioService.getUserById(id);
        done(null, user);
    })
}

export default initializePassport
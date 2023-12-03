import express from "express";
import passport from "passport";
import { getProducts} from '../Controllers/productsControllers.js'
import { createUser,  userSession , updateUser/* , userForm */} from '../Controllers/usuariosControllers.js'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

// mis peticiones de las vistas 

router.post('/register', createUser)

router.post('/login', userSession) 

router.get('/products', getProducts)
router.get('/register',(req, res) =>{
    res.render('/register')})

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/restore', (req, res) => {
    const email = req.query.email || ''
    res.render('restore', { email })
});

router.get('/faillogin', (req, res) => {
    res.render('/')
});

router.get('/admin', async (req, res) => {
    try {
        const viewPath = path.join(__dirname, '../views/licenseadmin.hbs');
        const { first_name, email, age } = req.session.user;
        res.render(viewPath, { first_name, email, age });
    } catch (error) {
        res.status(500).json({ error: 'Error en el ingreso al admin.' });
    }
});

/* router.get('/register', (req, res) => {
    res.render('register.hbs')
 
}); */

router.get('/failregister', async (req, res) => {
    res.send({ error: "No se pudo registrar correctamente, vuelva intentarlo" });
});

router.get('/logout', (req, res) => {
    // 
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/');
        } else {
            res.send({ status: 'Error al realizar logout', body: err });
        }
    });
});

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    const { first_name, last_name, email, age } = req.session.user;
    res.render('profile.hbs', { first_name, last_name, email, age });
});

router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send('¡Bienvenido!');
    }
});

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'login'}), async(req,res) => {
    // Nuestra estrategia nos devolvera al usuario, solo lo agregamos a nuestro objeto de sesión.
    req.session.user = req.user
    res.redirect('/products');
})

export default router;
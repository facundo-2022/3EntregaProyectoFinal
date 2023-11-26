import express  from 'express';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo';
import cors from 'cors'
import usuarioRouter from './routes/usuarios.router.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import views from './routes/views.js'
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config/config.js';
import initializePassport from './config/passport.js'
import passport from 'passport';
import path from 'path';

const PRIVATE_KEY = "CoderKey"
const app = express();
const port = 8080;
const cookiePass = config.cookiePass;
const adminPass = config.adminPass;
const mongoURL = config.mongoUrl;
//configuracion de motor de pantillas y las vitas de las rutas a utilizar
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const hbs = handlebars.create({})

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "handlebars"); 
//app.use(express.static(path.join(__dirname, 'public')));


//Enlace de conexion con mongoose atlas


 mongoose
.connect(
  "mongodb+srv://facundom:Amparo.23@cluster0.ko8l77a.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("Conectado con mi base de datos");
})
.catch((error) => console.error("Error en la conexion"));



app.use(session({
  store: MongoStore.create({
      mongoUrl: "mongodb+srv://facundom:Amparo.23@cluster0.ko8l77a.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 6000,
  }),
  secret: "481456f66b327ccccb6c701d5717c5b97784e6db",
  // resave en false hace que la sesión muera luego de un tiempo, si quiero que quede activa le pongo true
  resave: false,
  // saveUninitialized en true guarda sesión aun cuando el objeto de sesión no tenga nada por contener
  saveUninitialized: true,
}));
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(cookiePass))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:5500', methods: ["GET", "POST", "PUT", "DELETE"] }))

//esto es lo que vamos a consumir de routes mis peticiones
app.use("/usuarios", usuarioRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use('/',views)



/* const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user:"webdesignstylefm@gmail.com",
    pass:"cbyt euro lihj husx",
  }
})

app.get("/", (req,res)=>{
  res.sendFile(__dirname + '/views/index.html')
})

app.post("/enviar-correo",(req,res)=>{
  const { nombre, correo, mensaje} =req.bodyParser

  let mailOptions = {
  from:"webdesignstylefm@gmail.com",
  to: "fmetzler22@gmail.com",
  subject:"Mail de prueba",
  text: `Nombre ${nombre}, correo${correo}, mensaje ${mensaje} `}


  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      console.log(error)
      res.send("Error de envio")
    }else{
      console.log("Correo enviado", info.response)
      res.send("Correo enviado con exito")
    }
  })
})

 */


/* app.get("/current", authToken ,(req, res) =>{
  res.send({status: "success", payload: req.user})
  console.log
})
 */

app.listen(port, () => {
  console.log(`Serving is running on port ${port}`);
});
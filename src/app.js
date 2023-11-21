import express  from 'express';
import mongoose from 'mongoose'
import usuarioRouter from './routes/usuarios.router.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars';
//import nodemailer from 'nodemailer';
import bodyParser from 'body-parser'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//import { generateToken, authToken } from ("../utils");
/* const express = require("express");
const mongoose = require("mongoose");

const handlebars = require("express-handlebars");
const usuarioRouter = require("./routes/usuarios.router");
const passport = require("passport");
const initializePassport = require("./config/passport.config");
const productRouter = require("./routes/products.router");
import cartRouter = require("./routes/carts.router");
const { generateToken, authToken } = require("../utils");
const cookieParser = require("cookie-parser"); */
const PRIVATE_KEY = "CoderKey"
const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json())


app.engine("handlebars", handlebars.engine());

//app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


/* 
app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json())
 */
/* const session = require("express-session");
const MongoStore = require("connect-mongo"); */


//los middleware
/* initializePassport(passport)
app.use(passport.initialize())
app.set(passport.session())
app.use (cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




 */

/* 
 const users = []

app.post('/register', (req, res) => {
    const {name, email, password} = req.body
    const exists = users.find(user => user.email === email)
    if(exists) return res.status(400).send({status: "error", error: "El usuario ya existe"})

    const user = {
        name, email, password
    }
    users.push(user)

    const access_token = generateToken(user)
    res.send({status: "success", access_token})
}) */
 
app.use(express.json());

//Enlace de conexion con mongoose atlas

 mongoose
    .connect(
      "mongodb+srv://facundom:Amparo.23@cluster0.ko8l77a.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Conectado con mi base de datos");
    })
    .catch((error) => console.error("Error en la conexion"));







//esto es lo que vamos a consumir de routes
app.use("/api/usuarios", usuarioRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use(express.json());

/* const session = require("express-session");
const MongoStore = require("connect-mongo"); */

//configuracion de nodemailor





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
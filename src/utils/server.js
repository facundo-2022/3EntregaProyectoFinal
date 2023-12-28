import express from 'express'
import nodemailer  from'nodemailer'
import bodyParser from 'body-parser'
import  twilio from 'twilio'

const app = express()

const port = 8080;




app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json())

//
const TWILIO_ACCOUNT_SID = "AC2039f00ef199c74dc339ef9bc4abf109"
const TWILIO_AUTH_TOKEN = "8e70d6fc94085ea2ffc765b3c844ac19"
const TWILIO_SMS_NUMBER = "+12406502505"

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user:"webdesignstylefm@gmail.com",
    pass:"cbyt euro lihj husx",
  }
})

app.get("/", (req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

app.get('/sms', async (req, res)=>{
    let result = await client.messages.create({
        body:"prueba de sms",
        from: TWILIO_SMS_NUMBER,
        to:"+543364604129"
})
})
app.post("/enviar-correo",(req,res)=>{
  const { nombre, correo, mensaje} =req.body

 const mailOptions = {
  from:"webdesignstylefm@gmail.com",
  to: "fmetzler22@gmail.com",
  subject:"Mail de prueba",
  text: `Nombre ${nombre}, correo ${correo}, mensaje ${mensaje} `}

console.log(mailOptions)


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

app.listen(port, () => {
    console.log(`Serving is running on port ${port}`);
  });
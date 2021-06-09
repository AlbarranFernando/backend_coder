import express from 'express'
const app = express()
const router = express.Router()
import path from 'path';

/////////////PASSPORT INICIO/////////////////
app.use('/', require('./pass'))
/////////////PASSPORT FIN/////////////////


//////////////////////Conexion Mongo///////////////////////////
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/ecommerce',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('Se conecto piola'))
.catch( (err) => console.log(err));

const prodModel = require ('../models//productos');
const menModel = require( '../models/mensajes');
//////////////////////Conexion Mongo FIN//////////////////////////

express.urlencoded({extended:true})
app.use(express.json())

////WebsocketCAB/////
const http = require('http').createServer(app);
const io = require('socket.io')(http)
var productos: any[] = []
////WebsocketCAB FIN/////


////////////Envio Select Mensajes a front/////////////////
function sele() {

  menModel.find({})
    .then((rows: any) => {
      io.emit('Centro de chat', rows);
    })
    .catch((err) => console.log(err));
  }
////////////Envio Select Mensajes a front FIN/////////////////

////////////Envio Select Productos a front/////////////////
let seleMy:any = ()=> {

  prodModel.find({})
    .then((rows:any) => {
    io.emit('mensaje de chat', rows) })
    .catch((err) => console.log(err))
   
}
////////////Envio Select Productos a front FIN/////////////////


/////////////////Websocket Prodctos/////
io.on('connection', (socket) =>{
  socket.broadcast.emit('mensaje', 'Desde el server')
 console.log('Se conecto un usuario', socket.id)

  socket.on('mensaje de chat', (message) => {
console.log(message);


/////////// Productos Insert/////////////////

const prodSaved = new prodModel(message)
prodSaved.save()
      .then(() => {
        console.log('product inserted!') 
        seleMy()
      })
      .catch((err) => console.log(err))
      
/////////// Productos Insert FIN////////////////

      seleMy(); ////////////Envio Select Productos a front/////////////////
     

        })

        io.emit('mensaje de chat', productos)
        
        socket.on('Centro de chat', (textoChat) => { 
              hist(textoChat)  /////////////Insert Chat en MONGO////////////////
        }) 

        sele()  ////////////Envio Select Mensajes a front//////////////
        seleMy(); ////////////Envio Select Productos a front///////////////
}) 
/////////////////Websocket Prodctos FIN/////

  /////////////////Plantillas/////////////////////////
import handlebars from 'express-handlebars';
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: path.join(__dirname + "/views/layouts"),
    partialsDir: path.join(__dirname + '/views/partials')
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static("public"));
router.get("/productos",async (req, res) => {
  res.render("carga")
});
///////////////////////Plantillas FIN/////////

/////////////Insert Chat en MONGO////////////////
var hist = async (asd) => {
const mensa = {email : asd.email, mensaje : asd.mensaje, fecha : asd.fecha}
         console.log("mensa",mensa);
         console.log(mensa.mensaje.search("administrador"));
         if(mensa.mensaje.search("administrador") !== -1){
          const accountSid = 'ACd29d78e613f034114891e58bab5129ac';
          const authToken = '5d72539cb8b023047e41b1731b35f2c7';
          const smsEnv =  'El usuario ' + mensa.email + ' escribio el mensaje: ' + mensa.mensaje         
          const client = require('twilio')(accountSid, authToken);
          
          client.messages.create({
                      body: smsEnv,
                      from: '+15612203019',
                      to: '+543517890910'
                  })
                .then()
                .catch(console.log) 

                console.log("Sms Enviado");
          }

         
         
  try {
    const menSaved = new menModel(mensa)
    menSaved.save()
      .then(() => {
        console.log('msn inserted!') 
        sele()
      })
      .catch((err) => console.log(err))
   }
  catch (err) {console.log(err)
  }
}
/////////////Insert Chat en MONGO FIN////////////////


///////////////////////////////////

app.use('/',router)

  var PORT = process.env.PORT || 3000;
  http.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);

  });



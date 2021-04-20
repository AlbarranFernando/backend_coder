import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const router = express.Router()
import path from 'path';
//////////////////////Conexion Mongo///////////////////////////
import mongoose from 'mongoose';
let fakerNum:any;

mongoose.connect('mongodb://localhost:27017/ecommerce',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('Se conecto piola'))
.catch( (err) => console.log(err));

//const prodModel = require ('../models//productos');
const menModel = require( '../models/mensajes');
//////////////////////Conexion Mongo FIN//////////////////////////
//////////////////////Cookie INICIO///////////////////////
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))




//////////////////////Cookie FIN///////////////////////
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

  const faker = require ('faker')

   let f:any=[] //= {title:faker.commerce.productName(),price:faker.commerce.price(), thumbnail:faker.image.technics() };
  
   
   for (let i=0; i<fakerNum;i++){
    f.push({title:faker.commerce.productName(),price:faker.commerce.price(), thumbnail:faker.image.image()});
   // console.log("params",[fakerNum]);
  }
 
 if (fakerNum == 0){f.push({title:"No hay productos",price:"No hay productos", thumbnail:"No hay productos"});}
 //console.log(f,fakerNum);
    io.emit('mensaje de chat', f) 
 /*  prodModel.find({})
    .then((rows:any) => {
    io.emit('mensaje de chat', rows) })
    .catch((err) => console.log(err)) */
   
}
////////////Envio Select Productos a front FIN/////////////////


/////////////////Websocket Prodctos/////
io.on('connection', (socket) =>{
  socket.broadcast.emit('mensaje', 'Desde el server')
 console.log('Se conecto un usuario', socket.id)

  socket.on('mensaje de chat', (message) => {
console.log(message);


/////////// Productos Insert/////////////////

/* const prodSaved = new prodModel(message)
prodSaved.save()
      .then(() => {
        console.log('product inserted!') 
        seleMy()
      })
      .catch((err) => console.log(err)) */
      
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
import { stringify } from 'querystring';
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
app.get('/logout',(req,res)=>{
  res.clearCookie('sesion').redirect("/productos/vista-test")
  
})

router.get("/productos/vista-test",async (req, res) => {
  fakerNum = req.query.cant

  let logUs = req.query.log
   if (!fakerNum) {fakerNum=1}  ; 

   if (req.cookies.sesion) res.cookie('sesion', req.cookies.sesion,{maxAge:60000}).render("carga"); 
   
  else if (logUs){ res.cookie('sesion', logUs,{maxAge:60000}).render("carga")}
  else res.render("carga")

 console.log("se recrea cookie");
  

})


///////////////////////Plantillas FIN/////////

/////////////Insert Chat en MONGO////////////////
var hist = async (asd) => {
const mensa = {email : asd.email, mensaje : asd.mensaje, fecha : asd.fecha}
         console.log("mensa",mensa);
         
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



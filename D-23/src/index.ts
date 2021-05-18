import express from 'express'
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

express.urlencoded({extended:true})
app.use(express.json())

////WebsocketCAB/////
const http = require('http').createServer(app);
const io = require('socket.io')(http)
var productos: any[] = []
////WebsocketCAB FIN/////


////////////Envio Select Mensajes a front/////////////////
function sele() {
 
  menModel.find({})//,{"mensaje":1,"autor":1,"_id":0})
    .then((rows: any) => {

////////////////////////normalizr INICIO/////////////
const util = require('util')

function print(objeto){
  console.log(util.inspect(objeto,false,12,true));
}

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema

const BdEj = require( '../models/bdej.json');
//console.log("BD",BdEj);
///////////////////ENTIDADES INICIO//////////////////////////
const user = new schema.Entity('users',{},{idAttribute: 'email'});
const comentario = new schema.Entity('comentario', {
  autor: user},{idAttribute:'_id'}
  );
 const posts = new schema.Entity('posts', {
  posts: [comentario]
 },{idAttribute: 'id'});
///////////////////ENTIDADES FIN//////////////////////////

const pas = JSON.stringify(rows)
const allChat = {"id":"999", "posts":JSON.parse(pas)}
//const allChat = {"id":"999", "posts":rows.map(mensaje => ({...mensaje._doc}))}//JSON.parse(pas)}

const normalizedData = normalize(allChat ,posts);

let denormalizeData = denormalize(normalizedData.result,posts,normalizedData.entities)
console.log(normalizedData);
 
console.log("Nresult",normalizedData.result);
console.log("Posts",posts);
console.log("Entities",normalizedData.entities);
//console.log(allChat);
//console.log(denormalizeData);
//print(denormalizeData);
//console.log("BDEJ",BdEj);
//console.log("ROWS",JSON.stringify(rows));
//console.log("ALLCHAT",allChat);

////////////////normalizr FIN////////////////////////////

io.emit('Centro de chat', normalizedData);

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
 
    io.emit('mensaje de chat', f) 

   
}
////////////Envio Select Productos a front FIN/////////////////


/////////////////Websocket Prodctos/////
io.on('connection', (socket) =>{
  socket.broadcast.emit('mensaje', 'Desde el server')
 console.log('Se conecto un usuario', socket.id)

  socket.on('mensaje de chat', (message) => {


      seleMy(); ////////////Envio Select Productos a front/////////////////
     

        })

        io.emit('mensaje de chat', productos)
        
        socket.on('Centro de chat', (textoChat) => { 
          //console.log("asfasfasf"          );
          
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
router.get("/productos/vista-test",async (req, res) => {
  fakerNum = req.query.cant
   if (!fakerNum) {fakerNum=10}  ; 


   res.render("carga")
});
///////////////////////Plantillas FIN/////////

/////////////Insert Chat en MONGO////////////////
var hist = async (asd) => {
         
  try {
    const menSaved = new menModel(asd)
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



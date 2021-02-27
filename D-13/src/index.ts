import express from 'express'
const app = express()
const router = express.Router()
const path = require('path');

express.urlencoded({extended:true})
app.use(express.json())
const fs = require('fs');

////Websocket/////
const http = require('http').createServer(app);
const io = require('socket.io')(http)
var productos: any[] = []
interface typMen {email: string, mensaje: string, fecha: any} ;
var msgs: any[] =[] ;


io.on('connection', (socket) =>{
  socket.broadcast.emit('mensaje', 'Desde el server')
 console.log('Se conecto un usuario', socket.id)

  socket.on('mensaje de chat', (message) => {

      let productosasd = async () => {
        const products = await import('./Modulos').then(res => res.default)
        let prod = new products(productos)
        prod.addProduct(message)
        io.emit('mensaje de chat', productos)
      }
      productosasd()

        })
        io.emit('mensaje de chat', productos)
        
        
        socket.on('Centro de chat', (textoChat) => { 
          msgs.push(textoChat)
          hist(textoChat)
          console.log(msgs);
          io.emit('Centro de chat', msgs)

        }) 
        io.emit('Centro de chat', msgs)  


}) 
////Websocket/////



  /////////////////Plantillas/////////////////////////
const handlebars  = require('express-handlebars');
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
router.get("/",async (req, res) => {
  res.render("carga")
});
///////////////////////Plantillas fin/////////
////////////////Archivo////////////////

var hist = async (asd) => {
          
  try {

      let itProd =  JSON.stringify( asd)
      await fs.promises.appendFile('historialChat.txt',`${itProd}`)
  }
  catch (err) {
  console.log(err)
  }
}

//producto01.borrar();
///////////////////////////////////

app.use('/',router)

  var PORT = process.env.PORT || 3000;
  http.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);

  });



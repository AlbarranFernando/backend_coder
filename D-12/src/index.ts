import express from 'express'
const app = express()
const router = express.Router()
const path = require('path');

express.urlencoded({extended:true})
app.use(express.json())

////Websocket/////
const http = require('http').createServer(app);
const io = require('socket.io')(http)
var productos: any[] = []

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
router.get("/productos/carga",async (req, res) => {
  res.render("carga")
});
///////////////////////Plantillas fin/////////


app.use('/',router)

http.listen(3000, () => {
  console.log('Running on port 3000');

}) 







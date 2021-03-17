import express from 'express'
const app = express()
const router = express.Router()
const path = require('path');

express.urlencoded({extended:true})
app.use(express.json())
const fs = require('fs');

////WebsocketCAB/////
const http = require('http').createServer(app);
const io = require('socket.io')(http)
var productos: any[] = []
interface typMen {email: string, mensaje: string, fecha: any} ;
var msgs: any[] =[] ;
////WebsocketCAB FIN/////

///////////Mysql Productos/////////////////
const {mysqlConnect} = require('../DB/mysql.db')
const knexq = require('knex')(mysqlConnect)
////////////Crea tabla productos si no ExisteMYSQL///////////////////
knexq.schema.hasTable('producto').then(function(exists) {
  if (!exists) {
      knexq.schema.createTable('producto', table => {
        table.string('title',30)
        table.string('price',10)
        table.string('thumbnail',250)
      })
        .then(() => console.log('table created!'))
        .catch((err) => console.log(err))
        .finally(() => knexq.destroy())
  }
});
///////////Crea tabla productos si no ExisteMYSQL/FIN//////////////////
//////////////////////////////////////////


////////////Envio Select a frontSQLITE3/////////////////
let sele:any = ()=> {
  const {sqlite3Connect} = require('../DB/sqlite3.db')
  const knex = require('knex')(sqlite3Connect)

  knex.from('chat').select('*')
    .then((rows:any) => {
    io.emit('Centro de chat', rows) })
    .catch((err) => console.log(err))
    .finally(() => knex.destroy())
}
////////////Envio Select a frontSQLITE3 FIN/////////////////

////////////Envio Select a frontMYSQL/////////////////
let seleMy:any = ()=> {
  const {mysqlConnect} = require('../DB/mysql.db')
  const knexq = require('knex')(mysqlConnect)

  knexq.from('producto').select('*')
    .then((rows:any) => {
    io.emit('mensaje de chat', rows) })
    .catch((err) => console.log(err))
    .finally(() => knexq.destroy())
}
////////////Envio Select a frontMYSQL/////////////////





/////////////////Websocket Prodctos/////
io.on('connection', (socket) =>{
  socket.broadcast.emit('mensaje', 'Desde el server')
 console.log('Se conecto un usuario', socket.id)

  socket.on('mensaje de chat', (message) => {
console.log(message);


///////////Mysql Productos Insert/////////////////
const {mysqlConnect} = require('../DB/mysql.db')
const knexs = require('knex')(mysqlConnect)
//////////////////////////////////////////

knexs('producto').insert(message)
      .then(() => {
        console.log('product inserted!') 
        seleMy()
      })
      .catch((err) => console.log(err))
      .finally(() => knexs.destroy())
///////////Mysql Productos Insert/FIN////////////////



    /*   let productosasd = async () => {
        const products = await import('./Modulos').then(res => res.default)
        let prod = new products(productos)
        prod.addProduct(message)
        io.emit('mensaje de chat', productos)
      } */
      seleMy(); ////////////Envio Select a frontMYSQL/////////////////
     // productosasd()

        })

        io.emit('mensaje de chat', productos)
        
        socket.on('Centro de chat', (textoChat) => { 
              hist(textoChat)  /////////////Insert Chat en SQLITE3////////////////
        }) 

        sele()  ////////////Envio Select a frontSQLITE3///INICIO//////////////
        seleMy(); ////////////Envio Select a frontMYSQL//INICIO///////////////
}) 
/////////////////Websocket Prodctos FIN/////

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
///////////////////////Plantillas FIN/////////

////////////////BD///////////////

const {sqlite3Connect} = require('../DB/sqlite3.db')
const knex = require('knex')(sqlite3Connect)
////////////Crea tabla CHAT si no Existe///////////////////
knex.schema.hasTable('chat').then(function(exists) {
    if (!exists) {
        knex.schema.createTable('chat', table => {
          table.string('email',30)
          table.string('mensaje',50)
          table.string('fecha',20)
        })
          .then(() => console.log('table created!'))
          .catch((err) => console.log(err))
          .finally(() => knex.destroy())
    }
});
///////////Crea tabla CHAAT si no Existe/FIN//////////////////


/////////////Insert Chat en SQL////////////////
var hist = async (asd) => {
const mensa = [{email : asd.email, mensaje : asd.mensaje, fecha : asd.fecha}]
         
  try {
    const {sqlite3Connect} = require('../DB/sqlite3.db')
    const knex = require('knex')(sqlite3Connect)

      knex('chat').insert(mensa)
      .then(() => {
        console.log('msn inserted!') 
        sele()
      })
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }
  catch (err) {console.log(err)
  }
}
/////////////Insert Chat en SQL FIN////////////////


///////////////////////////////////

app.use('/',router)

  var PORT = process.env.PORT || 3000;
  http.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);

  });



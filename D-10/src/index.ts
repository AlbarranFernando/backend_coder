import express from 'express'
const app = express()
const router = express.Router()
const path = require('path');

express.urlencoded({extended:true})
app.use(express.json())

/////////////Multer inicio//////////////////
import multer from 'multer'

router.get('/',function(req,res){
  res.sendFile( __dirname+'/index.html')
})
var storage =multer.diskStorage({
  destination: function (_req: any, file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, 'uploads')
    },
    filename: function(_req: any, file: { fieldname: string }, cb: (arg0: null, arg1: string) => void) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({storage:storage})

app.post('/uploadfile',upload.single('myFile'),(req,res,next)=>{
  const file = req.file;
  if(!file){
  const error = new Error('Elegi un archivo');
  //error.httpStatusCode = 400  
   next(error)
   }
  res.send('EL archivo creado exitosamente!!!')
  })
  /////////////Multer fin///////////////////
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
///////////////////////Plantillas fin/////////

app.use('/api',require('./rutas'))
app.use('/',router)


app.listen(8080,() => {
  console.log("Running on port 8080");
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});






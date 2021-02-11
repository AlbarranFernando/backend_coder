import express from 'express'
const app = express()
const router = express.Router()
import multer from 'multer'

app.use(express.urlencoded({extended:true}))
app.use(express.json())

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

app.use('/api',require('./rutas'))
app.use('/',router)


app.listen(8080,() => {
  console.log("Running on port 8080");
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});



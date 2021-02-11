import express from 'express'

const app = express()
const router = express.Router()

import multer from 'multer'
app.use(express.urlencoded({extended:true}))

app.use(express.json())

var productos: any[] = []

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


router.get('/productos', async (_req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  res.status(200).json(prod.getProducts())
})


router.get('/productos/:id',async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  res.status(200).json(prod.findOneProduct(req.params.id))
})

router.post('/productos', async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  prod.addProduct(req.body)
  res.sendStatus(201)
})

router.patch('/productos/actualizar/:id',async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  res.status(202).json(prod.updateProduct(req.body,req.params.id))
    
})

router.delete('/productos/borrar/:id',async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  res.status(200).json(prod.delProduct(req.params.id))
})


app.use('/api',router)


app.listen(8080,() => {
  console.log("Running on port 8080");
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});



import express from 'express'
const router = express.Router()

var productos: any[] = []
////
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({  extended: true  }));
//////
router.post('/productos', async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  console.log(req.body);
  prod.addProduct(req.body)
  res.render("carga");
 // res.sendStatus(201)
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


//////////////////////////Plantillas
  let fakeApi =()=> productos

    router.get("/productos/vista",async (req, res) => {
      //  const products = await import('./Modulos').then(res => res.default)
      
      res.render("main", {suggestedChamps: fakeApi(), listExists: productos.length});
        
    });


    router.get("/productos/carga",async (req, res) => {
      //  const products = await import('./Modulos').then(res => res.default)
      res.render("carga");
        
    });
/////////////////////////////////////////////////////////////////
 
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

module.exports = router

export {productos}


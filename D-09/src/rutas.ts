import express from 'express'
const router = express.Router()


var productos: any[] = []

router.get('/productos', async (req,res) => {
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

module.exports = router
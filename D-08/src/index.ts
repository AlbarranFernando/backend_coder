import express from 'express'

const app = express()
app.use(express.json())
var productos: any[] = []

app.get('/api/productos', async (_req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  res.status(200).json(prod.getProducts())
})


app.get('/api/productos/:id',async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  res.status(200).json(prod.findOneProduct(req.params.id))
})

app.post('/api/productos', async (req,res) => {
  const products = await import('./Modulos').then(res => res.default)
  let prod = new products(productos)
  prod.addProduct(req.body)
  res.sendStatus(201)
})

app.listen(8080,() => {
  console.log("Running on port 8080");
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});



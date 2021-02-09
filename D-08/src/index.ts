import express from 'express'
const app = express()

app.use(express.json())

var productos: any[] = []

app.get('/api/productos',(req,res) => {
  let productoVista = productos
  if (!productos.length) productoVista = [{error : "no hay productos cargados"}]
  res.json(productoVista)
})

app.get('/api/productos/:id',(req,res) => {
  let id = req.params.id
  let producto = productos.find(producto => producto.id === id)
  if (!producto) producto = {error : 'producto no encontrado'}
  res.json(producto)

})


app.post('/api/productos', (req,res) => {
  const {title, price, thumbail} = req.body
  const id = (productos.length + 1 ).toString()
  const producto = {
    id,
    title,
    price,
    thumbail,
  }
  productos.push(producto)
  res.sendStatus(201)
})


app.listen(8080,() => {
  console.log("Running on port 8080");
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});






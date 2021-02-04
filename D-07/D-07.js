const fs = require('fs');
const express = require('express')
const app = express()
let vis1 = 0
let vis2 = 0
let items =[]
const productos = async () => {
    try {
        items = await fs.promises.readFile('Productos.txt', 'utf-8'); 
        items = JSON.parse(`[${items.split("}{").join('},{')}]`)
        
       // console.log(JSON.parse(`[${items.split("}{").join('},{')}]`))
      // console.log(items.map( (items) => { return items.title; }))
    } catch (error) {
        console.log(error)
    }
};

productos();

app.get('/items', (request, response) => {
    vis1++
    response.send(`{items : [${items.map( (items) => { return items.title; })}], cantidad : (${items.length})}`)
})
app.get('/item-random', (request, response) => {
    vis2++

    let ran = Math.floor(Math.random()*10)
    response.send(`{ item: {${items[ran].title}} }`)
})
app.get('/visitas', (request, response) => {
    
    response.send(`{ visitas : { items: ${vis1}, item: ${vis2} } }`)
})


const puerto = 8080
const server = app.listen(puerto, () => {
    console.log(`Servidor Inicializado en ${server.address().port}`)
}) 
server.on("error",error => console.log(`Error en servidor ${error}`))


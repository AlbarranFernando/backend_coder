var pushWeb =""
var genera= ()=>{
let id = Math.floor(Math.random()*10);
let title = "Producto " + Math.floor(Math.random()*10);
let price = Math.floor(Math.random()*1000000)/100
let thumbail = "Foto " + Math.floor(Math.random()*10);
//console.log(id, title, price, thumbail)
//pushWeb = `  id: ${id}\n  title: ${title}\n  price: ${price}\n  thumbail: ${thumbail}`;
pushWeb = JSON.stringify({"id ":id, "title ": title, "price": price, "thumbail": thumbail});
}

var http = require("http");

var server = http.createServer(function(peticion, respuesta){
    genera();
    respuesta.end(pushWeb)
});

server.listen(3000, function(){
    console.log("tu servidor esta listo en " + this.address().port);
    

})
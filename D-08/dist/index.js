"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var productos = [];
app.get('/api/productos', function (req, res) {
    var productoVista = productos;
    if (!productos.length)
        productoVista = [{ error: "no hay productos cargados" }];
    res.json(productoVista);
});
app.get('/api/productos/:id', function (req, res) {
    var id = req.params.id;
    var producto = productos.find(function (producto) { return producto.id === id; });
    if (!producto)
        producto = { error: 'producto no encontrado' };
    res.json(producto);
});
app.post('/api/productos', function (req, res) {
    var _a = req.body, title = _a.title, price = _a.price, thumbail = _a.thumbail;
    var id = (productos.length + 1).toString();
    var producto = {
        id: id,
        title: title,
        price: price,
        thumbail: thumbail,
    };
    productos.push(producto);
    res.sendStatus(201);
});
app.listen(8080, function () {
    console.log("Running on port 8080");
}).on('error', function (e) {
    console.log('Error happened: ', e.message);
});

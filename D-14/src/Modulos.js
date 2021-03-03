"use strict";
exports.__esModule = true;
var Modulos = /** @class */ (function () {
    function Modulos(products) {
        this.products = products;
    }
    Modulos.prototype.addProduct = function (prod) {
        var title = prod.title, price = prod.price, thumbnail = prod.thumbnail;
        var id = (this.products.length + 1).toString();
        var producto = {
            id: id,
            title: title,
            price: price,
            thumbnail: thumbnail
        };
        this.products.push(producto);
    };
    Modulos.prototype.getProducts = function () {
        var productoVista = this.products;
        if (!this.products.length)
            productoVista = [{ error: "no hay productos cargados" }];
        return productoVista;
    };
    Modulos.prototype.findOneProduct = function (id) {
        var producto = this.products.find(function (prod) { return prod.id === id; });
        if (!producto)
            producto = { error: 'producto no encontrado' };
        return producto;
    };
    Modulos.prototype.updateProduct = function (prod, idn) {
        var title = prod.title, price = prod.price, thumbnail = prod.thumbnail;
        var id = idn;
        var productoAct = {
            id: id,
            title: title,
            price: price,
            thumbnail: thumbnail
        };
        var producto = this.products.find(function (prod) { return prod.id === id; });
        if (!producto)
            producto = { error: 'producto no encontrado' };
        else {
            this.products.splice(this.products.indexOf(producto), 1, productoAct);
            producto = productoAct;
        }
        return producto;
    };
    Modulos.prototype.delProduct = function (id) {
        var producto = this.products.find(function (prod) { return prod.id === id; });
        if (!producto)
            producto = { error: 'producto no encontrado' };
        else
            this.products.splice(this.products.indexOf(producto), 1);
        return producto;
    };
    return Modulos;
}());
exports["default"] = Modulos;

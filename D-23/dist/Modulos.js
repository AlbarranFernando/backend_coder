"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modulos = /** @class */ (function () {
    function Modulos(products) {
        this.products = products;
    }
    Modulos.prototype.addProduct = function (prod) {
        var title = prod.title, price = prod.price, thumbail = prod.thumbail;
        var id = (this.products.length + 1).toString();
        var producto = {
            id: id,
            title: title,
            price: price,
            thumbail: thumbail,
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
    return Modulos;
}());
exports.default = Modulos;

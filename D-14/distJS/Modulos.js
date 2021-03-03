'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modulos = function () {
   function Modulos(products) {
      _classCallCheck(this, Modulos);

      this.products = products;
   }

   _createClass(Modulos, [{
      key: 'addProduct',
      value: function addProduct(prod) {
         var title = prod.title,
             price = prod.price,
             thumbnail = prod.thumbnail;

         var id = (this.products.length + 1).toString();
         var producto = {
            id: id,
            title: title,
            price: price,
            thumbnail: thumbnail
         };
         this.products.push(producto);
      }
   }, {
      key: 'getProducts',
      value: function getProducts() {
         var productoVista = this.products;
         if (!this.products.length) productoVista = [{ error: "no hay productos cargados" }];
         return productoVista;
      }
   }, {
      key: 'findOneProduct',
      value: function findOneProduct(id) {
         var producto = this.products.find(function (prod) {
            return prod.id === id;
         });
         if (!producto) producto = { error: 'producto no encontrado' };
         return producto;
      }
   }, {
      key: 'updateProduct',
      value: function updateProduct(prod, idn) {
         var title = prod.title,
             price = prod.price,
             thumbnail = prod.thumbnail;

         var id = idn;
         var productoAct = {
            id: id,
            title: title,
            price: price,
            thumbnail: thumbnail
         };
         var producto = this.products.find(function (prod) {
            return prod.id === id;
         });
         if (!producto) producto = { error: 'producto no encontrado' };else {
            this.products.splice(this.products.indexOf(producto), 1, productoAct);
            producto = productoAct;
         }
         return producto;
      }
   }, {
      key: 'delProduct',
      value: function delProduct(id) {
         var producto = this.products.find(function (prod) {
            return prod.id === id;
         });
         if (!producto) producto = { error: 'producto no encontrado' };else this.products.splice(this.products.indexOf(producto), 1);

         return producto;
      }
   }]);

   return Modulos;
}();

module.exports = Modulos;

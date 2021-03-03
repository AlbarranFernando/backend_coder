'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var asd = require('regenerator-runtime/runtime');
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

express.urlencoded({ extended: true });
app.use(express.json());
var fs = require('fs');

////Websocket/////
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var productos = [];
var msgs = [];

io.on('connection', function (socket) {
  socket.broadcast.emit('mensaje', 'Desde el server');
  console.log('Se conecto un usuario', socket.id);

  socket.on('mensaje de chat', function (message) {

    //  let productosasd = async () => {
    var products = require('./Modulos'); //.then(res => res.default);
    var prod = new products(productos);
    prod.addProduct(message);
    io.emit('mensaje de chat', productos);
    // }
    // productosasd()
  });
  io.emit('mensaje de chat', productos);

  socket.on('Centro de chat', function (textoChat) {
    msgs.push(textoChat);
    hist(textoChat);

    io.emit('Centro de chat', msgs);
  });
  io.emit('Centro de chat', msgs);
});
////Websocket/////


/////////////////Plantillas/////////////////////////
var handlebars = require('express-handlebars');
app.engine("hbs", handlebars({
  extname: ".hbs",
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(__dirname + "/views/layouts"),
  partialsDir: path.join(__dirname + '/views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static("public"));
router.get("/", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.render("carga");

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
///////////////////////Plantillas fin/////////
////////////////Archivo////////////////

var hist = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(asd) {
    var itProd;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            itProd = JSON.stringify(asd);
            _context2.next = 4;
            return fs.promises.appendFile('historialChat.txt', '' + itProd);

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 6]]);
  }));

  return function hist(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

//producto01.borrar();
///////////////////////////////////

app.use('/', router);

var PORT = process.env.PORT || 3000;
http.listen(PORT, function () {
  console.log('Running on port ' + PORT);
});

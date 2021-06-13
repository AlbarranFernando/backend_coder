"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
////////////////////Cluster INICIO///////////////////////
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
////////////////////Cluster FIN///////////////////////
////////////Objeto Process INICIO//////////////
/////////Parametros////////
process.env.PORT = process.argv[2];
process.env.FACE_ID_CODER = process.argv[3];
process.env.FACE_SECRET_CODER = process.argv[4];
process.env.MODO_CHILD = process.argv[5];
console.log("MODO", process.argv[5]);
let modoCluster = false;
if (process.argv[5] === "CLUSTER") {
    modoCluster = true;
}
if (process.argv[5] === "FORK") {
    modoCluster = false;
} //Redundante
////////////Objeto Process FIN////////////// 
/////////////PASSPORT INICIO/////////////////
app.use('/', require('./pass'));
/////////////PASSPORT FIN/////////////////
//////////////////////Conexion Mongo///////////////////////////
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Se conecto piola'))
    .catch((err) => console.log(err));
const prodModel = require('../models/productos');
const menModel = require('../models/mensajes');
//////////////////////Conexion Mongo FIN//////////////////////////
/* --------------------------------------------------------------------------- */
/* MASTER */
if (modoCluster && cluster.isMaster) {
    console.log(`Número de procesadores: ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString());
        cluster.fork();
    });
}
/* --------------------------------------------------------------------------- */
else {
    express_1.default.urlencoded({ extended: true });
    app.use(express_1.default.json());
    ////WebsocketCAB/////
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);
    var productos = [];
    ////WebsocketCAB FIN/////
    ////////////Envio Select Mensajes a front/////////////////
    function sele() {
        menModel.find({})
            .then((rows) => {
            io.emit('Centro de chat', rows);
        })
            .catch((err) => console.log(err));
    }
    ////////////Envio Select Mensajes a front FIN/////////////////
    ////////////Envio Select Productos a front/////////////////
    let seleMy = () => {
        prodModel.find({})
            .then((rows) => {
            io.emit('mensaje de chat', rows);
        })
            .catch((err) => console.log(err));
    };
    ////////////Envio Select Productos a front FIN/////////////////
    /////////////////Websocket Prodctos/////
    io.on('connection', (socket) => {
        socket.broadcast.emit('mensaje', 'Desde el server');
        console.log('Se conecto un usuario', socket.id);
        socket.on('mensaje de chat', (message) => {
            console.log(message);
            /////////// Productos Insert/////////////////
            const prodSaved = new prodModel(message);
            prodSaved.save()
                .then(() => {
                console.log('product inserted!');
                seleMy();
            })
                .catch((err) => console.log(err));
            /////////// Productos Insert FIN////////////////
            seleMy(); ////////////Envio Select Productos a front/////////////////
        });
        io.emit('mensaje de chat', productos);
        socket.on('Centro de chat', (textoChat) => {
            hist(textoChat); /////////////Insert Chat en MONGO////////////////
        });
        sele(); ////////////Envio Select Mensajes a front//////////////
        seleMy(); ////////////Envio Select Productos a front///////////////
    });
    /////////////////Websocket Prodctos FIN/////
    /////////////////Plantillas/////////////////////////
    let handlebars = require('express-handlebars');
    app.engine("hbs", handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: path_1.default.join(__dirname + "/views/layouts"),
        partialsDir: path_1.default.join(__dirname + '/views/partials')
    }));
    app.set('view engine', 'hbs');
    app.set('views', path_1.default.join(__dirname + '/views'));
    app.use(express_1.default.static("public"));
    router.get("/productos", async (req, res) => {
        res.render("carga");
    });
    ///////////////////////Plantillas FIN/////////
    /////////////Insert Chat en MONGO////////////////
    var hist = async (asd) => {
        const mensa = { email: asd.email, mensaje: asd.mensaje, fecha: asd.fecha };
        console.log("mensa", mensa);
        try {
            const menSaved = new menModel(mensa);
            menSaved.save()
                .then(() => {
                console.log('msn inserted!');
                sele();
            })
                .catch((err) => console.log(err));
        }
        catch (err) {
            console.log(err);
        }
    };
    /////////////Insert Chat en MONGO FIN////////////////
    ///////////////////////////////////
    app.use('/', router);
    let PORT = process.env.PORT || 3000;
    if (PORT == 'undefined') {
        PORT = 3000;
    }
    ; // Fallo de asignacon de linea superior
    console.log("puerto", PORT, process.env.PORT);
    http.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
}

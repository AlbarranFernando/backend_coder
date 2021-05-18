const mongoose = require('mongoose')

const msnCollection = 'mensajes'

const MensajeSchema = new mongoose.Schema({
        autor: {
            email: { type: String, required: false, max: 50 },
            nombre: { type: String, required: false, max: 50 },
            apellido: { type: String, required: false, max: 50 },
            edad: { type: String, required: false, max: 50 },
            alias: { type: String, required: false, max: 50 },
            avatar: { type: String, required: false, max: 50 }
            },
        mensaje: { type: String, required: false, max: 70 },
        fecha: { type: String, required: false, max: 50 },    
})

module.exports = mongoose.model(msnCollection, MensajeSchema)
const mongoose = require('mongoose')

const msnCollection = 'mensajes'

const MensajeSchema = new mongoose.Schema({
    email: { type: String, required: true, max: 50 },
    mensaje: { type: String, required: true, max: 70 },
    fecha: { type: String, required: true, max: 50 }
})

module.exports = mongoose.model(msnCollection, MensajeSchema)
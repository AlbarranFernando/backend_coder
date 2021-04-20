const mongoose = require('mongoose')

const prodCollection = 'productos'
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 50 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 200}
})

module.exports = mongoose.model(prodCollection, ProductSchema)

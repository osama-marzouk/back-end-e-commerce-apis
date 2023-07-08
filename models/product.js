const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: String,
    price: Number
})

const Product = mongoose.model('products', schema)
module.exports = Product;
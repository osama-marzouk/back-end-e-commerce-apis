const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: String,
    price: Number
})

const Order = mongoose.model('orders', schema)
module.exports = Order;
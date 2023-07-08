const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: String,
    price: Number
})

const Category = mongoose.model('categories', schema)
module.exports = Category;
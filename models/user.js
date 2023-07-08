const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: String,
    price: Number
})

const User = mongoose.model('users', schema)
module.exports = User;
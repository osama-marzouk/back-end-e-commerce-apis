const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    }
})

const Category = mongoose.model('categories', schema)
module.exports = Category;
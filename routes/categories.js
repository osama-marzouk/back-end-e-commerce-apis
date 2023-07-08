const express = require('express')
const router = express.Router()
const Category = require('../models/category')

router.get('/', async (req, res) => {
    const categories = await Category.find()
    if (categories.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(categories)
})

router.post('/', (req, res) => {
    const category = new Category({
        name: req.body.name,
        price: req.body.price
    })
    category.save().then(() => console.log('product saved')).catch(err => console.log(err))

    res.send('posted')
})

module.exports = router;
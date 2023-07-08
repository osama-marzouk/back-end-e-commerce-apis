const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    const products = await Product.find()
    if (products.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(products)
})

router.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(() => console.log('product saved')).catch(err => console.log(err))

    res.send('posted')
})

module.exports = router;
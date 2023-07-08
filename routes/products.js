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

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.send('404 Not Found')
    }
    res.send(category)
})

router.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(() => console.log('product saved')).catch(err => console.log(err))

    res.send('posted')
})


router.put('/:id', async (req, res) => {
    let category = await Category.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        icon: req.body.icon
    }, { new: true })
    if (!category)
        return res.status(400).send('the category cannot be created!')
    res.send(category);
})

router.delete('/:id', (req, res) => {
    Category.findOneAndRemove(req.params.id)
        .then(() => res.status(200).send('category deleted'))
        .catch(err => res.status(400).send(err))
})


module.exports = router; 
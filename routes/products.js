const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Category = require('../models/category')

router.get('/', async (req, res) => {
    const products = await Product.find()
    if (products.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(products)
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.send('404 Not Found')
    }
    res.send(product)
})

router.post('/', (req, res) => {



    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        imgae: req.body.imgae,
        imgaes: req.body.imgaes,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
    })
    product.save().then(() => res.status(200).send(product)).catch(err => res.status(400).send(err))

})


router.put('/:id', async (req, res) => {
    let product = await Product.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        imgae: req.body.imgae,
        imgaes: req.body.imgaes,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
    }, { new: true })
    if (!product)
        return res.status(400).send('the product cannot be changed!')
    res.send(product);
})

router.delete('/:id', (req, res) => {
    Product.findOneAndRemove(req.params.id)
        .then(() => res.status(200).send('product deleted'))
        .catch(err => res.status(400).send(err))
})

router.get('/count', async (req, res) => {
    let productsCount = await Product.countDocuments()
    res.status(200).send(productsCount)
})

router.get('/featured', async (req, res) => {
    let featuredProducts = Product.find({ isFeatured: true })
    res.status(200).send(featuredProducts)
})



module.exports = router; 
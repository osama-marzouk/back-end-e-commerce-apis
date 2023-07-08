const express = require('express')
const router = express.Router()
const Order = require('../models/order')

router.get('/', async (req, res) => {
    const orders = await Product.find()
    if (orders.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(orders)
})

router.post('/', (req, res) => {
    const order = new Order({
        name: req.body.name,
        price: req.body.price
    })
    order.save().then(() => console.log('product saved')).catch(err => console.log(err))

    res.send('posted')
})

module.exports = router;
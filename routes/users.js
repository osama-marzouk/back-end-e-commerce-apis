const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find()
    if (users.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(users)
})

router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        price: req.body.price
    })
    user.save().then(() => console.log('product saved')).catch(err => console.log(err))

    res.send('posted')
})

module.exports = router;
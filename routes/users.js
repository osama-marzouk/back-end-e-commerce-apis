const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    const users = await User.find().select('-password')
    if (users.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
        return res.send('404 Not Found')
    }
    res.send(user)
})

router.post('/', (req, res) => {       //for the admin

    //I think you should body of request

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,


    })
    user.save().then(() => res.status(200).send(user)).catch(err => res.status(400).send(err))

})

router.delete('/:id', (req, res) => {
    User.findOneAndRemove(req.params.id)
        .then(() => res.status(200).send('user deleted'))
        .catch(err => res.status(400).send(err))
})

router.get('/count', async (req, res) => {
    let usersCount = await User.countDocuments()
    res.status(200).send(usersCount)
})


module.exports = router;
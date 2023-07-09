const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    const users = await User.find()
    if (users.length === 0) {
        return res.send('404 Not Found')
    }
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.send('404 Not Found')
    }
    res.send(user)
})

router.post('/register', (req, res) => {

    //I think you should body of request
    let hashedPass = bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        apartment: req.body.apartment,
        street: req.body.street,
    })
    user.save().then(() => res.status(200).send(user)).catch(err => res.status(400).send(err))

})

router.put('/:id', async (req, res) => {
    let user = await User.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        apartment: req.body.apartment,
        street: req.body.street,
    }, { new: true })
    if (!user)
        return res.status(400).send('the User is not found!')
    res.send(user);
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
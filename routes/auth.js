const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register', (req, res) => {       //for the user

    //I think you should body of request
    let hashedPass = bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: hashedPass,
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


router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('invalid email or passwrod')
    }
    let validPass = await bcrypt.compare(req.body.password, user.passwordHash)
    if (!validPass) {
        return res.status(400).send('invalid email or passwrod')
    }
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.SECRET)

    res.status(200).send(token)
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

module.exports = router;
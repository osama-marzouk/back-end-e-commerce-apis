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

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.send('404 Not Found')
    }
    res.send(category)
})

router.post('/', (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon
    })
    category.save().then(() => res.status(200).send(category)).catch(err => res.status(400).send(err))


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
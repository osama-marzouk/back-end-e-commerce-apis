const express = require('express')
const app = express();
const productsRouter = require('./routes/products')
const mongoose = require('mongoose');

const api = process.env.API_URL
const port = process.env.PORT || 8000

app.use(`${api}/products`, productsRouter)

mongoose.connect(process.env.DATABASE).then(() => console.log('connecting to database')).catch(err => console.log(err))


app.listen(port, () => {
    console.log('listening...')
})
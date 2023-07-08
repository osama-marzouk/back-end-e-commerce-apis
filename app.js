const express = require('express')
const app = express();
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const categoriesRouter = require('./routes/categories')
const mongoose = require('mongoose');
require('dotenv/config')

const api = process.env.API_URL
const port = process.env.PORT || 8000

app.use(express.json()) //you should put it before routes
app.use(`${api}/products`, productsRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/categories`, categoriesRouter)

//connect to db
mongoose.connect(process.env.DATABASE).then(() => console.log('connecting to database')).catch(err => console.log(err))

//server
app.listen(port, () => {
    console.log('listening...')
})
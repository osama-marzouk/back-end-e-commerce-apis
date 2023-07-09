const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')

const api = process.env.API_URL
const port = process.env.PORT || 8000

//middlewares
app.use(express.json())                     //you should put it before routes


//routes
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const categoriesRouter = require('./routes/categories')
const authRouter = require('./routes/auth')

app.use(`${api}/users`, authRouter)
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
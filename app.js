const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/Auth')
const userRoutes = require('./routes/User')
const productsRoutes = require('./routes/Products');
const cartRoutes = require('./routes/Cart')
const verifyToken = require('./middlewares/verifyToken')

const app = express()

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
.then(result=>{
    console.log("DB Connection is successful")
    app.listen("8000", ()=>{
        console.log("Server is running")
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productsRoutes)
app.use('/api/cart',verifyToken, cartRoutes)


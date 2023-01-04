const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
require('dotenv').config()
const authRoutes = require('./routes/Auth')
const userRouter = require('./routes/User')

const app = express()

app.use(express.json());
app.use(morgan('dev'));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
.then(result=>{
    console.log("DB Connection is successful")
    app.listen("8000", ()=>{
        console.log("Server is running")
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);


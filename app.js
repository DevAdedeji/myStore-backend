import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()

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
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Name of product is required'],
        unique:[true, 'Name of product should be unique'],
    },
    description:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:[true, "Price of product is required"]
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
    image:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:true,
    }
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
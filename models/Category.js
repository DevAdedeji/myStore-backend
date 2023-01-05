const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name of product is required'],
        unique:[true, 'Name of product should be unique'],
    },
}, {timestamps:true})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
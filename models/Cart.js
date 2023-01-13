const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    productTitle:{
        type:String,
        required:true,
    },
    productImage:{
        type:String,
        required:true,
    },
    productDescription:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    productCategory:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productQuantity:{
        type:Number,
        required:true,
    }
}, {timestamps:true})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
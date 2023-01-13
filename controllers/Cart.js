const Cart = require("../models/Cart.js");
const Product = require('../models/Product');
require('dotenv').config();

const getAllCartItems = async (req,res)=>{
    const email = req.body.email;
    try{
        const cartItems = await Cart.find({userEmail:email})
        if(cartItems){
            res.status(200).json({cart:cartItems});
        }
        else{
            res.status(400).json({status:false,message:"Something went wrong, Pls try again"});
        }
    }catch(err){
        res.status(500).json({error:"Something went wrong, Pls try again"});
    }
}

const addToCart = async (req,res)=>{
    const productSlug = req.params.slug;
    const email = req.body.email;
    try{
        const product = await Product.findOne({slug:productSlug})
       const {slug, price, quantity,image, category, description,title} = product
       const newCartItem = {
        productId:slug,
        productTitle:title,
        productImage:image,
        productDescription:description,
        userEmail:email,
        productCategory:category,
        productPrice:price,
        productQuantity:quantity
       }
       const cartItem = await Cart.create(newCartItem);
       if(cartItem){
            res.status(200).json({status:true, message:"Product added to cart"});
       }else{
        res.status(400).json({status:false,message:"Something went wrong, Pls try again"});
       }
    }catch(err){
        res.status(500).json({error:"Something went wrong, Pls try again"});
    }
}

const removeFromCart = async (req,res)=>{
    const id = req.params.id;
    try{
        const product = await Cart.findByIdAndDelete(id)
        if(product){
            res.status(200).json({status:true, message:"Product removed from cart"});
        }else{
            res.status(400).json({status:false, message:"Something went wrong, pls try again"});
        }
    }catch(err){
        res.status(500).json({error:"Something went wrong, Pls try again"});
    }
}


module.exports = {addToCart, removeFromCart, getAllCartItems};
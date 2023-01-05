const { trusted } = require('mongoose');
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const getAllProducts= async (req,res)=>{
    const category = req.query.category
    try{
        if(category){
            const products = await Product.find({categories:{
                $in:[category]
            }});
            res.status(200).json({products, status:true});
        }else{
            const products = await Product.find();
            res.status(200).json({products, status:true});
        }
        
    }catch(err){
        res.status(500).json({error:'Something went wrong, pls try again'})
    }
}
const getAProduct= async (req,res)=>{
    const slug = req.params.slug
    try{
        const product = await Product.find({slug});
        if(product){
            res.status(200).json({product, status:true})
        }else{
            res.status(404).json({error:{message:'Product not found', status:false}})
        }
    }catch(err){
        res.status(500).json(err)
    }
}
const createAProduct = async (req,res)=>{ 
    const product = req.body
    const title = product.title
    let slug=title.toLowerCase()
    slug = slug.replace(/\s+/g, '-') // Replace spaces with -
    slug = slug.replace(/&/g, '-and-') // Replace & with ‘and’
    slug = slug.replace(/[^\w-]+/g, '') // Remove all non-word characters such as spaces or tabs
    slug = slug.replace(/--+/g, '-') // Replace multiple — with single -
    slug = slug.replace(/^-+/, '') // Trim — from start of text
    slug = slug.replace(/-+$/, ''); // Trim — from end of text
    product.slug = slug  
    const file = req.file
    if(file){
        let imageLink = '';
        try{
            await cloudinary.v2.uploader.upload(file.path)
            .then(result=>{
                imageLink = result.secure_url
                product.image = imageLink;
            })
            .catch(err=>{
                console.log(err)
            })
            fs.unlinkSync(file.path)
        }catch(err){
            console.log("Error occured while uploading");
        }
    }
    try{
        const savedProduct = await Product.create(product)
        res.status(201).json({savedProduct, message:'Product uploaded successfully', status:true});
    }
    catch(err){
        const errors = errorHandler(err)
        if(errors.status === 409){
            errors.title = 'Product with title already exists'
        }
        const {status, ...others} = errors
        res.status(status).json({error:others});
    }     
        
}
const updateAProduct= async (req,res)=>{
    const slug = req.params.slug
    const product = req.body
    try{
        const updatedProduct = await Product.findOneAndUpdate({slug}, product, {new:true});
        if(updatedProduct){
            res.status(200).json({updatedProduct, message:'Product updated successfully', status:true})
        }else{
            res.status(404).json({error:{message:'Product not found'}})
        }
    }catch(err){
        res.status(500).json(err)
    }
}
const deleteAProduct= async (req,res)=>{
    const slug = req.params.slug
    try{
        const product = await Product.deleteOne({slug});
        if(product){
            res.status(200).json({message:'Product deleted successfully', status:true})
        }else{
            res.status(404).json({error:{message:'Product not found'}})
        }
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports = {getAllProducts, getAProduct, updateAProduct, deleteAProduct, createAProduct};
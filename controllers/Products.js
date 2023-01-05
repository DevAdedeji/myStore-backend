const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler');

const getAllProducts= async (req,res)=>{
    const category = req.query.category
    try{
        if(category){
            const products = await Product.find({categories:{
                $in:[category]
            }});
            res.status(200).json(products);
        }else{
            const products = await Product.find();
        res.status(200).json(products);
        }
        
    }catch(err){
        res.status(500).json({error:'Something went wrong, pls try again'})
    }
}
const getAProduct= async (req,res)=>{
    const id = req.params.id
    try{
        const product = await Product.findById(id);
        res.status(200).json(product)
    }catch(err){
        console.log(err)
    }
}
const createAProduct = async (req,res)=>{ 
       
        // try{
        //     const savedProduct = await Product.create(product)
        // res.status(201).json(savedProduct);
        // }
        // catch(err){
        //     const errors = errorHandler(err)
        //     if(errors.status === 409){
        //         errors.title = 'Product with title already exists'
        //     }
        //     const {status, ...others} = errors
        //     res.status(status).json({error:others});
        // }     
    
}
const updateAProduct= (req,res)=>{}
const deleteAProduct= (req,res)=>{}

module.exports = {getAllProducts, getAProduct, updateAProduct, deleteAProduct, createAProduct};
const { json } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getUser = (req,res)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async(err, decodedToken)=>{
            if(err){
                res.status(400).json({error:'Invalid token'})
            }else{   
                try{
                    const user = await User.findOne({email:decodedToken.id})
                    const {password, ...others} = user._doc
                    res.status(200).json({user:others})
                }catch(err){
                    res.status(500).json({error:'Something went wrong, pls try again'})
                }
            }
        })

    }else{
        res.status(400).json({error:'Please log in to continue'})
    }
    
}

module.exports = {getUser};
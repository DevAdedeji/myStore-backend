const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');


const register = async (req, res)=>{
    const {username, password, email} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const user = await User.create({username, email, password:hashedPassword});
        res.status(201).json({status:true, message:"User created successfully"})
    }catch(err){
        const error = errorHandler(err);
        const {status, ...others} = error;
        res.status(status).json({error:others});
    }
}

const login = (req, res)=>{
    
}

const getUser = (req, res) =>{
    
}

module.exports = {register, login, getUser}
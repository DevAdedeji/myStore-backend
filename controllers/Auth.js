const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');


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

const login = async (req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if(auth){
                const {password, ...others} = user._doc;
                const token = createToken(user.email);
                res.status(200).json({user:others, status:true, token});
            }else{
                res.status(400).json({error:"Password not correct"})
            }
        }else{
            res.status(400).json({error:"Invalid Credentials"})
        }
    }catch(err){
        const error = errorHandler(err)
        const {status, ...others} = error;
        res.status(status || 500).json({error:others || 'Somethng went wrong, pls try again'});
    }
}

const getUser = (req, res) =>{
    
}

module.exports = {register, login, getUser}
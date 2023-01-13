const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyToken = (req,res, next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, (err, decodedToken)=>{
            if(err){
                res.status(400).json({error:"Invalid token"})
            }else{
                req.body.email = decodedToken.id;
                next();
            }
        })
    }else{
        res.status().json({error:"Pls login to continue"})
    }
}
module.exports = verifyToken;
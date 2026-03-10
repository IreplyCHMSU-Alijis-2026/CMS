const jwt = require('jsonwebtoken');
require("dotenv").config()


const auth = (req,res,next) =>{
    try{
        const header = req.headers.authorization;

        if(!header)return res.status(401).json({success:false,message:"No token"});

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        
        req.admin = decoded;

        next()


    }catch(error){
        res.status(401).json({
            success:false,
            message:"Access denied. No token is Provided! Please try again"
        })
    }

}


module.exports=auth
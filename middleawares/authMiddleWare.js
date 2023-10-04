const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req,res,next) =>{
    let token; 
    if (req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1];
        try {
            if(token){
                const decoded= jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            res.status(500).json({error:"Not Authorized token expired, Login again"})
        }
    }else{
       throw new Error("There is not a Token attached to header")
    }
}); 

module.exports = { authMiddleware };
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// verify the token

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

// verify is the user role is admin or user.

const isAdmin = asyncHandler(async(req,res,next) => { 
    const { email } = req.user;
    const adminUser = await User.findOne({ email });

    if (adminUser.role !== "admin"){
        throw new Error("you are not an admin")
    }else{
        next();
    }

})
module.exports = { authMiddleware, isAdmin };
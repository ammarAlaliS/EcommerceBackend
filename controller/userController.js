const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// create user controler

const createUser = asyncHandler(async (req, res ) =>{
    const email = req.body.email;
    const findUser = await User.findOne({ email: email});
    if (!findUser) {
        // CREATE A NEW USER
        const newUser = await User.create(req.body);
        res.json(newUser);

    }else{
        // USER ALREADY EXISTS
        throw new Error("User Already Exists");
    }
});

// create Loggin controler

const loginUserCtrl = asyncHandler(async (req, res) =>{
    const { email, password } = req.body;
    // check if user exist or not
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id: findUser?._id, 
            first_name: findUser?.first_name,
            last_name: findUser?.last_name, 
            email: findUser?.email, 
            mobile: findUser?.mobile, 
            token: generateToken(findUser?._id)
        })
    }else{
        throw new Error("Invalid Credentials");
    }
});
module.exports ={ createUser, loginUserCtrl };
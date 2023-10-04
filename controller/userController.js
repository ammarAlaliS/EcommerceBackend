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
    console.log(email, password);
});
module.exports ={ createUser };
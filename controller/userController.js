const User = require('../models/userModel');

const createUser = async (req, res ) =>{
    const email = req.body.email;
    const findUser = await User.findOne(email);
    if (!findUser) {
        // CREATE A NEW USER
    }else{
        // USER ALREADY EXISTS
    }
}

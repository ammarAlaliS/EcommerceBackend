const User = require('../models/userModel');

const createUser = async (req, res ) =>{
    const email = req.body.email;
    const findUser = await User.findOne(email);
    if (!findUser) {
        // CREATE A NEW USER
        const newUser = User.create(req.body);
        res.json(newUser);
    }else{
        // USER ALREADY EXISTS
        res.json({
            msg: "User Already Exist",
            success: "false",
        })
    }
}
module.exports ={createUser}
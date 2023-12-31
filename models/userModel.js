const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isDelete: {
        type: String,
        default: false,
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked:{
        type: String, 
        default: false
    },

    cart: { 
        type: Array,
        default: [],
    },
    address:[{ type: mongoose.Schema.Types.ObjectId, ref:"Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken:{
        type:String,
    },


    
},{
    timestamps:true,

});

// 

//  encrypter password using bcrypt dependency. 


userSchema.pre('save',async function(next){
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// validate input password whit the db. 

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model('User', userSchema);
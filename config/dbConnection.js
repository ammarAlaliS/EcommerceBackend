const { default: mongoose } = require("mongoose")

const dbConnection = ()=>{
    try {
        const conn = mongoose.connect('mongodb+srv://ammaralialiwa:JWksUR7DaKiApf34@cluster0.2pgu6ei.mongodb.net/?retryWrites=true&w=majority');
        console.log('connection success')
    } catch (error) {
       console.log('error to connect to data base')
    }
}
module.exports = dbConnection; 
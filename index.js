const express = require('express');
const dbConnection = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;

dbConnection()

app.use('/',(req, res) =>{
    res.send('hello from the server side')
})
app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`);
});
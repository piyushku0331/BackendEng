const express = require('express');
const mongoose = require('mongoose');

const user = require('./model/user');
const blog = require('./model/blog');

const app = express();

const PORT = 5000;

app.get('/',(req,res)=>{
    res.status(200).send("Hello Welcome to Home Page");
})

mongoose.connect('mongodb://localhost:27017/Mongoose-1')
.then(()=>console.log("Connected!!"))
.catch((err) => console.error("Connection error:", err));

app.listen(PORT,()=>{
    console.log(`server listening at http://localhost:${PORT}`);
})
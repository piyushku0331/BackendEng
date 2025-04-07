const express = require('express');
const mongoose = require('mongoose');

const user = require('./model/user');
const blog = require('./model/blog');

const userRoutes = require("./routes2/userRoutes");
const blogRoutes = require("./routes2/blogRoutes");

const app = express();
app.use('/users',userRoutes);
app.use('/blogs',blogRoutes);

const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/Mongoose-1')
.then(()=>console.log("Connected!!"))
.catch((err) => console.error("Connection error:", err));

app.listen(PORT,()=>{
    console.log(`server listening at http://localhost:${PORT}`);
});
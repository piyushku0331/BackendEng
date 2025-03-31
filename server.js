const express = require('express');
const mongoose = require('mongoose');

const user = require('./model/user');
const blog = require('./model/blog');

const app = express();

const PORT = 5000;

app.post('/users',async(req,res)=>{
    let {name,email,password} = req.body;
    let newUser = new user({
        name:name,
        email:email,
        password:password
    });
    await newUser.save();
    res.send("User added");
});

app.get('/users',async(req,res)=>{
    let allusers = await user.find();
    res.send(allusers);
});

app.get('/users/:id',async (req,res)=>{
    let {id} = req.params;
    let oneUser = user.findById(id);
    res.send(oneUser);
});

app.get('/',(req,res)=>{
    res.status(200).send("Hello Welcome to Home Page");
});

app.delete('/deleteone/:id',async (req,res)=>{
    let {id} = req.params;
    await user.findByIdAndDelete(id);
    res.send("User Deleted");
});

app.put('/users/:id',async (req,res)=>{
    let {id} = req.params;
    let {name,email,password} = req.body;
    let updateUser = await user.findById(id);
    updateUser.name=name;
    updateUser.email=email;
    updateUser.password=password;
    await updateUser.save();
    res.send("User Updated");
});

app.post('/blogs',async(req,res)=>{
    let {content,author,date} = req.body;
    let newBlog = new blog({
        content:content,
        author:author,
        date:date
    });
    await newBlog.save();
    res.send("Blog added");
});

app.get('/blogs',async(req,res)=>{
    let allblogs = await blog.find();
    res.send(allblogs);
});

app.get('/blogs/:id',async (req,res)=>{
    let {id} = req.params;
    let oneBlog = blog.findById(id);
    res.send(oneBlog);
});

app.delete('/deleteoneBlog/:id',async (req,res)=>{
    let {id} = req.params;
    await Blog.findByIdAndDelete(id);
    res.send("Blog Deleted");
});

app.put('/blogs/:id',async (req,res)=>{
    let {id} = req.params;
    let {content,author,date} = req.body;
    let updateBlog = await blog.findById(id);
    updateBlog.content=content;
    updateBlog.author=author;
    updateBlog.date=date;
    await updateBlog.save();
    res.send("Blog Updated");
});

mongoose.connect('mongodb://localhost:27017/Mongoose-1')
.then(()=>console.log("Connected!!"))
.catch((err) => console.error("Connection error:", err));

app.listen(PORT,()=>{
    console.log(`server listening at http://localhost:${PORT}`);
});
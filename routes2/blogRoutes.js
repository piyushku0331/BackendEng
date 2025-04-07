const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    let {content,author,date} = req.body;
    let newBlog = new blog({
        content:content,
        author:author,
        date:date
    });
    await newBlog.save();
    res.send("Blog added");
});

router.get('/',async(req,res)=>{
    let allblogs = await blog.find();
    res.send(allblogs);
});

router.get('/:id',async (req,res)=>{
    let {id} = req.params;
    let oneBlog = blog.findById(id);
    res.send(oneBlog);
});

router.put('/:id',async (req,res)=>{
    let {id} = req.params;
    let {content,author,date} = req.body;
    let updateBlog = await blog.findById(id);
    updateBlog.content=content;
    updateBlog.author=author;
    updateBlog.date=date;
    await updateBlog.save();
    res.send("Blog Updated");
});

module.exports=router;
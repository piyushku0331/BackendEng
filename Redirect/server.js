const express=require('express');
const path=require('path');

let app=express();
app.listen(3000,function(){
    console.log("server started at 3000");
})
app.use(express.urlencoded("true"));
app.get("/",function(req,res){
    let path=__dirname+"/register.html";
    res.sendFile(path);
})
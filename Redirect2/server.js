let express=require('express');
let app=express();
app.listen(2345,function(){
    console.log("server started at 2345");
})
app.use(express.urlencoded("true"));
app.get("/signupkaro",function(req,resp){
    let path=__dirname+"/index.html";
    resp.sendFile(path);
})
let userdata=[]
app.post("/signupkaro",function(req,resp){
    let{txtname,txtemail,txtpass}=req.body;
    console.log(txtname,txtemail,txtpass);
    let newuser={
        name:txtname,
        email:txtemail,
        password:txtpass
    }
    userdata.push(newuser);
    resp.send(userdata);
})
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    let {name,email,password} = req.body;
    let newUser = new user({
        name:name,
        email:email,
        password:password
    });
    await newUser.save();
    res.send("User added");
});

router.get('/',async(req,res)=>{
    let allusers = await user.find();
    res.send(allusers);
});

router.get('/:id',async (req,res)=>{
    let {id} = req.params;
    let oneUser = user.findById(id);
    res.send(oneUser);
});

router.get('/',(req,res)=>{
    res.status(200).send("Hello Welcome to Home Page");
});

router.delete('/:id',async (req,res)=>{
    let {id} = req.params;
    await user.findByIdAndDelete(id);
    res.send("User Deleted");
});

router.put('/:id',async (req,res)=>{
    let {id} = req.params;
    let {name,email,password} = req.body;
    let updateUser = await user.findById(id);
    updateUser.name=name;
    updateUser.email=email;
    updateUser.password=password;
    await updateUser.save();
    res.send("User Updated");
});
module.exports=router;
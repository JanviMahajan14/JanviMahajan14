const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users',async(req,res)=>{
    const user =  new User(req.body);
    try{
        await user.save();
        res.send(user);
    }
    catch(e){
        res.statusCode = 400;
        res.send({ e })
    }
})

router.get('/users',async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(e){
        res.send(e);
    }
})

router.get('/users/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const user = await User.find({_id});
        res.send(user);
    }
    catch(e){
        res.statusCode = 404;
        res.send(e);
    }
})

router.patch('/users/:id',async(req,res)=>{
    const updatesAllowed = ['name','age','email','password'];
    const currentKeys = Object.keys(req.body);
    const isValidUpdate = currentKeys.every((update)=>{
        updatesAllowed.includes(update);
    })

    // if(!isValidUpdate){
    //     res.statusCode=400;
    //     return res.send({error:"Invalid update"});
    // }

    try{
        const user = await User.findByIdAndUpdate({_id:req.params.id},req.body,{ new:true, runValidators:true});
        if(!user){
            throw new Error("No such user Exists!");
        } else {
            res.send(user);
        }
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

router.delete('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete({ _id:req.params.id })
        console.log(user)
        if(!user){
            throw new Error("No such user found")
        } else {
            res.send(user);
        }
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

module.exports = router;

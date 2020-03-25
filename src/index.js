const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 5001;

//helps express to access the incoming requests in json format
app.use(express.json())

app.post('/users',async(req,res)=>{
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

app.get('/users',async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(e){
        res.send(e);
    }
})

app.get('/users/:id',async(req,res)=>{
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

app.patch('/users/:id',async(req,res)=>{
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
        }
        res.send(user);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

app.delete('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete({ _id:req.params.id })
        console.log(user)
        if(!user){
            throw new Error("No such user found")
        }
        res.send(user);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

app.post('/tasks',async(req,res)=>{
    try{
        const task =  new Task(req.body);
        await task.save();
        res.send(task);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    } 
})

app.get('/tasks',async(req,res)=>{
    try{
        const result = await Task.find({});
        res.send(result)
    }
    catch(e){
        res.send(e);
    }
})

app.get('/tasks/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const result = await Task.find({_id});
        res.send(result);
    }
    catch(e){
        res.statusCode=404;
        res.send(e);
    }
})

app.patch('/tasks/:id',async(req,res)=>{
    const updatesAllowed = ['description','completed'];
    const currentKeys = Object.keys(req.body);
    const isValidUpdate = currentKeys.every((update)=>{
        updatesAllowed.includes(update);
    })

    // if(!isValidUpdate){
    //     res.statusCode=400;
    //     return res.send({error:"Invalid update"});
    // }

    try{
        const task = await Task.findByIdAndUpdate({ _id:req.params.id },req.body,{ new:true, runValidators:true })
        if(!task){
            throw new Error("No such task exists!")
        }
        res.send(task);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

app.delete('/tasks/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete({ _id:req.params.id })
        if(!task){
            throw new Error("No such task found")
        }
        res.send(task);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

app.listen(port,()=>{
    console.log("Server is on the port ",port);
});
const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task');
const auth = require('../middlewares/auth');
const router = new express.Router();

router.post('/tasks', auth, async(req,res)=>{
    try{
        const task =  new Task({
            ...req.body,
            owner:req.user._id
        });
        await task.save();
        res.send(task);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    } 
})

router.get('/tasks', auth, async(req,res)=>{
    try{
        const result = await Task.find({owner:req.user._id});
        if(result.length == 0){
            res.send("No more task exists");
        } else{
            res.send(result);
        }
    }
    catch(e){
        res.send(e);
    }
})

router.get('/tasks/:id', auth, async(req,res)=>{
    const _id = req.params.id;
    try{
        const result = await Task.findOne({_id, owner:req.user._id});
        if(!result){
            throw new Error("Invalid request");
        }
        res.send(result);
    }
    catch(e){
        res.statusCode=404;
        res.send(e);
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    const updatesAllowed = ['description','completed'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update)=>{
        updatesAllowed.includes(update);
    })

    // if(!isValidUpdate){
    //     res.statusCode=400;
    //     return res.send({error:"Invalid update"});
    // }

    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        if(!task){
            throw new Error("No such task exists!")
        } else {
            updates.forEach((update)=> task[update] = req.body[update]);
            await task.save();
            res.send(task);
        }
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

router.delete('/tasks/:id', auth, async(req,res)=>{
    try{
        const task = await Task.findOne({ _id:req.params.id, owner:req.user._id })
        if(!task){
            throw new Error("No such task found")
        } else { 
            await task.remove();
            res.send(task);
        }
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

module.exports = router;
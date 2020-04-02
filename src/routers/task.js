const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks',async(req,res)=>{
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

router.get('/tasks',async(req,res)=>{
    try{
        const result = await Task.find({});
        res.send(result)
    }
    catch(e){
        res.send(e);
    }
})

router.get('/tasks/:id',async(req,res)=>{
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

router.patch('/tasks/:id',async(req,res)=>{
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
        const task = await Task.findById({_id:req.params.id});
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

router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete({ _id:req.params.id })
        if(!task){
            throw new Error("No such task found")
        } else { 
            res.send(task);
        }
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

module.exports = router;
const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middlewares/auth');

router.post('/users',async(req,res)=>{
    const user =  new User(req.body);
    try{
        const token = await user.generateAuthToken();
        await user.save();
        res.send({user,token});
    }
    catch(e){
        res.statusCode = 400;
        res.send({ e })
    }
})

router.post('/users/login',async(req,res)=> {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            throw new Error("Invalid email or password");
        } 
        const token = await user.generateAuthToken();
        await user.save();
        res.send({user,token});
    } catch (error) {
        res.statusCode = 400;
        res.send(error);
    }
})

router.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return req.token != token.token
        })
        await req.user.save();
        res.send(req.user);
    } catch(e){
        res.statusCode = 400;
        res.send(error);
    }
})

router.post('/users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch(e){
        res.statusCode = 400;
        res.send(error);
    }
})

router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user);
})

router.patch('/users/me', auth, async(req,res)=>{
    const updatesAllowed = ['name','age','email','password'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update)=>{
        updatesAllowed.includes(update);
    })

    // if(!isValidUpdate){
    //     res.statusCode=400;
    //     return res.send({error:"Invalid update"});
    // }

    try{
        const user = await req.user;
        // const user = await User.findByIdAndUpdate({_id:req.params.id},req.body,{ new:true, runValidators:true});
        updates.forEach((update)=> user[update] = req.body[update]);
        await user.save();
        res.send(user);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

router.delete('/users/me', auth, async(req,res)=>{
    try{
        await req.user.remove();
        res.send(req.user);
    }
    catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

const upload = multer({
    // dest:'avatar/',
    limits:{
        fileSize:1000000
    },
    // file.originalname.endsWith('.pdf')
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload a img file"));
        }
        return cb(undefined,true);
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    // req.user.avatar = req.file.buffer;
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
},(error,req,res,next)=>{
    res.statusCode=400;
    res.send(error);
})

router.delete('/users/me/avatar',auth,async(req,res,next)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})

// Set up a router as a url for fetching image
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            throw new Error('There is no such user');
        }
        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch(e){
        res.statusCode=400;
        res.send(e);
    }
})

module.exports = router;

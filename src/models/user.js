const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

mongoose.connect('mongodb://localhost:12345/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const userSchema = new mongoose.Schema({ 
    name: {
        type:String,
        required:true,
        trim:true
    },
    age: {
        type:Number,
        validate(value){
            if(value < 0){
                throw new Error("Age should be positive")
            }
        }
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot include 'password'")
            }
        }
    },
    tokens: [{
        token: {
            type:String,
            required:true
        }
    }]
 }
)

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id},"pizza1234");
    this.tokens.push({token});
    return token;
}

// Middlewares
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

userSchema.pre('remove', async function(next){
    const tasks = await Task.find({owner:this._id});
    tasks.forEach((task)=>task.remove());
    next();
})

// Creating a model
const User = mongoose.model('User', userSchema );

 module.exports=User;

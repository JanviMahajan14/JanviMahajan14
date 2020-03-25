const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:12345/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Creating a model
const User = mongoose.model('User', { 
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
    }
 })

 module.exports=User;

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

 const Tasks = mongoose.model('Tasks',{
     description: {
         type: String,
         required:true,
         trim:true
     },
     completed: {
         type: Boolean,
         default:false
     }
 })

//  Defining instances for models
const user = new User({
    name:" Samridhi ",
    age:19,
    email:" janvi@gmai.com ",
    password:"janvi1234 "
})

user.save().then((result)=>{
    console.log(user);
}).catch((error)=>{
    console.log("Error ",error);
})

const task = new Tasks({
    description: "Learning mongodb",
})

task.save().then((result)=>{
    console.log(task);
}).catch((error)=>{
    console.log("Error ",error);
})
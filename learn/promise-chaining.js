const mongoose = require('mongoose');
const User = require('../src/models/user');
const Tasks = require('../src/models/task');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:12345/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


// User.findOneAndUpdate({_id:'5e786a09f857da3c7f024403'},{age:21}).then((result)=>{
//     console.log(result);
//     return User.countDocuments({age:19})
// }).then((count)=>{
//     console.log(count);
// }).catch((error)=>{
//     console.log(error);
// })

// Tasks.findOneAndDelete({_id:"5e788090372d6174c96d07a1"}).then((tasks)=>{
//     console.log(tasks);
//     return Tasks.countDocuments({completed:false})
// }).then((count)=>{
//     console.log(count);
// }).catch((error)=>{
//     console.log(error);
// })

const updateAgeAndCount = async ()=>{
    await User.findOneAndUpdate({_id:'5e786a09f857da3c7f024403'},{age:34})
    const count = await User.countDocuments({age:19})
    return count;
}

updateAgeAndCount().then((count)=>{
    console.log(count);
}).catch((error)=>{
    console.log(error);
})
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:12345/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const Tasks = mongoose.model('Tasks',{
    description: {
        type: String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports=Tasks;
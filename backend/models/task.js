const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required: true
    }
},{timestamps:true});

const Task = mongoose.model('Task',TaskSchema);

module.exports = Task;
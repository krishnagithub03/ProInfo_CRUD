const taskModel = require('../models/task');
const mongoose = require('mongoose');

// GET all
const getTasks = async (req,res)=>{
    const Tasks = await taskModel.find({}).sort({createdAt:-1});
    res.status(200).json(Tasks);
}
//GET Single
const getTask = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Task not found"});
    }
    const Task = await taskModel.findById(id);

    if(!Task){
        res.status(404).json({error:"Task not found"});
    }

    res.status(200).json(Task);
}

//POST
const createTask = async (req,res)=>{
    const {title,description,status} = req.body;
    if(!title || !description){
        res.status(400).json({error:"All fields are required"});
    }
    await taskModel.create({title,description,status});
    res.json({message:"Task created successfully"});
}

//PATCH
const updateTask = async (req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Task not found"});
    }
    const task = await taskModel.findByIdAndUpdate({_id:id},{...req.body},{new:true});
    if(!task){
        res.status(404).json({error:"Task not found"});
    }
    res.json({message:"Task updated successfully"});
}


//DELETE
const deleteTask = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Task not found"});
    }
    await taskModel.findByIdAndDelete(id);
    res.json({message:"Task deleted successfully"});
}



module.exports= {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}


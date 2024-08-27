const taskModel = require('../models/task');
const mongoose = require('mongoose');

// GET all
const getTasks = async (req,res)=>{
    try{
    const Tasks = await taskModel.find({}).sort({createdAt:-1});
    res.status(200).json(Tasks);
    } catch(err){
        res.status(404).json({error:"Tasks not found"});
    }
}
//GET Single
const getTask = async (req,res) =>{
    const {id} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({error:"Task not found"});
    // }
    try{
    const Task = await taskModel.findById(id);
    res.status(200).json(Task);
    } catch(err){
        res.status(404).json({error:"Task not found"});
    }
}

//POST
const createTask = async (req,res)=>{
    const {title,description,status} = req.body;
    try{
        await taskModel.create({title,description,status});
        res.json({message:"Task created successfully"});
    } catch(err){
        if(!title || !description){
            res.status(400).json({error:"All fields are required"});
        }else{
        res.status(400).json({error:err.message});
        }
    }
}

//PATCH
const updateTask = async (req,res)=>{
    const {id} = req.params;

    try{
        const task = await taskModel.findByIdAndUpdate({_id:id},{...req.body},{new:true});
        res.json({message:"Task updated successfully"});
    } catch(err){
        if(!mongoose.Types.ObjectId.isValid({_id:id})){
            res.status(404).json({error:"Task not found"});
        } else{
        res.status(404).json({error:err.message});
        }
    }
}


//DELETE
const deleteTask = async(req,res)=>{
    const {id} = req.params;
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({error:"Task not found"});
    // }
    try{
    await taskModel.findByIdAndDelete({_id:id});
    res.json({message:"Task deleted successfully"});
    } catch(err){
        res.status(404).json({error:err.message});
    }
}



module.exports= {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}


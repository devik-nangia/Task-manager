const Task = require('../models/Task.js')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (err) {
        res.status(500).json(err)
    }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        
        if (!task) {
            console.log("Task not found");
            return res.status(404).json({ error: "404 task not found" });
        }
    
        console.log(`Task found: ${task}`);
        return res.status(200).json(task);
    
    } catch (err) {
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
}

const deleteTask = (req, res) => {
    try{
        Task.findByIdAndDelete(req.params.id).then(()=>{
            res.status(200).send("task deleted successfully")
        })
    } catch(err){
        res.status(500).json(err)
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {
            runValidators: true,
            new: true
        })
        res.status(200).json({task})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getAllTasks, getTask, deleteTask, updateTask, createTask }
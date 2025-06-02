const express =require ("express");
const router=express.Router();
const Task=require("../models/Movies");

router.post("/",async(req, res)=>{
    try{
        const task =new Task(req.body);
        await task.save();
        res.status(201).json(task);
    }catch(err){
        res.status(400).json({error:err.message})
    }
});

router.get("/",async(req,res)=>{
    try{
        const task=await Task.find();
        res.json(task);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})
module.exports =router

const express =require ("express");
const router=express.Router();
const Movie=require("../models/Movies");

router.post("/",async(req, res)=>{
    try{
        const movie =new Movie(req.body);
        await movie.save();
        res.status(201).json({message:"Movie added Successfully!"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
});

router.get("/",async(req,res)=>{
    try{
        const movie=await Movie.find();
        res.json(movie);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(movie)
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

router.delete("/:id",async (req, res)=>{
    try{
        await Movie.findByIdAndDelete(req.params.id);
        res.json({message:"Movie Deleted Successfully!"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

module.exports =router

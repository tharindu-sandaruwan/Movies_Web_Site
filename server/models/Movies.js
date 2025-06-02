const mongoose= require("mongoose");

const MovieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    release_year:{
        type:String,
        required:true,
    },
    imdb:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    duration_minutes:{
        type:String,
        requires:true,
    },
    image_url:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    added_date:{
        type:Date,
        required:true,
    },
    last_update:{
        type:Date,
        required:true,
    }
});

module.exports=mongoose.model("Movie",MovieSchema);
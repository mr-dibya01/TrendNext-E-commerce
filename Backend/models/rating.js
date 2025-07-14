const mongoose=require("mongoose");
const { Schema }=mongoose;


const ratingSchema=new Schema({
    content:{
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    author: {
        type: Schema.ObjectId ,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports=mongoose.model("Rating",ratingSchema);
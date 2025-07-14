const mongoose=require("mongoose");
const { Schema }=mongoose;

const productSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image:[{
        url: String,
        filename: String
    }],
    gender: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "trending"
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        default: []
    },
    rating: {
        rate: Number,
        count: Number,
    }
});

module.exports=mongoose.model("Product",productSchema);
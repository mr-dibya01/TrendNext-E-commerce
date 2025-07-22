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
    image: {
        type: [
            {
                url: String,
                filename: String,
            }
        ],
        default: [
            {
                url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4IF-Yf59Lz8pyYzDkK6fRbIvyIvxGhXqS1zq26VFsx30IKjxCiuVSDefLKXms-OFi5OeE1e04SixbOBDa_ype0PJu45mVZbngCEwz3XCiGrE33GHwgDpF",
                filename: "default-image"
            }
        ]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Unisex"],
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
        default: [],
        enum: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
});

module.exports=mongoose.model("Product",productSchema);
const mongoose=require("mongoose");
const { Schema }=mongoose;


const userSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref:"Product"
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref:"Product"
    }],
    contact: {
        type: Number,
        required: true
    },
    address: [
        {
            name: String,
            contact: Number,
            pincode: Number,
            streetName: String,
            address: String,
            district: String,
            state: String,
            landmark: String,
            addressType: String,
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User",userSchema);
const mongoose= require("mongoose");
const { Schema } =mongoose.Schema;

const orderSchema = new Schema({
    productData:{
        type: Schema.ObjectId,
        ref:"Product"
    },
    paymentMode: String,
    orderDate:{ type: Date, default: Date.now },
    total: Number,  
});

module.exports=mongoose.model("Order",orderSchema);
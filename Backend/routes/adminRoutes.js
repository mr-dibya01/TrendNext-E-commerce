// const router=require("express").Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const Product=require("../models/product.js");
// const verifyAdmin=require("../middlewares/verifyAdmin.js");
// const { validateProductDettails }=require("../middlewares/middlewares.js");

// router.post("/add-product",verifyAdmin,validateProductDettails,wrapAsync(async(req,res)=>{
//     const newProduct=new Product(req.body);
//     await newProduct.save();
//     res.json({message: "Product added Successfully"})
// }));
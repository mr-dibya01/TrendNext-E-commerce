const router=require("express").Router();
const Product=require("../models/product.js")


// All Products
router.get("/",async(req,res) => {
    try {
        let products=await Product.find();
        res.json(products);
    } catch(err) {
        res.status(400).json({error: "Something went wrong!"});
    }
});

// Individual product dettails
router.get("/:id",async (req,res)=>{
    let { id }=req.params;
    try {
        let product=await Product.findById(id);
        res.json(product);
    } catch(err) {
        res.status(400).json({err: "Something went erong!"})
    }

});

// category wise product Data
router.get("/category/:categoryName",async(req,res)=>{
    let { categoryName }=req.params;
    try {
        let products=await Product.find({category: categoryName});
        console.log(products)
        res.json({categoryWiseProducts: products});
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "Something went wrong"});
    }
});

module.exports=router;

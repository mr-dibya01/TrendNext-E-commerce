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

module.exports=router;

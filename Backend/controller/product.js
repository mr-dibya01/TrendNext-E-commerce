const expressError =require("../utils/expressEroor.js");
const Product =require("../models/product.js");


module.exports.getAllProductsData=async (req,res) => {
    let products=await Product.find();
    if(!products){
        return next(new expressError(500,"Something went wrong!"));
    }
    res.json(products);
};

module.exports.showIndividualProduct=async (req,res,next)=>{
    let { id }=req.params;
    let product=await Product.findById(id);
    if(!product) {
        return next(new expressError(402,"This product is not availble!"));
    }
    res.json(product);
};

module.exports.getCatogorizeProductsData=async(req,res,next)=>{
    let { categoryName } = req.params;
    console.log(categoryName);
    let products = await Product.find({category: categoryName}); 
    if(products.length === 0){
        return next(new expressError(401,"No such a products in this Category"));  
        // return res.status(401).json({error: "No such a products in this Category"});
    }
    console.log(products)
    res.json({categoryWiseProducts: products});
};

module.exports.getSearchWiseProducts=async(req,res,next)=>{
    const keyword=req.query.query ? {title: {$regex :req.query.query ,$options: 'i'}} :{};
    const products = await Product.find({ ...keyword });
    console.log(products);
    if(!products || products.length == 0){
        return next(new expressError(402,"Items are not availble"));
    }
    res.json(products);
}

// async(req,res)=>{
//     const keyword=req.query.query ? {title: {$regex :req.query.query ,$options: 'i'}} :{};
//     console.log( keyword );
//     const products = await Product.find({ ...keyword });
//     console.log(products);
//     res.json({msg:"Done"})
// }

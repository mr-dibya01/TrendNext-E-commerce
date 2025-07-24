const router =require("express").Router();
const wrapAsync =require("../utils/wrapAsync.js");
const productController =require("../controller/product.js");
const Product=require("../models/product.js");

// console.log("---",productController.getAllProductsData); 
// All Products
router.get("/products",wrapAsync(productController.getAllProductsData));

// Search query product
router.get("/products/search",wrapAsync(productController.getSearchWiseProducts));

// Individual product dettails
router.get("/products/:id",wrapAsync(productController.showIndividualProduct));

// category wise product Data
router.get("/products/category/:categoryName",wrapAsync (productController.getCatogorizeProductsData));


module.exports=router;

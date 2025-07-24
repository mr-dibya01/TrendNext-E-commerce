const { productSchema ,registerSchema ,addressSchema ,loginSchema }=require("../Schema.js")
const expressError=require("../utils/expressEroor.js")

module.exports.validateRegister=(req,res,next)=>{
    let result=registerSchema.validate(req.body);
    if(result.error){
        next(new expressError(400 , result.error.message));
    } else {
        next();
    }
};

module.exports.validateAddress=(req,res,next)=>{
   let result=addressSchema.validate(req.body);
    if(result.error){
        next(new expressError(400 , result.error.message));
        console.log("Done"); 
    } else {
        next();
    } 
};

module.exports.validateLogin=(req,res,next)=>{
   let result=loginSchema.validate(req.body);
   console.log("validateLogin",result);
    if(result.error){
        next(new expressError(400 , result.error.message));
    } else {
        next();
    } 
};

module.exports.validateProductDettails=(req,res,next) => {
    let result=productSchema.validate(req.body);
    if(result.error){
        return next(new expressError(403 ,result.error.message));
    }
    next();
};
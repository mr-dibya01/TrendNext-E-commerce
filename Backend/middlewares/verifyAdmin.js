const expressError=require("../utils/expressEroor.js")
const jwt=require("jsonwebtoken");


const verifyAdmin=(req,res,next)=>{
    const token=req.headers.authorization?.spilt(" ")[1];
    if(!token){
        next(new expressError(402,"No token,auth Denied"));
    };
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        // if(!decoded){
        //     next(new expressError(403,"Admin access only!"))
        // }
        // req.user=decoded;

    } catch (err) {
        console.log(err);
    }
}
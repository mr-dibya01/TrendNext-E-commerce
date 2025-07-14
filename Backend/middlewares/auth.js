const jwt=require("jsonwebtoken");

function authMiddlware(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        res.status(401).json({error: "No Token"});
        return;
    }
    try {
        console.log(authHeader);
        let token=authHeader.split(" ")[1];
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}
module.exports = authMiddlware;
const router=require("express").Router();
const bcryptjs=require("bcryptjs");
const jwt = require('jsonwebtoken');
const User=require("../models/user.js");
const authMiddleware=require("../middlewares/auth.js")


// create new user
router.post("/register",async (req,res)=>{
    console.log(req.body);
    const { username ,password ,email ,contact ,name }=req.body;
    
    try {
    const hash=await bcryptjs.hash(password,10);
    console.log(hash);
    const user=new User({
        name: name, 
        username: username,
        password: hash,
        email: email,
        contact: contact,
    });
    console.log(user);
    await user.save();
    res.json({ message: "User succesfully registered"});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Username alerdy Exists!"});
    }
}); 

// Login route
router.post("/login",async (req,res)=>{
    console.log(req.body);
    const { username ,password }=req.body;
    try {
        let user=await  User.findOne({username});
        if(!user){
            res.status(400).json({message: "User not found!"})
        }
        let isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch) {
            res.status(400).json({message: "password is wrong!"});
        }
        let token=jwt.sign({ id: user._id } ,process.env.JWT_SECRET ,{ expiresIn: "10h" })
        res.json({message: "User succesfully loged in",token});
    } catch (err) {
        console.log(err);
        res.status(400).json({error:"Something went wrong"});
    }
});

// push address of user
router.post("/address",authMiddleware,async (req,res)=>{
    try {
        let user=await User.findById(req.user.id);
        console.log(user);
        user.address.push(req.body);
        await user.save();
        res.json({msg: "Your address succesfully saved!"});
    } catch (err) {
        console.log(err);
        res.status(400).json({error: "Something went wrong"});
    }
    // let { name ,contact ,pincode ,strretName ,Address ,District ,State ,Landmark ,AddressType }=req.body();
});

// get address of user
router.get("/address",authMiddleware,async (req,res)=>{
    console.log("get address of use")
    try {
        let user = await User.findById(req.user.id);
        console.log(user);
        if(user.address){
            res.json({address: user.address});
        } else {
            res.json({address: null});
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({error: "Something went wrong"});
    }
});

// update address of user
router.put("/address",authMiddleware,async (req,res)=>{
    console.log(req.body);
    try {
        let user = await User.findByIdAndUpdate( req.user.id ,{ address: req.body });
        console.log(user);
        res.json({msg: "user address succesfully updated",address: user.address});
    } catch (err) {
        console.log(err)
        res.status(400).json({error: "Something went wrong"}); 
    }
});

module.exports=router; 
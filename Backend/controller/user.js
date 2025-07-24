const bcryptjs=require("bcryptjs");
const jwt = require('jsonwebtoken');
const User=require("../models/user.js");




module.exports.createNewUser = async (req,res)=>{
    const { username ,password ,email ,contact ,name }=req.body;
    const existingUser=await User.findOne({ username });
    if(existingUser) {
        return res.status(400).json({error: `username ${username} already exists`});
    }
    const existingEmail=await User.findOne({ email });
    if(existingEmail) {
        return res.status(400).json({error: `Email ${ email } already registered`});
    }
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
};

module.exports.userLogin = async (req,res)=>{
    console.log("/login",req.body);
    const { username ,password }=req.body;
    let user=await  User.findOne({username});
    if(!user){
        return res.status(400).json({error: "User not found!"});
    }
    let isMatch=await bcryptjs.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({error: "Password is wrong!"});
    }
    let token=jwt.sign({ id: user._id } ,process.env.JWT_SECRET ,{ expiresIn: "10h" })
    res.json({message: "User succesfully loged in",token});
};

module.exports.postUserAddress = async (req,res)=>{
    let user=await User.findById(req.user.id);
    console.log(user);
    user.address.push(req.body);
    await user.save();
    res.json({msg: "Your address succesfully saved!"});
    // let { name ,contact ,pincode ,strretName ,Address ,District ,State ,Landmark ,AddressType }=req.body();
};

module.exports.getUserInfo = async(req,res)=>{
    let currUserId= req.user.id;
    // console.log(currUserId);
    let currUser=await User.findById(currUserId);
    res.json(currUser);
};

module.exports.getUserAddress = async (req,res)=>{
    console.log("get address of use")
    let user = await User.findById(req.user.id);
    console.log(user);
    if(user.address){
        res.json({address: user.address});
    } else {
        res.json({address: null});
    }
};

module.exports.updateUserInfo = async (req,res)=>{
    console.log(req.body);
    let user = await User.findByIdAndUpdate( req.user.id ,{ address: req.body },{ new: true });
    console.log(user);
    res.json({msg: "user address succesfully updated",address: user.address});
};
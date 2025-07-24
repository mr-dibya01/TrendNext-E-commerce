if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express=require("express");
const mongoose=require("mongoose");
const app=express();
const ProductRoute=require("./routes/product.js")
const LoginRoute=require("./routes/user.js")
const cors=require("cors")


app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
await mongoose.connect(process.env.ATLASDB_URI);
console.log("Database connected");
}

app.use("/trendnext",ProductRoute);
app.use("/trendnext/user",LoginRoute); 

app.use((err,req,res,next)=>{
  // console.log("Error = ",err,"--------"); 
  if(err.code == 11000){
    let field=Object.keys(err.keyValue)[0];
    let keyValue=err.keyValue[field];
    return res.status(401).json({error: `${field} ${keyValue} already exists`});
  }
  let { status=500 , message="Internal Server Error!" } = err;
  console.log("Error Handler",status,message);
  res.status(status).json({error:message});
});
 
app.listen(5000,() => { 
  console.log("Server is listening at port 5000");
})

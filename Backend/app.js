const express=require("express");
const mongoose=require("mongoose");
const app=express();
const ProductRoute=require("./routes/product.js")
const LoginRoute=require("./routes/user.js")
const cors=require("cors")
require("dotenv").config()
// TrendNext

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/E-commerce');
console.log("Database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// app.ge
app.use("/trendnext",ProductRoute);
app.use("/trendnext/user",LoginRoute); 


app.listen(5000,() => { 
  console.log("Server is listening at port 5000");
})

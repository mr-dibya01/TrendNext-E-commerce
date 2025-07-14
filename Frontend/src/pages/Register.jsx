import React, { useState } from 'react'
import assets from "../assets/productAssets/pictures.jsx"
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar.jsx';
import axios from "axios";

function Register() {
  let [fromData,setFromData]=useState({ name: "" ,username: "" ,password: "",contact: "",email: ""});
  function handleChange(e){
    setFromData((prev)=>
      ({...prev,[e.target.name]:e.target.value})
    )
  }
  async function handleSubmit(e){
    e.preventDefault();
    try{
      console.log(fromData);
      let res=await axios.post("http://localhost:5000/trendnext/user/register",fromData);
      setFromData({ name: "" ,username: "" ,password: "",contact: "",email: ""});
      alert(res.data.message);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  } 
  console.log(fromData);
  return (
    <>
    <Navbar />
      <div className='h-[90vh] w-full bg-zinc-200 flex justify-center items-center'>
        <div className="bg-white shadow-lg w-[80%] h-[95%] flex justify-between  rounded-xl px-10 py-12">
          <div className='image-container w-[45%] h-full bg-red-400 rounded-[10%] overflow-hidden'> 
            <img src={assets.Login_pic} className='h-full w-full object-cover' alt="" /> 
          </div>

          <div className='from-container w-1/2 h-full  flex flex-col  items-center gap-2'>
            <div className='flex items-center justify-self-center h-fit'>
              <div className='Logo h-24 w-24'>
                <img src={assets.logo6} alt="" />
              </div>
              <h1 className='text-4xl'>Trendnext</h1>
            </div>
            <form action="" className='flex flex-col gap-5 w-full items-center' onSubmit={ handleSubmit }>
              <input type="text" className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='name' value={fromData.name} placeholder='Enter your name' onChange={handleChange}/>
              <input type="text" className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='username' value={fromData.username} placeholder='Enter your username' onChange={handleChange}/>
              <input type="email" className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='email' value={fromData.email} placeholder='Enter your Email Id' onChange={handleChange}/>
              <input type='text' className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='contact' value={fromData.contact} placeholder='Enter your mobile number' onChange={handleChange}/>
              <input type="password" className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='password' value={fromData.password} placeholder='Enter your password' onChange={handleChange}/>
              <button type='submit' className='bg-black text-xl text-white px-9 py-0.5 rounded-lg h-12 w-[80%] mt-4'>Register</button>
            </form>
            <Link to="/trendnext/login" className='text-lg mt-5'>you have an account?<span className='text-blue-600 underline'>Log in</span></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register

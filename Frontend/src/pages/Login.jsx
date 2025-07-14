import React, { useState } from 'react'
import assets from "../assets/productAssets/pictures.jsx"
import axios from "axios"
import { Link ,useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar.jsx'

function Login() {
  let [fromData,setFromData]=useState({username: "" , password: ""});
  const Navigate=useNavigate();
  function handleChange(e){
    setFromData({...fromData,[e.target.name]:e.target.value});
  }
  async function handleSubmit(e){
    e.preventDefault();
    console.log(fromData);
    try {
      let res=await axios.post("http://localhost:5000/trendnext/user/login",fromData);
      let token=res.data.token;
      localStorage.setItem("token",token);
      setFromData({username: "" , password: ""});
      alert(res.data.message);  
      const nextRedirectUrl=localStorage.getItem("nextRedirectUrl");
      if(nextRedirectUrl){
        Navigate(nextRedirectUrl);
        localStorage.removeItem("nextRedirectUrl");
      } else {
        Navigate("/");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Invalid username or password");
    }
  }
  // localStorage.clear();
  return (
    <>
      <Navbar />
      <div className='h-[90vh] w-full bg-zinc-200 flex justify-center items-center'>
        <div className="bg-white shadow-lg w-[80%] h-[95%] flex justify-between  rounded-xl px-10 py-12">
          <div className='image-container w-[45%] h-full bg-red-400 rounded-[10%] overflow-hidden'>
            <img src={assets.Login_pic} className='h-full w-full object-cover object-[10% 60%]' alt="" />
          </div>

          <div className='from-container w-1/2 h-full  flex flex-col py-6 items-center gap-3'>
            <div className='flex items-center justify-self-center h-fit'>
              <div className='Logo h-24 w-24'>
                <img src={assets.logo6} alt="" className='h-full w-full object-cover' />
              </div>
              <h1 className='text-4xl'>Trendnext</h1>
            </div>
            <div className='text-center mb-12'>
              <h1 className='text-6xl whitespace-nowrap'>Welcome Back</h1>
              <h2 className='text-zinc-500'>please login to your account</h2>
            </div>
            <form className='flex flex-col gap-10 w-full items-center' onSubmit={handleSubmit}>
              <input type="text" className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='username' value={fromData.username} onChange={handleChange} placeholder='Enter your username'/>
              <input type="password" className='bg-zinc-100 rounded-md px-4 h-12 w-[80%] outline-none' name='password' value={fromData.password} onChange={handleChange} placeholder='Enter your password'/>
              <button type='submit' className='bg-black text-xl text-white px-9 py-0.5 rounded-lg h-12 w-[80%] mt-4'>Login</button>
            </form>
            <Link to="/trendnext/register" className='text-lg mt-5'>Don't have an account?<span className='text-blue-600 underline'>Register</span></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

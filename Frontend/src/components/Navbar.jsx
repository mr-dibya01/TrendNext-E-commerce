import React, { useEffect, useState } from 'react'
import assets  from '../assets/productAssets/pictures.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser ,FaRegUserCircle ,FaRegUser } from "react-icons/fa";
import { MdOutlineAddBusiness ,MdDashboard ,MdFavoriteBorder ,MdLogout } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios"
import { toast } from 'react-toastify';





function Navbar({handleSearch}) {
  let [navigateSidebar,setNavigateSidebar]=useState(false);
  let [currUser,setCurrUser]=useState({});
  let [query,setQuery]=useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSize = cartItems.length;
  const Navigate=useNavigate(); 
  let token=localStorage.getItem("token");
  console.log(currUser);
  useEffect(()=>{
    async function fetchCurrUserInfo(){
      try{
        let res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/trendnext/user/userInfo`,{
          headers: {authorization:`Bearer ${token}`}
        });
        setCurrUser(res.data);
      } catch (err){
        console.error("Error fetching user info:", err);
        if(err.response.data.error ==="Invalid token"){
          localStorage.removeItem("token");
          Navigate("/trendnext/login");
        }
      }
    }
    if(token){
      fetchCurrUserInfo();
    }
    
  },[]);


  function handleCart(){
    Navigate("/trendnext/cart");
  }
  function handleFavorite(){
  
  }
  function handleAdmin(){
    toast.error("This feature is implement in feature!",{
      position: "bottom-right" ,
      autoClose: 3000 ,
      theme: "colored" ,
    });
  }
  function handleSidebar(){
    if(token){
      setNavigateSidebar(!navigateSidebar);
      console.log("1");
    } else {
      Navigate("/trendnext/login")
    }

  }
  function handleLogo(){
    Navigate("/");
  }
  // async function handleSearch(){
    
  // }
  function handleLogout(){
    localStorage.removeItem("token");
    setNavigateSidebar(false);
    Navigate("/trendnext/login");
  }
  return (
    <nav className='h-20 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 flex items-center px-4  py-1 justify-between'>
      <div className='Logo h-16 w-[12%] cursor-pointer ' onClick={handleLogo}>
        <img className='h-full w-full object-cover' src={assets.logo6} alt="" />
      </div>
      <div className='w-[40%] h-[75%] relative'>
        <button className='absolute bg-purple-500 h-12 w-12 rounded-full border-[none] flex items-center justify-center right-0 -translate-x-[8%] translate-y-[6%]' onClick={() => handleSearch(query) }><IoSearch className='text-3xl text-white hover:opacity-70'/></button>
        <input type="text" className='w-full h-full rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-violet-100 p-3 text-xl outline-none' placeholder='Search for Products Brands and More' onChange={(e)=>setQuery(e.target.value)} onKeyDown={(e) => {
          if(e.key == "Enter"){
            handleSearch(query);
          }
        }}/>
      </div>
      <div className='icons h-full  w-[35%] flex items-center justify-between relative'>
        <div className='flex gap-1 items-center cursor-pointer hover:opacity-70 relative ' onClick={ handleCart }>
          <FaCartShopping  className='text-2xl' />
          <h1 className='font-medium'>Cart</h1>
          <div className='absolute h-5 w-10 p-1 bg-black text-white top-0 rounded-full left text-sm flex justify-center items-center left-[100%] translate-x-1 translate-y-[10%]'>{cartSize}{cartSize == 0 ? "" : " +"}</div>
        </div>
        <div className='flex gap-1 items-center cursor-pointer hover:opacity-70 relative' onClick={ handleFavorite }>
          <MdFavoriteBorder className='text-2xl'/>
          <h1 className='font-medium'>Fovorites</h1>
          <div className='h-2.5 w-2.5 absolute bg-red-600 rounded-full top-0 left-[18%] -translate-y-0.5'></div>
        </div>
        <div className='flex gap-1 items-center cursor-pointer hover:opacity-70' onClick={ handleAdmin }>
          <MdOutlineAddBusiness className='text-2xl'/>
          <h1 className='font-medium'>Sell Your Products</h1>
        </div>
        <span className='h-10 w-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-90'><FaUser onClick={ () => handleSidebar() } className='text-2xl' /></span>
        {navigateSidebar && 
          <div className='absolute h-fit w-96 z-50 -right-2 top-5 rounded-xl pt-2 shadow-2xl  bg-zinc-200 overflow-hidden'>
            <div className='flex justify-end pr-2 pt-0.5 '>
              <RxCross1 className='size-7  hover:bg-red-600 hover:text-white text-red-600 p-1 rounded-full transition hover:cursor-pointer' onClick={() => setNavigateSidebar(!navigateSidebar)}/>
            </div> 
            <div className='flex flex-col items-center '>
              <span className='h-28 w-28 bg-black text-white p-6  rounded-full'>
                <FaRegUser className='h-full w-full'/>
              </span>
              <h1 className='text-2xl py-2 pt-3'>{currUser.username}</h1>
              <h1 className='textlg pb-5'>{currUser.email}</h1>
            </div>
            
            <div className='flex justify-start items-center py-4 px-3 gap-2 border-b-2 border-zinc-300 border-t-2 hover:bg-zinc-300 transition cursor-pointer'>
              <FaRegUserCircle className='size-7'/>
              <h1 className='text-2xl '>Account</h1>
            </div>
            <div className='flex justify-start items-center py-4 px-3 gap-2 border-b-2 border-zinc-300 hover:bg-zinc-300 transition cursor-pointer'>
              <MdDashboard className='size-7'/>
              <h1 className='text-2xl '>Dashbord</h1>
            </div>
            <div className='flex justify-start items-center py-4 px-3 gap-2 hover:bg-zinc-300 transition cursor-pointer' onClick={ () => handleLogout()}>
              <MdLogout className='size-7'/>
              <h1 className='text-2xl '>Log Out</h1>
            </div>
          </div> 
        } 
      </div>
    </nav>
  )
}

export default Navbar
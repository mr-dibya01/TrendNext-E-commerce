import React, { useEffect } from 'react'
import assets  from '../assets/productAssets/pictures.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlineAddBusiness } from "react-icons/md";


function Navbar() {
  const Navigate=useNavigate(); 
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Cart ItemsssssNAV", cartItems);
  const cartSize = cartItems.length;

  function handleCart(){
    Navigate("/trendnext/cart");
  }
  function handleFavorite(){
  
  }
  function handleAdmin(){
  
  }
  function handleLogin(){
  }
  function handleLogo(){
    Navigate("/");
  }
  return (
    <nav className='h-20 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 flex items-center px-4  py-1 justify-between'>
      <div className='Logo h-16 w-[12%] cursor-pointer ' onClick={handleLogo}>
        <img className='h-full w-full object-cover' src={assets.logo6} alt="" />
      </div>
      <div className='w-[40%] h-[75%] relative'>
        <button className='absolute bg-purple-500 h-12 w-12 rounded-full border-[none] flex items-center justify-center right-0 -translate-x-[8%] translate-y-[6%] '><IoSearch className='text-3xl text-white hover:opacity-70'/></button>
        <input type="text" className='w-full h-full rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-violet-100 p-3 text-xl ' placeholder='Search for Products Brands and More'/>
      </div>
      <div className='icons h-full  w-[35%] flex items-center justify-between'>
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
        <span className='h-10 w-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-90'><FaUser onClick={ () => Navigate("/trendnext/login") } className='text-2xl' /></span>
      </div>
    </nav>
  )
}

export default Navbar
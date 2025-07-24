import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import { useNavigate, useParams } from 'react-router-dom'
import RatingStar from "../components/RatingStar.jsx"
import { FaPlus ,FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice.js';
import { setBuyNowItem } from "../features/cart/cartSlice.js"
import { toast } from 'react-toastify';



function ProductDettails() {
  let [productData,setProductData] = useState(null);
  let [quantity,setQuantity] = useState(1);
  let [selectSize ,setSelectSize] = useState();
  let [showFullDescription ,setShowFullDescription] = useState(false);

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const {id} = useParams();
  useEffect(() =>{
    async function fetchProduct(){
      try{
        let res=await axios.get(`http://localhost:5000/trendnext/products/${id}`);
        setProductData(res.data);
      } catch (err) {
        console.log(err); 
        toast.error(err?.response?.data?.error,{
          theme: "colored",
          position: "bottom-right",
          autoClose: 3000
        })
      }
    }
    fetchProduct();
  },[id]);

  if(!productData) return <p>Loding.....</p>


  let productOff=Math.round(((productData.discount - productData.price) / productData.discount) * 100);

  function handleAdd2Cart(){
    if(!selectSize){
      toast.error("Please select the size", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    let productDettails={
      id: productData._id,
      title: productData.title,
      price: productData.price,
      image: productData.image[0].url,
      size: selectSize,
      quantity: quantity
    }
    Dispatch(addToCart(productDettails));
    console.log("Redux me gaya data: ", productDettails);
    toast.success("Product added to cart!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
  function handleBuynow(){
    let token=localStorage.getItem("token");
    // localStorage.removeItem("token");
    if(!token) {
      toast.error("you should be loged in to buy an item", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      localStorage.setItem("nextRedirectUrl",`/trendnext/${productData._id}`)
      Navigate("/trendnext/login");
      return;
    };
    if(!selectSize){
      toast.error("Plese select the size", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    const buyNowData = [{
      id: productData._id,
      title: productData.title,
      price: productData.price,
      image: productData.image[0].url,
      size: selectSize,
      quantity: quantity,
    }];
    console.log(buyNowData);
    Dispatch(setBuyNowItem(buyNowData));
    localStorage.setItem("buyNowData",JSON.stringify(buyNowData));
    Navigate("/trendnext/checkout");
  }
  function handleNavigate(){
    Navigate("/trendnext/OrderSuccess");
  }
  return (
    <>
    <div className='h-full w-full'>
      <Navbar />
      <div className='product h-[90%] px-4 py-2 flex'>
        <div className='product-small-imgs w-[10%] h-full p-1 flex flex-col items-center'>
            <div className='h-30 w-20 bg-white align-center border border-black p-0.5 cursor-pointer'>
              <img className='h-full w-full object-cover' src={productData.image[0].url} alt="" />
            </div>
        </div>
        <div className='product-img w-[40vw] h-full bg-white p-2'>
          <img className='h-full w-full object-cover object-top' src={productData.image[0].url} alt="" />
        </div>
        <div className='product-text w-[50%] h-full px-5 py-0.5 flex flex-col gap-y-4'>
          <h2 className='text-base font-semibold capitalize text-gray-500'>{productData.category}</h2>
          <h1 className='text-4xl font-semibold leading-none'>{productData.title}</h1>
          <div className='text-xl font-semibold font-sans capitalize text-gray-700 leading-[25px]'>
            <p>
              {showFullDescription
                ? productData.description
                : `${productData.description.slice(0, 129)}...`}
            </p>
            <button
              className="mt-1 text-blue-600 font-semibold text-sm underline"
              onClick={() => setShowFullDescription((prev) => !prev)}
            >
              {productData.description.length > 129 && showFullDescription ? "Show less" : "Show more"}
            </button>
          </div>
          <RatingStar rate={productData.rating.rate} count={productData.rating.rate}/>
          <div className='flex gap-7 items-end'>
            <h1 className='text-4xl text-black font-semibold'>${productData.price}</h1>
            <h1 className='line-through text-lg font-semibold text-gray-600'>${productData.discount}</h1>
            <h1 className='text-green-600 font-semibold'>{productOff}% off</h1>
          </div>
          <div className='sizes '>
            <h1 className=' text-lg font-semibold text-gray-800'>Select Size</h1>
            <div className='w-full flex gap-3 mt-3'>
              {productData.sizes.map((size,idx)=>{
                return <span key={idx} className={`px-4 py-0.5 border cursor-pointer transition ${selectSize == size ? "text-white bg-black " : "border-black hover:bg-slate-300" }`} onClick={()=>{
                  setSelectSize(size);
                }}>{size}</span>
              })}
            </div>
          </div>
          <div className="quantity">
            <h1 className='font-semibold text-gray-800'>Quantity</h1>
            <div className=" flex items-center justify-between px-3  py-1 border border-gray-400 w-32 mt-3">
              <button onClick={()=>{
                  if(quantity > 1){
                    setQuantity((prev)=>prev - 1)
                  }
                }}>
                <FaMinus />
              </button>
              <h1>{quantity.toString().padStart(2,"0")}</h1>
              <button onClick={()=>{
                  setQuantity((prev)=>prev + 1)
                }}>
                <FaPlus />
              </button>
            </div>
          </div>
          <div className='flex gap-5 justify-start mt-5'>
            <button className='px-12 py-2 border border-black font-semibold transition-transform hover:scale-105' onClick={handleAdd2Cart}>Add to cart</button>
            <button className='px-12 py-2 bg-black text-white border border-black transition hover:scale-105' onClick={handleBuynow}>Buy it now</button>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default ProductDettails

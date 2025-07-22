// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import assets from '../assets/productAssets/pictures';
import AddressFrom from './AddressFrom';
import { toast } from 'react-toastify';


function Checkout() {
  const [buyNowItem, setBuyNowItem] = useState([{}]);
  let [fromData,setFromData]=useState({ cardCvc: "", cardExpiry: "", cardHolderName: "", cardNumber: "", email: "", paymentMode: "" }); 
  console.log(buyNowItem);
  const Navigate = useNavigate();
  const reduxData = useSelector((state) => state.cart.buyNowItem);
  // const data=localStorage.getItem("buyNowData");
  console.log("reduxData",reduxData);
  useEffect(()=>{
    let token=localStorage.getItem("token");
    if(!token){
      localStorage.setItem("nextRedirectUrl","/trendnext/checkout");
      Navigate("/login");
      toast.error("You should be Loged in",{
        autoClose: 3000 ,
        position: "bottom-right" ,
        theme: "colored"
      })
      return;
    }
    if(reduxData){
      setBuyNowItem(reduxData);
    } else {
      const localData=localStorage.getItem("buyNowData");
      console.log("localData",JSON.parse(localData));
      if(localData){
        localStorage.removeItem("buyNowData");
        setBuyNowItem(JSON.parse(localData));
      } else {
        Navigate("/");
        toast.error("Product has not Selected",{
          position: "bottom-right" ,
          autoClose: 3000 ,
          theme: "colored"
        });
      }
    }
  },[reduxData])
  
  if (!buyNowItem || buyNowItem.length === 0 || !buyNowItem[0].title) {
  return <h1 className='text-center mt-10 text-xl font-semibold'>No items in checkout</h1>;
  }

  // const handleBuyNow=() => {
  //   if(!fromData.cardCvc || !fromData.cardExpiry || !fromData.cardHolderName || !fromData.cardNumber || !fromData.email || !fromData.paymentMode){
  //     return;
  //   } else {
  //     console.log("handleBuyNow");
  //     Navigate("/trendnext/OrderSuccess");
  //   }
  // }

  const handleChange=(e) => {
    setFromData((prevData)=>({...prevData ,[e.target.name]: e.target.value}))
    console.log(fromData);
  };

  const handleSubmit=(e) => {
    e.preventDefault();
    if(fromData.paymentMode == "cash"){
      console.log("CASH");
      Navigate("/trendnext/OrderSuccess");
    }
    else if(!fromData.cardCvc || !fromData.cardExpiry || !fromData.cardHolderName || !fromData.cardNumber || !fromData.email || !fromData.paymentMode){
      toast.error("Please fill the all blank fields",{
        position: "bottom-right" ,
        autoClose: 3000,
        theme: "colored"
      });
      return;
    } 
    else {
      console.log("handleBuyNow");
      console.log(fromData);
      Navigate("/trendnext/OrderSuccess");
    }
  }
  const subTotal = buyNowItem.reduce((acc,curr)=> acc + (curr.price * curr.quantity),0);
  const Discount=subTotal * 0.25;
  const DeliveryFee=5;
  const Tax = buyNowItem.reduce((acc,curr)=> acc + (curr.price * 0.5),0);
  const Total =(subTotal + DeliveryFee + Tax) - Discount;
  return (
    <>
      <Navbar />
        <div className="p-10 px-16 min-h-full w-full flex justify-between bg-white">
          <div className="left w-[68%] h-full">
            <div className="product-dettails border rounded-md p-5 border-zinc-400 bg-white shadow-lg">
              <h1 className='text-4xl font-medium capitalize font-sans'>Review item and shipping</h1>
              {buyNowItem.map((item,idx)=>
                <div className='ProductCard h-52 flex items-center p-4 ' key={idx}>
                  <div className='ProductImage h-full w-36 rounded-lg overflow-hidden p-1'>
                    <img src={item.image} alt="" className='h-full w-full object-cover' />
                  </div>
                  <div className='flex w-[84%] justify-between '>
                    <div className='ProductName ml-[2vw]'>
                      <h1 className='text-xl font-semibold'>{item.title}</h1>
                      <h1 className='text-sm text-zinc-400'>size: <span className='text-base text-zinc-600'>{item.size}</span></h1>
                    </div>
                    <div className="price text-end">
                      <h1 className='text-xl font-semibold'>${item.price}</h1>
                      <h1 className='text-sm text-zinc-400 whitespace-nowrap'>Quantity: <span className='text-zinc-500 text-base'>{item.quantity}</span></h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="address mt-10">
              <AddressFrom />
            </div>
          </div>
          <div className="right w-[30%] p-4 min-h-screen  rounded-lg shadow-lg border border-zinc-300 ">
            <h1 className='text-2xl font-semibold border-b border-zinc-300 pb-3'>Order Summary</h1>
            <div className='flex py-5'>
              <input type="text" className='bg-zinc-100 px-4 h-9 rounded-full w-[80%] outline-none' placeholder='Enter Coupon Code'/>
              <button className='bg-purple-600 rounded-full px-3 h-9  text-sm text-white whitespace-nowrap'>Apply coupon</button>
            </div>
            <div className="payment">
              <h1 className=' font-sans font-semibold text-xl mb-4 mt-1'>Payment details</h1>
              <form className="Payment-methods" onSubmit={ handleSubmit }>
                <div className='flex items-center gap-1 mb-4'>
                  <input type="radio" name='paymentMode' value={"cash"} id='cash' onChange={ handleChange }/>
                  <label htmlFor="cash" className='hover:cursor-pointer'>Cash on Delivery</label>
                </div>
                <div className='flex items-center gap-1 mb-4'>
                  <input type="radio" id='shopcard' name='paymentMode' value={"shopcard"} onChange={ handleChange }/>
                  <label htmlFor="shopcard" className='hover:cursor-pointer'>Shopcart Card</label>
                </div>
                <div className='flex items-center gap-1 mb-4'>
                  <input type="radio" id='paypal' name='paymentMode' value={"paypal"} onChange={ handleChange }/>
                  <label htmlFor="paypal" className='hover:cursor-pointer'>Paypal</label>
                </div>
                <div className='flex items-center gap-1 mb-4'>
                  <input type="radio" id='card' name='paymentMode' value={"card"} onChange={ handleChange }/>
                  <label htmlFor="card" className='hover:cursor-pointer'>Credit or Debit card</label>
                </div>
                <div className='h-12 w-full mt-3 p-1 flex gap-3 items-center'>
                    <img src={assets.Amazon_Logo} alt="" className='h-[65%] w-20  object-cover'/>
                    <img src={assets.Visa_Logo} alt="" className='h-[65%] w-20 object-cover'/>
                    <img src={assets.MasterCard_Logo} alt="" className='h-[83%] w-20 object-cover'/>
                </div>
                <div className='card-dettails'>
                  <div className='mt-5'>
                    <label htmlFor="">Email*</label> <br />
                    <input type="email" placeholder='Type here...' className='outline outline-1 mt-1 w-full h-8 px-2 rounded-sm outline-zinc-400' onChange={ handleChange } name='email'/>
                  </div>
                  <div className='mt-5'>
                    <label htmlFor="">Card Holder Name*</label>
                    <input type="text" placeholder='Type here...' className='outline outline-1 mt-1 w-full h-8 px-2 rounded-sm outline-zinc-400' onChange={ handleChange } name='cardHolderName'/>
                  </div>
                  <div className='mt-5'>
                    <label htmlFor="">Card Number</label>
                    <input type="text" placeholder='0000*****1246' className='outline outline-1 mt-1 w-full h-8 px-2 rounded-sm outline-zinc-400' onChange={ handleChange } name='cardNumber'/>
                  </div>
                  <div className='mt-5 flex gap-3'>
                    <div className='w-1/2'>
                      <label htmlFor="">Expiry*</label>
                      <input type="text" placeholder='MM/YY' className='outline outline-1 mt-1 w-full h-8 px-2 rounded-sm outline-zinc-400' onChange={ handleChange } name='cardExpiry'/>
                    </div>
                    <div className='w-1/2'>
                      <label htmlFor="">CVC*</label>
                      <input type="text"  placeholder='000' className='outline outline-1 outline-zinc-400 mt-1 w-full h-8 px-2 rounded-sm' onChange={ handleChange } name='cardCvc'/>
                    </div>
                  </div>
                </div>
                <div className='price-container font-sans mt-6'>
                  <div className='flex justify-between p-3'>
                    <h1 className='font-medium'>Subtotal</h1>
                    <h1 className='font-semibold text-lg'>${Math.round(subTotal)}</h1>
                  </div>
                  <div className='flex justify-between p-3'>
                    <h1 className='font-medium'>Discount(25%)</h1>
                    <h1 className='font-semibold text-lg'>${Math.round(Discount)}</h1>
                  </div>
                  <div className='flex justify-between p-3'>
                    <h1 className='font-medium'>Tax(5%)</h1>
                    <h1 className='font-semibold text-lg'>${Math.round(Tax)}</h1>
                  </div>
                  <div className='flex justify-between p-3'>
                    <h1 className='font-medium'>Shipping fee</h1>
                    <h1 className='font-semibold text-lg'>${Math.round(DeliveryFee)}</h1>
                  </div>
                  <div className='flex justify-between p-3 mt-3 border-t border-zinc-300'>
                    <h1 className='text-xl font-medium'>Total Price</h1>
                    <h1 className='text-xl font-semibold'>${Math.round(Total)}</h1>
                  </div>
                  <div className='flex items-center justify-center my-4'>
                    <button type='submit' className='bg-purple-600 w-full py-2 rounded-full text-lg text-white font-medium'>Pay ${Math.round(Total)}</button>
                  </div>
                  
                </div>
              </form>
            </div>
            
          </div>
        </div>
    </>
  );
}

export default Checkout;
                                                                  

// cardCvc
// cardExpiry
// cardHolderName
// cardNumber
// email
// paymentMode

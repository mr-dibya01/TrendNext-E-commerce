import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddressFrom() {
  let [fromData,setFromData]=useState({ name:"" ,contact:"" ,pincode:"" ,streetName:"" ,address:"" ,district:"" ,state:"" ,landmark:"" ,addressType:"" });
  let [editFrom,setEditFrom]=useState(false);
  let [savedAddress,setSavedAddress]=useState({});
  let [btnShow,setBtnShow]=useState(true);
  let token = localStorage.getItem("token");
  let headers={headers: {authorization: `Bearer ${token}`}}
  let Navigate=useNavigate();

  // console.log("editFrom",editFrom);
  // console.log("fromData",fromData);
  // console.log("savedAddress",savedAddress);

  useEffect(() => {
    async function fetchAddress(){
      try {
        let res= await axios.get("http://localhost:5000/trendnext/user/address",headers);
        console.log(res);
        console.log(res.data.address.length);
        if(res.data.address.length !== 0) {
          setSavedAddress(res.data.address[0]);
          setFromData(res.data.address[0]);
          setEditFrom(true);
          setBtnShow(false);
        } else {
          setBtnShow(true);
          setEditFrom(false);
        }
      } catch(err) {
        let msg=err.response?.data?.error || "Something went wrong";
        if(msg == "Invalid token"){
          localStorage.setItem("nextRedirectUrl","/trendnext/checkout");
          Navigate("/trendnext/login");
        }
        toast.error(`${msg} Please again Relogin`,{
          position: "bottom-right" ,
          autoClose: 3000 ,
          theme: "colored",
        })
      }
    }
    fetchAddress();
  },[]);
  
  function handleChange(e){
    setFromData((prevData) =>({
      ...prevData ,[e.target.name]: e.target.value
    }))
  }

  async function handleSaveAddress(e){
    e.preventDefault();
    if(!fromData.address || !fromData.addressType || !fromData.contact || !fromData.district || !fromData.landmark || !fromData.name || !fromData.pincode || !fromData.state || !fromData.streetName) {
      toast.error("Please fill the all fields",{
        position: "bottom-right" ,
        autoClose: 3000,
        theme: "colored"
      });
      return;
    }
    console.log(fromData);
    try {
      let res=await axios.post("http://localhost:5000/trendnext/user/address",fromData,headers);
      console.log(res);
      setSavedAddress(fromData);
      setEditFrom(true);
      setBtnShow(false);
      // alert(res.data.msg);
      toast.success(res.data.msg || "Your address added Successfully",{
        position: "bottom-right" ,
        autoClose: 3000,
        theme: "colored"
      });
    } catch (err) {
      console.log(err);
      // alert("Something went wrong");
      toast.error(err?.response?.data?.error || "Something went wrong" ,{
        position: "bottom-right" ,
        theme: "colored",
        autoClose: 3000
      });
    }
  }

  async function handleUpdateAddress(e){
    e.preventDefault()
    if(!fromData.address || !fromData.addressType || !fromData.contact || !fromData.district || !fromData.landmark || !fromData.name || !fromData.pincode || !fromData.state || !fromData.streetName) {
      toast.error("Please fill the all fields",{
        position: "bottom-right" ,
        autoClose: 3000,
        theme: "colored"
      });    
      return;
    }
    console.log(fromData);
    try {
      let res=await axios.put("http://localhost:5000/trendnext/user/address",fromData,headers);
      console.log(res);
      setSavedAddress(fromData);
      setEditFrom(true);
      setBtnShow(false);
      toast.success(res.data.msg,{
        position: "bottom-right" ,
        theme: "colored",
        autoClose: 3000
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Something went wrong" ,{
        position: "bottom-right" ,
        theme: "colored",
        autoClose: 3000
      });
      // alert("Something went wrong");
    }
  }

  function handleEditFrom(){
    setEditFrom(false);
  }
  return (
    <div className='h-full w-full p-8 border border-zinc-400 shadow-lg rounded-md'>
      <div className='flex justify-between mb-10 items-center'>
        <h1 className='text-4xl font-semibold uppercase'>Delivery Information</h1>
        {editFrom ?<button className='text-zinc-700 text-right bg-zinc-200 px-2 py-0.5 rounded-md' onClick={ handleEditFrom }>Edit</button> : ""}
      </div>
      
      {editFrom ?
        (
          <div className='px-2'>
            <h1 className='text-lg text-zinc-900 mb-1 capitalize'>name : {savedAddress.name}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>address : {savedAddress.address}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>Contact : {savedAddress.contact}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>district : {savedAddress.district}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>landmark : {savedAddress.landmark}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>pincode : {savedAddress.pincode}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>state : {savedAddress.state}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>{savedAddress.streetName}</h1>
            <h1 className='text-lg text-zinc-500 mb-1 capitalize'>addressType : {savedAddress.addressType}</h1>
          </div>
        ) : (
              <form>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="name"  className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>name :</label>
                  <input name='name' id='name' type="text" className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your Full Name...' onChange={ handleChange } value={fromData.name}/>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="address" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>Address :</label>
                  <textarea name="address" id="address" rows="5" cols={5} className='border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your Full Address...' onChange={ handleChange } value={fromData.address}></textarea>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="streetName" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>streetName :</label>
                  <input type="text" name='streetName' id='streetName' className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your Street / Colony Name...' onChange={ handleChange } value={fromData.streetName}/>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="pincode" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>pincode :</label>
                  <input type="text" name='pincode' id='pincode' className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your Pincode (6 Digit Code)...' onChange={ handleChange } value={fromData.pincode}/>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="state" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>state :</label>
                  <input type="text" name='state' id='state' className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your State Name...' onChange={ handleChange } value={fromData.state}/>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="district" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>Disrict :</label>
                  <input type="text" id='district' name='district' className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your Disrict Name...' onChange={ handleChange } value={fromData.district}/>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="landmark" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>Landmark :</label>
                  <input type="text" id='landmark' name='landmark' className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your nearest famous place / template / Big...' onChange={ handleChange } value={fromData.landmark}/>
                </div>
                <div className='flex items-center gap-1 mb-7 px-1'>
                  <label htmlFor="telephone" className='text-lg font-medium font-sans capitalize  w-[20%] text-zinc-500 hover:cursor-pointer whitespace-nowrap'>Telephone : </label>
                  <input type="tel" maxLength={10} pattern="[0-9]{10}" name='contact' id='telephone' className=' border-zinc-300 w-full h-8 rounded border-2 px-2 outline-none' placeholder='Enter your Mobile Number...' onChange={ handleChange } value={fromData.contact}/>
                </div>
                <div>
                  <label htmlFor="" className='text-lg font-medium font-sans capitalize text-zinc-500'>Address Type:</label>
                  <div className='flex gap-8 px-1 mt-4'>
                    <div className='flex items-center gap-1'>
                      <input type="radio" name='addressType' value={"home"} id='Home' onChange={ handleChange }/>
                      <label htmlFor="Home" className='font-sans font-medium hover:cursor-pointer'>Home (Delivery any time)</label>
                    </div>
                    <div className='flex items-center gap-1'>
                      <input type="radio" name='addressType' value={"Office"} id='Office' onChange={ handleChange }/>
                      <label htmlFor="Office" className='font-sans font-medium hover:cursor-pointer'>Office (Delivery between 10AM - 4PM)</label>
                    </div>
                  </div>
                </div>
                {btnShow ? <button onClick={ handleSaveAddress } className='bg-blue-600 text-white px-4 py-1 mt-8 rounded'>Save & Delivery Here</button> : <button onClick={ handleUpdateAddress } className='bg-black text-white px-4 py-1 mt-8 rounded'>Update & Delivery Here</button>}
    
              </form>
            )
      }
    </div>
  )
}

export default AddressFrom
// name:String,
// contact: Number,
// pincode: Number,
// strretName: String,
// Address: String,
// District: String,
// State: String,
// Landmark: String,
// AddressType: String,
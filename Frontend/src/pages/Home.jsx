import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroBaner from '../components/HeroBaner'
import Category from '../components/Category'
import ProductTab from "./ProductTab.jsx"
import axios from "axios"
import { toast } from 'react-toastify'

function Home() {
  let [productData ,setProductData]=useState([]);
  let [loading,setLoading]=useState(false);
  async function fetchData(){
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/trendnext/products`);
      console.log(res);
      setProductData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

  async function handleCat(cat){
    console.log(cat);
    if(cat === "All Items"){
      return fetchData();
    }
    try{
      let result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/trendnext/products/category/${cat}`);
      console.log(result);
      setProductData(result.data.categoryWiseProducts);
    } catch (err) {
      toast.error(err.response.data.error,{
        theme: "colored",
        position: "top-center",
        autoClose: 3000
      })
    }
    
  }

  async function handleSearch(searchQuery){
    try {
      if(searchQuery.trim()){
        let res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/trendnext/products/search?query=${searchQuery}`);
        setProductData(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Something Went Wrong!" ,{
        position: "bottom-right",
        theme: "colored",
        autoClose: 3000,
      })
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className='w-full h-full'>
      { loading ? <p>Loading.....</p>  : 
      <>
        <Navbar handleSearch={ handleSearch }/>
        <Category handleCat={ handleCat }/>
        <HeroBaner />
        <ProductTab productData={productData}/>
      </>
      }
    </div>
  )
}

export default Home

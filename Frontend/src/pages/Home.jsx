import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroBaner from '../components/HeroBaner'
import Category from '../components/Category'
import ProductTab from "./ProductTab.jsx"
import axios from "axios"

function Home() {
    let [productData ,setProductData]=useState([]);
    let [loading,setLoading]=useState(false);
    async function fetchData(){
      try{
        let res = await axios.get("http://localhost:5000/trendnext");
        setProductData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };

    useEffect(() => {
        fetchData();
    },[]);
  return (
    <div className='w-full h-full'>
      { loading ? <p>Loading.....</p>  : 
      <>
        <Navbar />
        <Category />
        <HeroBaner />
        <ProductTab productData={productData}/>
      </>
      }
    </div>
  )
}

export default Home

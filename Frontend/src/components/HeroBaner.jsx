import React, { useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import assets from '../assets/productAssets/pictures'


function HeroBaner() {
const [currentSlide,setCurrentSlide]=useState(0);

const HeroBaners=[
  [ assets.hero_img15,assets.hero_img16],
  [assets.hero_img13,assets.hero_img14],
  [assets.hero_img5,assets.hero_img6],
  [assets.hero_img7,assets.hero_img8],
  [assets.hero_img9,assets.hero_img10],
  [assets.hero_img11,assets.hero_img12],
  [assets.hero_img3,assets.hero_img4]
];
console.log(currentSlide);

useEffect(()=>{
  const interval=setInterval(()=>{
    setCurrentSlide((prev)=>(prev+1) % HeroBaners.length)
  },4000)
  return () => clearInterval(interval);
},[HeroBaners.length]);
const handleScroll_left=() => {
  setCurrentSlide((prev)=>(prev - 1) % HeroBaners.length);
};
const handleScroll_right=()=>{
  setCurrentSlide((prev)=>(prev + 1) % HeroBaners.length);
}
  return (
    <div className='w-full h-[50%]  flex  overflow-hidden relative '>
        <button className=' absolute w-[2.2vw] h-[10vh] z-10  flex justify-center items-center left-2 top-[40%] -translate-y-[50%] rounded-md hover:bg-zinc-200 transition' onClick={handleScroll_left}><FaChevronLeft className='size-10'/></button>
        <button className=' absolute w-[2.2vw] h-[10vh] z-10  flex justify-center items-center top-[41%] right-2 -translate-y-[50%] rounded-md text-black hover:bg-zinc-200 transition' onClick={handleScroll_right}><FaChevronRight className='size-10'/></button>
        {HeroBaners.map((pair,idx) =>{
            return <div key={idx} className='h-full w-[100%] flex items-center justify-center shrink-0 transition-transform tim ease-in-out duration-1000' style={{ transform: `translateX(-${currentSlide * 100}%)` }} >
              {pair.map((slide,index)=>
                <img key={index} className='h-[100%] w-[50%] object-cover shrink-0 ' src={slide} alt="" />
              )}
            </div>
        })}
    </div>
  )
}

export default HeroBaner
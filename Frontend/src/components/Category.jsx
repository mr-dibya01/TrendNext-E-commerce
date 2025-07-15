import React, { useState } from 'react';
import { MdCategory } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import { IoShirtSharp, IoMan, IoWoman } from "react-icons/io5";
import { GiPirateCoat } from "react-icons/gi";
import { PiPants } from "react-icons/pi";
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Category() {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const Navigate=useNavigate();
  const categories = [
    { icon: <MdCategory className="size-6" />, label: "Categories", type: "toggle" },
    { icon: <FaFire className="size-6 text-orange-600" />, label: "Trending" },
    { icon: <GiClothes className="size-6 text-blue-600" />, label: "Fashion" },
    { icon: <IoShirtSharp className="size-6 text-red-700" />, label: "T-Shirts" },
    { icon: <IoMan className="size-6 text-yellow-800" />, label: "Men's" },
    { icon: <PiPants className="size-6 text-purple-600" />, label: "Pants" },
    { icon: <IoWoman className="size-6 text-cyan-400" />, label: "Women's" },
    { icon: <GiPirateCoat className="size-6 text-rose-800" />, label: "Suits" },
  ];

  function handleCat(cat){
    axios.get(`http://localhost:5000/trendnext/category/${cat}`);
  }

  const allCategories = [
    "Men's",
    "Women's",
    "Electronics",
    "Jewelry",
    "T-Shirts",
    "Shoes",
    "Beauty Products",
    "Watches",
    "Glasses",
    "Winter Wear",
    "Pants",
    "Shirts",
    "Suits",
    "Accessories"
  ];

  return (
    <div className="relative">
      <div className="w-full px-2 py-2 bg-white shadow-sm z-10 relative">
        <div className="flex justify-around overflow-x-auto scrollbar-hide">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => cat.type === 'toggle' && setShowAllCategories(!showAllCategories)}
              className="flex items-center gap-2 px-3 py-1 shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition whitespace-nowrap"
            >
              {cat.icon}
              <h1 className="text-sm md:text-base">{cat.label}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* Dropdown List */}
      {showAllCategories && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-t border-gray-300 shadow-lg z-20 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {allCategories.map((cat, index) => (
            <div key={index} className="text-sm font-medium cursor-pointer hover:text-purple-600 transition" onClick={() =>{ handleCat(cat) }}>
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;





// import React from 'react'
// import { MdCategory } from "react-icons/md";
// import { GiClothes } from "react-icons/gi";
// import { FaFire } from "react-icons/fa";
// import { IoShirtSharp, IoMan, IoWoman } from "react-icons/io5";
// import { GiPirateCoat } from "react-icons/gi";
// import { PiPants } from "react-icons/pi";

// function Category() {
//   const categories = [
//     { icon: <MdCategory className="size-6" />, label: "Categories" },
//     { icon: <FaFire className="size-6 text-orange-600" />, label: "Trending" },
//     { icon: <GiClothes className="size-6 text-blue-600" />, label: "Fashion" },
//     { icon: <IoShirtSharp className="size-6 text-red-700" />, label: "T-Shirts" },
//     { icon: <IoMan className="size-6 text-yellow-800" />, label: "Men's" },
//     { icon: <PiPants className="size-6 text-purple-600" />, label: "Pants" },
//     { icon: <IoWoman className="size-6 text-cyan-400" />, label: "Women's" },
//     { icon: <GiPirateCoat className="size-6 text-rose-800" />, label: "Suits" },
//   ];

//   return (
//     <div className="w-full px-2 py-2 bg-white shadow-sm">
//       <div className="flex justify-around overflow-x-auto scrollbar-hide">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-2 px-3 py-1 shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition whitespace-nowrap"
//           >
//             {cat.icon}
//             <h1 className="text-sm md:text-base">{cat.label}</h1>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Category;
import React from 'react'
import { MdCategory } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import { IoShirtSharp, IoMan, IoWoman } from "react-icons/io5";
import { GiPirateCoat } from "react-icons/gi";
import { PiPants } from "react-icons/pi";

function Category() {
  const categories = [
    { icon: <MdCategory className="size-6" />, label: "Categories" },
    { icon: <FaFire className="size-6 text-orange-600" />, label: "Trending" },
    { icon: <GiClothes className="size-6 text-blue-600" />, label: "Fashion" },
    { icon: <IoShirtSharp className="size-6 text-red-700" />, label: "T-Shirts" },
    { icon: <IoMan className="size-6 text-yellow-800" />, label: "Men's" },
    { icon: <PiPants className="size-6 text-purple-600" />, label: "Pants" },
    { icon: <IoWoman className="size-6 text-cyan-400" />, label: "Women's" },
    { icon: <GiPirateCoat className="size-6 text-rose-800" />, label: "Suits" },
  ];

  return (
    <div className="w-full px-2 py-2 bg-white shadow-sm">
      <div className="flex justify-around overflow-x-auto scrollbar-hide">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition whitespace-nowrap"
          >
            {cat.icon}
            <h1 className="text-sm md:text-base">{cat.label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
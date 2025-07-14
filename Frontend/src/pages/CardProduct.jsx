// src/components/CardProduct.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardProduct({ image, title, price, category, isBestseller, id, discount }) {
  const Navigate = useNavigate();

  function handleCard(id) {
    Navigate(`/trendnext/${id}`);
  }

  function handleAddToCart(id) {
    alert("Please select the size");
  }

  return (
    <div className='w-full h-[440px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 bg-white'>
      <div className='h-[70%] p-2 cursor-pointer' onClick={() => handleCard(id)}>
        <img
          className='h-full w-full object-cover rounded-t-xl hover:scale-105 transition-transform duration-300 object-top'
          src={image[0].url}
          alt={title}
        />
      </div>
      <div className='h-[30%] flex flex-col px-2 gap-1'>
        <div className='flex justify-between items-center py-1'>
          <h1 className='text-xs text-gray-500 capitalize'>{category}</h1>
          {isBestseller && (
            <span className='text-sm text-orange-600 font-semibold bg-orange-100 px-2 py-0.5 rounded-full'>
              🔥BestSeller
            </span>
          )}
        </div>
        <h1 className='font-semibold text-base capitalize leading-none'>
          {title.length > 25 ? title.slice(0, 22) + '...' : title}
        </h1>
        <div className='flex items-center gap-x-5'>
          <h2 className='text-lg font-bold text-green-700'>${price}</h2>
          <h1 className='text-lg font-bold text-black line-through decoration-red-600'>
            {discount.toString().length > 10
              ? `$${discount.toString().slice(0, 5)}..`
              : `$${discount}`}
          </h1>
        </div>
        <button
          className='w-full px-2 py-1 bg-black text-white rounded-lg hover:opacity-80 transition'
          onClick={() => handleAddToCart(id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
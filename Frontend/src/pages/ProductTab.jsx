import React from 'react';
import CardProduct from './CardProduct';

function ProductTab({ productData }) {
  return (    
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 py-5 bg-zinc-200'>
      {productData.map((product) => (
        <CardProduct
          key={product._id}
          id={product._id}
          image={product.image}
          title={product.title}
          price={product.price}
          category={product.category}
          isBestseller={product.bestseller}
          discount={product.discount}
        />
      ))}
    </div>
  );
}

export default ProductTab;
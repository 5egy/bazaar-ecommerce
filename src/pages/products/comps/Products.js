import React from "react";
import Prod from "./Items";

const Products = ({ products, category }) => {
  return (
    <div className="py-20 lg:py-32">
      <div className="w-full flex justify-between">
      

        {/* <div className='w-1/2 bg-green-500 text-center'>
          <p className='text-green bg-blue-500 text-center text-xl flex justify-between items-center md:w-1/3 mx-auto p-2'>Sort by <FaArrowDown/></p>
        </div> */}
      </div>

      {products !== undefined ? (
         <> <h1 className="w-full text-center text-2xl [#6a2d72]">
          {category[0].toUpperCase() + category.slice(1) || ""}
        </h1>
        <div className="grid grid-cols-topProd md:grid-cols-bigProd gap-3 mt-7 lg:mt-12">
       {products.map((product) => {
         return <Prod product={product} key={product.id} />;
       })}
     </div></>
      ) : (
        <p>...</p>
      )}
    </div>
  );
};

export default Products;

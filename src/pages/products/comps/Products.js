import React from "react";
import Prod from "./Items";
import {SlArrowDown} from "react-icons/sl"

const Products = ({ products, category }) => {

  return (
    <div className="py-20 lg:py-32 px-2">
   
        <div className="w-full flex justify-center md:justify-end opacity-30">
        
          <p className=" text-[#6a2d72] cursor-not-allowed text-center text-sm flex justify-between items-center md:w-32 mx-2 rounded-xl border border-[#6a2d72] p-2">
            Sort by <SlArrowDown />
          </p>

          <p className="text-[#6a2d72] cursor-not-allowed  text-center text-sm flex justify-between items-center md:w-32 mx-2 rounded-xl border border-[#6a2d72] p-2">
            Filter <SlArrowDown />
          </p>
        </div>

      {products !== undefined ? (
        <>
          {" "}
          <h1 className="w-full text-center text-2xl text-[#6a2d72]">
            {category[0].toUpperCase() + category.slice(1) || ""}
          </h1>
          <p className="text-sm text-[#6a2d72] text-center mt-2 ">{products.length} Products</p>
          <div className="grid grid-cols-topProd md:grid-cols-bigProd gap-3 mt-7 lg:mt-12">
            {products.map((product) => {
              return <Prod product={product} key={product.id} />;
            })}
          </div>
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  );
};

export default Products;

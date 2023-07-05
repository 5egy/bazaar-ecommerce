import React from "react";

import { client } from "../../lib/client";
import ImageUrlBuilder from "@sanity/image-url";

const Item = ({ item, incr, decr, remove}) => {
  const builder = ImageUrlBuilder(client);
  
  return (
    <div className="bg-blur-500 text-sm bg-[#fddaff] w-full shadow-md shadow-[#6a2d72] text-[#6a2d72] mx-auto my-4 flex items-center  justify-between p-2">
      <img
        src={builder.image(item.mainImage).url()}
        alt={item.name}
        placeholder="blur"
        className="w-1/5 sm:w-16  block h-16 border-2 border-[#6a2d72]"
      />

      <div className="flex flex-col justify-between w-2/5  mx-2">
        <p className="text-[#e83cff] mb-2">{item.name}</p>
        <p>${item.price}</p>
      </div>

      <p className="w-1/5  mx-3 text-center">{item.color}</p>

      <div className="flex items-center w-1/5">
        <p className="text-lg flex flex-col justify-evenly p-2 sm:ml-3 -mr-2 w-8">
          <span
            className="rotate-90 w-full -mb-2 text-center  cursor-pointer"
            onClick={() => incr(item)}
          >
            &#x276E;
          </span>
          <span
            className="-ml-[8%] text-center my-auto cursor-pointer -mt-2 -rotate-90 w-full "
            onClick={() => decr(item)}
          >
            &#x276E;
          </span>
        </p>
        <p className="border-2 border-[#6a2d72] text-[#6a2d72] p-2 text-xs text-center mx-3">
          {item.quantity}
        </p>
      </div>

      <p className="w-1/5 text-center text-xs underine cursor-pointer text-red-500" onClick={()=>remove(item)}>Remove</p>
    </div>
  );
};

export default Item;

import React from "react";
import Link from "next/link";
import { client } from "../../lib/client";
import ImageUrlBuilder from "@sanity/image-url";
import Image from "next/image"

const HotProduct = ({ right, product, head }) => {
  const builder = ImageUrlBuilder(client);
  
  return (
    <div
      className={`flex justify-center flex-col py-5 shadow-md shadow-[#6a2d72] ${
        right ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
        <Image
        width={500}
        height={500}
        blurDataURL={builder.image(product.mainImage).url()}
        src={builder.image(product.mainImage).url()}
        className="w-full h-auto"
        alt="iphone14"
      />
      <div className="flex flex-col justify-center items-center p-2">
        <h1 className="text-3xl md:text-5xl text-center text-[#6a2d72] my-3">
         {head}
        </h1>
        <h4 className="text-lg text-[#6a2d72]">{product.name}</h4>
        <p className="text-sm text-[#6a2d72] mt-5 text-center">
         {product.details}
        </p>

        <Link
          href={`/product/${product.slug.current}`}
          className="bg-gradient-to-r shadow-md text-center hover:shadow-[#6a2d72]  duration-500 from-[#6a2d72] to-[#e83cff] text-white mt-5 w-4/5 mx-auto p-3 rounded-md"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default HotProduct;

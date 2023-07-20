import React from "react";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/client";
import Link from "next/link";
import Image from "next/image";

const Box = ({ products }) => {
  const builder = ImageUrlBuilder(client);
  return (
    <div className="pt-4 px-2">
      <h1 className="text-[#6a2d72] text-center text-xl md:text-2xl">
        Top Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-5 mt-8">
        {products !== undefined && products.slice(0, 4).map((prod) => {
          return (
            <Content
              name={prod.name}
              details={prod.summary}
              image={prod.mainImage}
              slug={prod.slug.current}
              key={prod.slug.current}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Box;

function Content({ name, details, image, slug }) {
  const builder = ImageUrlBuilder(client);

  return (
    <div className="relative w-full h-full min-h-[300px] shadow-md shadow-[#6a2d72]">
      <div className="absolute top-0 left-0 w-full h-full flex items-center flex-col justify-center">
        <div className="flex justify-between  w-full p-3">
          <Link
            href={`/product/${slug}`}
            className="block p-2 w-32 text-center text-base rounded-md border-2 border-[#6a2d72] text-white hover:bg-[#6a2d72] bg-[#6a2d72] hover:border-[#6a2d72] duration-500"
          >
            Learn More
          </Link>
          <Link
            href={`/product/${slug}`}
            className="block p-2 w-32 text-center text-base rounded-md border-2 border-[#6a2d72] text-white hover:bg-[#6a2d72] bg-[#6a2d72] hover:border-[#6a2d72] duration-500"
          >
            Buy
          </Link>
        </div>

        <div className="bg-[#fbd3fdaf]">
          <h1 className="mt-12 text-center text-[#6a2d72] text-2xl md:text-3xl">
            {name}
          </h1>
          <p className="mt-5 text-base text-center text-[#6a2d72] ">
            {details}
          </p>
        </div>
      </div>
      <Image
        width={500}
        height={500}
        blurDataURL={builder.image(image).url()}
        src={builder.image(image).url()}
        placeholder="blur"
        alt="iphone-14"
        className="w-full h-auto max-h-[500px] rounded-md hover:opacity-70 duration-500"
      />
    </div>
  );
}

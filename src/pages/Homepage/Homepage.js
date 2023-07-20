import React from "react";
import Link from "next/link";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/client";
import Image from "next/image";

const Homepage = ({ product }) => {
  const builder = ImageUrlBuilder(client);

  return (
    <header className="h-[100vh] px-2 mt-24 lg:min-h-[500px] text-[#6a2d72] min-h-[300px] flex justify-center items-center flex-col md:flex-row pb-0 shadow-lg shadow-[#6a2d72]">
      {
        product !== undefined ? <>
          <div className="w-full md:w-2/5 text-center h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-6xl hot-deal font-black">
              Hottest Deal 🔥{" "}
            </h1>
            <p className="text-xl mt-6">{product.details}</p>
            <Link
              href={`/product/${product.slug.current}`}
              className="bg-gradient-to-r shadow-md hover:shadow-[#6a2d72]  duration-500 from-[#6a2d72] to-[#e83cff] text-white mt-5 w-4/5 mx-auto p-3 rounded-md"
            >
              Buy Now
            </Link>
          </div>

          <Image
            src={builder.image(product.mainImage).url()}
            width={500}
            height={500}
            blurDataURL={builder.image(product.mainImage).url()}
            alt="Iphone xs max"
            placeholder="blur"
            className="w-full md:w-3/5 h-full"
          />
        </> : <p>...</p>
      }
    </header>
  );
};

export default Homepage;

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaHeart } from "react-icons/fa";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/client";
import Link from "next/link";
import Rating from "../others/Rating";

const Items = ({ heading, products }) => {
  return (
    <div className="w-full text-center shadow-md shadow-[#6a2d72] py-5">
      <h2 className="text-xl md:text-2xl text-[#6a2d72]">{heading}</h2>

      <Swiper
        className="w-full mt-12 min-w-[300px]"
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 10 },
          440: { slidesPerView: 2.3, spaceBetween: 10 },
          720: { slidesPerView: 3.5, spaceBetween: 30 },
          1025: { slidesPerView: 4.2, spaceBetween: 5 },
        }}
      >
        {products !== undefined && products.map((prod) => {
          return (
            <SwiperSlide key={prod.id}>
              <SlideItem
                name={prod.name}
                rate={prod.rating}
                price={prod.price}
                image={prod.mainImage}
                slug={prod.slug.current}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Items;

function SlideItem({ name, price, image, slug, rate }) {
  const builder = ImageUrlBuilder(client);

  return (
    <div
      key={name}
      className="w-3/5 min-w-[200px] md:w-56 lg:w-60 h-full min-h-[250px]  border-2 flex flex-col justify-between border-[#6a2d72] rounded-md"
    >
      <Link href={`/product/${slug}`}>
        <div className="p-2 text-[#6a2d72]">
          <h3 className="text-sm">
            {name}
            {/* .length > 10 ? (name.slice(0, 7) + "...") : name */}
          </h3>
          <p className="flex justify-between mt-2 text-xs">
            <span>${price}</span> <FaHeart />
          </p>
        </div>

        <div>
          <Image
            width={500}
            height={500}
            blurDataURL={builder.image(image).url()}
            src={builder.image(image).url()}
            placeholder="blur"
            alt="iphone-14"
            className="w-full h-auto mx-auto"
          />

          <Rating rate={rate} />

          <button className="w-full p-2 mt-0 bg-[#6a2d72] text-white">
            Buy
          </button>
        </div>
      </Link>
    </div>
  );
}

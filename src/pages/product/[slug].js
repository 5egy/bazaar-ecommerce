"use client";
import React, {useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import { client } from "../../lib/client";
import ImageUrlBuilder from "@sanity/image-url";
import NavBar from "../Nav/NavBar";
import { useStateContext } from "../../../context/StateContext";
import Rating from "../others/Rating";

const View = ({ product }) => {
  const builder = ImageUrlBuilder(client);
  const { addToCart } = useStateContext();
  const [mainImage, setMainImage] = useState(0)
  return (
    <div
      className={`flex justify-center flex-col py-5 shadow-md shadow-[#6a2d72] sm:flex-row mt-24`}
    >
      <NavBar />
      <div className=" sm:w-1/2">
        <h1 className="text-[#6a2d72] text-xl sm:text-3xl text-center md:text-left ">
          {product.name}
        </h1>
        <div className="mt-6 rounded-md border-2 border-[#6a2d72]">
          <div className="relative">
            <div className="absolute top-0 left-0 w-12 h-full flex flex-col justify-center gap-2 ">
              {product.galleryImages.map((item, index) => {
                return (
                  <img
                    src={builder.image(item).url()}
                    placeholder="blur"
                    alt={product.name + "image"}
                    className={`w-full h-auto border-4 rounded-md ${index === mainImage ? "border-[#e83cff] translate-x-2" : "border-[#6a2d72]"} cursor-pointer hover:translate-x-2 hover:border-[#e83cff] duration-500`}
                    key={item._key}
                    onMouseEnter={()=>setMainImage(index)}
                  />
                );
              })}
            </div>
            <img
              src={builder.image(product.galleryImages[mainImage]).url()}
              placeholder="blur"
              alt={product.name + "image"}
              className="w-full h-auto border-2 rounded-md border-[#6a2d72]"
            />
          </div>
          <button
            onClick={() => {
              const { name, mainImage, slug, price, _id, color } = product;
              addToCart({
                name,
                mainImage,
                slug: slug.current,
                price,
                color,
                id: _id,
                quantity: 1,
              });
              // setData([...cart])
            }}
            className="bg-gradient-to-r shadow-md hover:shadow-[#6a2d72]  duration-500 from-[#6a2d72] to-[#e83cff] text-white  w-full  p-2"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div className="sm:w-1/2 flex flex-col justify-evenly items-center p-2 text-[#6a2d72] sm:px-12 ">
        <div className="flex justify-center w-full items-center">
          <div>
            <p className="text-2xl text-center my-3">$ {product.price}</p>
            <Rating rate={product.rating} />
          </div>
        </div>

        <p className="text-sm text-[#6a2d72] text-center md:mt-0 mt-6">
          {product.details}
        </p>

        <div className="w-full lg:w-1/2 mx-auto p-5 bg-[#e83cff] rounded-md text-white mt-8 lg:-mt-8">
          <h3 className="text-base text-[#6a2d72]">Item details:</h3>

          <p className="text-sm mt-3">
            In Stock <FaCheck className="inline-block ml-4 text-[#F9F59C]" />
          </p>

          <ul className="text-sm mt-8 list-style">
            <li>
              <p className="mt-1">
                {" "}
                <FaCircle className="inline-block w-1 h-1 mr-2" /> Delivery
                within 1 business week
              </p>
            </li>
            <li>
              <p className="mt-1">
                {" "}
                <FaCircle className="inline-block w-1 h-1 mr-2" /> 1 Year
                Warranty
              </p>
            </li>
            <li>
              <p className="mt-1">
                {" "}
                <FaCircle className="inline-block w-1 h-1 mr-2" /> Loyalty
                Points guaranteed
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = "*[_type == 'products'] {slug { current }}";
  const products = await client.fetch(query);

  const paths = products.map((prod) => ({
    params: {
      slug: prod.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "products" && slug.current == "${slug}"][0]`;
  //{name,slug, price, quantity, discount, details, "id": _id, "mainImage": mainImage.asset -> url}
  const product = await client.fetch(query);
  const productsQuery = `*[_type == "products"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default View;

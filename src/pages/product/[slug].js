"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import { client } from "../../lib/client";
import ImageUrlBuilder from "@sanity/image-url";
import NavBar from "../Nav/NavBar";
import { useStateContext } from "../../../context/StateContext";
import Rating from "../others/Rating";
import Image from "next/image";
import Swipe from "../List/Swipe";

const View = ({ product, products }) => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    if (products && products[0] !== similar[0]) {
      const newProd = products.filter((item) => {
        return item.category === product.category && item.id !== product._id;
      });
      setSimilar(newProd);
    }
  }, [products, product]);

  const builder = ImageUrlBuilder(client);
  const { addToCart } = useStateContext();
  const [mainImage, setMainImage] = useState(0);
  return (
    <div>
      <div
        className={`flex justify-center flex-col py-5 shadow-md shadow-[#6a2d72] sm:flex-row mt-24`}
      >
        <NavBar />
        <div className=" sm:w-1/2">
          <h1 className="text-[#6a2d72] text-xl sm:text-3xl text-center ">
            {product.name}
          </h1>
          <div className="mt-6 rounded-md text-center ">
            <div className="relative">
              <Image
                width={350}
                height={300}
                blurDataURL={builder
                  .image(product.galleryImages[mainImage])
                  .url()}
                src={builder.image(product.galleryImages[mainImage]).url()}
                placeholder="blur"
                alt={product.name + "image"}
                className="w-1/2 block mx-auto  mt-2 h-auto rounded-md shadow-md shadow-[#6a2d72]"
              />
              <div className=" h-full flex flex-wrap justify-center gap-2 my-4">
                {product.galleryImages.map((item, index) => {
                  return (
                    <Image
                      width={50}
                      height={50}
                      blurDataURL={builder.image(item).url()}
                      src={builder.image(item).url()}
                      placeholder="blur"
                      alt={product.name + "image"}
                      className={`h-auto border-2 rounded-md ${
                        index === mainImage
                          ? "border-[#e83cff]"
                          : "border-[#6a2d72]"
                      } cursor-pointer hover:border-[#e83cff] duration-500`}
                      key={item._key}
                      onMouseEnter={() => setMainImage(index)}
                    />
                  );
                })}
              </div>
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
              className="bg-gradient-to-r shadow-md rounded-lg hover:shadow-[#6a2d72]  duration-500 from-[#6a2d72] to-[#e83cff] text-white  w-1/2 mx-auto  p-2"
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

      <Swipe heading={"Similar Products"} products={similar.slice(0, 9)} />
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
  const product = await client.fetch(query);
  const productsQuery = `*[_type == "products"]{name,slug, price, quantity, rating, discount, details, "id": _id, "mainImage": mainImage.asset -> url, category}`;
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default View;

import React from "react";
import { client } from "../../lib/client";
import { useRouter } from "next/router";
import Products from "./comps/Products";
import NavBar from "../Nav/NavBar";

const index = ({products, cat}) => {
const router = useRouter()
  return <div>
    <NavBar/>
  <Products products={products} category={cat}/>
  </div>;
};

export const getServerSideProps = async ({ params: { category } }) => {
  const query =
  `*[_type == "products" && category == "${category}"]{name,slug, price,rating, quantity, discount, details, "id": _id, "mainImage": mainImage.asset -> url, category}`;
  //{name,slug, price, quantity, discount, details, "id": _id, "mainImage": mainImage.asset -> url}
  const products = await client.fetch(query);

  return {
    props: { products, cat: category },
  };
};

export default index
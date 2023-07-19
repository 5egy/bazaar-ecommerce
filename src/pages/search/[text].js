import React, { useEffect, useState } from "react";
import { client } from "../../lib/client";
import Products from "../products/comps/Products";
import NotFound from "../products/comps/NotFound";

import NavBar from "../Nav/NavBar";

const Index = ({ products, cat }) => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const prod = products.filter((item) => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(cat.toLowerCase());
    });
console.log("HHH")
    setNewProducts([...prod]);
  },[cat, products]);


  return (
    <div>
      <NavBar />
     {newProducts.length > 0 ? <Products products={newProducts} category={cat} /> :<NotFound/>}
    </div>
  );
};

export const getServerSideProps = async ({ params: { text } }) => {
  const query = `*[_type == "products"]{name,slug, price,rating, quantity, discount, details, "id": _id, "mainImage": mainImage.asset -> url, category}`;
  //{name,slug, price, quantity, discount, details, "id": _id, "mainImage": mainImage.asset -> url}
  const products = await client.fetch(query);

  return {
    props: { products, cat: text || "" },
  };
};

export default Index;

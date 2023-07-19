import Homepage from "./Homepage/Homepage";
import Swipe from "./List/Swipe";
import Box from "./List/Box";
import HotProduct from "./List/HotProduct";
import Footer from "./Footer/Footer";
import NavBar from "./Nav/NavBar";

import { client} from "../lib/client";

export default function Home({
  latest,
  hottest,
  topProducts,
  samsung,
  phone,
  accessory,
  apple,
  products
}) {


  return (
    <main className="">
      <NavBar products={products} />
      <Homepage product={hottest[0]} />
      <Swipe heading={"Newest Arrivals"} products={latest} />
      <Box products={topProducts} />
      <Swipe heading={"Samsung World"} products={samsung} />
      <HotProduct product={phone[0]} head="Hottest Smartphone" />
      <Swipe heading={"Apple World"} products={apple} />
      <HotProduct right={true} product={accessory[0]} head="Hottest Product" />
      <Footer />
    </main>
  );
}

export const getServerSideProps = async () => {
  const query =
    '*[_type == "products"]{name,slug, price, quantity, rating, discount, details, "id": _id, "mainImage": mainImage.asset -> url, category}';
  const products = await client.fetch(query);

  

  const latestQuery =
    '*[_type == "latest"]{name,slug,rating, price, "id": _id, "mainImage": mainImage.asset -> url}';
  const latest = await client.fetch(latestQuery);

  const hottestQuery =
    '*[_type == "hottest"]{name,slug, details,rating, "id": _id, "mainImage": mainImage.asset -> url}';
  const hottest = await client.fetch(hottestQuery);

  const topQuery =
    '*[_type == "top_products"]{name,slug, summary, "id": _id, "mainImage": mainImage.asset -> url}';
  const topProducts = await client.fetch(topQuery);

  const samsungQuery =
    '*[_type == "samsung"]{name,slug,rating, price, "id": _id, "mainImage": mainImage.asset -> url}';
  const samsung = await client.fetch(samsungQuery);

  const appleQuery =
    '*[_type == "apple"]{name,slug,rating, price, "id": _id, "mainImage": mainImage.asset -> url}';
  const apple = await client.fetch(appleQuery);

  const phoneQuery =
    '*[_type == "phone"]{name,slug, details, "id": _id, "mainImage": mainImage.asset -> url}';
  const phone = await client.fetch(phoneQuery);

  const accessoryQuery =
    '*[_type == "accessory"]{name,slug, details, "id": _id, "mainImage": mainImage.asset -> url}';
  const accessory = await client.fetch(accessoryQuery);

  return {
    props: {
      products,
      latest,
      hottest,
      topProducts,
      samsung,
      phone,
      accessory,
      apple,
    },
  };
};

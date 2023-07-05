import { FaHeart } from "react-icons/fa";
import { client } from "../../../lib/client";
import ImageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Rating from "../../others/Rating";
import Image from "next/image";

const Prod = ({ product }) => {
  const builder = ImageUrlBuilder(client);

  return (
    <div className="w-full h-full min-h-[300px]  border-2 border-[#6a2d72] rounded-md flex flex-col justify-between items-start">
    {
    product !== undefined ?  <>
        <div className="p-2 text-[#6a2d72] w-full">
       <Link href={`/product/${product.slug.current}`}>
        <h3 className="text-base">{product.name}</h3>
        <p className="flex justify-between mt-2 text-sm">
          <span>{product.price}</span> <FaHeart className="cursor-pointer" />
        </p>
        </Link>
      </div>
      

      <div>
      <Link href={`/product/${product.slug.current}`}>
      <Image
            width={500}
            height={500}
            blurDataURL={builder.image(product.mainImage).url()}
            src={builder.image(product.mainImage).url()}
            placeholder="blur"
            alt={product.name + "product-image"}
            className="w-full md:w-3/5  h-auto rounded-md min-h-[160px] inline-block mx-auto mt-2 cursor-pointer hover:opacity-70 duration-500"
          />
     

      <Rating rate={product.rating}/>
        <button className="w-full p-2 mt-0 bg-[#6a2d72] text-white">View</button>
        </Link>
      </div></> : <p>...</p>
    }
    </div>
  );
};
export default Prod;

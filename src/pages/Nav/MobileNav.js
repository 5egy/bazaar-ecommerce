import React from "react";
import Link from "next/link";
import Search from "./Search"

const MobileNav = ({products}) => {
  return (
    <ul className="bg-white fixed top-11 left-0 w-3/5 h-full py-8 px-4">
      <Search products={products}/>
      <Link
        href={"/products/laptops"}
        className="cursor-pointer py-4 w-full block text-sm hover:text-[#e83cff] duration-300"
      >
        laptops{" "}
      </Link>
      <Link
        href={"/products/phones"}
        className="cursor-pointer py-4 w-full block text-sm hover:text-[#e83cff] duration-300"
      >
        phones{" "}
      </Link>
      <Link
        href={"/products/accessories"}
        className="cursor-pointer py-4 w-full block text-sm hover:text-[#e83cff] duration-300"
      >
        accessories{" "}
      </Link>
      <Link
        href={"/products/gaming"}
        className="cursor-pointer py-4 w-full block text-sm hover:text-[#e83cff] duration-300"
      >
        gaming{" "}
      </Link>
      <Link
        href={"/products/others"}
        className="cursor-pointer py-4 w-full block text-sm hover:text-[#e83cff] duration-300"
      >
        others{" "}
      </Link>
    </ul>
  );
};

export default MobileNav;

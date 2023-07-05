import React, {  useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ImCart } from "react-icons/im";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { useStateContext } from "../../../context/StateContext";


const NavBar = () => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const {totalQty} = useStateContext()


  return (
    <nav className="bg-white shadow-md shadow-[#6a2d72] text-[#6a2d72] fixed top-0 left-0 w-full z-[90000] p-2">
      <div className=" flex justify-between lg:hidden relative">
        {" "}
        <p
          onClick={() => setOpenMenu(!openMenu)}
          className="text-xl cursor-pointer"
        >
          {!openMenu ? <FaBars /> : <FaTimes />}
        </p>
        <p><Link href={"/"}>BAZAAR </Link></p>
        <p className="cursor-pointer text-xl">
          <Link href={"/cart"} className="hover:text-[#e83cff] duration-300 relative">
            <ImCart />
            <span className="bg-red-500 rounded-full text-center text-xs absolute -top-2 -left-3 w-5 block">{totalQty}</span>
          </Link>
        </p>
        {openMenu && <MobileNav children={["laptops", "phones", "accessories", "gaming", "others"]} />}
      </div>

      <div className=" lg:flex justify-between hidden">
        <h1 className="w-2/5"><Link href={"/"}>BAZAAR</Link></h1>

        <div className="w-full flex justify-evenly">
          <Link href={"/products/laptops"} className="cursor-pointer block text-sm hover:text-[#e83cff] duration-300">laptops </Link>
          <Link href={"/products/phones"} className="cursor-pointer block text-sm hover:text-[#e83cff] duration-300">phones </Link>
          <Link href={"/products/accessories"} className="cursor-pointer block text-sm hover:text-[#e83cff] duration-300">accessories </Link>
          <Link href={"/products/gaming"} className="cursor-pointer block text-sm hover:text-[#e83cff] duration-300">gaming </Link>
          <Link href={"/products/others"} className="cursor-pointer block text-sm hover:text-[#e83cff] duration-300">others </Link>
          <p>
          <Link href={"/cart"} className="hover:text-[#e83cff] duration-300 relative">
            <ImCart />
            <span className="bg-red-500 rounded-full text-center text-xs absolute -top-2 -left-3 w-5 block">{totalQty}</span>
          </Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

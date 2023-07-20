import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ products }) => {
  const [searchText, setSearchText] = useState([]);
  const router = useRouter();

  return (
    <div className="flex flex-row flex-wrap sm:flex-nowrap justify-between items-center border text-[#e83cff] border-[#e83cff]  rounded-md  px-2 py-1">
      <input
        type="text"
        placeholder="search"
        className="inline-block w-full mr-1 bg-transparent outline-none  text-[#6a2d72]"
        onKeyDown={(e) => {
          const href = `/search/${searchText}`;
          if (e.key === "Enter") {
            router.push(href);
          }
        }}

        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <Link href={`/search/${searchText}`}>
        <BsSearch className="cursor-pointer" />
      </Link>
    </div>
  );
};

export default Search;

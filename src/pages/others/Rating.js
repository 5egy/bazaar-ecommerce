import React from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ rate }) => {
  return (
    <p className="text-[#fddaff] flex justify-center mb-[7px]">
      <FaStar className={`${rate >= 1 ? "text-[#6a2d72]" : ""}`} />
      <FaStar className={`${rate >= 2 ? "text-[#6a2d72]" : ""}`} />
      <FaStar className={`${rate >= 3 ? "text-[#6a2d72]" : ""}`} />
      <FaStar className={`${rate >= 4 ? "text-[#6a2d72]" : ""}`} />
      <FaStar className={`${rate >= 5 ? "text-[#6a2d72]" : ""}`} />
    </p>
  );
};

export default Rating;

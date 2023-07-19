import React, { useEffect } from 'react'
import {BsBagCheckFill} from "react-icons/bs"


import Link from 'next/link'

const Success = () => {
  useEffect(()=>{
    window.localStorage.clear()
  })
  
  return (
    <div className='w-full m-auto pt-40 lg:w-3/5'>

      <BsBagCheckFill className='w-40 text-green-600 text-6xl block m-auto'/>
      <p className='text-3xl text-center text-[#6a2d72] mt-6'>Your Order Has Been Placed Successfully</p>
      <p className='text-base text-center mt-2'>Check your mail for receipt</p>
      <Link href={"/"} className="bg-gradient-to-r shadow-md hover:shadow-[#6a2d72]  duration-500 from-[#6a2d72] to-[#e83cff] text-white mt-5 block text-center w-3/5 text-sm m-auto p-3 rounded-md">Go back to Homepage</Link>
    </div>
  )
}

export default Success
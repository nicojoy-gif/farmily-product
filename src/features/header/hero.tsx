import Image from 'next/image'
import React from 'react'
import { FaSearch } from 'react-icons/fa'


export  function Hero() {
  return (
    <div className='flex  flex-col space-y-3 justify-center items-center '>
        <div className='flex justify-center items-center '>
<Image src='/assets/hero.svg' alt='hero' width={300} height={300}/>
        </div>
        <div className="relative shadow-lg bg-secondary rounded-lg w-full">
      <input
        type="text"
        placeholder="Search products in Farmily"
        className="w-full  px-4 bg-secondary rounded-lg py-3 placeholder:text-[#6B7F73] placeholder:text-sm  focus:outline-none focus:ring focus:ring-red-200"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <FaSearch  />
      </div>
    </div>
    </div>
  )
}

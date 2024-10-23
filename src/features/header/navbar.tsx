// components/Navbar.tsx
"use client";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaBox, FaBars } from "react-icons/fa";
import { HiMenu, HiSearch } from "react-icons/hi"; // Using HiMenu for a thinner hamburger icon

export const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <nav className="bg-white my-6 shadow-[0_1px_40px_0px_#0AD24F12] px-4 py-2">
      <div className="flex max-w-6xl mx-auto items-center justify-between">
        <div className="flex items-center">
          <button className="hamburger-icon">
            <FaBars size={17} />
          </button>
        </div>

        <div className="flex space-x-6 items-center">
          <div className="flex items-center">
            <img src="/assets/logo.svg" alt="Logo" className="h-8" />
          </div>

          <div className="relative">
            <button onClick={toggleSearch} className="ml-4">
              <HiSearch />
            </button>
            {searchVisible && (
              <input
                type="text"
                placeholder="Search..."
                className="absolute mt-12 right-0 p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>

          <button className="ml-4">
            <FaBox />
          </button>

          <div className="relative ml-4">
            <div className="flex items-center justify-center w-7 h-7 bg-primary border border-white rounded-full">
              <span className="text-white text-xs font-bold">N</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

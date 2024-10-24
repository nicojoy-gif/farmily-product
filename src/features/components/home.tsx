'use client'
import React, { useState } from "react";
import { Hero, Navbar } from "../header";
import { Footer } from "../footer";
import CategoryPage from "../category/categorieSection";

export function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <div className="relative h-52">
        <Navbar />
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <Hero onSearch={handleSearch} />
        </div>
      </div>
      <CategoryPage searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}

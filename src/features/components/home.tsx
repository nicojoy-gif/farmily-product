import React from "react";
import { Hero, Navbar } from "../header";
import { Footer } from "../footer";
import CategoryPage from "../category/categorieSection";
export function Home() {
  return (
    <div>
      <div className="relative h-52">
        <Navbar />

        <div className="absolute top-12 left-1/2 transform  -translate-x-1/2 ">
          <Hero />
        </div>
      </div>
      <CategoryPage />
      <Footer />
    </div>
  );
}

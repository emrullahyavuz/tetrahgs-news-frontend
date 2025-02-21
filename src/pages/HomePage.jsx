import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Products from "../components/Products";

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Hero />
      <Products />
    </div>
  );
};

export default HomePage;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx"; // Import Footer
import Categories from "../components/Categories";
import Hero from "../components/Hero.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Newsletter from "../components/Newsletter.jsx";
const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HomePage;

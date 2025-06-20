import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx' // Import Footer
import Categories from '../components/Categories'
import Hero from '../components/Hero.jsx'
const HomePage = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Hero/>
    <Categories/>

    </>
  )
}

export default HomePage
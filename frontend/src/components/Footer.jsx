// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">YourStore</h3>
          <p className="text-gray-400 text-sm">
            Discover a world of quality products. Shop with confidence and enjoy
            the best online shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300 text-sm">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-300 text-sm">Contact Us</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300 text-sm">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white transition duration-300 text-sm">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            {/* Replace with actual social media icons/links */}
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
          </div>
          <p className="text-gray-400 text-sm">Email: info@yourstore.com</p>
          <p className="text-gray-400 text-sm">Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} YourStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
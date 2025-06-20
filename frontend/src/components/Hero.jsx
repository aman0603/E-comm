import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-16 pb-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              New Collection Available
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover
              <span className="block text-green-300">Premium</span>
              Products
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Elevate your lifestyle with our curated collection of premium products. 
              Quality, style, and innovation in every piece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-green-300 transition-all duration-300 flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Video
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/70">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-white/70">Premium Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-sm text-white/70">Customer Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Product Card */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white/30 rounded-2xl h-64 mb-6 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">🎧</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Headphones</h3>
                <p className="text-white/70 mb-4">Wireless • Noise Canceling</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-300">$299</span>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-green-300 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 transform -rotate-12">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-lg">⌚</span>
                </div>
                <div className="text-sm font-medium text-white">Smart Watch</div>
                <div className="text-xs text-white/70">$199</div>
              </div>
              
              <div className="absolute -bottom-6 -left-4 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 transform rotate-12">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-500 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-lg">📱</span>
                </div>
                <div className="text-sm font-medium text-white">Smartphone</div>
                <div className="text-xs text-white/70">$899</div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
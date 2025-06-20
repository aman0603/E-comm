import React from 'react';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest tech gadgets",
      icon: "📱",
      itemCount: 245,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing & accessories",
      icon: "👕",
      itemCount: 189,
      gradient: "from-pink-400 to-rose-600",
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Beautiful home essentials",
      icon: "🏠",
      itemCount: 156,
      gradient: "from-green-400 to-emerald-600",
    },
    {
      id: 4,
      name: "Sports",
      description: "Athletic gear & equipment",
      icon: "⚽",
      itemCount: 128,
      gradient: "from-orange-400 to-red-600",
    },
    {
      id: 5,
      name: "Beauty",
      description: "Skincare & cosmetics",
      icon: "💄",
      itemCount: 203,
      gradient: "from-purple-400 to-pink-600",
    },
    {
      id: 6,
      name: "Books",
      description: "Knowledge & entertainment",
      icon: "📚",
      itemCount: 312,
      gradient: "from-indigo-400 to-blue-600",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4">
            🛍️ Shop by Category
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Collections
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully curated categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/70 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">{category.itemCount} items</span>
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-green-300 group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Featured Category Banner */}
        <div className="mt-16 bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/30 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            New Arrivals This Week
          </h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Discover the latest additions to our collection with exclusive early bird discounts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-green-300 transition-colors">
              Shop New Arrivals
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
import React from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      category: "Audio",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 124,
      image: "🎧",
      colors: ["bg-blue-500", "bg-gray-800", "bg-white"],
      isNew: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      category: "Wearables",
      price: 299,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "⌚",
      colors: ["bg-black", "bg-blue-600", "bg-rose-500"],
      isNew: false,
    },
    {
      id: 3,
      name: "Premium Backpack",
      category: "Accessories",
      price: 129,
      originalPrice: 159,
      rating: 4.7,
      reviews: 156,
      image: "🎒",
      colors: ["bg-gray-900", "bg-blue-800", "bg-green-700"],
      isNew: false,
    },
    {
      id: 4,
      name: "Wireless Charger",
      category: "Tech",
      price: 79,
      originalPrice: null,
      rating: 4.6,
      reviews: 203,
      image: "🔋",
      colors: ["bg-white", "bg-gray-800"],
      isNew: true,
    },
    {
      id: 5,
      name: "Premium Sunglasses",
      category: "Fashion",
      price: 189,
      originalPrice: 219,
      rating: 4.8,
      reviews: 97,
      image: "🕶️",
      colors: ["bg-gray-900", "bg-blue-900", "bg-green-800"],
      isNew: false,
    },
    {
      id: 6,
      name: "Smart Speaker",
      category: "Audio",
      price: 149,
      originalPrice: null,
      rating: 4.7,
      reviews: 178,
      image: "🔊",
      colors: ["bg-gray-700", "bg-white", "bg-blue-600"],
      isNew: true,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4">
            ⭐ Featured Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trending Products
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover our most popular and highly-rated products loved by thousands of customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative mb-6">
                <div className="bg-white/20 rounded-2xl h-48 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <span className="text-6xl">{product.image}</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      SALE
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-300 font-medium">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-white">{product.rating}</span>
                    <span className="text-sm text-white/60">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                  {product.name}
                </h3>

                {/* Color Options */}
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-6 h-6 rounded-full border-2 border-white/30 ${color} hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-white/60 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-green-400 hover:bg-green-300 text-gray-900 p-3 rounded-full transition-colors group">
                    <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/30">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
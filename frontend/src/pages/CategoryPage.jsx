import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';

const categoryInfo = {
  electronics: {
    name: 'Electronics',
    icon: '📱',
    description: 'Latest tech gadgets and devices',
  },
  fashion: {
    name: 'Fashion',
    icon: '👕',
    description: 'Trendy clothing and accessories',
  },
  'home-garden': {
    name: 'Home & Garden',
    icon: '🏠',
    description: 'Beautiful home essentials',
  },
  sports: {
    name: 'Sports',
    icon: '⚽',
    description: 'Athletic gear and equipment',
  },
  beauty: {
    name: 'Beauty',
    icon: '💄',
    description: 'Skincare and cosmetics',
  },
  books: {
    name: 'Books',
    icon: '📚',
    description: 'Knowledge and entertainment',
  },
};

const CategoryPage = () => {
  const { name } = useParams();
  const normalizedCategory = category?.toLowerCase().replace(/\s+/g, '-');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchProductsByCategory } = useProductStore();
  const { addToCart } = useCartStore();

  const currentCategory = categoryInfo[normalizedCategory] || {
    name: name,
    icon: '🛍️',
    description: 'Discover amazing products',
  };

  useEffect(() => {
    document.title = `${currentCategory.name} - LuxeShop`;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetched = await fetchProductsByCategory(normalizedCategory);
        setProducts(fetched);
      } catch (err) {
        console.error("Failed to load products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [normalizedCategory, fetchProductsByCategory, currentCategory.name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-300 mx-auto mb-4"></div>
          <p className="text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-300/10 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-green-300">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>

        {/* Category Info */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{currentCategory.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {currentCategory.name}
          </h1>
          <p className="text-xl text-white/80">{currentCategory.description}</p>
          <p className="mt-4 text-sm bg-green-400/20 text-green-300 px-4 py-1 inline-block rounded-full">
            {products.length} products found
          </p>
        </div>

        {/* No Products */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-white mb-4">No products found</h2>
              <p className="text-white/70 mb-6">
                We couldn’t find any products in this category yet.
              </p>
              <Link
                to="/"
                className="bg-green-400 hover:bg-green-300 text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
              >
                Browse All Products
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="relative mb-6">
                  <div className="bg-white/20 rounded-2xl h-48 flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  {/* Feature Tag */}
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </span>
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-300 font-medium capitalize">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white">4.8</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price & Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-400 hover:bg-green-300 text-gray-900 p-3 rounded-full"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

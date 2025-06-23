import React, { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { toast } from "react-hot-toast";

const ProductsTab = () => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const CATEGORY_OPTIONS = {
    electronics: { label: "Electronics", icon: "📱" },
    fashion: { label: "Fashion", icon: "👕" },
    "home-garden": { label: "Home & Garden", icon: "🏡" },
    sports: { label: "Sports", icon: "⚽" },
    beauty: { label: "Beauty", icon: "💄" },
    books: { label: "Books", icon: "📚" },
  };
  const { products, createProduct, deleteProduct, toggleFeaturedProduct } =
    useProductStore();

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("image", newProduct.image);
      await createProduct(formData);
      console.log("Product created successfully", newProduct);
      setShowCreateProduct(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Products Management</h2>
        <button
          onClick={() => setShowCreateProduct(true)}
          className="bg-green-400 hover:bg-green-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Modal */}
      {showCreateProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Create New Product
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white h-20"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
                required
              />
              <div className="relative">
                <label className="text-sm text-white block mb-2">
                  Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="block appearance-none w-full bg-gray-800/60 border border-white/30 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                  required
                >
                  <option value="">Select Category</option>
                  {Object.entries(CATEGORY_OPTIONS).map(
                    ([value, { label, icon }]) => (
                      <option key={value} value={value}>
                        {icon} {label}
                      </option>
                    )
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm text-white block mb-2">
                  Upload Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewProduct({ ...newProduct, image: reader.result }); // Base64 string
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white file:text-white/70 file:bg-green-400 file:border-0 file:mr-4"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-400 hover:bg-green-300 text-gray-900 py-2 rounded-lg"
                >
                  Create Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateProduct(false)}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <div className="aspect-square bg-white/20 rounded-lg mb-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white truncate">
                  {product.name}
                </h3>
                {product.isFeatured && (
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                )}
              </div>
              <p className="text-white/70 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-300 font-bold">
                  ${product.price}
                </span>
                <span className="text-white/60 text-sm capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {product.isFeatured ? "Unfeature" : "Feature"}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;

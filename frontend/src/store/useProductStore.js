import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  loading: false,
  
  setProducts: (products) => set({ products }),
    createProduct: async (productData) => {
      set({ loading: true });
      try {
        const response = await axios.post('/products', productData);
        set((state) => ({
          products: [...state.products, response.data],
          loading: false,
        }));
        toast.success('Product created successfully');
      } catch (error) {
        set({ loading: false });
        toast.error(error.response?.data?.message || 'Failed to create product');
      }
    },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/products');
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      return response.data.products;
    } catch (error) {
      toast.error('Failed to fetch products by category');
      return [];
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  },

  
    toggleFeaturedProduct: async (productId) => {
      set({ loading: true });
      try {
        const response = await axios.patch(`/products/${productId}`);
        set((state) => ({
          products: state.products.map((product) =>
            product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
          ),
        }));
        toast.success('Product updated successfully');
      } catch (error) {
        toast.error('Failed to update product');
      }
    },
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/products/featured');
      set({ featuredProducts: response.data });
    } catch (error) {
      toast.error('Failed to fetch featured products');
    }
  },


}));
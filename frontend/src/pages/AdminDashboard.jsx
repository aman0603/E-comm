import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Star,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';
import OverviewTab from '../components/OverviewTab';
import ProductsTab from '../components/ProductsTab';
import OrdersTab from '../components/OrdersTab';
 
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const { products, fetchAllProducts, deleteProduct, toggleFeaturedProduct, createProduct } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
    fetchAnalytics();
  }, [fetchAllProducts]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('image', newProduct.image);

      await createProduct(formData);
      setShowCreateProduct(false);
      setNewProduct({ name: '', description: '', price: '', category: '', image: '' });
      toast.success('Product created successfully');
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-300 mx-auto mb-4"></div>
          <p className="text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage your e-commerce store</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-400 text-gray-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab analytics={analytics} />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const CartPage = () => {
  const {
    cart,
    loading,
    total,
    subtotal,
    coupon,
    getCartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getMyCoupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponCode, setCouponCode] = React.useState('');

  useEffect(() => {
    getCartItems();
    getMyCoupon();
  }, [getCartItems, getMyCoupon]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-300 mx-auto mb-4"></div>
          <p className="text-xl">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to right, #1f4037, #99f2c8)",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/70 hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-8 w-8 text-green-300" />
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <span className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-sm">
            {cart.length} items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
              <ShoppingBag className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
              <p className="text-white/70 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/"
                className="bg-green-400 hover:bg-green-300 text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
              >
                Start Shopping
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-green-300 font-medium">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-400 hover:text-red-300 p-2 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-xl font-medium transition-colors border border-red-500/30"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-fit">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-6">
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {coupon && (
                  <div className="bg-green-400/20 border border-green-300/30 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-green-300 text-sm">
                      {coupon.code} - {coupon.discountPercentage}% off
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-300 hover:text-green-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-green-300">
                    <span>Discount ({coupon.discountPercentage}%)</span>
                    <span>-${(subtotal * (coupon.discountPercentage / 100)).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-400 hover:bg-green-300 text-gray-900 py-3 rounded-xl font-semibold transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
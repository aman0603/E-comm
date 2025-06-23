import React from 'react'
import { ShoppingCart } from 'lucide-react'
const OrdersTab = () => {
  return (
    <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Orders Management</h2>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <ShoppingCart className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Orders Management</h3>
              <p className="text-white/70">
                Order management functionality will be implemented when order processing is set up.
              </p>
            </div>
          </div>
  )
}

export default OrdersTab
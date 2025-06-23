import React from 'react'
import { Users, Package, DollarSign, ShoppingCart } from 'lucide-react';

const OverviewTab = ({ analytics }) => {
  const stats = [
    { label: 'Total Users', value: analytics?.analyticsData?.users || 0, icon: <Users className="h-8 w-8 text-green-300" /> },
    { label: 'Total Products', value: analytics?.analyticsData?.products || 0, icon: <Package className="h-8 w-8 text-blue-300" /> },
    { label: 'Total Sales', value: `$${analytics?.analyticsData?.totalSales?.toFixed(2) || '0.00'}`, icon: <DollarSign className="h-8 w-8 text-yellow-300" /> },
    { label: 'Total Orders', value: analytics?.analyticsData?.totalOrders || 0, icon: <ShoppingCart className="h-8 w-8 text-purple-300" /> },
  ];

  const maxSales = Math.max(...analytics?.dailySalesData?.map(d => d.sales) || [1]);

    
  return (
    <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">{analytics.analyticsData?.users || 0}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-300" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-white">{analytics.analyticsData?.products || 0}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-300" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Sales</p>
                    <p className="text-2xl font-bold text-white">${analytics.analyticsData?.totalSales?.toFixed(2) || '0.00'}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-300" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white">{analytics.analyticsData?.totalOrders || 0}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-300" />
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Daily Sales (Last 7 Days)</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {analytics.dailySalesData?.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-green-400 rounded-t w-full min-h-[20px] transition-all duration-300 hover:bg-green-300"
                      style={{
                        height: `${Math.max((day.sales / Math.max(...analytics.dailySalesData.map((d) => d.sales))) * 200, 20)}px`
                      }}
                    ></div>
                    <p className="text-xs text-white/70 mt-2">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-xs text-white font-medium">${day.sales.toFixed(0)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
  )
}

export default OverviewTab
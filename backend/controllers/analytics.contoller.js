import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
export const getAnalyticsData = async (req, res) => {
  try {
    // Example data, replace with actual database queries
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData=await Order.aggregate([
        {
            $group:{
                _id:null,//it group all the documents together
                totalSales:{$sum:1},//it will count the total number of orders
                totalRevenue:{$sum:"$totalAmount"}//it will sum the total amount of all orders
            }
        }
    ]);

    const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0};
    
    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    }
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date ascending
      },
    ]);

    const dateArray = getDateRange(startDate, endDate);
    // console.log("Date Array:", dateArray);

    return dateArray.map(date => {  
      const foundData = dailySalesData.find(item => item._id === date);
      return {
        date,
        sales: foundData?.sales || 0, // Use optional chaining to handle undefined
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching daily sales data:", error);
    throw new Error("Failed to fetch daily sales data");
  }
};


function getDateRange(startDate, endDate) {
    const dates=[];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export function getLastNDays(days) {
    if (days <= 0) {
        throw new Error("Number of days must be greater than 0");
    }
    // Calculate the start and end dates for the last N days
}
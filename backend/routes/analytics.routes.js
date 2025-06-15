import express from "express"; 
const router = express.Router();
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.contoller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
// Route to get analytics data
router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData(req, res);
    
    const endDate=new Date();
    const startDate=new Date(endDate.getTime()-7*24*60*60*1000); // 7 days ago

    const dailySalesData=await getDailySalesData(startDate, endDate);
    res.status(200).json({
      analyticsData,
      dailySalesData
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error.message);
    res.status(500).json({ message: "Failed to fetch analytics data",error: error.message });
  }
});



export default router;
// This route is protected and can only be accessed by admin users
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoute from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import cors from "cors";




const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5137", // Allow frontend
    credentials: true, // if you're using cookies or headers
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/coupons',couponRoutes);
app.use('/api/payments',paymentRoute);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});

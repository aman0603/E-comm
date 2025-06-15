import Razorpay from "razorpay";
import crypto from "crypto";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    for (const product of products) {
      const amount = Math.round(product.price);
      totalAmount += amount * (product.quantity || 1);
    }

    let discount = 0;
    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });

      if (coupon) {
        discount = Math.round((totalAmount * coupon.discountPercentage) / 100);
        totalAmount = Math.max(totalAmount - discount, 1);
      }
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // in paisa
      currency: "INR",
      receipt: "rcpt_" + Math.random().toString(36).slice(2, 10),
      payment_capture: 1,
      notes: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(products.map(p => ({
          id: p._id,
          quantity: p.quantity,
          price: p.price,
        }))),
      },
    });

    if (totalAmount >= 200) {
      await createNewCoupon(req.user._id);
    }

    res.status(200).json({
      id: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
    });
  } catch (error) {
    console.error("Error initiating Razorpay session:", error);
    res.status(500).json({ error: "Checkout session failed", message: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const order = await razorpay.orders.fetch(razorpay_order_id);
    const { notes } = order;

    const products = JSON.parse(notes.products);
    const userId = notes.userId;
    const couponCode = notes.couponCode;

    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode, userId },
        { isActive: false }
      );
    }

    const totalAmount = order.amount / 100;

    const newOrder = new Order({
      user: userId,
      products: products.map(p => ({
        product: p.id,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Checkout success error:", error);
    res.status(500).json({ error: "Checkout verification failed", message: error.message });
  }
};

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
}

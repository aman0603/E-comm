import Coupon from "../models/coupon.model.js";
export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.json(coupon || null);
  } catch (error) {
    console.log("Error in getCoupon controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      res.status(404).json({ message: "Invalid coupon code" });
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      res.status(404).json({ message: "Coupon expired" });
    }
    res.json({
        message: "Coupon valid",
        discountPercentage: coupon.discountPercentage,
        code:coupon.code
    })
  } catch (error) {
    console.log("Error in validateCoupon controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

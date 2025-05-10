import mongoose, { modelNames } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    discountPercentage: {
      type: Number,
      required: [true, "Discount is required"],
      min:0,
      max:100
    },
    expirationDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    isActive:{
      type:Boolean,
      default:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    }
  },
  { timestamps: true }
);

const Coupon =mongoose.model("Coupon",couponSchema);
export default Coupon;
export const validateCoupon = (coupon) => {
  if (!coupon.code || !coupon.discountPercentage || !coupon.expirationDate) {
    return false;
  } else {
    return true;
  }
};

import express from "express";

const router=express.Router();

import {protectRoute} from '../middleware/auth.middleware.js';
import {getCoupon,validateCoupon} from '../controllers/coupon.controller.js';

router.get("/",protectRoute,getCoupon);
router.get('/',protectRoute,validateCoupon);

export default router;
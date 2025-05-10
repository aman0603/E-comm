import express from "express";

const router=express.Router();
import {protectRoute} from '../middleware/auth.middleware.js';
import {createPaymentIntent} from '../controllers/payment.controller.js';

export default router;
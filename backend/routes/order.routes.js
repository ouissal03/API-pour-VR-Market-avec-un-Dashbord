import express from "express";

import { getAllOrders, getOrderById, placeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/', placeOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);

export default router;

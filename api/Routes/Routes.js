import express from "express";
import { registerUser, loginUser } from "../Controllers/userController.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
} from "../Controllers/orderController.js";
import { protect } from "../Middlewears/authMiddlewear.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/orders", protect, createOrder);
router.get("/orders", protect, getOrders);
router.get("/orders/:id", protect, getOrderById);
router.get("/admin/orders", protect, getAllOrders);
router.put("/admin/update-status", protect, updateOrderStatus);
router.get("/track/:trackingNumber", trackOrder);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;

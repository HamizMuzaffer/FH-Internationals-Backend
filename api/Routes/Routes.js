import express from "express";
import { registerUser, loginUser } from "../Controllers/userController.js";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
} from "../Controllers/orderController.js";
import {
  submitticket,
  getalltickets,
  replytoticket,
  deleteticket,
} from "../Controllers/ticketController.js";
import { protect } from "../Middlewears/authMiddlewear.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/orders", protect, createOrder);
router.get("/admin/orders",getAllOrders);
router.put("/admin/update-status", protect, updateOrderStatus);
router.get("/track/:trackingNumber", trackOrder);
router.post("/ticket", submitticket);
router.get("/admin/tickets", getalltickets);
router.post("/admin/tickets/reply", replytoticket);
router.delete("/admin/tickets/:ticketId", deleteticket);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;

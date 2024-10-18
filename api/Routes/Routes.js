const express = require("express");
const { registerUser, loginUser } = require("../Controllers/userController");
const {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
} = require("../Controllers/orderController");
const { protect } = require("../Middlewears/authMiddlewear");

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

module.exports = router;

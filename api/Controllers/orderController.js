import Order from "../Models/ordermodel.js";

const generateTrackingNumber = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `FH${randomDigits}`;
};

export const createOrder = async (req, res) => {
  const {
    shipperName,
    shipperAddress,
    shipperEmail,
    shipperPhone,
    shipperNTN,
    consigneeName,
    consigneeAddress,
    consigneePhone,
    consigneeEmail,
    parcelWeight,
    parcelDetails,
  } = req.body;

  try {
    if (
      !shipperName ||
      !shipperAddress ||
      !shipperEmail ||
      !shipperPhone ||
      !consigneeName ||
      !consigneeAddress ||
      !consigneePhone ||
      !parcelWeight ||
      !parcelDetails
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trackingNumber = generateTrackingNumber();

    const order = new Order({
      userId: req.user._id,
      shipperName,
      shipperAddress,
      shipperEmail,
      shipperPhone,
      shipperNTN,
      consigneeName,
      consigneeAddress,
      consigneePhone,
      consigneeEmail,
      parcelWeight,
      parcelDetails,
      trackingNumber,
      status: "Pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  if (req.user.username !== "admin") {
    return res.status(403).json({ message: "Access denied, not admin" });
  }

  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { trackingNumber, status } = req.body;

  try {
    const order = await Order.findOne({ trackingNumber });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const trackOrder = async (req, res) => {
  const { trackingNumber } = req.params;

  try {
    const order = await Order.findOne({ trackingNumber });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ status: order.status, orderDetails: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

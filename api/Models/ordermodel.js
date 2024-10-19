import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shipperName: {
    type: String,
    required: true,
  },
  shipperAddress: {
    type: String,
    required: true,
  },
  shipperEmail: {
    type: String,
    required: true,
  },
  shipperPhone: {
    type: String,
    required: true,
  },
  shipperNTN: {
    type: String,
    required: true,
  },
  consigneeName: {
    type: String,
    required: true,
  },
  consigneeAddress: {
    type: String,
    required: true,
  },
  consigneePhone: {
    type: String,
    required: true,
  },
  consigneeEmail: {
    type: String,
    required: false,
  },
  parcelWeight: {
    type: Number,
    required: true,
  },
  parcelDetails: {
    type: String,
    required: true,
  },

  trackingNumber: {
    type: String,
    unique: true,
  },

  status: {
    type: String,
    default: "Pending",
  },
});

export default mongoose.model("Order", orderSchema);

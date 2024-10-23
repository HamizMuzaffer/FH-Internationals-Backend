import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  ticketNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  reply: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["New", "Replied"],
    default: "New",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;

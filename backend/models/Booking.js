const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);

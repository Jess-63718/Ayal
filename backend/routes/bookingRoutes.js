const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const nodemailer = require("nodemailer"); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourquizscore@gmail.com", // ✅ Your Email
    pass: "abme otcu emzj dael", // ✅ Your App Password (NOT your Gmail password)
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Service Booking" <your-email@gmail.com>',
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};

// Create a booking request
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { workerId, service } = req.body;

    const resident = await User.findById(req.user.id);
    const worker = await User.findById(workerId);


    console.log(req.user.id)
    const booking = new Booking({ resident: req.user.id, worker: workerId, service });
    await booking.save();

    const subject = "New Booking Request!";
    const text = `Hello ${worker.name},\n\nYou have received a new booking request for the service: "${service}" from ${resident.name}.\n\nPlease check your dashboard for details.\n\nBest,\nThe Team`;
    sendEmail(worker.email, subject, text);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/workers", async (req, res) => {
  try {
    const { role } = req.query;
    const users = role ? await User.find({ role }) : await User.find().populate("service");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get all bookings for a worker
router.get("/worker", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ worker: req.user.id }).populate("resident", "name");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


// Get all bookings for a worker
router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ resident: req.user.id }).populate("worker", "name");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Accept/Reject Booking
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("resident worker", "name email");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = req.body.status; // "Accepted" or "Rejected"
    await booking.save();

    const subject = `Your Booking Has Been ${booking.status}`;
    const text = `Hello ${booking.resident.name},\n\nYour booking request for "${booking.service}" has been ${booking.status.toLowerCase()} by ${booking.worker.name}.\n\nBest,\nThe Team`;
    sendEmail(booking.resident.email, subject, text);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;

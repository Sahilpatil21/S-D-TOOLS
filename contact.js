const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  phone: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// GET Contact page
router.get("/", (req, res) => {
  res.render("Contact", { user: null, success: null, error: null });
});

// POST Contact form
router.post("/", async (req, res) => {
  const { name, email, company, phone, message } = req.body;

  // Always pass success and error variables
  let success = null;
  let error = null;

  try {
    await Contact.create({ name, email, company, phone, message });
    success = "Message sent successfully!";
  } catch (err) {
    console.error("Error saving contact:", err);
    error = "Failed to send message.";
  }

  res.render("Contact", { user: null, success, error });
});

module.exports = router;

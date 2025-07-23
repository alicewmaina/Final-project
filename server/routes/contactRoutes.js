// server/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    return res.status(200).json({ message: "Message received and saved!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;

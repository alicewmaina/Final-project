const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // or your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/contact", contactRoutes);

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/evaluations", require("./routes/evaluationRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

module.exports = app;

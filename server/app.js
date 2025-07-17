const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/evaluations", require("./routes/evaluationRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

module.exports = app;

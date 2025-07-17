const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  employeeId: String,
  goal: String,
  progress: Number,
  deadline: Date
});

module.exports = mongoose.model("Goal", goalSchema);

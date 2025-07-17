const mongoose = require("mongoose");

const evalSchema = new mongoose.Schema({
  employeeId: String,
  evaluatorId: String,
  rating: Number,
  comments: String,
  isAnonymous: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Evaluation", evalSchema);

const mongoose = require("mongoose");

const workingSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  startTime: { type: String },
  endTime: { type: String },
  isClosed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Working", workingSchema);

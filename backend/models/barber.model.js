const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  age: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Barber", barberSchema);
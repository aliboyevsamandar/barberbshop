const mongoose = require("mongoose");

const fonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Fon", fonSchema);

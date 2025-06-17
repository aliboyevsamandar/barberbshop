const Price = require("../models/price.model");

const createPrice = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newPrice = new Price({ name, price });
    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePrice = async (req, res) => {
  try {
    const updated = await Price.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Price not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePrice = async (req, res) => {
  try {
    const deleted = await Price.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Price not found" });
    res.status(200).json({ message: "Price deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPrice,
  getAllPrices,
  updatePrice,
  deletePrice,
};

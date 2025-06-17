const Fon = require("../models/fon.model");
const path = require("path");
const fs = require("fs");

const getAllFons = async (req, res) => {
  try {
    const fons = await Fon.find();
    res.status(200).json(fons);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createFon = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file?.filename;
    if (!image) return res.status(400).json({ message: "Rasm yuklanmagan" });

    const newFon = new Fon({ name, image });
    await newFon.save();
    res.status(201).json(newFon);
  } catch (error) {
    res.status(400).json({ message: "Fon yaratib bo‘lmadi", error });
  }
};

const updateFon = async (req, res) => {
  try {
    const { name } = req.body;
    const fon = await Fon.findById(req.params.id);
    if (!fon) return res.status(404).json({ message: "Fon topilmadi" });

    if (req.file) {
      const oldImagePath = path.join("uploads", fon.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      fon.image = req.file.filename;
    }

    fon.name = name || fon.name;
    await fon.save();
    res.status(200).json(fon);
  } catch (error) {
    res.status(400).json({ message: "O‘zgartirib bo‘lmadi", error });
  }
};

const deleteFon = async (req, res) => {
  try {
    const fon = await Fon.findByIdAndDelete(req.params.id);
    if (!fon) return res.status(404).json({ message: "Fon topilmadi" });

    const imagePath = path.join("uploads", fon.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    res.status(200).json({ message: "Fon o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "O‘chirib bo‘lmadi", error });
  }
};

module.exports = {
  getAllFons,
  createFon,
  updateFon,
  deleteFon,
};

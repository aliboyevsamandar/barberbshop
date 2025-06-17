const Barber = require("../models/barber.model");
const fs = require("fs");
const path = require("path");

const createBarber = async (req, res) => {
  try {
    const { name, age } = req.body;
    const image = req.file?.filename;

    if (!image) return res.status(400).json({ message: "Rasm yuklanmagan" });

    const newBarber = new Barber({ name, age, image });
    await newBarber.save();
    res.status(201).json(newBarber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBarber = async (req, res) => {
  try {
    const { name, age } = req.body;
    const barber = await Barber.findById(req.params.id);
    if (!barber) return res.status(404).json({ message: "Barber topilmadi" });

    if (req.file) {
      const oldImagePath = path.join("uploads", barber.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      barber.image = req.file.filename;
    }

    barber.name = name || barber.name;
    barber.age = age || barber.age;

    await barber.save();
    res.status(200).json(barber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBarber = async (req, res) => {
  try {
    const barber = await Barber.findByIdAndDelete(req.params.id);
    if (!barber) return res.status(404).json({ message: "Barber topilmadi" });

    const imagePath = path.join("uploads", barber.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    res.status(200).json({ message: "Barber o‘chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBarber,
  getAllBarbers,
  updateBarber,
  deleteBarber,
};

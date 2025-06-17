const Service = require("../models/service.model");

const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) return res.status(400).json({ message: "Rasm kerak" });

    const newService = new Service({ name, description, price, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.image = req.file.filename;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json({ message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};

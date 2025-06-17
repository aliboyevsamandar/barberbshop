const Working = require("../models/working.model");

const createWorkingDay = async (req, res) => {
  try {
    const { day, startTime, endTime, isClosed } = req.body;
    const newWorkingDay = new Working({ day, startTime, endTime, isClosed });
    await newWorkingDay.save();
    res.status(201).json(newWorkingDay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllWorkingDays = async (req, res) => {
  try {
    const data = await Working.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWorkingDay = async (req, res) => {
  try {
    const data = await Working.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ message: "Not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteWorkingDay = async (req, res) => {
  try {
    const data = await Working.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createWorkingDay,
  getAllWorkingDays,
  updateWorkingDay,
  deleteWorkingDay,
};

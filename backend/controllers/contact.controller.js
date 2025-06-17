const Contact = require("../models/contact.model");

const createContact = async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ message: "Telefon raqam va xabar talab qilinadi" });
    }

    const newContact = new Contact({ phone, message });
    await newContact.save();

    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};

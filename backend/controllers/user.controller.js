const AuthService = require("../services/auth.service");

const registerStep1 = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await AuthService.registerStep1(name, email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerStep2 = async (req, res) => {
  const { name, email, password, code } = req.body;
  try {
    const result = await AuthService.registerStep2(name, email, password, code);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AuthService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPasswordStep1 = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await AuthService.resetPasswordStep1(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPasswordStep2 = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const result = await AuthService.resetPasswordStep2(email, code, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await AuthService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  try {
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await AuthService.updateUser(id, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await AuthService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  registerStep1,
  registerStep2,
  login,
  resetPasswordStep1,
  resetPasswordStep2,
  getAllUsers,
  updateUser,
  deleteUser,
};

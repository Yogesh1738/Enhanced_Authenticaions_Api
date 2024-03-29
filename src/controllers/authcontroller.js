// authController.js

const authService = require('../services/authservices');
// const User = require('../models/user');

const registerUser = async (req, res) => {s
  try {
    const userData = req.body;
    const newUser = await authService.registerUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const logoutUser = async (req, res) => {
  // You might implement logout logic here if needed
  res.status(200).json({ message: 'Logged out successfully' });
};

const loginWithExternalService = async (req, res) => {
  // Implementation logic for user login with external service (Google, Facebook, etc.)
  res.status(501).json({ message: 'Not implemented' });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginWithExternalService
};

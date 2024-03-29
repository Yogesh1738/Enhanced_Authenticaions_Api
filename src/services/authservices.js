// authService.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
// const User = require('../models/User');

const generateAuthToken = (user) => {
  return jwt.sign({ user }, config.jwtSecret, { expiresIn: '1h' });
};

const registerUser = async (userData) => {
  try {
    const { username, email, password } = userData;
    
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate auth token
    const token = generateAuthToken(newUser);
    return { user: newUser, token };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate auth token
    const token = generateAuthToken(user);
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateAuthToken,
  registerUser,
  loginUser
};

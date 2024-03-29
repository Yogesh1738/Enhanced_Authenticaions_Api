// Profile.js

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

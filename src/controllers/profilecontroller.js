// profileController.js

const Profile = require('../models/profile');
// const User = require('../models/user');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authenticated user's ID is available in req.user
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if the profile is public or if the requester is the owner or an admin
    if (profile.isPublic || req.user.role === 'admin') {
      return res.status(200).json(profile);
    } else {
      return res.status(403).json({ message: 'Unauthorized to access private profile' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authenticated user's ID is available in req.user
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if the requester is the owner or an admin
    if (req.user.id !== profile.user.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to update profile' });
    }

    const { name, bio, phone, email, password, isPublic } = req.body;

    // Update profile fields
    if (name) profile.name = name;
    if (bio) profile.bio = bio;
    if (phone) profile.phone = phone;
    if (email) profile.email = email;
    if (password) profile.password = password;
    if (isPublic !== undefined) profile.isPublic = isPublic;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};

// adminController.js

// const Profile = require('../models/profile');

const getAllProfiles = async (req, res) => {
  try {
    // Check if the requester is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    // Fetch all profiles
    const profiles = await Profile.find();

    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllProfiles
};

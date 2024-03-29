// profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profilecontroller');
const authMiddleware = require('../middleware/authmiddleware');

router.get('/profile', authMiddleware.authenticateUser, profileController.getUserProfile);
router.put('/profile', authMiddleware.authenticateUser, profileController.updateUserProfile);

module.exports = router;

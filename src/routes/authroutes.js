// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/login-external', authController.loginWithExternalService);

module.exports = router;

// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const adminMiddleware = require('../middleware/adminmiddleware');

router.get('/profiles', adminMiddleware.authorizeAdmin, adminController.getAllProfiles);

module.exports = router;

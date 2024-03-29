// authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateUser = (req, res, next) => {
  // Implementation logic to authenticate user
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  authenticateUser
};

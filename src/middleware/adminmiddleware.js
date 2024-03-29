// adminMiddleware.js

const config = require('../config/config');

const authorizeAdmin = (req, res, next) => {
  // Implementation logic to authorize admin
  if (req.user && req.user.role === config.adminRole) {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }
};

module.exports = {
  authorizeAdmin
};

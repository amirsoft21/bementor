const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'არაა ნებართვა ამ რესურსზე წვდომისთვის'
    });
  }

  try {
    // Check if MongoDB is connected
    const isMongoConnected = require('mongoose').connection.readyState === 1;

    if (isMongoConnected) {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } else {
      // Verify in-memory token
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'არაა ნებართვა ამ რესურსზე წვდომისთვის'
        });
      }
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'არაა ნებართვა ამ რესურსზე წვდომისთვის'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'არაა ნებართვა ამ რესურსზე წვდომისთვის'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `მომხმარებლის როლს ${req.user.role} არ აქვს ნებართვა ამ რესურსზე წვდომისთვის`
      });
    }
    next();
  };
}; 
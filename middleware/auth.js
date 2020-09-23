const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(400).json({
      msg: 'No token, authorization denied',
    });
  }

  // If there is token, carry on
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();

    req.user;
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};

const jwt = require('jsonwebtoken');
const db = require('../models');
const User =db.User;
require('dotenv').config();

const authenticate = async (req, res, next) => {
  // const token = req.headers.authorization?.split(' ')[1];
  // console.log(req.body)
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    console.log(req.body);
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};

module.exports = { authenticate, authorize };

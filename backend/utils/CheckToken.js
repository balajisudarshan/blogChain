require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({ message: "You are not logged in. Please login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    console.log("Decoded:", decoded);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Please login again" });
  }
};

module.exports = checkToken;

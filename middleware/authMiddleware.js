const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    // const cookies = req.headers.cookie;
    // const token = cookies.split("=")[1];
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = protect;

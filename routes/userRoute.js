const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  logout,
  forgotPassword,
  resetPassword,
  loginStatus,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedIn", loginStatus);
router.post("/profile", protect, updateUser);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;

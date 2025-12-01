const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  signup,
  login,
  me,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, me);
router.patch("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;

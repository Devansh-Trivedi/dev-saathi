const express = require("express");
const router = express.Router();
const {
  registerUser,
  currentUser,
  loginUser,
  updateUserProfile,
  changePassword,
} = require("../controllers/auth");
const authCheck = require("../middlewares/authCheck");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/current-user", authCheck, currentUser);

router.post("/update-user", authCheck, updateUserProfile);

router.post("/change-password", authCheck, changePassword);

module.exports = router;
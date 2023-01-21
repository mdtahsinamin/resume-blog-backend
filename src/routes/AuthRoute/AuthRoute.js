const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
  getUserDetails,
} = require("../../controllers/AuthControllers/AuthControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/get-userDetails", getUserDetails);

module.exports = router;

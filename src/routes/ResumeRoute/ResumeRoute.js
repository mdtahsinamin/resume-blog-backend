const express = require("express");
const {
  createResume,
  fetchResume,
} = require("../../controllers/ResumeControllers/ResumeController");
const router = express.Router();

router.post("/createResume", createResume);
router.get("/fetchResume", fetchResume);
module.exports = router;

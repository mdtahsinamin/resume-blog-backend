const express = require("express");
const {
  newCategory,
  getCategory,
} = require("../../controllers/CategoryControllers/CategoryControllers");
const router = express.Router();

router.post("/categories", newCategory);
router.get("/categories", getCategory);

module.exports = router;

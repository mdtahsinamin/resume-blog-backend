const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
} = require("../../controllers/PostControllers/PostControllers");
const router = express.Router();

router.post("/create-post", createPost);
router.put("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);
router.get("/:id", getPost);
router.get("/", getAllPost);

module.exports = router;

const express = require("express");
const router = express.Router();
const AuthRoute = require("./AuthRoute/AuthRoute");
const ResumeRoute = require("./ResumeRoute/ResumeRoute");
const Category = require("./CategoryRoute/CategoryRoue");
const Post = require("./PostRoue/PostRoute");

router.use("/auth", AuthRoute);
router.use("/resume", ResumeRoute);
router.use("/blog", Category);
router.use("/blog", Post);

module.exports = router;

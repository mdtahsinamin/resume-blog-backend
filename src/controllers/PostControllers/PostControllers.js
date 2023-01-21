const catchAsyncError = require("../../middleware/catchAsyncError");
const postModel = require("../../models/PostModel/PostModel");
const userModel = require("../../models/UserModel/UserModel");

exports.createPost = catchAsyncError(async (req, res, next) => {
  const newPost = new postModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.updatePost = catchAsyncError(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await postModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.deletePost = catchAsyncError(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.getPost = catchAsyncError(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
exports.getAllPost = catchAsyncError(async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await postModel.find({ username });
    } else if (catName) {
      posts = await postModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await postModel.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

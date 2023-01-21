const catchAsyncError = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../utils/ErrorHandler");
const createError = require("http-errors");
const categoryModel = require("../../models/CategoryModel/CategoryModel");

exports.newCategory = catchAsyncError(async (req, res, next) => {
  const newCat = new categoryModel(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getCategory = catchAsyncError(async (req, res, next) => {
  try {
    const cats = await categoryModel.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

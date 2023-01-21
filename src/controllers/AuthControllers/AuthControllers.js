const catchAsyncError = require("../../middleware/catchAsyncError");
const userModel = require("../../models/UserModel/UserModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const createError = require("http-errors");
const { auth_schema, login_schema } = require("../../helpers/validate_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt_token");

exports.register = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const result = await auth_schema.validateAsync(req.body);

  if (!result.name || !result.email || !result.password) {
    throw createError.BadRequest();
  }

  const doesExist = await userModel.findOne({ email: result.email });

  if (doesExist) {
    throw createError.Conflict(`${result.email} is already been registered`);
  }
  const user = new userModel(result);
  const saveUser = await user.save();
  const accessToken = await signAccessToken(saveUser._id);
  const refreshToken = await signRefreshToken(saveUser._id);
  res.send({ accessToken, refreshToken });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const result = await login_schema.validateAsync(req.body);

  const user = await userModel
    .findOne({ email: result.email })
    .select("+password");

  if (!user) {
    throw createError.NotFound(`User Not registered`);
  }
  const isMatch = await user.comparePassword(result.password);

  if (!isMatch) {
    throw createError.Unauthorized("email/password is not a valid ");
  }

  const accessToken = await signAccessToken(user._id);
  const refreshToken = await signRefreshToken(user._id);
  res.send({ accessToken, refreshToken });
});

exports.refreshToken = catchAsyncError(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw createError.BadRequest();
  }
  const userId = await verifyRefreshToken(refreshToken);
  const accessToken = await signAccessToken(userId);
  const anotherRefreshToken = await signRefreshToken(userId);
  res.send({ accessToken: accessToken, refreshToken: anotherRefreshToken });
});

exports.logout = catchAsyncError(async (req, res, next) => {
  let { refreshToken } = req.body;
  if (!refreshToken) throw createError.BadRequest();
  const userId = await verifyRefreshToken(refreshToken);
  if (userId) {
    refreshToken = "";
  }
  res.status(200).json({
    status: true,
    refreshToken: refreshToken,
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const { refreshToken } = req.body;
  console.log(refreshToken);
  if (!refreshToken) throw createError.BadRequest();
  const userId = await verifyRefreshToken(refreshToken);

  console.log(userId);

  const user = await userModel.findById(userId);

  res.status(200).json({
    success: true,
    user,
  });
});

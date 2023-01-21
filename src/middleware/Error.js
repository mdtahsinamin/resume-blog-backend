const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name == "CastError") {
    err.message = `Resource not found: Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.statusCode = 400;
    err = new ErrorHandler(err.message, err.statusCode);
  }

  if (err.name === "JsonWebTokenError") {
    err.message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(err.message, 400);
  }

  if (err.name === "TokenExpiredError") {
    err.message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(err.message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

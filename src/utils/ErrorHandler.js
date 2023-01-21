class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorHandler;

/*
 Error.captureStackTrace(this, this.constructor);

*/

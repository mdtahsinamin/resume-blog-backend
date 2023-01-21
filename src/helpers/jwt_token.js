const jwt = require("jsonwebtoken");
const createError = require("http-errors");
module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userId,
      };
      const secret = process.env.ACCESS_TOKEN;
      const options = {
        expiresIn: "1h",
        issuer: "tahsin",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      return next(createError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userId,
      };
      const secret = process.env.REFRESH_TOKEN;
      const options = {
        expiresIn: "1y",
        issuer: "tahsin",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
        if (err) {
          return next(createError.Unauthorized());
        }
        const userId = payload.aud;
        resolve(userId);
      });
    });
  },
};

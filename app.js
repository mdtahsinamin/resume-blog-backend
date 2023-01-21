const express = require("express");
const router = require("./src/routes/index");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./src/middleware/Error");
const connectDatabase = require("./src/config/database");
const createError = require("http-errors");
//const { connectRedis } = require("./src/helpers/init_redis");
const multer = require("multer");
const path = require("path");

const pdf = require("html-pdf");

const pdfTemplate = require("./src/documents");

const options = {
  height: "42cm",
  width: "29.7cm",
  timeout: "60000",
};

const app = express();
// dotenv config
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());

// limiter define
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Database connection
connectDatabase();

// Import route
app.use("/api/v1", router);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
    if (err) {
      console.log(err);
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  //const file = path.join(__dirname, `${__dirname}/Resume.pdf`);
  //console.log(file);
  res.sendFile(`${__dirname}/Resume.pdf`);
  // console.log(file);
  //console.log("show");
  //res.download(file);
});

// custom error middleware
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      success: false,
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.use(errorHandler);

module.exports = app;

// express default error handler
/*app.use((err, req, res, next) => {
    res.status(404).json({
      message: err.message,
    });
  });
*/

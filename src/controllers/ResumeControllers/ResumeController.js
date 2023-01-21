const catchAsyncError = require("../../middleware/catchAsyncError");
const pdf = require("html-pdf");
const path = require("path");

const pdfTemplate = require("../../documents");
const options = {
  height: "42cm",
  width: "29.7cm",
  timeout: "6000",
};

exports.createResume = catchAsyncError(async (req, res, next) => {
  pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
    if (err) {
      console.log(err);
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});
exports.fetchResume = catchAsyncError(async (req, res, next) => {
  const file = path.join(__dirname, `${__dirname}/Resume.pdf`);
  console.log(file);
  console.log("show");
  res.download(file);
});

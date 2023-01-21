const app = require("./app");
const cloudinary = require("cloudinary").v2;
const port = 5000 || process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});

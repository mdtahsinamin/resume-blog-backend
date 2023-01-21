const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb://0.0.0.0:27017/Resmue_Blog"
    );
    console.log(`Database is running on ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDatabase;

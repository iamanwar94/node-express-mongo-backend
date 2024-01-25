const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI_2;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("node => connection established");
  } catch (error) {
    console.log("node => connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;

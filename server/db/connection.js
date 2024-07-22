const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config/envConfig");

const mongoDB = MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;

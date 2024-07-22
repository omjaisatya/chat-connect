const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://ckmobile:ckmobile123@cluster0.niuuw.mongodb.net/chat-database?retryWrites=true&w=majority";

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

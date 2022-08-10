const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
  try {
    mongoose.connect(procsess.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed ", error);
  }
};

module.exports = connectDB;

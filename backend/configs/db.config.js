const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Ulandi");
  } catch (err) {
    console.error("❌ MongoDB Ulanishda Xatolik:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
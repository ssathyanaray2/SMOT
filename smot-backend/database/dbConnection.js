import mongoose from 'mongoose';

const URI = process.env.DATABASE_URL;


const connectDB = async () => {
  try {
      await mongoose.connect(URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("✅ MongoDB Connected...");
  } catch (err) {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
  }
};


export default connectDB;
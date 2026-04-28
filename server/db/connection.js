import mongoose from "mongoose";

export const connect = async () => {
  // Already connected — skip
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/easy-stay`, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('DB Connected');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    throw error;
  }
};

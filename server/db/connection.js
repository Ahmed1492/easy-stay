import "dotenv/config";
import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}/easy-stay`).then(() => console.log('DB connected')
  ).catch(err => console.log(err));
};

export const connect = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('DB Connected'));
    await mongoose.connect(`${process.env.MONGODB_URL}/easy-stay`);
  } catch (error) {
    console.log(error.message);

  }
};
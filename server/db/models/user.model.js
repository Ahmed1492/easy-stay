import mongoose from "mongoose";

let userSchema = new mongoose.Schema({

  _id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ['user', "hotelOwner"], default: "user" },
  recentSearchedCities: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

const User = mongoose.models.User || new mongoose.model('User', userSchema);

export default User;
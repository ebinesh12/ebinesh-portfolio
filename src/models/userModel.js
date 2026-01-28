import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  profileImage: {
    data: { type: Buffer, select: false },
    contentType: String,
  },
  resume: {
    data: { type: Buffer, select: false },
    contentType: String,
    filename: String, // Store the original filename
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: { type: Boolean, default: false },
});

export default models.User || model("User", UserSchema);

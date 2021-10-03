import mongoose from "mongoose";
import { encrypt } from "../utils/bcrypt";

export const schemaName = "user";

const phoneRegex = /^\d{9}$/;
const userSchema = new mongoose.Schema(
  {
    birthDate: { type: String, required: true },
    phone: { type: String, length: 9, match: phoneRegex },
    //campus: { type: String, enum: ["Miraflores", "La Molina", "San Isidro"] },
    description: { type: String },
    specialization: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    user.password = encrypt(user.password);
  }

  if (user.phone) user.phone = "+51" + user.phone;
  return next();
});

export default mongoose.model(schemaName, userSchema);

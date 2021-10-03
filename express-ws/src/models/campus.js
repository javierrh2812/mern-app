import mongoose from "mongoose";

export const schemaName = "campus";
const userSchema = new mongoose.Schema(
  {
    enabled: {type: Boolean, default: true},
    name: { type: String, unique: true},
  },
  { versionKey: false, timestamps: false}
);

export default mongoose.model(schemaName, userSchema);

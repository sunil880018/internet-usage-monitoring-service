import { Schema, model } from "mongoose";
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const User = model("User", UserSchema);
export { User };

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "manager", "user"] },
  companyId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("User", UserSchema);
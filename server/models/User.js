import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
});

export default mongoose.model("User", UserSchema);
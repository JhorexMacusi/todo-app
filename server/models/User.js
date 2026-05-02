import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,

  role: {
    type: String,
    default: "user"
  },

  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null
  }
});

export default mongoose.model("User", UserSchema);
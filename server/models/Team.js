import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

export default mongoose.model("Team", TeamSchema);
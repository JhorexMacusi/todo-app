import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: String,
  adminId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Company", CompanySchema);
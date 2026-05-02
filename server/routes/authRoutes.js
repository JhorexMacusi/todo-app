import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hashed
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).populate("teamId");

  if (!user) return res.status(400).json("User not found");

  const ok = await bcrypt.compare(req.body.password, user.password);

  if (!ok) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretkey"
  );

  res.json({
    token,
    user: {
      ...user._doc,
      teamName: user.teamId?.name || null
    }
  });
export default router;
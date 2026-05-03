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
  const user = await User.findOne({ email: req.body.email });

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
      teamId: user.teamId?._id || null,
      teamName: user.teamId?.name || null
    }
  });
});

// GET CURRENT USER (UPDATED)
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("No token");
    }

    const decoded = jwt.verify(token, "secretkey");

    const user = await User.findById(decoded.id).populate("teamId");

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json({
      ...user._doc,
      teamId: user.teamId?._id || null,
      teamName: user.teamId?.name || null
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
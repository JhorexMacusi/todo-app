import express from "express";
import Team from "../models/Team.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, userId } = req.body;

    const team = await Team.create({
      name,
      createdBy: userId,
      members: [userId]
    });

    await User.findByIdAndUpdate(userId, {
      role: "taskmanager",
      teamId: team._id
    });

    res.json(team);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
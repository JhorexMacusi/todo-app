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

// GET ALL TEAMS
router.get("/", async (req, res) => {
    const teams = await Team.find();
    res.json(teams);
  });
  
  // JOIN TEAM
  router.post("/join", async (req, res) => {
    const { teamId, userId } = req.body;
  
    const team = await Team.findById(teamId);
  
    if (!team) return res.status(404).json("Team not found");
  
    await User.findByIdAndUpdate(userId, {
      teamId: team._id
    });
  
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }
  
    res.json({ message: "Joined team successfully" });
  });

export default router;
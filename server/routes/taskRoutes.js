import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// create task (manager)
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// get tasks per user
router.get("/user/:id", async (req, res) => {
  const tasks = await Task.find({
    assignedTo: req.params.id
  });

  res.json(tasks);
});

export default router;
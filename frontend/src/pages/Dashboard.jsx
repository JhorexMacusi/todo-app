import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://todo-app-aoe6.onrender.com";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // GET TASKS (based on user)
  const fetchTasks = async () => {
    const res = await axios.get(
      `${API}/tasks/user/${user._id}`,
      {
        headers: { Authorization: token }
      }
    );

    setTasks(res.data);
  };

  // CREATE TASK (only manager/admin later)
  const addTask = async () => {
    await axios.post(
      `${API}/tasks`,
      {
        title,
        assignedTo: user._id,
        createdBy: user._id,
        companyId: user.companyId,
      },
      {
        headers: { Authorization: token }
      }
    );

    setTitle("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: { Authorization: token }
    });

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Role: {user.role}</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layouts/DashboardLayout";

const API = "https://todo-app-aoe6.onrender.com";

function Dashboard() {
  const navigate = useNavigate();

  const { user, token, logout, loading } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // 🔒 loading state
  if (loading) return <h2>Loading...</h2>;

  // 🔒 auth guard
  if (!user || !token) {
    return <h2>Please login</h2>;
  }

  const fetchTasks = async () => {
    const res = await axios.get(
      `${API}/tasks/user/${user._id}`,
      {
        headers: { Authorization: token },
      }
    );

    setTasks(res.data);
  };

  useEffect(() => {
    if (user?._id) fetchTasks();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

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
        headers: { Authorization: token },
      }
    );

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: { Authorization: token },
    });

    fetchTasks();
  };

  return (
    <DashboardLayout>
        Dashboard
    </DashboardLayout>
  );
}

export default Dashboard;
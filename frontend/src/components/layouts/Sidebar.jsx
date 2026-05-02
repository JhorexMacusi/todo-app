import { useAuth } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import "../../css/Sidebar.css";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">DevTasks</h2>

      <div className="user-info">
        <div>{user?.email}</div>
        <span className="role">{user?.role}</span>
      </div>

      <nav className="menu">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/dashboard/create-team">Create Team</NavLink>
        <NavLink to="/dashboard/join-team">Join Team</NavLink>
        <NavLink to="/dashboard/mytask">MyTask</NavLink>
        <NavLink to="/dashboard/profile">Profile</NavLink>
        <NavLink to="/dashboard/settings">Setting</NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
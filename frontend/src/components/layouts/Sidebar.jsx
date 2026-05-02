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
      <div className="user-info">
        <div>{user?.email}</div>
        <span className="role">{user?.role}</span>
      </div>
    </aside>
  );
}

export default Sidebar;
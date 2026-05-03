import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import "../../css/Sidebar.css";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTeam } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { BsBuildingAdd } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const hasTeam = !!user?.teamId;
  const isTaskManager = user?.role === "taskmanager";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* TOGGLE BUTTON */}
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <AiOutlineFullscreen />
        ) : (
          <AiOutlineFullscreenExit />
        )}
      </button>
      {/* USER INFO */}
      <div className="user-info">
        {!collapsed && (
          <>
            <div>{user?.email}</div>
            <span className="role">{user?.role}</span>
          </>
        )}
      </div>

      {/* MENU */}
      <nav className="menu">
        <NavLink to="/dashboard">
          {collapsed ? <RxDashboard /> : "Dashboard"}
        </NavLink>

        {isTaskManager ? (
          <NavLink to="/dashboard/manage-team">
            {collapsed ? <AiOutlineTeam /> : "Manage Team"}
          </NavLink>
        ) : (
          <>
            {!hasTeam && (
              <>
                <NavLink to="/dashboard/create-team">
                  {collapsed ? <IoCreateOutline /> : "Create Team"}
                </NavLink>

                <NavLink to="/dashboard/join-team">
                  {collapsed ? <BsBuildingAdd /> : "Join Team"}
                </NavLink>
              </>
            )}

            {hasTeam && (
              <NavLink to="/dashboard/my-team">
                {collapsed ? <FaUsers /> : "My Team"}
              </NavLink>
            )}
          </>
        )}

        <NavLink to="/dashboard/mytask">
          {collapsed ? <FaTasks /> : "My Task"}
        </NavLink>

        <NavLink to="/dashboard/profile">
          {collapsed ? <CgProfile /> : "Profile"}
        </NavLink>

        <NavLink to="/dashboard/settings">
          {collapsed ? <AiOutlineSetting /> : "Settings"}
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <button className="logout-btn" onClick={handleLogout}>
        {collapsed ? "⏻" : "Logout"}
      </button>
    </aside>
  );
}

export default Sidebar;
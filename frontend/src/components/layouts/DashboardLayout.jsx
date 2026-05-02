import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        <h2>Task Manager</h2>

        <div style={styles.right}>
          <span>Role: {user?.role}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    background: "#4f46e5",
    color: "white",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default DashboardLayout;
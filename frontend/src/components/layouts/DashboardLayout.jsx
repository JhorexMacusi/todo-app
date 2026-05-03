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
  <div style={styles.logoContainer}>
    <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="12" fill="#4F46E5" />

      <path d="M22 20L14 30L22 40" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38 20L46 30L38 40" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

      <path d="M25 32L28 36L35 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    <h2 style={styles.logoText}>DevTasks</h2>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#ffffff",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  
  logoText: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "0.5px",
  },

  wrapper: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    flexDirection: "column",
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
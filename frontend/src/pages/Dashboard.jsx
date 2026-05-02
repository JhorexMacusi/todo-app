import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layouts/DashboardLayout";

function Dashboard() {
  const { user, token, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default Dashboard;
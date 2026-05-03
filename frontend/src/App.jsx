import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import CreateTeam from "./pages/CreateTeam";
import JoinTeam from "./pages/JoinTeam";
import MyTask from "./pages/MyTask";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HomeDashboard from "./pages/HomeDashboard";
import ManageTeam from "./pages/ManageTeam";
import MyTeam from "./pages/MyTeam";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      {/* 🔥 ONLY ONE DASHBOARD ROUTE */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* CHILD ROUTES INSIDE DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<HomeDashboard />} />
        <Route path="create-team" element={<CreateTeam />} />
        <Route path="join-team" element={<JoinTeam />} />
        <Route path="mytask" element={<MyTask />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="manage-team" element={<ManageTeam />} />
        <Route path="my-team" element={<MyTeam />} />
      </Route>
    </Routes>
  );
}

export default App;
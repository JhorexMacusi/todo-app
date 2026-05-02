import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/login.css"

const API = "https://todo-app-aoe6.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ from context

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      // ✅ centralized auth (NO localStorage here)
      login(res.data.user, res.data.token);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button id="login" onClick={handleLogin}>Login</button>

      <p onClick={() => navigate("/register")}>
        Create account
      </p>
    </div>
  );
}

export default Login;
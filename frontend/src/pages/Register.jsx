import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://todo-app-aoe6.onrender.com";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/auth/register`, {
        email,
        password
      });

      alert("Account created successfully!");
      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data || "Error registering"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>

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

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Creating..." : "Register"}
      </button>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/login")}
      >
        Already have an account?
      </p>
    </div>
  );
}

export default Register;
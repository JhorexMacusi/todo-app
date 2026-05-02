import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://todo-app-aoe6.onrender.com";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/register`, {
        email,
        password,
      });

      alert("Account created!");
      navigate("/login");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p onClick={() => navigate("/login")}>
        Already have an account?
      </p>
    </div>
  );
}

export default Register;
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "https://todo-app-aoe6.onrender.com";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const { user } = useAuth();

  const handleCreate = async () => {
    try {
      await axios.post(`${API}/teams/create`, {
        name: teamName,
        userId: user._id
      });

      alert("Team created. You are now a Task Manager.");
      window.location.reload();
    } catch (err) {
      alert("Failed to create team");
    }
  };

  return (
    <div>
      <h1>Create Team</h1>

      <input
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <button onClick={handleCreate}>
        Create Team
      </button>
    </div>
  );
}

export default CreateTeam;
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "https://todo-app-aoe6.onrender.com";

function JoinTeam() {
  const { user, setUser } = useAuth();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API}/teams`);
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const joinTeam = async (teamId) => {
    try {
      setLoading(true);

      // 1. join team
      await axios.post(`${API}/teams/join`, {
        teamId,
        userId: user._id
      });

      // 2. refresh user
      const res = await axios.get(`${API}/auth/me`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      setUser(res.data);

      alert("Joined team successfully!");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to join team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Join Team</h1>

      {teams.length === 0 ? (
        <p>No teams available</p>
      ) : (
        teams.map((team) => (
          <div key={team._id}>
            <h3>{team.name}</h3>
            <p>Members: {team.members.length}</p>

            <button
              onClick={() => joinTeam(team._id)}
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Team"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default JoinTeam;
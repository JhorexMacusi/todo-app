import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "https://todo-app-aoe6.onrender.com";

function ManageTeam() {
  const { user } = useAuth();
  const [team, setTeam] = useState(null);

  const fetchTeam = async () => {
    try {
      const teamId = user?.teamId?._id || user?.teamId;
  
      const res = await axios.get(`${API}/teams/${teamId}`);
      setTeam(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.teamId) {
      fetchTeam();
    }
  }, [user]);

  return (
    <div>
      <h1>Manage Team</h1>

      {team ? (
        <div className="team-box">
          <h2>{team.name}</h2>

          <h3>Members:</h3>

          {team.members.length > 0 ? (
            <ul>
              {team.members.map((member) => (
                <li key={member._id}>
                  {member.email} ({member.role})
                </li>
              ))}
            </ul>
          ) : (
            <p>No members yet</p>
          )}
        </div>
      ) : (
        <p>Loading team...</p>
      )}
    </div>
  );
}

export default ManageTeam;
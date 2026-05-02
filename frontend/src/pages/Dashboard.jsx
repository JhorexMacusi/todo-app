import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://todo-app-aoe6.onrender.com";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/todos`, {
      headers: { Authorization: token },
    });

    setTodos(res.data);
  };

  const addTodo = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${API}/todos`,
      { text, completed: false },
      { headers: { Authorization: token } }
    );

    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/todos/${id}`, {
      headers: { Authorization: token },
    });

    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
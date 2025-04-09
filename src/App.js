import { useState } from "react";
import "./AllComponent/CSSFile/DashBoard.css";
import Sidebar from "./AllComponent/AdminDashboardMain/SideBar";
import Home from "./AllComponent/AdminDashboardMain/Main";
import LoginPage from "./AllComponent/LoginFiles/LoginPage";
import RouterMain from "./AllComponent/RouterMainFile/RouterMain";
import Dashboard from "./AllComponent/DAshBoardRight/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function App() {
  // GET Todos
  const fetchTodos = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return res.json();
  };

  // POST Todo
  const addTodo = async (newTodo) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  // useQuery - GET
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // useMutation - POST
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      console.log("Mutation success ✅");
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting todo: ", title);
    mutation.mutate({ title, userId: 1, completed: false });
    setTitle("");
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>📋 Todo List</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New todo..."
          />
          <button type="submit">Add Todo</button>
        </form>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>✅ {todo.title}</li>
            ))}
          </ul>
        )}
      </div>
      {/* <RouterMain />
       <ToastContainer containerId={"request"}/> */}
      {/* <Dashboard /> */}
    </>
  );
}

export default App;

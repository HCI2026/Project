import { useState } from "react";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const initialAssignments = [
  {
    id: 1,
    title: "HCI Group Report",
    course: "Human Computer Interaction",
    deadline: "2026-05-20",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Database Assignment",
    course: "Database Systems",
    deadline: "2026-05-24",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: 3,
    title: "React Project",
    course: "Web Development",
    deadline: "2026-05-28",
    priority: "Low",
    status: "Submitted",
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(user ? "overview" : "login");
  const [assignments, setAssignments] = useState(initialAssignments);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("overview");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const handleStatusChange = (id, newStatus) => {
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id ? { ...assignment, status: newStatus } : assignment
      )
    );
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard
      user={user}
      page={page}
      assignments={assignments}
      onNavigate={setPage}
      onLogout={handleLogout}
      onStatusChange={handleStatusChange}
    />
  );
}

export default App;

import { useNavigate } from "react-router-dom";

// Function to check if JWT token is expired
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Check authentication
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Dashboard</h1>
        <p>Welcome back, {user.name}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={contentStyle}>
        <div style={placeholderStyle}>
          <h2>Your Dashboard</h2>

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <p>This page will display:</p>

          <ul style={listStyle}>
            <li>Your created content (posts/recipes/workouts)</li>
            <li>Statistics and analytics</li>
            <li>Quick actions (create new, edit, delete)</li>
            <li>Recent activity</li>
          </ul>

          <p style={noteStyle}>
            This will be built after authentication is implemented
          </p>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "80vh",
  padding: "2rem",
};

const headerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 2rem",
};

const contentStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const placeholderStyle = {
  backgroundColor: "#f8f9fa",
  padding: "2rem",
  borderRadius: "8px",
};

const listStyle = {
  paddingLeft: "1.5rem",
  marginTop: "1rem",
};

const noteStyle = {
  marginTop: "1rem",
  fontStyle: "italic",
  color: "#666",
};

export default Dashboard;
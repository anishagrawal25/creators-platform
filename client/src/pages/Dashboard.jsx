import { useNavigate, Navigate } from "react-router-dom";
// 1. Import the useAuth hook
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Dashboard() {
  // 2. Grab user, logout, and loading from our new Context
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // 3. Instead of the manual useEffect, we use the loading state from Context
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Loading...
      </div>
    );
  }

  // 4. If there is no user, send them to login automatically
  if (!user) {
    return <Navigate to="/login" />;
  }
  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      const users = response.data;
      console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Update Profile
  const updateProfile = async () => {
    try {
      const response = await api.put("/api/profile", {
        name: "Anisha",
        bio: "Full Stack Developer"
      });

      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    try {
      await api.delete(`/api/posts/${id}`);
      console.log("Post deleted");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Welcome, {user.name}!</h1>
        {/* 5. Use the logout function from context */}
        <button onClick={logout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2>Your Account</h2>
          <div style={infoStyle}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Member Since:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <h2>Dashboard Features</h2>
          <p>This is your personalized dashboard. Future features will include:</p>
          <ul>
            <li>Create and manage your content</li>
            <li>View your statistics</li>
            <li>Edit your profile</li>
            <li>See your activity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// --- STYLES (Stay exactly the same) ---
const containerStyle = {
  minHeight: "80vh",
  padding: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  padding: "1rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const logoutButtonStyle = {
  padding: "0.5rem 1.5rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "500",
};

const contentStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
};

const cardStyle = {
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const infoStyle = {
  marginTop: "1rem",
  lineHeight: "2",
};

export default Dashboard;
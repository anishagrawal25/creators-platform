import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div style={appStyle}>
        <Header />

        <main style={mainStyle}>
          <Routes>

            {/* Public */}
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "4rem" }}>
    <h1>404 - Page Not Found</h1>
  </div>
);

const appStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const mainStyle = {
  flex: 1,
};

export default App;
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div style={appStyle}>
      {/* Header appears on all pages */}
      <Header />

      {/* Main content */}
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer appears on all pages */}
      <Footer />
    </div>
  );
}

// Simple 404 Component
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '4rem' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainStyle = {
  flex: 1,
};

export default App;
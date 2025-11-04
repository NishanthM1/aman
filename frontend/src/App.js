import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CheckResult from './pages/CheckResult';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AddResult from './pages/AddResult';
import AddSemester from './pages/AddSemester';
import './App.css';
import './index.css'; // Ensure Tailwind CSS is included

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Simple admin state for demo

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAdmin={isAdmin} onLogout={handleAdminLogout} />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CheckResult />} />
            <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
            {isAdmin ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-result" element={<AddResult />} />
                <Route path="/add-semester" element={<AddSemester />} />
              </>
            ) : (
              <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
            )}
            {/* Redirect any unknown routes to home or admin login if not authenticated */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

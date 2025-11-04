import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import ResultsPage from './pages/ResultsPage';
import ViewResultPage from './pages/ViewResultPage';
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
            <Route path="/" element={<LoginPage onLogin={handleAdminLogin} />} />
            {isAdmin ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/results/:studentId" element={<ViewResultPage />} />
              </>
            ) : (
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
            )}
            {/* Redirect any unknown routes to home or login if not authenticated */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

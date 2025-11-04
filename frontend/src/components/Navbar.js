import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAdmin, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="navbar-brand">Result Management</Link>
        {isAdmin ? (
          <div className="space-x-4">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/students" className="nav-link">Students</Link>
            <Link to="/results" className="nav-link">Results</Link>
            <button onClick={handleLogout} className="nav-link btn btn-danger">Logout</button>
          </div>
        ) : (
          <Link to="/" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

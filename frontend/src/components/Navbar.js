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
        <div className="space-x-4">
          <Link to="/" className="nav-link">Home</Link>
          {!isAdmin ? (
            <Link to="/admin" className="nav-link">Admin</Link>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/add-result" className="nav-link">Add Result</Link>
              <Link to="/add-semester" className="nav-link">Add Semester</Link>
              <button onClick={handleLogout} className="nav-link btn btn-danger">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

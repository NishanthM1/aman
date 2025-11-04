import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="card max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Panel Login</h2>
        <p className="text-gray-600 mb-6">For demo purposes, no credentials are required.</p>
        <button
          onClick={handleLogin}
          className="w-full flex justify-center btn btn-primary"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Notice Management</Link>
        <div className="flex space-x-4">
          <Link to="/notices" className="hover:text-blue-200">Notices</Link>
          <Link to="/notices/create" className="hover:text-blue-200">Create Notice</Link>
          <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
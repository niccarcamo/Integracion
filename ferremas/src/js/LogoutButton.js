import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default LogoutButton;

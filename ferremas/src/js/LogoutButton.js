import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'; 

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload(); // Recarga la página después de cerrar sesión
  };

  return (
    <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faRightToBracket} style={{ color: '#ffffff', fontSize: '1em' }} />
    </button>
  );
};

export default LogoutButton;

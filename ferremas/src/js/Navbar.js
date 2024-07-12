import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = ({ isAdmin }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Verifica si hay un token

  if (!isLoggedIn) {
    return null; // Si no hay sesión, no se muestra el Navbar
  }

  const role = localStorage.getItem('role');

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarUl}>
        <li style={styles.navbarLi}><Link to="/">Inicio</Link></li>
        <li style={styles.navbarLi}><Link to="/MyComponent">Herramienta</Link></li>
        {isAdmin && <li style={styles.navbarLi}><Link to="/crear-producto">Crear Producto</Link></li>}
        {isAdmin && <li style={styles.navbarLi}><Link to="/mostrar-usuarios">Mostrar Usuarios</Link></li>}
        
        {role === '3' && <li><Link to="/vendedor">Vendedor</Link></li>}

        <li style={{ ...styles.navbarLi, marginLeft: 'auto' }}>
          Bienvenido {role === '2' ? 'Administrador' : role === '3' ? 'Vendedor' : 'Usuario'}
        </li>
        <LogoutButton style={styles.logoutLink} />
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  navbarUl: {
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  navbarLi: {
    marginRight: '10px',
  },
  logoutLink: {
    color: '#f00',  // Color rojo para el enlace de cerrar sesión
    textDecoration: 'none',
  },
};

export default Navbar;

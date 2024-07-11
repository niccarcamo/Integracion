import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './js/Navbar';
import CrearProducto from './js/CrearProducto';
import MostrarUsuarios from './js/MostrarUsuarios';
import MyComponent from './js/MyComponent';
import HeaderIndicators from './js/HeaderIndicators';
import Carrousel from './js/Carrousel'; // Asegúrate de que la ruta del componente Carousel sea correcta
import Register from './js/Register';
import Login from './js/Login';
import PrivateRoute from './PrivateRoute';
import AdminComponent from './js/AdminComponent';
import UserComponent from './js/UserComponent';
import Vendedor from './js/Vendedor';
import LogoutButton from './js/LogoutButton';
import '../src/css/App.css';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const showNavbar = !(window.location.pathname === '/register' || window.location.pathname === '/login');

  return (
    <Router>
      <div className="App">
        {showNavbar && <Navbar isAdmin={role === '2'} />} {/* Mostrar Navbar solo si no está en /register o /login */}
        {token ? (
          <>
            <header>
              <h1>Bienvenido a Ferretería Ferremas</h1>
              <HeaderIndicators />
              <nav>
                <ul>
                  {role === '3' && <li><Link to="/vendedor">Vendedor</Link></li>}
                </ul>
              </nav>
            </header>
            <main>
              <Routes>
                <Route path="/MyComponent" element={<MyComponent />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<PrivateRoute role={['2']} component={AdminComponent} />} />
                <Route path="/usuario" element={<PrivateRoute role={['1', '2']} component={UserComponent} />} />
                <Route path="/vendedor" element={<PrivateRoute role={['3']} component={Vendedor} />} />
                <Route path="/crear-producto" element={<PrivateRoute role={['2']} component={<CrearProducto />} />} />
                <Route path="/mostrar-usuarios" element={<PrivateRoute role={['2']} component={<MostrarUsuarios />} />} />
                <Route path="/logout" element={<LogoutButton />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <footer>
              <p>&copy; 2024 Ferretería Ferremas. Todos los derechos reservados.</p>
            </footer>
          </>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

function Homepage() {
  return (
    <>
      <Carrousel />
    </>
  );
}

export default App;

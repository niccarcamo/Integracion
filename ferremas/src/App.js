import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './js/Navbar';
import CrearProducto from './js/CrearProducto';
import MostrarUsuarios from './js/MostrarUsuarios';
import LogoutButton from './js/LogoutButton';
import MyComponent from './js/MyComponent';
import HeaderIndicators from './js/HeaderIndicators';
import CarouselComponent from './js/Carrousel';
import Register from './js/Register';
import Login from './js/Login';
import AdminComponent from './js/AdminComponent';
import UserComponent from './js/UserComponent';
import Vendedor from './js/Vendedor';
import ModificarProducto from './js/ModificarProducto';
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
            
              <h1 style={{ color: 'black' }}>Bienvenido a Ferretería Ferremas</h1>

              <HeaderIndicators />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/MyComponent" element={<MyComponent />} />
                <Route path="/admin" element={<AdminComponent />} />
                <Route path="/usuario" element={<UserComponent />} />
                <Route path="/vendedor" element={<Vendedor />} />
                <Route path="/crear-producto" element={<CrearProducto />} />
                <Route path="/modificar-producto/:id" element={<ModificarProducto />} />
                <Route path="/mostrar-usuarios" element={<MostrarUsuarios />} />
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
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

function Homepage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get('reloaded')) {
      params.set('reloaded', 'true');
      window.location.search = params.toString();
    }
  }, [location]);

  return (
    <>
      <CarouselComponent />
    </>
  );
}

export default App;

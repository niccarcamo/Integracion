import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './js/Navbar';
import CrearProducto from './js/CrearProducto';
import MostrarUsuarios from './js/MostrarUsuarios';  
import MyComponent from './js/MyComponent';
import HeaderIndicators from './js/HeaderIndicators';
import CarouselComponent from './js/Carrousel';
import Register from './js/Register';
import Login from './js/Login';
import PrivateRoute from './PrivateRoute';
import AdminComponent from './js/AdminComponent';
import UserComponent from './js/UserComponent';
import Vendedor from './js/Vendedor';
import LogoutButton from './js/LogoutButton';
import VistaInvitado from './js/VistaInvitado';

// Importa el componente VistaInvitado

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <div className="App">
        <Navbar isAdmin={role === '2'} />
        {token ? (
          <>
            <header>
              <div className="logo-container">
                <img className="Logo" id='Logo' src="/assets/Logoferremas.png" alt="Logo Ferremas" />
              </div>
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
                <Route path="/crear-producto" element={<PrivateRoute role={['2']} component={CrearProducto} />} />
                <Route path="/mostrar-usuarios" element={<PrivateRoute role={['2']} component={MostrarUsuarios} />} />
                <Route path="/LogoutButton" element={<LogoutButton />} />
                <Route path="/VistaInvitado" element={<VistaInvitado />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <footer>
              <p className="footer-letter">&copy; 2024 Ferretería Ferremas. Todos los derechos reservados.</p>
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
      <CarouselComponent />
    </>
  );
}

export default App;

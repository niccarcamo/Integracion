import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import MyComponent from './js/MyComponent';
import HeaderIndicators from './js/HeaderIndicators';
import CarouselComponent from './js/Carrousel';
import Register from './js/Register';
import Login from './js/Login';
import PrivateRoute from './PrivateRoute';
import AdminComponent from './js/AdminComponent';
import UserComponent from './js/UserComponent';
import Vendedor from './js/Vendedor'; // Asegúrate de que la ruta y el nombre coincidan
import LogoutButton from './js/LogoutButton';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <div className="App">
        {token ? (
          <>
            <header>
              <h1>Bienvenido a Ferretería Ferremas</h1>
              <HeaderIndicators />
              <nav>
                <ul>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/MyComponent">Herramienta</Link></li>
                  {role === '3' && <li><Link to="/vendedor">Vendedor</Link></li>} {/* Enlace al componente Vendedor */}
                  <li style={{ margin: '0 1em 0 56em' }}>Bienvenido {role === '2' ? 'Administrador' : role === '3' ? 'Vendedor' : 'Usuario'}</li>
                  <li><LogoutButton /></li> {/* Botón de cierre de sesión */}
                </ul>
              </nav>
            </header>
            <main>
              <Routes>
                <Route path="/MyComponent" element={<MyComponent />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<PrivateRoute role={['2']} component={AdminComponent} />} />
                <Route path="/usuario" element={<PrivateRoute role={['1', '2']} component={UserComponent} />} />
                <Route path="/vendedor" element={<PrivateRoute role={['3']} component={Vendedor} />} /> {/* Ruta para Vendedor */}
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
      <CarouselComponent />
    </>
  );
}

export default App;

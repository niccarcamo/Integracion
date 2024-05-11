import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa 'Routes' en lugar de 'Switch'
import Catalogo from './Catalogo';
import MyComponent from './MyComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Bienvenido a Ferretería Ferremas</h1>
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/MyComponent">Herramienta</Link></li> {/* Cambiado a /MyComponent */}
            </ul>
          </nav>
        </header>
        <main>
          <Routes> {/* Reemplaza Switch por Routes */}
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/MyComponent" element={<MyComponent />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Ferretería Ferremas. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

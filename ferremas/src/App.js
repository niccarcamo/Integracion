import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa 'Routes' en lugar de 'Switch'
import Catalogo from './Catalogo';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Bienvenido a Ferretería XYZ</h1>
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes> {/* Reemplaza Switch por Routes */}
            <Route path="/catalogo" element={<Catalogo />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Ferretería XYZ. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}
export default App;

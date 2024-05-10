# Integracion
// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Inicio from './Inicio';
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
          <Switch>
            <Route path="/" exact component={Inicio} />
            <Route path="/catalogo" component={Catalogo} />
          </Switch>
        </main>
        <footer>
          <p>&copy; 2024 Ferretería XYZ. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;


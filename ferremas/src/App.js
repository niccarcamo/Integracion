import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyComponent from './js/MyComponent';
import './js/fontAwesome';
import HeaderIndicators from './js/HeaderIndicators';
import CarouselComponent from './js/Carrousel';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Bienvenido a Ferretería Ferremas</h1>
          <HeaderIndicators />
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/MyComponent">Herramienta</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/MyComponent" element={<MyComponent />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Ferretería Ferremas. Todos los derechos reservados.</p>
        </footer>
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

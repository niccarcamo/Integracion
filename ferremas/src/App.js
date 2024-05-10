// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Bienvenido a Ferretería XYZ</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="productos">
          <h2>Nuestros Productos Destacados</h2>
          <div className="producto">
            <img src="producto1.jpg" alt="Producto 1" />
            <h3>Producto 1</h3>
            <p>Descripción del producto 1.</p>
          </div>
          <div className="producto">
            <img src="producto2.jpg" alt="Producto 2" />
            <h3>Producto 2</h3>
            <p>Descripción del producto 2.</p>
          </div>
          {/* Agrega más productos aquí */}
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Ferretería XYZ. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;

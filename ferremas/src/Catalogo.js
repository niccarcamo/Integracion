import React from 'react';

function Catalogo() {
  return (
    <section className="productos">
      <h2>Nuestros Productos Destacados</h2>
      <div className="producto">
        <a href="/catalogo/producto1">
          <img src="producto1.jpg" alt="Producto 1" />
          <h3>Producto 1</h3>
          <p>Descripción del producto 1.</p>
        </a>
      </div>
      <div className="producto">
        <a href="/catalogo/producto2">
          <img src="producto2.jpg" alt="Producto 2" />
          <h3>Producto 2</h3>
          <p>Descripción del producto 2.</p>
        </a>
      </div>
      {/* Agrega más productos aquí */}
    </section>
  );
}

export default Catalogo;

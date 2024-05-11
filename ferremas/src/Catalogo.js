import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Catalogo de Productos</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.idProducto}>{producto.nombreProducto}</li>
        ))}
      </ul>
    </div>
  );
};

export default Catalogo;

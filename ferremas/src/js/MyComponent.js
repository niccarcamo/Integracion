import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MyComponent.css';

function MyComponent() {
  
  const [nombre, setNombre] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (nombre.trim() !== '') {
      buscarProductos(nombre);
    } else {
      obtenerTodosLosProductos();
    }
  }, [nombre]);

  const obtenerTodosLosProductos = () => {
    axios.get('http://localhost:3001/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  };

  const buscarProductos = () => {
    axios.get(`http://localhost:3001/buscar-productos?nombre=${nombre}`)
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al buscar productos:', error);
      });
  };

  return (
    <div>
      <div class="busqueda">
        <input type="text" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
        placeholder="Ingrese nombre del producto" class="input_buscar"/>
      </div>
      <a href="#"><ul className="product-list">
        {productos.map(producto => (
          <li key={producto.idProducto}>
            <div className="product-card">
              <h2 className="product-card-title">{producto.nombreProducto}</h2>
              <div className="product-card-content">
                <p>ID: {producto.idProducto}</p>
                <p>{producto.descProducto}</p>
                <p>Precio: ${producto.precioProducto}</p>
                <p>Stock: {producto.stockProducto}</p>
                {producto.imagenProducto && (
                  <img src={producto.imagenProducto} alt={producto.nombreProducto} className="product-image" />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul></a>
    </div>
  );      
}

export default MyComponent;




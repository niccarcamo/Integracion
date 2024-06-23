import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserComponent = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchCompras = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/api/compras', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCompras(response.data);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchCompras();
  }, []);

  return (
    <div>
      <h1>Mis Compras</h1>
      <ul>
        {compras.map(compra => (
          <li key={compra.id}>
            <p>ID de la Compra: {compra.id}</p>
            <p>Total: ${compra.total}</p>
            <p>Fecha: {new Date(compra.fecha).toLocaleString()}</p>
            <ul>
              {compra.productos.map(producto => (
                <li key={producto.idProducto}>
                  {producto.nombreProducto} - ${producto.precioProducto} x {producto.cantidad}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;

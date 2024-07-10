import React, { useEffect, useState } from 'react';

const UserComponent = () => {
  const [compras, setCompras] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const storedCompras = JSON.parse(localStorage.getItem('compras')) || [];
    setCompras(storedCompras);
  }, []);

  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9); // Genera un ID único de 9 caracteres
  };

  const handleGuardarCompra = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const compraActual = {
      id: generateId(),
      total: calcularTotal(),
      fecha: new Date().toISOString(),
      productos: [...carrito]
    };

    const updatedCompras = [...compras, compraActual];
    setCompras(updatedCompras);
    localStorage.setItem('compras', JSON.stringify(updatedCompras));
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.total, 0);
  };

  return (
    <div>
      <h1>Mis Compras</h1>
      <button onClick={handleGuardarCompra}>Guardar Compra Localmente</button>
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MyComponent.css';

function MyComponent() {
  const [nombre, setNombre] = useState('');
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Cargar carrito desde localStorage al iniciar el componente
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

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

  const añadirAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.idProducto === producto.idProducto);
      if (productoExistente) {
        return prevCarrito.map(item => 
          item.idProducto === producto.idProducto 
            ? { ...item, cantidad: item.cantidad + 1, total: item.total + producto.precioProducto }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1, total: producto.precioProducto }];
      }
    });
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.idProducto === idProducto);
      if (productoExistente.cantidad > 1) {
        return prevCarrito.map(item =>
          item.idProducto === idProducto
            ? { ...item, cantidad: item.cantidad - 1, total: item.total - item.precioProducto }
            : item
        );
      } else {
        return prevCarrito.filter(item => item.idProducto !== idProducto);
      }
    });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.total, 0);
  };

  return (
    <div>
      <div className="busqueda">
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Ingrese nombre del producto" 
          className="input_buscar" 
        />
      </div>
      <ul className="product-list">
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
                <button onClick={() => añadirAlCarrito(producto)}>Añadir al carrito</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="carrito">
        <button className="carrito-boton" onClick={() => setMostrarCarrito(!mostrarCarrito)}>Carrito de compras</button>
        {mostrarCarrito && (
          <div className="carrito-desplegado">
            <ul>
              {carrito.map((producto) => (
                <li key={producto.idProducto}>
                  {producto.nombreProducto} - ${producto.precioProducto} x {producto.cantidad}
                  <button onClick={() => eliminarDelCarrito(producto.idProducto)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <p>Total a pagar: ${calcularTotal()}</p>
            <button>Pagar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MyComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function MyComponent() {
  const [nombre, setNombre] = useState('');
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    if (nombre.trim() !== '') {
      buscarProductos();
    } else {
      obtenerTodosLosProductos();
    }
  }, [nombre, token]); // Agregar token a las dependencias

  const obtenerTodosLosProductos = () => {
    axios.get('http://localhost:3001/api/productos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.error('Acceso no autorizado. Redirigiendo a la página de inicio de sesión.');
          // Aquí puedes redirigir a la página de inicio de sesión u otra acción adecuada
        } else {
          console.error('Error al obtener los productos:', error);
        }
      });
  };

  const buscarProductos = () => {
    axios.get(`http://localhost:3001/api/buscar-productos?nombre=${nombre}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.error('Acceso no autorizado. Redirigiendo a la página de inicio de sesión.');
          // Aquí puedes redirigir a la página de inicio de sesión u otra acción adecuada
        } else {
          console.error('Error al buscar productos:', error);
        }
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

  const aumentarCantidad = (idProducto) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.idProducto === idProducto
          ? { ...item, cantidad: item.cantidad + 1, total: item.total + item.precioProducto }
          : item
      )
    );
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.total, 0);
  };

  const handlePagar = async () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const buyOrder = `O-${Date.now()}`;
    const sessionId = `S-${Date.now()}`;
    const amount = calcularTotal();
    const returnUrl = 'http://localhost:3000/return';

    try {
      const response = await axios.post('http://localhost:3001/api/crear-transaccion', {
        buyOrder,
        sessionId,
        amount,
        returnUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { token: transactionToken, url } = response.data;
      const form = document.createElement('form');
      form.action = url;
      form.method = 'POST';

      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = transactionToken;
      form.appendChild(tokenInput);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error al crear la transacción:', error);
    }
  };

  return (
    <div>
      <div className="busqueda">
        <img className="Logo" src="/assets/Logoferremas.png" alt="Logo Ferremas" />
        <div className="input-container">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese nombre del producto"
            className="input_buscar"
          />
        </div>
        <div className="carrito">
          <button className="carrito-boton" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
            <FontAwesomeIcon icon={faCartShopping} className="icono_carrito" style={{ color: "#323133" }} />
          </button>

          {mostrarCarrito && (
            <div className="carrito-desplegado">
              <ul>
                {carrito.map((producto) => (
                  <li key={producto.idProducto}>
                    {producto.nombreProducto} - ${producto.precioProducto} x {producto.cantidad}
                    <div className="carrito-buttons">
                      <button onClick={() => eliminarDelCarrito(producto.idProducto)}>-</button>
                      <button onClick={() => aumentarCantidad(producto.idProducto)}>+</button>
                    </div>
                  </li>
                ))}
                <hr />
              </ul>

              <p>Total a pagar: ${calcularTotal()}</p>
              <button onClick={handlePagar}>Pagar con Webpay</button>
            </div>
          )}
        </div>
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

                <button className="boton_producto" onClick={() => añadirAlCarrito(producto)}>Añadir al carrito</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;

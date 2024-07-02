import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../css/MyComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPenToSquare} from '@fortawesome/free-solid-svg-icons';

const role = localStorage.getItem('role');

function MyComponent() {
  const [nombre, setNombre] = useState('');
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const obtenerTodosLosProductos = useCallback(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/api/productos', { headers: { Authorization: token } })
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const buscarProductos = useCallback(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3001/api/buscar-productos?nombre=${nombre}`, { headers: { Authorization: token } })
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al buscar productos:', error);
      });
  }, [nombre]);

  useEffect(() => {
    if (nombre.trim() !== '') {
      buscarProductos();
    } else {
      obtenerTodosLosProductos();
    }
  }, [nombre, buscarProductos, obtenerTodosLosProductos]);

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

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Guarda el ID del usuario cuando inicia sesión
    const total = calcularTotal();

    try {
      await axios.post('http://localhost:3001/api/guardar-compra', {
        carrito,
        userId,
        total
      }, { headers: { Authorization: token } });

      alert('Compra guardada exitosamente');
      // Aquí podrías redirigir al usuario a una página de confirmación o vaciar el carrito
      setCarrito([]);
    } catch (error) {
      console.error('Error al guardar la compra:', error);
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
              <button onClick={handlePagar}>Pagar</button>
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
                {role === '2' && (
                  <button class="boton_producto"  style={{ marginLeft: '1em', padding: '.4em .8em' }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminComponent = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    descProducto: '',
    precioProducto: '',
    stockProducto: '',
    imagenProducto: '',
    Categoria_idCategoria: '',
  });

  useEffect(() => {
    obtenerTodosLosProductos();
  }, []);

  const obtenerTodosLosProductos = () => {
    axios.get('http://localhost:3001/api/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/insertarProducto', nuevoProducto)
      .then(response => {
        alert('Producto agregado');
        obtenerTodosLosProductos();
      })
      .catch(error => {
        console.error('Error al agregar producto:', error);
      });
  };

  const marcarAgotado = (idProducto) => {
    axios.post(`http://localhost:3001/api/marcarAgotado/${idProducto}`)
      .then(response => {
        alert('Producto marcado como agotado');
        obtenerTodosLosProductos();
      })
      .catch(error => {
        console.error('Error al marcar producto como agotado:', error);
      });
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombreProducto" placeholder="Nombre del producto" onChange={handleChange} required />
        <input type="text" name="descProducto" placeholder="Descripción del producto" onChange={handleChange} required />
        <input type="number" name="precioProducto" placeholder="Precio del producto" onChange={handleChange} required />
        <input type="number" name="stockProducto" placeholder="Stock del producto" onChange={handleChange} required />
        <input type="text" name="imagenProducto" placeholder="URL de la imagen del producto" onChange={handleChange} required />
        <input type="number" name="Categoria_idCategoria" placeholder="ID de la categoría" onChange={handleChange} required />
        <button type="submit">Agregar Producto</button>
      </form>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.idProducto}>
            {producto.nombreProducto} - ${producto.precioProducto} - Stock: {producto.stockProducto}
            <button onClick={() => marcarAgotado(producto.idProducto)}>Marcar como Agotado</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComponent;

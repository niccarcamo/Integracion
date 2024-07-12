import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ModificarProducto.css';

function ModificarProducto() {
  const { id } = useParams(); // Obtiene el idProducto de la URL
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '2') {
      // Redirigir si el usuario no tiene el rol de Administrador
      navigate('/');
      return;
    }

    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3001/api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setProducto(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles del producto:', error);
      });
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:3001/api/productos/modificar/${id}`, producto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert('Producto actualizado exitosamente');
        navigate('/'); // Redirigir a la página principal o a otra página después de la actualización
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
        if (error.response) {
          // El servidor respondió con un estado fuera del rango 2xx
          console.error('Data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
          setError('Hubo un problema al actualizar el producto.');
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.error('Request:', error.request);
          setError('Hubo un problema al enviar la solicitud.');
        } else {
          // Algo sucedió al configurar la solicitud que provocó un error
          console.error('Error:', error.message);
          setError('Hubo un problema inesperado.');
        }
      });
  };

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="modificar-producto">
      <h1>Modificar Producto</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="nombreProducto"
            value={producto.nombreProducto}
            onChange={handleInputChange}
            className="input-modificar"
          />
        </div>
        <div className="input-container">
          <label>Descripción del Producto</label>
          <input
            type="text"
            name="descProducto"
            value={producto.descProducto}
            onChange={handleInputChange}
            className="input-modificar"
          />
        </div>
        <div className="input-container">
          <label>Precio del Producto</label>
          <input
            type="number"
            name="precioProducto"
            value={producto.precioProducto}
            onChange={handleInputChange}
            className="input-modificar"
          />
        </div>
        <div className="input-container">
          <label>Stock del Producto</label>
          <input
            type="number"
            name="stockProducto"
            value={producto.stockProducto}
            onChange={handleInputChange}
            className="input-modificar"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="boton-modificar">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default ModificarProducto;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CrearProducto.css';

const CrearProducto = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombreProducto: '',
    descProducto: '',
    precioProducto: '',
    imagenProducto: '', // Asegúrate de que coincida con el nombre de la columna en tu base de datos
    Categoria_idCategoria: '1', // Valor inicial para la categoría
  });
  const [token, setToken] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (role !== '2') {
      // Redirigir si el usuario no tiene el rol de Administrador
      navigate('/');
      return;
    }
    if (token) {
      setToken(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/insertarProducto', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Respuesta de la API:', response.data); // Para verificar la respuesta de la API
      alert('Producto creado exitosamente');
      setForm({
        nombreProducto: '',
        descProducto: '',
        precioProducto: '',
        imagenProducto: '', // Resetear a valor inicial para la imagen
        Categoria_idCategoria: '1', // Resetear a valor inicial para la categoría
      });
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="crear-producto">
      <h1>Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombreProducto" placeholder="Nombre del producto" value={form.nombreProducto} onChange={handleChange} required />
        <input type="text" name="descProducto" placeholder="Descripción del producto" value={form.descProducto} onChange={handleChange} required />
        <input type="number" name="precioProducto" placeholder="Precio del producto" value={form.precioProducto} onChange={handleChange} required />
        <input type="text" name="imagenProducto" placeholder="URL de la imagen del producto" value={form.imagenProducto} onChange={handleChange} required /> {/* Asegúrate de que coincida con el nombre del campo en tu formulario */}
        <select name="Categoria_idCategoria" value={form.Categoria_idCategoria} onChange={handleChange}>
          <option value="1">Categoría 1</option>
          <option value="2">Categoría 2</option>
          <option value="3">Categoría 3</option>
        </select>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;

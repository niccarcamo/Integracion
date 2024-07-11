import React, { useState } from 'react';
import axios from 'axios';

const CrearProducto = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/productos', form);
      alert('Producto creado exitosamente');
      setForm({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: ''
      });
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre del producto" value={form.nombre} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción del producto" value={form.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio del producto" value={form.precio} onChange={handleChange} required />
        <input type="text" name="imagen" placeholder="URL de la imagen del producto" value={form.imagen} onChange={handleChange} required />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './catalogo.css';
import taladro from'./assets/Taladro.jpg';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categoriasDesplegadas, setCategoriasDesplegadas] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Nuevo estado para controlar la categoría seleccionada

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  const toggleCategorias = () => {
    setCategoriasDesplegadas(!categoriasDesplegadas);
  };

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setCategoriasDesplegadas(false); // Ocultar la lista de categorías al seleccionar una categoría
  };

  // Objeto para mapear categorías a imágenes
  const imagenesCategorias = {
    Herramientas: taladro, // Agrega más categorías e imágenes aquí si es necesario
  };

  return (
    <div className="container">
      <h1 className="heading">Catálogo de Productos</h1>
      <div className="categoriasContainer">
        <button onClick={toggleCategorias} className="categoriasButton">Categorías</button>
        {categoriasDesplegadas && (
          <ul className="categoriasList">
            <li className="categoriaItem" onClick={() => handleCategoriaSeleccionada('Herramientas')}>Herramientas</li>
            <li className="categoriaItem" onClick={() => handleCategoriaSeleccionada('Baño')}>Baño</li>
            <li className="categoriaItem" onClick={() => handleCategoriaSeleccionada('Cocina')}>Cocina</li>
            <li className="categoriaItem" onClick={() => handleCategoriaSeleccionada('Dormitorio')}>Dormitorio</li>
            <li className="categoriaItem" onClick={() => handleCategoriaSeleccionada('Jardín')}>Jardín</li>
            <li className="categoriaItem" onClick={() => handleCategoriaSeleccionada('Decoración')}>Decoración</li>
          </ul>
        )}
      </div>
      {categoriaSeleccionada && ( // Mostrar la imagen solo si hay una categoría seleccionada
        <div className="imagenContainer">
          <img src={imagenesCategorias[categoriaSeleccionada]} alt={categoriaSeleccionada} className="imagenCategoria" />
        </div>
      )}
    </div>
  );
};

export default Catalogo;

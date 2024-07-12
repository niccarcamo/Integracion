import React, { useState } from 'react';
import '../css/Vendedor.css'; // Archivo de estilos CSS para el componente
import jsPDF from 'jspdf';

const Vendedor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);

  // Función para buscar productos por ID o nombre
  const handleSearch = async () => {
    // Realizar la búsqueda en la base de datos
    // Esto podría ser una llamada a tu API
    // Aquí solo es un ejemplo con datos estáticos
    const results = [
      { id: 1, name: 'Producto 1', price: 1000 },
      { id: 2, name: 'Producto 2', price: 2000 },
    ];
    setSearchResults(results);
  };

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Función para procesar el pago
  const handlePayment = () => {
    // Lógica de pago
    console.log('Procesando pago...');
  };

  // Función para imprimir/descargar la boleta
  const handleInvoice = () => {
    // Calcular el total de la compra
    const total = cart.reduce((acc, product) => acc + product.price, 0);

    // Generar el contenido del PDF
    const doc = new jsPDF();
    doc.text('Boleta de Compra', 20, 10);

    let y = 30;
    cart.forEach((product, index) => {
      const text = `${product.name} - $${product.price}`;
      doc.text(text, 20, y);
      y += 10;
    });

    // Agregar el total al final del documento
    doc.text(`Total: $${total}`, 20, y + 10);

    // Descargar el PDF
    doc.save('boleta_compra.pdf');
  };

  // Función para enviar la boleta por correo
  const handleSendInvoice = () => {
    // Lógica para enviar la boleta por correo
    console.log('Enviando boleta por correo...');
  };

  return (
    <div className="vendedor-container">
      <h1>Panel de Vendedor</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar producto por ID o nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="results-container">
        <h2>Resultados de Búsqueda</h2>
        {searchResults.map((product) => (
          <div key={product.id} className="product-item">
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
          </div>
        ))}
      </div>

      <div className="cart-container">
        <h2>Carrito de Compras</h2>
        {cart.map((product, index) => (
          <div key={index} className="cart-item">
            <p>{product.name} - ${product.price}</p>
          </div>
        ))}
      </div>

      <div className="actions-container">
        <button onClick={handleInvoice}>Imprimir/Descargar Boleta</button>
      </div>
    </div>
  );
};

export default Vendedor;

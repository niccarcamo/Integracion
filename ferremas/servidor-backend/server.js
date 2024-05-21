const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const PORT = 3001; // Define el puerto en el que deseas que escuche el servidor

const db = mysql.createConnection({
  host: 'localhost',
  user: 'general',
  password: 'admin',
  database: 'ferremas'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con MySQL');
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM Producto', (err, result) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
      return;
    }
    const productos = result.map(producto => {
      if (producto.imagenProducto) {
        // Convertir imagen BLOB a base64
        producto.imagenProducto = 'data:image/webp;base64,' + Buffer.from(producto.imagenProducto, 'binary').toString('base64');
      }
      return producto;
    });
    res.status(200).send(productos);
  });
});

// Ruta para buscar productos por nombre
app.get('/buscar-productos', (req, res) => {
  const nombreProducto = req.query.nombre;
  const query = `SELECT * FROM Producto WHERE nombreProducto LIKE ?`;
  const values = [`%${nombreProducto}%`];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al buscar productos:', err);
      res.status(500).send('Error al buscar productos');
      return;
    }
    const productos = result.map(producto => {
      if (producto.imagenProducto) {
        // Convertir imagen BLOB a base64
        producto.imagenProducto = 'data:image/webp;base64,' + Buffer.from(producto.imagenProducto, 'binary').toString('base64');
      }
      return producto;
    });
    res.status(200).send(productos);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

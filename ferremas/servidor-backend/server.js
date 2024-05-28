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

app.use(express.json()); // Middleware para parsear JSON

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM Producto', (err, result) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
      return;
    }
    res.status(200).send(result);
  });
});

// Ruta para buscar productos por nombre
app.get('/api/buscar-productos', (req, res) => {
  const nombreProducto = req.query.nombre;
  const query = `SELECT * FROM Producto WHERE nombreProducto LIKE ?`;
  const values = [`%${nombreProducto}%`];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al buscar productos:', err);
      res.status(500).send('Error al buscar productos');
      return;
    }
    res.status(200).send(result);
  });
});

// Ruta para insertar un producto
app.post('/api/insertarProducto', (req, res) => {
  const { nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria } = req.body;

  const sql = `INSERT INTO Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error insertando datos:', err.stack);
      res.status(500).send('Error insertando datos');
      return;
    }
    console.log('Producto insertado con id:', results.insertId);
    res.status(200).send('Producto insertado con id: ' + results.insertId);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

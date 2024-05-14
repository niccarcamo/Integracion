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

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM Producto', (err, result) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
      return;
    }
    res.status(200).send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

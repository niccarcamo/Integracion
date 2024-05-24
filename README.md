iniciar la base de datos:

0.- Algunos datos para poblar la base:
-----------------------------------------------------------------------------------------------------------------------
-- Insertar datos en la tabla Categoria

INSERT INTO Ferremas.Categoria (nombreCategoria) VALUES ('Herramientas');
INSERT INTO Ferremas.Categoria (nombreCategoria) VALUES ('Materiales');
INSERT INTO Ferremas.Categoria (nombreCategoria) VALUES ('Electrodomésticos');

-- Insertar datos en la tabla Producto

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) VALUES ('Martillo', 'Martillo de acero resistente', 15000, 50, "https://drive.google.com/file/d/1SMhQcxC86LQqOC-X75DFT5tCQ40DjvKO/view?usp=drive_link", 1);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) VALUES ('Clavos', 'Clavos de hierro galvanizado', 3000, 100, "https://drive.google.com/file/d/1uZAziQ97MZueH6F5ycYDAUd4xy23AeJz/view?usp=drive_link", 1);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) VALUES ('Taladro', 'Taladro eléctrico inalámbrico', 80000, 30, "https://drive.google.com/file/d/1kSYsHGeXGh_0RBitbZnunlCYis6HFEfH/view?usp=drive_link", 1);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) VALUES ('Cemento', 'Cemento Portland de alta calidad', 15000, 80, "https://drive.google.com/file/d/1zXnGxMijk_JY5IIPbkG12kPu75S2gJGe/view?usp=drive_link", 2);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) VALUES ('Madera', 'Madera de pino', 5000, 200, "https://drive.google.com/file/d/1hKIF7abs7IHi0yyYckYB_-tGmzr2yZPk/view?usp=drive_link", 2);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, imagenProducto, Categoria_idCategoria) VALUES ('Sierra Circular', 'Cierra Circular Makita', 150000, 20, "https://drive.google.com/file/d/1PuZAXf-pInxYDkb2yuAmC7O-g4dpuKIN/view?usp=drive_link", 3);

--------------------------------------------------------------------------------------------------------------------

Pasos para conectar la Base de Datos Ferremas:

1.- Crear un usuario en MYSQL: 
CREATE USER 'general'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

2.- Dar privilegios al usuario en MYSQL: 
GRANT ALL PRIVILEGES ON * TO 'general'@'localhost' WITH GRANT OPTION;

3.- En la terminal de VSC : 
	1. cd ferremas 
	2. cd servidor-backend 
	3. node server.js

4.- sin cerrar la terminal abres otra y: 
	1. cd ferremas 
	2. npm start




STRIPE
---------------------------------------------------------------------------------------------------------------------
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe('TU_CLAVE_SECRETA'); // Reemplaza 'TU_CLAVE_SECRETA' con tu clave secreta de Stripe

const app = express();
const PORT = process.env.PORT || 3001; // Define el puerto en el que deseas que escuche el servidor

// Configuración de la base de datos MySQL
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

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

// Endpoint para obtener productos
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

// Endpoint para crear una intención de pago
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

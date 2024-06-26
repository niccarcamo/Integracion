const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const { WebpayPlus } = require('transbank-sdk');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

const PORT = 3001; // Define el puerto en el que deseas que escuche el servidor
const SECRET_KEY = 'your_secret_key'; // Define una clave secreta para los tokens JWT

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
  origin: ['http://localhost:3000', 'http://192.168.1.182:3000'], // Permitir localhost y la IP de red local
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir estos métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
  credentials: true // Permitir envío de credenciales (opcional)
}));

app.use(express.json()); // Middleware para parsear JSON

// Middleware de autorización
const authorize = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send('Acceso denegado');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Token no válido');
      }

      if (roles.length && !roles.includes(decoded.rol)) {
        return res.status(403).send('Permiso denegado');
      }

      req.user = decoded;
      next();
    });
  };
};

// Ruta para registrar usuarios
app.post('/api/register', async (req, res) => {
  const { nombreUsuario, contrasenaUsuario, emailUsuario, direccionUsuario, rol } = req.body;
  const hashedPassword = await bcrypt.hash(contrasenaUsuario, 8);

  const sql = 'INSERT INTO Usuario (nombreUsuario, contrasenaUsuario, emailUsuario, direccionUsuario, Rol_idRol) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombreUsuario, hashedPassword, emailUsuario, direccionUsuario, rol], (err, results) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Error al registrar usuario');
      return;
    }
    res.status(200).send('Usuario registrado');
  });
});

// Ruta para autenticar usuarios
app.post('/api/login', (req, res) => {
  const { emailUsuario, contrasenaUsuario } = req.body;

  const sql = 'SELECT * FROM Usuario WHERE emailUsuario = ?';
  db.query(sql, [emailUsuario], async (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      res.status(500).send('Error al buscar usuario');
      return;
    }
    if (results.length === 0 || !(await bcrypt.compare(contrasenaUsuario, results[0].contrasenaUsuario))) {
      res.status(400).send('Credenciales incorrectas');
      return;
    }

    const token = jwt.sign({ idUsuario: results[0].idUsuario, rol: results[0].Rol_idRol }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: results[0].Rol_idRol });
  });
});

// Ruta para obtener todos los productos
app.get('/api/productos', authorize([1, 2]), (req, res) => {
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
app.get('/api/buscar-productos', authorize([1, 2]), (req, res) => {
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
app.post('/api/insertarProducto', authorize([2]), (req, res) => {
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

// Ruta para marcar un producto como agotado
app.post('/api/marcarAgotado/:idProducto', authorize([2]), (req, res) => {
  const { idProducto } = req.params;

  const sql = 'UPDATE Producto SET stockProducto = 0 WHERE idProducto = ?';
  db.query(sql, [idProducto], (err, results) => {
    if (err) {
      console.error('Error al marcar producto como agotado:', err);
      res.status(500).send('Error al marcar producto como agotado');
      return;
    }
    res.status(200).send('Producto marcado como agotado');
  });
});

// Ruta para obtener los indicadores diarios desde mindicador.cl
app.get('/api/indicators', async (req, res) => {
  try {
    const response = await axios.get('https://mindicador.cl/api');
    const { uf, dolar, utm, euro } = response.data;

    res.json({
      uf: uf.valor,
      dolar: dolar.valor,
      utm: utm.valor,
      euro: euro.valor,
    });
  } catch (error) {
    console.error('Error fetching indicators:', error);
    res.status(500).json({ error: 'Error fetching indicators' });
  }
});

// Ruta para crear una transacción
app.post('/api/crear-transaccion', async (req, res) => {
  const { buyOrder, sessionId, amount, returnUrl } = req.body;

  try {
    const response = await (new WebpayPlus.Transaction()).create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    res.json(response);
  } catch (error) {
    console.error('Error al crear la transacción:', error);
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
});

//VERIFICACIÓN
// Ruta para verificar si un correo existe en la tabla de usuarios
app.get('/api/verificar-correo', (req, res) => {
  const emailUsuario = req.query.email;

  const sql = 'SELECT * FROM Usuario WHERE emailUsuario = ?';
  db.query(sql, [emailUsuario], (err, results) => {
    if (err) {
      console.error('Error al verificar correo:', err);
      res.status(500).send('Error al verificar correo');
      return;
    }
    
    if (results.length > 0) {
      res.status(200).json(results[0]); // Devuelve el primer resultado encontrado
    } else {
      res.status(404).send('Correo no encontrado');
    }
  });
});


// Ruta para guardar los detalles de una compra
app.post('/api/guardar-compra', authorize([1]), (req, res) => {
  const { carrito, userId, total } = req.body;

  const sqlPedido = 'INSERT INTO Pedido (precioPedido, estadoPedido, Usuario_idUsuario) VALUES (?, "Pendiente", ?)';
  db.query(sqlPedido, [total, userId], (err, results) => {
    if (err) {
      console.error('Error al guardar el pedido:', err);
      res.status(500).send('Error al guardar el pedido');
      return;
    }

    const pedidoId = results.insertId;

    const sqlDetalles = 'INSERT INTO Productos_Carrito (cantidadProductos_Carrito, Producto_idProducto, Carrito_idCarrito) VALUES ?';
    const detalles = carrito.map(item => [item.cantidad, item.idProducto, pedidoId]);

    db.query(sqlDetalles, [detalles], (err) => {
      if (err) {
        console.error('Error al guardar los detalles del pedido:', err);
        res.status(500).send('Error al guardar los detalles del pedido');
        return;
      }
      res.status(200).send('Compra guardada exitosamente');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

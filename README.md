iniciar la base de datos:

0.- algunos datos para poblar la base:
-----------------------------------------------------------------------------------------------------------------------
-- Insertar datos en la tabla Categoria
INSERT INTO Ferremas.Categoria (nombreCategoria) VALUES ('Herramientas');
INSERT INTO Ferremas.Categoria (nombreCategoria) VALUES ('Materiales');
INSERT INTO Ferremas.Categoria (nombreCategoria) VALUES ('Electrodomésticos');

-- Insertar datos en la tabla Producto
INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, Categoria_idCategoria) 
VALUES ('Martillo', 'Martillo de acero resistente', 20, 50, 1);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, Categoria_idCategoria) 
VALUES ('Clavos', 'Clavos de hierro galvanizado', 5, 100, 1);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, Categoria_idCategoria) 
VALUES ('Taladro', 'Taladro eléctrico inalámbrico', 80, 30, 1);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, Categoria_idCategoria) 
VALUES ('Cemento', 'Cemento Portland de alta calidad', 15, 80, 2);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, Categoria_idCategoria) 
VALUES ('Ladrillos', 'Ladrillos de arcilla cocida', 0.5, 200, 2);

INSERT INTO Ferremas.Producto (nombreProducto, descProducto, precioProducto, stockProducto, Categoria_idCategoria) 
VALUES ('Tostadora', 'Tostadora de pan automática', 25, 50, 3);
--------------------------------------------------------------------------------------------------------------------





1.- crear un usuario en mysql:    CREATE USER 'nuevo_usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña';

2.- dar privilegios al usuario en mysql:   GRANT ALL PRIVILEGES ON *.* TO 'nuevo_usuario'@'localhost' WITH GRANT OPTION;



3.-en visual studio dirigirse a la carpeta servidor-backend y cambiar el usuario y contraseña:

const db = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'contraseña',
  database: 'ferremas'
});


4.-en la terminal de visual : 1.  cd ferremas     2.    cd servidor-backend    3.    node server.js


5.- sin cerrar la terminal abres otra y: 1.      cd ferremas        2.     npm start

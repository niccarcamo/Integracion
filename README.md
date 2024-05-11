iniciar la base de datos:

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

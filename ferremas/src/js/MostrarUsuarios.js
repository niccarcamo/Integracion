import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MostrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  return (
    <div>
      <h2>Mostrar Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.Rol_idRol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarUsuarios;
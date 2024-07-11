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

  const handleEditarUsuario = (idUsuario) => {
    // Lógica para editar el usuario
    console.log(`Editar usuario con id ${idUsuario}`);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>{usuario.rol}</td>
              <td>
                <button onClick={() => handleEditarUsuario(usuario.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarUsuarios;

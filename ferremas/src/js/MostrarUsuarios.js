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

  const handleChangeRol = (idUsuario, nuevoRol) => {
    const updatedUsuarios = usuarios.map(usuario =>
      usuario.idUsuario === idUsuario ? { ...usuario, Rol_idRol: parseInt(nuevoRol) } : usuario
    );
    setUsuarios(updatedUsuarios);
  };

  const handleSubmit = async (idUsuario, nuevoRol) => {
    try {
      await axios.put(`http://localhost:3001/api/usuarios/${idUsuario}`, { Rol_idRol: parseInt(nuevoRol) });
      console.log(`Rol actualizado correctamente para el usuario ${idUsuario}`);
    } catch (error) {
      console.error(`Error al actualizar el rol del usuario ${idUsuario}:`, error);
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
            <th>Cambiar Rol</th>
            <th>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>{usuario.Rol_idRol}</td>
              <td>
                <select
                  value={usuario.Rol_idRol}
                  onChange={(e) => handleChangeRol(usuario.idUsuario, e.target.value)}
                >
                  <option value={1}>Rol 1</option>
                  <option value={2}>Rol 2</option>
                  <option value={3}>Rol 3</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleSubmit(usuario.idUsuario, usuario.Rol_idRol)}>
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarUsuarios;

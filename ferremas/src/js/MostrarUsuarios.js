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

  const styles = {
    usuariosContainer: {
      margin: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px',
      backgroundColor: '#f2f2f2',
    },
    td: {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px',
    },
    btnActualizar: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '8px 12px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.usuariosContainer}>
      <h2>Mostrar Usuarios</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre de Usuario</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Rol</th>
            <th style={styles.th}>Cambiar Rol</th>
            <th style={styles.th}>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.idUsuario}>
              <td style={styles.td}>{usuario.nombreUsuario}</td>
              <td style={styles.td}>{usuario.emailUsuario}</td>
              <td style={styles.td}>{usuario.Rol_idRol}</td>
              <td style={styles.td}>
                <select
                  value={usuario.Rol_idRol}
                  onChange={(e) => handleChangeRol(usuario.idUsuario, e.target.value)}
                >
                  <option value={1}>Rol 1</option>
                  <option value={2}>Rol 2</option>
                  <option value={3}>Rol 3</option>
                </select>
              </td>
              <td style={styles.td}>
                <button style={styles.btnActualizar} onClick={() => handleSubmit(usuario.idUsuario, usuario.Rol_idRol)}>
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

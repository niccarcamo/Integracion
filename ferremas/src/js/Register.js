import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Registro.css';

const Register = () => {
  const [form, setForm] = useState({
    nombreUsuario: '',
    contrasenaUsuario: '',
    emailUsuario: '',
    direccionUsuario: '',
    rol: 1 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/register', form);
      alert('Usuario registrado');
      navigate('/login'); 
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="nombreUsuario" placeholder="Nombre" onChange={handleChange} required />
        <input type="password" name="contrasenaUsuario" placeholder="Contraseña" onChange={handleChange} required />
        <input type="email" name="emailUsuario" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="direccionUsuario" placeholder="Dirección" onChange={handleChange} required />
        <button type="submit">Registrar</button>
        <div className="login-link">
          <button type="button" onClick={handleNavigateToLogin}>Ya estoy registrado, ir a Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

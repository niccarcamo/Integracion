import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Registro.css'; 

const Login = () => {
  const [form, setForm] = useState({
    emailUsuario: '',
    contrasenaUsuario: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.idUsuario); 
      localStorage.setItem('role', response.data.role); 
      alert('Inicio de sesión exitoso');
      navigate('/'); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" name="emailUsuario" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="contrasenaUsuario" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

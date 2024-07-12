import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Registro.css';

const Login = () => {
  const [form, setForm] = useState({
    emailUsuario: '',
    contrasenaUsuario: '',
  });
  const [error, setError] = useState('');
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
      navigate('/');
      alert('Inicio de sesión exitoso');
      window.location.reload(); // Recargar la página después de navegar a '/'
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Contraseña o Email incorrecto.');
    }
  };

  return (
    <div className="auth-container login_fondo">
      <div className="login">
        <h1>Ingresar</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="emailUsuario"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contrasenaUsuario"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
          <div className="container">
            <button type="submit">Login</button>
            <Link to="/register">
              <button type="button">Volver</button>
            </Link>
          </div>
        </form>
        <div className="container">
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

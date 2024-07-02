import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Registro.css';

const Register = () => {
  const [form, setForm] = useState({
    nombreUsuario: '',
    contrasenaUsuario: '',
    emailUsuario: '',
    direccionUsuario: '',
    rol: 1,
  });
  const [message, setMessage] = useState('');
  const [hovered, setHovered] = useState(false); // Estado para el hover del botón

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get('reloaded')) {
      params.set('reloaded', 'true');
      window.location.search = params.toString();
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verificarCorreo = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/verificar-correo?email=${form.emailUsuario}`);
      if (response.status === 200) {
        setMessage('Este correo ya está registrado');
        return false; // Indica que el correo está registrado
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return true; // Indica que el correo no está registrado
      } else {
        console.error('Error al verificar correo:', error);
        setMessage('Error al verificar correo');
        return false;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const correoValido = await verificarCorreo();
    if (!correoValido) return;

    try {
      await axios.post('http://localhost:3001/api/register', form);
      alert('Usuario registrado');
      // Limpiar el formulario después del registro exitoso
      setForm({
        nombreUsuario: '',
        contrasenaUsuario: '',
        emailUsuario: '',
        direccionUsuario: '',
        rol: 1,
      });
      // Solo navegar a la página de login si el registro fue exitoso y el correo no estaba repetido
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="auth-container registro_fondo">
      <div className="registro">
        <h1>Registro de usuario</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombreUsuario"
            placeholder="Nombre"
            value={form.nombreUsuario}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contrasenaUsuario"
            placeholder="Contraseña"
            value={form.contrasenaUsuario}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="emailUsuario"
            placeholder="Email"
            value={form.emailUsuario}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccionUsuario"
            placeholder="Dirección"
            value={form.direccionUsuario}
            onChange={handleChange}
            required
          />
          <div className="container">
            <button type="submit">Registrar</button>
          </div>
          <div className="login-link">
            <button
              type="button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate('/login')}
            >
              {hovered ? 'Haz click aquí para iniciar sesión' : 'Ya tengo una cuenta'}
            </button>
          </div>
          <div class="container">
            {message && <p className="error-message">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
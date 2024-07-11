import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Registro.css';

const Register = () => {
  const [form, setForm] = React.useState({
    nombreUsuario: '',
    contrasenaUsuario: '',
    emailUsuario: '',
    direccionUsuario: '',
    rol: 1,
  });
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

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
      setForm({
        nombreUsuario: '',
        contrasenaUsuario: '',
        emailUsuario: '',
        direccionUsuario: '',
        rol: 1,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const handleGuestLogin = () => {
    // Redirige directamente a la página principal ("/") al hacer clic en "Iniciar como invitado"
    navigate('/');
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
          <div>
            {/* Utiliza Link en lugar de button para redirigir directamente a la página principal */}
            <Link to="/" className="boton-invitado" onClick={handleGuestLogin}>
              Iniciar como invitado
            </Link>
          </div>
          <div className="login-link">
            <button type="button" onClick={() => navigate('/login')}>
              Ya tengo una cuenta
            </button>
          </div>
          <div className="container">
            {message && <p className="error-message">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register } = useData();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(username, password);
      setSuccess('¡Registro exitoso! Redirigiendo a la página principal...');
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej. usuario123"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-button">Registrarse</button>
          {error && <p className="form-message error">{error}</p>}
          {success && <p className="form-message success">{success}</p>}
        </form>
        <p className="auth-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
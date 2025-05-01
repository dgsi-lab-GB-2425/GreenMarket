import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useData();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(username, password);
      setSuccess('¡Inicio de sesión exitoso! Redirigiendo a la página principal...');
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
    <div className="login-page">
      <div className="container">
        <h1>Iniciar Sesión</h1>
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
          <button type="submit" className="form-button">Iniciar Sesión</button>
          {error && <p className="form-message error">{error}</p>}
          {success && <p className="form-message success">{success}</p>}
        </form>
        <p className="auth-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
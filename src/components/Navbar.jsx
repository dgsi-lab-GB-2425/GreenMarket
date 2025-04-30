import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

function Navbar() {
  const { currentUser, logout } = useData();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">GreenMarket</Link>
        <div className="navbar-links">
          {currentUser ? (
            <>
              <span className="navbar-user">Bienvenido, {currentUser.username}</span>
              <Link to="/pedidos" className="navbar-link">Pedidos</Link>
              <Link to="/logistica" className="navbar-link">Logística</Link>
              <Link to="/trazabilidad" className="navbar-link">Trazabilidad</Link>
              <button onClick={logout} className="navbar-link logout-button">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
              <Link to="/register" className="navbar-link">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
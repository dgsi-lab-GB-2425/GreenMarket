// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">GreenMarket</Link>
        <div className="navbar-links">
          <Link to="/pedidos" className="navbar-link">Pedidos</Link>
          <Link to="/logistica" className="navbar-link">Logística</Link>
          <Link to="/trazabilidad" className="navbar-link">Trazabilidad</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
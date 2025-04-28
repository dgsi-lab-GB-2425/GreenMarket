// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pedidos from './pages/Pedidos';
import Logistica from './pages/Logistica';
import Trazabilidad from './pages/Trazabilidad';

// Componente opcional para ruta no encontrada
function NotFound() {
  return (
    <div className="container">
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      {/* Proveedor de contexto para simular datos */}
      <Router>
        {/* Enrutador para navegación entre páginas */}
        <div className="app">
          {/* Barra de navegación común */}
          <Navbar />
          {/* Definición de rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/logistica" element={<Logistica />} />
            <Route path="/trazabilidad" element={<Trazabilidad />} />
            {/* Ruta catch-all para URLs no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
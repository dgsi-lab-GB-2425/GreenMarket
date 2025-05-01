import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pedidos from './pages/Pedidos';
import Logistica from './pages/Logistica';
import Trazabilidad from './pages/Trazabilidad';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Componente para ruta no encontrada
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
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/pedidos"
              element={
                <ProtectedRoute>
                  <Pedidos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logistica"
              element={
                <ProtectedRoute>
                  <Logistica />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trazabilidad"
              element={
                <ProtectedRoute>
                  <Trazabilidad />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
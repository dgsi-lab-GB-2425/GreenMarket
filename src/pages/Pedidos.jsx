// src/pages/Pedidos.jsx
import PedidoForm from '../components/PedidoForm';
import PedidoList from '../components/PedidoList';

function Pedidos() {
  return (
    <div className="pedidos-page">
      <div className="container">
        <h1>Gestión de Pedidos</h1>
        <PedidoForm />
        <PedidoList />
      </div>
    </div>
  );
}

export default Pedidos;
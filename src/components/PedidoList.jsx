import { useState } from 'react';
import { useData } from '../context/DataContext';
import PedidoForm from './PedidoForm';

function PedidoList() {
  const { pedidos, deletePedido } = useData();
  const [editPedido, setEditPedido] = useState(null);

  return (
    <div className="pedido-list">
      <h2>Lista de Pedidos</h2>
      {editPedido && (
        <PedidoForm pedidoEdit={editPedido} onClose={() => setEditPedido(null)} />
      )}
      <div className="pedido-grid">
        {pedidos.length === 0 && <p>No hay pedidos aún.</p>}
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-item">
            <div className="pedido-info">
              <p><strong>ID:</strong> {pedido.id}</p>
              <p><strong>Productos:</strong> {pedido.productos.join(', ')}</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
              <p><strong>Fecha:</strong> {new Date(pedido.createdAt).toLocaleString()}</p>
            </div>
            <div className="pedido-actions">
              {pedido.estado === 'Pendiente' && (
                <>
                  <button
                    onClick={() => setEditPedido(pedido)}
                    className="action-button edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletePedido(pedido.id)}
                    className="action-button delete-button"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PedidoList;
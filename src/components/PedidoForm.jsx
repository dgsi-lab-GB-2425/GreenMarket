// src/components/PedidoForm.jsx
import { useState } from 'react';
import { useData } from '../context/DataContext'; // Asegúrate de que la ruta sea correcta

function PedidoForm({ pedidoEdit = null, onClose = () => {} }) {
  const { addPedido, updatePedido } = useData();
  const [productos, setProductos] = useState(pedidoEdit ? pedidoEdit.productos.join(',') : '');
  const [estado, setEstado] = useState(pedidoEdit ? pedidoEdit.estado : 'Pendiente');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productos) {
      setMensaje('Ingresa al menos un producto');
      return;
    }
    const nuevoPedido = {
      usuarioId: 1,
      productos: productos.split(',').map((p) => p.trim()),
      estado,
      createdAt: new Date().toISOString(),
    };
    if (pedidoEdit) {
      updatePedido(pedidoEdit.id, nuevoPedido);
      setMensaje('¡Pedido actualizado!');
    } else {
      addPedido(nuevoPedido);
      setMensaje('¡Pedido creado!');
    }
    setProductos('');
    setTimeout(() => {
      setMensaje('');
      onClose();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="pedido-form">
      <h2>{pedidoEdit ? 'Editar Pedido' : 'Crear Pedido'}</h2>
      <div className="form-group">
        <label>Productos (separados por comas)</label>
        <input
          type="text"
          value={productos}
          onChange={(e) => setProductos(e.target.value)}
          placeholder="Ej. Tomate, Lechuga"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} className="form-input">
          <option value="Pendiente">Pendiente</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
        </select>
      </div>
      <button type="submit" className="form-button">
        {pedidoEdit ? 'Actualizar' : 'Crear'}
      </button>
      {mensaje && <p className="form-message">{mensaje}</p>}
    </form>
  );
}

export default PedidoForm;
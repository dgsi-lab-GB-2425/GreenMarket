import { useState } from 'react';
import { useData } from '../context/DataContext';
import { productImages } from './MapaRutas';

function PedidoForm({ pedidoEdit = null, onClose = () => {} }) {
  const { addPedido, updatePedido, trazabilidad } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(
    pedidoEdit ? pedidoEdit.productos.map(producto => ({ name: producto, quantity: 1 })) : []
  );
  const [mensaje, setMensaje] = useState('');

  // Filtrar productos según el término de búsqueda
  const filteredProducts = trazabilidad.filter(item =>
    item.producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar la selección de un producto
  const handleSelectProduct = (producto) => {
    if (!selectedProducts.some(p => p.name === producto)) {
      setSelectedProducts([...selectedProducts, { name: producto, quantity: 1 }]);
    }
    setSearchTerm('');
  };

  // Manejar el cambio de cantidad
  const handleQuantityChange = (name, quantity) => {
    setSelectedProducts(
      selectedProducts.map(p =>
        p.name === name ? { ...p, quantity: Math.max(1, parseInt(quantity) || 1) } : p
      )
    );
  };

  // Eliminar un producto seleccionado
  const handleRemoveProduct = (name) => {
    setSelectedProducts(selectedProducts.filter(p => p.name !== name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      setMensaje('Selecciona al menos un producto');
      return;
    }
    const nuevoPedido = {
      usuarioId: 1,
      productos: selectedProducts.map(p => p.name),
      estado: pedidoEdit ? pedidoEdit.estado : 'Pendiente', // Mantiene el estado existente o usa Pendiente
      createdAt: new Date().toISOString(),
    };
    if (pedidoEdit) {
      updatePedido(pedidoEdit.id, nuevoPedido);
      setMensaje('¡Pedido actualizado!');
    } else {
      addPedido(nuevoPedido);
      setMensaje('¡Pedido creado!');
    }
    setSelectedProducts([]);
    setTimeout(() => {
      setMensaje('');
      onClose();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="pedido-form">
      <h2>{pedidoEdit ? 'Editar Pedido' : 'Crear Pedido'}</h2>
      <div className="form-group">
        <label>Buscar Productos</label>
        <div className="product-search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej. Tomate, Lechuga..."
            className="form-input"
          />
          {searchTerm && filteredProducts.length > 0 && (
            <div className="product-search-suggestions">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="product-search-suggestion"
                  onClick={() => handleSelectProduct(item.producto)}
                >
                  {item.producto}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedProducts.length > 0 && (
        <div className="selected-products-list">
          {selectedProducts.map((product) => (
            <div key={product.name} className="selected-product-item">
              <img
                src={productImages[product.name] || 'https://via.placeholder.com/50?text=Sin+Imagen'}
                alt={product.name}
                className="selected-product-image"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/50?text=Sin+Imagen';
                }}
              />
              <div className="selected-product-info">
                <span>{product.name}</span>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.name, e.target.value)}
                  min="1"
                  className="quantity-selector"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.name)}
                  className="remove-product-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button type="submit" className="form-button">
        {pedidoEdit ? 'Actualizar' : 'Crear'}
      </button>
      {mensaje && <p className="form-message">{mensaje}</p>}
    </form>
  );
}

export default PedidoForm;
// src/context/DataContext.jsx
import { createContext, useContext, useState } from 'react';
import { pedidos as initialPedidos, trazabilidad as initialTrazabilidad } from '../mocks/data';

// Crear el contexto
const DataContext = createContext();

// Proveedor del contexto
export function DataProvider({ children }) {
  const [pedidos, setPedidos] = useState(initialPedidos);
  const [trazabilidad] = useState(initialTrazabilidad);
  const [feedback, setFeedback] = useState([]);

  const addPedido = (pedido) => {
    setPedidos([...pedidos, { id: pedidos.length + 1, ...pedido }]);
  };

  const updatePedido = (id, updatedPedido) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { id, ...updatedPedido } : p)));
  };

  const deletePedido = (id) => {
    setPedidos(pedidos.filter((p) => p.id !== id));
  };

  const addFeedback = (newFeedback) => {
    setFeedback([...feedback, { id: feedback.length + 1, ...newFeedback }]);
  };

  return (
    <DataContext.Provider
      value={{ pedidos, trazabilidad, feedback, addPedido, updatePedido, deletePedido, addFeedback }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useData() {
  return useContext(DataContext);
}
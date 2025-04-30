import { createContext, useContext, useState } from 'react';
import { pedidos as initialPedidos, trazabilidad as initialTrazabilidad } from '../mocks/data';

// Crear el contexto
const DataContext = createContext();

// Proveedor del contexto
export function DataProvider({ children }) {
  const [pedidos, setPedidos] = useState(initialPedidos);
  const [trazabilidad] = useState(initialTrazabilidad);
  const [feedback, setFeedback] = useState([]);
  const [users, setUsers] = useState([]); // Lista de usuarios registrados
  const [currentUser, setCurrentUser] = useState(null); // Usuario actualmente autenticado

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

  // Función para registrar un nuevo usuario
  const register = (username, password) => {
    if (users.some(user => user.username === username)) {
      throw new Error('El usuario ya existe');
    }
    const newUser = { id: users.length + 1, username, password };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  // Función para iniciar sesión
  const login = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    setCurrentUser(user);
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <DataContext.Provider
      value={{
        pedidos,
        trazabilidad,
        feedback,
        addPedido,
        updatePedido,
        deletePedido,
        addFeedback,
        users,
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useData() {
  return useContext(DataContext);
}
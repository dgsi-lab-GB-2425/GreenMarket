import { Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useData();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
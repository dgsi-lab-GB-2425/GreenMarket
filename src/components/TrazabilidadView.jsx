// src/components/TrazabilidadView.jsx
import { useData } from '../context/DataContext';

function TrazabilidadView() {
  const { trazabilidad } = useData();

  return (
    <div className="trazabilidad-list">
      <h2>Trazabilidad de Productos</h2>
      <div className="trazabilidad-grid">
        {trazabilidad.map((item) => (
          <div key={item.id} className="trazabilidad-item">
            <p><strong>Producto:</strong> {item.producto}</p>
            <p><strong>Origen:</strong> {item.origen}</p>
            <p><strong>Fecha:</strong> {item.fecha}</p>
            <p><strong>Certificado:</strong> {item.certificado ? 'Sí' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrazabilidadView;
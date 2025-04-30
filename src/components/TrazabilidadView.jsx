import { useData } from '../context/DataContext';
import { productImages } from './MapaRutas';

function TrazabilidadView() {
  const { trazabilidad } = useData();

  return (
    <div className="trazabilidad-list">
      <h2>Trazabilidad de Productos</h2>
      <div className="trazabilidad-grid">
        {trazabilidad.map((item) => (
          <div key={item.id} className="trazabilidad-item">
            <div className="product-item">
              <img
                src={productImages[item.producto] || 'https://via.placeholder.com/80?text=Sin+Imagen'}
                alt={item.producto}
                className="trazabilidad-image"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80?text=Sin+Imagen';
                }}
              />
              <div>
                <p><strong>Producto:</strong> {item.producto}</p>
                <p><strong>Origen:</strong> {item.origen}</p>
                <p><strong>Fecha:</strong> {item.fecha}</p>
                <p><strong>Certificado:</strong> {item.certificado ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrazabilidadView;
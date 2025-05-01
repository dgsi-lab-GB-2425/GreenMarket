import { useState } from 'react';
import { useData } from '../context/DataContext';

function FeedbackForm() {
  const { addFeedback, trazabilidad } = useData();
  const [productoId, setProductoId] = useState(trazabilidad[0]?.id || '1'); // Valor inicial: primer producto
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comentario) {
      setMensaje('Ingresa un comentario');
      return;
    }
    const sentimiento = comentario.toLowerCase().includes('buen') || comentario.includes('delicios')
      ? 'Positivo'
      : 'Negativo';
    addFeedback({
      productoId: parseInt(productoId),
      comentario,
      sentimiento,
      createdAt: new Date().toISOString(),
    });
    setMensaje('¡Feedback enviado!');
    setComentario('');
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Enviar Feedback</h2>
      <div className="form-group">
        <label>Producto</label>
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          className="form-input"
        >
          {trazabilidad.map((item) => (
            <option key={item.id} value={item.id}>
              {item.producto}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Comentario</label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe tu opinión..."
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">Enviar</button>
      {mensaje && <p className="form-message">{mensaje}</p>}
    </form>
  );
}

export default FeedbackForm;
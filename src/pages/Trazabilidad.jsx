// src/pages/Trazabilidad.jsx
import FeedbackForm from '../components/FeedbackForm';
import TrazabilidadView from '../components/TrazabilidadView';

function Trazabilidad() {
  return (
    <div className="trazabilidad-page">
      <div className="container">
        <h1>Trazabilidad y Feedback</h1>
        <FeedbackForm />
        <TrazabilidadView />
      </div>
    </div>
  );
}

export default Trazabilidad;
// src/components/MapaRutas.jsx
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useData } from '../context/DataContext';

// Configuración de íconos locales
const markerIcon = new L.Icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Mapa de ciudades a coordenadas (latitud, longitud)
const cityCoordinates = {
  'Valencia': [39.4699, -0.3763],
  'Murcia': [37.9922, -1.1307],
  'Navarra': [42.6954, -1.6761],
  'Asturias': [43.3614, -5.8494],
  'Lleida': [41.6176, 0.6200],
  'Andalucía': [37.1734, -5.9925],
  'Almería': [36.8381, -2.4597],
  'Granada': [37.1773, -3.5986],
  'Castilla-La Mancha': [39.2796, -3.0977],
  'Málaga': [36.7213, -4.4213],
  'Canarias': [28.1235, -15.4363],
  'Tenerife': [28.4636, -16.2518],
  'Cataluña': [41.3851, 2.1734],
  'La Rioja': [42.2871, -2.5396],
  'Galicia': [42.8760, -8.5489],
  'Alicante': [38.3452, -0.4907],
  'Castellón': [39.9864, -0.0513],
  'Valladolid': [41.6523, -4.7245],
  'Extremadura': [39.4937, -6.0679],
  'Aragón': [41.6561, -0.8773],
  'Ciudad Real': [38.9861, -3.9291],
  'Sevilla': [37.3891, -5.9845],
  'Baleares': [39.5710, 2.6466],
  'Madrid': [40.4168, -3.7038],
  'Barcelona': [41.3851, 2.1734],
  'Zaragoza': [41.6561, -0.8773],
};

// Colores para las rutas
const colors = ['green', 'blue', 'red', 'purple', 'orange', 'darkcyan', 'magenta', 'lime', 'teal', 'navy'];

function MapaRutas() {
  const { trazabilidad } = useData();
  const origen = [40.4168, -3.7038]; // Madrid como centro logístico

  // Extraer destinos únicos basados en los orígenes de trazabilidad
  const destinos = trazabilidad.reduce((acc, item) => {
    const ciudad = item.origen.split(',').pop().trim();
    const coords = cityCoordinates[ciudad];
    if (coords && !acc.some(dest => dest.coords[0] === coords[0] && dest.coords[1] === coords[1])) {
      acc.push({
        coords,
        ciudad,
        productos: [item.producto],
      });
    } else if (coords) {
      const existing = acc.find(dest => dest.coords[0] === coords[0] && dest.coords[1] === coords[1]);
      existing.productos.push(item.producto);
    }
    return acc;
  }, []);

  return (
    <div className="mapa-container">
      <h2>Seguimiento Logístico</h2>
      <MapContainer center={[40.0, -3.0]} zoom={6} className="mapa">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {/* Marcador del origen (Madrid) con title y ícono local */}
        <Marker position={origen} icon={markerIcon} title="Madrid">
          <Popup>Centro Logístico: Madrid</Popup>
        </Marker>
        {/* Marcadores y rutas para cada destino con title y ícono local */}
        {destinos.map((dest, index) => {
          const ruta = [origen, dest.coords];
          const color = colors[index % colors.length];
          return (
            <div key={index}>
              <Marker position={dest.coords} icon={markerIcon} title={dest.ciudad}>
                <Popup>
                  {dest.ciudad}<br />
                  Productos: {dest.productos.join(', ')}
                </Popup>
              </Marker>
              <Polyline positions={ruta} color={color} />
            </div>
          );
        })}
      </MapContainer>
      {/* Lista de rutas debajo del mapa */}
      <div className="rutas-list">
        <h3>Rutas de Distribución</h3>
        <ul>
          {destinos.map((dest, index) => (
            <li key={index} style={{ color: colors[index % colors.length] }}>
              Madrid → {dest.ciudad}: {dest.productos.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapaRutas;
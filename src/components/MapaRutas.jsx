import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useData } from '../context/DataContext';

// Configuración de íconos usando unpkg.com (versión 1.9.4)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
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

// Mapa de productos a URLs de imágenes (usando versiones más pequeñas con _640.jpg)
export const productImages = {
  'Tomate': 'https://cdn.pixabay.com/photo/2015/08/05/20/20/tomato-877019_1280.jpg',
  'Naranja': 'https://cdn.pixabay.com/photo/2017/01/20/15/06/orange-1995056_1280.jpg',
  'Lechuga': 'https://cdn.pixabay.com/photo/2015/09/14/19/53/nature-940032_1280.jpg',
  'Manzana': 'https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg',
  'Zanahoria': 'https://cdn.pixabay.com/photo/2018/02/25/08/56/carrot-3179988_1280.jpg',
  'Pimiento': 'https://cdn.pixabay.com/photo/2016/03/05/22/59/bell-pepper-1239424_1280.jpg',
  'Calabacín': 'https://cdn.pixabay.com/photo/2018/06/17/14/45/zucchini-3480653_1280.jpg',
  'Berenjena': 'https://cdn.pixabay.com/photo/2013/03/02/01/25/aubergine-89044_1280.jpg',
  'Limón': 'https://cdn.pixabay.com/photo/2016/01/02/01/49/lemon-1117564_1280.jpg',
  'Aguacate': 'https://cdn.pixabay.com/photo/2016/03/05/19/03/appetite-1238257_1280.jpg',
  'Fresa': 'https://cdn.pixabay.com/photo/2016/03/05/19/11/strawberry-1238295_1280.jpg',
  'Plátano': 'https://cdn.pixabay.com/photo/2016/04/27/19/52/banana-1357387_1280.jpg',
  'Melón': 'https://cdn.pixabay.com/photo/2017/06/16/14/35/melon-2409372_1280.jpg',
  'Sandía': 'https://cdn.pixabay.com/photo/2017/06/16/14/35/watermelon-2409368_1280.jpg',
  'Uva': 'https://cdn.pixabay.com/photo/2018/01/17/18/41/food-3088767_1280.jpg',
  'Cebolla': 'https://cdn.pixabay.com/photo/2013/02/21/19/14/onion-bulbs-84722_1280.jpg',
  'Ajo': 'https://cdn.pixabay.com/photo/2016/03/05/19/14/garlic-1238337_1280.jpg',
  'Patata': 'https://cdn.pixabay.com/photo/2012/12/24/08/39/agriculture-72254_1280.jpg',
  'Espinaca': 'https://cdn.pixabay.com/photo/2016/11/05/00/05/spinach-1799266_1280.jpg',
  'Brócoli': 'https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_1280.jpg',
  'Coliflor': 'https://cdn.pixabay.com/photo/2015/07/17/19/32/cauliflower-849643_1280.jpg',
  'Mango': 'https://cdn.pixabay.com/photo/2016/03/05/22/18/food-1239241_1280.jpg',
  'Piña': 'https://cdn.pixabay.com/photo/2015/02/14/18/10/pineapple-636562_1280.jpg',
  'Kiwi': 'https://cdn.pixabay.com/photo/2014/07/23/11/51/kiwifruit-400143_1280.jpg',
  'Pera': 'https://cdn.pixabay.com/photo/2010/12/13/10/06/food-2280_1280.jpg',
  'Cereza': 'https://cdn.pixabay.com/photo/2018/06/17/14/34/cherry-3480616_1280.jpg',
  'Arándano': 'https://cdn.pixabay.com/photo/2010/12/13/10/05/berry-2271_1280.jpg',
  'Frambuesa': 'https://cdn.pixabay.com/photo/2013/11/17/10/35/berry-211887_1280.jpg',
  'Aceituna': 'https://cdn.pixabay.com/photo/2017/08/09/09/54/olive-2613998_1280.jpg',
  'Almendra': 'https://cdn.pixabay.com/photo/2016/06/23/09/30/almond-1474961_1280.jpg',
  'Albahaca': 'https://cdn.pixabay.com/photo/2014/12/30/11/12/basil-583816_1280.jpg',
  'Perejil': 'https://cdn.pixabay.com/photo/2016/09/12/18/27/parsley-1665402_1280.jpg',
  'Cilantro': 'https://cdn.pixabay.com/photo/2021/07/18/17/49/coriander-6476225_1280.jpg',
  'Mandarina': 'https://cdn.pixabay.com/photo/2018/11/24/14/03/mandarin-3835620_1280.jpg',
  'Boniato': 'https://cdn.pixabay.com/photo/2020/06/19/21/47/sweet-potato-5318960_1280.jpg',
  'Rábano': 'https://cdn.pixabay.com/photo/2016/07/23/17/10/radish-1537141_1280.jpg',
  'Pepino': 'https://cdn.pixabay.com/photo/2020/05/21/11/29/cucumber-5200335_1280.jpg',
  'Apio': 'https://cdn.pixabay.com/photo/2017/02/21/08/32/vegetables-2085043_1280.jpg',
  'Puerro': 'https://cdn.pixabay.com/photo/2016/04/02/17/36/spring-onions-1303271_1280.jpg',
  'Granada': 'https://cdn.pixabay.com/photo/2021/11/18/22/38/fruit-6807567_1280.jpg',
  'Acelga': 'https://cdn.pixabay.com/photo/2016/08/09/13/53/swiss-chard-1580676_1280.jpg',
  'Remolacha': 'https://cdn.pixabay.com/photo/2014/11/25/23/09/beet-545775_1280.jpg',
  'Nabo': 'https://cdn.pixabay.com/photo/2010/12/10/08/turnip-1129_1280.jpg',
  'Ciruela': 'https://cdn.pixabay.com/photo/2016/08/26/08/06/blackthorn-1621554_1280.jpg',
  'Melocotón': 'https://cdn.pixabay.com/photo/2018/07/13/08/19/peach-3535170_1280.jpg',
  'Nectarina': 'https://cdn.pixabay.com/photo/2017/06/16/14/35/nectarine-2409370_1280.jpg',
  'Alcachofa': 'https://cdn.pixabay.com/photo/2016/04/23/17/12/artichoke-1347916_1280.jpg',
  'Espárrago': 'https://cdn.pixabay.com/photo/2015/03/30/20/45/asparagus-700153_1280.jpg',
  'Higo': 'https://cdn.pixabay.com/photo/2016/04/27/14/58/fig-1356770_1280.jpg',
  'Dátil': 'https://cdn.pixabay.com/photo/2015/09/09/14/21/jujube-931583_1280.jpg',
  'Albaricoque': 'https://cdn.pixabay.com/photo/2017/05/15/11/51/apricot-2314631_1280.jpg',
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
        {/* Marcador del origen (Madrid) con title */}
        <Marker position={origen} title="Madrid">
          <Popup>Centro Logístico: Madrid</Popup>
        </Marker>
        {/* Marcadores y rutas para cada destino con title y imágenes */}
        {destinos.map((dest, index) => {
          const ruta = [origen, dest.coords];
          const color = colors[index % colors.length];
          return (
            <div key={index}>
              <Marker position={dest.coords} title={dest.ciudad}>
                <Popup maxWidth={300} maxHeight={400}>
                  <div className="popup-content">
                    <h3>{dest.ciudad}</h3>
                    <div className="product-list">
                      {dest.productos.map((producto, idx) => (
                        <div key={idx} className="product-item">
                          <img
                            src={productImages[producto] || 'https://via.placeholder.com/50?text=Sin+Imagen'}
                            alt={producto}
                            className="product-image"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50?text=Sin+Imagen';
                            }}
                          />
                          <span>{producto}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Arregla el problema del icono por defecto
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  usuarios: {
    nombre: string;
    latitud: number;
    longitud: number;
  }[];
}

export const MiMapa = ({ usuarios }: Props) => {
  return (
    <MapContainer
      center={[40.416775, -3.70379]}
      zoom={6}
      className="w-full h-full rounded-lg shadow-lg"
      zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />

      {usuarios &&
        usuarios.length > 0 &&
        usuarios.map((usuario, index) => (
          <Marker
            key={index}
            position={[usuario.latitud, usuario.longitud]}
            icon={defaultIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{usuario.nombre}</h3>
                <p>Lat: {usuario.latitud}</p>
                <p>Lng: {usuario.longitud}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

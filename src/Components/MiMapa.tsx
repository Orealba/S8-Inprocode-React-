import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


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

  const usuariosPorUbicacion = usuarios.reduce((acc, usuario) => {
    const key = `${usuario.latitud},${usuario.longitud}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(usuario);
    return acc;
  }, {} as Record<string, typeof usuarios>);

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

      <MarkerClusterGroup>
        {Object.entries(usuariosPorUbicacion).map(
          ([coords, usuariosEnUbicacion]) => {
            const [lat, lng] = coords.split(',').map(Number);
            return (
              <Marker
                key={coords}
                position={[lat, lng]}
                icon={defaultIcon}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold">Usuarios en esta ubicación:</h3>
                    {usuariosEnUbicacion.map((usuario, index) => (
                      <div
                        key={index}
                        className="mt-2">
                        <p className="font-semibold">{usuario.nombre}</p>
                      </div>
                    ))}
                    <p className="mt-2">
                      Lat: {lat}
                      <br />
                      Lng: {lng}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          },
        )}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

export const MiMapa = () => {
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map', // ID del contenedor
      style: 'mapbox://styles/mapbox/streets-v12', // URL del estilo del mapa
      center: [-3.7038, 40.4168], // Coordenadas iniciales [longitud, latitud]
      zoom: 5, // Nivel de zoom inicial
    });

    // Limpiar el mapa cuando el componente se desmonte
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []); // El efecto se ejecuta solo una vez, al montar el componente

  return (
    <div className="flex justify-center mt-20  ml-5 mr-5">
      <div
        id="map"
        className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2" // Responsivo: el mapa se hace más pequeño en pantallas pequeñas
        style={{ height: '400px' }}></div>
    </div>
  );
};

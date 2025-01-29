import { useEffect, useState } from 'react';
import { MiMapa } from '../Components/MiMapa';

interface Usuario {
  nombre: string;
  latitud: number;
  longitud: number;
}

export const Mapa = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div className="p-4">
      <h1 className="m-8 text-white font-['KGPictureYou'] text-3xl">
        Locaciones de los usuarios
      </h1>
      <div className="flex justify-center h-[400px] w-full sm:w-[500px] md:w-[600px] lg:w-[800px] mx-auto bg-white rounded-lg shadow-lg">
        <MiMapa usuarios={usuarios} />
      </div>
      <h3 className="flex justify-center text-white m-2">
        Aleja el mapa para ver a todos los usuarios de la tabla
      </h3>
    </div>
  );
};

import { MigraficoBarras } from '../Components/MigraficoBarras';
import { MigraficoPie } from '../Components/MigraficoPie';
import { useEffect, useState } from 'react';

interface Usuario {
  nombre: string;
  apellido: string;
  edad: number;
}

export const Grafico = () => {
  const [usuariosPorDeporte, setUsuariosPorDeporte] = useState<
    Record<string, Usuario[]>
  >({});

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Obtener todos los deportes
        const respDeportes = await fetch('http://127.0.0.1:8080/deportes');
        const datosDeportes = await respDeportes.json();

        // Obtener usuarios para cada deporte
        const usuariosTemp: Record<string, Usuario[]> = {};
        for (const deporte of datosDeportes) {
          const respUsuarios = await fetch(
            `http://127.0.0.1:8080/deportes/${deporte.id}`,
          );
          const datosUsuarios = await respUsuarios.json();
          usuariosTemp[deporte.nombre] = datosUsuarios.usuarios;
        }
        console.log(usuariosTemp);
        setUsuariosPorDeporte(usuariosTemp);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <>
      <div className=" text-white">
        {/* <MigraficoBarras datos={usuariosPorDeporte} /> */}
        <MigraficoPie datos={usuariosPorDeporte} />
      </div>
      ;
    </>
  );
};
